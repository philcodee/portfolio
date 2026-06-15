# Biome Box
*Physical computing · Interaction design*

A tactile device to get parents and kids playing together without a screen in sight — built from foam core, piezos, a joystick, and a lot of iteration.

**Role:** Solo designer + builder
**Type:** Academic / personal project
**Tested with:** Real kid (Henry)
**Versions:** 4 hardware iterations

---

## The problem

### Finding engaging, screen-free play is harder than it sounds

As a parent, I wanted to stay genuinely present when playing with Henry — not just supervising. But most alternatives to screens either weren't engaging enough for me or weren't engaging enough for him. I started looking for a framework to guide what "good" interactive play actually looks like.

> "Content is engaging, kids are actively involved, it feels meaningful — and it's social. So ideally, you or another family member is watching it with them."
> — NPR, on the E-AIMS model for interactive media

The E-AIMS model gave me a clear design directive: mirror the real world. That became my north star.

---

## Research + discovery

### What kids respond to — and what I already knew from the floor

I looked at what was already in our house (a Yoto Player, a Terra Busy Board) and at research on learning environments that draw children's attention through tactile, exploratory materials. I'd also spent hours playing with Henry — enough to know that novelty wears off fast and that physical interaction holds his attention longer than passive content.

That pointed me toward sensors and a microprocessor. I landed on a joystick and piezos as the core input system and started experimenting with form.

---

## Design iterations

### Four versions. One real kid. No mercy.

**Version 1 — Floor pad with FSR + recorder** `Scrapped`
Step on it, record a sample. In theory, fun. In practice, too complicated — and FSRs are too fragile for this scale. Henry confirmed it wasn't working.

**Version 2 — Rubber bands + piezos** `More promising`
Shifted focus to vibration picked up by contact mics. Plucking rubber bands to trigger piezos felt more like something I could actually build — and more like something a kid would want to touch.

**Version 3 — Playtested — Vibration + light + mic + ribbon** `Controls need rethink`
Layered in more: things lit up, a ribbon changed pitch, a mic captured sound, and there was on-screen feedback. Feedback said: keep it tactile, but the controls were unclear — agents guessed at what the joystick did.

**Version 4 — Final — Biome Box** `Shipped`
Rethought the enclosure: 4 contact mics glued in a square pattern, joystick integrated, foam core box with laminated colored paper. UI rebuilt around biome imagery generated with Midjourney. Arduino code and UI both vibecoded.

---

## Key feedback + learnings

### What the critiques surfaced

**Tactility was the hook**
Users found the physical form factor engaging and comfortable. Keeping input physical — not screen-mediated — was the right call.

**Controls were opaque**
No one knew what the joystick did without trying it. Mapping needed to be more intuitive — or more legible in the UI.

**E-AIMS came in at midterm**
The paper prototype didn't yet follow my own research framework. The shift to biome-based UI was how I brought analogous, real-world relationships back in.

**Engagement has a half-life**
Henry recognized the circles on the device matched the screen — that was a win. But he lost interest quickly, which pointed to a depth problem the next version would need to solve.

---

## What it's made of

### The stack

Arduino · 4× piezo contact mics · Joystick · Breadboard · Foam core enclosure · Laminated colored paper · Midjourney (biome art) · Vibecoded UI + firmware · Recorded biome audio
