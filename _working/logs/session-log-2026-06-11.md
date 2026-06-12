# Session Log — 2026-06-11

## Platform Architecture

- **Lifecycle chips moved to popup header.** Status chips removed from outer table cells (cells revert to Space Grotesk label text). Chip now renders in `lc-popup-chip-area` at top of popup card, driven by `data-chip` attribute on each `lc-item`.
- **Chip styling.** Even top/bottom padding (`0.65rem`). Font set to Inter to match CW design system.
- **search-filter-demo.html made responsive.** Abandoned CSS scale approach in favor of genuine media queries at ≤640px. Dropdown anchors to appbar width on mobile. Sidebar auto-collapses on small viewports.
- **Next Case Study link added.** Bottom section links to The Quote Application in Caprasimo at `clamp(1.5rem, 4vw, 2.5rem)`. Hover state fixed (opacity 0.5, no black fill).

## Portfolio Audit & Cleanup

Audit written to `docs/audit-2026-06-11.md`. All items executed same session.

- **High:** Inter added to global `@import` in `brutalist-css.css`. `_working/` added to `.gitignore`.
- **Medium:** DM Sans removed from font import. Icons flattened from `Interface, Essential/` subfolder — renamed to `home.svg`, `description.svg`, `receipt.svg`, `shield.svg`, `mail.svg`, `menu.svg`.
- **Low:** `.h2--flush` modifier added to `brutalist-css.css`. Applied to `messages-events-tickets.html` and `quote-application.html` insight headings. Caprasimo fallback stack set to `ui-monospace, monospace`.
- **Folder rename:** `civic-guide-case-study/` → `civic-guide/`. References updated in `index.html` and `site-nav.js`.

## Quote Application

### Hero
- Added `application-hero.png` as hero image (previously `start-application.png`).

### Key Decision 01 — DOT-First Entry
- **Static mock replaced with interactive iframe.** `start-application-demo.html` embedded at `4/3` aspect ratio in the Key Decision 01 panel. The flow now lives where the design decision is explained.
- **Static `.cw-mock` removed** from the page along with all associated CSS (`cw-modal`, `cw-section`, `cw-fields`, etc.).

### `start-application-demo.html` (new file)
Full standalone CW app shell built as an interactive iframe demo.

**App shell**
- Appbar: CW logo, dormant search bar, bell icon, avatar, New Quote primary button.
- Sidebar: Matches `search-filter-demo.html` exactly — `app-rail`, `rail-item`, `rail-icon`, `rail-item__label` class names; `#F8F7FA` background; `32×32` icon areas; collapsible with animated width/label transitions; neutral active state (`#EDEBF2 / #15121A`); "Agent Portal" section label; hamburger toggle. Quotes active.
- Main: Empty state with Quotes icon and "Click New Quote to start an application" hint.

**Modal flow**
- Step 1 — Start Application: DOT Number field, Legal Name field, two acknowledgment checkboxes. Next disabled until at least one field filled and both boxes checked.
- Step 1.5 — Loading: Spinner + "Looking up company information…" for 1.4s.
- Step 2 — Confirm Company Info: Header pinned, footer pinned, sections scroll internally (`flex: 1; min-height: 0` on both step2 and `modal__scroll`). Pre-populates DOT and Legal Name from user input.

**Auto-fill animation**
On modal open, types `1234567` into DOT field then `Warehouse 2 Warehouse, LLC` into Legal Name with per-character jitter (55–125ms). Pauses, checks box 1, pauses, checks box 2. Sequence cancels cleanly on modal close.

## Global

- **Outcomes grid numbers** switched to Caprasimo (`font-weight: 400`) across all case studies via `brutalist-css.css`.
