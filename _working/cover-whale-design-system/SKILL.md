---
name: cover-whale-design
description: Use this skill to generate well-branded interfaces and assets for Cover Whale, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping the Cover Whale Agent Portal (commercial trucking insurance, Vuetify-based).
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. Always start by loading `colors_and_type.css` — every token (colours, type sizes, radii, shadows, spacing) is defined there as a `--cw-*` CSS variable.

If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand. Production code is **Vue 3 + Vuetify 3**; restyle Vuetify components by overriding the SCSS/CSS variables to point at the `--cw-*` tokens.

If the user invokes this skill without any other guidance, ask them what they want to build or design (a screen of the portal? a marketing page? a slide deck? a quoting flow mock?), ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Quick orientation:
- **Voice & content**: terse, professional, noun-heavy. Title Case for everything structural. No emoji. Domain words to use: Submission, Quote, Bind, Bound, Policy In-Force, Endorsement, Renewal, DOT, FMCSA, Auto Liability.
- **Visual feel**: single-hue purple (`#81369F`) on white, Inter typeface, 4/8/16/24 spacing rhythm, 4px / 8px corner radii, hairline `#EDEBF2` borders. No gradients, no imagery, no decoration.
- **UI kit**: see `ui_kits/agent-portal/` for the canonical components and an interactive Dashboard mock.
- **Iconography**: Material Symbols (wght300, outlined). 14–24px. Always tokenised colour.
