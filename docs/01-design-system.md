# wlans-web — Design System

> Status: **Committed.** Direction **"Paper & Ink"** (Phase 4).
>
> ⚠ Supersedes Direction A "Studio White" and, before it, "Signal". The token
> *architecture* has survived all three unchanged; only the values, the faces
> and the register were replaced. Everything below describes what is in
> `packages/design-tokens/` and `apps/web/app/*.css` right now — the colour
> table is regenerated from the gate, not typed by hand.
>
> Companion to `docs/00-architecture.md`.

---

## 0. Phase 4 revision — what was wrong and what replaced it

The site was reviewed against one question: *does this look like a page a
company paid for, or like a page a machine produced?* It looked produced. Five
findings, in order of how much they cost.

**A. Gradients were the house style, and gradients are the tell.**
`--grad-brand` filled the primary button, every card icon tile, the process
numbers, the tab indicator, the testimonial avatars, the floating action
button, the chip indicator, the play button and the closing band.
`--grad-text` painted the accent phrase of every headline on every page. A
blue-gradient fill next to gradient headline text is the single most
recognisable signature of a generated marketing page — and §3 of the previous
revision had already written down the rule against it without implementing it.
**Every gradient fill is gone.** Structure is carried by ink, hairlines and
whitespace; the accent survives as one flat colour on one phrase.

**B. The devices contained wireframes.** Every phone on the site framed an SVG
of grey rounded rectangles. A wireframe inside a phone on a portfolio reads as
*we have nothing to ship*, which is the opposite of the argument the page is
making. There were also five different phone frames, each hard-coding a bezel
in pixels, so the same "device" was a slab at 200px and a picture frame at
90px. **One `Device` component now draws the hardware in proportions taken
from the hardware, and it contains a real interface** (§6).

**C. There were no photographs at all.** The first design principle this
project wrote down is *the site is the frame; the work is the colour* — and
there was no colour, because there was no work on screen. Six photographs of
the conditions each product runs in now carry the project tiles (§5).

**D. The type was the monoculture face.** Manrope's flat-sided `o` and
single-storey `g` are on a large share of generated sites. Replaced by
**Onest** for display and UI and **IBM Plex Mono** for labels and data (§4).

**E. Two real layout bugs the visual pass surfaced.**
`.container--narrow` never applied (a single-class modifier cannot beat
`.container`, which the bundler emits last), and a `translate` property
declared in the same rule as a `transform` is silently dropped by the build —
which left the mega menu and the mobile service fan each offset by half their
own width. Both are fixed, and both are commented at the site of the fix.

---

## 0b. Phase 4.1 — the review pass

Five findings from reading the built site rather than the code.

**A. Black had taken over.** Ink was correct for the primary button and the
closing band and wrong for everything else it had spread to: the filter
indicator, the active language, the floating action, the card and tile hover
borders, the rail arrows, the secondary button hover, the process rules, the
mega-menu tile. A page with a dozen black objects has no accent left. Ink now
holds two jobs; **blue took back every state and selection** it should have
been marking all along.

**B. A brand mark disappeared into its own hover.** The Apple and Android
silhouettes opt out of the accent tint so they are never recoloured into
someone else's logo — but the opt-out also applied while the mega-menu tile
was inverted, so they stayed black on a filled box. The exception is now
scoped to the resting state only.

**C. The project card had gone flat.** Simpler was right; static was not. It
now runs one short hover sequence — card lifts, photograph drifts, device
rises out of the frame, invitation arrives last — and it lost a row: store
ratings moved to the case study, where they are not competing with the result
line a buyer actually scans for. See §8.

**D. The contact page had good UX and no UI.** Nine inputs in one column, a
hard grey box on all four sides of every field, and a select chevron drawn out
of two overlapping gradients. Rebuilt: see §9.

**E. The home page was the other pages, concatenated.** Services, work,
industries, process, clients, stack, R&D and the FAQ — every one of which also
has a page of its own. Someone who scrolled it had read the whole site and had
no reason to click. Four blocks were cut and one was added that exists nowhere
else. See §5.

---

## 1. Design principles

Five rules, each one a decision we can be held to.

1. **The site is the frame; the work is the colour.** The chrome is
   near-monochrome so the project photography is the only saturated thing on
   the page. This is now implemented, not merely stated.
2. **Evidence over adjectives.** A named constraint, a described decision and
   a measured outcome are worth everything; "we deliver excellence" is worth
   nothing. Every section carries one of the three.
