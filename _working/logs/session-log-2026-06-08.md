# Session Log — 2026-06-08
**Project:** Portfolio landing page — index.html, landing-components.css, brutalist-css.css

---

## Files Modified

- `index.html` — case-study card markup converted to whole-card links
- `landing-components.css` — card grid system, hover/tag/title overrides
- `brutalist-css.css` — global nav height
- `quote-application/quote-application.html` — new placeholder page
- `messages-events-tickets/messages-events-tickets.html` — new placeholder page
- `civic-guide-case-study/civicguide-case-study.html`, `civic-guide-case-study/civic-trust-research.html`, `platform-architecture/platform-architecture.html` — `scroll-padding-top` updated to match new nav height

---

## Card Grid Redesign — "Baseball Card" Layout

Converted the case-study list from an accordion/expandable layout to a front-facing clickable grid of cards (`.case-stack` / `.cs-card`).

- Whole card is now a single `<a class="cs-card-inner">` link (removed inner buttons and dual-link conflicts — e.g. CivicGuide's secondary "Research foundations" link was dropped in favor of one destination per card)
- Removed "coming soon" styling and status badges entirely — Quote Application and Messages/Events/Tickets cards now link straight to placeholder pages
- Created two new placeholder pages (`quote-application.html`, `messages-events-tickets.html`) using a shared `.ph-hero` / `.ph-meta` / `.ph-placeholder` pattern: hero + "write-up in progress" message
- Removed the expand/collapse `<script>` handler and related markup
- Section labels simplified (e.g. "Graduate Work", "Cover Whale — Platform Redesign") — felt redundant against the new internally-labeled cards (`GW · 01`, `CW · 02`, etc.)
- Dithered drop-shadow effect via `repeating-conic-gradient` on `.cs-card::after`, using an inner `.cs-card-inner` wrapper to hold the opaque background (avoids stacking-context bugs)
- Fixed-height cards (`min-height: 26rem`, `height: 100%`, `margin-top: auto` on `.cs-card-meta`) to keep grid rows even regardless of content length

### Visual refinements (iterative, via screenshots)
- Removed cover-image blocks — text-only cards for now
- Increased card and font sizes; fixed clipped letter descenders
- Cards styled gray at rest (`var(--gray-mid)`, matching page background), lightening to white on hover — paired with a `translate(-3px, -3px)` lift
- Removed the `h2` left border-bar (`border-left: var(--border-heavy)`) leaking in from the global `h2` rule — purely a brutalist stylistic element, not needed on card titles
- Removed the underline-on-hover for card titles — redundant once the card already lifts and lightens on hover
- Changed `.tag--filled` inside cards from black-background/white-text to match the card's resting/hover background (`var(--gray-mid)` → `var(--white)` on hover), keeping the 2px black border for legibility

---

## Bug Fixes — Global CSS Leaks

Recurring pattern: global utility rules (low specificity but broad selectors) overriding component-specific styles on elements that share a tag/class.

- **Black-box hover on cards**: global `a:hover { background: black; color: white }` was overriding `.cs-card-inner` (now an `<a>`). Fixed with explicit `a.cs-card-inner:hover { background: var(--white); color: var(--black); text-decoration: none; }`
- **Underlined section labels**: global `h3 { text-decoration: underline }` leaking onto `.stack-group-label`. Fixed with explicit `text-decoration: none`
- Confirmed (in conversation) that the global `a:hover` black-box treatment is a brutalist stylistic choice, not an accessibility requirement — the actual a11y-relevant rule is the separate `a:active { outline: ...; outline-offset: 2px; }` focus indicator, which was left untouched

---

## Global Nav Height

User reported the fixed nav sitting close enough to the top of the viewport that, in fullscreen browser mode, it triggered the OS/browser search bar overlay.

- `.global-nav`: `min-height` 3.5rem → 4.5rem, vertical padding 0.85rem → 1.25rem
- `body:has(site-nav)`: `padding-top` 3.5rem → 4.5rem (keeps content clear of the now-taller fixed bar)
- Updated all dependent values to match: `.ph-hero` `min-height: calc(100vh - 4.5rem)` in both placeholder pages, and `scroll-padding-top: 4.5rem` in the three scroll-snap case-study pages
- Mobile breakpoint nav (3rem) intentionally left unchanged — separately tuned for small screens, unrelated to the fullscreen browser-chrome overlap

---

## Design Decisions

| Decision | Reason |
|---|---|
| Whole card as single link | Simpler interaction model; avoids ambiguity from multiple click targets per card |
| Drop CivicGuide's secondary research link | Conflicted with "whole card clickable"; still reachable via nav dropdown |
| Remove "coming soon" badges | Unnecessary friction — cards can link straight to placeholder pages today |
| Cards gray-at-rest, white-on-hover | Matches page background at rest so hover state reads as a clear affordance |
| Remove h2 border-bar and hover underline | Redundant once card lift + background shift already signal interactivity |
| Tags match card background | Keeps card visually unified; black-on-white tags felt like a separate component |
| Taller global nav | Keeps content clear of OS/browser fullscreen chrome (search bar) without restyling the bar itself |
