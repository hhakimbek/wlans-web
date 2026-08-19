import { NextResponse, type NextRequest } from 'next/server'

import { defaultLocale, locales } from './i18n'

/**
 * Locale prefix guard.
 *
 * Every page lives under `/<locale>/…`. A request without a prefix is
 * redirected rather than rewritten, so there is exactly one canonical URL per
 * page and the address bar always shows the language being read.
 *
 * The first visit is sent to Uzbek. `Accept-Language` is consulted only to
 * upgrade a visitor who clearly reads Russian or English — never to override
 * a choice they have already made, which is what the cookie records.
 */
const COOKIE = 'locale'

function pick(request: NextRequest): string {
  const saved = request.cookies.get(COOKIE)?.value
  if (saved && (locales as readonly string[]).includes(saved)) return saved

  const header = request.headers.get('accept-language')
  if (header) {
    for (const part of header.split(',')) {
      const tag = part.split(';')[0].trim().toLowerCase()
      if (tag.startsWith('uz')) return 'uz'
      if (tag.startsWith('ru')) return 'ru'
      if (tag.startsWith('en')) return 'en'
    }
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const hasLocale = locales.some(
    (locale) => pathname === '/' + locale || pathname.startsWith('/' + locale + '/'),
  )

  if (hasLocale) {
    // Remember the language actually being read, so a later bare-root visit
    // lands where the reader left off.
    const current = pathname.split('/')[1]
    const response = NextResponse.next()
    if (request.cookies.get(COOKIE)?.value !== current) {
      response.cookies.set(COOKIE, current, { path: '/', maxAge: 60 * 60 * 24 * 365 })
    }
    return response
  }

  const url = request.nextUrl.clone()
  url.pathname = '/' + pick(request) + (pathname === '/' ? '' : pathname)
  return NextResponse.redirect(url)
}

export const config = {
  /* Everything except API routes, Next internals, the metadata routes and any
     path that carries a file extension.

     The dot is written as the character class `[.]` rather than as an escape.
     An escaped `.` has to survive the JS string literal to reach the matcher,
     and it does not: `'\.'` is just `'.'`, so the pattern silently degrades to
     `.*..*` and the negative lookahead then rejects every path with at least
     one character. That is what shipped — the middleware ran on `/` and
     nowhere else, so `/services` never redirected to `/uz/services` and the
     language cookie was never written. A character class cannot be defused
     that way. */
  matcher: ['/((?!api|_next|sitemap|robots|.*[.].*).*)'],
}
