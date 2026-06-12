# Case Study Asset Map

Two HTML pages, all placeholder content documented below. Each entry notes the placeholder location, what the asset should show, and the recommended capture method.

---

## civic-guide-case-study.html

### Hero Section
**Placeholder:** Vertical text list "Upload → Scan → Fill → Review → Export"
**Replace with:** A screenshot or screen recording still of the live app — ideally the Phase 2 scan confirm screen showing the AI brief typewriting in, the domain chip, and the doc type label. Captures the document-first premise in a single frame.
**Asset type:** Screenshot (PNG), cropped to the panel-image column width
**Suggested filename:** `hero-scan-confirm.png`

---

### Panel 01 — Two Scan Paths
**Placeholder:** Three-cell grid: "AcroForm Extract / Text Classify / Vision Fallback"
**Replace with:** Three UI states side by side:
1. The upload zone with a PDF file loaded (Phase 1 complete)
2. The Phase 2 AcroForm fast-path thinking state (dots + "Found N fields — reading the form…")
3. The Phase 2 vision path retry countdown (pip track + file card + countdown message)
**Asset type:** Three screenshots arranged as a 3-up grid, or a single composite image
**Suggested filenames:** `scan-upload.png` · `scan-acroform-thinking.png` · `scan-vision-retry.png`

---

### Panel 02 — Agent Brief Component
**Placeholder:** Single box "Agent Brief Component / Role badge / Thinking dots / Typewriter reveal"
**Replace with:** A screenshot of the agent brief in its active state — dark background block, role badge on the left, typewritten message mid-reveal (or fully revealed). Phase 2 or Phase 3 entry works best; both show the brief with meaningful content.
**Asset type:** Screenshot (PNG), full-width of the brief component
**Suggested filename:** `agent-brief-active.png`

---

### Panel 03 — Form State Persistence
**Placeholder:** Single box "Restore Screen Pattern / Doc type / Continue / Start fresh"
**Replace with:** A screenshot of the restore screen overlay — the card showing the saved doc type (e.g. "MV-82 — Vehicle Registration"), the "Continue my form" and "Start fresh" buttons. Alternatively the account panel showing a saved forms list with per-row Continue / Delete.
**Asset type:** Screenshot (PNG)
**Suggested filenames:** `restore-screen.png` or `account-panel-saved-forms.png`

---

### Panel 04 — UX Principles Audit
**Placeholder:** Single box "UX Principles Audit Table / Gap → Action / Per session"
**Replace with:** A table or structured diagram showing the five principles mapped to specific features — e.g. "Latency Tolerance → specific scan status messages", "Trust Calibration → Verify badge on low-confidence hints". Can be a designed artifact or a clean screenshot of the `2026-04-23-ux-principles-audit.md` content formatted as a table.
**Asset type:** Screenshot or designed graphic (PNG)
**Suggested filename:** `ux-principles-map.png`

---

### Lifecycle Diagram (lc-section)
**No placeholder** — rendered as HTML. No asset needed. Consider adding annotated screenshots inline with each stage label if further depth is wanted.

---

### Outcome Section — Open Threads Box
**No placeholder** — text only. No asset needed.

---

---

## civic-trust-research.html

### Hero Section
**Placeholder:** "Trust in Government 1972 → 2020 / 48% / ↓ / 17%"
**Replace with:** A still from the `civic-trust-in-america` animated view — either the 1972 starting state showing demographic fill columns at their peak, or the 2014 floor state showing the lowest values. Dark background (`--ink`), fill columns, national trust line on canvas.
**Asset type:** Screenshot from `civic-trust-in-america/index.html` (PNG)
**Suggested filename:** `trust-animated-2014.png`

---

### User Mapping Panel — Image Column
**Current state:** Contains the archetype table (already rendered as HTML — not a placeholder).
**Optional enhancement:** A photo or desaturated illustration to set tone. The `civic-trust-in-america/images/` folder has decade montages and event photography that could be used here.
**Available images in project:**
- `assets/1972-events-collage.jpg`
- `assets/1980-events-collage.jpg`
- `assets/1990-decade-montage.png`
- `assets/2000-decade-montage-3.png`
- `images/2010-financial-crisis.png`
- `images/2014-ferguson-protest.png`
- `images/2020-blm.jpg`
**Suggested use:** One image per decade in a stacked or rotating panel, or a single anchor image for the section.

---

### Arnstein's Ladder Placeholder
**Placeholder:** `.placeholder-box` in the Design Principles section, right column
**Replace with:** A simple diagram of Arnstein's Ladder — 8 rungs from Manipulation (bottom) to Citizen Control (top), with the three zones marked: Non-Participation, Tokenism, Citizen Power. Can be designed as an SVG or as a clean HTML/CSS diagram within the page itself.
**Asset type:** SVG or PNG
**Suggested filename:** `arnsteins-ladder.svg`

---

---

## Asset Capture Notes

### Screenshots from the live CivicGuide app
All Phase 1–5 screens can be captured by running the app locally (`node server.js`) and screenshotting at each state. Key states to prioritize:
- Phase 1: Upload zone with a PDF loaded
- Phase 2: AcroForm thinking state (before confirm)
- Phase 2: Scan confirm (agent brief typewritten, domain chip visible)
- Phase 2: Retry pip track + file card (trigger with `?demoFail=2` in the URL)
- Phase 3: Fill form with section heading, hints, and pre-filled fields (blue borders)
- Phase 3: Low-confidence "Verify" badge on a field hint
- Phase 4: Review table with all field/value pairs
- Phase 5: Export screen
- Restore screen overlay
- Account panel with saved forms list

### Recommended capture settings
- Browser window: 1280px wide
- Device pixel ratio: 2× (Retina) for sharp PNGs
- Format: PNG for UI screenshots, JPG acceptable for photographic assets
- Place all assets in a new `assets/` subfolder within `civic-guide-case-study/`

### Reference images (already available)
Located at `../civic-trust-in-america/images/` relative to this folder. Can be referenced directly or copied into `assets/` for self-contained deployment.
