import type { Dictionary } from '../dictionary'

/* Oʻzbekcha — saytning asosiy tili.
   Uslub inglizcha manba bilan bir xil: toʻgʻridan-toʻgʻri, aniq, ortiqcha
   sifatlashlarsiz. Texnologiya nomlari tarjima qilinmaydi. */
export const uz: Dictionary = {
  company: {
    tagline: 'Biz ishlaydigan mobil ilovalar quramiz.',
    address: 'Amir Temur koʻchasi 108, Toshkent, Oʻzbekiston',
    workingHours: 'Dush–Jum, 09:00–18:00 (UTC+5)',
    responseTime: 'Bir ish kuni ichida javob beramiz.',
  },

  showreel: {
    title: 'wlans nima qiladi',
    caption: 'wlans nima qilishini koʻring',
  },

  hero: {
    titleLead: 'Biz ishlaydigan',
    titleAccent: 'mobil ilovalar quramiz.',
    lede:
      'wlans — Toshkentdagi mahsulot muhandisligi jamoasi. Mobil va veb mahsulotlarni birinchi suhbatdan tirik relizgacha olib boramiz — va reliz ortidan ham qolamiz, chunki asosiy ish oʻsha yerdan boshlanadi.',
    primaryCta: 'Loyiha buyurtma qilish',
    secondaryCta: 'Ishlarimizni koʻrish',
    trust: [
      'iOS, Android va Flutter',
      'Bitta jamoa: skopdan relizgacha',
      'Relizdan keyingi qoʻllab-quvvatlash',
    ],
  },

  proof: [
    { value: '40+', label: 'Yetkazilgan mahsulot' },
    { value: '7', label: 'Yil tajriba' },
    { value: '18', label: 'Shtatdagi muhandis' },
    { value: '9', label: 'Xizmat koʻrsatilgan davlat' },
  ],


  industries: {
    fintech: {
      title: 'Fintex',
      body: 'Toʻlovlar, hamyonlar va kredit ilovalari — demo kuni uchun emas, xavfsizlik auditidan oʻtish uchun qurilgan.',
    },
    logistics: {
      title: 'Logistika',
      body: 'Yoʻl oʻrtasida signal yoʻqolganda ham ishlashda davom etadigan haydovchi ilovalari va dispetcher vositalari.',
    },
    retail: {
      title: 'Savdo va e-tijorat',
      body: 'Onlayn doʻkonlar, sodiqlik dasturlari va doʻkon ichidagi vositalar — checkout konversiyaga sozlangan.',
    },
    health: {
      title: 'Tibbiyot',
      body: 'Klinikaga yozilish, telemeditsina va bemor yozuvlari — talab qilinadigan maxfiylik darajasi bilan.',
    },
    education: {
      title: 'Taʼlim',
      body: 'Oflayn darslar, progress kuzatuvi va halol analitikaga ega oʻquv platformalari.',
    },
    enterprise: {
      title: 'Korxona',
      body: 'Bitta jadval va WhatsApp guruhini bitta tizim bilan almashtiradigan ichki vositalar.',
    },
  },

  workCategories: {
    all: 'Barcha loyihalar',
    fintech: 'Fintex',
    logistics: 'Logistika',
    health: 'Tibbiyot',
    retail: 'E-tijorat',
    education: 'Taʼlim',
    enterprise: 'Korxona',
  },

  work: {
    'delivery-platform': {
      client: 'Yetkazib berish platformasi',
      industry: 'Logistika',
      summary:
        'Kuryerlar zaxira xonalari va liftlarda buyurtmalarni yoʻqotardi — u yerda tarmoq bir necha daqiqaga uzilib qoladi. Mijoz ilovasini oflayn-birinchi navbat asosida qayta qurdik.',
      result: 'Yetkazilmagan buyurtmalar uchdan biriga kamaydi.',
      voice: {
        name: 'Mijoz nomi',
        role: 'Operatsiyalar direktori',
        quote:
          'Kuryerlarimiz kiradigan binolarda haqiqatan ishlagan birinchi versiya. Dispetcherlar yoʻqolgan ishlarni telefon orqali solishtirishni toʻxtatdi.',
      },
      challenge: [
        'Kuryerlar har smenaning katta qismini qamrov tashqarisida oʻtkazardi — zaxira xonalari, lift shaxtalari, yerosti avtoturargohlari. Avvalgi ilova tarmoq doim bor deb hisoblardi, shuning uchun zaxira xonasida kiritilgan status oddiygina yoʻqolardi va dispetcher buni faqat mijoz qoʻngʻiroq qilganda bilardi.',
        'Operatsion narx yoʻqolgan yangilanishning oʻzida emas edi. Gap shundaki, hech kim muvaffaqiyatsiz tugagan ishni yangilanishi yetib kelmagan ishdan ajrata olmasdi — shuning uchun har bir anomaliya telefon qoʻngʻirogʻiga aylanardi.',
      ],
      approach: [
        {
          title: 'Oflayn-birinchi navbat',
          body: 'Kuryerning har bir amali avval lokal navbatga yoziladi va qamrov qaytganda server bilan solishtiriladi. Interfeys lokal holatni darhol koʻrsatadi, shuning uchun radio oʻchiq boʻlganda ham ilova qotib qolgandek koʻrinmaydi.',
        },
        {
          title: 'Konflikt soʻrovlari emas, konflikt qoidalari',
          body: 'Bitta ishga ikki qurilma tegishi mumkin. Kuryerdan telefon ekranida birlashtirishni hal qilishni soʻrash oʻrniga, server har bir maydon uchun aniq qoida qoʻllaydi va nimani rad etganini yozib qoʻyadi.',
        },
        {
          title: 'Koʻrinadigan sinxronizatsiya holati',
          body: 'Har bir ish oʻz sinx belgisini olib yuradi. Dispetcher yangilanish yoʻqolgan deb oʻylash oʻrniga uning kutilayotganini koʻradi — telefon trafigining katta qismini aynan shu olib tashladi.',
        },
      ],
      outcomes: [
        { value: '-33%', label: 'Yetkazilmagan buyurtmalar' },
        { value: '4.7 / 4.5', label: 'Store reytingi, iOS / Android' },
        { value: 'Nol', label: 'Qamrov uzilishi tufayli yoʻqolgan yangilanish' },
      ],
      facts: {
        timeline: 'Birinchi relizgacha 5 oy',
        team: '4 muhandis, 1 dizayner',
        platforms: 'iOS · Android · Dispetcher vebi',
      },
    },

    'digital-wallet': {
      client: 'Raqamli hamyon',
      industry: 'Fintex',
      summary:
        'Bitta foydalanuvchi tegishidan avval bank xavfsizlik auditidan oʻtishi shart boʻlgan toʻlov oqimi. Avvalgi ijrochi ikki marta oʻta olmagan edi.',
      result: 'Audit birinchi urinishda oʻtdi; uch oyda 40 ming foydalanuvchi.',
      voice: {
        name: 'Mijoz nomi',
        role: 'CTO',
        quote:
          'Ular tahdid modelini kod bilan birga hujjatlashtirdi. Auditorlar uni kuzata oldi — birinchi urinishda oʻtganining sababi shu.',
      },
      challenge: [
        'Mahsulot bank xavfsizlik auditidan oʻtmaguncha ishga tushira olmasdi, ikkita avvalgi ijrochi esa bu auditdan oʻta olmagandi. Har bir muvaffaqiyatsizlik bitta reliz oynasini yoʻqotgan va mijoz muddatga ishonishni toʻxtatgan edi.',
        'Audit faqat kod haqida emas edi. Auditorlarga tahdid modelini kuzatish, har bir nazoratni talabgacha bogʻlash va mantiqni koʻrish kerak edi — buni avvalgi hech bir topshiriq imkoniyat bermagan.',
      ],
      approach: [
        {
          title: 'Avval tahdid modeli',
          body: 'Bironta ekran qurilishidan avval hujumchi nima qilishga urinishini, har bir nazorat nima uchun kerakligini va nima aniq skop tashqarisida ekanini yozib qoʻydik. Hujjat topshiriq uchun emas, kod bilan birga yuritildi.',
        },
        {
          title: 'Ikkala platformada native',
          body: 'Kalit saqlash, biometrik soʻrovlar va sertifikat pinlash iOS va Android’da har xil ishlaydi. Bu qatlamni umumiylashtirish auditorlarga platforma primitivini emas, oʻrama qatlamni tushuntirish demak edi.',
        },
        {
          title: 'Audit izi — funksiya sifatida',
          body: 'Toʻlovdagi har bir holat oʻzgarishi ijrochi va sababi bilan yoziladi. Bu auditni qisqartirdi va qoʻllab-quvvatlash jamoasi uni har kuni ishlatadi.',
        },
      ],
      outcomes: [
        { value: 'Birinchi urinish', label: 'Bank xavfsizlik auditi' },
        { value: '40 ming', label: 'Uch oydagi foydalanuvchi' },
        { value: '4.8 / 4.6', label: 'Store reytingi, iOS / Android' },
      ],
      facts: {
        timeline: 'Audit tasdigʻigacha 7 oy',
        team: '5 muhandis, 1 xavfsizlik yetakchisi',
        platforms: 'iOS · Android',
      },
    },

    'clinic-booking': {
      client: 'Klinikaga yozilish',
      industry: 'Tibbiyot',
      summary:
        'Qabulxona qogʻoz va telefon qoʻngʻiroqlarida ishlardi va koʻp hafta muolaja xonalarini ikki marta band qilardi. Xona, xodim va uskuna alohida cheklangan resurslarga aylandi.',
      result: 'Jadval konfliktlari yoʻqoldi; yozilishlarning 60% oʻz-oʻziga xizmat.',
      voice: {
        name: 'Mijoz nomi',
        role: 'Klinika direktori',
        quote:
          'Endi jadval tuzuvchi imkonsiz bandlovni yarata olmaydi. Shu bitta oʻzgarish haftalik janjalni olib tashladi.',
      },
      challenge: [
        'Qabulxona qogʻoz va telefon qoʻngʻiroqlarida ishlardi. Muolaja xonalari koʻp hafta ikki marta band qilinardi va yechim doim bir xil edi: kimdir tajribali xodim kunni qoʻlda qayta tuzardi.',
        'Klinika sinab koʻrgan jadval dasturi bandlovni bitta resurs deb hisoblardi. Aslida bitta seansga xona, mutaxassis va baʼzan aniq bir uskuna kerak — har birining oʻz bandligi bilan.',
      ],
      approach: [
        {
          title: 'Uchta cheklangan resurs',
          body: 'Xona, xodim va uskuna alohida modellashtiriladi va slot faqat uchalasi boʻsh boʻlgandagina mavjud boʻladi. Imkonsiz bandlov keyin ushlanadigan xato boʻlishdan toʻxtab, tizim umuman ifodalay olmaydigan holatga aylandi.',
        },
        {
          title: 'Qabulxona ishonadigan oʻz-oʻziga yozilish',
          body: 'Bemorlar qabulxona ishlatadigan cheklov mexanizmiga qarshi yoziladi, shuning uchun onlayn bandlov keyin odam yechishi kerak boʻlgan konflikt yarata olmaydi.',
        },
        {
          title: 'Ish kuni uchun qurilgan kalendar',
          body: 'Koʻchirish uchun sudrash, tasdiqlash uchun klaviatura va kim nimani oʻzgartirganining koʻrinadigan yozuvi — qabulxona uchun emas, qabulxona bilan birga loyihalangan.',
        },
      ],
      outcomes: [
        { value: 'Nol', label: 'Jadval konfliktlari' },
        { value: '60%', label: 'Oʻz-oʻziga xizmat yozilishlari' },
        { value: '4.6 / 4.4', label: 'Store reytingi, iOS / Android' },
      ],
      facts: {
        timeline: 'Birinchi klinikagacha 4 oy',
        team: '3 muhandis, 1 dizayner',
        platforms: 'iOS · Android · Qabulxona vebi',
      },
    },

    'retail-loyalty': {
      client: 'Savdo sodiqlik dasturi',
      industry: 'Savdo',
      summary:
        'Hech kim olib yurmaydigan sodiqlik kartasi — biznes esa qaytib keluvchi mijozlarini koʻra olmasdi. Bitta API, bitta identifikatsiya modeli, portal va ilova.',
      result: 'Takroriy xarid darajasi ikki chorakda 22% oʻsdi.',
      challenge: [
        'Sodiqlik dasturi deyarli hech kim olib yurmaydigan plastik kartada yashardi. Biznes tranzaksiyalarni koʻrardi, mijozlarni emas — shuning uchun birinchi tashrifni ellikinchisidan ajrata olmasdi.',
        'Ikkita alohida tizim allaqachon mijoz identifikatsiyasiga egalik daʼvo qilardi va ikkalasi ham odam kimligi haqida bir-biriga rozi emas edi.',
      ],
      approach: [
        {
          title: 'Bitta identifikatsiya, bitta API',
          body: 'Kassada ham, ilovada ham telefon raqami orqali aniqlanadigan yagona mijoz yozuvi — eski tizimlar unga raqobat qilish oʻrniga undan oʻqiydi.',
        },
        {
          title: 'Umumiy klient, ikkita sirt',
          body: 'Ilova va xodimlar portali bir xil ish qiladigan joyda bitta kodbaza, faqat kassa oqimi mijoz oqimidan haqiqatan farq qiladigan joyda ajraladi.',
        },
        {
          title: 'Kassada koʻrinadigan yigʻim',
          body: 'Bonus balansi tunda emas, xarid paytida yangilanadi. Ilovani ochishga arziydigan qilgan narsa aynan shu bitta kechikish oʻzgarishi.',
        },
      ],
      outcomes: [
        { value: '+22%', label: 'Takroriy xarid darajasi' },
        { value: '2 chorak', label: 'Shu natijagacha vaqt' },
        { value: '4.5 / 4.3', label: 'Store reytingi, iOS / Android' },
      ],
      facts: {
        timeline: '5 oy',
        team: '3 muhandis, 1 dizayner',
        platforms: 'iOS · Android · Xodimlar portali',
      },
    },

    'learning-platform': {
      client: 'Oʻquv platformasi',
      industry: 'Taʼlim',
      summary:
        'Internet uzuq-yuluq boʻlgan hududlardagi talabalar bitta video darsni ham tugata olmasdi. Yuklab olinadigan va davom ettiriladigan darslar buni hal qildi.',
      result: 'Kurs tugatish koʻrsatkichi ikki barobar oshdi.',
      voice: {
        name: 'Mijoz nomi',
        role: 'Mahsulot boshligʻi',
        quote:
          'Ular oʻtgan jamoa kabi pleyerni yana qayta loyihalash oʻrniga haqiqiy muammoni — kanal kengligini — hal qildi.',
      },
      challenge: [
        'Internet uzuq-yuluq boʻlgan hududlardagi talabalar bitta video darsni ham tugata olmasdi. Uzilgan aloqa oqimni qaytadan boshlardi va traffik tugaguncha oʻsha uch daqiqa qayta-qayta koʻrilardi.',
        'Avvalgi jamoa bunga pleyerni ikki marta qayta loyihalash bilan javob bergan edi. Muammo hech qachon pleyerda emasdi.',
      ],
      approach: [
        {
          title: 'Avval yuklab ol, keyin koʻr',
          body: 'Darslar oldindan olinadi va qurilmada saqlanadi. Ijro tarmoqqa umuman tegmaydi, shuning uchun aloqa tugasa ham dars tugaydi.',
        },
        {
          title: 'Davom ettiriladigan yuklamalar',
          body: 'Yuklamalar qaytadan boshlash oʻrniga toʻxtagan baytdan davom etadi — ishonchsiz aloqada katta darsni yetkazib beradigan narsa aynan shu.',
        },
        {
          title: 'Halol progress',
          body: 'Progress qurilma onlayn boʻlganda sinxronlanadi va shu vaqtgacha qurilmadagi yozuv asosiy hisoblanadi, shuning uchun talabaga qilgan ishini yoʻqotgani hech qachon aytilmaydi.',
        },
      ],
      outcomes: [
        { value: '2x', label: 'Kurs tugatish' },
        { value: '4.7 / 4.7', label: 'Store reytingi, iOS / Android' },
        { value: '~70%', label: 'Oflayn koʻrilgan darslar' },
      ],
      facts: {
        timeline: '6 oy',
        team: '4 muhandis, 1 dizayner',
        platforms: 'iOS · Android',
      },
    },

    'field-service': {
      client: 'Dala xizmati',
      industry: 'Korxona',
      summary:
        'Muhandislar hisobotlarni kun oxirida xotiradan toʻldirardi, shuning uchun tafsilotning yarmi yoʻqolardi. Joyida yozib olish va furgon qamrovga chiqqanda sinxronlash.',
      result: 'Ish yopish vaqti 35% qisqardi.',
      challenge: [
        'Muhandislar ishlarini kun oxirida xotiradan yozardi. Oʻshangacha tafsilotning yarmi yoʻqolardi va hisobotning kafolat daʼvolari uchun eng muhim qismlari koʻpincha yetishmasdi.',
        'Joydagi qamrov ishonchsiz edi, shuning uchun ishni yozish uchun jonli aloqa talab qiladigan har qanday vosita daftar foydasiga eʼtiborsiz qoldirilishi aniq edi.',
      ],
      approach: [
        {
          title: 'Joyida yozib olish',
          body: 'Suratlar, koʻrsatkichlar va detal raqamlari ish joyida, qurilmada, tarmoqsiz yoziladi. Hisobot muhandis ketishidan avval tugaydi.',
        },
        {
          title: 'Furgon qamrovga chiqqanda sinxronlash',
          body: 'Yuklamalar ishlatsa boʻladigan aloqa paydo boʻlishi bilan fonda ishlaydi, katta surat toʻplamlari esa boʻlaklarga ajratiladi — shuning uchun qisqa oyna ham foydali.',
        },
        {
          title: 'Ofis ham xuddi shu modelda',
          body: 'Veb tomon oʻsha yozuvlarni oʻqiydi, shuning uchun dalada yopilgan ish tungi importsiz hamma joyda yopiq boʻladi.',
        },
      ],
      outcomes: [
        { value: '-35%', label: 'Ish yopish vaqti' },
        { value: '4.4', label: 'Store reytingi, Android' },
        { value: '100%', label: 'Joyida toʻldirilgan hisobotlar' },
      ],
      facts: {
        timeline: '5 oy',
        team: '3 muhandis',
        platforms: 'Android · Ofis vebi',
      },
    },
  },

  process: [
    {
      title: 'Suhbat',
      body: '30 daqiqalik qoʻngʻiroq. Siz muammoni tasvirlaysiz; biz toʻgʻri jamoa ekanimizni va taxminan nima talab qilinishini halol aytamiz.',
      duration: '1-kun',
    },
    {
      title: 'Skoplash',
      body: 'Sotuv taqdimoti emas, ishchi sessiya. Siz yozma skop, narx oraligʻi va hali bilmagan narsalarimiz roʻyxati bilan chiqasiz.',
      duration: '1-hafta',
    },
    {
      title: 'Dizayn',
      body: 'Prodakshn kod paydo boʻlishidan avval bosib koʻrsa boʻladigan oqim va ekranlar. Prototipni oʻzgartirish arzon; chiqarilgan ilovani oʻzgartirish emas.',
      duration: '2–4 hafta',
    },
    {
      title: 'Qurish',
      body: 'Ikki haftalik sikllar, har birining oxirida ishlaydigan build. Siz progressni hisobotdan emas, qurilmadan koʻrasiz.',
      duration: 'Doimiy',
    },
    {
      title: 'Reliz',
      body: 'Store’ga joylash, koʻrikni oʻtkazish va haqiqiy foydalanuvchilarning birinchi haftalari — muhim xatolar aynan shu yerda chiqadi.',
      duration: 'Ishga tushirish',
    },
    {
      title: 'Qoʻllab-quvvatlash',
      body: 'Kraş monitoringi, tuzatishlar va keyingi yoʻl xaritasi. Mahsulot hayotining koʻp qismi 1.0 versiyadan keyin oʻtadi.',
      duration: 'Doimiy',
    },
  ],

  stackGroups: {
    mobile: 'Mobil',
    web: 'Veb',
    backend: 'Backend',
  },

  testimonials: [
    {
      quote:
        'Ular birinchi haftadayoq funksiyalar roʻyxatimizning yarmiga qarshi chiqdi va hammasida haq edi. Rejadan ikki oy oldin ishga tushdik.',
      name: 'Mijoz nomi',
      role: 'Direktor, Kompaniya',
    },
    {
      quote:
        'Build haydovchilarimiz haqiqatda ishlatadigan arzon Android telefonlarda ishladi. Avvalgi har bir ijrochi iPhone’da sinab, tugadi degan edi.',
      name: 'Mijoz nomi',
      role: 'Operatsiyalar direktori, Kompaniya',
    },
    {
      quote:
        'Men uchun eng qadrlisi loyihani skoplagan odamlar uni qurgan odamlar boʻlgani. Hech narsa topshiriqda yoʻqolmadi.',
      name: 'Mijoz nomi',
      role: 'Asoschi, Kompaniya',
    },
    {
      quote:
        'Ular relizdan keyin ham qoldi. Haqiqiy foydalanuvchilarning birinchi oyi hech kim kutmagan muammolarni chiqardi va ular bir necha kunda tuzatildi.',
      name: 'Mijoz nomi',
      role: 'Mahsulot yetakchisi, Kompaniya',
    },
    {
      quote:
        'Ikki haftalik build’lar kengashga slayd emas, haqiqiy progressni koʻrsatish imkonini berdi. Shuning oʻzi hamkorlikni oqladi.',
      name: 'Mijoz nomi',
      role: 'Moliya direktori, Kompaniya',
    },
  ],

  faq: [
    {
      q: 'Ilova qancha turadi?',
      a: 'Biz oladigan koʻpchilik loyihalar $300 dan $3 000 gacha oraliqda. Oraliq keng, chunki uni platforma emas, skop belgilaydi: bitta maqsadli ilova quyi chetda, admin paneli bilan koʻp rolli mahsulot yuqori chetda turadi. Skoplash sessiyasidan keyin qanday farazlarga tayanganini koʻrsatgan yozma baho beramiz — va qaysi qismlarni qisqartirsa boʻlishini aytamiz.',
    },
    {
      q: 'Qancha vaqt oladi?',
      a: 'Birinchi reliz odatda 3–5 oy: 2–4 hafta dizayn, keyin ikki haftalik qurish sikllari. Har ikki haftada haqiqiy qurilmada ishlaydigan build olasiz — progress oʻqiladigan narsa emas, ushlanadigan narsa.',
    },
    {
      q: 'Kod menikimi?',
      a: 'Ha. Manba kod, repozitoriylar, store akkauntlari va infratuzilma birinchi kundan sizniki, imkon boricha oʻz akkauntlaringizda. Hech qanday bogʻlanish yoʻq va bizga toʻlab turadigan litsenziya ham yoʻq.',
    },
    {
      q: 'Native yoki kross-platforma?',
      a: 'Mahsulotga bogʻliq. Qurilma bilan chuqur integratsiya, ogʻir grafika yoki platformaga xos UX native foydasiga. Ikkala platformadagi odatiy biznes ilovalar odatda Flutter foydasiga. Biz oʻzimizga yoqqanini emas, birini tavsiya qilamiz va murosani tushuntiramiz.',
    },
    {
      q: 'Relizdan keyin nima boʻladi?',
      a: 'Koʻpchilik mahsulotga 1.0 dan keyin ish kerak — kraş tuzatishlari, OS yangilanishlari, store siyosati oʻzgarishlari va haqiqiy foydalanish ochib beradigan funksiyalar. Biz oʻzimiz qurgan narsani yuritishda davom etamiz yoki oʻzingiz yuritmoqchi boʻlsangiz hujjatlar bilan jamoangizga topshiramiz.',
    },
    {
      q: 'Mavjud jamoamiz yoki kodimiz bilan ishlay olasizmi?',
      a: 'Ha. Mavjud kodbazalarni qabul qilamiz va ichki jamoalar bilan yonma-yon ishlaymiz. Birinchi qadam — qisqa texnik audit, toki hech kim allaqachon nima borligi haqida taxmin qilmasin.',
    },
  ],

  about: {
    title: 'Ishchi kuchi emas, mahsulot jamoasi.',
    lede:
      'Bir vaqtning oʻzida oz sonli loyiha olamiz, shuning uchun mahsulotingizni skoplagan odamlar uni quradigan odamlardir. Siz hech qachon koʻrmagan yetkazib berish jamoasiga topshiriq yoʻq.',
    story: [
      'wlans Toshkentda mahalliy bizneslar uchun Android ilovalar quradigan ikki kishilik shartnoma jamoasi sifatida boshlangan. Qaytib kelaveradigan ish hech qachon “shu ekranni qur” emas edi — “bu jarayon buzilgan, uni tuzatadigan dastur qil” edi. Biz hozir ham shu ishni olamiz.',
      'Bugun biz mobil ilovalar va veb ustida ishlaydigan muhandislar, dizaynerlar va QA jamoasimiz. Ataylab tor doirada qoldik: ikkita yoʻnalishni yaxshi bajarish oltitasini oʻrtacha bajarishdan afzal. Mavjud vositalar yetarlicha yaxshi boʻlmaganda oʻz vositalarimizni ichkarida quramiz.',
      'Biz ataylab yirik agentlik emasmiz. Maʼlum chegaradan keyingi oʻsish loyihani sotgan odamlar endi uni yetkazayotgan odamlar emasligini bildiradi — sifat aynan shu paytda oqib keta boshlaydi.',
    ],
    values: [
      {
        title: 'Nima oʻylaganimizni aytamiz',
        body: 'Shu jumladan funksiya yomon gʻoya boʻlganda, muddat real boʻlmaganda yoki bizga umuman ehtiyoj boʻlmaganda ham.',
      },
      {
        title: 'Hisobotdan koʻra ishlaydigan dastur',
        body: 'Har ikki haftada haqiqiy qurilmada build olasiz. Progress — jadvaldagi foiz emas, qoʻlda ushlanadigan narsa.',
      },
      {
        title: 'Bitta jamoa, boshidan oxirigacha',
        body: 'Skoplash qoʻngʻirogʻidagi muhandislar kod yozadigan muhandislardir. Hech narsa tarjimada yoʻqolmaydi.',
      },
      {
        title: 'Hamma narsa sizniki',
        body: 'Kod, repozitoriylar, akkauntlar va infratuzilma birinchi commit’dan sizniki. Hech qanday bogʻlanish yoʻq.',
      },
    ],
  },

  offices: [
    {
      city: 'Toshkent',
      country: 'Oʻzbekiston',
      address: 'Amir Temur koʻchasi 108',
      note: 'Bosh ofis',
    },
  ],

  projectTypes: [
    'Mobil ilova (iOS / Android)',
    'Kross-platforma ilova (Flutter)',
    'Korporativ sayt',
    'Veb ilova',
    'Biz qurmagan ilova ustida ish',
    'Hali aniq emas',
  ],

  budgetRanges: [
    '$300 dan kam',
    '$300 – $800',
    '$800 – $1 500',
    '$1 500 – $3 000',
    '$3 000 dan koʻp',
    'Hali hal qilinmagan',
  ],

  timelines: ['Imkon qadar tezroq', '3 oy ichida', '3–6 oy', 'Hozircha oʻrganyapman'],

  rnd: {
    eyebrow: 'Ichki R&D',
    title: 'Mavjud vositalar yetarlicha yaxshi boʻlmaganda oʻz vositalarimizni yozamiz.',
    body:
      'Ulardan biri — Arduino sinfidagi qurilmalar uchun ochiq kodli displey freymvorki. U OLED va TFT panellarga render qiladi va har bir kadr shinada haqiqatda qanchaga tushishini koʻrsatadi — I²C orqali SSD1306 uchun toʻliq kadr taxminan 24 ms oladi, bu esa chip qanchalik tez boʻlmasin, sketchni 41 fps atrofida cheklaydi. Koʻpchilik buni qurilmada, kech bilib qoladi.',
    ctaLabel: 'Freymvorkni koʻrish',
  },

  nav: {
    services: 'Xizmatlar',
    work: 'Portfolio',
    industries: 'Sohalar',
    company: 'Kompaniya',
    rnd: 'R&D',
  },

  serviceGroups: {
    Mobile: 'Mobil',
    Web: 'Veb',
  },

  serviceDefs: {
    'mobile-app-development': {
      title: 'Mobil ilova ishlab chiqish',
      shortTitle: 'Mobil',
      heading: 'Mobil ilova ishlab chiqish',
      headingAccent: 'xizmatlari',
      summary:
        'Toʻliq sikl mobil mahsulotlar: tadqiqot, dizayn, qurish va ikkala store’ga reliz, keyin ularni tirik saqlaydigan qoʻllab-quvvatlash.',
      points: ['iOS va Android', 'Store’ga joylash', 'Relizdan keyingi qoʻllab-quvvatlash'],
      lede:
        'Mobil mahsulotlarni birinchi eskizdan App Store va Google Play’dagi tirik sahifagacha quramiz. Chiqaradigan narsalarimizning koʻpi biznes allaqachon yomon yuritayotgan jarayonni almashtiradi — qogʻozda, jadvallarda yoki guruh chatida.',
      stats: [
        { value: '40+', label: 'Ishlab chiqilgan ilova' },
        { value: '1.2 mln+', label: 'Ilovalarimizdagi foydalanuvchi' },
        { value: '18', label: 'Toʻliq stavkadagi muhandis' },
        { value: '7 yil', label: 'Jamoaning oʻrtacha tajribasi' },
      ],
      techIntro:
        'Stekni mahsulotga nima kerakligi, jamoangiz nimani yurita olishi va uch yildan keyin ham nima qoʻllab-quvvatlanishi kesishmasida tanlaymiz.',
      tech: {
        nativeIos: {
          name: 'Native iOS',
          body: 'Swift va SwiftUI platforma bilan eng zich integratsiyani beradi — widget’lar, App Clip’lar, fon jarayonlari va reliz kunidayoq eng yangi API’lar.',
        },
        nativeAndroid: {
          name: 'Native Android',
          body: 'Jetpack Compose bilan Kotlin — dasturchining stolidagi flagmanda emas, foydalanuvchilaringiz haqiqatda olib yuradigan oʻrta segment qurilmalarda sinaladi.',
        },
        crossPlatform: {
          name: 'Kross-platforma',
          body: 'Bitta kodbaza ikkala platformaga haqiqatan xizmat qilganda Flutter. Qilmaganda buni aytamiz — qurilma bilan chuqur integratsiya va ogʻir grafika hamon native foydasiga.',
        },
        mobileBackend: {
          name: 'Mobil uchun backend',
          body: 'Mobil mahsulotga kerak boʻladigan API, sinxronizatsiya qatlami va push infratuzilmasi. Tarmoqqa ishonib boʻlmaydigan joyda oflayn-birinchi.',
        },
      },
      caseStudy: {
        client: 'Yetkazib berish platformasi',
        badge: 'Oflayn-birinchi',
        body: [
          'Kuryerlar zaxira xonalari va lift shaxtalarida buyurtmalarni yoʻqotardi — u yerda mobil internet bir necha daqiqaga uzilib qoladi. Mavjud ilova aloqa bor deb hisoblardi va usiz kiritilgan hamma narsani sokin ravishda tashlab yuborardi.',
          'Klientni lokal write-ahead navbat asosida qayta qurdik: har bir amal avval qurilmada yoziladi va tarmoq qaytganda qayta ijro etiladi, konfliktlar esa serverda hal qilinadi.',
          'Yetkazilmagan buyurtmalar birinchi chorakda taxminan uchdan biriga kamaydi va dispetcherlar har smena oxirida yoʻqolgan ishlarni telefon orqali solishtirishni toʻxtatdi.',
        ],
      },
    },

    'ios-development': {
      title: 'iOS ishlab chiqish',
      shortTitle: 'iOS',
      heading: 'iOS ilovalarini',
      headingAccent: 'ishlab chiqish xizmatlari',
      summary:
        'Apple qoidalariga muvofiq qurilgan native Swift va SwiftUI ilovalar — App Review’dan kutilmagan holatlarsiz oʻtadi.',
      points: ['Swift · SwiftUI', 'Widget va App Clip', 'App Store’ga joylash'],
      lede:
        'Apple ekotizimi uchun native iOS ilovalar quramiz — iPhone, iPad, Watch va mantiqli boʻlgan joyda CarPlay. Swift’da yozilgan, Apple’ning Human Interface Guidelines’iga muvofiq loyihalangan va buni koʻp marta qilgan odamlar tomonidan App Review’dan oʻtkazilgan.',
      stats: [
        { value: '25+', label: 'Chiqarilgan iOS ilova' },
        { value: '100%', label: 'App Review’dan oʻtgan' },
        { value: '8', label: 'Shtatdagi iOS muhandisi' },
        { value: '6 yil', label: 'Oʻrtacha iOS tajribasi' },
      ],
      techIntro:
        'Quyidagilarning hammasi bugun prodakshnda ishlatadigan va keyingi iOS versiyasi chiqqanda ham qoʻllab-quvvatlay oladigan narsalarimiz.',
      tech: {
        swift: {
          name: 'Swift va SwiftUI',
          body: 'Swift — Apple’ning native tili, SwiftUI esa zamonaviy iOS interfeyslari yoziladigan usul. Birgalikda ular eng yaxshi unumdorlikni va yangi tizim funksiyalariga eng erta kirishni beradi.',
        },
        dataSync: {
          name: 'Maʼlumot va sinxronizatsiya',
          body: 'Oflayn parvozdan omon chiqadigan va qurilma qaytganda toza solishtiriladigan lokal saqlash.',
        },
        systemIntegration: {
          name: 'Tizim integratsiyasi',
          body: 'Widget’lar, App Clip’lar, Live Activities, push bildirishnomalari va fon yangilanishi — ilovani oʻralgan emas, native his qildiradigan qismlar.',
        },
        quality: {
          name: 'Sifat',
          body: 'Birinchi yomon sharhdan keyin emas, birinchi TestFlight build’idan boshlab avtomatik UI testlar va kraş hisoboti.',
        },
      },
      caseStudy: {
        client: 'Raqamli hamyon',
        badge: 'Audit birinchi urinishda',
        body: [
          'Bitta haqiqiy foydalanuvchi tegishidan avval bank xavfsizlik auditidan oʻtishi shart boʻlgan toʻlov oqimi. Avvalgi ijrochi auditdan ikki marta oʻta olmagan edi.',
          'Nozik yoʻlni Secure Enclave atrofida qayta qurdik, har bir kalitni ilova xotirasidan chiqardik va auditorlar kuzata olishi uchun tahdid modelini kod bilan birga hujjatlashtirdik.',
          'Birinchi urinishda oʻtdi va relizdan keyingi uch oyda 40 000 foydalanuvchiga yetdi.',
        ],
      },
    },

    'android-development': {
      title: 'Android ishlab chiqish',
      shortTitle: 'Android',
      heading: 'Android ilovalarini',
      headingAccent: 'ishlab chiqish xizmatlari',
      summary:
        'Kotlin va Jetpack Compose — faqat flagmanlar emas, foydalanuvchilaringiz haqiqatda ishlatadigan oʻrta segment qurilmalarga moslangan.',
      points: ['Kotlin · Compose', 'Play Store relizi', 'Kuchsiz qurilmalarga moslash'],
      lede:
        'Android — bitta qurilma emas, minglab qurilma. Kotlin’da quramiz va foydalanuvchilaringiz haqiqatan egalik qiladigan qurilmalarda sinaymiz — koʻpchilik bozorda bu eng yangi Pixel emas, 3GB RAM’li uch yillik telefon degani.',
      stats: [
        { value: '30+', label: 'Chiqarilgan Android ilova' },
        { value: '2GB', label: 'Sinalgan eng past RAM' },
        { value: '9', label: 'Shtatdagi Android muhandisi' },
        { value: 'API 24', label: 'Odatiy minimal qoʻllab-quvvatlash' },
      ],
      techIntro:
        'Avvalo yuritish qulayligi uchun tanlangan. Hozir bir hafta tejaydigan ekzotik kutubxona qoʻllab-quvvatlanmay qolganda qayta yozishga tushishi mumkin.',
      tech: {
        kotlin: {
          name: 'Kotlin va Compose',
          body: 'Jetpack Compose — Android interfeyslarini qurishning zamonaviy usuli, Kotlin korutinalari esa asinxron ishni ichma-ich emas, oʻqiladigan qiladi.',
        },
        architecture: {
          name: 'Arxitektura',
          body: 'Jamoa almashuvidan omon chiqadigan qatlamli tuzilma: UI, domen va maʼlumot orasida aniq chegaralar, ularni bogʻlaydigan dependency injection bilan.',
        },
        performance: {
          name: 'Unumdorlik',
          body: 'Ishga tushish vaqti, kadr ritmi va xotira haqiqiy kuchsiz qurilmalarda oʻlchanadi. Flagmanda 200 ms sovuq start foydalanuvchingiz telefonida 2 soniya boʻlishi mumkin.',
        },
        distribution: {
          name: 'Tarqatish',
          body: 'Play Console sozlamasi, bosqichli chiqarish va reliz oldi hisobotlari — shuning uchun yomon build hammaga emas, foydalanuvchilarning 1% iga yetadi.',
        },
      },
      caseStudy: {
        client: 'Dala xizmati',
        badge: 'Ish yopish -35%',
        body: [
          'Muhandislar hisobotlarni kun oxirida xotiradan toʻldirardi, shuning uchun foydali tafsilotning yarmi tizimga umuman tushmasdi.',
          'Hisobotni joyida yozib oladigan — surat, koʻrsatkich va imzo — hamda furgon qamrovga chiqqanda sinxronlaydigan Android klient qurdik. U dala jamoasida allaqachon bor mustahkam qurilmalarda ishlaydi.',
          'Oʻrtacha ish yopish vaqti 35% ga kamaydi va ofis yoʻqolgan qogʻozlarni quvishni toʻxtatdi.',
        ],
      },
    },

    'cross-platform-development': {
      title: 'Kross-platforma ishlab chiqish',
      shortTitle: 'Kross-platforma',
      heading: 'Kross-platforma ilovalarini',
      headingAccent: 'ishlab chiqish',
      summary:
        'Haqiqatan mos kelganda bitta Flutter kodbazasi — mos kelmaganda esa halol tavsiya.',
      points: ['Flutter · Dart', 'Umumiy dizayn tizimi', 'Platform kanallari'],
      lede:
        'Kross-platforma — bepul yutuq emas, murosa. Mahsulot ikkala platformada asosan forma, roʻyxat va API chaqiruvlaridan iborat boʻlsa, Flutter qurishni ikki barobar qisqartirishi mumkin. Agar u qurilma temiriga yoki platformaga xos UX’ga tayansa, uzoq muddatda native arzonroq. Sizda qaysi biri ekanini aytamiz.',
      stats: [
        { value: '~60%', label: 'Odatda umumiy kod' },
        { value: '2x', label: 'Ikkala store’ga tezroq' },
        { value: '15+', label: 'Chiqarilgan Flutter ilova' },
        { value: '1', label: 'Dizayn tizimi, ikkala platforma' },
      ],
      techIntro:
        'Flutter ikkala platformada bitta render dvigatelini beradi, shuning uchun ekran ikkita implementatsiyani yuritmasdan bir xil koʻrinadi va bir xil ishlaydi.',
      tech: {
        flutter: {
          name: 'Flutter va Dart',
          body: 'Ikkala platformada native ARM’ga kompilyatsiya qilinadigan yagona kodbaza. Render Flutter’ning oʻziniki, shuning uchun iOS va Android maketlari orasida farq yoʻq.',
        },
        state: {
          name: 'Holat va arxitektura',
          body: 'Oʻyinchoq ilova bosqichidan oshib ketadigan bashoratli holat boshqaruvi, butun jamoada bir xil naqshlar bilan.',
        },
        bridges: {
          name: 'Native koʻpriklar',
          body: 'Flutter qamramaydigan qismlar uchun platform kanallari — temirga kirish, platforma SDK’lari va native fon ishlari.',
        },
        release: {
          name: 'Reliz',
          body: 'Ikkala platformani quradigan va imzolaydigan bitta quvur, shuning uchun reliz ikkita yarim eslangan roʻyxat emas, bitta amal.',
        },
      },
      caseStudy: {
        client: 'Oʻquv platformasi',
        badge: 'Tugatish ikki barobar',
        body: [
          'Internet uzuq-yuluq boʻlgan hududlardagi talabalar bitta video darsni ham tugata olmasdi. Veb pleyer umuman mavjud boʻlmagan kanal kengligini nazarda tutardi.',
          'Yuklab olinadigan darslar, davom ettiriladigan yuklamalar va aloqa paydo boʻlganda sinxronlanadigan progressga ega Flutter klient qurdik.',
          'Kurs tugatish bir semestr ichida ikki barobar oshdi va bitta kodbaza bitta jamoa bilan ikkala platformaga xizmat qiladi.',
        ],
      },
    },

    'web-app-development': {
      title: 'Veb ishlab chiqish',
      shortTitle: 'Veb',
      heading: 'Veb-sayt va veb ilova',
      headingAccent: 'ishlab chiqish',
      summary:
        'Korporativ saytlar, mijoz portallari va admin panellar — mijozlaringiz siz haqingizda hukm chiqaradigan sahifalar va jamoangiz har kuni ishlatadigan dashboard.',
      points: ['Korporativ saytlar', 'React · Next.js', 'Admin panellar'],
      lede:
        'Biznes dasturlarining koʻpi veb ilova va ularning koʻpini ishlatish yoqimsiz. Biz odamlar butun ish kunini ichida oʻtkazadigan ichki vositalar va mijoz portallarini quramiz — yuklanish, xato va boʻsh holatlar tasodifga qoldirilmay, loyihalanadi.',
      stats: [
        { value: '35+', label: 'Yetkazilgan veb mahsulot' },
        { value: '<1.5s', label: '4G’da odatiy yuklanish' },
        { value: '95+', label: 'Lighthouse maqsadi' },
        { value: 'WCAG AA', label: 'Qulaylik bazasi' },
      ],
      techIntro:
        'Sukut boʻyicha serverda render qilinadi, interaktivlik haqiqatan kerak joyda interaktiv. Koʻpchilik dashboard ishlatganidan ancha koʻp JavaScript yuboradi.',
      tech: {
        react: {
          name: 'React va Next.js',
          body: 'Server komponentlari klient bandlini kichik saqlaydi; interaktiv qismlar interaktiv qoladi. Natija faqat dasturchi noutbukida emas, telefonda ham tez yuklanadi.',
        },
        dataLayer: {
          name: 'Maʼlumot qatlami',
          body: 'Server boshqaradigan jadvallar — qidiruv, filtr, saralash va sahifalash backendda, shuning uchun ellik ming qatorli sahifa ellik qatorli sahifadek ishlaydi.',
        },
        designSystem: {
          name: 'Dizayn tizimi',
          body: 'Token asosidagi tizim — mahsulotdagi har bir ekran masofa, rang va xatti-harakat boʻyicha kelishadi, yangi sahifa esa kunlar emas, soatlar oladi.',
        },
        quality: {
          name: 'Sifat',
          body: 'Buzilsa pul turadigan oqimlarda uchdan-uchgacha testlar, ustiga kontrast va klaviatura tekshiruvlari oxirida emas, CI’da.',
        },
      },
      caseStudy: {
        client: 'Savdo sodiqlik dasturi',
        badge: 'Takroriy xaridlar +22%',
        body: [
          'Hech kim olib yurmaydigan sodiqlik kartasi — biznes esa qaytib keluvchi mijozlari kimligini koʻra olmasdi.',
          'Uni operatsion jamoa uchun veb portal va yengil mijoz ilovasi bilan almashtirdik — bitta API va bitta identifikatsiya modeli bilan.',
          'Takroriy xarid darajasi ikki chorakda 22% oshdi va marketing jamoasi nihoyat haqiqiy xatti-harakat boʻyicha segmentlay oldi.',
        ],
      },
    },




  },

  ui: {
    skipToContent: 'Kontentga oʻtish',
    mainNav: 'Asosiy',
    footerNav: 'Pastki menyu',
    openMenu: 'Menyuni ochish',
    closeMenu: 'Menyuni yopish',
    language: 'Til',
    contact: 'Aloqa',
    notSureWhichOne: 'Qaysi biri kerakligiga ishonchingiz komil emasmi?',
    writeToUs: 'Bizga yozing',
    back: 'Orqaga',
    loading: 'Yuklanmoqda',

    learnMore: 'Batafsil',
    allProjects: 'Barcha loyihalar',
    allServices: 'Barcha xizmatlar',
    viewMoreProjects: 'Koʻproq loyiha koʻrish',
    readCaseStudy: 'Keys-stadini oʻqish',
    bookCall: 'Qoʻngʻiroqqa yozilish',
    orderProject: 'Loyiha buyurtma qilish',
    seeRelatedWork: 'Tegishli ishlarni koʻrish',
    homeCrumb: 'Bosh sahifa',
    portfolioCrumb: 'Portfolio',

    home: {
      servicesEyebrow: 'Nima qilamiz',
      servicesTitle: 'Mobil va veb —',
      servicesAccent: 'sifatli qilib.',
      servicesLede:
        'Oʻnta emas, ikkita yoʻnalish. iOS va Android uchun native ilovalar, mos kelgan joyda bitta Flutter kodbazasi va ular atrofidagi veb-saytlar hamda veb ilovalar.',
      workEyebrow: 'Tanlangan ishlar',
      workTitle: 'Odamlar haqiqatan',
      workAccent: 'ishlatadigan ilovalar.',
      workLede:
        'Har bir loyiha bir xil yoziladi: nima qiyin boʻlgan, nimani tanlagan va nima oʻlchanadigan darajada oʻzgargan.',
      industriesEyebrow: 'Sohalar',
      industriesTitle: 'Bu sohalarda',
      industriesAccent: 'avval ham ishlaganmiz.',
      industriesLede:
        'Soha bilimi loyihani har qanday freymvorkdan koʻra koʻproq qisqartiradi. Bular biz tuzoqlarni allaqachon biladigan yoʻnalishlar.',
      processEyebrow: 'Qanday ishlaymiz',
      processTitle: 'Formani yuborganingizdan',
      processAccent: 'keyin nima boʻladi.',
      processLede:
        'Har bir yangi mijozda aslida shu savol bor. Ikki haftalik sikllar, har birining oxirida ishlaydigan build va kod yozilmasidan avval yozma skop.',
      clientsEyebrow: 'Mijozlar',
      clientsTitle: 'Biz bilan ishlash haqida',
      clientsAccent: 'odamlar nima deydi.',
      stackEyebrow: 'Texnologiya',
      stackTitle: 'Modda boʻlganini emas,',
      stackAccent: 'mos keladiganini ishlatamiz.',
      stackLede:
        'Quyidagi har bir tanlov — prodakshnda ishlatadigan va ikki yildan keyin ham qoʻllab-quvvatlay oladigan tanlovimiz.',
      faqEyebrow: 'Savollar',
      faqTitle: 'Odamlar birinchi soʻraydigan',
      faqAccent: 'savollarga javoblar.',
      ctaTitle: 'Gʻoyangiz bormi? Nima talab qilishini aytamiz.',
      ctaLede:
        'Mahsulot nima qilishi kerakligini ayting. Skop boʻyicha bahomiz va taxminiy oraliq bilan javob beramiz.',
    },

    servicesPage: {
      eyebrow: 'Xizmatlar',
      title: 'Mobil va veb —',
      accent: 'sifatli qilib.',
      lede:
        'Biz mobil ilovalar va ular atrofidagi vebni quramiz. Infratuzilma, DevOps yoki alohida dizayn xizmatini sotmaymiz — loyihaga shular kerak boʻlsa, buni aytamiz va kim qilishini koʻrsatamiz.',
      industriesEyebrow: 'Sohalar',
      industriesTitle: 'Bu sohalarda',
      industriesAccent: 'avval ham ishlaganmiz.',
      processEyebrow: 'Qanday ishlaymiz',
      processTitle: 'Olti bosqich va har birida',
      processAccent: 'build koʻrasiz.',
      stackEyebrow: 'Texnologiya',
      stackTitle: 'Nima bilan quramiz.',
      faqEyebrow: 'Savollar',
      faqTitle: 'Odamlar birinchi soʻraydigan',
      faqAccent: 'savollarga javoblar.',
      ctaTitle: 'Qaysi biri kerakligini bilmayapsizmi?',
      ctaLede:
        'Muammoni tasvirlang — qaysi biri mos kelishini aytamiz, javob “biz toʻgʻri jamoa emasmiz” boʻlgan holatni ham qoʻshib.',
    },

    industriesPage: {
      eyebrow: 'Sohalar',
      title: 'Bu sohalarda',
      accent: 'avval ham ishlaganmiz.',
      lede:
        'Soha bilimi loyihani har qanday freymvorkdan koʻra koʻproq qisqartiradi. Kuryer ilovasi lift shaxtasidan omon chiqishi kerakligini yoki klinika xodim bilan birga xonani ham rejalashtirishini bilish — ishlaydigan birinchi versiya bilan nihoyat ishlaydigan uchinchi versiya orasidagi farq.',
      workEyebrow: 'Tegishli ishlar',
      workTitle: 'Bu amalda qanday',
      workAccent: 'koʻrinadi.',
      processEyebrow: 'Qanday ishlaymiz',
      processTitle: 'Olti bosqich va har birida',
      processAccent: 'build koʻrasiz.',
      faqEyebrow: 'Savollar',
      faqTitle: 'Odamlar birinchi soʻraydigan',
      faqAccent: 'savollarga javoblar.',
      ctaTitle: 'Bu yerda yoʻq sohada ishlaysizmi?',
      ctaLede:
        'Soha kamdan-kam qiyin qism boʻladi. Almashtirilishi kerak boʻlgan jarayonni tasvirlang — nima talab qilishini aytamiz.',
    },

    companyPage: {
      eyebrow: 'Kompaniya',
      title: 'Ishchi kuchi emas,',
      accent: 'mahsulot jamoasi.',
      storyEyebrow: 'Bizning hikoyamiz',
      valuesEyebrow: 'Qanday fikrlaymiz',
      valuesTitle: 'Murosaga bormaydigan',
      valuesAccent: 'toʻrtta narsa.',
      processEyebrow: 'Qanday ishlaymiz',
      processTitle: 'Olti bosqich va har birida',
      processAccent: 'build koʻrasiz.',
      processLede:
        'Hech bir bosqich hisobot bilan tugamaydi. Har biri siz ochib, bosib, oʻzingiz baholay oladigan narsa bilan tugaydi.',
      clientsEyebrow: 'Mijozlar',
      clientsTitle: 'Biz bilan ishlash haqida',
      clientsAccent: 'odamlar nima deydi.',
      whereToFindUs: 'Bizni qayerdan topasiz',
      talkToUs: 'Biz bilan bogʻlaning',
      telegram: 'Telegram',
      email: 'Email',
      phone: 'Telefon',
      hours: 'Ish vaqti',
    },

    contactPage: {
      eyebrow: 'Loyiha buyurtma qilish',
      title: 'Nima qurayotganingizni',
      accent: 'ayting.',
      lede:
        'Boshlash uchun qisqa brif yetarli. Skop boʻyicha halol baho, taxminiy oraliq va shu ish uchun toʻgʻri jamoa ekanimiz bilan javob beramiz — javob “yoʻq” boʻlgan holatni ham qoʻshib.',
      briefTitle: 'Loyiha brifi',
      preferToTalk: 'Gaplashishni afzal koʻrasizmi?',
      telegram: 'Telegram',
      email: 'Email',
      phone: 'Telefon',
      whatHappensNext: 'Keyin nima boʻladi',
      beforeYouWrite: 'Yozishdan oldin',
      beforeYouWriteBody:
        'Sizga texnik topshiriq kerak emas. Eng foydali brif uchta savolga javob beradi: foydalanuvchilar kim, ular bugun nima qila olmaydi va loyiha muvaffaqiyatli hisoblanishi uchun nima toʻgʻri boʻlishi kerak. Qolganini birga hal qilamiz.',
    },

    workPage: {
      eyebrow: 'Portfolio',
      title: 'Odamlar haqiqatan',
      accent: 'ishlatadigan ilovalar.',
      lede:
        'Soha boʻyicha filtrlang. Har bir loyiha bir xil yoziladi: nima qiyin boʻlgan, nimani tanlagan va nima oʻlchanadigan darajada oʻzgargan.',
      ctaTitle: 'Shunga oʻxshash narsa qurilishini xohlaysizmi?',
      ctaLede:
        'Mahsulot nima qilishi kerakligini ayting. Skop boʻyicha bahomiz va taxminiy oraliq bilan javob beramiz.',
    },

    tabs: {
      home: 'Bosh',
      services: 'Xizmat',
      work: 'Ishlar',
      company: 'Biz',
      contact: 'Aloqa',
    },

    rndPage: {
      frameworkTitle: 'Displey freymvorki',
      frameworkBody:
        'OLED va TFT panellar uchun 1-bitli render yadrosi. U oʻzgargan hududlarni kuzatadi, shuning uchun kichik oʻzgarish toʻliq kadr emas, bir hovuch bayt yuboradi — va har bir flush sozlangan shinada haqiqatda qanchaga tushishini koʻrsatadi.',
      panelBody:
        'Shu matn yonidagi panel — oʻsha dvigatelning oʻzi, TypeScript’ga kompilyatsiya qilingan va brauzeringizda ishlab turibdi. Ostidagi raqamlar bezak emas, oʻlchangan qiymatlar.',
      cta: 'Loyiha boʻyicha bogʻlanish',
    },

    caseStudy: {
      problemEyebrow: 'Muammo',
      problemTitle: 'Nima uni',
      problemAccent: 'qiyin qilgan.',
      choiceEyebrow: 'Nimani tanladik',
      choiceTitle: 'Ahamiyatga ega boʻlgan',
      choiceAccent: 'qarorlar.',
      changedEyebrow: 'Nima oʻzgardi',
      changedTitle: 'Relizdan keyin',
      changedAccent: 'oʻlchangan.',
      moreEyebrow: 'Boshqa ishlar',
      moreTitle: 'Biz chiqargan',
      moreAccent: 'boshqa narsalar.',
      ctaTitle: 'Shunga oʻxshash muammoyingiz bormi?',
      orderLikeThis: 'Shunga oʻxshash loyiha buyurtma qilish',
      timeline: 'Muddat',
      team: 'Jamoa',
      platforms: 'Platformalar',
      stack: 'Stek',
      result: 'Natija',
    },

    serviceDetail: {
      statsTitleLead: 'wlans jamoasi bilan',
      statsTitleAccent: 'hayotga',
      statsTitleTail: 'gʻoyangizni tatbiq qiling.',
      techEyebrow: 'Texnologiya',
      techTitle: 'Nima bilan',
      techAccent: 'quramiz.',
      caseEyebrow: 'Keys-stadi',
      caseTitle: 'Muvaffaqiyatli ishlab chiqilgan',
      caseAccent: 'ilovalar',
      processEyebrow: 'Qanday ishlaymiz',
      processTitle: 'Olti bosqich va har birida',
      processAccent: 'build koʻrasiz.',
      relatedEyebrow: 'Tegishli',
      relatedTitle: 'Biz quradigan boshqa narsalar.',
      faqEyebrow: 'Savollar',
      faqTitle: 'Odamlar birinchi soʻraydigan',
      faqAccent: 'savollarga javoblar.',
    },

    gallery: {
      filterProjects: 'Loyihalarni filtrlash',
      emptyCategory: 'Bu toifada hali loyiha yoʻq.',
      caseStudyBadge: 'Keys-stadi',
      appStore: 'App Store',
      googlePlay: 'Google Play',
    },

    rail: {
      previous: 'Oldingi sharhlar',
      next: 'Koʻproq sharh',
      playVideo: 'Videoni ijro etish',
      videoReview: 'Video sharh',
      ratingLabel: '5 dan',
    },

    form: {
      name: 'Ismingiz',
      namePlaceholder: 'Aziz Karimov',
      email: 'Email',
      emailPlaceholder: 'siz@kompaniya.uz',
      company: 'Kompaniya',
      companyPlaceholder: 'Kompaniya nomi',
      contact: 'Telefon yoki Telegram',
      contactPlaceholder: '+998 90 000 00 00 yoki @username',
      contactHint: 'Ixtiyoriy — koʻpincha emaildan tezroq',
      optional: 'Ixtiyoriy',
      projectType: 'Sizga nima kerak?',
      budget: 'Byudjet',
      timeline: 'Muddat',
      message: 'Loyiha haqida',
      messagePlaceholder:
        'Bizda yetkazib berish biznesi bor va kuryerlarimiz hamon qogʻoz roʻyxat bilan ishlaydi…',
      submit: 'Brifni yuborish',
      submitting: 'Yuborilmoqda…',
      successTitle: 'Rahmat — brifingiz yetib keldi.',
      successBody: 'Bir ish kuni ichida javob beramiz.',
      errorTitle: 'Yuborilmadi. Iltimos, qayta urinib koʻring.',
      website: 'Veb-sayt',
    },

    notices: {
    notFound: 'Bunday sahifa yoʻq yoki koʻchirilgan. Biz quradigan hamma narsa quyida, bir bosishda.',
      placeholderProjects:
        'Generatsiya qilingan grafikali namunaviy loyihalar. Haqiqiy mijozlar va skrinshotlar shu yerga:',
      placeholderQuotes:
        'Namunaviy sharhlar. Haqiqiy, muallifi koʻrsatilgan sharhlar bilan almashtiring yoki boʻlimni olib tashlang — toʻqilgan sharh soxta ishonchnoma.',
      placeholderFigures: 'Quyidagi raqamlar namunaviy — shu yerda almashtiring:',
      placeholderProject:
        'Namunaviy loyiha. Matn, raqamlar va grafikani shu yerda almashtiring:',
    },
  },
}
