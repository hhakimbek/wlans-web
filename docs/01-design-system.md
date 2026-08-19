# wlans-web — Design System (Phase 2)

> Status: **Committed.** Direction **A — "Studio White"** (D4, revised in Phase 3).
>
> ⚠ Supersedes the earlier "Signal" direction (dark, OLED-cyan, instrument
> register). That direction was built on the wrong platform premise — see
> §1 of `00-architecture.md`. The token *architecture* survived unchanged;
> only the values and the register were replaced.
> Date: 2026-08-18 · Produced with `ui-skills-root` → `ui-ux-pro-max` + `apple-design`
> Companion to `docs/00-architecture.md`. Phase 3 builds against this document.

---

## 0. Phase 2 revision — 2026-08-19

Re-opened against a repositioning brief that changes the premise this document
was built on. Three findings, in order of cost.

**A. The document had stopped describing the product.** The values table in §3
listed a palette the code never shipped (`#FFFFFF` ground, `#1C58B8` accent,
IBM Plex) while `packages/design-tokens` shipped a different one (`#F8FAFC`
ground, `#2663EB` brand, Manrope). §3 is now regenerated from the contrast
gate. A design doc that drifts from its tokens is worse than no doc: it is
cited in review as if it were true.

**B. The site violates its own committed rules.** §3 states the accent "never
fills the primary button" and that colour is scarce. The implementation uses
`--grad-brand` in 15 places — primary buttons, card icon tiles, the tab bar
indicator, the FAB — plus `--grad-text` on hero headlines. Gradient-filled
buttons and gradient headline text are the single most recognisable signature
of a templated AI-generated site, which is the exact thing the brand brief says
to avoid. **Phase 3 removes them**; the primary CTA becomes solid ink.

**C. The premise that §1 rejected has been reinstated.** §1 rejected the
database's "Dark Mode (OLED) + Swiss minimalism" recommendation on the grounds
that this is "a services company selling to business buyers". The new brief says
the opposite: a hybrid engineering brand in the register of Vercel, Apple and
Stripe, whose flagship is an open-source display framework for engineers, with
an interactive hardware simulator. Re-queried on the new premise, the database
returns the same answer three times — *Open Source Project Landing*, *API
Developer Portal*, *Developer Tool* all resolve to **Dark Mode (OLED) +
Minimalism & Swiss Style**, landing pattern *Hero + Install + Contribute*.

### The decision: two registers, one token system

Not a repaint. The site has two audiences with different jobs (see
`00-architecture.md`), and one visual register cannot serve both:

| Surface | Audience | Register | Ground |
|---|---|---|---|
| Brand, services, work, company | business buyer | **Studio White** — unchanged | `--bg-0` light |
| Framework hub, playground, docs | engineer | **Instrument** — dark | `--bg-0` dark |

The framework hub renders the site's existing **dark theme**, scoped with
`data-theme="dark"` on the route. No new palette, no second token file — the
dark ramp already exists and already passes the gate.

Three reasons this is right rather than a compromise:

1. **A 1-bit OLED panel is a dark object.** Presenting hardware on its own
   ground is what a product page does; a white page framing a black panel is
   the Apple pattern, not an inconsistency.
2. `apple-design` §12 — material weight encodes hierarchy. A structurally
   different region *should* read as a different surface.
3. Flipping the whole site dark would repeat the §1 mistake in the opposite
   direction: choosing a genre over the reader. The buyer landing on `/work`
   still needs the portfolio screenshots to be the brightest thing on screen.

### What Phase 3 must change

| # | Change | Why |
|---|---|---|
| 1 | Delete `--grad-brand` from buttons, icon tiles, tab indicator, FAB | finding B — the templated-site signature |
| 2 | Delete `--grad-text` from headlines | same; a headline earns emphasis from weight and size |
| 3 | Primary CTA → solid `--text-1` on `--bg-2` | §3's own rule, never implemented |
| 4 | `/framework/*` routes carry `data-theme="dark"` | the decision above |
| 5 | Reconcile §4 with reality: the shipped face is **Manrope**, not IBM Plex | either change the doc or change the font — do not ship both stories |

