# wlans-web — System Architecture (Phase 1)

> Status: **Proposed** · Date: 2026-08-18 · Owner: Architecture
> Phase 1 deliverable. Produced with `orchestrator` + `software-architect`.
> Written in English on purpose: downstream phases (UI/UX, frontend, animation,
> security, devops) and their agents consume this document as the contract.

---

## 0. Decisions and assumptions

D-items are **confirmed decisions**. A-items remain assumptions — override them
before Phase 2 if wrong.

| # | Decision / assumption | Consequence |
|---|---|---|
| **D1** | **Locales: `uz` + `en` + `ru`, across marketing *and* docs** | Full i18n architecture required — see §6.4. Largest single scope driver in the project |
| **D2** | **Hosting: Vercel** | ISR, edge middleware, per-PR previews, instant rollback available from Phase 1.5 |
| **D3** | **The C++ core exists / is being written in-house** | Pixel-parity CI gate (§5.4) is built in full. C++ is the reference; TS is the verified port |
| A4 | **No end-user accounts in v1.** Public site only; internal admin arrives in P2 | An RBAC model designed now would be speculative waste |
| A5 | Lead volume is **low** (tens/month), not a CRM | Justifies Postgres + notifications instead of a queue/pipeline |
| A6 | Primary audience: **engineers and technical buyers**, on mobile, often on 4G | Drives the entire performance budget in §8 |

---

## 1. Platform Overview

> **Revised after Phase 3.** The original premise was wrong and is recorded
> here rather than quietly overwritten. It read: *"the open-source display
> framework is the credibility engine for the B2B business"*, and it produced a
> developer-tool site in the Vercel/Linear register. The client corrected it:
> **wlans is a product engineering company that builds mobile, web and backend
> software.** The display framework was one project, not the identity.

**wlans** is a product engineering team. It builds mobile applications, web
applications, and the backend and cloud infrastructure behind them, for clients.
It also writes its own tools in-house, of which the Arduino display framework is
one — a single page of evidence that the team builds its own instruments, not a
product line.

| Audience | Wants | Success = |
|---|---|---|
| **Business buyer** (founder, product lead, CTO) | evidence the team can ship, and a sense of what it costs | sends a project inquiry |
| **Technical evaluator** on the buyer's side | proof the engineering is real, not outsourced slideware | reads the work and process pages without finding filler |

The site genre is **agency / services**, not developer tool. That distinction is
load-bearing, and getting it wrong the first time cost a full design pass:

| | Developer-tool site | **Agency site (correct)** |
|---|---|---|
| Proof | working code you can run | shipped work, named clients, metrics, process |
| Logo walls, testimonials, numbers | template tells — delete | **the core evidence — required** |
| Register | dark, dense, instrument-like | light, open, confident |
| Hero | a live demo | a claim plus the work |

**Phase 2 explicitly deleted client logos, testimonials and metric strips as
"template tells". For a developer-tool brand that was right. For a services
company it is wrong** — a business buyer has no code to evaluate, so social
proof *is* the evidence. That deletion has been reversed.

**Anti-goal, unchanged:** generic agency copy, stock "digital transformation"
imagery, invented credentials. The last one is not a style preference —
fabricated client names or metrics on a company site are a real liability.

---

## 2. Orchestrator: phase plan, dependencies, and three corrections

### 2.1 Agreed phase map

| Phase | Purpose | Gate to exit |
|---|---|---|
| 1 | Architecture, stack, contracts | This document approved; D1–D3 confirmed, A4–A6 resolved |
| 1.5 | **Thin DevOps slice (new — see C2)** | CI green, preview deploys live, Lighthouse budget enforced |
| 2 | Design system, tokens, **motion tiers** | Tokens + motion primitives committed as code |
| 3 | Core frontend, routes, prototype | All routes render; playground shell present |
| 4 | Backend: inquiry API, DB, notifications | Contract in §7 implemented and tested |
| 5 | Animation + simulator choreography | 60fps verified on a real mid-range Android |
| 6 | Security hardening, SEO, deploy | CSP, headers, rate limits, sitemap/JSON-LD live |
| 7 | Audit, performance, test orchestration | Lighthouse ≥95 mobile; budgets enforced in CI |

### 2.2 Three corrections to the proposed ordering