3. **Never invent credentials.** No fabricated client names, logos, metrics,
   reviews or screenshots — not even as placeholder. This is why the tiles
   carry a photograph of the *operating environment* rather than a mocked-up
   client screenshot, and why placeholder copy is labelled in the page.
4. **Motion is physics or it is absent.** There is no page-load entrance
   animation anywhere on the site. Movement responds to input: press states,
   hover lifts, the filter indicator, the accordion, the menu, the fan.
5. **Nothing is arbitrary.** Every spacing, duration and tracking value comes
   from a token. Where a number is tuned by eye — the crop line on a device in
   a tile, the arc of the mobile fan — the comment says what it was tuned
   against.

---

## 2. Colour — "Paper & Ink"

Committed in `packages/design-tokens/color.css`. Light-first; dark ships as an
explicit `[data-theme='dark']` opt-in and is never automatic.

**The three rules that define this palette:**

- **Ink holds exactly two jobs.** The primary button and the closing band —
  plus the device frames, which are ink because the hardware is. Nothing else.
  Ink spread to a dozen elements once and the page lost its accent entirely;
  the rule is now countable, so the next addition has to displace one.
- **Blue marks state.** Links, focus, the active filter chip, the selected
  language, the hover on a card or a rail arrow, the floating action, the
  accent phrase in a headline. It never fills a section and never fills the
  primary button.
- **A brand mark is never recoloured**, in either direction — not tinted to the
  accent at rest, and not left black on an inverted tile.
- **There are no gradient fills.** Two gradients remain in the whole system:
  the metal rail of the device frame and the balance card inside an
  illustrative screen. Both are lighting on an object, not decoration.

### Verified values

Computed and checked by `packages/design-tokens/contrast-check.py`, which
parses the shipped CSS — not a copied table — and runs in CI.

| Token | Light | Ratio vs `--bg-0` | Role |
|---|---|---|---|
| `--bg-0` | `#FAFBFC` | — | page ground |
| `--bg-1` | `#F1F4F7` | — | the one alternating band |
| `--bg-2` | `#FFFFFF` | — | card |
| `--bg-3` | `#EBEFF2` | — | muted chip, input rest |
| `--ink` | `#0F1319` | — | CTA band, device frame, button fill |
| `--ink-soft` | `#22262E` | — | button hover |
| `--line` | `#DDE0E4` | 1.2:1 | decorative hairline — **exempt** |
| `--line-strong` | `#CCD1D7` | — | card edge inside a band |
| `--line-control` | `#808A95` | 3.40:1 | input / control edge |
| `--text-1` | `#171B23` | 16.65:1 | headlines |
| `--text-2` | `#4C5158` | 7.76:1 | body |
| `--text-3` | `#646971` | 5.32:1 | captions, meta |
| `--blue-600` | `#215CDE` | 5.58:1 | **links, focus, every selected or active state, accent phrase, the floating action** |
| `--success` | `#00793B` | 5.31:1 | success state |
| `--danger` | `#C01D20` | 5.89:1 | errors |
| `--accent-warm` | `#C56A00` | — | store ratings, one place only |

> Regenerate with `python packages/design-tokens/contrast-check.py`. Text is
> checked against **all four surfaces**, not just the page ground — a token
> that only passes on paper is not safe on a card inside a band.

**Two findings that only surfaced by measuring.** The accent is a link colour,
so it needs 4.5:1, not 3:1 — which is why this blue runs considerably darker
than the `#3B82F6` on every SaaS landing page. And `--text-3` has to clear
4.5:1 on `--bg-3`, the darkest surface it can sit on, not just on `--bg-0`.

**Elevation is shallow and neutral.** Heavy blue-tinted drop shadows are what
make a light layout read as a template; a hairline does the work. The one deep
shadow in the system is `--shadow-device`, because a phone held above the page
is a physical object and needs a contact shadow plus a wide cast or it reads
as a sticker.

---

## 3. Typography — Onest + IBM Plex Mono

Committed in `packages/design-tokens/typography.css`, loaded in
`app/[locale]/layout.tsx` via `next/font/google`.

**ONEST** — display and UI. A variable grotesque drawn for Latin and Cyrillic
together, so a Russian heading and an English one are the same voice rather
than two fonts pretending. Quieter than Manrope in body copy and it holds a
tighter, heavier display setting without turning geometric.

