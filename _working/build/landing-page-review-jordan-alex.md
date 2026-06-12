# Landing Page Review — Jordan Voss × Alex Chen

**Subject:** `index.html` — the portfolio's entry point ("Selected Work")
**Context:** Jordan is reviewing the page a hiring manager actually lands on first. Alex is revising live based on her read.

---

**Jordan Voss** · Design Director

Read time estimate: this page should take me 30–45 seconds to orient on. It's taking longer than that, and not because there's a lot of copy — because the copy isn't telling me anything yet.

First thing I noticed: the H1, "Selected Work." That's a label, not a lede. It's the kind of header I scroll past without registering, because it could sit on top of literally any portfolio on the internet. Right under it, the subhead tries to do three jobs at once — set scope ("product design, research, and front-end build"), set range ("enterprise insurtech platforms and graduate research into civic trust"), and explain the UI ("Tap a card to read more, tap again to close it"). By the time I get to "tap again to close it," I've checked out — that's an instruction manual sentence sitting where a hook should be.

Where I'd drop off: right there, in that subhead. If the first thing your portfolio teaches me is how to operate it, I've already decided this page is going to ask more of me than it gives back.

Copy to cut or tighten:
- "Tap a card to read more, tap again to close it" — cut entirely. The interaction is self-explanatory; a `+` icon that rotates on click doesn't need a caption.
- "spanning enterprise insurtech platforms and graduate research into civic trust" — this is the actual interesting range claim, but it's buried as the back half of a long sentence. It should be doing more work, closer to the front.
- The Cover Whale group label is trying to be a header *and* a stat block: "Series · 3 parts · Senior UX Researcher & Designer · 7 months." That's four facts crammed into one line of small caps. Some of that is gold (7 months on one redesign is a real anchor) — but it reads as metadata noise where it sits.

One move that would change it: replace the H1. Don't tell me this is "selected work" — I can see that. Tell me what kind of designer I'm about to spend four minutes with. Something that stakes a claim in the first 15 words and lets the two groups below it (grad research vs. enterprise platform work) feel like *evidence* of that claim rather than just two buckets of links.

---

**Alex Chen** · Frontend Designer

Okay — the subhead note lands hard, and it's fair. I wrote "tap a card to read more, tap again to close it" because I was worried the expand/collapse interaction wouldn't be obvious on first load. But you're right: a `+` that rotates into an `×` is already the convention. I'm explaining the UI instead of trusting it, which is exactly the kind of over-narration you've called out before.

One clarifying question: when you say the H1 should "stake a claim" — are you looking for something that names what kind of designer I am (e.g., systems-minded, research-led), or something that's anchored to a specific outcome from the work itself? I want to make sure I'm not just swapping one vague label ("Selected Work") for a different vague one ("Systems-Minded Product Designer").

Here's a tightened pass on the hero:

> **Designing the systems agents actually use to get through their day**
>
> Seven months redesigning how Cover Whale's platform organizes a policy's entire lifecycle, alongside graduate research into whether AI can make government paperwork legible. Two very different problems — same instinct: start from how people actually move through the work.

I cut the UI instruction completely and moved "seven months" up where it can do some work as an anchor instead of sitting in a label line. I also tried to make "two very different problems, same instinct" carry the through-line between the grad project and the Cover Whale series, since right now those two groups just sit next to each other with no claim connecting them.

---

**Jordan Voss** · Design Director

Better — and I want to be specific about why. "Designing the systems agents actually use to get through their day" is the first line on this page that made me want to read the next one. It's not generic; "agents" tells me there's a real user in here, not a placeholder persona.

Where it's still working against you: "Two very different problems — same instinct: start from how people actually move through the work" is doing the connective-tissue job, but it's also the longest, most abstract sentence in the block — and it's the *last* thing I read before I have to decide whether to keep going. You've front-loaded the hook and back-loaded the hedge. Flip that ratio. Either cut that closing sentence and let the two groups below speak for themselves, or compress it to something with the same specificity as your opening line — right now it slides from "agents trying to get through their day" (concrete) to "same instinct" (abstract) in one breath, and that's where I'd start skimming again.