**C1 — Freeze two contracts in Phase 1, not Phase 4.**
Frontend (Phase 3) cannot build the inquiry form or the playground against
contracts that do not exist yet. Two schemas must be frozen now:

1. `InquiryInput` (zod schema, §6.3) — the form is built against it in Phase 3,
   the API implements it in Phase 4. Same file, single source of truth.
2. `DisplayCore` public API (§5.2) — the playground UI and the engine are built
   in parallel against it.

Everything else in Phase 4 can genuinely wait.

**C2 — Pull a thin DevOps slice forward to Phase 1.5.**
Phase 7's goal is "Lighthouse 95+ on mobile". A performance budget *discovered*
in Phase 7 is a rewrite; a performance budget *enforced* from the first commit is
a constraint. CI + preview deploys + a failing-build bundle budget must exist
before Phase 3 writes UI code. This is the single highest-leverage sequencing
change in the plan.

**C3 — Motion tokens are a Phase 2 output, not a Phase 5 one.**
If Phase 3 builds markup without the motion primitives (`MotionTier`, duration
and easing tokens, `prefers-reduced-motion` plumbing), Phase 5 becomes a
retrofit — and retrofitted motion is exactly what produces janky,
layout-thrashing animation. Phase 2 ships the *vocabulary and primitives*;
Phase 5 ships the *choreography*.

### 2.3 What can run in parallel

```
Phase 1 ──┬─> 1.5 DevOps slice ─────────────────┐
          └─> 2 Design system + motion tokens ──┼─> 3 Frontend ─┬─> 5 Animation ─> 7 Audit
                                                │               │
             4 Backend (after contract freeze) ─┘               └─> 6 Security / SEO
             packages/display-core (independent, from Phase 1) ─┘
```

`display-core` has zero UI dependencies and can be built and tested from day
one, in parallel with everything else. It is the long pole — start it early.

---

## 3. Stack Decision

| Layer | Choice | Why this, not the alternative |
|---|---|---|
| Framework | **Next.js 15, App Router, RSC** | Static marketing + MDX docs + an app-shaped playground + a form API in one runtime. *Rejected: Astro* — wins on raw zero-JS content, loses on the playground, multi-step form state, and a future client portal; two frameworks is a real maintenance cost. |
| Language | **TypeScript, strict** | `display-core` correctness depends on it |
| Styling | **Tailwind v4 + CSS custom properties** | Tokens live in CSS vars (themeable, and readable from JS for canvas colors); Tailwind for velocity |
| Components | **Hand-built + Radix primitives (unstyled)** | Apple-grade identity cannot be reached by restyling a component library — you spend more time fighting it than building. Radix only for the a11y-hard parts: dialog, tabs, select, tooltip |
| Motion | **`motion` (Framer Motion successor) + CSS/WAAPI** | CSS first; `motion` only where gesture, interruption, or spring physics is genuinely required |
| 3D | **Three.js — lazy, capability-gated, one surface only** | See §4 |
| Simulator | **Canvas2D + OffscreenCanvas in a Web Worker** | See §5 |
| Content | **MDX in `content/`, git as source of truth, zod-validated at build** | Engineers edit content in PRs; no CMS ops burden. *Rejected: headless CMS* — adds a network dependency and an ops surface for content that changes monthly |
| i18n | **`next-intl`**, per-route-segment catalogs | App Router / RSC native. *Rejected: `next-i18next`* — Pages Router era, hydrates catalogs client-side. See §6.4 |
| DB | **Postgres (Neon) + Drizzle ORM** | Leads are business-critical; email-only delivery fails silently |
| Email | **Resend** + Telegram/Slack webhook | Redundant notification path |
| Spam | **Cloudflare Turnstile** + honeypot + rate limit | No CAPTCHA friction for real users |
| Editor | **CodeMirror 6** | ~40% of Monaco's weight, usable on mobile, tree-shakeable |
| Tests | Vitest (unit + engine parity), Playwright (e2e + visual) | Parity tests are non-negotiable — see §5.4 |
| Repo | **pnpm workspaces** (no Turborepo yet) | `display-core` must be independently testable, publishable, and mechanically prevented from importing DOM |

### 3.1 The existing Express scaffold

The Express skeleton built earlier in this session is **superseded and will be
removed**. Next.js route handlers cover every API need in §7, and running a
second HTTP server adds a deployment surface with no benefit. If a long-lived
service is ever needed (webhook receiver, queue worker, n8n bridge), it returns
as a separate small service — not as the web server.

