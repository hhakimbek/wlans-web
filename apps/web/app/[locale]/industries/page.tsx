import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

import { ButtonLink } from '@/components/ui/button'
import { WorkGallery } from '@/components/marketing/work-gallery'
import { Faq, Industries, Process, SectionHead } from '@/components/marketing/sections'
import { getSite } from '@/content'
import { isLocale, localePath } from '@/i18n'
import { pageMetadata } from '@/lib/seo'

type Params = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const { ui, company } = getSite(locale)
  return pageMetadata({
    locale,
    path: '/industries',
    title: ui.industriesPage.eyebrow,
    description: ui.industriesPage.lede,
    siteName: company.name,
  })
}

export default async function IndustriesPage({ params }: Params) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const site = getSite(locale)
  const t = site.ui.industriesPage

  return (
    <>
      <section className="section section--hero hero-wrap hero-wrap--compact">
        <div className="container">
          <SectionHead eyebrow={t.eyebrow} title={t.title} accent={t.accent} lede={t.lede} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Industries locale={locale} />
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <SectionHead eyebrow={t.workEyebrow} title={t.workTitle} accent={t.workAccent} />
          <WorkGallery
            locale={locale}
            projects={site.work}
            categories={site.workCategories}
            ui={site.ui.gallery}
            limit={4}
          />
          <div className="section__cta">
            <ButtonLink href={localePath(locale, '/work')} variant="secondary">
              {site.ui.allProjects}
              <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow={t.processEyebrow}
            title={t.processTitle}
            accent={t.processAccent}
          />
          <Process locale={locale} />
        </div>
      </section>

      <section className="section band band--blue">
        <div className="container container--narrow">
          <SectionHead center eyebrow={t.faqEyebrow} title={t.faqTitle} accent={t.faqAccent} />
          <Faq locale={locale} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band">
            <span className="cta-band__glyph" aria-hidden="true" />
            <h2 className="cta-band__title">{t.ctaTitle}</h2>
            <p className="cta-band__lede">{t.ctaLede}</p>
            <div className="cta-band__actions">
              <ButtonLink href={localePath(locale, '/contact')} variant="primary" className="btn--lg">
                {site.ui.orderProject}
                <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