**Open:** §4's Cyrillic and `U+02BB` requirements were written for Plex and have
not been re-verified against Manrope. Uzbek `oʻ` / `gʻ` must be checked in the
shipped subset before this is called done.

---

## 1. Evidence, and where we deliberately depart from it

`ui-ux-pro-max` was queried for product pattern, style, colour, and typography.
Its recommendations, and what we did with each:

| Query result | Verdict |
|---|---|
| **Style: "Dark Mode (OLED)"** — deep black, high contrast, minimal glow | **Rejected in Phase 3.** It was accepted on the wrong premise: the query described a developer-tool product, and the database answered that query correctly. A services company selling to business buyers needs the opposite register — light, open, and quiet enough that portfolio screenshots carry the colour |
| **Pattern: "FAQ/Documentation Landing"** | **Rejected — off-target match.** The query hit on "documentation". A hybrid company site is not a support centre. Structure follows §5 instead |
| **Palette: `#0F172A` bg / `#22C55E` accent** | **Rejected.** Tailwind `slate-900` + `green-500` — the most-used developer-tool palette on the web, and the wrong genre besides. Superseded entirely by §3 |
| **Typography: JetBrains Mono + IBM Plex Sans** | **Partially accepted.** IBM Plex Sans survived the direction change: it carries oversized editorial headlines well, and it satisfies a constraint the database does not model — trilingual Cyrillic (§4). Mono drops to a supporting role for technical labels |
| **Motion: stagger `back.out(1.4)`, 300–450ms** | **Rejected.** `back.out` overshoots on a scroll reveal that carried no user momentum — decoration, not physics. Superseded by `apple-design`'s rule in §6 |
| **Pre-delivery checklist** (no emoji icons, visible focus, reduced-motion, 4.5:1, breakpoints) | **Accepted wholesale.** Folded into §8 |

**The i18n constraint the database cannot see.** D1 (uz + en + ru) makes Cyrillic
coverage a hard filter, and it eliminates most of the fashionable choices —
Geist has no Cyrillic at all. That constraint is a gift: it pushes the typography
somewhere the templated sites cannot follow.

---

## 2. Design principles for this brand

Five rules, each one a decision we can be held to.

1. **The site is the frame; the work is the colour.** App screenshots are
   already saturated. A loud site competes with the portfolio it exists to
   sell, so the chrome stays near-monochrome and the accent stays rare.
2. **Evidence over adjectives.** "We deliver excellence" is worth nothing to a
   buyer. A named client, a shipped app, a measurable outcome, and a described
   process are worth everything. Every section must carry one of those.
3. **Never invent credentials.** No fabricated client names, metrics, reviews
   or screenshots — not even as placeholder. A visible gap is honest; a number
   a visitor can disprove costs more trust than showing nothing.
4. **Motion is physics or it is absent.** Movement earns its place by
   responding to input. Decorative entrance animation is deleted, not tuned.
5. **Nothing is arbitrary.** Every spacing, duration and tracking value comes
   from a token and can be defended. Ad-hoc values are the defect.

---

## 3. Colour — Direction A, "Studio White"

Committed in `packages/design-tokens/color.css`. **Light-first**; dark ships as
secondary. Authored in **OKLCH** — perceptual lightness means the ramp is built
by moving one number and contrast stays predictable across hues.

**The rule that defines this palette:** `--accent` is spent only on links,
focus and active state. It never fills a section, never fills the primary
button. The primary CTA is **solid ink on white** — maximum contrast needs no
colour, and keeping the accent rare is what leaves room for the work to be the
brightest thing on screen.

### Verified values

Computed and checked by `packages/design-tokens/contrast-check.py`, which
parses the shipped CSS — not a copied table — so the gate cannot drift from
reality. It runs in CI.

