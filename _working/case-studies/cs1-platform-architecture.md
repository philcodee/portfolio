# Cover Whale — Platform Architecture & Navigation
**Redesigning a policy management platform around how agents actually think.**

---

## The Setup

When an agent logged into Cover Whale's platform, the first thing they saw was a page called 'All Submissions' — a single mixed table containing submissions, quotes, policies, and endorsements all at once. It was functional. It was also wrong.

A submission is the beginning of a policy life cycle. A bound policy is the end of a completely different stage. Treating them as the same thing — rows in the same table — meant agents had no intuitive way to understand where a piece of business stood, or what needed their attention right now.

**My role:** Senior UX Researcher & Designer. I led research, information architecture, and design direction. I ran daily syncs with an external design team of two, and weekly presentations with internal stakeholders.

**Team:** Ipek (UX), Dilara (UX), Murat (Front End)
**Duration:** 7 months

---

## The Problem

Agents work fast. They're managing multiple clients, comparing quotes across carriers, and fielding calls from insureds. The platform they relied on was slowing them down in ways they couldn't always articulate — but the research made it clear.

From 11 agent interviews, four signals came through consistently:

- **Speed** — Agents expect quick problem resolution. They can't afford to hunt for what needs attention.
- **Accuracy** — Changing prices, inconsistent information, and data entry friction were eroding trust.
- **Communication** — Response times from Underwriters were a persistent frustration.
- **Clarity** — Agents struggled to understand where a piece of business was in the process and what action was required.

The 'All Submissions' architecture was a direct contributor to the last two. Everything was in one place, which meant nothing had a clear place.

---

## The Insight That Drove Everything

Agents think in stages. A submission isn't a quote. A quote isn't a policy. Each stage has different information, different actions, and different urgency. The platform's flat architecture was forcing agents to impose that mental model themselves, every time they opened the app.

The redesign reorganized the entire platform around the **policy life cycle** — the natural progression from submission to quote to policy — giving each stage its own dedicated space.

---

## Key Design Decisions

### 1. Three pages instead of one
**Submissions, Quotes, and Policies** replaced the single 'All Submissions' view. Each page represents a specific stage in the policy process, with status filters, actions, and information appropriate to that stage only.

- **Submissions:** Pending (resume application) or Declined (view reasons). Nothing else.
- **Quotes:** Bindable, In Review, Not Taken, Expired. A Stage column (New Business, Endorsement, Renewal) provides context without requiring navigation.
- **Policies:** In-Force, At-Risk, Pending Cancellation, Renewals, Cancelled. Status reflects where the policy stands right now, not where it started.

This received positive feedback in usability testing. The structure matched agents' existing mental model — it just hadn't been reflected in the platform before.

### 2. A dashboard built for the "soldier view"
Early iterations leaned into sales performance — charts, agency-level metrics, pipeline views. Testing showed that producers weren't interested in the agency's performance. They were interested in their queue.

We stripped it back to four widgets answering four questions:
- What was recently bound? → **Policies In-Force**
- What's at risk of being lost? → **Pending Cancellation**
- What's ready to close? → **Bindable Quotes**
- What's coming up for renewal? → **Upcoming Renewals**

Simple counts. No charts. Maximum utility for an agent starting their day.

### 3. Account over Submission as the primary identifier
Previously, each new submission — a new coverage line, an endorsement, a renewal — created a separate record. Notes lived on individual submissions. Communication threads were fragmented. An agent managing a long-term client had no single place to see everything.

Shifting to **Account as the primary identifier** consolidated all policy activity, communication, and history under one record per insured. This wasn't just a data model change — it was a philosophical one. The insured is the relationship. The submission is a transaction within it.

### 4. Search and filter moved to global navigation
Previously, search and filter were scoped to individual pages. An agent looking for a specific insured had to know which page to start on. Moving these to the global navigation meant a single search could surface results across the entire platform — submissions, quotes, and policies alike.

### 5. An expandable sidebar for task-focused navigation
Borrowing from familiar desktop app patterns, we introduced a persistent sidebar giving agents quick access to Dashboard, Messages, and the main section pages without losing their place. The goal was to reduce the number of clicks required to move between the parts of the platform agents used most.

---

## Outcome

The restructured architecture tested well. Agents recognized the policy life cycle structure immediately — it reflected how they already thought about their work. The shift to Account-level thinking also set the foundation for the Messages redesign, which wouldn't have been possible without a unified identifier to attach communication to.

The strongest validation was the simplest: agents stopped asking "where do I find X?" during testing.
