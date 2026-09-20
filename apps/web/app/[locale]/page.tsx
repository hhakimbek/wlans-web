import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

import { ButtonLink } from '@/components/ui/button'
import { VideoModal } from '@/components/ui/video-modal'
import { AppScreen } from '@/components/marketing/app-screen'
import { Device } from '@/components/marketing/device'
import { Notice } from '@/components/marketing/notice'
import { WorkGallery } from '@/components/marketing/work-gallery'
import { ProofStrip, SectionHead, Services } from '@/components/marketing/sections'
import { TestimonialRail } from '@/components/marketing/testimonial-rail'
import { LivePanel } from '@/features/playground/live-panel'
import { getSite } from '@/content'
import { isLocale, localePath } from '@/i18n'
import { pageMetadata } from '@/lib/seo'

type Params = { params: Promise<{ locale: string }> }

/* The home page is an argument, not an index.
 *
 * It used to be every other page concatenated: services, work, industries,
 * process, clients, stack, R&D and the FAQ, each of which also has a page of
 * its own. A visitor who scrolled it had already read the whole site and had
 * no reason to click anything.
 *
 * It now runs claim → proof → work → offer → the lab → voices → act. Four
 * blocks were cut outright and live only on the pages that own them:
 * industries (/industries), the process (/services, /company), the stack
 * (/services) and the FAQ (/services). What replaced them is the one section
 * that exists nowhere else — the live display panel.
 */

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
            <span className="eyebrow">{hero.eyebrow}</span>

            <h1 className="hero__title">
              {hero.titleLead} <span className="accent-text">{hero.titleAccent}</span>
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
              {hero.trust.map((item) => (
                <li key={item} className="hero__trust-item">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* The thesis of the page, stated as an object rather than as a
              sentence: this is what the team makes. Two devices, not a fan of
              three — the headline stays the loudest thing on the screen. */}
          <div className="hero__devices" aria-hidden="true">
            <Device className="hero__device hero__device--back">
              <AppScreen variant="finance" hue={222} s={ui.screens} />
            </Device>
            <Device className="hero__device hero__device--front">
              <AppScreen variant="track" hue={263} s={ui.screens} />
            </Device>
          </div>
        </div>
      </section>

      {/* ── Proof ────────────────────────────────────────────────────────── */}
      <section className="section section--tight">
        <div className="container">
          <ProofStrip locale={locale} />
        </div>
      </section>

      {/* ── Work ─────────────────────────────────────────────────────────── */}
      {/* Evidence before offer. A buyer who has just read the claim wants to
          see something that was shipped, not a list of what can be bought. */}
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
            screens={ui.screens}
            limit={3}
            showFilters={false}
          />
          <div className="section__cta">
            <ButtonLink href={path('/work')} variant="secondary">
              {ui.allProjects}
              <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
            </ButtonLink>
          </div>
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

      {/* ── The lab ──────────────────────────────────────────────────────── */}
      {/* The one block that exists only here, and the only thing on the site
          that is not a claim: the team's own display engine, compiled to
          TypeScript and running a real frame loop in the visitor's browser,
          reporting the bytes and milliseconds it actually costs. Every other
          section is evidence *about* the work — this is the work, running. */}
      <section className="section" id="lab">
        <div className="container lab">
          <div className="lab__copy">
            <span className="eyebrow">{rnd.eyebrow}</span>
            <h2 className="section__title">{rnd.title}</h2>
            <p className="section__lede">{rnd.body}</p>
            <p className="lab__live">{ui.rndPage.panelBody}</p>
            <div className="section__cta section__cta--start">
              <ButtonLink href={path(rnd.cta.href)} variant="secondary">
                {rnd.cta.label}
                <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>

          <div className="lab__panel">
            <LivePanel />
          </div>
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
