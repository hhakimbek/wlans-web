'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

/**
 * Navigation progress bar.
 *
 * App Router prefetches, so most navigations resolve in a frame and a bar that
 * animated on every one of them would be visual noise. This shows nothing for
 * the first 120ms and only then reveals the bar — a slow route gets feedback,
 * a fast one stays silent.
 *
 * It is driven by intercepting internal link clicks rather than by
 * `useLinkStatus`, because the state is global: one bar for the whole document,
 * regardless of which link started the navigation.
 */
export function RouteProgress() {
  const pathname = usePathname()
  const [state, setState] = useState<'idle' | 'pending' | 'done'>('idle')
  const revealTimer = useRef<number | undefined>(undefined)
  const clearTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // Modified clicks open a new tab; the current document never navigates.
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = (event.target as Element | null)?.closest?.('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || anchor.target === '_blank' || anchor.hasAttribute('download')) return

      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return
      // Same page, or a jump to an anchor on it: nothing loads.
      if (url.pathname === window.location.pathname) return

      window.clearTimeout(revealTimer.current)
      revealTimer.current = window.setTimeout(() => setState('pending'), 120)
    }

    document.addEventListener('click', onClick, { capture: true })
    return () => {
      document.removeEventListener('click', onClick, { capture: true })
      window.clearTimeout(revealTimer.current)
    }
  }, [])

  // The new pathname is the completion signal: the route has rendered.
  useEffect(() => {
    window.clearTimeout(revealTimer.current)
    setState((current) => (current === 'pending' ? 'done' : 'idle'))

    window.clearTimeout(clearTimer.current)
    clearTimer.current = window.setTimeout(() => setState('idle'), 420)
    return () => window.clearTimeout(clearTimer.current)
  }, [pathname])

  if (state === 'idle') return null

  return (
    <div className="route-progress" data-state={state} role="status" aria-live="polite">
      <span className="route-progress__bar" />
      <span className="sr-only">Loading page</span>
    </div>
  )
}
