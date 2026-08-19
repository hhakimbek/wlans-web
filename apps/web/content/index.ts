import type { Locale } from '@/i18n'

import type { Dictionary } from './dictionary'
import { en } from './locales/en'
import { ru } from './locales/ru'
import { uz } from './locales/uz'
import * as S from './structure'
import type { Project, ServiceDef, SiteContent } from './types'

/* ─────────────────────────────────────────────────────────────────────────
   Structure + words → the shapes components render.

   The zip is by key, never by array index: a translator reordering a block,
   or a developer inserting a service, cannot silently pair the wrong title
   with the wrong slug.
   ───────────────────────────────────────────────────────────────────────── */

const DICTIONARIES: Record<Locale, Dictionary> = { uz, ru, en }

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? uz
}

export function getSite(locale: Locale): SiteContent {
  const d = getDictionary(locale)

  const workCategories = S.workCategoryKeys.map((c) => ({
    label: d.workCategories[c.key],
    icon: c.icon,
  }))

  return {
    company: {
      name: S.contact.name,
      legalName: S.contact.legalName,
      founded: S.contact.founded,
      phone: S.contact.phone,
      email: S.contact.email,
      telegram: S.contact.telegram,
      telegramChannel: S.contact.telegramChannel,
      tagline: d.company.tagline,
      address: d.company.address,
      workingHours: d.company.workingHours,
      responseTime: d.company.responseTime,
    },

    showreel: { youtubeId: S.showreelId, ...d.showreel },

    hero: {
      titleLead: d.hero.titleLead,
      titleAccent: d.hero.titleAccent,
      lede: d.hero.lede,
      primaryCta: { label: d.hero.primaryCta, href: S.heroLinks.primary },
      secondaryCta: { label: d.hero.secondaryCta, href: S.heroLinks.secondary },
      trust: [...d.hero.trust],
    },

    proof: d.proof.map((p) => ({ ...p, placeholder: true })),

    industries: S.industryKeys.map((i) => ({
      slug: i.slug,
      icon: i.icon,
      ...d.industries[i.slug],
    })),

    work: S.workKeys.map((w): Project => {
      const copy = d.work[w.slug]
      return {
        slug: w.slug,
        category: d.workCategories[w.category],
        stack: [...w.stack],
        hue: w.hue,
        stores: { ...w.stores },
        placeholder: w.placeholder,
        client: copy.client,
        industry: copy.industry,
        summary: copy.summary,
        result: copy.result,
        voice: copy.voice,
        challenge: copy.challenge,
        approach: copy.approach,
        outcomes: copy.outcomes,
        facts: copy.facts,
      }
    }),

    workCategories,

    process: d.process,

    stack: Object.fromEntries(
      Object.entries(S.stack).map(([key, items]) => [d.stackGroups[key], items]),
    ),

    testimonials: S.testimonialKeys.map((t, i) => ({
      ...d.testimonials[i],
      rating: t.rating,
      platform: t.platform,
      youtubeId: 'youtubeId' in t ? t.youtubeId : undefined,
      hue: 'hue' in t ? t.hue : undefined,
      placeholder: t.placeholder,
    })),

    faq: d.faq,

    about: {
      ...d.about,
      values: d.about.values.map((v, i) => ({ ...v, icon: S.valueKeys[i] })),
    },

    offices: d.offices,
    projectTypes: d.projectTypes,
    budgetRanges: d.budgetRanges,
    timelines: d.timelines,

    rnd: {
      ...d.rnd,
      cta: { label: d.rnd.ctaLabel, href: S.rndCta },
    },

    nav: S.navKeys.map((n) => ({
      href: n.href,
      label: d.nav[n.key],
      mega: 'mega' in n ? n.mega : undefined,
    })),

    ui: d.ui,
  }
}

export function getServiceDefs(locale: Locale): ServiceDef[] {
  const d = getDictionary(locale)

  return S.serviceDefKeys.map((s): ServiceDef => {
    const copy = d.serviceDefs[s.slug]
    return {
      slug: s.slug,
      icon: s.icon,
      hue: s.hue,
      group: d.serviceGroups[s.group],
      title: copy.title,
      shortTitle: copy.shortTitle,
      heading: copy.heading,
      headingAccent: copy.headingAccent,
      summary: copy.summary,
      points: [...copy.points],
      lede: copy.lede,
      stats: copy.stats,
      techIntro: copy.techIntro,
      technologies: s.tech.map((t) => ({
        name: copy.tech[t.key].name,
        body: copy.tech[t.key].body,
        tools: [...t.tools],
      })),
      caseStudy: {
        client: copy.caseStudy.client,
        badge: copy.caseStudy.badge,
        body: copy.caseStudy.body,
        hue: s.caseHue,
      },
    }
  })
}

export function getService(locale: Locale, slug: string): ServiceDef | undefined {
  return getServiceDefs(locale).find((service) => service.slug === slug)
}

export function getProject(locale: Locale, slug: string): Project | undefined {
  return getSite(locale).work.find((project) => project.slug === slug)
}

/** Slugs are locale-independent, so route generation never needs a dictionary. */
export const serviceSlugs = S.serviceDefKeys.map((s) => s.slug)
export const workSlugs = S.workKeys.map((w) => w.slug)

/** The form and the API must validate against the same list. */
export const budgetRangeCount = en.budgetRanges.length

export type { Dictionary } from './dictionary'
export type * from './types'
