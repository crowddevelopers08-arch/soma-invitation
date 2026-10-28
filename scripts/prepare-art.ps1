# Prepares artwork from art-src/ into public/media/.
#   - Opaque scenes (envelope, hero-arch, closing-photo) are copied as JPG.
#   - Ready-made cut-outs (hero-scene: arch, swans and bouquets on transparency) are upscaled as PNG.
#   - Watercolour pieces painted on white become transparent PNGs using a
#     colour-to-alpha pass, so soft edges blend over photos as well as paper.
# Usage (from the project root):  powershell -ExecutionPolicy Bypass -File scripts/prepare-art.ps1

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$src = Join-Path $root 'art-src'
$out = Join-Path $root 'public\media'

Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public static class WhiteToAlpha {
    // GIMP-style colour-to-alpha against white, with a small threshold so paper-white goes fully clear.
    public static void Convert(string input, string output) {
        using (var source = new Bitmap(input))
        using (var bmp = new Bitmap(source.Width, source.Height, PixelFormat.Format32bppArgb)) {
            using (var g = Graphics.FromImage(bmp)) g.DrawImage(source, 0, 0, source.Width, source.Height);
            var rect = new Rectangle(0, 0, bmp.Width, bmp.Height);
            var data = bmp.LockBits(rect, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
            int bytes = Math.Abs(data.Stride) * bmp.Height;
            var px = new byte[bytes];
            Marshal.Copy(data.Scan0, px, 0, bytes);
            for (int i = 0; i < bytes; i += 4) {
                double b = px[i], gr = px[i + 1], r = px[i + 2];
                double a = Math.Max(255 - r, Math.Max(255 - gr, 255 - b)) / 255.0;
                a = Math.Min(1.0, Math.Max(0.0, (a - 0.03) / 0.97));
                if (a <= 0) { px[i] = px[i + 1] = px[i + 2] = px[i + 3] = 0; continue; }
                px[i]     = (byte)Math.Max(0, Math.Min(255, (b  - 255 * (1 - a)) / a));
                px[i + 1] = (byte)Math.Max(0, Math.Min(255, (gr - 255 * (1 - a)) / a));
                px[i + 2] = (byte)Math.Max(0, Math.Min(255, (r  - 255 * (1 - a)) / a));
                px[i + 3] = (byte)Math.Round(a * 255);
            }
            Marshal.Copy(px, 0, data.Scan0, bytes);
            bmp.UnlockBits(data);
            bmp.Save(output, ImageFormat.Png);
        }
    }
}

public static class Sharpen {
    // High-quality upscale followed by an unsharp mask (5-tap Gaussian), so scenes stay crisp on 3x phone screens.
    public static Bitmap UpscaleSharp(Image source, int scale, double amount) {
        int w = source.Width * scale, h = source.Height * scale;
        var bmp = new Bitmap(w, h, PixelFormat.Format32bppArgb);
        using (var g = Graphics.FromImage(bmp)) {
            g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
            g.PixelOffsetMode = System.Drawing.Drawing2D.PixelOffsetMode.HighQuality;
            g.DrawImage(source, 0, 0, w, h);
        }
        var data = bmp.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
        int stride = data.Stride, bytes = stride * h;
        var px = new byte[bytes];
        Marshal.Copy(data.Scan0, px, 0, bytes);
        int[] k = { 1, 4, 6, 4, 1 };
        var tmp = new double[bytes];
        var blur = new double[bytes];
        for (int y = 0; y < h; y++)
            for (int x = 0; x < w; x++)
                for (int c = 0; c < 3; c++) {
                    double s = 0;
                    for (int t = -2; t <= 2; t++) s += k[t + 2] * px[y * stride + Math.Min(w - 1, Math.Max(0, x + t)) * 4 + c];
                    tmp[y * stride + x * 4 + c] = s / 16;
                }
        for (int y = 0; y < h; y++)
            for (int x = 0; x < w; x++)
                for (int c = 0; c < 3; c++) {
                    double s = 0;
                    for (int t = -2; t <= 2; t++) s += k[t + 2] * tmp[Math.Min(h - 1, Math.Max(0, y + t)) * stride + x * 4 + c];
                    blur[y * stride + x * 4 + c] = s / 16;
                }
        for (int i = 0; i < bytes; i += 4)
            for (int c = 0; c < 3; c++)
                px[i + c] = (byte)Math.Max(0, Math.Min(255, Math.Round(px[i + c] + amount * (px[i + c] - blur[i + c]))));
        Marshal.Copy(px, 0, data.Scan0, bytes);
        bmp.UnlockBits(data);
        return bmp;
    }
}
"@

$opaque = 'envelope', 'hero-arch', 'closing-photo'
$transparent = 'floral-corners', 'bouquet', 'bouquet-corner', 'rose-vine', 'peony'

function Find-Source($name) {
    Get-ChildItem $src -File | Where-Object { $_.BaseName -eq $name } | Select-Object -First 1
}

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$jpegParams = New-Object System.Drawing.Imaging.EncoderParameters 1
$jpegParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 92L

foreach ($name in $opaque) {
    $f = Find-Source $name
    if (-not $f) { Write-Host "skip  $name (not in art-src)"; continue }
    $img = [System.Drawing.Image]::FromFile($f.FullName)
    try {
        # Small sources are upscaled to at least ~1600px wide and sharpened; large ones are copied as-is.
        $scale = [Math]::Min(3, [Math]::Ceiling(1600 / $img.Width))
        if ($scale -gt 1) { $sharp = [Sharpen]::UpscaleSharp($img, $scale, 0.7) } else { $sharp = New-Object System.Drawing.Bitmap $img }
        try {
            $size = "$($sharp.Width)x$($sharp.Height)"
            $sharp.Save((Join-Path $out "$name.jpg"), $jpegCodec, $jpegParams)
        } finally { $sharp.Dispose() }
    } finally { $img.Dispose() }
    Write-Host "jpg   $name.jpg ($size)"
}

# Pieces that already carry transparency (cut out by hand): Lanczos upscale + clarity/sharpen
# via Pillow (scripts/enhance-cutout.py), saved as WebP with alpha.
# Each entry: name, target width, mode ('lineart' sharpens thin ink strokes harder).
$cutouts = @(@('hero-scene', 1650, ''), @('dress-card', 1650, ''), @('venue', 1880, 'lineart'))
foreach ($c in $cutouts) {
    $name = $c[0]
    $f = Find-Source $name
    if (-not $f) { Write-Host "skip  $name (not in art-src)"; continue }
    python (Join-Path $PSScriptRoot 'enhance-cutout.py') $f.FullName (Join-Path $out "$name.webp") $c[1] $c[2]
}

foreach ($name in $transparent) {
    $f = Find-Source $name
    if (-not $f) { Write-Host "skip  $name (not in art-src)"; continue }
    [WhiteToAlpha]::Convert($f.FullName, (Join-Path $out "$name.png"))
    Write-Host "png   $name.png"
}