### 3.2 Discipline rules that make Next.js hit Astro-class numbers

These are binding, not advisory. They are what makes A6 achievable:

1. **Server Components by default.** `"use client"` is a leaf-level decision,
   never on a layout or a page.
2. **No global client providers.** No app-wide theme/motion/query provider that
   forces the whole tree client-side. `MotionTier` is read via CSS vars plus a
   tiny island, not React context at the root.
3. **Every heavy module is `next/dynamic` with `ssr: false`**, loaded on
   intersection or interaction — never on mount.
4. **`content-visibility: auto`** on every below-the-fold section.
5. **No barrel-file imports** from `components/` — they defeat tree-shaking.

---

## 4. 3D strategy: a deliberate, unpopular recommendation

**Recommendation: no Three.js in the hero. Ship exactly one 3D surface, and not
on the landing route.**

Reasoning:

- `three` + `@react-three/fiber` is ~150KB gzip before a single mesh renders. On
  the landing route that alone puts Lighthouse 95+ mobile out of reach.
- A glowing abstract 3D object is the single most recognizable signature of an
  AI-generated site — the exact thing the brief forbids.
- For an "engineers for engineers" brand, **precision reads as more premium than
  spectacle.** A 128×64 monochrome panel rendering real pixels, a real I²C timing
  trace, a real waveform — that is a flex only this company can make. A rotating
  blob is a flex anyone with a template can make.

**Therefore:**

| Surface | Technique | Weight |
|---|---|---|
| Hero | Canvas2D pixel/signal composition + CSS 3D transforms | ~4KB |
| Capabilities diagram | Inline SVG + WAAPI stroke animation | ~2KB |
| Display panels (everywhere) | Canvas2D in a worker (§5) | shared engine |
| **Device exploded view** (one page: `/work` or `/display`) | Three.js — lazy, desktop + `full` tier only, static image fallback | ~150KB, never on first load |

This is a reversible decision. If Phase 2's design exploration proves a 3D hero
is essential to the identity, it can be added — but it must then pass the same
budget gate in §8, on a real device, or it does not ship.

---

## 5. The Display Simulator (the hard part)

This is the highest-risk, highest-value component. It gets its own architecture.

### 5.1 Layered design

```
┌──────────────────────────────────────────────────────────┐
│ Playground UI (React, client island)                     │
│  CodeMirror · example picker · panel chrome · stats HUD   │
└───────────────┬──────────────────────────────────────────┘
                │ postMessage (structured clone)
┌───────────────▼──────────────────────────────────────────┐
│ Web Worker                                               │
│  ┌────────────────────────────────────────────────────┐  │
│  │ @wlans/display-core   — PURE TS, ZERO DOM          │  │
│  │  Framebuffer (1bpp packed / RGB565) · primitives ·  │  │
│  │  bitmap fonts · layout · dirty-rect tracking        │  │
│  └────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────┐  │
│  │ @wlans/display-sim    — driver + timing model      │  │
│  │  SSD1306 / ST7735 / E-Ink · I²C 400kHz vs SPI 8MHz  │  │
│  │  → computes REAL flush cost in ms and bytes        │  │
│  └────────────────────────────────────────────────────┘  │
│  OffscreenCanvas → renders the panel directly            │
└──────────────────────────────────────────────────────────┘
```

**Why a worker with OffscreenCanvas:** the main thread does *zero* per-frame
work. Scroll, page transitions, and the simulator become physically incapable of
blocking each other. This is how the 60fps guarantee in §8 is actually kept
rather than hoped for. Fallback: main-thread `requestAnimationFrame` render for
Safari < 16.4, capped at 30fps.

**Why Canvas2D and not WebGL:** an SSD1306 frame is 128×64 = 8,192 pixels — 8KB
of `ImageData` per frame, trivially under budget at 60fps on a 2018 phone. WebGL
would add context-loss handling, shader compilation stalls, and approximately
zero benefit. Upscaling is one `drawImage` with `imageSmoothingEnabled = false`.

### 5.2 `display-core` public API (contract to freeze in Phase 1)

Deliberately mirrors the C++ framework's surface so that code shown and code run
stay recognizably the same program:

