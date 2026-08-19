'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { localeNames, localeShort, locales, type Locale } from '@/i18n'

/**
 * Language switcher.
 *
 * Every language is a real link to the same page in that language, not a
 * button that mutates state: switching language is a navigation, so it should
 * be openable in a new tab, crawlable, and visible in the address bar.
 *
 * The current path keeps its shape — only the first segment is swapped — so a
 * reader on a case study stays on that case study.
 */
export function LocaleSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() || '/' + locale

  const swap = (next: Locale) => {
    const segments = pathname.split('/')
    // segments[0] is the empty string before the leading slash.
    segments[1] = next
    return segments.join('/') || '/' + next
  }

  return (
    <div className="locale-switcher" role="group" aria-label={label}>
      {locales.map((option) => (
        <Link
          key={option}
          href={swap(option)}
          className="locale-switcher__option"
          data-active={option === locale}
          hrefLang={option}
          aria-current={option === locale ? 'true' : undefined}
          title={localeNames[option]}
        >
          {localeShort[option]}
        </Link>
      ))}
    </div>
  )
}
