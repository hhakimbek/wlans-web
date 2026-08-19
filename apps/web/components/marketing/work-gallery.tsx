'use client'

import Link from 'next/link'
import { Star } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'

import { AppleMark, GooglePlayMark } from './brand-icons'
import { AppScreen } from './app-screen'
import { ServiceIcon } from './service-icon'
import type { Project } from '@/content/types'
import type { GalleryStrings } from '@/content/types'
import { localePath, type Locale } from '@/i18n'

/**
 * Filterable project gallery.
 *
 * Two ideas from the reference, both about state being legible:
 *
 * 1. The selected filter is marked by ONE indicator that slides between
 *    chips, not by a background toggling on each chip. That makes the
 *    selection read as a single object moving. It animates with
 *    `translateX` + `scaleX` only — `left`/`width` would relayout every frame.
 *
 * 2. A project card inverts to the brand colour on hover or focus, the phones
 *    lift clear of the card, and the client quote drops out below it. The
 *    quote is always in the DOM (so it is findable and screen-reader
 *    accessible); only its transform and opacity change.
 */

const VARIANTS = ['list', 'dash', 'map'] as const

export function WorkGallery({
  locale,
  projects,
  categories,
  ui,
  limit,
  showFilters = true,
}: {
  locale: Locale
  projects: Project[]
  categories: { label: string; icon: string }[]
  ui: GalleryStrings
  limit?: number
  showFilters?: boolean
}) {
  const [active, setActive] = useState<string>(categories[0].label)
  const listRef = useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = useState<{ x: number; y: number; scale: number } | null>(null)

  // useLayoutEffect: the indicator must be positioned before paint, or the
  // first frame shows it at the far left and it visibly jumps into place.
  useLayoutEffect(() => {
    const list = listRef.current
    if (!list || !showFilters) return

    const place = () => {
      const chip = list.querySelector<HTMLElement>('[data-active="true"]')
      if (!chip) return
      setIndicator({ x: chip.offsetLeft, y: chip.offsetTop, scale: chip.offsetWidth / 100 })
    }

    place()
    // Chips wrap on resize and shift when a webfont swaps in; either would
    // strand the indicator behind the wrong chip.
    const observer = new ResizeObserver(place)
    observer.observe(list)
    return () => observer.disconnect()
  }, [active, showFilters])

  const filtered =
    active === categories[0].label ? projects : projects.filter((p) => p.category === active)
  const items = limit ? filtered.slice(0, limit) : filtered

  return (
    <>
      {showFilters ? (
        <div className="chips" ref={listRef} role="tablist" aria-label={ui.filterProjects}>
          {/* Always rendered, faded in once measured. Mounting it only after
              measurement made it pop into existence on hydration. */}
          <span
            className="chips__indicator"
            aria-hidden="true"
            data-ready={Boolean(indicator)}
            style={
              indicator
                ? {
                    transform: `translate(${indicator.x}px, ${indicator.y}px) scaleX(${indicator.scale})`,
                  }
                : undefined
            }
          />
          {categories.map((category) => {
            const isActive = category.label === active
            return (
              <button
                key={category.label}
                type="button"
                role="tab"
                aria-selected={isActive}
                data-active={isActive}
                className="chip"
                onClick={() => setActive(category.label)}
              >
                <ServiceIcon name={category.icon} size={16} />
                {category.label}
              </button>
            )
          })}
        </div>
      ) : null}

      <div className="showcase">
        {items.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            locale={locale}
            categories={categories}
            ui={ui}
          />
        ))}
      </div>

      {items.length === 0 ? <p className="empty-state">{ui.emptyCategory}</p> : null}
    </>
  )
}

function ProjectCard({
  project,
  index,
  locale,
  categories,
  ui,
}: {
  project: Project
  index: number
  locale: Locale
  categories: { label: string; icon: string }[]
  ui: GalleryStrings
}) {
  // Wrapper, not a bare card: the quote used to sit *on top* of the card and
  // covered the store ratings on hover. It now drops out below the card, so
  // nothing the card shows is ever occluded. Hover state is driven from the
  // wrapper because the quote is a sibling of the card, not a child of it.
  return (
    <div className="showcase-item">
      <Link
        href={localePath(locale, '/work/' + project.slug)}
        className="showcase-card"
        data-placeholder={project.placeholder}
        style={{ ['--card-hue' as string]: String(project.hue) }}
      >
        <div className="showcase-card__body">
          <span className="showcase-card__tag">
            <ServiceIcon name={categoryIcon(categories, project.category)} size={14} />
            {project.industry}
          </span>

          <h3 className="showcase-card__title">
            <span className="showcase-card__mark" aria-hidden="true">
              {project.client.charAt(0)}
            </span>
            {project.client}
          </h3>

          <p className="showcase-card__summary">{project.summary}</p>

          {project.stores ? (
            <div className="stores">
              {project.stores.ios ? (
                <span className="store">
                  <AppleMark size={16} />
                  <span>
                    <em>{ui.appStore}</em>
                    <b>
                      <Star size={11} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                      {project.stores.ios}
                    </b>
                  </span>
                </span>
              ) : null}
              {project.stores.android ? (
                <span className="store">
                  <GooglePlayMark size={16} />
                  <span>
                    <em>{ui.googlePlay}</em>
                    <b>
                      <Star size={11} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                      {project.stores.android}
                    </b>
                  </span>
                </span>
              ) : null}
            </div>
          ) : null}

          <p className="showcase-card__result">{project.result}</p>
        </div>

        <div className="showcase-card__art" aria-hidden="true">
          <span className="showcase-card__phone showcase-card__phone--back">
            <AppScreen hue={project.hue} variant={VARIANTS[(index + 1) % VARIANTS.length]} />
          </span>
          <span className="showcase-card__phone showcase-card__phone--front">
            <AppScreen hue={project.hue} variant={VARIANTS[index % VARIANTS.length]} />
          </span>
        </div>
      </Link>

      {/* The reveal wrapper is the collapsing grid row. The quote cannot
          collapse itself: its padding would still take space. */}
      {project.voice ? (
        <div className="showcase-card__reveal">
          <Link href={localePath(locale, '/work/' + project.slug)} className="showcase-card__voice">
            <span className="showcase-card__avatar" aria-hidden="true">
              {project.voice.name.charAt(0)}
            </span>
            <span className="showcase-card__voice-text">
              <strong>
                {project.voice.name} — {project.voice.role}
              </strong>
              <em>{project.voice.quote}</em>
            </span>
            <span className="showcase-card__case">{ui.caseStudyBadge}</span>
          </Link>
        </div>
      ) : null}
    </div>
  )
}

function categoryIcon(categories: { label: string; icon: string }[], category: string): string {
  return categories.find((c) => c.label === category)?.icon ?? 'grid'
}
