import type { Metadata } from 'next'

import { locales, localeTags, defaultLocale, type Locale } from '@/i18n'
import { serviceSlugs, workSlugs } from '@/content'

/**
 * One source of truth for absolute URLs, canonicals and hreflang.
 *
 * Every page must call `pageMetadata()`. Without it a page inherits the
 * layout's `alternates`, which point at the locale root — so all nineteen
 * Uzbek pages would declare `/uz` as their canonical URL and ask Google to
 * drop eighteen of them.
 */

/* ⚠ Set NEXT_PUBLIC_SITE_URL in the deploy environment. The fallback exists so
   `next build` works locally, not because it is authoritative. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wlans.uz'
).replace(/\/$/, '')

/** Every route that exists in every language, without the locale prefix. */
export const STATIC_ROUTES = [
  '/',
  '/services',
  '/work',
  '/industries',
  '/company',
  '/rnd',
  '/contact',
] as const

/** Relative priority, used only by the sitemap. */
const PRIORITY: Record<string, number> = {
  '/': 1,
  '/services': 0.9,
  '/work': 0.9,
  '/contact': 0.8,
  '/company': 0.7,
  '/industries': 0.7,
  '/rnd': 0.5,
}

export function priorityFor(path: string): number {
  if (PRIORITY[path] !== undefined) return PRIORITY[path]
  // Detail pages sit just under their index.
  if (path.startsWith('/services/')) return 0.8
  if (path.startsWith('/work/')) return 0.7
  return 0.5
}

/** Every locale-independent path on the site, index pages and details alike. */
export function allRoutes(): string[] {
  return [
    ...STATIC_ROUTES,
    ...serviceSlugs.map((slug) => '/services/' + slug),
    ...workSlugs.map((slug) => '/work/' + slug),
  ]
}

/** `/uz` for the home page, `/uz/services/mobile` for everything else. */
export function localeUrl(locale: Locale, path: string): string {
  return path === '/' ? '/' + locale : '/' + locale + path
}

/**
 * Canonical + hreflang for one page.
 *
 * `x-default` points at the Uzbek copy: the audience is in Tashkent, so an
 * unmatched language should land on the language most visitors actually read,
 * not on English by convention.
 */
export function alternatesFor(locale: Locale, path: string): Metadata['alternates'] {
  return {
    canonical: localeUrl(locale, path),
    languages: {
      ...Object.fromEntries(locales.map((l) => [localeTags[l], localeUrl(l, path)])),
      'x-default': localeUrl(defaultLocale, path),
    },
  }
}

/**
 * The generated social card for a locale.
 *
 * Declared explicitly rather than relying on the `opengraph-image.tsx` file
 * convention: that image is inherited by pages in its own segment but not by
 * nested routes, so every service and case-study page shipped without an
 * og:image while the home page had one. Naming it here makes the behaviour
 * uniform and visible.
 */
function ogImage(locale: Locale) {
  return {
    url: '/' + locale + '/opengraph-image',
    width: 1200,
    height: 630,
    alt: 'wlans',
  }
}

/**
 * Standard metadata for a page: title, description, canonical, hreflang and
 * the matching Open Graph / Twitter cards.
 *
 * Open Graph is not decoration here — most of the traffic to a Tashkent agency
 * site arrives as a link pasted into Telegram, and Telegram renders og:image
 * and og:title. A page without them shows as a bare URL.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  siteName,
  titleAbsolute,
}: {
  locale: Locale
  path: string
  title: string
  description: string
  siteName: string
  /** Bypasses the layout's `%s — wlans` template. The home page already ends
      in the company name, so the template would repeat it. */
  titleAbsolute?: boolean
}): Metadata {
  const url = localeUrl(locale, path)
  return {
    title: titleAbsolute ? { absolute: title } : title,
    description,
    alternates: alternatesFor(locale, path),
    openGraph: {
      type: 'website',
      url,
      siteName,
      title,
      description,
      locale: localeTags[locale].replace('-', '_'),
      images: [ogImage(locale)],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage(locale).url],
    },
  }
}
