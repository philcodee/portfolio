# Cover Whale Design System

A design system for **Cover Whale** — a commercial trucking insurance platform. This is the **Agent Portal**: the internal/external surface where insurance agents submit applications, manage quotes, bind policies, process endorsements, and handle renewals/cancellations for trucking carriers (DOT-registered fleets).

The system is built on **Vuetify 3** (Material-flavoured Vue component library), restyled with Cover Whale's purple-on-white brand. Every component is a `v-*` class — `v-btn`, `v-chip`, `v-data-table`, `v-text-field`, `v-app-bar`, `v-list`. Density is comfortable-to-compact; tables and forms dominate.

## Sources

- **Figma file**: attached `test.fig` (mounted as VFS). Top-level pages used:
  - `Style-Guide/` — primitives, typography, surface/text/button/status/border/icon tokens
  - `Vuetify-Components/` — every restyled Vuetify component (buttons, chips, tables, text fields, drawer, app bar, page header, alerts, widgets, drawer, etc.)
  - `Current-v1/` — production-fidelity flows: Login, Dashboard, Submissions, Quotes (Bindable / In Review / Not Taken Up), Policies (In Force / Pending Cancellation), Endorsements (4 scenarios), Renewals, Cancellations, Application (multi-step), Messages, Smart Assist (extract from email)
- **Production app**: agent portal at `app.coverwhale.com` (auth domain `coverwhale.com`); payment links at `payment.coverwhale.dev`
- **Industry context**: FMCSA / SAFER (federal motor carrier registry); the portal pre-fills carrier data from DOT number

## Products

There is **one product** here: the Cover Whale **Agent Portal** — a single web app. No separate marketing site or mobile app was found in the file (only the portal). The UI kit in `ui_kits/agent-portal/` recreates the portal.

The portal's primary workflows:
1. **Submission → Application → Quote → Bind → Policy** — the core lifecycle
2. **Endorsements** (mid-term changes: add/remove vehicles, drivers, coverages)
3. **Renewals** and **Cancellations**
4. **Messages** (per-policy tickets and events)
5. **Smart Assist** — an inbox at `quote.assist@coverwhale.com` that extracts quote requests from agent emails into the system

---

## Content Fundamentals

Copy is **terse, professional, and noun-heavy** — this is a regulated insurance workflow tool, not a consumer product. The voice is **system-to-agent**, not brand-to-customer.

- **Tone**: Direct, neutral, formal-but-readable. No marketing fluff. No exclamation points. No first person ("we"/"I" never appear in UI). Second person ("you") is used in instructional copy and confirmations only.
- **Casing**: **Title Case for everything structural** — page titles, button labels, table column headers, modal titles, nav items. *Sentence case* only in long-form descriptions, hints, and helper text. Status chips are **Title Case** ("Bindable", "Not Taken Up", "Underwriting Review", "Pending Cancellation").
- **Punctuation**: Field labels never end with a colon. Required fields use `*`. Hint text is a complete sentence with a period.
- **Numbers**: Always shown as digits, never spelled out. Counts are bracketed in section headers — e.g. `Bindable Quotes (15)`, `Pending Cancellation (4)`. Currency is `$X,XXX.XX`. DOT numbers are unpadded integers.
- **Identifiers**: Quote IDs are `CW-NNNNNN` (e.g. `CW-198123`). Policy IDs are 7-digit. DOT numbers are 6–7 digit. Always shown uppercase, monospaced where possible.
- **Domain language to honour**: *Submission, Application, Quote, Bind, Bound, Policy In-Force, Endorsement, Renewal, Cancellation, Non-renewal, Decline, Not Taken Up, Underwriting Review, Auto Liability (AL), Motor Truck Cargo (MTC), General Liability (GL), Trailer Interchange (TI), Physical Damage (PD), DOT, FMCSA, SAFER, Power Units, Drivers, Terminals, Operating State, Cargo Carried, Operation Classification.*
- **Emoji**: **Never** used.
- **Empty states**: Short and literal: "No quotes to review.", "No messages." Never cute, never illustrated.

Examples drawn from the file:
- Card heading: `Bindable Quotes (15)` (count in parens)
- Modal heading: `Confirm Company Info`
- Description block: `This information reflects the most current Company Snapshot. It will be prefilled on the application and uneditable. Any discrepancies must be addressed with client on FMCSA site prior to quote.`
- Field hint: `As appears on FMCSA/SAFER.`
- Confirmation: `Under the current legal name, the company has not had any bankruptcies in the last 5 years.`
- Status chips (exhaustive): `Bound, Quoted, Underwriting Review, In Progress, Cancel Requested, Pending Cancellation, Cancelled, Declined, Expired, Not Taken Up, Brand, Info`

