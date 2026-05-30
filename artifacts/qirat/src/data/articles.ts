export interface Article {
  id: number;
  titleAr: string;
  titleEn: string;
  excerptAr: string;
  excerptEn: string;
  categoryAr: string;
  categoryEn: string;
  date: string;
  image: string;
  slug: string;
}

export const articles: Article[] = [
  {
    id: 1,
    titleAr: "أفضل مناطق الاستثمار العقاري في القاهرة 2026",
    titleEn: "Best Real Estate Investment Areas in Cairo 2026",
    excerptAr: "تعرف على أبرز المناطق التي تشهد نمواً استثمارياً قوياً في القاهرة خلال عام 2026، وكيف تستفيد منها.",
    excerptEn: "Discover the top areas experiencing strong investment growth in Cairo during 2026 and how to capitalize on them.",
    categoryAr: "استثمار",
    categoryEn: "Investment",
    date: "مايو 28, 2026",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
    slug: "best-investment-areas-cairo-2026",
  },
  {
    id: 2,
    titleAr: "كل ما تريد معرفته عن التجمع الخامس",
    titleEn: "Everything You Need to Know About 5th Settlement",
    excerptAr: "دليلك الشامل لأحياء التجمع الخامس، أسعار العقارات، الكمبوندات، والمرافق المتوفرة في هذه المنطقة المميزة.",
    excerptEn: "Your comprehensive guide to 5th Settlement neighborhoods, property prices, compounds, and available amenities in this prime area.",
    categoryAr: "مناطق",
    categoryEn: "Areas",
    date: "مايو 24, 2026",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
    slug: "guide-to-5th-settlement",
  },
  {
    id: 3,
    titleAr: "6 نصائح قانونية عند شراء عقار في مصر",
    titleEn: "6 Legal Tips When Buying Property in Egypt",
    excerptAr: "قبل توقيع أي عقد، اقرأ هذه النصائح القانونية الضرورية لحماية حقوقك وضمان صفقة آمنة وشفافة.",
    excerptEn: "Before signing any contract, read these essential legal tips to protect your rights and ensure a safe, transparent deal.",
    categoryAr: "نصائح",
    categoryEn: "Tips",
    date: "مايو 20, 2026",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80",
    slug: "legal-tips-buying-property-egypt",
  },
  {
    id: 4,
    titleAr: "أبرز مشاريع مصر الجديدة وهليوبوليس الجديدة",
    titleEn: "Top New Cairo and New Heliopolis Projects",
    excerptAr: "استعراض لأهم المشاريع العقارية الجديدة في مصر الجديدة وهليوبوليس، ومميزاتها وأسعارها التقديرية.",
    excerptEn: "A review of the most important new real estate projects in New Cairo and Heliopolis, their features and estimated prices.",
    categoryAr: "مشاريع",
    categoryEn: "Projects",
    date: "مايو 15, 2026",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
    slug: "new-cairo-heliopolis-projects",
  },
  {
    id: 5,
    titleAr: "الفرق بين البيع المباشر والريسيل.. المزايا والعيوب",
    titleEn: "Direct Sale vs Resale.. Pros and Cons",
    excerptAr: "هل تبحث عن شقة؟ اعرف الفرق بين الشراء من المطور مباشرةً وشراء الريسيل واتخذ القرار الأنسب لك.",
    excerptEn: "Looking for an apartment? Learn the difference between buying directly from the developer vs resale and make the best decision for you.",
    categoryAr: "نصائح",
    categoryEn: "Tips",
    date: "مايو 10, 2026",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    slug: "direct-sale-vs-resale",
  },
  {
    id: 6,
    titleAr: "الزمالك: جوهرة القاهرة العقارية",
    titleEn: "Zamalek: Cairo's Real Estate Gem",
    excerptAr: "لماذا يظل الزمالك وجهة العقارات الفاخرة الأولى في القاهرة؟ تحليل للسوق وأسعار الوحدات وفرص الاستثمار.",
    excerptEn: "Why does Zamalek remain Cairo's top luxury real estate destination? Market analysis, unit prices, and investment opportunities.",
    categoryAr: "مناطق",
    categoryEn: "Areas",
    date: "مايو 5, 2026",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&q=80",
    slug: "zamalek-cairo-real-estate",
  },
];
