import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

import { ButtonLink } from '@/components/ui/button'
import { VideoModal } from '@/components/ui/video-modal'
import { AppScreen } from '@/components/marketing/app-screen'
import { Notice } from '@/components/marketing/notice'
import {
  Process,
  ProofStrip,
  SectionHead,
  Testimonials,
  Values,
} from '@/components/marketing/sections'
import { getSite } from '@/content'
import { isLocale, localePath } from '@/i18n'
import { pageMetadata } from '@/lib/seo'

type Params = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const { ui, about, company } = getSite(locale)
  return pageMetadata({
    locale,
    path: '/company',
    title: ui.companyPage.eyebrow,
    description: about.lede,
    siteName: company.name,
  })
}

export default async function CompanyPage({ params }: Params) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const site = getSite(locale)
  const { about, company, offices, showreel, ui } = site
  const t = ui.companyPage
  const path = (href: string) => localePath(locale, href)

  return (
    <>
      <section className="section section--hero hero-wrap hero-wrap--compact">
        <div className="container">
          <SectionHead
            eyebrow={t.eyebrow}
            title={t.title}
            accent={t.accent}
            lede={about.lede}
          />
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <Notice>
            {ui.notices.placeholderFigures} <code>apps/web/content/locales/</code>.
          </Notice>
          <ProofStrip locale={locale} />
        </div>
      </section>

      <section className="section">
        <div className="container story-layout">
          <div className="story">
            <span className="eyebrow">{t.storyEyebrow}</span>
            {about.story.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="story__p">
                {paragraph}
              </p>
            ))}
            <div className="section__cta section__cta--start">
              <ButtonLink href={path('/work')} variant="secondary">
                {ui.allProjects}
                <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>

          <VideoModal
            youtubeId={showreel.youtubeId}
            title={showreel.title}
            variant="thumbnail"
            poster={
              <span className="video-thumb__art">
                <AppScreen hue={263} variant="dash" />
              </span>
            }
          />
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <SectionHead
            center
            eyebrow={t.valuesEyebrow}
            title={t.valuesTitle}
            accent={t.valuesAccent}
          />
          <Values locale={locale} />
        </div>
      </section>

      <section className="section">
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

      <section className="section band band--blue">
        <div className="container">
          <SectionHead
            center
            eyebrow={t.clientsEyebrow}
            title={t.clientsTitle}
            accent={t.clientsAccent}
          />
          <Notice>{ui.notices.placeholderQuotes}</Notice>
          <Testimonials locale={locale} />
        </div>
      </section>

      <section className="section" id="contact">
        <div className="container contact-layout contact-layout--reverse">
          <div className="card">
            <h2 className="card__title">{t.whereToFindUs}</h2>
            {offices.map((office) => (
              <div key={office.city} className="office">
                <h3 className="office__city">
                  {office.city}, {office.country}
                </h3>
                <p className="office__note">{office.note}</p>
                <p className="office__address">{office.address}</p>
              </div>
            ))}
            <ul className="contact-meta">
              <li>
                <Clock size={16} aria-hidden="true" /> {company.workingHours}
              </li>
              <li>
                <MapPin size={16} aria-hidden="true" /> {company.address}
              </li>
            </ul>
          </div>

          <div className="card card--soft">
            <h2 className="card__title">{t.talkToUs}</h2>
            <p className="card__body">{company.responseTime}</p>
            <div className="contact-links">
              <a
                className="contact-link contact-link--tg"
                href={'https://t.me/' + company.telegram}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={20} strokeWidth={2.2} aria-hidden="true" />
                <span>
                  <strong>{t.telegram}</strong>
                  <em>@{company.telegram}</em>
                </span>
              </a>
              <a className="contact-link" href={'mailto:' + company.email}>
                <Mail size={20} strokeWidth={2.2} aria-hidden="true" />
                <span>
                  <strong>{t.email}</strong>
                  <em>{company.email}</em>
                </span>
              </a>
              <a className="contact-link" href={'tel:' + company.phone.replace(/\s/g, '')}>
                <Phone size={20} strokeWidth={2.2} aria-hidden="true" />
                <span>
                  <strong>{t.phone}</strong>
                  <em>{company.phone}</em>
                </span>
              </a>
            </div>
            <div className="section__cta section__cta--start">
              <ButtonLink href={path('/contact')} variant="primary">
                {ui.orderProject}
                <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
