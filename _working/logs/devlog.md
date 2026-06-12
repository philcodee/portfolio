# Policy Admin Case Study — Dev Log

## Source Files
- `policy-admin.csv` — raw case study content (STAR format)
- `brutalist-css.css` — design system stylesheet (monospace, black & white, no-apologies)
- `policy-admin.html` — output page (all work below)

---

## 1. Initial HTML Build

Reviewed `policy-admin.csv` and rendered its content into a structured HTML page using `brutalist-css.css`.

The CSV contained four STAR-format rows (Situation, Task, Action, Result), each with:
- A label column
- A sub-questions column
- A full prose response column

The first version preserved the STAR structure directly: four `<section>` blocks, each with a label chip, the guiding questions displayed in a left-bordered aside, and entry-labeled paragraphs for each sub-topic.

---

## 2. Restructured for a Hiring Manager

Moved away from STAR format entirely. The new priority order:

1. **Hero** — company, role, one-sentence outcome
2. **Key Outcomes** — 3-column stat bar (Series A / Mid→Hi / 24hr)
3. **My Ownership** — what I led, what I made, key decision, who I worked with
4. **Prototype** — embed zone
5. **The Problem** — context and constraints
6. **The Approach** — strategy and process
7. **Lessons & Trade-offs** — closing

Rationale: hiring managers scan for *what shipped* and *what you owned* before they read context. STAR buries the result at the end.

Removed the guiding question blocks. Entry labels now name outputs and decisions, not prompts.

---

## 3. Image Placeholders, Prototype Zone & Scroll Animations

### Image Placeholders
Four `<figure>` blocks with dashed-border `.placeholder-box` elements. Each labeled with the intended asset and a `<figcaption>`.

| Asset | Location |
|---|---|
| Mid-fi prototype screens (3-up grid) | My Ownership → What I Made |
| Team / process photo | The Approach → after Process entry |
| Sitemap / IA diagram | The Approach → closing |

Note: Cover Whale building photo was added here but later removed as unnecessary.

### Prototype Embed Zone
A dedicated section between My Ownership and The Problem. A `min-height: 480px` bordered placeholder with instructional text. When the prototype is ready, the inner content is replaced with an `<iframe>`.

### Scroll Animations
- **Intersection Observer** fires once per element as it enters the viewport at `threshold: 0.12`
- Elements carry `data-animate` attribute; observer adds `.visible` class
- CSS: `opacity: 0; transform: translateY(20px)` → `opacity: 1; transform: translateY(0)` via `cubic-bezier(0.25, 0.46, 0.45, 0.94)` over `0.65s`
- **Hero** uses a CSS `@keyframes heroFade` instead (already in viewport on load, no observer needed)
- **Stagger**: JS assigns `transitionDelay` to `[data-animate]` siblings within the same parent — scoped with `:scope > [data-animate]` so it only affects direct siblings, not arbitrary nth-children

---

## 4. Whitespace & Scroll Snap

### Whitespace increases
| Property | Before | After |
|---|---|---|
| `.section` padding | `3rem` margin | `7rem 0 6rem` padding |
| `.entry` margin | `2rem` | `4rem` |
| `.two-col` gap | `2rem` | `5rem` |
| `h2` margin-bottom | `1rem` | `3.5rem` |
| Hero padding | `2.5rem 2rem` | `5rem 2rem 4.5rem` |
| `figure` margin | `2.5rem` | `3.5rem` |

### CSS Scroll Snap
- `scroll-snap-type: y proximity` on `html` — snaps when near a boundary, does not trap users inside tall sections
- `.snap-section` class applies `scroll-snap-align: start` to each major section
- Snap points: Hero+Outcomes, My Ownership, Prototype, The Problem, The Approach, Lessons
- **Disabled on mobile** (`max-width: 768px`) — touch-based snapping is unreliable

---

## 5. Full-Height Editorial Panels

Converted **My Ownership** (4 entries) and **The Approach** (2 entries) from stacked text blocks into full-viewport split panels.

### Panel structure
- `min-height: 100vh` — each entry occupies its own screen
- `display: grid; grid-template-columns: 1fr 1fr` — text half / image half
- Alternating layout: odd panels = text left / image right, even panels = `.alt` (image left / text right)
- A small muted `panel-section-label` above each `h3` keeps section context visible as you scroll through individual panels
- Each panel is its own `scroll-snap-align: start` point

### Panel image placeholders

| Panel | Image |
|---|---|
| What I Led | Process / feedback loop photo |
| What I Made | 3 prototype screen frames (horizontal) |
| Key Decision I Drove | Agent View vs Agency View decision diagram |
| Who I Worked With | Team structure / stakeholder map |
| Strategy | Sitemap / IA diagram |
| Process | Team collaboration photo (NY–Zurich) |

### Full-viewport breakout
Panels break out of the body's `max-width: 900px` constraint using:

```css
.panel {
  width: 100vw;
  margin-left: calc(-1 * ((100vw - 100%) / 2 + 2rem));
}
```

This accounts for both the body's centering offset and its `2rem` padding. The text side is constrained with `max-width: 640px` and right-justified within its half to stay readable. Mobile resets the breakout to `width: 100%; margin-left: 0`.

The three prototype screen placeholders switched from a vertical stack to a horizontal 3-column grid once the image column had full viewport width to work with.

---

## 6. Table of Contents

A fixed right-side `<nav class="toc">` that:
- Appears only at `min-width: 1280px` (where the viewport has enough margin outside the 900px body)
- Lists all sections grouped by parent: standalone items (Outcomes, Prototype, The Problem, Lessons) and sub-items under My Ownership and The Approach
- Group labels are muted, non-clickable — wayfinding only
- Active section highlighted via a second `IntersectionObserver` at `threshold: 0.3` — inverts the active link (black background, white text)
- Clicking any link jumps to its `id` anchor

### Section IDs added
`#intro`, `#panel-what-i-led`, `#panel-what-i-made`, `#panel-key-decision`, `#panel-who-i-worked-with`, `#prototype`, `#the-problem`, `#panel-strategy`, `#panel-process`, `#lessons`

---

## Mobile Considerations
- Scroll snap disabled at `max-width: 768px`
- Body padding removed; hero goes edge-to-edge
- Panels collapse to single column (image above, text below)
- All multi-column grids (outcomes, two-col, placeholder-grid, panel-placeholder-grid) collapse to 1fr
- Section padding reduced from `7rem` to `4rem 1.25rem`
- TOC hidden at `max-width: 1280px`

---

## Still To Do
- Replace prototype embed placeholder with static wireframe `<iframe>` once built
- Supply actual image assets for all `placeholder-box` and `panel-placeholder` zones
- Replicate TOC and panel patterns for additional case studies
