"""Draw the venue illustration (public/media/venue-mahal.svg): a South Indian wedding mahal
(kalyana mandapam) in the invitation's gold line style: a raised centre block with the hall's name,
two-storey wings, an arched ground-floor arcade and a pillared entrance porch dressed with a
mango-leaf thoranam and banana plants.

Run: python scripts/make-mahal.py
"""

from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "public" / "media" / "venue-mahal.svg"

INK = "#8a6a2e"
CX = 190
GROUND = 150
NAME = "J.S. MAHAL"


def f(n):
    return f"{n:.2f}".rstrip("0").rstrip(".")


def line(w=0.8):
    return f'stroke="{INK}" stroke-width="{w}" stroke-linejoin="round"'


def kalasam(x, y, s=1.0):
    """A finial: a pot on a ring, topped with a spike, resting on y."""
    return (
        f'<path d="M{f(x - 2.4 * s)} {f(y)}h{f(4.8 * s)}l-.8 {f(-1.3 * s)}h{f(-3.2 * s)}z" fill="url(#gold)" {line(0.6)}/>'
        f'<ellipse cx="{f(x)}" cy="{f(y - 3.3 * s)}" rx="{f(2.2 * s)}" ry="{f(2.1 * s)}" fill="url(#gold)" {line(0.6)}/>'
        f'<path d="M{f(x)} {f(y - 5.4 * s)}v{f(-3.6 * s)}" stroke="{INK}" stroke-width="{f(0.8 * s)}" stroke-linecap="round"/>'
    )


def parapet(x0, x1, y, n, s=0.8):
    """Roof cornice with a balustrade band and a row of finials."""
    out = [
        f'<rect x="{f(x0 - 2)}" y="{f(y)}" width="{f(x1 - x0 + 4)}" height="3" fill="url(#gold)" {line(0.7)}/>',
        f'<rect x="{f(x0)}" y="{f(y - 5)}" width="{f(x1 - x0)}" height="5" fill="url(#wall)" {line(0.6)}/>',
    ]
    for k in range(int((x1 - x0) / 4)):
        out.append(f'<path d="M{f(x0 + 2 + k * 4)} {f(y - 4)}v3" stroke="{INK}" stroke-width=".5"/>')
    for k in range(n):
        out.append(kalasam(x0 + (x1 - x0) * k / (n - 1), y - 5, s))
    return "".join(out)


def window(x, y, w, h, arched=True):
    top = f"V{f(y + w / 2)}a{f(w / 2)} {f(w / 2)} 0 0 1 {f(w)} 0" if arched else f"V{f(y)}h{f(w)}"
    return (
        f'<path d="M{f(x)} {f(y + h)}{top}V{f(y + h)}z" fill="#c9a659" {line(0.6)}/>'
        f'<path d="M{f(x + w / 2)} {f(y + (w / 2 if arched else 0))}V{f(y + h)}" stroke="#fdf6e4" stroke-width=".6"/>'
        f'<rect x="{f(x - 1.2)}" y="{f(y + h)}" width="{f(w + 2.4)}" height="1.6" fill="url(#gold)" {line(0.4)}/>'
    )


def arcade(x0, x1, y, n):
    """Ground-floor verandah of rounded arches on slim pillars."""
    out = [f'<rect x="{f(x0)}" y="{f(y)}" width="{f(x1 - x0)}" height="{f(GROUND - y)}" fill="url(#wall)" {line()}/>']
    w = (x1 - x0) / n
    for k in range(n):
        ax = x0 + k * w + 2.2
        aw = w - 4.4
        out.append(f'<path d="M{f(ax)} {GROUND}V{f(y + 4 + aw / 2)}a{f(aw / 2)} {f(aw / 2)} 0 0 1 {f(aw)} 0V{GROUND}z" fill="#b8913f" opacity=".75" {line(0.6)}/>')
    out.append(f'<rect x="{f(x0 - 1)}" y="{f(y - 2)}" width="{f(x1 - x0 + 2)}" height="3" fill="url(#gold)" {line(0.6)}/>')
    return "".join(out)


def wing(x0, x1, top):
    out = [f'<rect x="{x0}" y="{top}" width="{x1 - x0}" height="{GROUND - top}" fill="url(#wall)" {line()}/>']
    n = 5
    w = (x1 - x0) / n
    for k in range(n):
        out.append(window(x0 + k * w + w / 2 - 4, top + 8, 8, 14))
    # first-floor balcony rail
    out.append(f'<rect x="{x0 + 2}" y="{top + 28}" width="{x1 - x0 - 4}" height="2" fill="url(#gold)" {line(0.5)}/>')
    for k in range(n):
        out.append(window(x0 + k * w + w / 2 - 4, top + 33, 8, 12, arched=False))
    out.append(arcade(x0, x1, top + 52, n))
    out.append(parapet(x0, x1, top, 5, 0.65))
    return "".join(out)