```ts
createDisplay({ driver: 'ssd1306', width: 128, height: 64, bus: 'i2c', clockHz: 400_000 })
  → { clear, pixel, line, rect, fillRect, circle, text, bitmap,
      setFont, invert, flush, frame, stats }
```

`stats` returns `{ bytesPushed, flushMs, dirtyRects, estimatedFps }` — the honest
hardware cost of the user's code. **This metric is the product.** It is what
makes the playground an engineering tool rather than a toy, and no competitor's
docs page has it.

### 5.3 Running user code — tiered by risk

| Tier | What the user can do | Execution |
|---|---|---|
| 1 (launch) | Pick a curated example, edit its **parameters** | No eval; typed config |
| 2 (launch) | Edit free-form code against the **TS mirror API** | Worker; no DOM, no network; hard instruction + 2s wall-clock budget |
| 3 (later) | Run the **actual C++ core compiled to WASM** | Emscripten build, lazy, desktop-first |

**Brand-critical rule:** the C++ snippet displayed next to the panel must be
*generated from the same source as the frames being rendered*. Showing
hand-written C++ that did not produce those pixels is a lie an embedded engineer
will catch, and it would cost more credibility than the whole playground earns.

### 5.4 Divergence risk and the parity gate — the #1 technical risk

A TypeScript reimplementation of a C++ renderer **will** drift. For a brand whose
entire pitch is engineering rigor, a simulator that quietly lies is worse than no
simulator at all.

Mitigation, in CI, from the first commit:

1. The C++ core is compiled natively (host build, no Arduino deps) and dumps a
   PNG per example scene.
2. `display-core` renders the same scenes and dumps PNGs.
3. CI compares them; **any pixel difference fails the build.**
4. A shared `content/examples/*` scene corpus feeds both — one source, two
   engines.

This makes the TS engine a *verified port* rather than an approximation, and it
keeps the Tier-3 WASM path open without a rewrite.

---

## 6. Domain Model

### 6.1 Source of truth — explicit ownership

Ambiguous ownership is how content sites rot. Three owners, no overlap:

| Data | Source of truth | Why |
|---|---|---|
| Services, showcases, docs, changelog, examples | **Git (MDX/TS in `content/`)** | Versioned, reviewable, engineer-editable, no runtime dependency |
| **Inquiries** and their history | **Postgres** | Mutable, business-critical, must be auditable |
| Stars, latest release, version, contributors | **GitHub API**, cached via ISR (1h) + stale fallback | GitHub owns it; a page render must never block on it |

The only genuine write path in the entire system is the inquiry. Everything else
is read-only content. Recognizing this is what keeps the backend small.

### 6.2 Entities

```
Inquiry (aggregate root)
  id            uuid pk
  ref           text unique          -- "WL-2026-0042", quotable in email
  status        enum(new, triaged, contacted, qualified, won, lost, spam)
  created_at / updated_at   timestamptz

  -- contact
  name, email, company, role, phone?, preferred_channel

  -- engineering payload (this is what makes it not a contact form)
  domains       text[]   -- {embedded, mobile, web, enterprise, oss}
  hardware      jsonb    -- { mcu, display, bus, protocol, qty, environment }
  platforms     text[]   -- {ios, android, flutter, web, linux, rtos}
  budget_band   enum
  timeline_band enum
  description   text
  attachments   jsonb

  -- provenance
  source, campaign, locale, referrer
  user_agent, ip_hash               -- hashed with a server pepper, never raw
  spam_score    numeric
  submission_token uuid unique       -- idempotency: kills double-submit

InquiryEvent (append-only audit — never updated, never deleted)
  id, inquiry_id fk, at, actor, type, from_status, to_status, payload jsonb
```

Indexes: `(status, created_at DESC)`, `(email)`, `unique(ref)`,
`unique(submission_token)`, `GIN(domains)`.

**Audit is architecture, not a feature.** Every status change writes an
`InquiryEvent` in the same transaction as the status update. There is no code
path that mutates an inquiry without recording why.

### 6.3 Inquiry workflow

```
submit
  → zod validate (server-side; client validation is UX only, never trusted)
  → origin check + honeypot + Turnstile verify
  → rate limit (5/h per IP, 3/day per email)
  → idempotency check on submission_token
  → INSERT inquiry (status=new) + INSERT event(created)   [one transaction]
  → 201 { ref }                                            ← respond immediately
  → notify (Resend + Telegram) as a non-blocking side effect
```