---

## Visual Foundations

- **Palette identity**: A **single-hue brand** — saturated purple (`#81369F`) on a near-white workspace. Status colours (success green, warning orange, failure red, info blue, review yellow) are reserved for chips and alerts only. Backgrounds, surfaces, and chrome are 99% greyscale. There is **no marketing gradient**, **no decorative imagery**, **no illustration**. The product reads as a serious financial / regulatory tool.
- **Typography**: **Inter** at all sizes and weights. Bold (700) is rare — almost everything is Regular (400) or Medium (500). Body-md (14px / 24px line-height) is the workhorse, used in tables, fields, buttons, chips. Display sizes (40–64px) appear only on auth screens.
- **Spacing**: Vuetify 4 / 8 / 16 / 24 / 32 rhythm. Tight horizontal padding inside data tables (12–16px column gap). Generous 24–32px gaps between page-level sections. Form fields stack with 16px vertical gap.
- **Backgrounds**: **Always solid colour, never image or gradient**. Page chrome is `#FFFFFF`. Workspaces sit on `#F8F7FA` (`neutral-lightest`) when nested. Modals/drawers float on `#FFFFFF` with shadow.
- **Animation**: Minimal — Vuetify defaults. Standard ease-out 200ms for hover state transitions, 300ms for drawer/modal slide-in. No bounces, no parallax, no scroll-driven motion. Loading uses a centred indeterminate spinner (Vuetify circular progress).
- **Hover states**: Primary purple buttons darken to `#5B0D80` (`purple-dark`). Secondary buttons get a `#F8F7FA` (`neutral-lightest`) wash. Table rows get a `#F8F7FA` wash. Links underline. Icon buttons get a 4px-radius `#EDEBF2` rectangular bg.
- **Press states**: Solid darker step (`purple-darker`/`#32004B` for brand). Secondary buttons go to `#EDEBF2`. No transforms (no shrink/grow).
- **Focus states**: 2px outer ring in `purple-default` plus the hover bg colour.
- **Borders**: `1px solid #EDEBF2` (`border-primary`) is the default hairline — used on tables, cards, fields. `1px solid #C4C0CF` for heavier dividers. `1px dashed #9747FF` (purple-light) appears in the **design-system-only** annotation frames (not in product). `2px solid #000` exists only in the style-guide wrap containers.
- **Inner / outer shadows**: Cards use no shadow at rest — they rely on a `1px` border. Floating elements (modals, dropdowns, drawers) use the elevation system (`--cw-shadow-1` to `--cw-shadow-modal`). Toggle controls and chip groups use a subtle **inset** shadow `inset 0 0 4px rgba(0,0,0,0.12)` to suggest a recessed track. The purple "new quote" icon button has a halo: `0 0 38px 32px rgba(0,0,0,0.04)`.
- **Layout rules**: Fixed top app bar (64px). Fixed left nav rail (220px wide, collapsible to icon-only). Content max-width 1220px centred when wider. Page header is 72px with title left, actions right.
- **Transparency / blur**: Not used. There are no glassmorphism effects. Overlays are solid `rgba(0,0,0,0.4)` scrims under modals.
- **Imagery vibe**: Not applicable — there is no imagery. If imagery were ever introduced, it would be neutral grayscale stock at most.
- **Corner radii**: 4px is the system default — chips, buttons, text fields, status pills. 8px on cards and modals. 16px on the largest token wraps. No fully rounded pills except for the user avatar (circle).
- **Card spec**: White background, `1px solid #EDEBF2` border, 8px radius, no shadow at rest, internal padding 24px. On hover (clickable cards): subtle `--cw-shadow-2`.
- **Density**: Table rows are 48px tall. Buttons are 36px tall (default) / 32px (small). Inputs are 40px. Chips are 24px.

---

## Iconography

- **Sources used in Figma**:
  - **Material Symbols** (Google) is the primary system — used wherever Vuetify's default Material icons appear. Examples seen: `arrow_drop_down`, `close`, `refresh`, `translate_24dp`. Stroke weight `wght300` is the most common variant.
  - **Bootstrap Icons** (`bi:exclamation`, `bi:check`) for status / verification chips — `Verified` chip uses the bootstrap Check.