def centre():
    x0, x1, top = CX - 56, CX + 56, 40
    out = [f'<rect x="{x0}" y="{top}" width="{x1 - x0}" height="{GROUND - top}" fill="url(#wall)" {line()}/>']
    # corner pilasters
    for px in (x0, x1 - 6):
        out.append(f'<rect x="{px}" y="{top}" width="6" height="{GROUND - top}" fill="url(#gold)" opacity=".55" {line(0.6)}/>')
    # name board
    out.append(f'<rect x="{CX - 38}" y="{top + 6}" width="76" height="14" rx="1.5" fill="url(#gold)" {line(0.7)}/>')
    out.append(f'<rect x="{CX - 36}" y="{top + 8}" width="72" height="10" rx="1" fill="#fdf6e4" opacity=".92"/>')
    out.append(f'<text x="{CX}" y="{top + 16}" text-anchor="middle" font-family="Cinzel, Georgia, serif" font-size="8" letter-spacing="1.6" fill="#8a6a2e">{NAME}</text>')
    # two storeys of windows with a balcony
    for k in range(6):
        out.append(window(CX - 45 + k * 16.4, top + 26, 8, 15))
    out.append(f'<rect x="{x0 + 8}" y="{top + 46}" width="{x1 - x0 - 16}" height="2.4" fill="url(#gold)" {line(0.5)}/>')
    for k in range(13):
        out.append(f'<path d="M{f(x0 + 10 + k * 7.6)} {top + 48.4}v4" stroke="{INK}" stroke-width=".6"/>')
    out.append(f'<rect x="{x0 + 8}" y="{top + 52}" width="{x1 - x0 - 16}" height="1.6" fill="url(#gold)" {line(0.4)}/>')
    for k in range(6):
        out.append(window(CX - 45 + k * 16.4, top + 52, 8, 13, arched=False))
    out.append(parapet(x0, x1, top, 7, 0.75))
    # raised crown: a curved gable over the name board, rising from the parapet
    out.append(f'<path d="M{CX - 30} {top - 5}q30 -22 60 0z" fill="url(#wall)" {line()}/>')
    out.append(f'<path d="M{CX - 22} {top - 6.5}q22 -15 44 0" fill="none" stroke="{INK}" stroke-width=".6"/>')
    out.append(f'<circle cx="{CX}" cy="{top - 10}" r="2.6" fill="#a67d2b" {line(0.5)}/>')
    out.append(kalasam(CX, top - 15.5, 1.1))
    return "".join(out)


def banana(x, flip=1):
    """A banana plant, the traditional welcome at a wedding entrance."""
    out = [f'<path d="M{x} {GROUND}V{GROUND - 26}" stroke="#7d8a45" stroke-width="2.2" stroke-linecap="round"/>']
    for ang, ln in ((-60, 14), (-25, 16), (15, 15), (50, 13), (-90, 12)):
        out.append(
            f'<path d="M{x} {GROUND - 26}q{f(ln * 0.5)} -5 {f(ln)} 1q{f(-ln * 0.5)} 3 {f(-ln)} -1z" fill="#98a65a" stroke="#6b7338" stroke-width=".45" '
            f'transform="rotate({ang * flip} {x} {GROUND - 26})"/>'
        )
    out.append(f'<ellipse cx="{x + 2 * flip}" cy="{GROUND - 16}" rx="1.8" ry="3.4" fill="#a8643a" opacity=".85"/>')
    return "".join(out)


def porch():
    x0, x1, top = CX - 30, CX + 30, 104
    out = [
        # doorway behind the porch
        f'<path d="M{CX - 12} {GROUND}V{top + 18}a12 11 0 0 1 24 0V{GROUND}z" fill="#a67d2b" {line()}/>',
        f'<path d="M{CX} {top + 8}V{GROUND}" stroke="#8a6a2e" stroke-width=".7" opacity=".7"/>',
    ]
    for px in (x0 + 2, x0 + 14, x1 - 14, x1 - 2):
        out.append(f'<rect x="{px - 2.4}" y="{top + 6}" width="4.8" height="{GROUND - top - 6}" fill="url(#wall)" {line(0.7)}/>')
        out.append(f'<path d="M{px - 4.6} {top + 5.5}h9.2l-2.2 3.4h-4.8z" fill="url(#gold)" {line(0.5)}/>')
        out.append(f'<rect x="{px - 3.4}" y="{GROUND - 2.5}" width="6.8" height="2.5" fill="url(#gold)" {line(0.4)}/>')
    out.append(f'<rect x="{x0 - 4}" y="{top}" width="{x1 - x0 + 8}" height="6" fill="url(#wall)" {line()}/>')
    out.append(parapet(x0 - 2, x1 + 2, top, 5, 0.7))
    # thoranam: mango leaves strung across the porch
    out.append(f'<path d="M{x0} {top + 9}q30 6 60 0" fill="none" stroke="{INK}" stroke-width=".5"/>')
    for k in range(15):
        t = k / 14
        lx = x0 + 60 * t
        ly = top + 9 + 12 * t * (1 - t)
        out.append(f'<path d="M{f(lx)} {f(ly)}q1.5 2.8 0 5.6q-1.5 -2.8 0 -5.6z" fill="#8f9a55" stroke="#6b7338" stroke-width=".35"/>')
    for x, flip in ((x0 - 9, -1), (x1 + 9, 1)):
        out.append(banana(x, flip))
    return "".join(out)


def main():
    body = [
        '<ellipse cx="190" cy="166" rx="176" ry="7" fill="#e6d3a6" opacity=".7"/>',
        f'<rect x="22" y="{GROUND}" width="336" height="7" fill="url(#gold)" {line()}/>',
        f'<path d="M164 157h52l4 4h-60zM160 161h60l4 4h-68z" fill="url(#wall)" {line(0.7)}/>',
        wing(34, 134, 70),
        wing(246, 346, 70),
        centre(),
        porch(),
    ]
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -4 380 178">
<defs>
<linearGradient id="wall" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f1e2bd"/><stop offset=".4" stop-color="#fdf8ec"/><stop offset="1" stop-color="#dcc287"/></linearGradient>
<linearGradient id="gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9b45e"/><stop offset="1" stop-color="#a67d2b"/></linearGradient>
</defs>
{"".join(body)}
</svg>
"""
    OUT.write_text(svg, encoding="utf-8")
    print(OUT)


if __name__ == "__main__":
    main()
