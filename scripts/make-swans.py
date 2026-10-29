"""Split the hero scene's swans into their own layers so they can swim (components/HeroSwans.tsx).

Writes, from public/media/hero-scene.webp:
  public/media/hero-lake.webp   the scene with both swans and their reflections painted out
  public/media/swan-left.png    the left swan on transparency
  public/media/swan-right.png   the right swan on transparency
and prints each swan's box as % of the scene, for HeroSwans.tsx.

Run: python scripts/make-swans.py
"""

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
MEDIA = ROOT / "public" / "media"

# Outlines traced on the 1522×2256 scene, clockwise.
LEFT = [
    (489, 1570), (500, 1566), (520, 1561), (540, 1551), (560, 1540), (580, 1533), (600, 1531), (620, 1535),
    (642, 1544), (660, 1556), (676, 1568), (688, 1578), (691, 1555), (691, 1525), (692, 1500), (696, 1482),
    (704, 1472), (714, 1467), (726, 1469), (736, 1477), (743, 1489), (746, 1503), (745, 1517), (747, 1532),
    (746, 1544), (741, 1543), (736, 1532), (731, 1522), (725, 1517), (726, 1540), (729, 1565), (733, 1590),
    (738, 1608), (745, 1620), (748, 1632), (745, 1642), (730, 1648), (690, 1650), (640, 1650), (590, 1650),
    (575, 1655), (562, 1653), (548, 1642), (532, 1628), (518, 1608), (505, 1590), (494, 1578),
]
RIGHT = [
    (782, 1474), (798, 1485), (810, 1505), (815, 1525), (816, 1550), (817, 1574), (830, 1562), (845, 1545),
    (865, 1535), (885, 1532), (912, 1532), (932, 1537), (952, 1547), (970, 1562), (985, 1574), (1005, 1571),
    (1019, 1566), (1013, 1582), (998, 1598), (985, 1612), (972, 1627), (958, 1637), (950, 1652), (936, 1654),
    (912, 1649), (845, 1649), (778, 1648), (764, 1642), (759, 1628), (758, 1610), (763, 1592), (769, 1572),
    (772, 1555), (771, 1540), (765, 1537), (757, 1546), (752, 1546), (751, 1535), (752, 1520), (753, 1502),
    (759, 1488), (769, 1478),
]
# The swans' reflections on the water, painted out along with the swans.
REFLECTION = [(490, 1630), (1020, 1630), (1010, 1710), (870, 1755), (845, 1845), (665, 1845), (640, 1755), (500, 1710)]

SS = 4  # supersampling for anti-aliased outlines


def polygon_mask(size, pts, grow=0):
    w, h = size
    big = Image.new("L", (w * SS, h * SS), 0)
    ImageDraw.Draw(big).polygon([(x * SS, y * SS) for x, y in pts], fill=255)
    m = big.resize((w, h), Image.LANCZOS)
    if grow:
        m = m.filter(ImageFilter.MaxFilter(grow * 2 + 1))
    return m


def paint_out(img, mask):
    """Fill masked pixels smoothly from their surroundings (harmonic fill), then lay the lake's
    horizontal ripples back over the fill so it reads as water rather than a smudge."""
    a = np.asarray(img.convert("RGB")).astype(float)
    m = np.asarray(mask) > 8
    ys, xs = np.nonzero(m)
    y0, y1, x0, x1 = ys.min() - 2, ys.max() + 3, xs.min() - 2, xs.max() + 3
    sub = a[y0:y1, x0:x1].copy()
    hole = m[y0:y1, x0:x1]
    # start from row means of the surrounding water, then relax (Jacobi) towards a harmonic fill
    for y in range(sub.shape[0]):
        ring = sub[y][~hole[y]]
        if len(ring):
            sub[y][hole[y]] = ring.mean(0)
    for _ in range(1500):
        avg = (np.roll(sub, 1, 0) + np.roll(sub, -1, 0) + np.roll(sub, 1, 1) + np.roll(sub, -1, 1)) / 4
        sub[hole] = avg[hole]
    # ripple detail: each row's deviation from a smoothed column profile, taken from the water
    # just outside the hole on that row, broken up along the row the way light catches real water
    detail = np.zeros_like(sub)
    for y in range(sub.shape[0]):
        out_row = a[y0 + y, max(0, x0 - 60):x0]
        if len(out_row):
            detail[y] = np.median(out_row, 0)
    smooth = np.asarray(Image.fromarray(np.clip(detail, 0, 255).astype("uint8")).filter(ImageFilter.GaussianBlur((0, 6)))).astype(float)
    rng = np.random.default_rng(3)
    patchy = np.asarray(Image.fromarray((rng.random(sub.shape[:2]) * 255).astype("uint8")).filter(ImageFilter.GaussianBlur((18, 2)))).astype(float)
    patchy = np.clip((patchy - patchy.mean()) / (patchy.std() + 1e-6) * 0.5 + 0.55, 0, 1)[..., None]
    sub[hole] += (np.clip(detail - smooth, -8, 8) * patchy)[hole] * 0.6
    sub += rng.normal(0, 1.3, sub.shape) * hole[..., None]
    fill = a.copy()
    fill[y0:y1, x0:x1] = sub
    soft = np.asarray(mask.filter(ImageFilter.GaussianBlur(6))).astype(float)[..., None] / 255
    res = a * (1 - soft) + fill * soft
    rgb = Image.fromarray(np.clip(res, 0, 255).astype("uint8"))
    rgb.putalpha(img.getchannel("A"))
    return rgb


def main():
    scene = Image.open(MEDIA / "hero-scene.webp").convert("RGBA")
    W, H = scene.size

    for name, pts in (("left", LEFT), ("right", RIGHT)):
        m = polygon_mask(scene.size, pts).filter(ImageFilter.GaussianBlur(0.7))
        swan = scene.copy()
        swan.putalpha(m)
        box = m.point(lambda v: 255 if v > 3 else 0).getbbox()
        swan.crop(box).save(MEDIA / f"swan-{name}.png", optimize=True)
        x0, y0, x1, y1 = box
        print(f"{name}: left {x0 / W * 100:.3f}% top {y0 / H * 100:.3f}% width {(x1 - x0) / W * 100:.3f}%  ({x1 - x0}x{y1 - y0})")

    hole = Image.fromarray(np.maximum.reduce([
        np.asarray(polygon_mask(scene.size, LEFT, grow=20)),
        np.asarray(polygon_mask(scene.size, RIGHT, grow=20)),
        np.asarray(polygon_mask(scene.size, REFLECTION, grow=10)),
    ]))
    paint_out(scene, hole).save(MEDIA / "hero-lake.webp", quality=92, method=6)


if __name__ == "__main__":
    main()