| Token | Light | | Dark | | Role |
|---|---|---|---|---|---|
| `--bg-0` | `#F8FAFC` | | `#0F1319` | | page ground — a cool off-white, so a card can be pure white |
| `--bg-1` | `#F0F4F9` | | `#171D28` | | alternating section band |
| `--bg-2` | `#FFFFFF` | | `#1D2431` | | card |
| `--line` | `#D7DEE8` | 1.3:1 | `#2E3644` | | decorative divider — **exempt** |
| `--line-control` | `#818D9F` | 3.21:1 | `#596478` | 3.08:1 | input / control edge |
| `--text-1` | `#1E293B` | 14.00:1 | `#F3F5F9` | 16.94:1 | headlines |
| `--text-2` | `#424E60` | 8.08:1 | `#BAC1CE` | 10.23:1 | body |
| `--text-3` | `#616D7D` | 5.04:1 | `#8D96A6` | 6.17:1 | captions, meta |
| `--brand` | `#2663EB` | 4.94:1 | `#6A9BFF` | 6.81:1 | **links, focus, state** |

> Regenerate this table with `python packages/design-tokens/contrast-check.py`.
> It parses the shipped CSS, so the table and the code cannot disagree — the
> previous version of this table did, for weeks, and nobody noticed.

### Two findings that only surfaced by measuring

1. **The accent is a link colour, so it needs 4.5:1, not 3:1.** The gate was
   originally written treating accents as decorative. A link carries body text;
   it is held to body-text contrast. `#3B82F6` — the default blue on every SaaS
   landing page — cannot reach 4.5:1 on white, which is why this palette runs
   considerably darker at `L 0.48`.
2. **Text must clear 4.5:1 on *every* surface it can sit on, not just the page
   ground.** `--text-3` passed on white at 4.95:1 and failed on `--bg-3` at
   4.28:1. The gate now checks all four surfaces; the token was darkened.

### Structural rules

- Elevation is restrained. Heavy drop shadows are what make a light layout read
  as a template; a hairline does the work. `--shadow-lift` exists only for
  genuinely floating chrome such as the device frames.
- Structure comes from whitespace, hairlines and one alternating band —
  never from coloured panels.
- Meaning is never carried by colour alone; always paired with icon or label.

---

## 4. Typography — IBM Plex Sans + IBM Plex Mono

Committed in `packages/design-tokens/typography.css`.

**Why one superfamily, departing from the database's JetBrains Mono + IBM Plex
Sans pairing:**

1. **Cyrillic.** D1 ships uz + en + ru. Plex covers Latin, Latin Extended and
   Cyrillic in a single consistent design; a mixed pairing risks a visible
   change of voice between an English heading and a Russian one. This same
   constraint rules out the fashionable choices — Geist has no Cyrillic at all.
2. **Budget.** Two families from one superfamily share proportions, so mono sits
   inside body copy without a size correction, and fewer files ship against the
   90KB first-load budget.
3. **Register.** Plex was drawn for an engineering company. It reads technical
   without costume, and it is absent from the Inter/Geist monoculture that makes
   AI-generated sites recognisable at a glance.

**Three details the type system encodes that most sites miss:**

- **Ligatures are off in code.** In prose they are pleasant; in a sample an
  engineer will copy verbatim, rendering `!=` as `≠` misrepresents the source.
  This brand's whole claim is that what you see is what runs.
- **Cyrillic gets a ~4% leading correction.** Cyrillic has taller ascenders and
  shorter descenders than Latin, so identical `line-height` reads tighter in
  Russian. This is what separates a trilingual site from a translated one.
- **Tabular figures wherever a number changes in place.** The simulator HUD
  updates FPS, bytes and flush time every frame; proportional figures would make
  the panel twitch continuously.

**Hard requirements**, which narrow the field more than taste does:

