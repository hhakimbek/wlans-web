'use client'

import dynamic from 'next/dynamic'

/**
 * The R&D panel, loaded after hydration.
 *
 * This is the one thing on the home page that is not a claim: the display
 * engine the team wrote, compiled to TypeScript, running a real frame loop in
 * the visitor's browser and reporting the bytes and milliseconds it actually
 * costs. Everything else on the page is evidence *about* work; this is the
 * work, running.
 *
 * It is code-split for two reasons. It is below the fold, so paying for a
 * canvas simulation in the home page's first-load JS would slow down the part
 * of the page people actually see first — and the home route has a 20KB app
 * budget that this would eat most of. The placeholder reserves the exact
 * height of the real panel, so nothing shifts when it arrives.
 */
const Panel = dynamic(() => import('./rnd-panel').then((m) => m.RndPanel), {
  ssr: false,
  loading: () => (
    <div className="panel-frame" aria-hidden="true">
      <div className="panel-canvas panel-canvas--idle" />
    </div>
  ),
})

export function LivePanel() {
  return <Panel />
}
