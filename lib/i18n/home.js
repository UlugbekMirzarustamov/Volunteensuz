// Homepage interface translations — en / uz / ru
// ⚠ Strings marked "// review" are natural but double-check nuance.
// Program names, category labels, and popular search tags intentionally
// stay in English — they map directly to database values.

export const homeTranslations = {
  en: {
    nav: {
      features:   "Features",
      categories: "Categories",
      programs:   "Programs",
      essays:     "Essays",
      myEssays:   "My essays",
      logOut:     "Log out",
      signIn:     "Sign in",
    },

    heroBadge:         "Trusted by 4,000+ students",
    heroLine1:         "Your next big",
    heroLine2:         "opportunity is",
    heroLine3:         "one search away",
    heroSub:           "Fully-funded scholarships, summer programs, and competitions most students never hear about. Curated for ambitious minds worldwide.",
    searchPlaceholder: "Search scholarships, programs, competitions...",
    searchBtn:         "Search",
    popularLabel:      "Popular:",

    statLabels: ["Programs", "Countries", "Students", "Forever"],
    statFreeN:  "Free",

    featuredLabel: "Featured",
    featuredTitle: "Opportunities worth your time",
    featuredSub:   "A few hand-picked programs to get you started.",
    daysLeft:      "days left",
    seeAll:        "See all programs →",

    featuresLabel: "Features",
    featuresTitle: "Not just a list of links",
    featuresSub:   "Volunteens is where you find opportunities and actually apply to them.",
    features: [
      { t: "Hand-picked, not scraped",   d: "Every program is personally reviewed before it goes live. No dead links, no scams, no expired deadlines." },
      { t: "Write your essays here",     d: "Draft, save, and organize your application essays right on the platform. Your work, always with you." },
      { t: "Never miss a deadline",      d: "Save a program and get reminded before it closes. Telegram and email alerts, your choice." },
      { t: "Filters that actually help", d: "Sort by funding, level, country, and format in seconds. Find what fits you, skip what doesn't." },
      { t: "Built for students like you",d: "Strong focus on opportunities open to Central Asian and international students, not just US-only lists." },
      { t: "One place for everything",   d: "Discover, save, track, and apply, all from a single dashboard. Stop juggling ten browser tabs." },
    ],

    categoriesLabel: "Categories",
    categoriesTitle: "Explore by category",
    categoriesSub:   "Whatever your goal, there's a path for it.",
    programsWord:    "programs",

    howTitle: "Simple. Clear. Yours.",
    steps: [
      { t: "Discover",     d: "Browse verified, fully-funded programs. Filter by funding, deadline, level, anything." },
      { t: "Save & track", d: "Save the ones you love. Track deadlines so you never miss a shot." },
      { t: "Apply & win",  d: "Draft your essays right here, then apply with confidence." },
    ],

    founderLabel: "Founder",
    founderBio:   "LaunchX and Lumiere Research full-aid scholar. I built Volunteens to give students one trusted platform to find real opportunities and actually apply — the platform I wish I had.",
    founderCTA:   "Reach out for inquiries",

    ctaBadge: "Start your journey today",
    ctaTitle: "Ready to start your path?",
    ctaSub:   "Join thousands of students already finding their opportunities through Volunteens.",
    ctaBtn:   "Join the channel →",

    previewLabel:     "The Platform",
    previewTitle:     "Everything you need,",
    previewTitleBrand:"all in one place",
    previewSub:       "Browse programs, track deadlines, and write your essays — without switching tabs.",

    footerDesc:       "Connecting ambitious students worldwide with verified, fully-funded opportunities. Start your global path with us.",
    footerPlatform:   "Platform",
    footerExplore:    "Explore programs",
    footerFeatures:   "Features",
    footerCategories: "Categories",
    footerLegal:      "Legal",
    footerPrivacy:    "Privacy policy",
    footerTerms:      "Terms of use",
    footerCookies:    "Cookies",
    footerCopyright:  "© 2026 Volunteens. All rights reserved. · Built by Ulugbek Mirzarustamov",
    footerTagline:    "Made for ambitious students",

    logoutTitle:   "Log out?",
    logoutDesc:    "You'll need to sign in again to access your essays and saved programs.",
    cancel:        "Cancel",
    logoutConfirm: "Log out",
    signingOut:    "Signing out…",
  },

  uz: {
    nav: {
      features:   "Xususiyatlar",
      categories: "Kategoriyalar",
      programs:   "Dasturlar",
      essays:     "Insholar",
      myEssays:   "Insholarim",
      logOut:     "Chiqish",
      signIn:     "Kirish",
    },

    heroBadge:         "4,000+ talabaga ishonchli",
    heroLine1:         "Keyingi ulkan",
    heroLine2:         "imkoniyatingiz",
    heroLine3:         "bir qidirishda",
    heroSub:           "Ko'pchilik talabalarga noma'lum to'liq moliyalashtirilgan stipendiyalar, yozgi dasturlar va musobaqalar. Dunyo bo'ylab iste'dodli yoshlar uchun tanlangan.", // review
    searchPlaceholder: "Stipendiya, dastur, musobaqalarni qidiring...",
    searchBtn:         "Qidirish",
    popularLabel:      "Mashhur:",

    statLabels: ["Dastur", "Mamlakat", "Talaba", "Doimo bepul"],
    statFreeN:  "Bepul",

    featuredLabel: "Tanlangan",
    featuredTitle: "Vaqtingizga arzigulik imkoniyatlar",
    featuredSub:   "Boshlash uchun bir nechta tanlangan dasturlar.",
    daysLeft:      "kun qoldi",
    seeAll:        "Barcha dasturlarni ko'rish →",

    featuresLabel: "Imkoniyatlar",
    featuresTitle: "Shunchaki havolalar ro'yxati emas",
    featuresSub:   "Volunteens — imkoniyatlarni topib, haqiqatan ham ariza topshiradigan joy.",
    features: [
      { t: "Tanlangan, yig'ilmagan",       d: "Har bir dastur e'lon qilinishidan oldin shaxsan ko'rib chiqiladi. O'lik havolalar, firibgarlik, muddati o'tgan sanalar yo'q." },
      { t: "Insholaringizni shu yerda yozing", d: "Ariza insholaringizni platformada yozing, saqlang va tartibga soling. Ishingiz har doim siz bilan." },
      { t: "Muddatni o'tkazib yuborma",     d: "Dasturni saqlang va u yopilishidan oldin eslatma oling. Telegram va email bildirishnomalari — siz tanlaysiz." },
      { t: "Chindan foydali filtrlar",      d: "Sekundlar ichida moliyalashtirish, daraja, mamlakat va format bo'yicha saralang. O'zingizga mosini toping." },
      { t: "Siz kabi talabalar uchun",      d: "Markaziy Osiyo va xalqaro talabalarga ochiq imkoniyatlarga kuchli e'tibor. Faqat AQSh ro'yxatlari emas." },
      { t: "Hammasi uchun bitta joy",       d: "Kashf eting, saqlang, kuzating va ariza bering — barchasi bitta paneldan. O'nta tabni boshqarishni to'xtating." },
    ],

    categoriesLabel: "Kategoriyalar",
    categoriesTitle: "Kategoriya bo'yicha ko'ring",
    categoriesSub:   "Maqsadingiz nima bo'lmasin, bunga yo'l bor.",
    programsWord:    "dastur",

    howTitle: "Oddiy. Aniq. Sizniki.",
    steps: [
      { t: "Kashf eting",                d: "Tasdiqlangan, to'liq moliyalashtirilgan dasturlarni ko'ring. Moliyalashtirish, muddat, daraja bo'yicha filtrlang." },
      { t: "Saqlang va kuzating",        d: "Yoqqanlarini saqlang. Hech qachon imkoniyatni o'tkazib yubormaslik uchun muddatlarni kuzating." },
      { t: "Ariza bering va g'alaba qozing", d: "Insholaringizni shu yerda yozing, so'ng ishonch bilan ariza bering." },
    ],

    founderLabel: "Asoschisi",
    founderBio:   "LaunchX va Lumiere Research to'liq stipendiati. Volunteensni talabalar haqiqiy imkoniyatlarni topib, ariza topshira oladigan yagona ishonchli platforma sifatida yaratdim — o'zim istagan platforma.", // review
    founderCTA:   "Murojaat qilish",

    ctaBadge: "Bugun yo'lingizni boshlang",
    ctaTitle: "Yo'lingizni boshlashga tayyormisiz?",
    ctaSub:   "Allaqachon Volunteens orqali imkoniyatlarini topayotgan minglab talabalar safiga qo'shiling.",
    ctaBtn:   "Kanalga qo'shiling →",

    previewLabel:      "Platforma",
    previewTitle:      "Kerakli hamma narsa,",
    previewTitleBrand: "bitta joyda",
    previewSub:        "Dasturlarni ko'ring, muddatlarni kuzating va insholaringizni yozing — tablar o'rtasida almashmasdan.",

    footerDesc:       "Dunyo bo'ylab iste'dodli talabalarni tasdiqlangan, to'liq moliyalashtirilgan imkoniyatlar bilan bog'laymiz. Global yo'lingizni biz bilan boshlang.", // review
    footerPlatform:   "Platforma",
    footerExplore:    "Dasturlarni ko'rish",
    footerFeatures:   "Imkoniyatlar",
    footerCategories: "Kategoriyalar",
    footerLegal:      "Huquqiy",
    footerPrivacy:    "Maxfiylik siyosati",
    footerTerms:      "Foydalanish shartlari",
    footerCookies:    "Kukilar",
    footerCopyright:  "© 2026 Volunteens. Barcha huquqlar himoyalangan. · Ulugbek Mirzarustamov tomonidan yaratilgan",
    footerTagline:    "Iste'dodli talabalar uchun yaratilgan",

    logoutTitle:   "Chiqmoqchimisiz?",
    logoutDesc:    "Insholar va saqlangan dasturlarga kirish uchun qayta tizimga kirishingiz kerak bo'ladi.",
    cancel:        "Bekor qilish",
    logoutConfirm: "Chiqish",
    signingOut:    "Chiqilmoqda…",
  },

  ru: {
    nav: {
      features:   "Возможности",
      categories: "Категории",
      programs:   "Программы",
      essays:     "Эссе",
      myEssays:   "Мои эссе",
      logOut:     "Выйти",
      signIn:     "Войти",
    },

    heroBadge:         "Доверяют 4,000+ студентов",
    heroLine1:         "Ваша следующая",
    heroLine2:         "большая возможность",
    heroLine3:         "в одном поиске",
    heroSub:           "Полностью финансируемые стипендии, летние программы и конкурсы, о которых большинство студентов никогда не слышали. Отобрано для амбициозных умов по всему миру.", // review
    searchPlaceholder: "Поиск стипендий, программ, конкурсов...",
    searchBtn:         "Поиск",
    popularLabel:      "Популярное:",

    statLabels: ["Программ", "Стран", "Студентов", "Навсегда"],
    statFreeN:  "Бесплатно",

    featuredLabel: "Избранное",
    featuredTitle: "Возможности, достойные вашего времени",
    featuredSub:   "Несколько отобранных программ для начала.",
    daysLeft:      "дней осталось",
    seeAll:        "Смотреть все программы →",

    featuresLabel: "Возможности",
    featuresTitle: "Не просто список ссылок",
    featuresSub:   "Volunteens — это место, где вы находите возможности и действительно подаёте заявки.",
    features: [
      { t: "Отобранное, не спарсенное",          d: "Каждая программа лично проверяется перед публикацией. Никаких битых ссылок, мошенничества и просроченных дедлайнов." },
      { t: "Пишите эссе прямо здесь",            d: "Создавайте, сохраняйте и организуйте свои эссе прямо на платформе. Ваша работа всегда с вами." },
      { t: "Никогда не упускайте дедлайн",       d: "Сохраните программу и получите напоминание до её закрытия. Уведомления в Telegram и по email — ваш выбор." },
      { t: "Фильтры, которые реально помогают",  d: "Сортируйте по финансированию, уровню, стране и формату за секунды. Находите подходящее, пропускайте лишнее." },
      { t: "Создано для таких студентов, как вы",d: "Особый акцент на возможностях для студентов из Центральной Азии и со всего мира — не только списки для США." },
      { t: "Одно место для всего",               d: "Находите, сохраняйте, отслеживайте и подавайте заявки — всё из одной панели. Хватит жонглировать десятью вкладками." },
    ],

    categoriesLabel: "Категории",
    categoriesTitle: "Изучайте по категориям",
    categoriesSub:   "Какой бы ни была ваша цель — для неё найдётся путь.",
    programsWord:    "программ",

    howTitle: "Просто. Понятно. Ваше.",
    steps: [
      { t: "Открывайте",                    d: "Просматривайте проверенные, полностью финансируемые программы. Фильтруйте по финансированию, дедлайну, уровню — по чему угодно." },
      { t: "Сохраняйте и отслеживайте",     d: "Сохраняйте понравившиеся. Отслеживайте дедлайны, чтобы не упустить ни одного шанса." },
      { t: "Подавайте и побеждайте",        d: "Напишите эссе прямо здесь, затем подайте заявку с уверенностью." },
    ],

    founderLabel: "Основатель",
    founderBio:   "Стипендиат LaunchX и Lumiere Research. Я создал Volunteens, чтобы дать студентам одну надёжную платформу для поиска реальных возможностей и подачи заявок — платформу, которую сам хотел иметь.", // review
    founderCTA:   "Написать по вопросам",

    ctaBadge: "Начните свой путь сегодня",
    ctaTitle: "Готовы начать свой путь?",
    ctaSub:   "Присоединяйтесь к тысячам студентов, которые уже находят свои возможности через Volunteens.",
    ctaBtn:   "Присоединиться к каналу →",

    previewLabel:      "Платформа",
    previewTitle:      "Всё необходимое,",
    previewTitleBrand: "в одном месте",
    previewSub:        "Находите программы, следите за дедлайнами и пишите эссе — не переключая вкладки.",

    footerDesc:       "Связываем целеустремлённых студентов по всему миру с проверенными, полностью финансируемыми возможностями. Начните свой глобальный путь с нами.", // review
    footerPlatform:   "Платформа",
    footerExplore:    "Изучить программы",
    footerFeatures:   "Возможности",
    footerCategories: "Категории",
    footerLegal:      "Правовой",
    footerPrivacy:    "Политика конфиденциальности",
    footerTerms:      "Условия использования",
    footerCookies:    "Cookie",
    footerCopyright:  "© 2026 Volunteens. Все права защищены. · Создано Улугбеком Мирзарустамовым",
    footerTagline:    "Создано для амбициозных студентов",

    logoutTitle:   "Выйти?",
    logoutDesc:    "Для доступа к эссе и сохранённым программам нужно будет войти снова.",
    cancel:        "Отмена",
    logoutConfirm: "Выйти",
    signingOut:    "Выход…",
  },
};
