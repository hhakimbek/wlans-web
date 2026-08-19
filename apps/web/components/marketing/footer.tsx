import Link from 'next/link'

import { getSite } from '@/content'
import { localePath, type Locale } from '@/i18n'

export function Footer({ locale }: { locale: Locale }) {
  const site = getSite(locale)

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>
          {site.company.name} — {site.company.address}
        </span>
        <nav aria-label={site.ui.footerNav}>
          {site.nav.map((item) => (
            <Link key={item.href} href={localePath(locale, item.href)} className="header__link">
              {item.label}
            </Link>
          ))}
          <Link href={localePath(locale, '/contact')} className="header__link">
            {site.ui.contact}
          </Link>
        </nav>
      </div>
    </footer>
  )
}
