import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

import { InquiryForm } from '@/features/inquiry/inquiry-form'
import { SectionHead } from '@/components/marketing/sections'
import { getSite } from '@/content'
import { isLocale } from '@/i18n'
import { pageMetadata } from '@/lib/seo'

type Params = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const { ui, company } = getSite(locale)
  return pageMetadata({
    locale,
    path: '/contact',
    title: ui.contactPage.eyebrow,
    description: ui.contactPage.lede,
    siteName: company.name,
  })
}

export default async function ContactPage({ params }: Params) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const site = getSite(locale)
  const { company, process, ui } = site
  const t = ui.contactPage
  const telegramUrl = 'https://t.me/' + company.telegram

  return (
    <>
      <section className="section section--hero hero-wrap hero-wrap--compact">
        <div className="container">
          <SectionHead
            eyebrow={t.eyebrow}
            title={t.title}
            accent={t.accent}
            lede={t.lede}
          />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container contact-layout">
          <div className="card contact-form-card">
            <h2 className="contact-form-card__title">{t.briefTitle}</h2>
            <InquiryForm
              locale={locale}
              options={{
                projectTypes: site.projectTypes,
                budgetRanges: site.budgetRanges,
                timelines: site.timelines,
              }}
              contact={{ telegram: company.telegram, email: company.email }}
              ui={ui.form}
            />
          </div>

          <aside className="contact-aside">
            <div className="card card--soft">
              <h3 className="card__title">{t.preferToTalk}</h3>
              <p className="card__body">{company.responseTime}</p>
              <div className="contact-links">
                <a className="contact-link contact-link--tg" href={telegramUrl} target="_blank" rel="noreferrer">
                  <MessageCircle size={20} strokeWidth={2.2} aria-hidden="true" />
                  <span>
                    <strong>{t.telegram}</strong>
                    <em>@{company.telegram}</em>
                  </span>
                </a>
                <a className="contact-link" href={`mailto:${company.email}`}>
                  <Mail size={20} strokeWidth={2.2} aria-hidden="true" />
                  <span>
                    <strong>{t.email}</strong>
                    <em>{company.email}</em>
                  </span>
                </a>
                <a className="contact-link" href={`tel:${company.phone.replace(/\s/g, '')}`}>
                  <Phone size={20} strokeWidth={2.2} aria-hidden="true" />
                  <span>
                    <strong>{t.phone}</strong>
                    <em>{company.phone}</em>
                  </span>
                </a>
              </div>
              <ul className="contact-meta">
                <li>
                  <Clock size={16} aria-hidden="true" /> {company.workingHours}
                </li>
                <li>
                  <MapPin size={16} aria-hidden="true" /> {company.address}
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="card__title">{t.whatHappensNext}</h3>
              <ol className="mini-steps">
                {process.slice(0, 3).map((step, i) => (
                  <li key={step.title}>
                    <span className="mini-steps__num">{i + 1}</span>
                    <span>
                      <strong>{step.title}</strong>
                      <em>{step.body}</em>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="card card--soft">
              <h3 className="card__title">{t.beforeYouWrite}</h3>
              <p className="card__body">{t.beforeYouWriteBody}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
