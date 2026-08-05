# Image Placeholder Checklist — GreenThumb Case Study

Every dashed box in `green-thumb-case-study.html` carries a `PH-##` code. Find one in the page with a text search for its code. Two assets are already in place and need no work.

**Target folder:** `green-thumb/images/`
**Format:** JPG for photos, SVG for diagrams. Keep photos ≤ 1600px on the long edge.

---

## Already in place

| Section | File | Notes |
|---|---|---|
| Hero | `images/gazebo.jpg` | The Green Oasis gazebo — fills the old PH-01 slot. Derived from `gazebo.png` (5712×4284, 37MB) at 1600px / q75, now 826KB. **The source PNG must not be committed** — see the note below. |
| The Prototype | `images/pamphlet-held.png` | Printed cover held in hand — fills the old PH-09 slot. **Needs compression:** currently a 3.3MB PNG at 1190×1845. Convert to JPG at ~1200px wide, quality 80; should land under 300KB. |
| Outside | `images/pamphlet-front.jpg` | Outside spread — story panel, GreenThumb history, reflections, cover. |
| Inside | `images/pamphlet-back.jpg` | Inside spread — five illustrated task columns. |

---

## To source

### PH-02 — Scale / distribution diagram
- **Section:** Macro Findings
- **Priority:** Medium — the prose carries the point already; this makes the coordination range land visually.
- **What:** Five-borough map or dot field showing the 550+ gardens, with Staten Island and Far Rockaway called out as the range endpoints.
- **Spec:** SVG, black-and-white to match the site. Build it rather than screenshot it.
- **Note:** Garden location data is public via NYC Open Data (GreenThumb Garden Info).

### PH-03 — Fieldwork photo: arrival
- **Section:** Fieldwork → Arrival
- **Priority:** High — this is the friction point the whole blueprint hinges on.
- **What:** The garden entrance / front bed as a first-time visitor sees it. Ideally shows that there's no wayfinding signage.
- **Spec:** Landscape, ~1400×900.

### PH-04 — Fieldwork photo: the picnic table
- **Section:** Fieldwork → The Picnic Table
- **Priority:** High — the single best piece of physical evidence in the project.
- **What:** The table mid-workshop: notebooks, pens, coffee cups, nature books, book bags.
- **Spec:** Landscape or square, ~1400×900.
- **Do not:** Stage it, clear it, or re-shoot it clean. The mess is the finding.

### PH-05 / PH-06 / PH-07 — Workshop triptych
- **Section:** Fieldwork → What the Day Was Built From
- **Priority:** Medium — nice to have; the three-up grid still reads if only two land.
- **What:**
  - **PH-05 Tour** — group walking the garden during the history portion.
  - **PH-06 Journaling** — the nature journaling worksheet, or a participant writing out in the beds.
  - **PH-07 Ecosystem map** — the collective relationship web as it was built at the table.
- **Spec:** All three roughly square, ~900×900, so the grid stays even.
- **Consent:** Faces of the high-school attendees should be cropped or avoided. Surya, Catherine, and Mackenzie need a yes before appearing.

### PH-08 — Survey results chart
- **Section:** Survey
- **Priority:** Low — **consider cutting.**
- **What:** Visualization of the two findings across three responding gardens.
- **The problem:** A chart makes n=3 look like data. Only build it if the caveat is visible inside the chart itself — e.g. three labeled marks rather than bars, with the response count in the frame. If that can't be done cleanly, delete the figure; the prose already states both findings and the limitation.

---

## Before publishing

- [ ] All six remaining placeholders resolved or deliberately deleted
- [ ] `pamphlet-held.png` compressed and converted to JPG (3.3MB is too heavy to ship)
- [ ] `gazebo.png` (37MB source) removed from the repo or added to `.gitignore` — only `gazebo.jpg` should be committed. GitHub warns above 50MB and this bloats the clone permanently once it lands in history.
- [ ] Every `alt` attribute written for the real image, not left describing the placeholder
- [ ] Photo consent confirmed for anyone identifiable
- [ ] Figure captions still accurate after images are swapped in
- [ ] File sizes checked — no single image over ~400KB
- [ ] Page checked at 375px wide — nothing scrolls the body horizontally
- [ ] Service blueprint reincorporated, or consciously left out (parked in `service-blueprint-parked.html`)
- [ ] Dot nav labels still match the sections after any figure is cut
