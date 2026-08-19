import type { UiStrings } from './types'

/* ─────────────────────────────────────────────────────────────────────────
   The translatable half of the content.

   Every locale file exports one of these. Typing all three against the same
   interface is what stops a translation drifting out of shape — a missing
   paragraph is a build error, not a blank space on a live page.

   Keys are stable identifiers, never English text: renaming a heading must
   not silently orphan two translations.
   ───────────────────────────────────────────────────────────────────────── */

export interface WorkCopy {
  client: string
  industry: string
  summary: string
  result: string
  voice?: { name: string; role: string; quote: string }
  challenge: string[]
  approach: { title: string; body: string }[]
  outcomes: { value: string; label: string }[]
  facts: { timeline: string; team: string; platforms: string }
}

export interface ServiceDefCopy {
  title: string
  /** One or two words. Used where a full title cannot fit — the mobile fan. */
  shortTitle: string
  heading: string
  headingAccent?: string
  summary: string
  points: string[]
  lede: string
  stats: { value: string; label: string }[]
  techIntro: string
  tech: Record<string, { name: string; body: string }>
  caseStudy: { client: string; badge: string; body: string[] }
}

export interface Dictionary {
  company: {
    tagline: string
    address: string
    workingHours: string
    responseTime: string
  }
  showreel: { title: string; caption: string }
  hero: {
    titleLead: string
    titleAccent: string
    lede: string
    primaryCta: string
    secondaryCta: string
    trust: string[]
  }
  proof: { value: string; label: string }[]
  industries: Record<string, { title: string; body: string }>
  work: Record<string, WorkCopy>
  workCategories: Record<string, string>
  process: { title: string; body: string; duration: string }[]
  stackGroups: Record<string, string>
  testimonials: { quote: string; name: string; role: string }[]
  faq: { q: string; a: string }[]
  about: {
    title: string
    lede: string
    story: string[]
    values: { title: string; body: string }[]
  }
  offices: { city: string; country: string; address: string; note: string }[]
  projectTypes: string[]
  budgetRanges: string[]
  timelines: string[]
  rnd: { eyebrow: string; title: string; body: string; ctaLabel: string }
  nav: Record<string, string>
  serviceDefs: Record<string, ServiceDefCopy>
  serviceGroups: Record<string, string>
  ui: UiStrings
}
