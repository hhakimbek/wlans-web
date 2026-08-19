/* ─────────────────────────────────────────────────────────────────────────
   Everything that is identical in every language.

   Slugs, icons, hues, store ratings, tool names, phone numbers, hrefs. A
   translator never has to see these, and changing a hue never means touching
   three files.

   ⚠ Contact details below are dummies and MUST be replaced before launch.
   ───────────────────────────────────────────────────────────────────────── */

export const contact = {
  name: 'wlans',
  legalName: 'wlans LLC',
  founded: 2019,

  // ⚠ REPLACE — dummy contact details
  phone: '+998 90 000 00 00',
  email: 'hello@wlans.uz',
  telegram: 'wlans_admin', // t.me/<this>
  telegramChannel: 'wlans_uz',
} as const

export const showreelId = 'bEN4mLlU-hU'

export const heroLinks = {
  primary: '/contact',
  secondary: '/work',
} as const

export const industryKeys = [
  { slug: 'fintech', icon: 'wallet' },
  { slug: 'logistics', icon: 'truck' },
  { slug: 'retail', icon: 'shopping-bag' },
  { slug: 'health', icon: 'heart-pulse' },
  { slug: 'education', icon: 'graduation-cap' },
  { slug: 'enterprise', icon: 'building-2' },
] as const

/** `category` indexes into `workCategoryKeys`, not into a translated label. */
export const workKeys = [
  {
    slug: 'delivery-platform',
    category: 'logistics',
    stack: ['Flutter', 'NestJS', 'PostgreSQL'],
    hue: 263,
    stores: { ios: '4.7', android: '4.5' },
    placeholder: true,
  },
  {
    slug: 'digital-wallet',
    category: 'fintech',
    stack: ['Swift', 'Kotlin', 'PostgreSQL'],
    hue: 220,
    stores: { ios: '4.8', android: '4.6' },
    placeholder: true,
  },
  {
    slug: 'clinic-booking',
    category: 'health',
    stack: ['Flutter', 'Node.js', 'Postgres'],
    hue: 150,
    stores: { ios: '4.6', android: '4.4' },
    placeholder: true,
  },
  {
    slug: 'retail-loyalty',
    category: 'retail',
    stack: ['React Native', 'NestJS'],
    hue: 30,
    stores: { ios: '4.5', android: '4.3' },
    placeholder: true,
  },
  {
    slug: 'learning-platform',
    category: 'education',
    stack: ['Flutter', 'Node.js', 'PostgreSQL'],
    hue: 300,
    stores: { ios: '4.7', android: '4.7' },
    placeholder: true,
  },
  {
    slug: 'field-service',
    category: 'enterprise',
    stack: ['Kotlin', 'Next.js', 'Postgres'],
    hue: 240,
    stores: { android: '4.4' },
    placeholder: true,
  },
] as const

export const workCategoryKeys = [
  { key: 'all', icon: 'grid' },
  { key: 'fintech', icon: 'wallet' },
  { key: 'logistics', icon: 'truck' },
  { key: 'health', icon: 'heart-pulse' },
  { key: 'retail', icon: 'shopping-bag' },
  { key: 'education', icon: 'graduation-cap' },
  { key: 'enterprise', icon: 'building-2' },
] as const

/** Tech names are proper nouns — never translated, so they live here. */
export const stack = {
  mobile: ['Swift', 'SwiftUI', 'Kotlin', 'Jetpack Compose', 'Flutter', 'Dart'],
  web: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Vue'],
  backend: ['Node.js', 'NestJS', 'PostgreSQL', 'Redis', 'GraphQL'],
} as const

export const testimonialKeys = [
  { rating: 5, platform: 'Clutch', youtubeId: showreelId, hue: 263, placeholder: true },
  { rating: 5, platform: 'Clutch', placeholder: true },
  { rating: 5, platform: 'Trustpilot', placeholder: true },
  { rating: 5, platform: 'Google', youtubeId: showreelId, hue: 200, placeholder: true },
  { rating: 5, platform: 'Clutch', placeholder: true },
] as const

export const valueKeys = ['message-square', 'package-check', 'users', 'shield-check'] as const

export const navKeys = [
  { href: '/services', key: 'services', mega: 'services' },
  { href: '/work', key: 'work' },
  { href: '/industries', key: 'industries' },
  { href: '/company', key: 'company' },
  { href: '/rnd', key: 'rnd' },
] as const

export const rndCta = '/rnd'

/* ── Service detail pages ───────────────────────────────────────────────── */

/* `tech[].tools` stay here rather than in the locale files: they are product
   names. A handful read as English terms in any language, which is how the
   industry writes them locally too. */
export const serviceDefKeys = [
  {
    slug: 'mobile-app-development',
    icon: 'smartphone',
    group: 'Mobile',
    hue: 263,
    caseHue: 263,
    tech: [
      { key: 'nativeIos', tools: ['Swift', 'SwiftUI', 'Combine'] },
      { key: 'nativeAndroid', tools: ['Kotlin', 'Compose', 'Coroutines'] },
      { key: 'crossPlatform', tools: ['Flutter', 'Dart'] },
      { key: 'mobileBackend', tools: ['Node.js', 'NestJS', 'PostgreSQL'] },
    ],
  },
  {
    slug: 'ios-development',
    icon: 'apple',
    group: 'Mobile',
    hue: 220,
    caseHue: 220,
    tech: [
      { key: 'swift', tools: ['Swift', 'SwiftUI', 'UIKit'] },
      { key: 'dataSync', tools: ['SwiftData', 'Core Data', 'CloudKit'] },
      { key: 'systemIntegration', tools: ['WidgetKit', 'App Clips', 'APNs'] },
      { key: 'quality', tools: ['XCTest', 'TestFlight', 'Sentry'] },
    ],
  },
  {
    slug: 'android-development',
    icon: 'android',
    group: 'Mobile',
    hue: 150,
    caseHue: 150,
    tech: [
      { key: 'kotlin', tools: ['Kotlin', 'Compose', 'Coroutines'] },
      { key: 'architecture', tools: ['Hilt', 'Room', 'WorkManager'] },
      { key: 'performance', tools: ['Baseline Profiles', 'Macrobenchmark'] },
      { key: 'distribution', tools: ['Play Console', 'App Bundles'] },
    ],
  },
  {
    slug: 'cross-platform-development',
    icon: 'layers',
    group: 'Mobile',
    hue: 190,
    caseHue: 190,
    tech: [
      { key: 'flutter', tools: ['Flutter', 'Dart'] },
      { key: 'state', tools: ['Riverpod', 'Bloc', 'GoRouter'] },
      { key: 'bridges', tools: ['Platform Channels', 'Pigeon'] },
      { key: 'release', tools: ['Fastlane', 'Codemagic'] },
    ],
  },
  {
    slug: 'web-app-development',
    icon: 'globe',
    group: 'Web',
    hue: 280,
    caseHue: 280,
    tech: [
      { key: 'react', tools: ['TypeScript', 'React', 'Next.js'] },
      { key: 'dataLayer', tools: ['TanStack Query', 'Drizzle', 'PostgreSQL'] },
      { key: 'designSystem', tools: ['Tailwind CSS', 'Radix UI'] },
      { key: 'quality', tools: ['Playwright', 'Vitest'] },
    ],
  },
] as const

export const serviceGroups = ['Mobile', 'Web'] as const
