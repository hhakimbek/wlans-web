import Link from 'next/link'

import { getSite } from '@/content'
import { defaultLocale, localePath } from '@/i18n'

/**
 * 404 inside the site chrome.
 *
 * A not-found file under a dynamic segment does not receive params, so it
 * cannot know which language the visitor was reading. It answers in the
 * default locale and offers the way back rather than guessing.
 */
export default function NotFound() {
  const { ui, company } = getSite(defaultLocale)

  return (
    <section className="section section--hero hero-wrap hero-wrap--compact">
      <div className="container container--narrow">
        <span className="eyebrow">404</span>
        <h1 className="section__title">{company.tagline}</h1>
        <p className="section__lede">{ui.notices.notFound}</p>
        <div className="hero__actions">
          <Link href={localePath(defaultLocale, '/')} className="btn btn--primary btn--lg">
            {ui.homeCrumb}
          </Link>
          <Link href={localePath(defaultLocale, '/services')} className="btn btn--secondary btn--lg">
            {ui.allServices}
          </Link>
        </div>
      </div>
    </section>
  )
}