| Requirement | Why |
|---|---|
| Latin + **Latin Extended** + **Cyrillic** in one family | uz + en + ru in one type voice; a fallback swap mid-sentence is visible |
| `U+02BB` (modifier letter turned comma) | Uzbek Latin needs it for **oʻ** and **gʻ**. A font missing it renders tofu in the company's own language — **verify before committing** |
| Variable weight axis | One file covers 400–700; three static weights cost more than one variable |
| Tabular figures | Live FPS, byte counts, and flush times must not jitter as they update |
| Self-hosted, `unicode-range` split | A uz/en visitor must never download the Cyrillic subset. Directly serves the 90KB budget |

**Mechanics — already committed in `packages/design-tokens/scale.css`:**

Size, leading, and tracking are declared **as a set per step**. A single global
`letter-spacing` is wrong somewhere by definition: display sizes need negative
tracking because letters drift apart as they grow, and micro sizes need positive
tracking to stay legible. Leading moves inversely to size.

Body floor is 16px — below it, iOS Safari zooms on input focus.

---

## 5. Page structure

The site tells one argument: *this team ships real products, here is the proof,
and here is what working with them looks like.*

| # | Section | Job | Evidence device |
|---|---|---|---|
| 1 | **Hero** | State the claim in one line | Oversized headline + device row |
| 2 | **Proof strip** | Make the claim checkable | Real metrics — currently placeholder |
| 3 | **Services** | Say what is actually sold | Three areas, with specifics not adjectives |
| 4 | **Work** | Prove it shipped | Constraint → decision → measured result |
| 5 | **Process** | Answer "what happens after I send the form?" | Four named stages with durations |
| 6 | **Stack** | Satisfy the technical evaluator | Factual tool list |
| 7 | **R&D** | Show the team builds its own tools | Display framework, one section |
| 8 | **Closing CTA** | Convert | Direct, low-friction |

**Reinstated from the earlier direction, which was wrong to remove them:**
client logos, testimonials, metric strips and named case studies. For a
developer-tool brand those read as template filler. For a services company a
buyer has no code to evaluate, so this *is* the evidence.

**Still deleted:** stat counters that animate upward, stock office photography,
generic three-icon feature rows, and any metric that is not true.

---

## 6. Motion — committed in `packages/design-tokens/motion.{css,ts}`

Two binding rules: **only `transform` and `opacity` animate**, and **exits are
one step faster than enters**.

**Springs for anything touchable, durations for everything else.** A
fixed-duration animation cannot respond to new input; a spring can, because new
input only changes the target. Sheets, drawers, and drags are grabbable
mid-flight and reverse without finishing first.

Apple's (damping, response) mapped onto Motion's (bounce, duration):

| Token | bounce | duration | Use |
|---|---|---|---|
| `spring.ui` | 0 | 0.35s | **Default.** Critically damped, no overshoot |
| `spring.sheet` | 0.2 | 0.30s | Drawers, sheets |
| `spring.momentum` | 0.2 | 0.40s | **Only** after a flick or drag release |

Bounce is permitted only when the gesture itself carried momentum. Overshoot on
a menu that merely faded in reads as decoration; overshoot on a card you threw
reads as physics. This is why the database's `back.out(1.4)` scroll stagger was
rejected — a scroll reveal carries no user momentum.

