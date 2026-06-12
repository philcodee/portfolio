# Session Log — 2026-05-28
**Project:** Cover Whale Portfolio — Policy Admin Platform case study

---

## Files Modified

- `sitemap.html` — standalone site map iframe
- `policy-admin.html` — full case study page
- `platform-architecture.html` — new case study page (created this session)

---

## sitemap.html

### Header cleanup
- Removed `Policy Admin Platform — Cover Whale — Q1 2024` meta label
- Removed `Information Architecture — Site Map` span from modal header in policy-admin.html
- Removed top black modal header bar entirely
- Moved Close ✕ button into the SITE MAP h1 row; calls `window.parent.closeSitemap()`

### Visual
- Added bottom padding to body
- Fixed awkward shadow edge: removed `z-index: 0` / `isolation: isolate` from `.sitemap-modal`; `::after` at `z-index: -1` now correctly sits behind modal background
- Boosted all text sizes: col headers 0.9→1.05rem, node names 0.8→0.95rem, detail text 0.72→0.85rem, badges 0.58→0.7rem, KPIs/globals, notif strip

### Clickable cells
- Added `data-title` and `data-desc` attributes to all 11 `.sm-node` elements
- Built popup component: fixed position, brutalist border + checkerboard drop shadow, `box-shadow` replaced with `::after` `repeating-conic-gradient`
- Descriptions: 1–2 sentences per cell, drawn from `policy-admin.csv` and `ia-rationale.md`
- Sentences split into `<p>` tags via JS for scannability
- Click to open, click outside or Escape to close, active cell inverts to black

---

## policy-admin.html

### TOC
- Replaced text-based collapsing TOC with dot navigation (10 × 20px squares)
- Each dot: outline square, fills black on active section, label appears as tooltip to left on hover
- Active state tracked via IntersectionObserver
- Hidden below 1280px

### Modal shadow
- Fixed `::after` stacking context so checkerboard shadow renders behind modal correctly

---

## platform-architecture.html (new)

### Created
- Built from `cs1-platform-architecture.md`, styled to match `policy-admin.html` layout
- Same CSS classes, scroll-snap, panel/section rhythm, TOC

### Content structure
1. **Hero** — gray surface, two-column grid (text left, images/dashboard.png right), `border-bottom: 6px solid #000`
2. **Outcomes grid** — Series A / 24 hr / 11 interviews, white background
3. **My Role** — two-col (What I Owned / Who I Worked With) + dark box (How the Work Actually Moved)
4. **The Problem** — Setup (MGA context) + What Research Showed + images/all-submissions.png
5. **The Insight** — "Agents Think in Stages"
6. **Policy Life Cycle** — full-width breakout section, light gray surface
7. **Key Decision 01** — Three Pages Instead of One, card stack carousel
8. **Key Decision 02** — The Soldier View, images/dashboard.png
9. **Key Decision 03** — Account as Primary Identifier
10. **Key Decisions 04 & 05** — Navigation
11. **Validation** — How It Tested / Simplest Validation / Beyond the Platform box

### Editing pass (editing-instructions.md)
- Cut setup sentences, throat-clearing openers, redundant context
- Converted research signal list to prose
- Cut "Time difference wasn't a friction point. It became the engine." (restated previous sentence)
- Cut redundant takeaway box; replaced with Series A + handoff result
- All sections within 60–80 word target for key decisions

### Content additions (from policy-admin.csv)
- MGA business context added to The Setup
- Handoff outcome (mid-fi → hi-fi → FE build) added to Validation
- My Role section: What I Owned, Who I Worked With, NY–Zurich sprint
- Outcomes updated: Series A / 24 hr (replacing process metrics)
- Dashboard panel updated: Manager-level testing confirmed Soldier View decision

### Images
- `images/all-submissions.png` — added to The Problem section with figcaption
- `images/dashboard.png` — hero right column + Key Decision 02 panel
- `images/submission-pending.png`, `images/quotes-bindable.png`, `images/policies-in-force.png` — card stack in Key Decision 01

