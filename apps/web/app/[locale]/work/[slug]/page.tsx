import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, ChevronRight, Quote, Star } from 'lucide-react'

import { ButtonLink } from '@/components/ui/button'
import { AppScreen } from '@/components/marketing/app-screen'
import { AppleMark, GooglePlayMark } from '@/components/marketing/brand-icons'
import { Notice } from '@/components/marketing/notice'
import { SectionHead } from '@/components/marketing/sections'
import { ServiceIcon } from '@/components/marketing/service-icon'
import { TechTag } from '@/components/marketing/tech-tag'
import { getProject, getSite, workSlugs } from '@/content'
import { isLocale, localePath, locales } from '@/i18n'
import { pageMetadata } from '@/lib/seo'

type Params = { params: Promise<{ locale: string; slug: string }> }

/* Six projects in three languages, all static — prerender the lot. */
/* Anything not in `generateStaticParams` is a 404, not a page rendered on
   demand. Without this a retired slug still answered 200 with the
   not-found body — a soft 404, which search engines index as a real
   page (the project list is fixed). */
export const dynamicParams = false

export function generateStaticParams() {
  return locales.flatMap((locale) => workSlugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const project = getProject(locale, slug)
  if (!project) return {}
  const { ui, company } = getSite(locale)
  return pageMetadata({
    locale,
    path: '/work/' + slug,
    title: project.client + ' — ' + ui.gallery.caseStudyBadge,
    description: project.summary,
    siteName: company.name,
  })
}

export default async function CaseStudyPage({ params }: Params) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()

  const project = getProject(locale, slug)
  if (!project) notFound()

  const site = getSite(locale)
  const { ui } = site
  const t = ui.caseStudy
  const path = (href: string) => localePath(locale, href)

  const categoryIcon = (category: string) =>
    site.workCategories.find((c) => c.label === category)?.icon ?? 'grid'

  const related = site.work.filter((item) => item.slug !== project.slug).slice(0, 3)
  const outcomes = project.outcomes ?? [{ value: project.result, label: t.result }]

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section
        className="section section--hero hero-wrap hero-wrap--service"
        style={{ ['--page-hue' as string]: String(project.hue) }}
      >
        <div className="container service-hero">
          <div>
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href={path('/')}>{ui.homeCrumb}</Link>
              <ChevronRight size={14} aria-hidden="true" />
              <Link href={path('/work')}>{ui.portfolioCrumb}</Link>
              <ChevronRight size={14} aria-hidden="true" />
              <span aria-current="page">{project.client}</span>
            </nav>

            <span className="showcase-card__tag">
              <ServiceIcon name={categoryIcon(project.category)} size={14} />
              {project.industry}
            </span>

            <h1 className="service-hero__title">{project.client}</h1>
            <p className="service-hero__lede">{project.summary}</p>

            {project.stores ? (
              <div className="stores case-stores">
                {project.stores.ios ? (
                  <span className="store">
                    <AppleMark size={16} />
                    <span>
                      <em>{ui.gallery.appStore}</em>
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
                      <em>{ui.gallery.googlePlay}</em>
                      <b>
                        <Star size={11} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                        {project.stores.android}
                      </b>
                    </span>
                  </span>
                ) : null}
              </div>
            ) : null}

            <div className="hero__actions">
              <ButtonLink href={path('/contact')} variant="primary" className="btn--lg">
                {t.orderLikeThis}
                <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href={path('/work')} variant="secondary" className="btn--lg">
                {ui.allProjects}
              </ButtonLink>
            </div>
          </div>

          <div className="service-hero__art" aria-hidden="true">
            <span className="service-hero__phone service-hero__phone--left">
              <AppScreen hue={project.hue} variant="list" />
            </span>
            <span className="service-hero__phone service-hero__phone--mid">
              <AppScreen hue={project.hue} variant="dash" />
            </span>
            <span className="service-hero__phone service-hero__phone--right">
              <AppScreen hue={project.hue} variant="map" />
            </span>
          </div>
        </div>
      </section>

      {/* ── Facts ──────────────────────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          {project.placeholder ? (
            <Notice>
              {ui.notices.placeholderProject} <code>apps/web/content/locales/</code>.
            </Notice>
          ) : null}

          <dl className="case-facts">
            {project.facts?.timeline ? (
              <div className="case-fact">
                <dt>{t.timeline}</dt>
                <dd>{project.facts.timeline}</dd>
              </div>
            ) : null}
            {project.facts?.team ? (
              <div className="case-fact">
                <dt>{t.team}</dt>
                <dd>{project.facts.team}</dd>
              </div>
            ) : null}
            {project.facts?.platforms ? (
              <div className="case-fact">
                <dt>{t.platforms}</dt>
                <dd>{project.facts.platforms}</dd>
              </div>
            ) : null}
            <div className="case-fact case-fact--wide">
              <dt>{t.stack}</dt>
              <dd>
                <div className="tags" style={{ marginTop: 0 }}>
                  {project.stack.map((tech) => (
                    <TechTag key={tech} name={tech} />
                  ))}
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── The problem ────────────────────────────────────────────────── */}
      {project.challenge?.length ? (
        <section className="section band">
          <div className="container container--narrow">
            <SectionHead
              eyebrow={t.problemEyebrow}
              title={t.problemTitle}
              accent={t.problemAccent}
            />
            {project.challenge.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="case-prose">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ) : null}

      {/* ── What we chose ──────────────────────────────────────────────── */}
      {project.approach?.length ? (
        <section className="section">
          <div className="container">
            <SectionHead
              eyebrow={t.choiceEyebrow}
              title={t.choiceTitle}
              accent={t.choiceAccent}
            />
            <ol className="case-steps">
              {project.approach.map((step, index) => (
                <li key={step.title} className="case-step">
                  <span className="case-step__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="case-step__title">{step.title}</h3>
                    <p className="case-step__body">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* ── What changed ───────────────────────────────────────────────── */}
      <section className="section band band--blue">
        <div className="container">
          <SectionHead
            center
            eyebrow={t.changedEyebrow}
            title={t.changedTitle}
            accent={t.changedAccent}
          />
          <dl className="big-stats case-outcomes">
            {outcomes.map((outcome) => (
              <div key={outcome.label} className="big-stat">
                <dd className="big-stat__value">{outcome.value}</dd>
                <dt className="big-stat__label">{outcome.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Client voice ───────────────────────────────────────────────── */}
      {project.voice ? (
        <section className="section">
          <div className="container container--narrow">
            <figure className="case-quote" data-placeholder={project.placeholder}>
              <Quote className="testimonial__mark" size={28} aria-hidden="true" />
              <blockquote className="case-quote__text">{project.voice.quote}</blockquote>
              <figcaption className="testimonial__meta">
                <span className="testimonial__avatar" aria-hidden="true">
                  {project.voice.name.charAt(0)}
                </span>
                <span>
                  <span className="testimonial__name">{project.voice.name}</span>
                  <span className="testimonial__role">
                    {project.voice.role} — {project.client}
                  </span>
                </span>
              </figcaption>
            </figure>
          </div>
        </section>
      ) : null}

      {/* ── Related ────────────────────────────────────────────────────── */}
      <section className="section band">
        <div className="container">
          <SectionHead eyebrow={t.moreEyebrow} title={t.moreTitle} accent={t.moreAccent} />
          <div className="grid grid--3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={path('/work/' + item.slug)}
                className="card card--interactive"
              >
                <span className="card__icon" aria-hidden="true">
                  <ServiceIcon name={categoryIcon(item.category)} size={24} />
                </span>
                <h3 className="card__title">{item.client}</h3>
                <p className="card__body">{item.summary}</p>
                <span className="card__more">
                  {ui.readCaseStudy}
                  <ArrowRight size={15} strokeWidth={2.6} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="cta-band">
            <span className="cta-band__glyph" aria-hidden="true" />
            <h2 className="cta-band__title">{t.ctaTitle}</h2>
            <p className="cta-band__lede">{ui.workPage.ctaLede}</p>
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
