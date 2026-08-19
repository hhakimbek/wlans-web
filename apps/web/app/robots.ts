import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/lib/seo'

/**
 * `/api/` is disallowed because nothing under it is a page — the inquiry
 * endpoint only answers POST, so a crawler visiting it collects 405s.
 *
 * Everything else is open. There is no staging-vs-production switch here: a
 * preview deploy that quietly served `Disallow: /` would be one env var away
 * from de-indexing the real site.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: SITE_URL + '/sitemap.xml',
    host: SITE_URL,
  }
}