**Gesture physics** shipped as functions: `project()` (momentum landing point,
Apple's exponential-decay form — not the textbook `v²/2a`, which feels wrong),
`rubberband()` (progressive boundary resistance), `relativeVelocity()`
(drag→spring handoff with no visible seam).

**MotionTier** (`full` / `reduced` / `static`) resolves **once, pre-paint**, via
an inline script that writes `data-motion` on `<html>`. Components never
re-detect capability — a component that decides for itself will disagree with
its siblings on the same page. Reduced motion is handled at the **token** level,
so `prefers-reduced-motion` cannot be forgotten in a component.

Durations collapse to `1ms`, not `0` — a `0ms` transition never fires
`transitionend`, and anything awaiting it would hang.

**Materials.** Translucent chrome (`backdrop-filter`) is a capability, not a
default: blur over scrolling content is one of the few reliable ways to drop
frames on low-end Android. Permitted at `full`/`reduced`, solid at `static` and
under `prefers-reduced-transparency`. Never stack two translucent surfaces —
legibility collapses.

---

## 7. Component inventory

**UI library position:** hand-built components on Radix primitives (Phase 1
decision, §3 of the architecture doc). An opinionated component library cannot
reach a distinct identity — you spend more time overriding it than building.
Radix carries only the accessibility-hard parts.
*This decision is pending validation — run `/pick-ui-library` to confirm it.*

| Group | Components | Source |
|---|---|---|
| **Primitives** | Button, Link, Field, Input, Textarea, Select, Checkbox, Radio, Switch, Badge, Avatar, Separator, Skeleton | Custom |
| **A11y-hard** | Dialog, Drawer/Sheet, Tabs, Tooltip, Popover, Accordion, DropdownMenu | Radix, unstyled |
| **Content** | Prose, CodeBlock (+copy), InstallTabs, Callout, ApiTable, Steps, Changelog | Custom |
| **Marketing** | Hero, Phone, ProofStrip, Services, WorkCard, Process, TechStack, SectionHead, CtaBand, Notice | Custom |
| **R&D** | DisplayPanel, StatsHUD (one page, not a hub) | Custom |
| **Inquiry** | StepperForm, DomainPicker, HardwareSpecFields, BudgetBand, ReviewStep, SuccessState | Custom |
| **System** | Header (translucent), Footer, LocaleSwitcher, ThemeToggle, CommandMenu, Toast | Custom + Radix |
| **State** | EmptyState, ErrorState, LoadingState, NotTranslatedNotice | Custom |

`NotTranslatedNotice` is a first-class component, not an afterthought — §6.4 of
the architecture doc makes partial translation a supported state, and the
component is how that promise is kept visible.

---

## 8. Quality bar (Phase 7 audits against this)

- Contrast: 4.5:1 body, 3:1 large text and UI boundaries
- Touch targets ≥ 44×44px with ≥ 8px separation
- Visible focus ring on every interactive element — **never** `outline: none`
- Full keyboard operability; logical focus order; no traps
- SVG icons only (Lucide). **No emoji as icons**
- Feedback on pointer-**down**, not on click
- Breakpoints verified at 375 / 768 / 1024 / 1440
- No horizontal scroll at any width; zoom never disabled
- Reserve space for all async content — CLS < 0.05
- `prefers-reduced-motion`, `prefers-reduced-transparency`, `prefers-contrast`
  all honoured
- Every live number uses tabular figures

---

## 9. What Phase 2 shipped

`packages/design-tokens/` — the exit gate was "tokens committed as code, not
mockups" (R5). It is met.

| File | Contains |
|---|---|
| `index.css` | Single entry point; import order is load-bearing |
| `scale.css` | Spacing, radius, layout widths, type scale (size+leading+tracking as a set), z-index, density mode |
| `color.css` | OKLCH palette, both themes, elevation, focus ring, display-panel constants |
| `typography.css` | Plex families, numerics, code rules, prose, per-locale corrections |
| `motion.css` | Durations, easings, MotionTier, materials, press utility |
| `motion.ts` | Springs, `project()`, `rubberband()`, `relativeVelocity()`, tier resolution, pre-paint script |
| `contrast-check.py` | CI gate — parses `color.css`, verifies contrast and sRGB gamut |

**Two open items carried into Phase 3:**

- **D5 — verify `U+02BB` in the shipped Plex subset.** Uzbek Latin needs it for
  *oʻ* and *gʻ*. A missing glyph renders tofu in the company's own language.
  Blocking for the `uz` locale, not for the others.
- **UI library position** (hand-built + Radix) is inherited from Phase 1 and
  still wants validation — run `/pick-ui-library`.