**Ordering rule:** persistence commits *before* notification. A lead that is
saved but not emailed is recoverable; a lead that is emailed but not saved is
gone. Notification failure must never fail the request.

Status lifecycle: `new → triaged → contacted → qualified → won | lost | spam`.
Transitions are validated server-side; illegal transitions are rejected, not
silently coerced.

### 6.4 Internationalization — `uz` · `en` · `ru` (D1)

Three locales across marketing **and** docs is the largest scope multiplier in
the project. It is not a plugin decision; it is a content-operations decision.
The architecture must make partial translation a *normal, supported state*,
because the alternative — blocking every release on three complete translations
— is how trilingual sites die.

**Library:** `next-intl` (App Router native, RSC-compatible, per-route message
splitting). *Rejected: `next-i18next`* — Pages Router era, forces client-side
hydration of catalogs.

**Routing:** `/[locale]/...` with `uz` as the default and **no** prefix-stripping
special case. Uniform prefixes (`/uz/...`, `/en/...`, `/ru/...`) cost one
redirect and remove an entire class of routing and canonical-URL bugs.
Locale is resolved in middleware: explicit cookie → `Accept-Language` → `uz`.
A user's explicit switch always wins and is persisted.

**Source and fallback model — the mechanism that makes this survivable:**

| Content | Canonical source | Fallback when missing |
|---|---|---|
| Marketing copy | `uz` (this is an Uzbek company) | → `en` |
| **Docs / framework / API reference** | **`en`** (engineering lingua franca) | → serve `en` with a visible "not yet translated" banner |
| Code identifiers, API names, C++ snippets | **never translated** | n/a |
| Inquiry form labels | per-locale | → `en` |

Every content file carries frontmatter `{ locale, translationOf, status:
draft|machine|reviewed }`. A page whose `status` is `machine` renders a quiet
disclosure. **Untranslated is a valid, shippable state; silently wrong is not.**

**SEO:** `hreflang` alternates on every page, one `x-default` (→ `en`),
per-locale `sitemap-{locale}.xml` in a sitemap index, and a self-referencing
canonical per locale. A fallback page must **not** be indexed under the missing
locale's URL — it emits `noindex` until a real translation exists. Getting this
wrong produces duplicate-content penalties across three locales at once.

**Performance constraint (binding):** message catalogs are split **per route
segment**, never one global JSON. A single trilingual catalog shipped to the
client would consume most of the 90KB landing budget by itself. Server
Components read messages on the server; only interactive islands receive the
narrow slice they actually use. CI asserts that no route ships more than 8KB of
messages.

**Deliberately not translated:** the playground code editor UI is EN-only
(identifiers, API names, and error strings must match the C++ the developer will
write). Localizing it would produce code that does not compile.

**Phasing — translation completeness is a rollout dimension, not a launch gate:**

| | Launch (P1) | P2 |
|---|---|---|
| `en` | complete (marketing + docs) | — |
| `uz` | complete marketing; docs top-20 pages | docs complete |
| `ru` | marketing only; docs fall back to `en` | docs as demand appears |

---

## 7. API Surface

| Method | Route | Auth | Notes |
|---|---|---|---|
| POST | `/api/inquiry` | public | Rate-limited, Turnstile, idempotent. `201 {ref}` |
| GET | `/api/health` | public | Build SHA, uptime, DB reachability |
| GET | `/api/github/stats` | public | ISR 1h; serves stale on upstream failure |
| POST | `/api/playground/share` | public (P2) | Returns a short id for a shared sketch |
| GET | `/admin/inquiries` | admin (P2) | Server-rendered; no public API |

Uniform error envelope: `{ ok: false, error: { code, message, fields? } }`.
`code` is a stable machine string; `message` is user-facing and localized.

---

## 8. Performance Contract

Not aspirations — **CI-enforced budgets** (this is what Phase 1.5 sets up).

| Metric | Budget | Enforced by |
|---|---|---|
| **App code, landing route** | **≤ 20KB gzip** | bundle-analyzer check in CI |
| **App code, docs route** | **≤ 15KB gzip** | CI |
| **Framework baseline** (React 19 + Next runtime) | **~102KB gzip — tracked, not budgeted** | CI regression alert on framework upgrades |
| Total first load, landing | ≤ 125KB gzip | CI |
| Playground chunk (lazy) | ≤ 60KB gzip | CI |
| Three.js on any first load | **0 bytes** | CI import check |
| i18n messages shipped per route | ≤ 8KB | CI catalog-size check (§6.4) |
| LCP, Moto G4 / 4G | < 1.8s | Lighthouse CI |
| INP | < 200ms | Lighthouse CI |
| CLS | < 0.05 | Lighthouse CI |
| Long tasks | none > 50ms | Playwright trace |
| Simulator | 60fps sustained on mid-range Android | manual device gate, Phase 5 |

