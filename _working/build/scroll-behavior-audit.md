# Scroll Behavior Audit — Platform Architecture vs. CivicGuide

Comparing `platform-architecture/platform-architecture.html` (built first) against
`civic-guide-case-study/civicguide-case-study.html` (built later). Both pages share
`brutalist-css.css` and use the same `.snap-section` / `.dot-nav` markup conventions,
but they diverge in a few real ways — one of which changes the actual feel of scrolling.

---

## 1. Scroll-snap container is never activated on the CivicGuide page

This is the headline finding — it's likely the "different scroll behavior" you noticed.

**Platform Architecture** turns scroll-snapping on explicitly, in its page-level
`<style>` override block:

```css
/* platform-architecture.html, inline <style> */
html { scroll-snap-type: y mandatory; }

@media (max-width: 768px) {
  html { scroll-snap-type: none; }
  body { padding: 0; }
}
```

**CivicGuide** never sets `scroll-snap-type` anywhere — not in the page itself, not in
`civicguide-components.css`, and not in the shared `brutalist-css.css`.

Both pages mark their sections with `.snap-section` (and `brutalist-css.css` also bakes
`scroll-snap-align: start; scroll-snap-stop: always;` directly into `.section`, `.panel`,
and `.lc-section`). But `scroll-snap-align`/`scroll-snap-stop` only do anything *inside* a
scroll-snap container — and that container is declared with `scroll-snap-type` on `html`
(or another scrolling ancestor). Without it, those declarations are inert.

**Net effect:** Platform Architecture snaps section-to-section on desktop/tablet (and
explicitly falls back to free scrolling under 768px). CivicGuide *carries the same
snap-related classes and CSS* but scrolls completely freely everywhere, on every
viewport — the snap properties on its sections are dead weight.

**Resolved:** confirmed with the author that free-scroll was *not* a deliberate choice —
the `scroll-snap-type` declaration was simply dropped when the page was scaffolded. Added
the matching override block to CivicGuide's `<head>`:

```css
/* civicguide-case-study.html, inline <style> */
html { scroll-snap-type: y mandatory; }

@media (max-width: 768px) {
  html { scroll-snap-type: none; }
  body { padding: 0; }
}
```

CivicGuide's `.snap-section` classes and the `scroll-snap-align`/`scroll-snap-stop`
properties baked into `.section`/`.panel` in `brutalist-css.css` were already in place —
they just needed an active snap container to do anything. The page now snaps
section-to-section on desktop/tablet and falls back to free scrolling under 768px,
matching Platform Architecture.

---

## 2. Dot-nav "active" observer: different thresholds and update strategies

Both pages use an `IntersectionObserver` to highlight the current section in the dot
nav, but the implementations differ in two ways:

| | Platform Architecture | CivicGuide (before) |
|---|---|---|
| Intersection `threshold` | `0.3` | `0.35` |
| How the active dot is set | Clears `.active` from **every** dot, then adds it to the one matching the intersecting section | Calls `.classList.toggle('active', isMatch)` independently on **each** dot for every intersecting entry |

The practical difference: Platform's "clear all, then set one" approach guarantees a
single active dot at any time. CivicGuide's per-dot `toggle` could leave more than one
dot marked `.active` simultaneously when two sections were intersecting at once near a
threshold boundary (e.g., during a fast scroll past a short section) — each dot was only
ever evaluated against its own section, with no global reset. It was a subtle difference
that would only show up as a brief flicker of two highlighted dots while scrolling
quickly.

**Resolved:** updated CivicGuide's `navObserver` to match Platform's "clear all dots,
then activate the matching one" pattern, and aligned the threshold to `0.3`:

```js
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      if (!id) return;
      dots.forEach(d => d.classList.remove('active'));
      const active = document.querySelector(`.dot-nav-item[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.3 });
