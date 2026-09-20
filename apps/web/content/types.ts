/* ─────────────────────────────────────────────────────────────────────────
   Content shapes.

   Two files feed every one of these: `structure.ts` holds what is the same in
   every language (slugs, icons, hues, ratings, tool names, hrefs) and the
   files under `locales/` hold the words. `index.ts` zips them together, so a
   translator never sees a hue and a developer never re-types a paragraph.
   ───────────────────────────────────────────────────────────────────────── */

/** Which illustrative interface a device renders. See `app-screen.tsx`. */
export type ScreenVariant = 'track' | 'finance' | 'catalog' | 'schedule'

export interface Industry {
  slug: string
  icon: string
  title: string
  body: string
}

export interface Project {
  slug: string
  client: string
  industry: string
  /** Filter category — must match a `workCategories` entry. */
  category: string
  summary: string
  result: string
  stack: string[]
  /** Drives the accent inside the device screen so each product reads distinct. */
  hue: number
  /** The environment the product runs in — never a fabricated screenshot. */
  photo: string
  /** Which interface the device on this card renders. */
  screen: ScreenVariant
  /** Photos used inside that interface, where it shows imagery. */
  shots?: readonly string[]
  /** Store presence, shown as badges on the card. */
  stores?: { ios?: string; android?: string }
  /** Quote revealed when the card is hovered or focused. */
  voice?: { name: string; role: string; quote: string }
  /** Case-study body: the same three beats as the card, at length. */
  challenge?: string[]
  approach?: { title: string; body: string }[]
  outcomes?: { value: string; label: string }[]
  /** Facts panel on the case-study page. */
  facts?: { timeline?: string; team?: string; platforms?: string }
  placeholder?: boolean
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  rating: number
  platform?: 'Clutch' | 'Trustpilot' | 'Google'
  youtubeId?: string
  hue?: number
  placeholder?: boolean
}

export interface ServiceTech {
  name: string
  body: string
  tools: string[]
}

export interface ServiceDef {
  slug: string
  /** Short label for the menu and cards. */
  title: string
  /** One or two words, for places a full title cannot fit. */
  shortTitle: string
  /** Full H1 on the detail page. */
  heading: string
  headingAccent?: string
  icon: string
  summary: string
  points: string[]
  lede: string
  /** Hue for the artwork on this page. */
  hue: number
  /** The three interfaces the hero devices render, left to right. */
  screens: readonly ScreenVariant[]
  stats: { value: string; label: string }[]
  techIntro: string
  technologies: ServiceTech[]
  caseStudy: { client: string; body: string[]; hue: number; badge?: string }
  /** Grouping in the header mega menu. */
  group: string
}

export interface SiteContent {
  company: {
    name: string
    legalName: string
    tagline: string
    founded: number
    phone: string
    email: string
    telegram: string
    telegramChannel: string
    address: string
    workingHours: string
    responseTime: string
  }
  showreel: { youtubeId: string; title: string; caption: string }
  hero: {
    eyebrow: string
    titleLead: string
    titleAccent: string
    lede: string
    primaryCta: { label: string; href: string }
    secondaryCta: { label: string; href: string }
    trust: string[]
  }
  proof: { value: string; label: string; placeholder?: boolean }[]
  industries: Industry[]
  work: Project[]
  workCategories: { label: string; icon: string }[]
  process: { title: string; body: string; duration: string }[]
  stack: Record<string, readonly string[]>
  testimonials: Testimonial[]
  faq: { q: string; a: string }[]
  about: {
    title: string
    lede: string
    story: string[]
    values: { icon: string; title: string; body: string }[]
  }
  offices: { city: string; country: string; address: string; note: string }[]
  projectTypes: string[]
  budgetRanges: string[]
  timelines: string[]
  rnd: { eyebrow: string; title: string; body: string; cta: { label: string; href: string } }
  nav: { href: string; label: string; mega?: string }[]
  /** Interface strings that are not page copy — buttons, labels, headings. */
  ui: UiStrings
}

export interface UiStrings {
  /* Chrome */
  skipToContent: string
  mainNav: string
  footerNav: string
  openMenu: string
  closeMenu: string
  language: string
  contact: string
  notSureWhichOne: string
  writeToUs: string
  back: string
  loading: string

  /* Repeated actions */
  learnMore: string
  allProjects: string
  allServices: string
  viewMoreProjects: string
  readCaseStudy: string
  bookCall: string
  orderProject: string
  seeRelatedWork: string
  homeCrumb: string
  portfolioCrumb: string

  /* Section headings, per page */
  home: HomeStrings
  servicesPage: ServicesPageStrings
  industriesPage: IndustriesPageStrings
  companyPage: CompanyPageStrings
  contactPage: ContactPageStrings
  workPage: WorkPageStrings
  rndPage: RndPageStrings
  tabs: TabStrings
  caseStudy: CaseStudyStrings
  serviceDetail: ServiceDetailStrings
  gallery: GalleryStrings
  screens: ScreenStrings
  rail: RailStrings
  form: FormStrings
  notices: NoticeStrings
}

