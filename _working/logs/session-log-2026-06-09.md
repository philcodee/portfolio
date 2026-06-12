# Session Log — 2026-06-09
**Project:** Chunk: A Dada Manifesto — new case study page (`chunk-manifesto/chunk-manifesto.html`)

---

## Files Modified

- `chunk-manifesto/chunk-manifesto.html` — new case study page (built from scratch)
- `chunk-manifesto/assets/` — asset folder created; images added throughout session
- `index.html` — added `GW · 02 — Chunk` card to Graduate Work section
- `site-nav.js` — added Chunk case study link under Graduate Work dropdown
- `build/chunk-manifesto-build-plan.md` — build plan document (pre-build review)

---

## Build Plan

Reviewed `docs/chunk-manifesto.md` through the Jordan Voss hiring manager lens before building. Key decisions:

- Lead with the editorial muscle: 9 panels → 2 statements. That's the signal a hiring manager reads.
- No manifesto text content on the page — high-level only, as requested.
- Outcomes bar: `4 Formats` / `9 → 2` / `1 Rock` — three cells Jordan will actually scan.
- Explorations broken into individual panels (not a grid) to give images room.

---

## Page Structure

| Section | Component | Notes |
|---|---|---|
| Hero + Outcomes | `.hero` + `.outcomes-grid` | Box front design; 3-cell outcomes bar |
| The Brief | `.panel` | Reference images right; caption below |
| Exploration 01 — The Book | `.panel` | `book.png` |
| Exploration 02 — Tile Print | `.panel alt` | `tile-print.png` at 90% width |
| Exploration 03 — Manifesto as Product | `.panel` | `box-front-design.png` |
| Exploration 04 — Public Installation | `.panel alt` | Slideshow: `table-setup.png` / `participant.png` |
| Outcomes | `.panel` | `booth.png` with caption |

---

## New Components & Patterns

### `.ref-img` — Reference document images
Created for the Brief panel's two side-by-side reference images (Bread & Puppet + Dada manifesto). Key decisions:
- `isolation: isolate` to contain the dithered shadow stacking context
- `grid-template-columns: 1500fr 1608fr` — proportional to each image's natural pixel width so both render at identical heights while maintaining their own aspect ratios
- No `object-fit` cropping — each image renders at its natural ratio

### `.panel-image .img-frame { isolation: isolate }`
Dithered shadows on `img-frame` were being buried behind the `panel-image` background. `isolation: isolate` creates a contained stacking context so the `::after` shadow renders correctly.

### Slideshow (Exploration 04)
Simple ← → button swap (no animation) with a `n / n` counter outside the button group. Counter is plain text to avoid mouse-over friction.

---

## Bugs Encountered

| Bug | Cause | Fix |
|---|---|---|
| `img-frame::after` shadow invisible in panels | `z-index: -1` buried behind panel background | `isolation: isolate` on `.panel-image .img-frame` |
| `img-frame::after` shadow extending far below images | Images nested inside `two-col` → `grid-2` (too narrow, portrait ratio exploded height) | Moved images to flat `grid-2` at section level |
| `[data-animate]` opacity stuck at 0 in panels | IntersectionObserver not firing reliably inside snap-scroll panels | Removed `data-animate` from panel images |
| Mobile images appearing above text | Global mobile CSS sets `.panel-image { order: 1 }` | Page-level override: text `order: 1`, image `order: 2` |

---

## Design Decisions

| Decision | Reason |
|---|---|
| Panel layout for explorations | Each iteration needs image room; grid cells were too small and scanned past |
| Proportional `fr` columns for ref images | Only way to match heights while maintaining each image's own aspect ratio |
| No manifesto text content | User direction: high-level only for hiring manager audience |
| Slideshow with ← → buttons over card-stack | Card stack felt jarring for photos; buttons are calmer |
| Counter outside button group | Avoids mouse-over friction when navigating slides |
| `img-frame--photo` explored and reverted | Tried borderless + darker shadow for photos; user preferred consistent classic border |