**IBM PLEX MONO** — the utility face, at 500 weight and small sizes only.
Eyebrows, stat labels, fact keys, durations, breadcrumbs, technology tags,
store names, code. An engineering company writes its labels in the register it
works in; setting everything in the sans is what makes a page read as one
undifferentiated block of marketing copy.

**The i18n constraint that eliminates most fashionable choices.** uz + en + ru
means Latin + Latin Extended + Cyrillic in one family, plus `U+02BB` for the
Uzbek `oʻ` and `gʻ`. Geist has no Cyrillic at all. **Both faces carry
`U+02BB–U+02BC` in their `latin` subset** — verified against the shipped
Google Fonts CSS, not assumed. The long-standing D5 open item is closed.

**Mechanics.** Size, leading and tracking are declared **as a set per step** in
`scale.css`: display sizes need negative tracking because letters drift apart
as they grow, micro sizes need positive tracking to stay legible, and leading
moves inversely to size. The body floor is 16px — below it iOS Safari zooms on
input focus and never zooms back out. Cyrillic gets a ~4% leading correction,
including on the display sizes where the difference is most visible. Tabular
figures go anywhere a number changes in place or sits in a column.

---

## 4. Structural devices

Each one encodes something true about the content. None of them is a shape
chosen because the section needed decorating.

| Device | What it says |
|---|---|
| **Eyebrow**: mono label after a 22px rule | this is where a section begins |
| **Stat**: 2px rule above, figure, mono label | this is a data strip, not four more cards |
| **Process**: `01`–`06` in mono over a rule | the order is the information — it is the sequence a project runs in |
| **Accent phrase**: one flat blue phrase in a headline | the claim, marked once |
| **Notice**: mono, left rule, `--bg-3` | provisional content, addressed to whoever fills it in |
| **Placeholder stat**: rule drops to `--line-strong` | the figure is not real yet, and the page says so |

**Removed, deliberately:** coloured eyebrow pills, gradient icon tiles,
gradient step circles, outlined `-webkit-text-stroke` numbers (a graphic
effect, and invisible in engines without the property), and the infinite halo
on the play button.

---

## 5. Page structure

The site tells one argument: *this team ships real products, here is the
proof, and here is what working with them looks like.*

| # | Section | Job | Evidence device |
|---|---|---|---|
| 1 | **Hero** | State the claim in one line | Oversized headline + two devices running real interfaces |
| 2 | **Proof strip** | Make the claim checkable | Ruled figures — currently placeholder, and labelled as such |
| 3 | **Work** | Prove it shipped | **The signature block** — see below |
| 4 | **Services** | Say what is actually sold | Five areas, with specifics not adjectives |
| 5 | **The lab** | Show what the team builds for itself | **Home only.** The display engine, running live — see §6 |
| 6 | **Clients** | Social proof | Rail of quotes and video — placeholder, labelled |
| 7 | **CTA** | Convert | Ink band |

**Evidence before offer.** Work moved above services: a reader who has just
been given a claim wants to see something that shipped, not a price list.

**Four blocks were cut from the home page and live only on the page that owns
them:** industries (`/industries`), the process (`/services`, `/company`), the
stack (`/services`) and the FAQ (`/services`). Nothing was lost — every one of
them was already a section on its own page, rendered by the same component.

**What replaced them is the one section that exists nowhere else.** The lab
carries the team's own display engine, compiled to TypeScript and running a
real frame loop in the visitor's browser, reporting the bytes and milliseconds
it actually costs. Every other section on the site is evidence *about* the
work; this is the work, running. It is `next/dynamic`-loaded with `ssr: false`
and a placeholder that reserves its exact height, because a canvas simulation
below the fold has no business in the home route's first-load JS — which is
budgeted at 20KB and would not have survived it.

### The signature block — project tiles

The one idea the page is built around. Each project gets a field of its own: a
photograph of the conditions the software actually runs in, with the device
standing in it. A courier in traffic. A payment at a café counter. A clinic
consultation. The constraint named in the summary is legible before the
summary is read.

The first tile runs full width and gets a 21:9 crop; the rest are half-column
at 4:3. An editorial page does not give every item the same weight.

**Why a photograph of the environment and not a screenshot.** The client
screenshots do not exist, and inventing one would be a fabricated credential
(principle 3). A photograph of the operating conditions is true, it is
specific to that project, and it does the job the screenshot was supposed to
do — it makes the problem concrete.

