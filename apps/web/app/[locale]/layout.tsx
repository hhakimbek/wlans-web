import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, Onest } from 'next/font/google'
import { notFound } from 'next/navigation'

import { MOTION_TIER_SCRIPT } from '@wlans/design-tokens'
import { Header } from '@/components/marketing/header'
import { Footer } from '@/components/marketing/footer'
import { RouteProgress } from '@/components/marketing/route-progress'
import { TabBar } from '@/components/marketing/tab-bar'
import { ContactFab } from '@/components/marketing/contact-fab'
import { getServiceDefs, getSite } from '@/content'
import { isLocale, locales, localeTags, type Locale } from '@/i18n'
import { SITE_URL } from '@/lib/seo'

import '../globals.css'

/* Subsets are explicit. `cyrillic` is required by the Russian locale;
   `latin-ext` carries the accented Latin the Uzbek and Russian transliterations
   use. next/font emits one @font-face per subset with a unicode-range, so an
   English visitor never downloads Cyrillic.

   Onest is variable, so 400–800 is a single file per subset rather than five
   static weights. Plex Mono ships two weights and Latin only: it is used for
   labels, units and code, none of which are translated. */
const onest = Onest({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  variable: '--font-onest',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
})

/* This is the root layout: there is no `app/layout.tsx`, because every page
   lives under a locale and the `lang` attribute has to be the real one. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type LayoutParams = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: LayoutParams): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const site = getSite(locale)

  return {
    title: {
      default: site.company.name + ' — ' + site.company.tagline,
      template: '%s — ' + site.company.name,
    },
    description: site.hero.lede,
    /* Makes every relative URL in page metadata resolve to an absolute one.
       Open Graph in particular is ignored by crawlers when the image or url is
       relative, so this is not cosmetic. */
    metadataBase: new URL(SITE_URL),
    /* No `alternates` here on purpose. Metadata is inherited, so a canonical
       declared at the layout level would make every page in the locale claim
       `/uz` as its canonical URL — asking search engines to drop all but the
       home page. Each page declares its own via `pageMetadata()`. */
    openGraph: {
      type: 'website',
      siteName: site.company.name,
      locale: localeTags[locale].replace('-', '_'),
    },
  }
}

export const viewport: Viewport = {
  // Zoom is never disabled. maximumScale traps low-vision users.
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFBFC' },
    { media: '(prefers-color-scheme: dark)', color: '#0E1218' },
  ],
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale: Locale = raw

  const site = getSite(locale)
  const services = getServiceDefs(locale)

  return (
    <html lang={localeTags[locale]} className={`${onest.variable} ${plexMono.variable}`}>
      <head>
        {/* Resolved before first paint. Running this after hydration would show
            a flash of full motion on a device that asked for none. */}
        <script dangerouslySetInnerHTML={{ __html: MOTION_TIER_SCRIPT }} />
      </head>
      <body>
        <a href="#main" className="sr-only">
          {site.ui.skipToContent}
        </a>
        <RouteProgress />
        <Header
          locale={locale}
          nav={site.nav}
          company={{ name: site.company.name, phone: site.company.phone }}
          services={services.map((s) => ({
            slug: s.slug,
            icon: s.icon,
            title: s.title,
            point: s.points[0],
            group: s.group,
          }))}
          groups={[...new Set(services.map((s) => s.group))]}
          ui={site.ui}
        />
        <main id="main">{children}</main>
        <Footer locale={locale} />
        <ContactFab telegram={site.company.telegram} label={site.ui.writeToUs} />
        <TabBar
          locale={locale}
          labels={site.ui.tabs}
          label={site.ui.mainNav}
          services={services.map((s) => ({
            slug: s.slug,
            icon: s.icon,
            shortTitle: s.shortTitle,
            title: s.title,
          }))}
          ui={site.ui}
        />
      </body>
    </html>
  )
}