### Image styling (.img-frame)
- `border: 3px solid #000`
- Dithered drop shadow: `::before` with `repeating-conic-gradient` at `translate(6px, 10px)`, `z-index: -1`
- `margin-bottom: 18px` to clear shadow from caption
- Figcaption: `text-transform: none` override (brutalist-css forces uppercase)

### Card stack carousel (Key Decision 01)
- Three images stacked diagonally: `translate(0,0)` / `translate(22px,22px)` / `translate(44px,44px)`
- Click cycles front card to back via `appendChild` — nth-child CSS reassigns positions
- `transition: transform 0.35s cubic-bezier(...)` animates all three cards simultaneously
- Order: Submission Pending (front) → Quotes Bindable → Policies In-Force
- Mobile: reduced offsets (12px/24px), extra margin for breathing room

### Policy Life Cycle diagram
- Built from `lifecycle-diagram-prompt.md` spec
- Three-stage left-to-right flow: Submission → Quote → Policy
- Status types: primary (happy path, bold + left border), terminal (muted), hold (dashed left border), warn (heavier weight), loop (inverted)
- `→ N` notification badges on: Declined, Bindable, In Review, At-Risk, Pending Cancellation
- Caption: larger, sentence case, black text
- Legend: Terminal / Hold / At-Risk / Loops / Notification trigger
- Mobile: stacks vertically, `→` connectors become `↓` via `::before` + `color: transparent`
- Fixed mobile overflow: breakout CSS moved to second `@media` block after lifecycle styles

### TOC → Dot nav
- 20×20px squares, `gap: 10px`, `right: 1rem`
- Hover: square fills black + label tooltip appears to left
- Active: filled black + label always visible
- 10 dots covering all sections
- IntersectionObserver tracks active section

### Surface / color system
- Page background: `hsl(0,0%,90%)` uniform gray
- Hero, Lifecycle section: `hsl(0,0%,90%)`
- Outcomes grid, TOC: `#fff` (component distinction)
- Panel images: `hsl(0,0%,90%)`
- "How the Work Actually Moved" box: `hsl(0,0%,20%)` dark gray, white text, `.box--dark` class
- All layout broken up by `3px` / `6px solid #000` borders

### Bottom section renamed
- "Outcome" → "Validation"

### Bugs fixed
- Breakout overflow: corrected `+ 5rem` → `+ 2rem` after body padding was reverted
- Panel formula mismatch causing left-side clipping
- `h2` border-left (`brutalist-css.css`) overridden inline in Insight section
- lc-section mobile breakout: second `@media` block ensures correct cascade order

---

## Shared (both pages)

### TOC → Dot nav
- Applied to `policy-admin.html` and `platform-architecture.html`
- Replaces collapsing text TOC (which truncated awkwardly at 28px)
- Same CSS, same IntersectionObserver pattern, different section sets per file

### Shadow fix (sitemap modal)
- `.sitemap-modal` stacking context corrected in `policy-admin.html`

---

## Design decisions logged

| Decision | Rationale |
|---|---|
| Dot nav over collapsing text TOC | Text truncated at any collapsed width; dots are always correct size regardless of label length |
| 1-2 sentence popup descriptions | Hiring manager reads 2-3 min; every sentence must change what they think |
| Card stack carousel via `appendChild` | DOM reorder triggers nth-child CSS reassignment; transform transitions animate naturally |
| `color: transparent` on connector, `::before` for ↓ | `font-size: 0` did not reliably hide arrow glyphs on all browsers |
| Lifecycle section light gray (not dark) | Dark treatment created two competing arrow styles; white component boxes on dark bg were visually inconsistent |
| Dithered shadow via `repeating-conic-gradient` | Matches modal shadow pattern already in use; consistent visual language |
| Series A + 24hr in outcomes grid | Outcome metrics > process metrics for hiring manager read |
