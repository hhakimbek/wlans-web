/**
 * Locale configuration.
 *
 * Uzbek is the default and the site is served from `/uz` — the audience is in
 * Tashkent, so English being the "neutral" default would be the wrong choice
 * here. Every locale is a real URL prefix rather than a cookie, so a page can
 * be linked, shared and indexed in the language it was read in.
 */
export const locales = ['uz', 'ru', 'en'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'uz'

/** Endonyms: a language is named in its own language, never in the reader's. */
export const localeNames: Record<Locale, string> = {
  uz: "O‘zbekcha",
  ru: 'Русский',
  en: 'English',
}

/** Short label for the header switcher. */
export const localeShort: Record<Locale, string> = {
  uz: 'UZ',
  ru: 'RU',
  en: 'EN',
}

/** BCP 47 tags for the `lang` attribute and hreflang. */
export const localeTags: Record<Locale, string> = {
  uz: 'uz-UZ',
  ru: 'ru-RU',
  en: 'en',
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

/** Prefixes a site-relative path with the active locale. */
export function localePath(locale: Locale, path: string): string {
  if (path === '/') return '/' + locale
  return '/' + locale + path
}
