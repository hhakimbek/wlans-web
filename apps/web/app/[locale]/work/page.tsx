import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

import { ButtonLink } from '@/components/ui/button'
import { Notice } from '@/components/marketing/notice'
import { WorkGallery } from '@/components/marketing/work-gallery'
import { SectionHead } from '@/components/marketing/sections'
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
    path: '/work',
    title: ui.workPage.eyebrow,
    description: ui.workPage.lede,
    siteName: company.name,
  })
}

export default async function WorkPage({ params }: Params) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const site = getSite(locale)
  const t = site.ui.workPage

  return (
    <>
      <section className="section section--hero hero-wrap hero-wrap--compact">
        <div className="container">
          <SectionHead eyebrow={t.eyebrow} title={t.title} accent={t.accent} lede={t.lede} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Notice>
            {site.ui.notices.placeholderProjects} <code>apps/web/content/locales/</code>.
          </Notice>
          <WorkGallery
            locale={locale}
            projects={site.work}
            categories={site.workCategories}
            ui={site.ui.gallery}
          />
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