Also — and this is a smaller thing — "graduate research into whether AI can make government paperwork legible" undersells CivicGuide relative to how the card itself describes it ("An AI-powered wizard that helps people fill out government forms without needing to understand them first"). The card's framing is sharper than the hero's. When your supporting copy out-punches your headline copy, that's usually a sign the headline hasn't found its real angle yet — borrow from the card.

---

**Alex Chen** · Frontend Designer

Good catch on the mismatch — the card's line *is* the better one, and I think it's because it ends on a consequence ("without needing to understand them first") instead of a description ("make paperwork legible"). I'll pull that energy up into the hero and cut the closing hedge rather than try to save it:

> **Designing the systems agents actually use to get through their day**
>
> Seven months redesigning how Cover Whale organizes a policy's entire lifecycle. A graduate research project asking whether AI can carry someone through a government form without making them feel stupid first.

Dropped "same instinct" — you're right that it was doing abstract work the two sentences don't need a referee for; sitting them side by side already implies the connection. Let me know if that second sentence is doing too much "wizard" framing for a hero versus the card — I went more direct ("without making them feel stupid") than the card's "without needing to understand them first," and I'm not sure yet which one's the keeper.

---

## A note from the candidate, dropped into the thread

> One thing for both of you to carry forward: I don't want any single industry to be the
> takeaway of this landing page. The distinction between the grad work and the Cover
> Whale series should stay clear — but the page shouldn't read as "the insurtech
> portfolio" or "the civic-tech portfolio." Keep that in mind as you keep going.

---

**Jordan Voss** · Design Director

Good — that note actually sharpens something I was circling without naming. Look at the line we just landed on: "Designing the systems **agents** actually use to get through their day." Read that cold, with no other context: "agents" is going to register as an insurance term to most readers, because the very next sentence is about Cover Whale and policies. So the *headline* — the one thing every scanner reads — is already anchoring this portfolio to insurtech, three sentences before the CivicGuide line even gets a chance to complicate that read.

That's the trap the candidate is naming. It's not that the Cover Whale work shouldn't be specific — it's that the *load-bearing* sentence, the one above both groups, can't be specific to one of them. Right now it is. "Agents" is doing double duty as both "the throughline of my portfolio" and "the user type in one case study," and it can only really do one of those jobs well.

Where I'd push: find the sentence that's true of *both* halves of this page — the thing that made you choose to redesign a policy lifecycle **and** spend six weeks on a government-forms wizard. That's your real headline. Right now you've generalized from the Cover Whale work outward; the note is asking you to generalize from *underneath* both.

---

**Alex Chen** · Frontend Designer

That reframes it cleanly — I was writing the hero by zooming out from my strongest case study, which meant the "universal" line was never going to be universal; it was Cover Whale wearing a trench coat. The actual throughline isn't "agents," it's something more like: both projects start from someone being handed a system they didn't design and have to get through anyway — an insurance agent stuck with a mixed-table platform, a person staring down a government form they didn't write. That's the real underneath-both sentence.

Revised hero:

> **Designing for the moment someone's handed a system they didn't choose**
>
> Two projects, two very different stakes: seven months rebuilding how a commercial insurance platform organizes a policy's lifecycle, and six weeks building an AI tool that walks someone through a government form they'd otherwise have to decode alone. Different worlds. Same question — how do you make a system make sense to the person who has to live inside it?

I kept the two concrete anchors (seven months / six weeks) because those are the kind of specifics you've told me to lead with, but neither industry name carries the sentence anymore — "commercial insurance platform" and "government form" are descriptions of the *problem*, not brands I'm asking the reader to already care about. I went back and forth on naming Cover Whale at all in the hero — landed on leaving the company name for the card level, where it has room to mean something, and keeping the hero about the *kind* of problem instead.

