# Cover Whale — Messages, Events & Tickets
**Designing a unified communication system for a platform where lost notes cost agents clients.**

---

## The Setup

Before this redesign, communication on the Cover Whale platform had a structural problem: notes were attached to submissions, not to accounts. Every time an insured added a coverage line, a new submission was created — and with it, a new communication thread. An agent managing a long-term client could have the same insured's notes scattered across a dozen separate records with no unified view.

Admins had the same problem from the other side. Underwriters, billing staff, and support teams were all working from fragmented information. The result was slow response times, repeated questions, and agents who felt like they were starting from scratch every time they needed help.

This wasn't a communication problem. It was an information architecture problem wearing a communication costume.

**My role:** Led UX direction and design for the Messages system, Events/Tickets framework, and Notifications architecture.

**Team:** Ipek (UX), Dilara (UX), Murat (Front End)
**Duration:** 7 months

---

## The Problem

From agent interviews, communication frustration surfaced in two distinct forms:

**External:** Agents were frustrated with Underwriter response times. When they needed a quote reviewed or a policy exception approved, the back-and-forth happened over email — outside the platform, untracked, with no visibility into status.

**Internal:** Notes and context weren't surviving the policy life cycle. When a submission became a quote became a policy became a renewal, the history got fragmented. Agents were re-explaining context they'd already provided. Admins were working blind.

The research finding that drove the design direction: **agents needed to see everything about a client in one place, regardless of where in the policy life cycle that client currently sat.**

---

## The Insight That Changed the Model

The fix wasn't a better inbox. It was a better identifier.

By shifting from **Submission** to **Account** as the primary organizational unit — a decision that also drove the platform architecture redesign — all communication could be consolidated under a single record per insured. Notes written during the submission stage would be visible when that same insured's policy came up for renewal two years later. An admin responding to a ticket would have the full account history in view.

This was the prerequisite that made everything else possible.

---

## Key Design Decisions

### 1. Events and Tickets as distinct concepts
The system distinguishes between two types of communication:

**Events** are system-generated. Any action on an account — policy issuance, cancellation, reinstatement, status change — auto-generates an event. Events are not initiated by the agent; they're a running log of what the platform did and when. Agents can view events on the primary Messages page or on a specific account's Messages tab.

**Tickets** are human-initiated. They bridge the gap between the platform and external communication — the phone calls and emails that previously happened outside the system with no record. An agent files a ticket against an account, adds a subject and description, and sends it. Two things happen: a thread opens in the agent's Tickets view, and a new ticket opens in HubSpot where an admin is notified directly. The loop closes inside the platform.

The distinction matters because it gives agents two different ways to scan their queue — what happened automatically, and what needs a human response.

### 2. Four channels, each with a purpose
Rather than a single inbox, the system routes communication through four named channels:

- **Producer Comment** — General notes about a quote or policy. The agent equivalent of a sticky note on a file.
- **Underwriting** — For queries that require underwriter review. Scoped deliberately so underwriting-specific threads don't get lost in general noise.
- **Billing** — Payment issues, commission discrepancies, billing model questions.
- **Support** — Platform bugs, discrepancies, and technical issues.

Naming the channels reduced the ambiguity of "send a message to someone" — agents knew where their question was going and who was expected to respond.

### 3. Account-level and global views
The Messages system exists in two places simultaneously:

- **Global Messages page** — All events and tickets across all accounts, filterable. The default view shows Events and Tickets side by side. The agent can filter to either. New tickets can be created from here.
- **Account Messages tab** — The same capabilities, scoped to a single insured. Accessible by clicking an account number from anywhere in the platform.

This means an agent doing a quarterly review of a specific account sees only that account's history. An agent doing their morning triage sees everything. Same system, two appropriate contexts.

### 4. Notifications as a persistent queue
The notifications bell in global navigation opens a side drawer — available from anywhere in the platform — showing a running history of all events and tickets. Agents can navigate to specific items, filter by type, and see at a glance what's new since they last checked.

The notifications system is also the mechanism that makes the status-based triggers meaningful. Policy bound, policy at risk, NOC issued, submission declined, quote entering or exiting underwriting review — each of these generates a notification that surfaces in the queue without requiring the agent to go looking for it.

### 5. Ticket thread design
Once a ticket is open, the agent sees a structured view: ticket number, status, priority, response thread, and basic formatting tools. The structured metadata was designed for both the agent — who needs to track status — and the admin — who needs to triage and prioritize from the HubSpot side without context-switching.

---

## What This Unlocked

The Messages redesign was the most invisible part of the platform — agents don't think about communication infrastructure, they think about whether they got a response. But the account-level consolidation resolved a problem that had been causing real friction: agents repeating themselves, admins working blind, notes disappearing across submission records.

The shift from submission-scoped to account-scoped communication was also a forcing function for the rest of the architecture. It required the platform to have a stable, unified account identifier — which in turn made the policy life cycle structure legible, the dashboard widgets meaningful, and the overview tabs coherent.

Good information architecture is often invisible when it's working. This was a case where fixing the structure fixed the experience.