```

Both pages now update the dot nav identically.

---

## 3. Scroll-in reveal animations: one-shot vs. persistent observers

Both pages fade/slide elements into view via `[data-animate]` + `IntersectionObserver`,
but:

- **Platform Architecture** uses `threshold: 0.12` and calls `animObserver.unobserve(entry.target)`
  once an element becomes visible — each element is revealed once and then dropped from
  observation.
- **CivicGuide (before)** used `threshold: 0.1` and never unobserved — every
  `[data-animate]` element stayed under observation for the life of the page, re-firing
  the callback (a harmless no-op re-add of the `visible` class) every time it crossed the
  threshold in either direction.

Functionally both ended up with the element visible after its first reveal — so there was
no visible behavior difference — but CivicGuide was doing continuous, unnecessary
observer work for the rest of the session.

**Resolved:** updated CivicGuide's `animObserver` to unobserve each element after its
first reveal and aligned the threshold to `0.12`, matching Platform Architecture
exactly:

```js
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      animObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
```

---

## 4. CivicGuide-only: typewriter effect gated on scroll

CivicGuide adds a second observer (`twObserver`, `threshold: 0.8`) that triggers a
character-by-character typewriter reveal on `.agent-brief-text` elements as they scroll
into view, then unobserves them. Platform Architecture has no equivalent — its
scroll-triggered behavior is limited to the shared reveal/dot-nav patterns plus the
lifecycle popup (see below). Not a discrepancy so much as a CivicGuide-specific addition
that's worth knowing about if you ever port shared scroll logic between the two pages.

---

## 5. Platform-only: wheel/touch interception while the lifecycle popup is open

Platform Architecture's lifecycle-diagram popup (`showLcPopup` / `hideLcPopup`)
temporarily attaches `wheel` and `touchmove` listeners with `preventDefault()` to block
page scrolling while the popup is open, removing them on close. CivicGuide has no
comparable overlay/popup feature, so there's nothing to compare directly — but it's the
one place on either page where scrolling is being actively suppressed by JS, and worth
remembering if a similar overlay pattern gets added to CivicGuide later (it would need
the same scroll-lock treatment, ideally generalized rather than copy-pasted).

---

---

## 6. `#decisions` was anchored to a non-snapping wrapper, not a snap target

After fixing §1, a follow-up symptom appeared: scrolling through CivicGuide didn't line
up with the dot nav — specifically around "Key Decisions."

The cause: `id="decisions"` was placed on a plain `<div id="decisions">` *wrapper* that
groups four `.panel.snap-section` children, rather than on a snap-aligned element itself:

```html
<!-- before -->
<div id="decisions">
  <div class="panel snap-section" data-animate> <!-- Decision 01, no id --> ...
  <div class="panel alt snap-section" data-animate> <!-- Decision 02, no id --> ...
  ...
</div>
```

That wrapper has no `scroll-snap-align` of its own — the browser snaps to its *children*
instead — but it spans the full height of all four decision panels combined. Since
`navObserver` watches `#decisions` for intersection at `threshold: 0.3`, the "Key
Decisions" dot was driven by the wrapper's geometry (one tall, non-snapping box covering
four snap stops) rather than by wherever the page actually came to rest. The visual snap
position and the nav-highlight trigger were measuring two different elements — hence the
misalignment.

Compare to Platform Architecture, where every dot-nav id sits directly on the
`.snap-section` element the browser snaps to (e.g. `<div class="panel alt snap-section"
id="panel-architecture">`) — snap target and nav-observed element are one and the same,
so they can't drift apart.

**Resolved:** moved `id="decisions"` off the wrapper and onto the first decision panel
— the actual snap-section the page lands on when entering that part of the page —
mirroring Platform's convention exactly:

```html
<!-- after -->
<div>
  <div class="panel snap-section" id="decisions" data-animate> <!-- Decision 01 --> ...
  <div class="panel alt snap-section" data-animate> <!-- Decision 02 --> ...
  ...
</div>
```

`navObserver`'s existing selector (`#top, #setup, #problem, #insight, #decisions,
#outcome`) needed no changes — it now resolves `#decisions` to the snap target itself, so
the dot activates exactly when the page snaps into the Key Decisions section.

---

---

## 7. TOC sections getting skipped: an overlap problem, not a threshold problem

A second symptom surfaced after the §6 fix: scrolling **down** skipped over "The Setup"
in the dot nav, and scrolling **up** never lit up "Key Decisions."

The cause is structural, not a copy-paste mismatch this time. Look at which elements
get `min-height: 100vh` in `brutalist-css.css`:

- `.hero-inner`, `.panel`, `.cg-mock` → full viewport height
- `.section` (used by `#setup`, `#problem`, `#outcome`) → **no min-height** — its height
  is just its content plus padding

Because `#setup` (and `#problem`, `#outcome`) can render shorter than the viewport, when
one of them snaps into place the *next* section is simultaneously peeking into view —
both cross the intersection threshold in the same observer callback. The §2 "clear all
dots, then activate the match" pattern (mirrored from Platform Architecture) resolves
that overlap by **iteration order**, i.e. DOM order, not by which section is actually
dominant on screen:

```js
entries.forEach(e => {
  if (e.isIntersecting) {
    dots.forEach(d => d.classList.remove('active'));
    // whichever entry is LAST in this batch wins — regardless of
    // which one actually fills more of the viewport, or which
    // direction the user is scrolling
    ...
  }
});
```

Scrolling down past a short `#setup`, `#problem` (later in DOM) wins the tie and
overwrites it before it ever renders as active. Scrolling up through the four
`.panel`-based decision slides — only the first of which carries the `#decisions` id —
its brief crossing gets discarded the same way relative to neighboring observed sections.
The direction-dependent symptom is just *which* neighbor happens to win the DOM-order
tie in each case.

Note this same latent bug exists in Platform Architecture's `dotObserver` — it uses the
identical "clear all, set last-to-fire" pattern. It likely hasn't been *noticed* there
because Platform's tracked sections are more uniformly full-height (`.panel`, `.lc-section`,
`.hero`), so overlap is rarer — but the underlying logic has the same flaw and could
surface there too under the right viewport/content combination.

**Resolved (CivicGuide):** replaced the observer with the standard scrollspy pattern —
track each tracked section's current intersection ratio, and highlight whichever one is
**most visible right now**, recomputed on every change:

```js
const navRatios = new Map();

function updateActiveDot() {
  let topId = null, topRatio = 0;
  navRatios.forEach((ratio, id) => {
    if (ratio > topRatio) { topRatio = ratio; topId = id; }
  });
  if (!topId) return;
  dots.forEach(d => d.classList.toggle('active', d.getAttribute('href') === '#' + topId));
}

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.target.id) return;
    navRatios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
  });
  updateActiveDot();
}, { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] });
```

This fixes both reported symptoms at once: ties are now broken by **actual visibility**,
not DOM order, so the dot always reflects whichever tracked section dominates the
viewport regardless of scroll direction. The denser threshold list (every 10% instead of
a single `0.3` cutoff) also gives brief, fast-scrolled-past sections far more chances to
register a non-zero ratio before the snap settles, reducing the odds of a section being
missed entirely during a fast fling.

**Worth a follow-up:** consider porting this same ratio-based pattern into Platform
Architecture's `dotObserver` — it carries the identical structural flaw, just with lower
odds of being triggered by its current section heights.

---

## Summary / suggested next steps — all resolved

1. ~~**Activate snap behavior for CivicGuide**~~ — done; see §1 above.
2. ~~**Align the dot-nav observer**~~ — done; see §2 above. Both pages now use the same
   "clear all, set one" pattern at `threshold: 0.3`.
3. ~~**Align the reveal-animation observer**~~ — done; see §3 above. Both pages now
   unobserve elements after their first reveal at `threshold: 0.12`.
4. ~~**Anchor `#decisions` to its actual snap target**~~ — done; see §6 above. The id
   moved from a non-snapping wrapper onto the first decision panel (the real snap stop),
   so the dot nav now activates exactly where the page comes to rest — matching
   Platform's convention of putting nav ids directly on `.snap-section` elements.
5. ~~**Replace the dot-nav "last-wins" logic with ratio-based scrollspy**~~ — done; see
   §7 above. CivicGuide's TOC now highlights whichever tracked section is most visible,
   which fixed both reported symptoms ("Setup" skipped scrolling down, "Key Decisions"
   never showing scrolling up) and is structurally immune to the DOM-order tie-breaking
   bug that caused them.

CivicGuide's scroll machinery (snap behavior, scroll-in reveal animations, and — as of
§7 — dot-nav highlighting) is in good shape. Note that §7 means CivicGuide's dot-nav
logic now **intentionally diverges** from Platform Architecture's: Platform still uses
the simpler "clear all, set last-to-fire" pattern, which carries the same latent overlap
bug (see §7's note) — it just hasn't surfaced there yet given Platform's more uniformly
full-height sections. Porting the ratio-based pattern to Platform too would close that
gap and is the one open follow-up from this audit. The remaining intentional differences
between the two pages — CivicGuide's scroll-gated typewriter effect ("CivicGuide-only:
typewriter effect gated on scroll") and Platform's popup scroll-lock ("Platform-only:
wheel/touch interception while the lifecycle popup is open") — are feature-specific
additions, not inconsistencies, and don't need changes.