> **Revised in Phase 3 after measurement.** The original "≤ 90KB first-load JS"
> was set in Phase 1 without measuring the framework floor, and it is not
> reachable: Next 15 + React 19 cost ~102KB gzip before a single line of our
> code. Measured on the first build of the landing route, our own code —
> including the entire display engine — is **3.4KB gzip**.
>
> The fix is the metric, not the implementation. "App code beyond the framework
> baseline" is the number we actually control and can regress; total first load
> is tracked as a ceiling. The Lighthouse ≥95 mobile goal is unaffected — it is
> governed by LCP and INP, not by a fixed byte count, and comparable sites ship
> considerably more.
>
> This does confirm that Astro would win outright on raw bytes. The Phase 1
> tradeoff still holds (playground, multi-step form state, future portal, one
> runtime), but the rejection was argued partly on numbers that had not been
> measured, and that is now on the record.

**Animation rules (binding on Phases 3 and 5):**

- `transform` and `opacity` only. Animating `width`, `height`, `top`, `left`,
  `margin`, or `box-shadow` is a build-review rejection.
- Every animated element declares `will-change` only while animating, never
  permanently.
- All motion respects `prefers-reduced-motion` at the token level, not per
  component.

**Capability tiering** (`MotionTier` — decided once at first paint, exposed as a
CSS var and a data attribute on `<html>`):

| Tier | Detected by | Behavior |
|---|---|---|
| `full` | desktop, `deviceMemory ≥ 8`, `hardwareConcurrency ≥ 8` | all motion; 3D allowed |
| `reduced` | mobile / coarse pointer / mid-range | canvas + CSS motion, no 3D, capped particle counts |
| `static` | `prefers-reduced-motion`, save-data, or a slow first-frame probe | crossfades only; simulator renders a single frame |

---

---

## 8a. Phase 1.5 — what actually shipped (retrofitted)

Phase 1.5 was listed as the highest-leverage correction in §2 (C2) and then
skipped: Phases 2–4 ran without any gate. This section records what was put in
afterwards and what the delay cost.

### Gates now enforced

| Gate | Script | What it catches |
|---|---|---|
| Types | `pnpm typecheck` | — |
| Contrast + sRGB gamut | `packages/design-tokens/contrast-check.py` | WCAG AA failures and OKLCH colours outside sRGB |
| First-load JS budget | `scripts/check-bundle.mjs` | per-route regressions against §8 |
| Sitemap / canonical parity | `scripts/check-routes.mjs` | pages missing from the sitemap, sitemap URLs that 404, pages with a missing or wrong canonical |

All of them run in `.github/workflows/ci.yml` on every push and pull request,
and in one command locally with `pnpm verify`.

The budget gate reads `.next/app-build-manifest.json` and gzips the emitted
chunks itself. Parsing the `next build` log would have been shorter, but that
table is human-facing output whose format changes between releases, and a gate
that quietly stops matching is worse than no gate at all. It refuses to run
against a development build for the same reason.

Both gates were negative-tested — a URL was removed from the built sitemap and
a bogus one added, and the gate failed with both diagnoses — because a gate
that has never failed has not been shown to work.

### First measurement, all routes

Framework baseline: **100.0 KB gzip**, shared by every route. App code beyond
it:

| Route | App KB | Budget |
|---|---|---|
| `/[locale]/contact` | 65.1 | 70 |
| `/[locale]` | 12.1 | 20 |
| `/[locale]/industries`, `/[locale]/work` | 10.3 | 20 |
| `/[locale]/rnd` | 7.8 | 20 |
| everything else | 4.6 – 5.3 | 20 |

The contact route is the outlier by a factor of five. It carries the multi-step
form and its zod schema, which is shared with the API route and therefore
bundled for the client. It is given its own ceiling of 70 KB rather than an
exemption, so it can still regress into a failure — but 65 KB of client-side
validation is a real cost, and moving it behind a dynamic import, or validating
on the server only, is the obvious Phase 7 optimisation.

