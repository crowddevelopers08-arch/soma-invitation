"""Upscale a transparent cut-out for crisp display on high-density phones.

Lanczos upscale (alpha-premultiplied so edges stay clean), then a gentle fine unsharp
mask for detail. Colours are left untouched.
Saved as lossy WebP with alpha to keep the download small.

`lineart` mode is for ink drawings keyed onto transparency (the strokes live mostly in the
alpha channel): the alpha is sharpened too and faint strokes are firmed up, so thin pen
lines stay crisp instead of going soft after upscaling.

Usage: python scripts/enhance-cutout.py <input.png> <output.webp> [target_width] [lineart]
"""

import sys

from PIL import Image, ImageFilter


def enhance(src: str, dst: str, target_width: int = 1650, lineart: bool = False) -> None:
    im = Image.open(src).convert("RGBA")
    scale = max(1, round(target_width / im.width))
    size = (im.width * scale, im.height * scale)

    big = im.convert("RGBa").resize(size, Image.LANCZOS).convert("RGBA")
    rgb, alpha = big.convert("RGB"), big.getchannel("A")

    # Sharpening only: no contrast/saturation changes, so colours stay identical to the source.
    # Gentle amounts: stronger settings leave bright halos on petal edges that read as glare.
    rgb = rgb.filter(ImageFilter.UnsharpMask(radius=1.2 * scale / 3 + 0.5, percent=65, threshold=3))

    if lineart:
        rgb = rgb.filter(ImageFilter.UnsharpMask(radius=0.45 * scale, percent=55, threshold=2))
        alpha = alpha.filter(ImageFilter.UnsharpMask(radius=0.5 * scale, percent=110, threshold=2))
        alpha = alpha.point(lambda a: round(255 * (a / 255) ** 0.8))  # firm up faint strokes

    out = rgb.convert("RGBA")
    out.putalpha(alpha)
    out.save(dst, "WEBP", quality=90, method=6, alpha_quality=95)
    print(f"webp  {dst} ({out.width}x{out.height})")


if __name__ == "__main__":
    enhance(
        sys.argv[1],
        sys.argv[2],
        int(sys.argv[3]) if len(sys.argv) > 3 else 1650,
        len(sys.argv) > 4 and sys.argv[4] == "lineart",
    )
