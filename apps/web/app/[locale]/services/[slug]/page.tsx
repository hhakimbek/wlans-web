import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check, ChevronRight } from 'lucide-react'

import { ButtonLink } from '@/components/ui/button'
import { Accordion } from '@/components/ui/accordion'
import { AppScreen } from '@/components/marketing/app-screen'
import { TechTag } from '@/components/marketing/tech-tag'
import { Notice } from '@/components/marketing/notice'
import { ServiceIcon } from '@/components/marketing/service-icon'
import { Faq, Process, SectionHead } from '@/components/marketing/sections'
import { getService, getServiceDefs, getSite, serviceSlugs } from '@/content'
import { isLocale, localePath, locales } from '@/i18n'
import { pageMetadata } from '@/lib/seo'

type Params = { params: Promise<{ locale: string; slug: string }> }

/* Every service page is prerendered at build time — nine services in three
   languages, all static, so there is no reason to render on demand. */
/* Anything not in `generateStaticParams` is a 404, not a page rendered on
   demand. Without this a retired slug still answered 200 with the
   not-found body — a soft 404, which search engines index as a real
   page (nine service slugs became five). */
export const dynamicParams = false

export function generateStaticParams() {
  return locales.flatMap((locale) => serviceSlugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const service = getService(locale, slug)
  if (!service) return {}
  const { company } = getSite(locale)
  return pageMetadata({
    locale,
    path: '/services/' + slug,
    title: service.title,
    description: service.summary,
    siteName: company.name,
  })
}

export default async function ServiceDetailPage({ params }: Params) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()

  const service = getService(locale, slug)
  if (!service) notFound()

  const site = getSite(locale)
  const { ui } = site
  const t = ui.serviceDetail
  const path = (href: string) => localePath(locale, href)
  const related = getServiceDefs(locale)
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3)

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section
        className="section section--hero hero-wrap hero-wrap--service"
        style={{ ['--page-hue' as string]: String(service.hue) }}
      >
        <div className="container service-hero">
          <div>
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href={path('/')}>{ui.homeCrumb}</Link>
              <ChevronRight size={14} aria-hidden="true" />
              <Link href={path('/services')}>{site.nav[0].label}</Link>
              <ChevronRight size={14} aria-hidden="true" />
              <span aria-current="page">{service.title}</span>
            </nav>

            <h1 className="service-hero__title">
              {service.heading}{' '}
              {service.headingAccent ? (
                <span className="grad-text">{service.headingAccent}</span>
              ) : null}
            </h1>

            <p className="service-hero__lede">{service.lede}</p>

            <ul className="service-hero__points">
              {service.points.map((point) => (
                <li key={point}>
                  <Check size={16} strokeWidth={3} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>

            <div className="hero__actions">
              <ButtonLink href={path('/contact')} variant="primary" className="btn--lg">
                {ui.bookCall}
                <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href={path('/work')} variant="secondary" className="btn--lg">
                {ui.seeRelatedWork}
              </ButtonLink>
            </div>
          </div>

          <div className="service-hero__art" aria-hidden="true">
            <span className="service-hero__phone service-hero__phone--left">
              <AppScreen hue={service.hue} variant="list" />
            </span>
            <span className="service-hero__phone service-hero__phone--mid">
              <AppScreen hue={service.hue} variant="dash" />
            </span>
            <span className="service-hero__phone service-hero__phone--right">
              <AppScreen hue={service.hue} variant="map" />
            </span>
          </div>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container stats-layout">
          <div>
            <h2 className="section__title">
              {t.statsTitleLead} {service.title.toLowerCase()}{' '}
              <span className="grad-text">{t.statsTitleAccent}</span> {t.statsTitleTail}
            </h2>
            <p className="section__lede">{service.summary}</p>
            <Notice>
              {ui.notices.placeholderFigures} <code>apps/web/content/locales/</code>.
            </Notice>
          </div>

          <dl className="big-stats">
            {service.stats.map((stat) => (
              <div key={stat.label} className="big-stat">
                <dd className="big-stat__value">{stat.value}</dd>
                <dt className="big-stat__label">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Technologies ───────────────────────────────────────────────── */}
      <section className="section band">
        <div className="container">
          <SectionHead
            eyebrow={t.techEyebrow}
            title={t.techTitle}
            accent={t.techAccent}
            lede={service.techIntro}
          />
          <Accordion
            items={service.technologies.map((tech) => ({
              title: tech.name,
              body: (
                <div>
                  <p>{tech.body}</p>
                  <div className="tags" style={{ marginTop: 'var(--space-4)' }}>
                    {tech.tools.map((tool) => (
                      <TechTag key={tool} name={tool} />
                    ))}
                  </div>
                </div>
              ),
            }))}
          />
        </div>
      </section>

      {/* ── Case study ─────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionHead
            center
            eyebrow={t.caseEyebrow}
            title={t.caseTitle}
            accent={t.caseAccent}
          />
          <div
            className="case"
            style={{ ['--card-hue' as string]: String(service.caseStudy.hue) }}
          >
            <div className="case__body">
              <h3 className="case__client">{service.caseStudy.client}</h3>
              {service.caseStudy.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="case__p">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="case__art" aria-hidden="true">
              {service.caseStudy.badge ? (
                <span className="case__badge">{service.caseStudy.badge}</span>
              ) : null}
              <span className="case__phone case__phone--back">
                <AppScreen hue={service.caseStudy.hue} variant="dash" />
              </span>
              <span className="case__phone case__phone--front">
                <AppScreen hue={service.caseStudy.hue} variant="list" />
              </span>
            </div>
          </div>
          <div className="section__cta">
            <ButtonLink href={path('/work')} variant="secondary">
              {ui.viewMoreProjects}
              <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ── Process ────────────────────────────────────────────────────── */}
      <section className="section band band--blue">
        <div className="container">
          <SectionHead
            eyebrow={t.processEyebrow}
            title={t.processTitle}
            accent={t.processAccent}
          />
          <Process locale={locale} />
        </div>
      </section>

      {/* ── Related ────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow={t.relatedEyebrow} title={t.relatedTitle} />
          <div className="grid grid--3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={path('/services/' + item.slug)}
                className="card card--interactive"
              >
                <span className="card__icon" aria-hidden="true">
                  <ServiceIcon name={item.icon} size={24} />
                </span>
                <h3 className="card__title">{item.title}</h3>
                <p className="card__body">{item.summary}</p>
                <span className="card__more">
                  {ui.learnMore}
                  <ArrowRight size={15} strokeWidth={2.6} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="section band">
        <div className="container container--narrow">
          <SectionHead center eyebrow={t.faqEyebrow} title={t.faqTitle} accent={t.faqAccent} />
          <Faq locale={locale} />
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="cta-band">
            <span className="cta-band__glyph" aria-hidden="true" />
            <h2 className="cta-band__title">{ui.servicesPage.ctaTitle}</h2>
            <p className="cta-band__lede">{ui.servicesPage.ctaLede}</p>
            <div className="cta-band__actions">
              <ButtonLink href={path('/contact')} variant="primary" className="btn--lg">
                {ui.orderProject}
                <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
