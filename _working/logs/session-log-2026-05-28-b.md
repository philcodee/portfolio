# Session Log — 2026-05-28 (cont.)
**Project:** Cover Whale Portfolio — platform-architecture.html, brutalist-css.css

---

## Files Modified

- `platform-architecture.html` — lifecycle diagram, popup, inline style refactor
- `policy-admin.html` — inline style refactor
- `brutalist-css.css` — portfolio components added, visual fixes
- `images/` — created, all PNGs moved and renamed
- `docs/`, `build/`, `logs/` — created, all markdown files organized

---

## File Organization

### Images
All PNGs moved from portfolio root into `images/` and renamed to kebab-case:
- `Dashboard.png` → `images/dashboard.png`
- `All Submissions.png` → `images/all-submissions.png`
- `Submission_Pending.png` → `images/submission-pending.png`
- `Quotes_Bindable.png` → `images/quotes-bindable.png`
- `Policies_In-Force.png` → `images/policies-in-force.png`
- `Site Map.png` → `images/site-map.png`

Updated all `src` and `alt` attributes in `platform-architecture.html` to match.

### Markdown files
Reorganized from root into three folders:

| File | New Location |
|---|---|
| `cs1_platform_architecture.md` | `docs/case-studies/cs1-platform-architecture.md` |
| `cs2_quote_application.md` | `docs/case-studies/cs2-quote-application.md` |
| `cs3_messages_events_tickets.md` | `docs/case-studies/cs3-messages-events-tickets.md` |
| `ia_rationale.md` | `docs/reference/ia-rationale.md` |
| `site_map.md` | `docs/reference/site-map.md` |
| `editing_instructions.md` | `build/editing-instructions.md` |
| `claude_code_prompt_lifecycle.md` | `build/lifecycle-diagram-prompt.md` |
| `DEVLOG.md` | `logs/devlog.md` |
| `SESSION_2026-05-28.md` | `logs/session-2026-05-28.md` |
| `SESSION_LOG_2026-05-28.md` | `logs/session-log-2026-05-28.md` |

`site_map_edits.md` deleted — edits had already been applied.

### Naming convention
All files and references updated to kebab-case throughout, including:
- `brutalist_css.css` → `brutalist-css.css` (already renamed; references updated in both HTML files and all log files)
- Old image names updated in log files to match new paths

---

## CSS Refactor — brutalist-css.css

### Portfolio components added
Moved all reusable component styles out of HTML inline `<style>` blocks and into `brutalist-css.css` under a new `PORTFOLIO COMPONENTS` section. Components added:

- Page layout: `.snap-section`, `@keyframes heroFade`
- Hero: `.hero`, `.hero-inner`, `.hero-text`, `.hero-image`
- Outcomes grid: `.outcomes-grid`, `.outcome-item`
- Panel system: `.panel`, `.panel-text`, `.panel-image`, `.panel.alt`, `.panel-section-label`, `.panel-placeholder`
- Section/entry: `.section`, `.entry`, `.entry-label`, `.two-col`, `.placeholder-box`, `.placeholder-grid`
- Scroll animations: `[data-animate]`, `[data-animate].visible`
- Dot nav: `.dot-nav`, `.dot-nav-item`
- Image components: `.img-frame`, `.img-wrap`
- Card stack: `.card-stack`
- Box variants: `.box--dark`, `.box--wide`
- Lifecycle diagram: all `.lc-*` classes
- Lifecycle popup: `.lc-popup-wrap`, `.lc-popup`, `.lc-popup-title`, `.lc-popup-section-label`, `.lc-popup-body`, `.lc-popup-list`
- Responsive breakpoints for all of the above

New CSS variables added to `:root`: `--gray-dark: hsl(0, 0%, 30%)`, `--gray-mid: hsl(0, 0%, 90%)`.

### Base background updated
`html` and `body` base background changed from `hsl(0, 0%, 95%)` to `hsl(0, 0%, 90%)` — aligns with page component backgrounds, eliminates contrast between explicit and inherited backgrounds.

### HTML inline styles reduced
Both HTML files stripped to page-specific overrides only:

**platform-architecture.html** — scroll snap, hero color, lc-section background, figure margin, mobile resets.

**policy-admin.html** — scroll snap, black hero overrides, panel image color, prototype embed component, mobile resets.

---

## Lifecycle Diagram — platform-architecture.html

### Simplification
Removed elements that required too much context to read at a glance:
- `↩ copy` indicator on Expired status
- `↻` loop symbol on Upcoming Renewal
- All `→ N` notification trigger badges
- Legend (Terminal / Hold / At-Risk / Loops / Notification trigger)
- All `lc-item--*` variant modifier classes — all items now use plain `lc-item`

### Clickable popups
Each status row is now clickable. Click opens a popup showing:
- **ACTIONS** — what the agent can do from this status
- **EXIT POINTS** — what statuses this can transition to

Data stored as `data-title`, `data-actions`, `data-exits` attributes on each `.lc-item--clickable`.

Popup behavior: click to open, click outside or Escape to close. Scroll is locked (via wheel/touchmove event interception) while popup is open, scrollbar remains visible.

**Bug fixed:** popup div was placed after the `</script>` tag, so `getElementById('lc-popup')` returned null. Moved popup div before the script block.

### Visual changes
- Stage labels (`lc-stage-label`): dark gray background `hsl(0, 0%, 30%)`, sentence case, bordered
- All item backgrounds: white — removed gray variants that blended into page background
- Clicked state: light gray `hsl(0, 0%, 85%)`, black text
- Popup title bar: light gray `hsl(0, 0%, 85%)`, black text, sentence case
- Popup section labels (ACTIONS / EXIT POINTS): uppercase, `opacity: 0.7`
- Popup body background: light gray `hsl(0, 0%, 85%)`

---

## Scroll Snap
`scroll-snap-stop: always` added to `.snap-section`, `.panel`, and `.section` — prevents snap from skipping sections when scrolling quickly.

---

## Design Decisions

| Decision | Reason |
|---|---|
| Removed lifecycle legend | Required too much prior knowledge; status names are self-explanatory |
| Popup over inline expansion | Keeps diagram compact; detail available on demand |
| `scroll-snap-stop: always` | Ensures each panel gets a moment of attention; prevents fast-scroll skipping |
| `visibility: hidden` over `display: none` for popup | Preserves layout dimensions so positioning is accurate on first open |
| Wheel/touchmove interception for scroll lock | Keeps scrollbar visible; no layout shift on open/close |
| Popup div before `<script>` | DOM must exist before JS queries it — fixes null reference error |
