'use client'

import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { AppScreen } from './app-screen'
import { VideoModal } from '@/components/ui/video-modal'
import type { RailStrings, Testimonial } from '@/content/types'

/**
 * Horizontal testimonial rail.
 *
 * Some clients recorded a video instead of writing, so a card is either a
 * quote or a video thumbnail — the reference mixes both in one row and that
 * mix is what makes it read as real feedback rather than a copy block.
 *
 * Scrolling uses the native scroll container with snap points, so it works
 * with a trackpad, a touch swipe and the arrow buttons alike. The arrows only
 * exist for mouse users who have neither of the other two.
 */
export function TestimonialRail({
  testimonials,
  ui,
}: {
  testimonials: Testimonial[]
  ui: RailStrings
}) {
  const railRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const sync = useCallback(() => {
    const rail = railRef.current
    if (!rail) return
    setAtStart(rail.scrollLeft < 8)
    // 8px of slack: sub-pixel scroll widths otherwise leave "at end" false
    // forever and the right arrow never disables.
    setAtEnd(rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8)
  }, [])

  useEffect(() => {
    sync()
    const rail = railRef.current
    if (!rail) return
    rail.addEventListener('scroll', sync, { passive: true })
    const observer = new ResizeObserver(sync)
    observer.observe(rail)
    return () => {
      rail.removeEventListener('scroll', sync)
      observer.disconnect()
    }
  }, [sync])

  const scrollBy = (direction: 1 | -1) => {
    const rail = railRef.current
    if (!rail) return
    const card = rail.querySelector<HTMLElement>('[data-card]')
    const step = card ? card.offsetWidth + 20 : rail.clientWidth * 0.8
    rail.scrollBy({ left: step * direction, behavior: 'smooth' })
  }

  return (
    <div className="rail-wrap">
      <div className="rail" ref={railRef}>
        {testimonials.map((item, index) =>
          item.youtubeId ? (
            <div className="rail__card rail__card--video" data-card key={`v-${index}`}>
              <VideoModal
                youtubeId={item.youtubeId}
                title={ui.videoReview + ' — ' + item.name}
                variant="thumbnail"
                poster={
                  <span className="video-thumb__art">
                    <AppScreen hue={item.hue ?? 263} variant="list" />
                  </span>
                }
              />
              <p className="rail__video-label">
                {ui.videoReview} — {item.name}, {item.role}
              </p>
            </div>
          ) : (
            <figure className="rail__card card" data-card data-placeholder={item.placeholder} key={`q-${index}`}>
              <Quote className="testimonial__mark" size={24} aria-hidden="true" />
              <blockquote className="testimonial__quote">{item.quote}</blockquote>
              <figcaption className="testimonial__meta">
                <span className="testimonial__avatar" aria-hidden="true">
                  {item.name.charAt(0)}
                </span>
                <span>
                  <span className="testimonial__name">{item.name}</span>
                  <span className="testimonial__role">{item.role}</span>
                </span>
              </figcaption>
              <div className="rail__rating">
                <span className="testimonial__rating" aria-label={item.rating + ' ' + ui.ratingLabel}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < item.rating ? 'currentColor' : 'none'}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  ))}
                </span>
                {item.platform ? <span className="rail__platform">{item.platform}</span> : null}
              </div>
            </figure>
          ),
        )}
      </div>

      <div className="rail__controls">
        <button
          type="button"
          className="rail__btn"
          onClick={() => scrollBy(-1)}
          disabled={atStart}
          aria-label={ui.previous}
        >
          <ArrowLeft size={18} strokeWidth={2.4} />
        </button>
        <button
          type="button"
          className="rail__btn"
          onClick={() => scrollBy(1)}
          disabled={atEnd}
          aria-label={ui.next}
        >
          <ArrowRight size={18} strokeWidth={2.4} />
        </button>
      </div>
    </div>
  )
}