---

**Jordan Voss** · Design Director

That's the move. "Designing for the moment someone's handed a system they didn't choose" — I'd keep reading past that. It's specific enough to not be generic ("a system they didn't choose," not "complex systems"), but it doesn't pre-load an industry, which means CivicGuide and Cover Whale both arrive as *evidence* of the claim instead of one reading like the main act and the other like a detour.

One thing to watch going forward, now that the hero's industry-neutral: make sure the **group labels** don't quietly reintroduce the problem you just solved. "Cover Whale — Platform Redesign · Series · 3 parts · Senior UX Researcher & Designer · 7 months" is a lot of insurtech-flavored real estate sitting directly under a headline that just told me not to anchor there. It doesn't need to hide the company name — but if that block is the second thing I read after a carefully industry-neutral hero, the page is sending two different signals about how much weight to put on "Cover Whale" as *the* story. Worth deciding, deliberately, how much of that label is signal versus noise now that the hero's doing different work than it was an hour ago.

---

## Changes carried out from this thread

Two edits landed directly from where the conversation stood:

1. **Replaced the H1 + subhead** with Alex's industry-neutral hero — the version Jordan
   said she'd keep reading past:

   > **Designing for the moment someone's handed a system they didn't choose**
   >
   > Two projects, two very different stakes: seven months rebuilding how a commercial
   > insurance platform organizes a policy's lifecycle, and six weeks building an AI tool
   > that walks someone through a government form they'd otherwise have to decode alone.
   > Different worlds. Same question — how do you make a system make sense to the person
   > who has to live inside it?

   This is the version both personas had converged on as solving the actual brief — it
   keeps two concrete anchors (seven weeks / six weeks) without letting either industry
   carry the sentence, and it lets both project groups arrive as evidence of the claim
   rather than one reading as the main act.

2. **Trimmed the Cover Whale group label** in response to Jordan's closing flag — that
   "Series · 3 parts · Senior UX Researcher & Designer · 7 months" was a lot of
   insurtech-flavored real estate sitting directly under a now-neutral hero, sending a
   contradicting signal about where to put the weight. Cut it down to:

   > Cover Whale — Platform Redesign · **Series · 3 parts**

   Kept the company name and the series framing (the distinction the candidate explicitly
   wanted preserved), dropped the role title and duration — that's the kind of
   credentialing detail the case study itself states, and it was the part of the label
   doing the most "look how serious this insurtech work is" work right under a headline
   that had just stopped leading with industry.

Both changes hold the line the candidate drew: the grad work / Cover Whale distinction is
still completely legible (two clearly separated groups, the series framing intact), but
nothing above the fold asks the reader to care about insurance — or interaction design —
before they've read the actual claim.

---

## Jordan's running notes (not in-character — for Alex's reference)

If this thread continues past the hero, the next things I'd push on:

- **The Cover Whale group label** — "Series · 3 parts · Senior UX Researcher & Designer · 7 months" is four facts with no hierarchy. "7 months" is the anchor; the rest (role title, part count) could move into the cards themselves where they have room to breathe.
- **"Coming soon" cards** — Parts 2 and 3 currently read as inert ("Write-up in progress"). Worth testing whether a one-line teaser of *what's coming* (the terminology-mismatch hook from Part 2's body copy is genuinely sharp) would keep a scanning reader's interest in the series rather than letting it trail off on two greyed-out rows.
- **CivicGuide's body paragraph** — "Built as part of graduate work in Interaction Design, CivicGuide explores how conversational AI can lower the barrier..." opens with "Built as part of," which is the scaffolding-first pattern Jordan flags by name in her brief (paragraphs that open with context before payoff). The payoff — "lower the barrier between ordinary people and the bureaucratic forms that govern daily life" — is the actual lede.
