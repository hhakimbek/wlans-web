#!/usr/bin/env node
/**
 * Sitemap ↔ prerendered-route parity gate.
 *
 * The sitemap is built from a hand-maintained route list; the pages are built
 * from `generateStaticParams`. Nothing forces the two to agree, so a new page
 * would silently ship un-indexed and a deleted one would leave a 404 in the
 * sitemap. This gate is the thing that forces them to agree.
 *
 * It also checks that every prerendered page declares a canonical URL, which
 * is what actually prevents the three language copies from competing with each
 * other in search results.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const NEXT = join(ROOT, 'apps/web/.next')

const body = readFileSync(join(NEXT, 'server/app/sitemap.xml.body'), 'utf8')
const locs = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
if (locs.length === 0) {
  console.error('check-routes: sitemap has no <loc> entries')
  process.exit(1)
}

/* Derive the origin from the sitemap itself rather than re-importing the app
   config: if the two ever disagree, this gate should notice, not paper over. */
const origin = new URL(locs[0]).origin
const sitemapPaths = new Set(locs.map((u) => new URL(u).pathname))

const prerender = JSON.parse(readFileSync(join(NEXT, 'prerender-manifest.json'), 'utf8'))
/* Metadata routes and the 404 are pages in Next's sense but not pages a search
   engine should be told about. */
const IGNORE = /^\/(_not-found|robots\.txt|sitemap\.xml)$|\/opengraph-image$/
const pagePaths = new Set(Object.keys(prerender.routes).filter((r) => !IGNORE.test(r)))

const missing = [...pagePaths].filter((p) => !sitemapPaths.has(p)).sort()
const stale = [...sitemapPaths].filter((p) => !pagePaths.has(p)).sort()

let failed = false

if (missing.length) {
  failed = true
  console.error(`\n✗ ${missing.length} prerendered page(s) missing from the sitemap:`)
  missing.forEach((p) => console.error('    ' + p))
  console.error('  → add the route to STATIC_ROUTES or allRoutes() in apps/web/lib/seo.ts')
}

if (stale.length) {
  failed = true
  console.error(`\n✗ ${stale.length} sitemap URL(s) that are not prerendered pages:`)
  stale.forEach((p) => console.error('    ' + p))
  console.error('  → remove them from apps/web/lib/seo.ts, they will serve 404')
}

/* Canonical check, on the emitted HTML rather than the source. */
const htmlFor = (route) => join(NEXT, 'server/app', route.replace(/^\//, '') + '.html')
const noCanonical = []
for (const route of [...pagePaths].sort()) {
  let html
  try {
    html = readFileSync(htmlFor(route), 'utf8')
  } catch {
    continue // rendered on demand; nothing static to inspect
  }
  const match = html.match(/<link rel="canonical" href="([^"]+)"/)
  if (!match || match[1] !== origin + route) {
    noCanonical.push(route + (match ? ` (declares ${match[1]})` : ' (none)'))
  }
}

if (noCanonical.length) {
  failed = true
  console.error(`\n✗ ${noCanonical.length} page(s) with a missing or wrong canonical URL:`)
  noCanonical.forEach((p) => console.error('    ' + p))
  console.error('  → the page must call pageMetadata() from apps/web/lib/seo.ts')
}

if (failed) process.exit(1)

console.log(
  `✓ ${pagePaths.size} prerendered pages, all present in the sitemap with a matching canonical URL (origin ${origin}).`,
)