Photography is licensed from Pexels (free for commercial use, no attribution
required) and lives in `apps/web/public/img/`. A per-project hue tint is
multiplied over every frame so six photographers' colour grading resolves into
one page rather than a mood board.

**The card carries three facts and nothing else** — what it is, what was hard,
what changed. Store ratings moved to the case study page: on a card they were
a fourth row competing with the result line.

**Removed:** the card no longer inverts to a blue gradient on hover, and the
client quote no longer drops out of a collapsing grid row beneath it. Both
were interactions that cannot happen on touch, where most of the traffic is,
and the quote reads better on the case study page where it belongs. What the
hover does instead is §8.

---

## 6. The device, and what runs on it

`components/marketing/device.tsx` + `app/device.css`.

**One rule governs the whole file:** every length is a percentage of the
device's own width, expressed in `cqw` against a `container-type: inline-size`
on `.device`. That is what makes one markup tree correct at 88px inside a card
and at 300px in a hero.

Proportions are taken from the hardware, not invented:

| | |
|---|---|
| rail | ≈ 3.0% of body width |
| outer radius | ≈ 14.6% |
| inner radius | outer − rail — concentric; mismatched curves are the single detail that makes a CSS phone look drawn |
| dynamic island | ≈ 30% wide, 8.4% tall, 2.4% from the top of the screen |

Three things make it read as metal: a rail gradient with a fixed top-left
light source, hairline inset highlights on the top and bottom edges, and a
shadow in two layers — one tight contact shadow that draws the silhouette, one
wide cast that lifts it. Remove any one and it flattens.

**The interface inside it** (`app-screen.tsx`) is four compositions — `track`,
`finance`, `catalog`, `schedule` — laid out as real screens: a real hierarchy,
real numbers in tabular figures, real photography, a real tab bar with one tab
selected, a status bar reading `9:41`. Content is sized to fill: a booking
screen showing six slots and then a hand's width of nothing before the button
is the exact shape of a placeholder.

It is not a claim about a client's product: no client name, no logo, no
borrowed screenshot. The UI words come from `ui.screens` in the dictionary, so
a Russian visitor does not find an English label inside the phone — the seam
that tells a reader a site was translated rather than built in three
languages.

Where a device is cropped by a tile's edge, the overhang is tuned so the crop
line falls inside the device's own tab bar. At the first value it cut straight
through the primary button on the screen, which reads as a rendering mistake
rather than as a crop.

---

## 7. Responsive

**One breakpoint governs the shell: 960px.** Above it the header nav is the
navigation; below it the bottom tab bar is. The previous version put the nav
at 900px and the tab bar at 899px in some places and 900px in others, which
left a band of widths with neither.

**Cards stack; they do not become a swipe rail.** The previous version turned
every three- and four-column grid into a horizontal snap strip below 900px,
which meant a visitor on a phone could not see how many services there were
without discovering that a block scrolled sideways — and it was the source of
most of the overflow on narrow screens. Two columns from 560px, one below it.
Horizontal scrolling survives in exactly two places where the list genuinely
continues: the filter chips and the testimonial rail.

**`body { overflow-x: clip }`** is the hard floor under "no horizontal scroll
at any width". `clip`, not `hidden`: `overflow: hidden` on one axis turns the
other into a scroll container and silently breaks every `position: sticky` on
the page.

Verified at 320 / 390 / 768 / 1024 / 1440 with an automated overflow audit —
every element whose box escapes the viewport is reported, and the only ones
that do are inside the two intentional scrollers.

---

## 8. Motion — committed in `packages/design-tokens/motion.{css,ts}`

Two binding rules: **only `transform` and `opacity` animate**, and **exits are
one step faster than enters**. Springs for anything touchable, durations for
everything else; bounce is permitted only when the gesture itself carried
momentum.

**There is no entrance animation on this site.** Not on the hero, not on
scroll, not staggered onto a grid. Decorative entrance motion is deleted, not
tuned — it is also one of the reliable tells of a generated page. The motion
budget is spent entirely on response: press states, hover lifts, the filter
indicator sliding as one object, the accordion's `0fr → 1fr` row, the mega
menu unfolding from its trigger, and the service fan.

### The project tile — the one choreographed moment

Four things move on one hover, at three speeds, and each of them says
something different:

