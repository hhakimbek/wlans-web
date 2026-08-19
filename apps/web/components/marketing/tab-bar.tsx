'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, Building2, Home, LayoutGrid, MessageCircle, Sparkles, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { ServiceIcon } from '@/components/marketing/service-icon'
import type { TabStrings, UiStrings } from '@/content/types'
import { localePath, type Locale } from '@/i18n'

/**
 * Bottom tab bar — the primary navigation on a phone.
 *
 * A hamburger hides the whole site behind one tap and gives no sense of where
 * you are; a tab bar keeps the five destinations permanently visible and
 * always shows the current one. That is the single biggest difference between
 * a site that has been shrunk and one that reads as an app.
 *
 * It sits above the home indicator via `env(safe-area-inset-bottom)` and is
 * hidden entirely on pointer devices, where the header nav is better.
 */
const TABS = [
  { key: 'home', href: '/', Icon: Home },
  { key: 'services', href: '/services', Icon: LayoutGrid },
  { key: 'work', href: '/work', Icon: Sparkles },
  { key: 'company', href: '/company', Icon: Building2 },
  { key: 'contact', href: '/contact', Icon: MessageCircle },
] as const

export interface FanService {
  slug: string
  icon: string
  shortTitle: string
  title: string
}

/* Two arcs, laid out on a parabola rather than a circle: a circular fan puts
   its outermost items nearly level with the origin, which wastes the widest
   part of a phone screen. y = lift + curve·(1 − t²) peaks at the centre and
   falls away evenly, so nine items fit across the width without crowding.
   `spread` is a fraction of the bar width; `lift` and `curve` are px. */
const ARCS = [
  /* One arc: five services fit across a phone in a single sweep, which is
     what the shape is for. `0.38`, not `0.40` — at ±40% the outermost 66px
     cell overhangs a 320px screen by a pixel. A second arc is only reached if
     the list grows past five. */
  { count: 5, spread: 0.38, lift: 118, curve: 52 },
  { count: 4, spread: 0.28, lift: 232, curve: 22 },
]

function fanPosition(index: number) {
  let row = 0
  let i = index
  while (row < ARCS.length && i >= ARCS[row].count) {
    i -= ARCS[row].count
    row += 1
  }
  const arc = ARCS[Math.min(row, ARCS.length - 1)]
  const t = arc.count === 1 ? 0 : (i / (arc.count - 1)) * 2 - 1
  // Rounded: raw float arithmetic puts `-28.000000000000004%` in the markup.
  const round = (value: number) => Math.round(value * 100) / 100
  return {
    x: round(t * arc.spread * 100),
    y: round(arc.lift + arc.curve * (1 - t * t)),
    // Items nearest the finger arrive first; the outer ones trail slightly.
    delay: Math.round(Math.abs(t) * 60 + row * 20),
  }
}

export function TabBar({
  locale,
  labels,
  label,
  services,
  ui,
}: {
  locale: Locale
  labels: TabStrings
  label: string
  services: FanService[]
  ui: UiStrings
}) {
  const pathname = usePathname() ?? ''
  const [fan, setFan] = useState(false)
  const root = '/' + locale

  // Any navigation closes the fan, and Escape does too.
  useEffect(() => setFan(false), [pathname])

  useEffect(() => {
    if (!fan) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFan(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [fan])

  const isActive = (href: string) => {
    if (href === '/') return pathname === root || pathname === root + '/'
    // Detail pages count as their section: reading a case study should light
    // up Work, not leave the bar with nothing selected.
    return pathname === root + href || pathname.startsWith(root + href + '/')
  }

  return (
    <>
      <div className="fan" data-open={fan} aria-hidden={!fan}>
        <button
          type="button"
          className="fan__scrim"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => setFan(false)}
        />

        <div className="fan__items">
          {services.map((service, index) => {
            const { x, y, delay } = fanPosition(index)
            return (
              <Link
                key={service.slug}
                href={localePath(locale, '/services/' + service.slug)}
                className="fan__item"
                title={service.title}
                tabIndex={fan ? 0 : -1}
                style={
                  {
                    '--fan-x': x + '%',
                    '--fan-y': y + 'px',
                    '--fan-delay': delay + 'ms',
                  } as React.CSSProperties
                }
              >
                <span className="fan__bubble" aria-hidden="true">
                  <ServiceIcon name={service.icon} size={20} />
                </span>
                <span className="fan__label">{service.shortTitle}</span>
              </Link>
            )
          })}
        </div>

        <Link
          href={localePath(locale, '/services')}
          className="fan__all"
          tabIndex={fan ? 0 : -1}
        >
          {ui.allServices}
          <ArrowRight size={14} strokeWidth={2.6} aria-hidden="true" />
        </Link>
      </div>

      <nav className="tabbar" aria-label={label}>
        {TABS.map(({ key, href, Icon }) => {
          const active = isActive(href)

          /* Services is the one tab that opens rather than navigates: the
             nine detail pages are the thing people actually want, and making
             them tap through an index page first is a wasted screen. The
             destination is still one tap away, at the bottom of the fan. */
          if (key === 'services') {
            return (
              <button
                key={key}
                type="button"
                className="tabbar__item"
                data-active={active || fan}
                aria-expanded={fan}
                aria-label={fan ? ui.closeMenu : labels.services}
                onClick={() => setFan((open) => !open)}
              >
                <span className="tabbar__icon" aria-hidden="true">
                  {fan ? (
                    <X size={21} strokeWidth={2.6} />
                  ) : (
                    <Icon size={21} strokeWidth={active ? 2.6 : 2} />
                  )}
                </span>
                <span className="tabbar__label">{labels.services}</span>
              </button>
            )
          }

          return (
            <Link
              key={key}
              href={localePath(locale, href)}
              className="tabbar__item"
              data-active={active}
              aria-current={active ? 'page' : undefined}
            >
              <span className="tabbar__icon" aria-hidden="true">
                <Icon size={21} strokeWidth={active ? 2.6 : 2} />
              </span>
              <span className="tabbar__label">{labels[key]}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