export interface HomeStrings {
  servicesEyebrow: string
  servicesTitle: string
  servicesAccent: string
  servicesLede: string
  workEyebrow: string
  workTitle: string
  workAccent: string
  workLede: string
  industriesEyebrow: string
  industriesTitle: string
  industriesAccent: string
  industriesLede: string
  processEyebrow: string
  processTitle: string
  processAccent: string
  processLede: string
  clientsEyebrow: string
  clientsTitle: string
  clientsAccent: string
  stackEyebrow: string
  stackTitle: string
  stackAccent: string
  stackLede: string
  faqEyebrow: string
  faqTitle: string
  faqAccent: string
  ctaTitle: string
  ctaLede: string
}

export interface ServicesPageStrings {
  eyebrow: string
  title: string
  accent: string
  lede: string
  industriesEyebrow: string
  industriesTitle: string
  industriesAccent: string
  processEyebrow: string
  processTitle: string
  processAccent: string
  stackEyebrow: string
  stackTitle: string
  faqEyebrow: string
  faqTitle: string
  faqAccent: string
  ctaTitle: string
  ctaLede: string
}

export interface IndustriesPageStrings {
  eyebrow: string
  title: string
  accent: string
  lede: string
  workEyebrow: string
  workTitle: string
  workAccent: string
  processEyebrow: string
  processTitle: string
  processAccent: string
  faqEyebrow: string
  faqTitle: string
  faqAccent: string
  ctaTitle: string
  ctaLede: string
}

export interface CompanyPageStrings {
  eyebrow: string
  title: string
  accent: string
  storyEyebrow: string
  valuesEyebrow: string
  valuesTitle: string
  valuesAccent: string
  processEyebrow: string
  processTitle: string
  processAccent: string
  processLede: string
  clientsEyebrow: string
  clientsTitle: string
  clientsAccent: string
  whereToFindUs: string
  talkToUs: string
  telegram: string
  email: string
  phone: string
  hours: string
}

export interface ContactPageStrings {
  eyebrow: string
  title: string
  accent: string
  lede: string
  briefTitle: string
  preferToTalk: string
  telegram: string
  email: string
  phone: string
  whatHappensNext: string
  beforeYouWrite: string
  beforeYouWriteBody: string
}

export interface WorkPageStrings {
  eyebrow: string
  title: string
  accent: string
  lede: string
  ctaTitle: string
  ctaLede: string
}

/* Short enough to sit under an icon in a 5-item bar without wrapping. */
export interface TabStrings {
  home: string
  services: string
  work: string
  company: string
  contact: string
}

export interface RndPageStrings {
  frameworkTitle: string
  frameworkBody: string
  panelBody: string
  cta: string
}

export interface CaseStudyStrings {
  problemEyebrow: string
  problemTitle: string
  problemAccent: string
  choiceEyebrow: string
  choiceTitle: string
  choiceAccent: string
  changedEyebrow: string
  changedTitle: string
  changedAccent: string
  moreEyebrow: string
  moreTitle: string
  moreAccent: string
  ctaTitle: string
  orderLikeThis: string
  timeline: string
  team: string
  platforms: string
  stack: string
  result: string
}

export interface ServiceDetailStrings {
  statsTitleLead: string
  statsTitleAccent: string
  statsTitleTail: string
  techEyebrow: string
  techTitle: string
  techAccent: string
  caseEyebrow: string
  caseTitle: string
  caseAccent: string
  processEyebrow: string
  processTitle: string
  processAccent: string
  relatedEyebrow: string
  relatedTitle: string
  faqEyebrow: string
  faqTitle: string
  faqAccent: string
}

export interface GalleryStrings {
  filterProjects: string
  emptyCategory: string
  caseStudyBadge: string
  appStore: string
  googlePlay: string
}

/* The words inside the illustrative app screens. They are decorative art, but
   an English label sitting inside a phone on the Russian page is exactly the
   kind of seam that tells a reader the site was translated rather than built
   in three languages. Numbers, currency and icons carry everything else. */
export interface ScreenStrings {
  /* track */
  minutes: string
  enRoute: string
  orderNo: string
  courier: string
  trackOrder: string
  /* finance */
  balance: string
  topUp: string
  send: string
  pay: string
  more: string
  recent: string
  all: string
  /* catalog */
  search: string
  popular: string
  /* schedule */
  slots: string
  book: string
}

export interface RailStrings {
  previous: string
  next: string
  playVideo: string
  videoReview: string
  ratingLabel: string
}

export interface FormStrings {
  /* Nine inputs in one column is a wall. The two legends name what each half
     of the form is actually asking for. */
  groupYou: string
  groupProject: string
  name: string
  namePlaceholder: string
  email: string
  emailPlaceholder: string
  company: string
  companyPlaceholder: string
  contact: string
  contactPlaceholder: string
  contactHint: string
  optional: string
  projectType: string
  budget: string
  timeline: string
  message: string
  messagePlaceholder: string
  submit: string
  submitting: string
  successTitle: string
  successBody: string
  /** Shown above the reference number on the success screen. */
  successRefLabel: string
  errorTitle: string
  website: string
}

export interface NoticeStrings {
  notFound: string
  placeholderProjects: string
  placeholderQuotes: string
  placeholderFigures: string
  placeholderProject: string
}
