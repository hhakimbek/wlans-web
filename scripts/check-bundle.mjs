#!/usr/bin/env node
/**
 * First-load JS budget gate (architecture §8).
 *
 * Reads `.next/app-build-manifest.json` rather than parsing the build log:
 * the log is a human-facing table whose formatting changes between Next
 * releases, and a gate that silently stops matching is worse than no gate.
 *
 * Sizes are gzip, measured on the emitted files, because that is what crosses
 * the wire. Brotli would be closer to reality on Vercel but gzip is the number
 * quoted in the budget table, and comparing like with like matters more than
 * absolute precision here.
 */
import { readFileSync, statSync } from 'node:fs'
import { gzipSync } from 'node:zlib'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const NEXT = join(ROOT, 'apps/web/.next')

/* Budgets in KB gzip, keyed by app-router page key.
   `framework` is tracked, not budgeted: React and Next cost what they cost,
   and a failing gate we cannot act on is one we would learn to ignore. */
const BUDGETS = {
  '/[locale]/page': { app: 20, total: 125 },
  '/[locale]/services/[slug]/page': { app: 20, total: 125 },
  '/[locale]/work/[slug]/page': { app: 20, total: 125 },
  '/[locale]/company/page': { app: 20, total: 125 },
  '/[locale]/services/page': { app: 20, total: 125 },
  '/[locale]/work/page': { app: 20, total: 125 },
  '/[locale]/industries/page': { app: 20, total: 125 },
  '/[locale]/rnd/page': { app: 20, total: 125 },
  /* The contact route carries the multi-step form and its validation schema,
     which the marketing pages do not. It gets its own ceiling instead of an
     exemption, so it can still regress into a failure. */
  '/[locale]/contact/page': { app: 70, total: 175 },
  /* Budgeted too, so a 404 page cannot quietly grow a client bundle. */
  '/_not-found/page': { app: 5, total: 110 },
}

/* A running `next dev` overwrites `.next` with an unhashed development build,
   whose chunks are unminified and several times larger. Measuring that would
   report a wildly failing budget for a perfectly fine production bundle, so
   refuse to guess. */
function requireProductionBuild() {
  const marker = join(NEXT, 'BUILD_ID')
  try {
    statSync(marker)
  } catch {
    console.error('check-bundle: no build found. Run `pnpm build` first.')
    process.exit(1)
  }
  if (readFileSync(marker, 'utf8').trim() === 'development') {
    console.error('check-bundle: .next holds a development build.')
    console.error('A `next dev` server is probably running. Stop it and run `pnpm build`,')
    console.error('or the measured sizes are meaningless.')
    process.exit(1)
  }
}

const gzipCache = new Map()
function gzipKB(file) {
  if (!gzipCache.has(file)) {
    const path = join(NEXT, file)
    try {
      statSync(path)
    } catch {
      console.error(`check-bundle: the manifest names ${file}, which does not exist.`)
      console.error('The build output is stale or came from a different build. Re-run `pnpm build`.')
      process.exit(1)
    }
    gzipCache.set(file, gzipSync(readFileSync(path), { level: 9 }).length / 1024)
  }
  return gzipCache.get(file)
}

requireProductionBuild()

const manifest = JSON.parse(readFileSync(join(NEXT, 'app-build-manifest.json'), 'utf8'))
const pages = manifest.pages

/* Shared chunks are the ones every page loads: that is the framework floor. */
const pageKeys = Object.keys(pages).filter((k) => k.endsWith('/page'))
if (pageKeys.length === 0) {
  console.error('check-bundle: no page entries in the manifest — did the build run?')
  process.exit(1)
}
const shared = pages[pageKeys[0]].filter((f) => pageKeys.every((k) => pages[k].includes(f)))
const frameworkKB = shared.reduce((sum, f) => sum + gzipKB(f), 0)

let failed = 0
const rows = []

for (const key of pageKeys) {
  const files = [...new Set(pages[key])]
  const totalKB = files.reduce((sum, f) => sum + gzipKB(f), 0)
  const appKB = totalKB - frameworkKB
  const budget = BUDGETS[key]

  const over =
    budget && (appKB > budget.app || totalKB > budget.total)
  if (over) failed++

  rows.push({
    key,
    app: appKB,
    total: totalKB,
    budget,
    status: !budget ? 'untracked' : over ? 'FAIL' : 'ok',
  })
}

const fmt = (n) => n.toFixed(1).padStart(6)
console.log(`Framework baseline (shared by every route): ${fmt(frameworkKB)} KB gzip — tracked, not budgeted\n`)
console.log('  app KB   total KB   budget       route')
for (const r of rows.sort((a, b) => b.total - a.total)) {
  const b = r.budget ? `${r.budget.app}/${r.budget.total}`.padEnd(10) : '—'.padEnd(10)
  const mark = r.status === 'FAIL' ? '✗' : r.status === 'untracked' ? '·' : '✓'
  console.log(`${mark} ${fmt(r.app)}   ${fmt(r.total)}   ${b}   ${r.key}`)
}

/* A new route with no budget entry is a warning, not a pass: budgets that are
   only ever added by hand stop covering the site as it grows. */
const untracked = rows.filter((r) => r.status === 'untracked')
if (untracked.length) {
  console.log(`\n${untracked.length} route(s) have no budget entry. Add them to BUDGETS in this file.`)
}

if (failed) {
  console.error(`\n${failed} route(s) over budget.`)
  process.exit(1)
}
console.log('\nAll budgeted routes within budget.')
