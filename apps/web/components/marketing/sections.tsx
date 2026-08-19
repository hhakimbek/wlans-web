import type { ComponentType } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Building2,
  Cloud,
  GraduationCap,
  Globe,
  HeartPulse,
  Layers,
  LifeBuoy,
  MessageSquare,
  PackageCheck,
  Palette,
  Server,
  Quote,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  Users,
  Wallet,
} from 'lucide-react'

import { AndroidMark, AppleMark } from './brand-icons'

import { Accordion } from '@/components/ui/accordion'
import { TechTag } from './tech-tag'
import { getServiceDefs, getSite } from '@/content'
import { localePath, type Locale } from '@/i18n'

/* One icon registry for the whole site. Content files name an icon by string,
   so editing copy never means touching a component import. */
/* Not LucideIcon: the platform entries are the real brand marks, which take
   a size but no stroke width. The registry only ever needs `size`. */
const ICONS: Record<string, ComponentType<{ size?: number }>> = {
  apple: AppleMark,
  android: AndroidMark,
  layers: Layers,
  globe: Globe,
  server: Server,
  cloud: Cloud,
  palette: Palette,
  lifebuoy: LifeBuoy,
  wallet: Wallet,
  truck: Truck,
  'shopping-bag': ShoppingBag,
  'heart-pulse': HeartPulse,
  'graduation-cap': GraduationCap,
  'building-2': Building2,
  'message-square': MessageSquare,
  'package-check': PackageCheck,
  users: Users,
  'shield-check': ShieldCheck,
}

function Icon({ name, size = 24 }: { name: string; size?: number }) {
  const Component = ICONS[name] ?? Layers
  return <Component size={size} />
}

export function SectionHead({
  eyebrow,
  title,
  accent,
  lede,
  center,
}: {
  eyebrow?: string
  title: string
  /** Trailing phrase rendered in the brand gradient. */
  accent?: string
  lede?: string
  center?: boolean
}) {
  return (
    <div className={`section__head${center ? ' section__head--center' : ''}`}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="section__title">
        {title}
        {accent ? (
          <>
            {' '}
            <span className="grad-text">{accent}</span>
          </>
        ) : null}
      </h2>
      {lede ? <p className="section__lede">{lede}</p> : null}
    </div>
  )
}

/* Every section takes the locale rather than reading a module-level import:
   these are server components, so the route param is the only source of
   truth about which language is being rendered. */
export function ProofStrip({ locale }: { locale: Locale }) {
  const { proof } = getSite(locale)
  return (
    <dl className="grid grid--4">
      {proof.map((item) => (
        <div key={item.label} className="stat" data-placeholder={item.placeholder}>
          <dd className="stat__value">{item.value}</dd>
          <dt className="stat__label">{item.label}</dt>
        </div>
      ))}
    </dl>
  )
}

/* Cards link to their detail page. The whole card is the target rather than a
   trailing "learn more" link — a 300px card with a 90px hit area is a small
   target for no reason. */
export function Services({ locale, limit }: { locale: Locale; limit?: number }) {
  const defs = getServiceDefs(locale)
  const { ui } = getSite(locale)
  const items = limit ? defs.slice(0, limit) : defs
  /* Three across, not four: with five services a four-column row leaves a
     single orphan card on the second line. */
  return (
    <div className="grid grid--3">
      {items.map((service) => (
        <Link
          key={service.slug}
          href={localePath(locale, '/services/' + service.slug)}
          className="card card--interactive service-card"
        >
          <span className="card__icon" aria-hidden="true">
            <Icon name={service.icon} size={24} />
          </span>
          <h3 className="card__title">{service.title}</h3>
          <p className="card__body">{service.summary}</p>
          <ul className="chip-list">
            {service.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <span className="card__more">
            {ui.learnMore}
            <ArrowRight size={15} strokeWidth={2.6} aria-hidden="true" />
          </span>
        </Link>
      ))}
    </div>
  )
}

export function Industries({ locale }: { locale: Locale }) {
  const { industries } = getSite(locale)
  return (
    <div className="grid grid--3">
      {industries.map((industry) => (
        <article key={industry.slug} className="card card--interactive card--soft">
          <span className="card__icon card__icon--soft" aria-hidden="true">
            <Icon name={industry.icon} size={22} />
          </span>
          <h3 className="card__title">{industry.title}</h3>
          <p className="card__body">{industry.body}</p>
        </article>
      ))}
    </div>
  )
}

export function Process({ locale }: { locale: Locale }) {
  const { process } = getSite(locale)
  return (
    <ol className="process">
      {process.map((step) => (
        <li key={step.title} className="step">
          <span className="step__index" aria-hidden="true" />
          <h3 className="step__title">{step.title}</h3>
          <p className="step__body">{step.body}</p>
          <span className="step__duration">{step.duration}</span>
        </li>
      ))}
    </ol>
  )
}

export function TechStack({ locale }: { locale: Locale }) {
  const { stack } = getSite(locale)
  return (
    <Accordion
      items={Object.entries(stack).map(([group, items]) => ({
        title: group,
        body: (
          <div className="tags" style={{ marginTop: 0 }}>
            {items.map((tech) => (
              <TechTag key={tech} name={tech} />
            ))}
          </div>
        ),
      }))}
    />
  )
}

export function Testimonials({ locale }: { locale: Locale }) {
  const { testimonials, ui } = getSite(locale)
  return (
    <div className="grid grid--4">
      {testimonials.map((item) => (
        <figure key={item.quote} className="card testimonial" data-placeholder={item.placeholder}>
          <Quote className="testimonial__mark" size={26} aria-hidden="true" />
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
          <div className="testimonial__rating" aria-label={item.rating + ' ' + ui.rail.ratingLabel}>
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                size={15}
                fill={i < item.rating ? 'currentColor' : 'none'}
                strokeWidth={2}
                aria-hidden="true"
              />
            ))}
          </div>
        </figure>
      ))}
    </div>
  )
}

export function Faq({ locale }: { locale: Locale }) {
  const { faq } = getSite(locale)
  return <Accordion items={faq.map((item) => ({ title: item.q, body: <p>{item.a}</p> }))} defaultOpen={0} />
}

export function Values({ locale }: { locale: Locale }) {
  const { about } = getSite(locale)
  return (
    <div className="grid grid--4">
      {about.values.map((value) => (
        <article key={value.title} className="card card--soft">
          <span className="card__icon card__icon--soft" aria-hidden="true">
            <Icon name={value.icon} size={22} />
          </span>
          <h3 className="card__title">{value.title}</h3>
          <p className="card__body">{value.body}</p>
        </article>
      ))}
    </div>
  )
}
