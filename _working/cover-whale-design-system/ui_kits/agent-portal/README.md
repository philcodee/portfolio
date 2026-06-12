# Agent Portal — UI Kit

A click-through recreation of the Cover Whale Agent Portal (Vuetify-restyled). Single-page interactive mock; the React components are scoped to this kit so each piece can be lifted independently.

## Files

- `index.html` — the live mock. Opens to the **Dashboard**, click-through to **Quotes** table, then any row opens a **Quote detail drawer**. The "New Quote" button in the app bar opens a **Start Application** modal.
- `portal.css` — shared styles (consumes the root `colors_and_type.css` tokens)
- `app.jsx` — orchestrator with route state (just plain `useState` switching)
- `AppShell.jsx` — top app bar + left nav rail
- `Dashboard.jsx` — bindable / policies / renewals / pending-cancellation widgets + stats row
- `QuotesTable.jsx` — v-data-table of bindable quotes with status chips
- `QuoteDrawer.jsx` — slide-in detail drawer with tabs (Overview, Coverages, Drivers, Vehicles)
- `StartApplicationModal.jsx` — the DOT-number form
- `components.jsx` — primitives: `Button`, `StatusChip`, `Card`, `Stat`, `Field`, `Icon`

## Notes on fidelity

- Iconography uses Material Symbols (CDN); the canonical app uses MDI bundled by Vuetify.
- The wordmark in the app bar is the reconstructed SVG from `assets/`.
- All status chip variants are wired to real lifecycle states from the Figma file (Bound, Quoted, Underwriting Review, In Progress, Cancel Requested, Pending Cancellation, Cancelled, Declined, Expired, Not Taken Up, Brand, Info).