- **Style**: Material outlined / "wght300" — thin-stroke, geometric, 24×24px on a 16px-content grid, scaled down to 14–18px for inline use. Stroke colour matches `--cw-icon-*` token.
- **Sizes**: 14px (inline within button text), 16px (default UI inline), 20px (status chips), 24px (nav, large affordances).
- **Emoji**: **Never** used in product. Never used in chips, status, or copy.
- **Unicode glyphs**: Rare — pipe `|` separators appear in footers ("Privacy Policy | Terms of Use"); chevron `›` is sometimes used in breadcrumbs but Material `chevron_right` is preferred.
- **Brand mark**: Custom — the **"Cover Whale" wordmark** has a stylised *C* whose lower stroke continues into a whale-tail swoop. The mark always renders in `--cw-purple-default`. Use it on auth screens, the app bar (small variant), and document headers. The mark is **never recoloured**.

### What's in `assets/`
- `cover-whale-wordmark.svg` — full "Cover Whale" lockup (purple, ~320×80). **⚠ Reconstructed approximation** — see Caveats below; replace with the canonical asset when available.
- `cover-whale-mark.svg` — the C-with-tail mark only (square, 80×80). Same caveat.
- For everything else (the Material/Bootstrap icons): use a CDN. The recommended setup for prototypes:
  ```html
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0" />
  <!-- usage: <span class="material-symbols-outlined">arrow_drop_down</span> -->
  ```
  ⚠ This is a **substitution** for Vuetify's bundled Material Design Icons (`mdi-*`) — for production code, install `@mdi/font` and use the `mdi-*` classes; for design mocks the Material Symbols CDN is visually equivalent.

> **Note for the UI kit**: `ui_kits/agent-portal/components.jsx` ships a small inline-SVG icon set (search, dashboard, shield, mail, close, check, chevron_right, …) instead of pulling the Material Symbols font, so the kit renders identically inside screenshot tools that don't load external webfonts. The visual style (1.8px stroke, outlined, 24×24 grid) matches Material Symbols at `wght300`. Extend `ICON_PATHS` for new glyphs rather than re-adding the font.

---

## Index

```
README.md                      ← you are here
SKILL.md                       ← Agent-Skill-compatible entry point
colors_and_type.css            ← canonical CSS variables (load this everywhere)
assets/
  cover-whale-wordmark.svg     ← full lockup
  cover-whale-mark.svg         ← square C-with-tail mark
preview/                       ← Design System tab cards (one HTML per concept)
  colors-brand.html
  colors-neutral.html
  colors-status-light.html
  colors-status-contrast.html
  colors-semantic.html
  type-scale-display.html
  type-scale-title.html
  type-scale-body.html
  type-weights.html
  spacing.html
  radii.html
  shadows.html
  buttons-primary.html
  buttons-secondary.html
  buttons-icon-toggle.html
  chips-status.html
  chips-verified.html
  text-fields.html
  table.html
  alert.html
  card.html
  app-bar-nav.html
  brand-logo.html
ui_kits/
  agent-portal/
    README.md
    index.html                 ← interactive Dashboard mock with click-thru to Quotes detail
    AppShell.jsx               ← top bar + left rail
    Dashboard.jsx              ← bindable quotes / policies / renewals widgets
    QuotesTable.jsx            ← v-data-table of quotes
    QuoteDetail.jsx            ← detail page with tabs
    StatusChip.jsx             ← all status variants
    Button.jsx, TextField.jsx, Card.jsx
```

---

## Caveats

- **Logo is reconstructed**: The "Cover Whale" wordmark in `assets/` was redrawn from screenshots — the original is constructed in Figma from 12 vector paths and could not be flattened into a single SVG without artefacts. **Please attach the canonical wordmark/mark SVG** and I'll swap them in.
- **No webfont files attached**: I'm loading Inter via Google Fonts CDN. If Cover Whale ships a self-hosted Inter (or a licensed variant), drop the `.woff2` files in `fonts/` and update `colors_and_type.css`.
- **Material Symbols substituted for MDI**: Vuetify's default icon set is Material Design Icons (`mdi-*`). The CDN I link is Google Material Symbols — visually nearly identical at "wght300" but not byte-equal. Production code should use `@mdi/font`.
- **No marketing-site / mobile app**: Only the agent portal exists in the file. If those products exist elsewhere, attach them and a corresponding UI kit can be added.
- **Some purple-pink shades are approximated**: The screenshot-grabbed swatches are very close to but not byte-perfect with the Figma variables, which are not fully exported.