| What | Property | Duration | Why |
|---|---|---|---|
| The card | `translateY(-4px)` + shadow | `--dur-base` 240ms | feedback — the interface heard the pointer |
| The photograph | `scale(1.06)` | `--dur-ambient` 620ms | depth — a photograph drifts, it does not snap |
| The device | `translateY(-16px)` | `--dur-slow` 360ms | the product coming forward out of its scene |
| The invitation | fade + `translateY(10px→0)` | `--dur-fast` 160ms, +40ms delay | the next step, arriving last |

The speeds are deliberately not equal. The photograph moving at the same
240ms as the card would read as a UI state change rather than as parallax, and
the invitation arriving at the same moment as the lift would read as one
object rather than as a consequence.

Everything animated is `transform` or `opacity`, so the whole sequence stays on
the compositor. It is gated on `(hover: hover) and (pointer: fine)` — on touch
a tap fires a false hover and the state sticks until the next tap somewhere
else — and on touch the invitation is simply always visible, because a
disclosure nobody can trigger is a disclosure that does not exist. Reduced
motion is handled at the token level: every duration in that table collapses
to 1ms, so the states still change, they just stop travelling.

`MotionTier` resolves **once, pre-paint**, via an inline script that writes
`data-motion` on `<html>`. Reduced motion is handled at the **token** level,
so `prefers-reduced-motion` cannot be forgotten in a component. Durations
collapse to `1ms`, not `0` — a `0ms` transition never fires `transitionend`.

**Materials.** Translucent chrome (`backdrop-filter`) appears on exactly two
surfaces: the header and the mobile tab bar. Never two stacked.

---

## 9. Forms

The contact page is what the whole site points at, and it was the least
designed surface on it. Three changes carry the rebuild.

**The active field is the brightest one, not the darkest.** Inputs sit on the
band tint at rest and lift to white with a 3px brand ring on focus. A field
that changes only its border colour is doing the work with the quietest
property it has, and a hard grey box on all four sides of nine fields reads as
a table, not as a form.

**Nine inputs are two named groups.** "About you" and "About the project" are
different questions; a single column hides that. The legends are mono, ruled
across the remaining width, and they are real `fieldset`/`legend` semantics.

**Errors are wired to their field.** Every message carries an id that the
control names in `aria-describedby`, plus `aria-invalid` — so a screen reader
announces the problem when focus lands on the input instead of leaving a red
border to speak for itself. Errors clear on blur, not on submit: fixing a
field and still being told it is wrong until you press the button again is the
classic way a form feels hostile. Validation never fires on a field the user
has not touched.

Two smaller things that were quietly wrong: the select chevron was drawn from
two overlapping `linear-gradient`s — a trick, not a glyph, and it matched
nothing else on the page — and the required marker was danger red, so a fresh
form opened looking like it was already in an error state. The chevron is now
a real inlined SVG that turns brand blue on focus; the marker is brand blue.

---

## 10. Quality bar

- Contrast: 4.5:1 body, 3:1 large text and UI boundaries — machine-verified in CI
- Touch targets ≥ 44×44px with ≥ 8px separation
- Visible focus ring on every interactive element — **never** `outline: none`
- Full keyboard operability; logical focus order; no traps
- SVG icons only (Lucide + real brand marks). **No emoji as icons**
- Brand marks are never recoloured to the accent
- Feedback on pointer-**down**, not on click
- Breakpoints verified at 375 / 768 / 1024 / 1440
- No horizontal scroll at any width; zoom never disabled
- Reserve space for all async content — CLS < 0.05
- `prefers-reduced-motion`, `prefers-reduced-transparency`, `prefers-contrast`
  all honoured
- Every live number uses tabular figures

Enforced by an automated pass (`scratchpad/tools/uitest.mjs` during
development) across eight routes at 320 / 390 / 768 / 960 / 1024 / 1440: no
horizontal overflow, no interactive target under 40px, no control without an
accessible name, and every duration token collapsing under
`prefers-reduced-motion`. It found three real defects — the wordmark and the
language switcher were both under the touch minimum on a phone, and the header
nav had drifted back to a 1000px breakpoint while the tab bar hid at 960,
re-opening a band of widths with neither navigation.

## 11. Open items

- **Content, not design.** Projects, testimonials and proof figures are still
  placeholders and are labelled as such in the page. The design is built to
  receive real ones without changing: a real screenshot drops into `Device`
  where `AppScreen` is now, and a real client photograph replaces the
  environment shot in `structure.ts`.
- Contact details in `content/structure.ts` are dummies and must be replaced
  before launch.
- UI library position (hand-built + Radix) is inherited from Phase 1 and still
  wants validation — run `/pick-ui-library`.
