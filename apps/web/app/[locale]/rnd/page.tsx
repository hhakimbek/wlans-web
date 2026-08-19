import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ButtonLink } from '@/components/ui/button'
import { SectionHead } from '@/components/marketing/sections'
import { RndPanel } from '@/features/playground/rnd-panel'
import { getSite } from '@/content'
import { isLocale, localePath } from '@/i18n'
import { pageMetadata } from '@/lib/seo'

type Params = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const { rnd, company } = getSite(locale)
  return pageMetadata({
    locale,
    path: '/rnd',
    title: rnd.eyebrow,
    description: rnd.body,
    siteName: company.name,
  })
}

export default async function RndPage({ params }: Params) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const { rnd, ui } = getSite(locale)
  const t = ui.rndPage

  return (
    <section className="section section--hero">
      <div className="container">
        <SectionHead eyebrow={rnd.eyebrow} title={rnd.title} lede={rnd.body} />

        <div className="rnd">
          <div>
            <h3 className="service__title">{t.frameworkTitle}</h3>
            <p className="section__lede" style={{ marginTop: 0 }}>
              {t.frameworkBody}
            </p>
            <p className="section__lede">{t.panelBody}</p>
            <div className="hero__actions">
              <ButtonLink href={localePath(locale, '/contact')} variant="secondary">
                {t.cta}
              </ButtonLink>
            </div>
          </div>

          <RndPanel />
        </div>
      </div>
    </section>
  )
}
