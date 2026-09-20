'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Star } from 'lucide-react'
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

import { AppScreen } from './app-screen'
import { AppleMark, GooglePlayMark } from './brand-icons'
import { Device } from './device'
import { ServiceIcon } from './service-icon'
import type { GalleryStrings, Project, ScreenStrings, ScreenVariant } from '@/content/types'
import { localePath, type Locale } from '@/i18n'

/**
 * Filterable project gallery.
 *
 * The card is the site's signature block, and it is laid out the way a buyer
 * actually reads a portfolio: the facts on paper on the left, the product
 * standing on the right. Category, name, what was hard, how it is rated in
 * the stores, what measurably changed — five facts, in the order they get
 * scanned, with the hardware carrying the proof.
 *
 * What changed, and why: the previous card gave the top two thirds of itself
 * to a photograph with one small phone parked in it. The photograph is still
 * here — it is the honest thing to show, because a screenshot of a client's
 * product would be a fabricated credential — but it is now a backdrop that
 * dissolves into the paper rather than a picture the card is built around.
 * That bought back the vertical space the store ratings and the result line
 * needed, and it is why two devices now fit where one used to.
 *
 * The lead project carries ITS OWN hue as the card ground. That is the page's
 * whole thesis stated once per view: the site is the frame, the work is the
 * colour. Filter to Retail and the lead card turns warm — the colour is the
 * project's, not the brand's.
 *
 * Motion, in three places and nowhere else:
 *   · arrival — cards animate in on first paint with a capped stagger. Pure
 *     CSS, so it never waits for hydration and never flashes.
 *   · filter — the grid is keyed on the active filter, so switching remounts
 *     the list and replays that same arrival. One mechanism, two moments.
 *   · hover — the card lifts, the two devices separate at different rates,
 *     and the case-study cue fills. Transform and opacity only, fine pointer
 *     only, every duration from the motion tokens.
 *
 * The filter itself is still marked by ONE indicator sliding between chips
 * rather than by each chip toggling its own background — that is what makes
 * the selection read as a single object moving. It animates with `translateX`
 * and `scaleX` only; `left`/`width` would relayout every frame.
 */
export function WorkGallery({
  locale,
  projects,
  categories,
  ui,
  screens,
  limit,
  showFilters = true,
}: {
  locale: Locale
  projects: Project[]
  categories: { label: string; icon: string }[]
  ui: GalleryStrings
  screens: ScreenStrings
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
                <ServiceIcon name={category.icon} size={14} />
                {category.label}
              </button>
            )
          })}
        </div>
      ) : null}

      {/* Keyed on the filter: switching category remounts the list, which
          replays the CSS arrival on every surviving card. A filter that
          swaps its results with no motion reads as a page reload. */}
      <div className="tiles" key={active}>
        {items.map((project, index) => (
          <ProjectTile
            key={project.slug}
            project={project}
            lead={index === 0}
            index={index}
            locale={locale}
            categories={categories}
            ui={ui}
            screens={screens}
          />
        ))}
      </div>

      {items.length === 0 ? <p className="empty-state">{ui.emptyCategory}</p> : null}
    </>
  )
}

function ProjectTile({
  project,
  lead,
  index,
  locale,
  categories,
  ui,
  screens,
}: {
  project: Project
  /** The first card runs full width, carries the project's hue, and quotes. */
  lead: boolean
  /** Drives the arrival stagger. Capped, so item 12 is not a second late. */
  index: number
  locale: Locale
  categories: { label: string; icon: string }[]
  ui: GalleryStrings
  screens: ScreenStrings
}) {
  const stores = project.stores

  return (
    <article
      className="tile"
      data-lead={lead}
      data-placeholder={project.placeholder}
      style={{
        ['--card-hue' as string]: String(project.hue),
        ['--i' as string]: String(Math.min(index, 5)),
      }}
    >
      {/* The backdrop, not the subject: it fades in from the left rather than
          meeting the paper at a seam, so the devices read as standing in the
          card instead of next to a photograph. */}
      <div className="tile__stage" aria-hidden="true">
        <span className="tile__photo">
          <Image
            src={project.photo}
            alt=""
            fill
            sizes={lead ? '(max-width: 899px) 100vw, 560px' : '(max-width: 899px) 100vw, 300px'}
            priority={lead}
          />
        </span>

        {/* Two screens, never the same one twice: a map beside a wallet reads
            as a portfolio, the same screen printed twice reads as a mistake. */}
        <span className="tile__cluster">
          <Device className="tile__device tile__device--back">
            <AppScreen
              variant={pairScreen(project.screen)}
              hue={project.hue}
              photos={project.shots}
              s={screens}
            />
          </Device>
          <Device className="tile__device tile__device--front">
            <AppScreen
              variant={project.screen}
              hue={project.hue}
              photos={project.shots}
              s={screens}
            />
          </Device>
        </span>
      </div>

      <div className="tile__body">
        <p className="tile__tag">
          <ServiceIcon name={categoryIcon(categories, project.category)} size={13} />
          {project.industry}
        </p>

        {/* The link is on the name, and its ::after covers the card. The whole
            card is still one click target, but the link is announced as the
            project name rather than as the entire card read aloud. */}
        <h3 className="tile__client">
          <Link href={localePath(locale, '/work/' + project.slug)} className="tile__link">
            {project.client}
          </Link>
        </h3>

        <p className="tile__summary">{project.summary}</p>

        {stores ? (
          <ul className="tile__stores">
            {stores.ios ? (
              <StoreBadge mark={<AppleMark size={14} />} name={ui.appStore} rating={stores.ios} />
            ) : null}
            {stores.android ? (
              <StoreBadge
                mark={<GooglePlayMark size={14} />}
                name={ui.googlePlay}
                rating={stores.android}
              />
            ) : null}
          </ul>
        ) : null}

        <div className="tile__foot">
          <p className="tile__result">{project.result}</p>
          {/* Decorative: the card already has a link with an accessible name,
              so announcing the same destination twice is noise. */}
          <span className="tile__go" aria-hidden="true">
            {ui.caseStudyBadge}
            <ArrowUpRight size={15} strokeWidth={2.6} />
          </span>
        </div>

        {lead && project.voice ? (
          <figure className="tile__voice">
            <blockquote>{project.voice.quote}</blockquote>
            <figcaption>
              {project.voice.name} · {project.voice.role}
            </figcaption>
          </figure>
        ) : null}
      </div>
    </article>
  )
}

function StoreBadge({
  mark,
  name,
  rating,
}: {
  mark: ReactNode
  name: string
  rating: string
}) {
  return (
    <li className="store-badge">
      <span className="store-badge__mark">{mark}</span>
      <span className="store-badge__text">
        <em>{name}</em>
        <b>
          <Star size={11} strokeWidth={0} aria-hidden="true" />
          {rating}
        </b>
      </span>
    </li>
  )
}

function categoryIcon(categories: { label: string; icon: string }[], category: string): string {
  return categories.find((c) => c.label === category)?.icon ?? 'grid'
}

/* The second device shows a different part of the same product. Deterministic,
   not random: a random pairing would differ between the server render and the
   client one and trip a hydration mismatch. */
function pairScreen(screen: ScreenVariant): ScreenVariant {
  const pairs: Record<ScreenVariant, ScreenVariant> = {
    track: 'finance',
    finance: 'track',
    catalog: 'schedule',
    schedule: 'catalog',
  }
  return pairs[screen]
}
