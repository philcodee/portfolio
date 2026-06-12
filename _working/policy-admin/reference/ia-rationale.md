# Agent Portal — IA Rationale
**Cover Whale · Policy Admin Platform · Q1 2024**

---

## Project Context

**Objective:** Prepare for a company-wide transition to a new agent portal. Position UX/Front End designs to serve as a blueprint for the product's subsequent development and orchestration.

**Core Goals:**
- Carry forward all functionalities agents have come to expect from the current platform
- Where applicable, deliver meaningful new improvements
- Standardize language and behavior to ensure consistency across channels
- Align with user as well as business needs and expectations

---

## Research Findings

### Key Insights from 11 Agent Interviews

- **Speed** — Agents prioritize ease of use and quick problem resolution. They expect a smoother quoting process and faster processing times.
- **Accuracy** — Agents face issues with accuracy, delays, and changing pricing during the quote generation process. They also struggle with data entry and system functionality, particularly in endorsement processes.
- **Automation** — Agents appreciate features like DOT pre-fills and PDF uploads but find the platform's usability inconsistent. They seek better automation to reduce manual input and errors.
- **Communication** — Agents are frustrated with communication and response times from Underwriters, as well as a desire for faster payment processing.
- **Integration** — Agents interact with multiple platforms and tools, indicating a need for better integration and seamless experiences.

### Stakeholder Vision
- Fast and accurate commercial auto quotes are core value
- Forms should pre-populate to reduce manual entry — data validation over data entry
- Design should accommodate various experience levels
- Reduce/reorder questions to trigger hard declines sooner

> "Brilliant at the basics. Let's get the basics really right, then worry about the rest."
> — Head of CX

---

## Design Guidelines

These became the design guidelines as the team launched into the first sprint:

- **Build for All Levels** — Enhance the app's architecture by segmenting it according to the policy life cycle, making it more intuitive for users.
- **Cut to the Chase** — Utilize automation to save agents time by declining earlier in the process.
- **Open Up Channels** — Improve integration with HubSpot and expand existing email channels for streamlined communication.

---

## IA Decisions & Rationale

### 1. Dashboard — Spartan and Task-Focused

In earlier iterations, the team leaned into the sales-based nature of the agent as identified by the growth team. However, after testing initial designs and speaking with agents, it became clear that the majority of producers would be less concerned with the overall sales performance of the agency and more concerned with the daily tasks they would be responsible for.

For the "soldier view," the team opted for widgets providing simple counts and a high-level overview of the agent's activity.

**Widget logic — four questions the dashboard answers:**
- What business was recently bound? → **Policies In-Force**
- What's at risk of being lost? → **Pending Cancellation**
- What's ready to be bound? → **Bindable Quotes**
- What's primed for renewal? → **Upcoming Renewals**

---

### 2. Submissions, Quotes, and Policies — Breaking the Policy Life Cycle Apart

**The problem with the existing architecture:**
The landing page, labeled 'All Submissions,' contained a mixed table view of submissions, quotes, policies, and endorsements. This layout, while functional, lacked clarity since a submission represents only the beginning of the policy life cycle.

**The solution:**
Reorganize the architecture, establishing distinct pages for Submissions, Quotes, and Policies, each representing a specific stage in the policy process. This structure, based on natural policy life cycle transitions, aimed to create a more intuitive foundation for agents and received positive feedback during usability testing.

**Policy Life Cycle Breakdown:**

- **Submissions** — All activities leading up to the application being quoted
  - Pending: agent can resume the application
  - Declined: directs to an overview page with declination reasons

- **Quotes** — Four outcomes
  - Bindable: agent can proceed with sales
  - In Review: Underwriting review required — triggers system notification on entry/exit
  - Not Taken: the insured declined
  - Expired: 30-day validity lapsed; can be copied for reuse
  - Stage column provides context: New Business, Endorsement, Renewal

- **Policies** — Once bound, a quote becomes an active policy
  - Endorsement counts provide context
  - Status column shows: Bound, At-Risk, Pending Cancellation
  - Upcoming Renewals: policies expiring within 60 days
  - Cancelled: reinstatement requests available

---

### 3. Shifting from Submission to Account as Primary Identifier

**The problem:**
Previously, each new submission — such as when an insured added coverage — would create separate threads, causing notes to appear in multiple locations without a unified view for agents or admins.

**The solution:**
Use the Account as the primary identifier, associating all policy activity under a single account per insured. This consolidates all communication in one place and reinforces the shift both visually and verbally from 'Submission' to 'Account' as the highest-level data point.

---

### 4. Messages — Streamlining Agent-Admin Interactions

**Events** — Capture all system actions on any account (cancellations, reinstatements, policy issuance, status changes). Auto-generate notifications viewable on the Messages page or on a specific account under the Messages tab.

**Tickets** — Bridge the gap between platform and external communication (emails/phone calls). Log all customer inquiries, enabling agents to track status updates within the platform. Using the Account identifier rather than individual submission numbers allows agents to view all tickets and responses in one queue.

**Channels available:**
- Producer Comment — general comments about a particular quote or policy
- Underwriting — underwriting-specific queries
- Billing — issues regarding payment, commissions
- Support — issues with the platform itself, bugs, discrepancies

---

### 5. Global Navigation

**Search and Filter** moved to global navigation, enabling agents to apply search and filters across the entire application rather than only within individual pages.

**Notifications** — Always available via the standard bell icon. A side drawer component provides history, navigation to specific tickets or events, and filtering. The Notifications Queue provides a running history of all events and tickets, ensuring agents can quickly identify new activity.

**New Quote CTA** — Entry point to the application. Asks for a DOT number upfront, allowing pre-filling of company details from FMCSA data, verifying key account information like operating state, and automatically assigning state-specific rules.

**Pre-Submission Form → Start Application** — A redesigned entry point that triggers eligibility checks early in the journey, allowing the system to decline ineligible submissions sooner and save agent time.

---

### 6. Account Overview — Expanded Tabs

The redesign of the Account Overview expanded on the existing Submission Overview experience. New additions:

- **Overview** — Coverage lines, business info, loss data, pricing breakdowns, endorsement creation
- **Documents** (formerly Files) — Added Version column to help identify the most current document
- **Messages** — Per-account view of all Events and Tickets; consistent capabilities with primary Messages page
- **History** *(new)* — Running log of all transactions attached to a specific account; previously only accessible via a dropdown
- **Billing** *(new)* — Billing and payment history per account; previously only visible to admins
- **Issues** *(new)* — Table view of all issues associated with an account; especially important for at-risk or pending cancellation policies

---

## Outcome

Throughout this redesign, the focus was on reinforcing the UI's sense of 'place,' ensuring agents could always tell where they are within the application. The updated architecture was designed to align with agent expectations given their prior familiarity with the system, to ensure a smooth transition and enhanced usability.
