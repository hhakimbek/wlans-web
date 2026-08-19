import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowRight, Rocket, ShieldCheck, Users } from 'lucide-react'

import { ButtonLink } from '@/components/ui/button'
import { VideoModal } from '@/components/ui/video-modal'
import { AppScreen } from '@/components/marketing/app-screen'
import { Phone } from '@/components/marketing/phone'
import { Notice } from '@/components/marketing/notice'
import { WorkGallery } from '@/components/marketing/work-gallery'
import {
  Faq,
  Industries,
  Process,
  ProofStrip,
  SectionHead,
  Services,
  TechStack,
} from '@/components/marketing/sections'
import { TestimonialRail } from '@/components/marketing/testimonial-rail'
import { getSite } from '@/content'
import { isLocale, localePath } from '@/i18n'
import { pageMetadata } from '@/lib/seo'

const TRUST_ICONS = [Rocket, Users, ShieldCheck]

type Params = { params: Promise<{ locale: string }> }

/* The home page had no metadata of its own, so it inherited the layout's —
   which is how every page in a locale ended up claiming the same canonical
   URL. The title is the site default from the layout template, so only the
   description and the alternates are set here. */
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const { company, hero } = getSite(locale)
  return pageMetadata({
    locale,
    path: '/',
    title: company.name + ' — ' + company.tagline,
    description: hero.lede,
    siteName: company.name,
    titleAbsolute: true,
  })
}


export default async function HomePage({ params }: Params) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const site = getSite(locale)
  const { hero, rnd, showreel, ui } = site
  const t = ui.home
  const path = (href: string) => localePath(locale, href)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="section section--hero hero-wrap">
        <div className="container hero">
          <div className="hero__copy">
            <h1 className="hero__title">
              {hero.titleLead} <span className="grad-text">{hero.titleAccent}</span>
            </h1>

            <p className="hero__lede">{hero.lede}</p>

            <div className="hero__actions">
              <ButtonLink href={path(hero.primaryCta.href)} variant="primary" className="btn--lg">
                {hero.primaryCta.label}
                <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
              </ButtonLink>
              <VideoModal
                youtubeId={showreel.youtubeId}
                title={showreel.title}
                caption={showreel.caption}
              />
            </div>

            <ul className="hero__trust">
              {hero.trust.map((item, i) => {
                const Icon = TRUST_ICONS[i] ?? Rocket
                return (
                  <li key={item} className="hero__trust-item">
                    <Icon size={17} strokeWidth={2.2} aria-hidden="true" />
                    {item}
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="hero__devices" aria-hidden="true">
            <Phone hue={263} variant="list" />
            <Phone hue={200} variant="dash" />
            <Phone hue={150} variant="map" />
          </div>
        </div>
      </section>

      {/* ── Proof ────────────────────────────────────────────────────────── */}
      <section className="section section--tight">
        <div className="container">
          <ProofStrip locale={locale} />
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <section className="section band" id="services">
        <div className="container">
          <SectionHead
            center
            eyebrow={t.servicesEyebrow}
            title={t.servicesTitle}
            accent={t.servicesAccent}
            lede={t.servicesLede}
          />
          <Services locale={locale} />
          <div className="section__cta">
            <ButtonLink href={path('/services')} variant="secondary">
              {ui.allServices}
              <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ── Work ─────────────────────────────────────────────────────────── */}
      <section className="section" id="work">
        <div className="container">
          <SectionHead
            eyebrow={t.workEyebrow}
            title={t.workTitle}
            accent={t.workAccent}
            lede={t.workLede}
          />
          <Notice>
            {ui.notices.placeholderProjects} <code>apps/web/content/locales/</code>.
          </Notice>
          <WorkGallery
            locale={locale}
            projects={site.work}
            categories={site.workCategories}
            ui={ui.gallery}
          />
          <div className="section__cta">
            <ButtonLink href={path('/work')} variant="secondary">
              {ui.allProjects}
              <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ── Industries ───────────────────────────────────────────────────── */}
      <section className="section band band--blue" id="industries">
        <div className="container">
          <SectionHead
            center
            eyebrow={t.industriesEyebrow}
            title={t.industriesTitle}
            accent={t.industriesAccent}
            lede={t.industriesLede}
          />
          <Industries locale={locale} />
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────────────── */}
      <section className="section" id="process">
        <div className="container">
          <SectionHead
            eyebrow={t.processEyebrow}
            title={t.processTitle}
            accent={t.processAccent}
            lede={t.processLede}
          />
          <Process locale={locale} />
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      {/* The rail is a sibling of the container, not a child: its inset is then
          a percentage of the real layout width, and lines up with the heading
          exactly. Measured against 100vw it was off by the scrollbar. */}
      <section className="section band section--bleed" id="clients">
        <div className="container">
          <SectionHead
            center
            eyebrow={t.clientsEyebrow}
            title={t.clientsTitle}
            accent={t.clientsAccent}
          />
          <Notice>{ui.notices.placeholderQuotes}</Notice>
        </div>
        <TestimonialRail testimonials={site.testimonials} ui={ui.rail} />
      </section>

      {/* ── Stack ────────────────────────────────────────────────────────── */}
      <section className="section" id="stack">
        <div className="container stack-layout">
          <div>
            <SectionHead
              eyebrow={t.stackEyebrow}
              title={t.stackTitle}
              accent={t.stackAccent}
              lede={t.stackLede}
            />
            <TechStack locale={locale} />
          </div>
          <div className="stack-visual" aria-hidden="true">
            <div className="stack-visual__screen">
              <AppScreen hue={263} variant="dash" />
            </div>
          </div>
        </div>
      </section>

      {/* ── R&D ──────────────────────────────────────────────────────────── */}
      <section className="section band" id="rnd">
        <div className="container">
          <SectionHead eyebrow={rnd.eyebrow} title={rnd.title} lede={rnd.body} />
          <div className="section__cta section__cta--start">
            <ButtonLink href={path(rnd.cta.href)} variant="secondary">
              {rnd.cta.label}
              <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="section" id="faq">
        <div className="container container--narrow">
          <SectionHead center eyebrow={t.faqEyebrow} title={t.faqTitle} accent={t.faqAccent} />
          <Faq locale={locale} />
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="cta-band">
            <span className="cta-band__glyph" aria-hidden="true" />
            <h2 className="cta-band__title">{t.ctaTitle}</h2>
            <p className="cta-band__lede">{t.ctaLede}</p>
            <div className="cta-band__actions">
              <ButtonLink href={path('/contact')} variant="primary" className="btn--lg">
                {ui.orderProject}
                <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href={path('/work')} variant="secondary" className="btn--lg">
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
