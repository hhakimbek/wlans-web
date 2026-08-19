'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, ChevronLeft, Zap } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'

import { ButtonLink } from '@/components/ui/button'
import { ServiceIcon } from '@/components/marketing/service-icon'
import type { UiStrings } from '@/content/types'
import { localePath, type Locale } from '@/i18n'

import { LocaleSwitcher } from './locale-switcher'

/**
 * Site header with a services mega menu.
 *
 * Opens on hover for pointer users and on click for everyone — a hover-only
 * menu is unreachable by keyboard and unusable on touch. Closing is delayed
 * ~120ms so the diagonal path from trigger to panel does not dismiss it, which
 * is the classic failure of naive hover menus.
 *
 * There is no hamburger: below 900px the bottom tab bar is the navigation,
 * and a second menu on the same screen is one system too many. The nine
 * service pages are reachable from the Services page itself.
 *
 * Content arrives as props rather than through an import: this is a client
 * component, so it cannot read the locale from the route params the way a
 * server component can.
 */
export interface HeaderService {
  slug: string
  icon: string
  title: string
  point: string
  group: string
}

export function Header({
  locale,
  nav,
  company,
  services,
  groups,
  ui,
}: {
  locale: Locale
  nav: { href: string; label: string; mega?: string }[]
  company: { name: string; phone: string }
  services: HeaderService[]
  groups: string[]
  ui: UiStrings
}) {
  const [mega, setMega] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const closeTimer = useRef<number | undefined>(undefined)
  const pathname = usePathname()
  const menuId = useId()

  // Any navigation dismisses the menu, otherwise a panel stays open over the
  // page the user just moved to.
  useEffect(() => {
    setMega(false)
  }, [pathname])

  /* The app bar is flush with the page at rest and grows a hairline once the
     content scrolls under it. Without this the bar and the hero share an edge
     and the bar stops reading as a separate layer. rAF-throttled because a
     scroll handler that runs setState on every event is a jank source. */
  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        setScrolled(window.scrollY > 8)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMega(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const openMega = () => {
    window.clearTimeout(closeTimer.current)
    setMega(true)
  }

  const closeMega = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setMega(false), 120)
  }

  const path = (href: string) => localePath(locale, href)

  /* On a phone a detail page gets a back affordance in the app bar instead of
     the wordmark. It is a real link to the parent section rather than
     `history.back()`, so it behaves the same whether the visitor arrived by
     tapping through or from a shared URL. */
  const segments = (pathname ?? '').split('/').filter(Boolean)
  const parentHref = segments.length > 2 ? '/' + segments.slice(1, 2).join('/') : null

  return (
    <header className="header" data-scrolled={scrolled}>
      <div className="container header__inner">
        {parentHref ? (
          <Link href={path(parentHref)} className="header__back" aria-label={ui.back}>
            <ChevronLeft size={22} strokeWidth={2.6} aria-hidden="true" />
          </Link>
        ) : null}

        <Link href={path('/')} className="header__brand" data-has-back={Boolean(parentHref)}>
          <span className="header__mark" aria-hidden="true">
            <Zap size={17} strokeWidth={2.5} fill="currentColor" />
          </span>
          {company.name}
        </Link>

        <nav className="header__nav" aria-label={ui.mainNav}>
          {nav.map((item) =>
            item.mega ? (
              <div
                key={item.href}
                className="header__mega-wrap"
                onPointerEnter={openMega}
                onPointerLeave={closeMega}
                onFocus={openMega}
                onBlur={closeMega}
              >
                <button
                  type="button"
                  className="header__link header__link--trigger"
                  aria-expanded={mega}
                  aria-controls={menuId}
                  data-open={mega}
                  onClick={() => setMega((open) => !open)}
                >
                  {item.label}
                  <ChevronDown size={15} strokeWidth={2.6} aria-hidden="true" />
                </button>

                <div id={menuId} className="mega" data-open={mega}>
                  <div className="mega__panel">
                    <div className="mega__grid">
                      {groups.map((group) => (
                        <div key={group} className="mega__group">
                          <span className="mega__group-label">{group}</span>
                          {services
                            .filter((service) => service.group === group)
                            .map((service) => (
                              <Link
                                key={service.slug}
                                href={path('/services/' + service.slug)}
                                className="mega__item"
                                tabIndex={mega ? 0 : -1}
                              >
                                <span className="mega__icon" aria-hidden="true">
                                  <ServiceIcon name={service.icon} size={18} />
                                </span>
                                <span>
                                  <strong>{service.title}</strong>
                                  <em>{service.point}</em>
                                </span>
                              </Link>
                            ))}
                        </div>
                      ))}
                    </div>
                    <div className="mega__foot">
                      <span>{ui.notSureWhichOne}</span>
                      <Link
                        href={path('/contact')}
                        className="mega__foot-link"
                        tabIndex={mega ? 0 : -1}
                      >
                        {ui.orderProject} →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link key={item.href} href={path(item.href)} className="header__link">
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="header__actions">
          <a href={'tel:' + company.phone.replace(/\s/g, '')} className="header__phone">
            {company.phone}
          </a>
          <LocaleSwitcher locale={locale} label={ui.language} />
          <ButtonLink href={path('/contact')} variant="primary" className="header__cta">
            {ui.orderProject}
          </ButtonLink>
        </div>
      </div>
    </header>
  )
}
