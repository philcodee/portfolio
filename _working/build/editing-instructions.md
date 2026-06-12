# Editing Instructions — Reducing Word Count

The goal is not to summarize. It is to cut everything that isn't load-bearing.
A hiring manager spends 2-3 minutes on a case study. Every sentence should earn its place.

---

## The Core Rule

**If a sentence describes what you did without saying why it mattered, cut it or merge it.**

"We consolidated the Vehicles and Trailers tabs into a single Equipment tab."
→ So what? That's a changelog entry, not a case study.

"We merged Vehicles and Trailers into one tab, cutting the number of clicks required to enter a ten-truck fleet by more than half."
→ That's a sentence worth keeping.

---

## Six Specific Cuts to Make Everywhere

### 1. Cut all setup sentences
Any sentence that explains what you're about to say instead of saying it.

> "The following section outlines the key decisions we made during the redesign process."

Delete. Start with the decision.

---

### 2. Cut throat-clearing openers
First sentences that restate the obvious before getting to the point.

> "Communication is a critical part of any platform."
> "Forms are a fundamental part of the insurance quoting experience."

These exist to ease the writer into the paragraph. The reader doesn't need them.

---

### 3. Cut redundant context
If you've already established something once, don't re-establish it.

The Account-as-primary-identifier concept appears in all three case studies.
Explain it fully in CS1. In CS2 and CS3, one clause is enough:
> "...consolidating all activity under a single account record (established in the platform redesign)..."

---

### 4. Cut lists that should be prose
A three-item bulleted list with one-line entries is almost always better as a single sentence.

> - Speed
> - Accuracy
> - Communication

→ "Agents needed faster processing, more accurate outputs, and clearer communication from Underwriters."

Lists signal incompleteness. Prose signals synthesis.

---

### 5. Cut anything a reader could infer
> "This was designed to help both agents and admins."
> "The goal was to reduce the cognitive load on the agent."

If you've described the problem and the solution clearly, the reader already knows who it helps and why. Trust them.

---

### 6. Cut qualifiers that hedge without adding meaning
> "In a sense, this was really about..."
> "It's worth noting that..."
> "This was particularly important because..."

These are filler. Cut them and move the actual claim forward.

---

## Section-Level Targets

### The Setup / Opening
**Target: 3-4 sentences maximum.**
One sentence of context. One sentence of problem. One sentence of stakes.
If it runs longer, you're still warming up. Cut until it's cold.

### The Problem
**Target: One sharp paragraph.**
Name the friction. Name who felt it. Name what it cost.
Research quotes are welcome here — one, if it's strong. Not three.

### Key Design Decisions
**Target: 3-5 decisions maximum. 60-80 words each.**
Decision title as a plain statement of what you did.
First sentence: the constraint or problem that drove it.
Second sentence: what you decided and why.
Optional third sentence: the outcome or tradeoff.
If a decision takes more than four sentences, it's two decisions — or it needs a harder edit.

### Outcome
**Target: 2-3 sentences.**
What changed. What you'd do differently if anything. Stop.
Do not restate the decisions. Do not summarize the summary.

---

## The Test

Read each sentence and ask: **does this sentence change what the reader thinks, or does it repeat what they already know?**

If it repeats — cut it.
If it changes something — keep it.

If you're unsure, read the paragraph without the sentence.
If the paragraph is clearer without it, the sentence was noise.

---

## Target Word Counts

| Section | Current (approx.) | Target |
|---|---|---|
| CS1 — Platform Architecture | ~750 words | 400 |
| CS2 — Quote Application | ~700 words | 380 |
| CS3 — Messages & Tickets | ~800 words | 420 |
| Mobile App | ~650 words | 350 |

Hitting these targets doesn't mean cutting ideas.
It means removing the scaffolding you built to get to the ideas.
The ideas should be able to stand without it.

---

## New Page Checklist

Every case-study-style page is a standalone HTML file — there's no build step or
templating, so shared chrome has to be wired in explicitly per page:

- [ ] Link `brutalist-css.css` (and a page-specific components CSS if needed)
- [ ] Add the shared nav, right after `<body>`:
  ```html
  <script src="../site-nav.js"></script>
  <site-nav root="../"></site-nav>
  ```
  `root` is the relative path back to the project root where `index.html` and
  `site-nav.js` live — `../` for a page one folder deep, `../../` for two, etc.
  The component (`site-nav.js`) renders the "← All work" link from that single
  source, so any future change to that nav only has to happen in one file.
- [ ] Add the page to `index.html`'s card stack so it's reachable from the landing page
