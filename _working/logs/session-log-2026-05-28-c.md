# Session Log — 2026-05-28
**Project:** Policy Admin System Case Study  
**Working directory:** `/Users/philcote/Documents/portfolio`

---

## Files Touched

| File | Action |
|---|---|
| `sitemap.html` | Created, then extensively revised |
| `site-map.md` | Created from PNG review, then updated per `site-map-edits.md` |
| `site-map-edits.md` | Reviewed and applied (file deleted) |
| `policy-admin.html` | Modal added, layout fixes, scroll/breakout fixes |
| `brutalist-css.css` | Background color, scrollbar-gutter |
| `svgs/` | Created — all 53 SVG files consolidated from portfolio root |
| `session-2026-05-28.md` | This file |

---

## Work Done

### 1. SVG Consolidation
All 53 SVG files (Figma exports including connector lines, section nodes, and feed labels) were moved from the portfolio root into `/svgs/`. Several files had `/` characters in their names, creating nested subdirectories — those were resolved and empty directories cleaned up.

---

### 2. Site Map Review → `site-map.md`
Reviewed `site-map.png` (exported at 2x for legibility) and produced an initial structured markdown. A follow-up crop of the Global + role matrix section clarified:
- Global hierarchy: `'New Quote' CTA → Pre-Submission Form / Start Application`
- Dashed lines show cross-section notification routing into `Global > Notifications`
- Four sources feed Notifications: Messages > Received, Policies > Bound/At-Risk/NOC, Quotes > In Review/Bindable, Submissions > Declined

---

### 3. `sitemap.html` — Built and Revised

**Initial build:** 6-column grid matching the Figma sitemap structure. Purple column headers, bullet-point sub-sections, notification routing table at the bottom.

**Iterations:**
- Removed brand purple → black column headers
- Font size increased: 13px → 15px → 17px
- Column min-width expanded for readability
- Layout restructured from 6-column → 2×3 grid → back to 6-column after scroll issues at each stage
- Final approach: **6-column, node-based layout** — sub-sections shown as labeled nodes with one condensed detail line. Bullet points removed. `grid-template-rows: 1fr` forces columns to fill full height so borders extend to the bottom.
- Notification routing collapsed into a compact black footer strip
- `overflow: hidden` on `html/body` — page never scrolls; `grid-template-rows: 1fr` distributes content proportionally

**Mobile:** Added `@media (max-width: 768px)` — stacks to single column, restores vertical scroll, removes min-width constraint.

---

### 4. `site-map.md` — Updated per `site-map-edits.md`

Six edits applied:

1. **Metadata** — title/subtitle updated (`Policy Admin Platform — Site Map / Cover Whale · Q1 2024`)
2. **Nav bar line removed** — redundant with section headers
3. **Dashboard table → labeled list** — `### KPI Counts` with "feeds from" annotations inline
4. **Inline `→ NOTIF` flags** — added to: Policies > In-Force, At-Risk, Cancellations; Quotes > Bindable, In Review; Submissions > Declined; Messages > Sent/Received
5. **Notification Triggers table removed** — context now inline at source
6. **Global expanded** — four proper sub-sections: Navigation, Pre-Submission Form (with Start Application nested), Notifications (with aggregation description), Account

These changes were then pushed to `sitemap.html` — Global column restructured to match.

---

### 5. Modal — `policy-admin.html`

**Added:**
- "View Site Map →" button in the *What I Made* panel
- Full-screen modal with `<iframe src="sitemap.html">`
- Backdrop click and Escape key to close

**Revised through the session:**
- Overlay: `rgba(0,0,0,0.85)` → `rgba(120,120,120,0.45)` → `transparent`
- Modal size: near-fullscreen → `92vw × 88vh`
- Dithered drop shadow via `::after` pseudo-element: `repeating-conic-gradient` checkerboard at 6px tile, offset `18px` down-right
- Mobile: modal goes `100vw × 100dvh`, shadow hidden
- Page-shift-on-open bug fixed by removing `document.body.style.overflow` toggling; `scrollbar-gutter: stable` added to `brutalist-css.css`

---

### 6. Layout Fixes — `policy-admin.html`

**Background:** Changed to `hsl(0, 0%, 95%)` in `brutalist-css.css`.

**Scroll snap:** `y proximity` → `y mandatory`.

**TOC:** Was blocking content. Attempted `padding-right: 10rem` on body — this broke child element `100%` calculations in the full-bleed breakout formula. Reverted. Root cause documented below.

**Full-bleed breakout (hero + outcomes grid):**  
The existing panel breakout used `margin-left: calc(-1 * ((100vw - 100%) / 2 + 2rem))`. `100%` resolves to the body's *content* width (900px − padding × 2 = 836px), not the border-box width (900px). This causes a systematic 32px left-shift. Adding `padding-right: 10rem` to body made `100%` = 708px, dramatically worsening the shift.

**Fix:** Replace `100%` with `min(900px, 100vw)` → simplified to `max(0px, (100vw - 900px) / 2)`:
```css
margin-left: calc(-1 * (max(0px, (100vw - 900px) / 2) + 2rem));
```
Hero content re-centered via `.hero-inner { max-width: 900px; margin: 0 auto; padding: 5rem 2rem 4.5rem; }`.

**Mobile resets added** — breakout CSS disabled at `max-width: 768px`.

---

## Key Decisions

| Decision | Reason |
|---|---|
| Sitemap as nodes (no bullet points) | Only way to fit 6 columns in viewport without any scroll |
| Notification routing as footer strip | Redundant with inline badges; collapsing it saves ~200px of height |
| `grid-template-rows: 1fr` on sitemap grid | Forces all columns to full height so border-right dividers extend to bottom |
| No overlay on modal | Transparent feels lighter; the dithered shadow provides sufficient visual separation |
| Removed `overflow` body toggle on modal open | Was causing ~15px layout shift as scrollbar appeared/disappeared |
| Mobile: full-screen modal + stacked sitemap | 6-column diagram physically cannot fit on narrow viewports |