**This is what the delay cost.** Had the gate existed at Phase 3, that number
would have been visible on the commit that introduced it, when the fix was one
import away.

### Two defects the SEO work surfaced

**The locale middleware ran on `/` and nowhere else.** The matcher escaped its
dot as backslash-dot inside a single-quoted JavaScript string — where the
escape is swallowed by the string literal before the matcher ever sees it. The
pattern degraded to one that matches any path of at least one character, and
since it sits inside a negative lookahead, every such path was excluded.
Consequences: `/services` and every other prefix-less deep link returned 404
instead of redirecting to `/uz/services`, and the language cookie was never
written, so a returning visitor's chosen language was never remembered. The dot
is now written as the character class `[.]`, which a string literal cannot
defuse.

**Every page in a locale declared the same canonical URL.** `alternates` was
set on the locale layout, and metadata is inherited, so all eighteen Uzbek
pages told search engines their canonical URL was `/uz` — an instruction to
drop all but the home page. The layout no longer declares `alternates` at all;
each page calls `pageMetadata()` from `apps/web/lib/seo.ts`, and the parity
gate now fails the build if a page forgets.

A third, smaller one: the `opengraph-image.tsx` file convention did not
propagate from the `[locale]` segment to nested routes, so every service and
case-study page shipped without an `og:image` while the home page had one. The
image is now named explicitly in `pageMetadata()` instead of relying on
inheritance.

### Still open in 1.5

- **No linter.** There is no ESLint config in the repo, and `next lint` without
  one prompts interactively, which would hang CI. Left out rather than faked.
- **No Lighthouse CI.** The LCP / INP / CLS budgets in §8 are still unenforced.
- **Not in git.** The workflow file exists but no repository has been
  initialised, so nothing runs yet.

## 9. Security Model

No user accounts in v1 (A4), so the surface is narrow — which means there is no
excuse for getting it wrong.

- **Input:** zod on the server for every route handler. Client validation is UX.
- **Abuse:** Turnstile + honeypot + IP/email rate limits + `Origin` check.
- **Sandbox:** user playground code runs in a Worker with no DOM, no `fetch`, no
  cross-origin `postMessage`, and a hard time budget. Worker code is never
  `eval`'d on the main thread.
- **Headers:** nonce-based CSP via middleware (no `unsafe-inline`), HSTS,
  `X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`,
  `Permissions-Policy` denying camera/mic/geolocation.
- **PII:** IPs are stored hashed with a server-side pepper. No PII in logs or
  analytics. Attachment uploads are type- and size-capped and stored out of the
  web root.
- **Secrets:** validated at boot via a zod `env.ts` — the build fails on a
  missing variable rather than failing at 3am in production.

---

## 10. Delivery

- **Environments:** local → preview (per PR) → production.
- **CI (Phase 1.5):** typecheck → lint → unit → **display parity gate (§5.4)** →
  build → bundle budget → Lighthouse CI → Playwright e2e.
- **Migrations:** Drizzle Kit, forward-only, reviewed in PR, applied before deploy.
- **Observability:** Vercel Analytics + Sentry. A failed inquiry write pages
  someone — a lost lead is the only true production incident this site can have.
- **Rollback:** instant deploy rollback; DB migrations must be additive so that a
  rollback never requires a down-migration.

---

## 11. Folder Structure

