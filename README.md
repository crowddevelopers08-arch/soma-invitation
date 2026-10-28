# Wedding invitation (Next.js 15 + Tailwind v4)

Single-page wedding invitation: envelope intro → opening video + music → hero, countdown,
schedule timeline, location + map, dress code & gifts, RSVP popup, closing photo.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Artwork

Painted artwork lives in `art-src/` and is processed into `public/media/` by:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/prepare-art.ps1
```

| `art-src/` file | Becomes | Notes |
| --- | --- | --- |
| `envelope.*` | `envelope.jpg` | Intro envelope with a blank wax seal; `public/media/monogram.png` (gold on transparent) is overlaid on it |
| `hero-scene.png` | `hero-scene.png` | Arch, swans and corner bouquets on transparency (no text); the bouquets overhang the paper card |
| `hero-arch.*` | `hero-arch.jpg` | Older arch-only scene (unused) |
| `closing-photo.*` | `closing-photo.jpg` | Couple photo (update `media.closingPhoto` to the .jpg) |
| `floral-corners.*`, `bouquet.*`, `bouquet-corner.*`, `rose-vine.*`, `peony.*` | transparent `.png` | Watercolours painted on white; the script turns white into transparency |

Torn paper cards (`components/PaperCard.tsx`), the RSVP wax seal (`components/WaxSeal.tsx`) and the
gold ornaments (`divider.svg`, `flourish.svg`, `map-frame.svg`) are drawn in code.

Add `?skipintro` to the URL to jump past the envelope while designing.

## Customising for a client

- **All text, dates, schedule, venue, map link**: `content/invitation.ts`
- **Media** (`public/media/`) — the SVGs are placeholder artwork; replace freely:

| File | Used for | Notes |
| --- | --- | --- |
| (none) | Intro envelope | Drawn in `components/EnvelopeArt.tsx`; the seal monogram uses the couple's initials |
| `intro.mp4` | Envelope-opening video after tap | Optional — skipped if missing |
| `music.mp3` | Background music (looped) | Optional; use music you have rights to |
| `closing-photo.svg` | Photo in the last section | Swap for a jpg and update `media.closingPhoto` |
| `floral-frame.svg`, `garland-*.svg`, `bouquet.svg`, `rose.svg`, `petal.svg`, `divider.svg`, `flourish.svg`, `ornament.svg`, `venue.svg`, `map-frame.svg`, `wax-seal.svg` | Decorations | Keep the same file names, or update paths in `app/page.tsx` |

- **RSVP responses** are POSTed to `app/api/rsvp/route.ts`, which currently only logs them.
  Forward them to Google Sheets, email or a database there.

## How the layout works

Each section is an `Artboard` (`components/Artboard.tsx`): a fixed-height board where elements
are absolutely positioned relative to the centre (`left-[calc(50%+Xpx)]`). On narrower screens
the whole board is scaled to the window using the 1200/960/640/480/320 breakpoint grid
(`--zs`, set in `app/layout.tsx`), so the design looks identical on every phone.
