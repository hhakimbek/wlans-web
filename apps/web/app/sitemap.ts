import type { MetadataRoute } from 'next'

import { SITE_URL, allRoutes, localeUrl, priorityFor } from '@/lib/seo'
import { locales, localeTags, defaultLocale } from '@/i18n'

/**
 * Sitemap for all three languages.
 *
 * Each URL carries the full `xhtml:link` alternate set, which is what tells
 * Google that `/uz/services/mobile`, `/ru/services/mobile` and
 * `/en/services/mobile` are translations of one page rather than three thin
 * duplicates competing with each other.
 *
 * `lastModified` is deliberately omitted. The only value available at build
 * time is "now", and a sitemap where every URL was modified on every deploy is
 * a signal search engines learn to ignore. Better no hint than a false one.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes().flatMap((path) =>
    locales.map((locale) => ({
      url: SITE_URL + localeUrl(locale, path),
      priority: priorityFor(path),
      alternates: {
        languages: {
          ...Object.fromEntries(
            locales.map((l) => [localeTags[l], SITE_URL + localeUrl(l, path)]),
          ),
          'x-default': SITE_URL + localeUrl(defaultLocale, path),
        },
      },
    })),
  )
}
