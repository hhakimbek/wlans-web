import type { Dictionary } from '../dictionary'

/* English. The source the other two were translated from — when a paragraph
   changes, change it here first. */
export const en: Dictionary = {
  company: {
    tagline: 'We build mobile apps that ship.',
    address: 'Amir Temur ko‘chasi 108, Tashkent, Uzbekistan',
    workingHours: 'Mon–Fri, 09:00–18:00 (UTC+5)',
    responseTime: 'We reply within one working day.',
  },

  showreel: {
    title: 'What we do at wlans',
    caption: 'See what we do at wlans',
  },

  hero: {
    titleLead: 'We build mobile apps',
    titleAccent: 'that ship.',
    lede:
      'wlans is a product engineering team in Tashkent. We take mobile and web products from a first conversation to a live release — and stay on after launch, because that is when the real work starts.',
    primaryCta: 'Order a project',
    secondaryCta: 'See our work',
    trust: ['iOS, Android and Flutter', 'One team from scope to release', 'Support after launch'],
  },

  proof: [
    { value: '40+', label: 'Products delivered' },
    { value: '7', label: 'Years building' },
    { value: '18', label: 'Engineers on staff' },
    { value: '9', label: 'Countries served' },
  ],


  industries: {
    fintech: {
      title: 'Fintech',
      body: 'Payments, wallets and lending apps built to survive a security review, not just a demo day.',
    },
    logistics: {
      title: 'Logistics',
      body: 'Driver apps and dispatch tools that keep working when the signal drops mid-route.',
    },
    retail: {
      title: 'Retail & e-commerce',
      body: 'Storefronts, loyalty and in-store tooling, with the checkout tuned for conversion.',
    },
    health: {
      title: 'Healthcare',
      body: 'Clinic booking, telemedicine and patient records with the privacy handling that requires.',
    },
    education: {
      title: 'Education',
      body: 'Learning platforms with offline lessons, progress tracking and honest analytics.',
    },
    enterprise: {
      title: 'Enterprise',
      body: 'Internal tools that replace a spreadsheet and a WhatsApp group with one system.',
    },
  },

  workCategories: {
    all: 'All projects',
    fintech: 'Fintech',
    logistics: 'Logistics',
    health: 'Health',
    retail: 'E-commerce',
    education: 'Education',
    enterprise: 'Enterprise',
  },

  work: {
    'delivery-platform': {
      client: 'Delivery platform',
      industry: 'Logistics',
      summary:
        'Couriers were losing orders in basements and lifts, where the network drops for minutes at a time. We rebuilt the client around an offline-first queue.',
      result: 'Failed deliveries down by a third.',
      voice: {
        name: 'Client name',
        role: 'Operations Director',
        quote:
          'The first version that actually worked in the buildings our couriers deliver to. Dispatch stopped reconciling missing jobs by phone.',
      },
      challenge: [
        'Couriers spent a large part of every shift out of coverage — basements, lift shafts, underground car parks. The previous app treated the network as always present, so a status update made in a basement was simply lost, and dispatch only found out when a customer called.',
        'The operational cost was not the lost update itself. It was that nobody could tell a job that had failed from a job whose update had not arrived, so every anomaly turned into a phone call.',
      ],
      approach: [
        {
          title: 'An offline-first queue',
          body: 'Every action a courier takes is written to a local queue first and reconciled with the server when coverage returns. The interface reflects the local state immediately, so the app never appears frozen while the radio is out.',
        },
        {
          title: 'Conflict rules, not conflict prompts',
          body: 'Two devices can touch the same job. Rather than asking a courier to resolve a merge on a phone screen, the server applies a deterministic rule per field and records what it discarded.',
        },
        {
          title: 'Visible sync state',
          body: 'A job carries its own sync badge. Dispatch can see that an update is pending rather than assuming it is missing, which is what removed most of the phone traffic.',
        },
      ],
      outcomes: [
        { value: '-33%', label: 'Failed deliveries' },
        { value: '4.7 / 4.5', label: 'Store rating, iOS / Android' },
        { value: 'Zero', label: 'Updates lost to coverage gaps' },
      ],
      facts: {
        timeline: '5 months to first release',
        team: '4 engineers, 1 designer',
        platforms: 'iOS · Android · Dispatch web',
      },
    },

    'digital-wallet': {
      client: 'Digital wallet',
      industry: 'Fintech',
      summary:
        'A payment flow that had to clear a bank security review before a single user could touch it. The previous vendor had failed twice.',
      result: 'Passed audit first attempt; 40k users in three months.',
      voice: {
        name: 'Client name',
        role: 'CTO',
        quote:
          'They documented the threat model alongside the code. The auditors could follow it, which is why it passed the first time.',
      },
      challenge: [
        'The product could not launch until it cleared a bank security review, and two previous vendors had failed that review. Each failure had cost a release window, and the client had stopped believing a date could be met.',
        'The review was not only about the code. The auditors needed to follow a threat model, trace each control back to a requirement, and see the reasoning — which no previous submission had made possible.',
      ],
      approach: [
        {
          title: 'The threat model came first',
          body: 'Before a screen was built we wrote down what an attacker would try, what each control was for, and what was explicitly out of scope. The document was maintained alongside the code, not written for the submission.',
        },
        {
          title: 'Native on both platforms',
          body: 'Key storage, biometric prompts and certificate pinning behave differently on iOS and Android. Sharing that layer would have meant explaining a wrapper to auditors instead of the platform primitive underneath it.',
        },
        {
          title: 'Audit trail as a feature',
          body: 'Every state change on a payment is recorded with the actor and the reason. It shortened the review, and it is what the support team uses daily.',
        },
      ],
      outcomes: [
        { value: 'First pass', label: 'Bank security review' },
        { value: '40k', label: 'Users in three months' },
        { value: '4.8 / 4.6', label: 'Store rating, iOS / Android' },
      ],
      facts: {
        timeline: '7 months to audit sign-off',
        team: '5 engineers, 1 security lead',
        platforms: 'iOS · Android',
      },
    },

    'clinic-booking': {
      client: 'Clinic booking',
      industry: 'Healthcare',
      summary:
        'Reception was running on paper and phone calls, and double-booking treatment rooms most weeks. Rooms, staff and equipment became separate constrained resources.',
      result: 'Scheduling conflicts eliminated; 60% of bookings self-serve.',
      voice: {
        name: 'Client name',
        role: 'Clinic Director',
        quote:
          'The scheduler cannot produce an impossible booking any more. That one change removed a weekly argument.',
      },
      challenge: [
        'Reception ran on paper and phone calls. Treatment rooms were double-booked most weeks, and the fix was always the same: someone senior rearranging a day by hand.',
        'The scheduling software the clinic had tried treated a booking as one resource. In reality a session needs a room, a practitioner and sometimes a specific machine, each with its own availability.',
      ],
      approach: [
        {
          title: 'Three constrained resources',
          body: 'Rooms, staff and equipment are modelled separately, and a slot only exists when all three are free. The impossible booking stopped being something to catch later and became something the system cannot express.',
        },
        {
          title: 'Self-serve booking reception trusts',
          body: 'Patients book against the same constraint engine reception uses, so an online booking cannot create a conflict a person then has to unpick.',
        },
        {
          title: 'A calendar built for a working day',
          body: 'Drag to move, keyboard to confirm, and a visible record of who changed what — designed with the front desk rather than for them.',
        },
      ],
      outcomes: [
        { value: 'Zero', label: 'Scheduling conflicts' },
        { value: '60%', label: 'Bookings made self-serve' },
        { value: '4.6 / 4.4', label: 'Store rating, iOS / Android' },
      ],
      facts: {
        timeline: '4 months to first clinic',
        team: '3 engineers, 1 designer',
        platforms: 'iOS · Android · Reception web',
      },
    },

    'retail-loyalty': {
      client: 'Retail loyalty',
      industry: 'Retail',
      summary:
        'A loyalty card nobody carried, in a business that could not see who its repeat customers were. One API, one identity model, portal plus app.',
      result: 'Repeat purchase rate up 22% in two quarters.',
      challenge: [
        'The loyalty scheme existed on a plastic card almost nobody carried. The business could see transactions but not customers, so it could not tell a first visit from a fiftieth.',
        'Two separate systems already claimed to own customer identity, and neither agreed with the other on who a person was.',
      ],
      approach: [
        {
          title: 'One identity, one API',
          body: 'A single customer record, resolved from a phone number at the till and in the app, with the older systems reading from it rather than competing with it.',
        },
        {
          title: 'Shared client, two surfaces',
          body: 'The app and the staff portal are the same codebase where they do the same job, and diverge only where the till workflow genuinely differs from the customer one.',
        },
        {
          title: 'Earning visible at the till',
          body: 'The reward balance updates at the moment of purchase, not overnight. That single latency change is what made the scheme worth opening the app for.',
        },
      ],
      outcomes: [
        { value: '+22%', label: 'Repeat purchase rate' },
        { value: '2 quarters', label: 'Time to that result' },
        { value: '4.5 / 4.3', label: 'Store rating, iOS / Android' },
      ],
      facts: {
        timeline: '5 months',
        team: '3 engineers, 1 designer',
        platforms: 'iOS · Android · Staff portal',
      },
    },

    'learning-platform': {
      client: 'Learning platform',
      industry: 'Education',
      summary:
        'Students in regions with patchy internet could not finish a single video lesson. Downloadable lessons with resumable transfers fixed it.',
      result: 'Course completion doubled.',
      voice: {
        name: 'Client name',
        role: 'Head of Product',
        quote:
          'They solved the actual problem — bandwidth — instead of redesigning the player again like the last team did.',
      },
      challenge: [
        'Students in regions with patchy internet could not finish a single video lesson. A dropped connection restarted the stream, and the same three minutes were watched over and over until the data ran out.',
        'The previous team had responded by redesigning the player twice. The problem was never the player.',
      ],
      approach: [
        {
          title: 'Download, then watch',
          body: 'Lessons are fetched ahead of time and stored on the device. Playback never touches the network, so a lesson finishes whether or not the connection does.',
        },
        {
          title: 'Resumable transfers',
          body: 'Downloads resume from the byte they stopped at rather than starting again, which is what makes a large lesson reachable on an unreliable link.',
        },
        {
          title: 'Honest progress',
          body: 'Progress syncs when the device is online and is authoritative on the device until then, so a student is never told they have lost work they did.',
        },
      ],
      outcomes: [
        { value: '2x', label: 'Course completion' },
        { value: '4.7 / 4.7', label: 'Store rating, iOS / Android' },
        { value: '~70%', label: 'Lessons watched offline' },
      ],
      facts: {
        timeline: '6 months',
        team: '4 engineers, 1 designer',
        platforms: 'iOS · Android',
      },
    },

    'field-service': {
      client: 'Field service',
      industry: 'Enterprise',
      summary:
        'Engineers filed reports from memory at the end of the day, so half the detail was lost. On-site capture with sync when the van reaches coverage.',
      result: 'Job closure time cut by 35%.',
      challenge: [
        'Engineers wrote up their jobs from memory at the end of the day. Half the detail was gone by then, and the parts of a report that mattered most for warranty claims were the parts most often missing.',
        'Coverage on site was unreliable, so any tool that required a live connection to record a job was going to be ignored in favour of a notebook.',
      ],
      approach: [
        {
          title: 'Capture on site',
          body: 'Photos, readings and part numbers are recorded at the job, on the device, with no network required. The report is finished before the engineer leaves.',
        },
        {
          title: 'Sync when the van reaches coverage',
          body: 'Uploads run in the background as soon as there is a usable connection, with large photo sets chunked so a brief window is still useful.',
        },
        {
          title: 'Back office on the same model',
          body: 'The web side reads the same records, so a job closed in the field is closed everywhere without a nightly import.',
        },
      ],
      outcomes: [
        { value: '-35%', label: 'Job closure time' },
        { value: '4.4', label: 'Store rating, Android' },
        { value: '100%', label: 'Reports filed on site' },
      ],
      facts: {
        timeline: '5 months',
        team: '3 engineers',
        platforms: 'Android · Back-office web',
      },
    },
  },

  process: [
    {
      title: 'Talk',
      body: 'A 30-minute call. You describe the problem; we tell you honestly whether we are the right team and roughly what it takes.',
      duration: 'Day 1',
    },
    {
      title: 'Scope',
      body: 'A working session, not a sales pitch. You leave with a written scope, a price range, and a list of what we still do not know.',
      duration: 'Week 1',
    },
    {
      title: 'Design',
      body: 'Flows and screens you can click through before production code exists. Changing a prototype is cheap; changing a shipped app is not.',
      duration: '2–4 weeks',
    },
    {
      title: 'Build',
      body: 'Two-week cycles with a working build at the end of each one. You see progress on a device, not in a status report.',
      duration: 'Ongoing',
    },
    {
      title: 'Release',
      body: 'Store submission, review handling, and the first weeks of real users — where the bugs that matter actually surface.',
      duration: 'Launch',
    },
    {
      title: 'Support',
      body: 'Crash monitoring, fixes and the next roadmap. Most of a product’s life happens after version 1.0.',
      duration: 'Ongoing',
    },
  ],

  stackGroups: {
    mobile: 'Mobile',
    web: 'Web',
    backend: 'Backend',
  },

  testimonials: [
    {
      quote:
        'They pushed back on half our feature list in the first week and were right about all of it. We launched two months earlier than planned.',
      name: 'Client name',
      role: 'CEO, Company',
    },
    {
      quote:
        'The build worked on the cheap Android phones our drivers actually use. Every previous vendor tested on an iPhone and called it done.',
      name: 'Client name',
      role: 'COO, Company',
    },
    {
      quote:
        'What I valued most was that the people who scoped the project were the people who built it. Nothing got lost in a hand-off.',
      name: 'Client name',
      role: 'Founder, Company',
    },
    {
      quote:
        'They stayed on after launch. The first month of real users produced problems nobody predicted, and they were fixed within days.',
      name: 'Client name',
      role: 'Product Lead, Company',
    },
    {
      quote:
        'Two-week builds meant I could show real progress to the board instead of a status slide. That alone justified the engagement.',
      name: 'Client name',
      role: 'CFO, Company',
    },
  ],

  faq: [
    {
      q: 'How much does an app cost?',
      a: 'Most projects we take on run between $300 and $3,000. The range is wide because scope drives it, not platform: a single-purpose app sits at the low end, a multi-role product with an admin panel at the top. After a scoping session we give a written estimate with the assumptions it depends on — and we tell you which parts you could cut.',
    },
    {
      q: 'How long does it take?',
      a: 'A first release is typically 3 to 5 months: 2–4 weeks of design, then two-week build cycles. You get a working build on a real device every two weeks, so progress is something you hold rather than read about.',
    },
    {
      q: 'Do I own the code?',
      a: 'Yes. Source, repositories, store accounts and infrastructure are yours from day one, in your own accounts where possible. There is no lock-in and no licence you have to keep paying us for.',
    },
    {
      q: 'Native or cross-platform?',
      a: 'It depends on the product. Heavy device integration, demanding graphics or platform-specific UX favour native. Standard business apps on both platforms usually favour Flutter. We recommend one and explain the trade-off rather than defaulting to whichever we prefer.',
    },
    {
      q: 'What happens after launch?',
      a: 'Most products need work after 1.0 — crash fixes, OS updates, store policy changes and the features real usage reveals. We keep maintaining what we built, or hand it over to your own team with documentation if you would rather run it yourself.',
    },
    {
      q: 'Can you work with our existing team or code?',
      a: 'Yes. We take over existing codebases and work alongside in-house teams. The first step is a short technical audit so nobody is guessing about what is already there.',
    },
  ],

  about: {
    title: 'A product team, not a body shop.',
    lede:
      'We take a small number of projects at a time, so the people who scoped your product are the people who build it. There is no hand-off to a delivery team you have never met.',
    story: [
      'wlans started in Tashkent as a two-person contract team building Android apps for local businesses. The work that kept coming back was never “build this screen” — it was “this process is broken, make software that fixes it”. That is still the work we take.',
      'Today we are a team of engineers, designers and QA working on mobile applications and the web. We stayed narrow on purpose: two platforms done well beats six done adequately, and we build our own tools in-house when the existing ones are not good enough.',
      'We are deliberately not a large agency. Growth beyond a certain point means the people who sold the project are no longer the people delivering it, and that is the moment quality starts leaking.',
    ],
    values: [
      {
        title: 'We tell you what we think',
        body: 'Including when a feature is a bad idea, when the timeline is unrealistic, or when you do not need us at all.',
      },
      {
        title: 'Working software over reports',
        body: 'Every two weeks you get a build on a real device. Progress is something you hold, not a percentage in a spreadsheet.',
      },
      {
        title: 'One team, start to finish',
        body: 'The engineers in the scoping call are the engineers writing the code. Nothing is lost in translation.',
      },
      {
        title: 'You own everything',
        body: 'Code, repositories, accounts and infrastructure are yours from the first commit. No lock-in.',
      },
    ],
  },

  offices: [
    {
      city: 'Tashkent',
      country: 'Uzbekistan',
      address: 'Amir Temur ko‘chasi 108',
      note: 'Head office',
    },
  ],

  projectTypes: [
    'Mobile app (iOS / Android)',
    'Cross-platform app (Flutter)',
    'Company website',
    'Web application',
    'Work on an app we did not build',
    'Not sure yet',
  ],

  budgetRanges: [
    'Under $300',
    '$300 – $800',
    '$800 – $1,500',
    '$1,500 – $3,000',
    'Over $3,000',
    'Not decided yet',
  ],

  timelines: ['As soon as possible', 'Within 3 months', '3–6 months', 'Just exploring'],

  rnd: {
    eyebrow: 'In-house R&D',
    title: 'We write our own tools when the existing ones are not good enough.',
    body:
      'One of them is an open-source display framework for Arduino-class hardware. It renders to OLED and TFT panels and reports what every frame actually costs on the bus — an SSD1306 over I²C needs about 24 ms per full frame, which caps a sketch near 41 fps no matter how fast the chip is. Most people find that out on hardware, late.',
    ctaLabel: 'See the framework',
  },

  nav: {
    services: 'Services',
    work: 'Portfolio',
    industries: 'Industries',
    company: 'Company',
    rnd: 'R&D',
  },

  serviceGroups: {
    Mobile: 'Mobile',
    Web: 'Web',
  },

  serviceDefs: {
    'mobile-app-development': {
      title: 'Mobile App Development',
      shortTitle: 'Mobile',
      heading: 'Mobile app development',
      headingAccent: 'services',
      summary:
        'End-to-end mobile products: research, design, build and release on both stores, then the support that keeps them alive.',
      points: ['iOS and Android', 'Store submission', 'Post-launch support'],
      lede:
        'We build mobile products from the first sketch to a live listing on the App Store and Google Play. Most of what we ship replaces a process a business already runs badly — on paper, in spreadsheets, or in a group chat.',
      stats: [
        { value: '40+', label: 'Apps developed' },
        { value: '1.2m+', label: 'Users on apps we built' },
        { value: '18', label: 'Engineers working full time' },
        { value: '7yrs', label: 'Average team experience' },
      ],
      techIntro:
        'We pick the stack at the intersection of what the product needs, what your team can maintain, and what will still be supported in three years.',
      tech: {
        nativeIos: {
          name: 'Native iOS',
          body: 'Swift and SwiftUI give the tightest integration with the platform — widgets, App Clips, background processing and the newest APIs on release day.',
        },
        nativeAndroid: {
          name: 'Native Android',
          body: 'Kotlin with Jetpack Compose, tested on the mid-range hardware your users actually carry rather than the flagship on the developer’s desk.',
        },
        crossPlatform: {
          name: 'Cross-platform',
          body: 'Flutter when one codebase genuinely serves both platforms. We say so when it does not — heavy device integration and demanding graphics still favour native.',
        },
        mobileBackend: {
          name: 'Backend for mobile',
          body: 'The API, sync layer and push infrastructure a mobile product needs. Offline-first where the network cannot be trusted.',
        },
      },
      caseStudy: {
        client: 'Delivery platform',
        badge: 'Offline-first',
        body: [
          'Couriers were losing orders in basements and lift shafts, where mobile data drops out for minutes at a time. The existing app assumed a connection and silently discarded anything entered without one.',
          'We rebuilt the client around a local write-ahead queue: every action is recorded on the device first and replayed when the network returns, with conflict resolution on the server.',
          'Failed deliveries fell by roughly a third in the first quarter, and dispatchers stopped reconciling missing jobs by phone at the end of every shift.',
        ],
      },
    },

    'ios-development': {
      title: 'iOS Development',
      shortTitle: 'iOS',
      heading: 'iOS application',
      headingAccent: 'development services',
      summary:
        'Native Swift and SwiftUI apps built to Apple’s guidelines, and shipped through App Review without surprises.',
      points: ['Swift · SwiftUI', 'Widgets and App Clips', 'App Store submission'],
      lede:
        'We build native iOS applications for the Apple ecosystem — iPhone, iPad, Watch and CarPlay where it makes sense. Written in Swift, designed to Apple’s Human Interface Guidelines, and taken through App Review by people who have done it many times.',
      stats: [
        { value: '25+', label: 'iOS apps shipped' },
        { value: '100%', label: 'Passed App Review' },
        { value: '8', label: 'iOS engineers on staff' },
        { value: '6yrs', label: 'Average iOS experience' },
      ],
      techIntro:
        'Everything below is something we run in production today and can still support when the next iOS version lands.',
      tech: {
        swift: {
          name: 'Swift and SwiftUI',
          body: 'Swift is Apple’s native language, and SwiftUI is how modern iOS interfaces are written. Together they give the best performance and the earliest access to new system features.',
        },
        dataSync: {
          name: 'Data and sync',
          body: 'Local persistence that survives an offline flight and reconciles cleanly when the device comes back online.',
        },
        systemIntegration: {
          name: 'System integration',
          body: 'Widgets, App Clips, Live Activities, push notifications and background refresh — the parts that make an app feel native rather than wrapped.',
        },
        quality: {
          name: 'Quality',
          body: 'Automated UI tests and crash reporting from the first TestFlight build, not after the first bad review.',
        },
      },
      caseStudy: {
        client: 'Digital wallet',
        badge: 'Passed audit first attempt',
        body: [
          'A payment flow that had to clear a bank security review before a single real user could touch it. The previous vendor had failed the review twice.',
          'We rebuilt the sensitive path around the Secure Enclave, moved every key out of application storage, and documented the threat model alongside the code so the auditors could follow it.',
          'It passed on the first attempt, and reached 40,000 users in the three months after launch.',
        ],
      },
    },

    'android-development': {
      title: 'Android Development',
      shortTitle: 'Android',
      heading: 'Android application',
      headingAccent: 'development services',
      summary:
        'Kotlin and Jetpack Compose, tuned for the mid-range devices your users actually carry, not just flagships.',
      points: ['Kotlin · Compose', 'Play Store release', 'Low-end device tuning'],
      lede:
        'Android is not one device, it is thousands. We build in Kotlin and test on the hardware your users genuinely own — which in most markets means a three-year-old phone with 3GB of RAM, not the newest Pixel.',
      stats: [
        { value: '30+', label: 'Android apps shipped' },
        { value: '2GB', label: 'Lowest RAM target tested' },
        { value: '9', label: 'Android engineers on staff' },
        { value: 'API 24', label: 'Typical minimum supported' },
      ],
      techIntro:
        'Chosen for maintainability first. An exotic library that saves a week now can cost a rewrite when it stops being maintained.',
      tech: {
        kotlin: {
          name: 'Kotlin and Compose',
          body: 'Jetpack Compose is the modern way to build Android interfaces, and Kotlin coroutines make asynchronous work readable rather than nested.',
        },
        architecture: {
          name: 'Architecture',
          body: 'A layered structure that survives a team change: clear boundaries between UI, domain and data, with dependency injection wiring them together.',
        },
        performance: {
          name: 'Performance',
          body: 'Startup time, frame pacing and memory measured on real low-end devices. A 200ms cold start on a flagship can be 2 seconds on the phone your users have.',
        },
        distribution: {
          name: 'Distribution',
          body: 'Play Console setup, staged rollouts and pre-launch reports, so a bad build reaches 1% of users rather than all of them.',
        },
      },
      caseStudy: {
        client: 'Field service',
        badge: 'Job closure -35%',
        body: [
          'Engineers were filing reports from memory at the end of the day, so half the useful detail never made it into the system.',
          'We built an Android client that captures the report on site — photos, readings and signatures — and syncs when the van reaches coverage. It runs on the rugged handsets the field team already had.',
          'Average job closure time fell by 35%, and the office stopped chasing missing paperwork.',
        ],
      },
    },

    'cross-platform-development': {
      title: 'Cross-Platform Development',
      shortTitle: 'Cross-platform',
      heading: 'Cross-platform app',
      headingAccent: 'development',
      summary:
        'One Flutter codebase when it genuinely fits — and an honest recommendation when it does not.',
      points: ['Flutter · Dart', 'Shared design system', 'Platform channels'],
      lede:
        'Cross-platform is a trade, not a free win. When a product is mostly forms, lists and API calls on both platforms, Flutter can halve the build. When it leans on device hardware or platform-specific UX, native is cheaper in the long run. We tell you which one you have.',
      stats: [
        { value: '~60%', label: 'Typical code shared' },
        { value: '2x', label: 'Faster to both stores' },
        { value: '15+', label: 'Flutter apps shipped' },
        { value: '1', label: 'Design system, both platforms' },
      ],
      techIntro:
        'Flutter gives one rendering engine on both platforms, so a screen looks and behaves identically without maintaining two implementations.',
      tech: {
        flutter: {
          name: 'Flutter and Dart',
          body: 'A single codebase compiled to native ARM on both platforms. The rendering is Flutter’s own, so there is no drift between iOS and Android layouts.',
        },
        state: {
          name: 'State and architecture',
          body: 'Predictable state management that scales past the toy-app stage, with the same patterns applied across the whole team.',
        },
        bridges: {
          name: 'Native bridges',
          body: 'Platform channels for the parts Flutter does not cover — hardware access, platform SDKs and native background work.',
        },
        release: {
          name: 'Release',
          body: 'One pipeline building and signing both platforms, so a release is one action rather than two half-remembered checklists.',
        },
      },
      caseStudy: {
        client: 'Learning platform',
        badge: 'Completion doubled',
        body: [
          'Students in regions with patchy internet could not finish a single video lesson. The web player assumed bandwidth that simply was not there.',
          'We built a Flutter client with downloadable lessons, resumable transfers and progress that syncs whenever a connection appears.',
          'Course completion doubled within a term, and the same codebase serves both platforms with one team.',
        ],
      },
    },

    'web-app-development': {
      title: 'Web Development',
      shortTitle: 'Web',
      heading: 'Website and web app',
      headingAccent: 'development',
      summary:
        'Company websites, customer portals and admin panels — the pages your customers judge you by and the dashboard your team uses daily.',
      points: ['Corporate websites', 'React · Next.js', 'Admin panels'],
      lede:
        'Most business software is a web application, and most of it is unpleasant to use. We build the internal tools and customer portals people spend their working day inside, with the loading, error and empty states designed rather than left to chance.',
      stats: [
        { value: '35+', label: 'Web products delivered' },
        { value: '<1.5s', label: 'Typical load on 4G' },
        { value: '95+', label: 'Lighthouse target' },
        { value: 'WCAG AA', label: 'Accessibility baseline' },
      ],
      techIntro:
        'Server-rendered by default, interactive where interaction is genuinely needed. Most dashboards ship far more JavaScript than they use.',
      tech: {
        react: {
          name: 'React and Next.js',
          body: 'Server components keep the client bundle small; the interactive parts stay interactive. The result loads fast on a phone, not only on a developer laptop.',
        },
        dataLayer: {
          name: 'Data layer',
          body: 'Server-driven tables — search, filter, sort and paginate on the backend, so a page with fifty thousand rows behaves like a page with fifty.',
        },
        designSystem: {
          name: 'Design system',
          body: 'A token-based system so every screen in the product agrees on spacing, colour and behaviour, and a new page takes hours rather than days.',
        },
        quality: {
          name: 'Quality',
          body: 'End-to-end tests on the flows that would cost money if they broke, plus contrast and keyboard checks in CI rather than at the end.',
        },
      },
      caseStudy: {
        client: 'Retail loyalty',
        badge: 'Repeat purchases +22%',
        body: [
          'A loyalty card nobody carried, in a business that could not see who its repeat customers actually were.',
          'We replaced it with a web portal for the operations team and a lightweight customer app, sharing one API and one identity model.',
          'Repeat purchase rate rose 22% over two quarters, and the marketing team could finally segment by real behaviour.',
        ],
      },
    },




  },

  ui: {
    skipToContent: 'Skip to content',
    mainNav: 'Main',
    footerNav: 'Footer',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    contact: 'Contact',
    notSureWhichOne: 'Not sure which one you need?',
    writeToUs: 'Write to us',
    back: 'Back',
    loading: 'Loading',

    learnMore: 'Learn more',
    allProjects: 'All projects',
    allServices: 'All services',
    viewMoreProjects: 'View more projects',
    readCaseStudy: 'Read the case study',
    bookCall: 'Book a call',
    orderProject: 'Order a project',
    seeRelatedWork: 'See related work',
    homeCrumb: 'Home',
    portfolioCrumb: 'Portfolio',

    home: {
      servicesEyebrow: 'What we do',
      servicesTitle: 'Mobile and web,',
      servicesAccent: 'done properly.',
      servicesLede:
        'Two things, not ten. Native apps for iOS and Android, one Flutter codebase where that fits, and the websites and web applications around them.',
      workEyebrow: 'Selected work',
      workTitle: 'Apps we built that people',
      workAccent: 'actually use.',
      workLede:
        'Every project is written the same way: what made it hard, what we chose, and what measurably changed.',
      industriesEyebrow: 'Industries',
      industriesTitle: 'We have shipped in these',
      industriesAccent: 'before.',
      industriesLede:
        'Domain knowledge shortens a project more than any framework does. These are the areas where we already know the traps.',
      processEyebrow: 'How we work',
      processTitle: 'What happens after you',
      processAccent: 'send the form.',
      processLede:
        'The question every first-time client actually has. Two-week cycles, a working build at the end of each one, and a written scope before anyone writes code.',
      clientsEyebrow: 'Clients',
      clientsTitle: 'What people say about',
      clientsAccent: 'working with us.',
      stackEyebrow: 'Technology',
      stackTitle: 'We use the tools that fit,',
      stackAccent: 'not the ones in fashion.',
      stackLede:
        'Every choice below is one we run in production and can support two years from now.',
      faqEyebrow: 'Questions',
      faqTitle: 'Answers to what people',
      faqAccent: 'ask first.',
      ctaTitle: 'Have an idea? Let us tell you what it takes.',
      ctaLede:
        'Tell us what the product has to do. We reply with a read on scope and a rough range.',
    },

    servicesPage: {
      eyebrow: 'Services',
      title: 'Mobile and web,',
      accent: 'done properly.',
      lede:
        'We build mobile applications and the web around them. We do not sell infrastructure, DevOps or standalone design work — when a project needs those, we say so and tell you who does.',
      industriesEyebrow: 'Industries',
      industriesTitle: 'We have shipped in these',
      industriesAccent: 'before.',
      processEyebrow: 'How we work',
      processTitle: 'Six stages, and you see',
      processAccent: 'a build in every one.',
      stackEyebrow: 'Technology',
      stackTitle: 'What we build with.',
      faqEyebrow: 'Questions',
      faqTitle: 'Answers to what people',
      faqAccent: 'ask first.',
      ctaTitle: 'Not sure which of these you need?',
      ctaLede:
        'Describe the problem and we will tell you which one fits — including when the answer is that we are not the right team.',
    },

    industriesPage: {
      eyebrow: 'Industries',
      title: 'We have shipped in these',
      accent: 'before.',
      lede:
        'Domain knowledge shortens a project more than any framework does. Knowing that a courier app has to survive a lift shaft, or that a clinic schedules rooms as well as staff, is the difference between a first version that works and a third one that finally does.',
      workEyebrow: 'Related work',
      workTitle: 'What that looks like in',
      workAccent: 'practice.',
      processEyebrow: 'How we work',
      processTitle: 'Six stages, and you see',
      processAccent: 'a build in every one.',
      faqEyebrow: 'Questions',
      faqTitle: 'Answers to what people',
      faqAccent: 'ask first.',
      ctaTitle: 'Working in a sector not listed here?',
      ctaLede:
        'The domain is rarely the hard part. Describe the process you need replaced and we will tell you what it takes.',
    },

    companyPage: {
      eyebrow: 'Company',
      title: 'A product team,',
      accent: 'not a body shop.',
      storyEyebrow: 'Our story',
      valuesEyebrow: 'How we think',
      valuesTitle: 'Four things we will not',
      valuesAccent: 'compromise on.',
      processEyebrow: 'How we work',
      processTitle: 'Six stages, and you see',
      processAccent: 'a build in every one.',
      processLede:
        'No stage ends with a status report. Each one ends with something you can open, click and judge for yourself.',
      clientsEyebrow: 'Clients',
      clientsTitle: 'What people say about',
      clientsAccent: 'working with us.',
      whereToFindUs: 'Where to find us',
      talkToUs: 'Talk to us',
      telegram: 'Telegram',
      email: 'Email',
      phone: 'Phone',
      hours: 'Working hours',
    },

    contactPage: {
      eyebrow: 'Order a project',
      title: 'Tell us what you are',
      accent: 'building.',
      lede:
        'A short brief is enough to start. We reply with an honest read on scope, a rough range, and whether we are the right team for it — including when the answer is no.',
      briefTitle: 'Project brief',
      preferToTalk: 'Prefer to talk?',
      telegram: 'Telegram',
      email: 'Email',
      phone: 'Phone',
      whatHappensNext: 'What happens next',
      beforeYouWrite: 'Before you write',
      beforeYouWriteBody:
        'You do not need a specification. The most useful brief answers three things: who the users are, what they cannot do today, and what has to be true for the project to count as a success. Everything else we work out together.',
    },

    workPage: {
      eyebrow: 'Portfolio',
      title: 'Apps we built that people',
      accent: 'actually use.',
      lede:
        'Filter by industry. Every project is written the same way: what made it hard, what we chose, and what measurably changed.',
      ctaTitle: 'Want something like this built?',
      ctaLede:
        'Tell us what the product has to do. We reply with a read on scope and a rough range.',
    },

    tabs: {
      home: 'Home',
      services: 'Services',
      work: 'Work',
      company: 'About',
      contact: 'Contact',
    },

    rndPage: {
      frameworkTitle: 'The display framework',
      frameworkBody:
        'A 1-bit rendering core for OLED and TFT panels. It tracks dirty regions so a small change pushes a handful of bytes instead of a full frame, and it reports the real cost of every flush on the configured bus.',
      panelBody:
        'The panel beside this text is the same engine, compiled to TypeScript and running in your browser. The numbers under it are measured, not decorative.',
      cta: 'Talk to us about a project',
    },

    caseStudy: {
      problemEyebrow: 'The problem',
      problemTitle: 'What made it',
      problemAccent: 'hard.',
      choiceEyebrow: 'What we chose',
      choiceTitle: 'The decisions that',
      choiceAccent: 'mattered.',
      changedEyebrow: 'What changed',
      changedTitle: 'Measured after',
      changedAccent: 'release.',
      moreEyebrow: 'More work',
      moreTitle: 'Other things we have',
      moreAccent: 'shipped.',
      ctaTitle: 'Have a problem shaped like this one?',
      orderLikeThis: 'Order a project like this',
      timeline: 'Timeline',
      team: 'Team',
      platforms: 'Platforms',
      stack: 'Stack',
      result: 'Result',
    },

    serviceDetail: {
      statsTitleLead: 'Bring your',
      statsTitleAccent: 'to life',
      statsTitleTail: 'idea with the wlans team.',
      techEyebrow: 'Technology',
      techTitle: 'What we build it',
      techAccent: 'with.',
      caseEyebrow: 'Case study',
      caseTitle: 'Successfully developed',
      caseAccent: 'applications',
      processEyebrow: 'How we work',
      processTitle: 'Six stages, and you see',
      processAccent: 'a build in every one.',
      relatedEyebrow: 'Related',
      relatedTitle: 'Other things we build.',
      faqEyebrow: 'Questions',
      faqTitle: 'Answers to what people',
      faqAccent: 'ask first.',
    },

    gallery: {
      filterProjects: 'Filter projects',
      emptyCategory: 'No projects in this category yet.',
      caseStudyBadge: 'Case study',
      appStore: 'App Store',
      googlePlay: 'Google Play',
    },

    rail: {
      previous: 'Previous reviews',
      next: 'More reviews',
      playVideo: 'Play video',
      videoReview: 'Video review',
      ratingLabel: 'out of 5',
    },

    form: {
      name: 'Your name',
      namePlaceholder: 'Aziz Karimov',
      email: 'Email',
      emailPlaceholder: 'you@company.com',
      company: 'Company',
      companyPlaceholder: 'Company name',
      contact: 'Phone or Telegram',
      contactPlaceholder: '+998 90 000 00 00 or @username',
      contactHint: 'Optional — often faster than email',
      optional: 'Optional',
      projectType: 'What do you need?',
      budget: 'Budget',
      timeline: 'Timeline',
      message: 'About the project',
      messagePlaceholder:
        'We run a delivery business and our couriers still work from paper lists…',
      submit: 'Send the brief',
      submitting: 'Sending…',
      successTitle: 'Thank you — your brief is in.',
      successBody: 'We reply within one working day.',
      errorTitle: 'That did not send. Please try again.',
      website: 'Website',
    },

    notices: {
    notFound: 'That page does not exist, or it has moved. Everything we build is one tap away below.',
      placeholderProjects:
        'Placeholder projects with generated artwork. Real clients and screenshots go in',
      placeholderQuotes:
        'Placeholder quotes. Replace with real, attributable reviews or remove the section — an invented testimonial is a fabricated credential.',
      placeholderFigures: 'Figures below are placeholders — replace in',
      placeholderProject:
        'Placeholder project. Replace the narrative, figures and artwork in',
    },
  },
}
