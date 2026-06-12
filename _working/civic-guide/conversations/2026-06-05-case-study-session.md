# Session Notes — June 5, 2026

## What we worked on

Building the CivicGuide case study presentation — two HTML pages using a shared brutalist CSS design system, with linked navigation and embedded UI mock components from the live app.

---

### Files created

- **`civicguide-case-study.html`** — Main project case study. Hero with embedded Phase 2 scan confirm mock, outcomes grid, setup/problem/insight sections, five-phase lifecycle diagram, four key decision panels with embedded UI mocks, outcome section.
- **`civic-trust-research.html`** — Research foundations case study. Hero with stat block, outcomes grid, design brief, synthesis, trust data table, user mapping panel, civic lifecycle diagram, Arnstein's Ladder, problems + HMW questions, design principles, bridge to CivicGuide.
- **`asset-map.md`** — Documents every placeholder in both pages, what asset should replace it, capture method, and recommended filename.

Both pages are cross-linked (hero nav links in each direction).

---

### Typography system — `brutalist-css.css`

Significant work establishing a dual-font system:

- **Caprasimo** (Google Fonts) — h1, h2, h3, `.lc-caption`
- **Space Grotesk** (Google Fonts) — `p`, `li`, `blockquote`, `td`, `.lc-item`, `.lc-stage-label`, `td strong`
- **IBM Plex Mono / ui-monospace** — all structural/label elements: `.tag`, `.caption`, `.entry-label`, `.panel-section-label`, `th`, buttons, inputs, `.lc-section-head`, dot nav, outcome labels

**Type scale settled on:**
| Element | Size | Font |
|---|---|---|
| h1 | `clamp(2.5–5rem)` | Caprasimo |
| h2 | `clamp(1.5–2.5rem)` | Caprasimo |
| panel h3 | `clamp(1.75–2.25rem)` | Caprasimo |
| `.lc-caption` | `clamp(1.5–2.25rem)` | Caprasimo |
| hero p | `1.35rem / 500` | Space Grotesk |
| body p / li | `1.2rem` | Space Grotesk |
| td / lc-item | `1.05rem / 0.95rem` | Space Grotesk |
| labels / chrome | `0.6–0.8rem` | Monospace |

Key fixes during iteration:
- `h3` base raised to `1.5rem` — was indistinguishable from `1.2rem` body
- `.panel-section-label` reduced to `0.6rem` — was visually competing with h3
- `p a:hover` scoped separately — global black-fill invert too aggressive for inline paragraph links

---

### Lifecycle diagram fixes — `brutalist-css.css`

- **Dithered drop shadow** added to `.lc-stage` via `::after` with `repeating-conic-gradient`, matching `.cg-mock-frame` shadow treatment
- **Uniform cell heights**: `.lc-diagram { align-items: stretch }`, `.lc-stage { display: flex; flex-direction: column }`, `.lc-statuses { flex: 1; display: flex; flex-direction: column }`, `.lc-item { flex: 1 }` — all cells now distribute evenly regardless of content count
- **`.lc-section-body`** widened from `900px` to `1200px` to reduce cell text wrapping
- `.lc-stage-label` reduced to `0.9rem` with tighter padding to prevent "4 — Participation" wrapping
- `.lc-item` text trimmed across both HTML files to fit narrow columns without mid-phrase breaks

---

### Table system standardisation

Eliminated three different inline font-size values (0.78, 0.85, 0.9rem) and repeated inline `width/background/margin` declarations across all tables. Replaced with CSS rules:

```css
.cg-mock-frame table { background: #fff; margin: 0; }
.box--dark table     { margin-top: 1.25rem; margin-bottom: 0; }
.box--dark td        { color: #fff; border-color: rgba(255,255,255,0.15); }
.box--dark th        { background: rgba(255,255,255,0.12); }
.box--dark tr:nth-child(even) td { background: rgba(255,255,255,0.06); }
.box--dark tr:hover td           { background: rgba(255,255,255,0.15); color: #fff; }
```

All `<table>` elements in both HTML files stripped to bare tags — sizing comes entirely from CSS.

---

### Data visualisation consolidation — `civic-trust-research.html`

Removed a 53-line inline `<style>` block containing two one-off component systems:

**Replaced `.trust-viz` bar chart** (custom flex bars with inline width percentages and 12 bespoke classes) → plain `<table>` inside `cg-mock-frame`

**Replaced `.arnstein` ladder** (custom zone/rung div system with 7 classes) → plain `<table>` with `<th colspan="2">` zone separator rows — existing `th` black background does the zone work automatically. Non-Participation rows use `opacity: 0.4`.

**Moved Arnstein's Ladder** out of the Design Principles two-column layout (where it was an afterthought) into its own `lc-section` between the Civic Lifecycle diagram and the Problems section, with explanatory copy alongside.

Both pages now share exactly two data viz patterns: `cg-mock-frame + table` and `box--wide box--dark + table`.

---

### Hero stat block — `civic-trust-research.html`

Iterated through several approaches before settling on a two-panel stat block tied to administrative burden:

- **42%** — low-income households faced food insecurity in 2010, eligible for benefit programs requiring multi-step applications
- **13%** — low-income Americans trusted the government systems designed to help them through the process

Numbers rendered in Caprasimo at `clamp(3.5–5.5rem)`. Top panel white, bottom panel black invert. The gap between the two numbers is the administrative burden argument — people who need help most trust the process least.

Previous attempts discarded: broadband access (not about forms), young adults trust decline (not about burden), race-based framing (too narrow).

---

### CivicGuide component fixes — `civicguide-components.css`

**Font fix:** Added `font-family: var(--ff-sans)` to `.cg-mock p, .cg-mock li, .cg-mock td` — the global Space Grotesk rule was overriding IBM Plex Sans inside mock components.

**Typewriter animation:** Added IntersectionObserver-based typewriter to both HTML pages. Fires once per `.agent-brief-text` at 80% visibility, 15ms/char (matching real app speed), preserves `.cg-cursor` blink at end of text.

```javascript
function typewriteEl(el, speed = 15) {
  const cursor = el.querySelector('.cg-cursor');
  const text = Array.from(el.childNodes)
    .filter(n => n.nodeType === 3).map(n => n.textContent).join('');
  Array.from(el.childNodes)
    .filter(n => n.nodeType === 3).forEach(n => n.remove());
  const textNode = document.createTextNode('');
  el.insertBefore(textNode, cursor || null);
  let i = 0;
  (function tick() {
    if (i < text.length) { textNode.textContent += text[i++]; setTimeout(tick, speed); }
  })();
}
```

---

## Decisions & Notes

- **`cg-mock-frame` background bleed fix:** Tables inside `cg-mock-frame` need `background: #fff; margin: 0` and the `<table>` element's own background set to white — the dithered `::after` (z-index: -1 within the stacking context) bleeds through transparent table cells. The frame's own `background` doesn't help because element background paints before negative z-index children in the stacking context paint order.
- **Caprasimo font-weight:** Always use `font-weight: 400` — Caprasimo is a single-weight display face; forcing 900 triggers synthesis and looks wrong.
- **Space Grotesk runs visually smaller** than monospace at the same rem value — requires a bump of roughly 0.15rem to look equivalent.
- **`p a:hover` override** added — the global black-fill invert is correct for standalone links but renders as an opaque black rectangle on inline paragraph links.

---

## Open items

- All placeholder boxes in both pages need real screenshots from the live app (see `asset-map.md`)
- The `civicguide-components.css` scan path text (`.scan-path-text p`) currently inherits brutalist-css sizing — may need explicit IBM Plex Sans override if Space Grotesk bleeds through there too