```
wlans-web/
├─ apps/web/                        # Next.js 15 (App Router)
│  ├─ app/
│  │  ├─ [locale]/
│  │  │  ├─ (marketing)/
│  │  │  │  ├─ page.tsx             # hero + visual storyline
│  │  │  │  ├─ services/
│  │  │  │  ├─ work/[slug]/         # showcases
│  │  │  │  └─ about/
│  │  │  ├─ (framework)/display/
│  │  │  │  ├─ page.tsx             # OSS hub
│  │  │  │  ├─ playground/
│  │  │  │  ├─ docs/[[...slug]]/
│  │  │  │  └─ changelog/
│  │  │  └─ inquiry/
│  │  ├─ api/{inquiry,health,github}/route.ts
│  │  ├─ sitemap.ts · robots.ts · opengraph-image.tsx
│  │  └─ layout.tsx
│  ├─ components/
│  │  ├─ ui/                        # primitives (button, field, dialog)
│  │  ├─ marketing/                 # hero, capability diagram, showcase card
│  │  ├─ framework/                 # code block, install tabs, api table
│  │  └─ motion/                    # Reveal, Stagger, MotionTier
│  ├─ features/
│  │  ├─ inquiry/                   # schema.ts (SHARED with the API), steps, actions
│  │  ├─ playground/                # editor, panel, worker client, examples
│  │  └─ showcase/
│  ├─ lib/  db/ · seo/ · github/ · motion/ · i18n/ · analytics/ · env.ts
│  ├─ messages/                     # per-route-segment catalogs, NOT one blob
│  │  └─ {uz,en,ru}/common.json · marketing.json · display.json · inquiry.json
│  ├─ middleware.ts                 # locale resolution + nonce CSP
│  └─ styles/
├─ packages/
│  ├─ display-core/                 # pure TS engine — ZERO DOM (lint-enforced)
│  ├─ display-sim/                  # driver timing model + canvas presenter
│  ├─ design-tokens/                # colors, type scale, spacing, motion
│  └─ config/                       # eslint / ts / tailwind presets
├─ content/
│  ├─ {uz,en,ru}/                   # locale is the top level, not a suffix
│  │  ├─ services/*.mdx · work/*.mdx · docs/display/*.mdx
│  │  └─ (frontmatter: locale · translationOf · status)
│  └─ examples/*.ts                 # locale-neutral: playground scenes,
│                                   # parity-tested against the C++ core
├─ engine-parity/                   # C++ host build + golden PNG corpus (§5.4)
├─ db/  schema.ts · migrations/
├─ e2e/ · tooling/lighthouse/
└─ docs/  00-architecture.md · adr/
```

**Why a monorepo:** `display-core` must be independently testable, publishable to
npm, and *mechanically prevented* from importing DOM APIs. A workspace boundary
enforces that; a folder does not.
*Simpler fallback if the tooling cost is unwanted:* a single app with
`src/lib/display-core` plus an ESLint `no-restricted-imports` boundary rule —
same discipline, weaker enforcement.

---

## 12. Risks & Tradeoffs

| # | Risk | Severity | Mitigation |
|---|---|---|---|
| R1 | **Simulator diverges from real hardware** — brand-fatal for an engineering company | High | Pixel-parity CI gate (§5.4) from commit one |
| R2 | Playground weight breaks the mobile budget | High | Worker + Canvas2D; lazy chunk; hard CI budget |
| R3 | Three.js creeps back into the landing route | Medium | CI import check fails the build |
| R4 | MDX content model outgrows git | Low | Only if non-engineers start editing; revisit at ~50 pages |
| R5 | "Apple-grade" is subjective → endless Phase 2 | Medium | Phase 2 must exit with committed tokens, not mockups |
| R6 | Monorepo tooling friction slows a small team | Low | pnpm workspaces only; no Turborepo until build times justify it |
| R7 | Inquiry notification silently fails | Medium | DB write is the source of truth; dual-channel notify; alert on write failure |
| R8 | **Trilingual docs debt** — `ru`/`uz` translations rot behind `en`, site looks abandoned | High | Fallback + `status` frontmatter makes partial translation a supported state; `noindex` on fallback pages prevents SEO damage; translation completeness is a rollout dimension, not a launch gate (§6.4) |
| R9 | Trilingual message catalogs blow the JS budget | Medium | Per-route-segment splitting; 8KB/route CI assertion |

---

## 13. Roadmap

**P1 — must exist to launch**

- Marketing routes + design system + motion tiers
- Display hub, docs, **playground with a working simulator**
- Inquiry form → API → Postgres → notifications
- **Trilingual routing, fallback, and hreflang infrastructure** (content
  completeness per the §6.4 table — infrastructure is P1, full translation is not)
- CI with performance and parity gates; production deploy; SEO baseline

**P2 — shortly after launch**

- `/admin/inquiries` (single admin role, server-rendered)
- Playground sketch sharing (short URLs)
- WASM (Tier-3) execution path for real C++ parity
- `uz` + `ru` docs completion; docs versioning
- n8n automation on inquiry events

**P3 — improvements**

- Three.js device exploded view (budget-gated)
- Playground → downloadable Arduino sketch export
- Community example gallery
- Per-example hardware cost benchmarks published as a comparison table
