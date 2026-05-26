export interface Property {
  id: number;
  titleAr: string;
  titleEn: string;
  locationAr: string;
  locationEn: string;
  descAr: string;
  descEn: string;
  price: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  type: "sale" | "rent" | "partnership";
  typeAr: string;
  typeEn: string;
  image: string;
  features: { ar: string; en: string }[];
}

export const properties: Property[] = [
  {
    id: 1,
    titleAr: "شقة فاخرة بالزمالك",
    titleEn: "Luxury Apartment in Zamalek",
    locationAr: "الزمالك، القاهرة",
    locationEn: "Zamalek, Cairo",
    descAr:
      "شقة فاخرة مميزة في قلب الزمالك بإطلالة بانورامية على النيل، تشطيبات عالية الجودة وأثاث فاخر. موقع مثالي بالقرب من المطاعم والخدمات.",
    descEn:
      "Distinctive luxury apartment in the heart of Zamalek with a panoramic Nile view, high-quality finishes and elegant furnishings. Prime location near restaurants and services.",
    price: "12,500,000",
    area: 280,
    bedrooms: 4,
    bathrooms: 3,
    type: "sale",
    typeAr: "للبيع",
    typeEn: "For Sale",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    features: [
      { ar: "إطلالة على النيل", en: "Nile View" },
      { ar: "موقف سيارات", en: "Parking" },
      { ar: "حارس أمن", en: "Security Guard" },
      { ar: "مصعد", en: "Elevator" },
    ],
  },
  {
    id: 2,
    titleAr: "فيلا عصرية في التجمع الخامس",
    titleEn: "Modern Villa in New Cairo",
    locationAr: "التجمع الخامس، القاهرة الجديدة",
    locationEn: "5th Settlement, New Cairo",
    descAr:
      "فيلا عصرية مستقلة على مساحة شاسعة في قلب التجمع الخامس، تصميم معماري راقٍ مع حديقة خاصة وحمام سباحة. مثالية للعائلات.",
    descEn:
      "Independent modern villa on a vast area in the heart of 5th Settlement, elegant architectural design with a private garden and swimming pool. Perfect for families.",
    price: "28,000,000",
    area: 600,
    bedrooms: 6,
    bathrooms: 5,
    type: "sale",
    typeAr: "للبيع",
    typeEn: "For Sale",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    features: [
      { ar: "حديقة خاصة", en: "Private Garden" },
      { ar: "حمام سباحة", en: "Swimming Pool" },
      { ar: "مرأب للسيارات", en: "Garage" },
      { ar: "غرفة خادمة", en: "Maid's Room" },
    ],
  },
  {
    id: 3,
    titleAr: "بنتهاوس مميز في مصر الجديدة",
    titleEn: "Exclusive Penthouse in Heliopolis",
    locationAr: "مصر الجديدة، القاهرة",
    locationEn: "Heliopolis, Cairo",
    descAr:
      "بنتهاوس حصري على الطابق الأخير بإطلالة 360 درجة على القاهرة، مع تراس خاص واسع وأحدث التشطيبات الفاخرة.",
    descEn:
      "Exclusive penthouse on the top floor with a 360-degree view of Cairo, featuring a wide private terrace and the latest luxury finishes.",
    price: "18,750,000",
    area: 420,
    bedrooms: 5,
    bathrooms: 4,
    type: "sale",
    typeAr: "للبيع",
    typeEn: "For Sale",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    features: [
      { ar: "تراس خاص", en: "Private Terrace" },
      { ar: "إطلالة 360°", en: "360° View" },
      { ar: "نظام ذكي", en: "Smart Home" },
      { ar: "أمن 24 ساعة", en: "24h Security" },
    ],
  },
  {
    id: 4,
    titleAr: "شقة للإيجار في المهندسين",
    titleEn: "Apartment for Rent in Mohandessin",
    locationAr: "المهندسين، الجيزة",
    locationEn: "Mohandessin, Giza",
    descAr:
      "شقة أنيقة مفروشة بالكامل في موقع مميز بالمهندسين، قريبة من كافة الخدمات والمواصلات، تشطيبات حديثة وتكييف مركزي.",
    descEn:
      "Elegant fully furnished apartment in a prime Mohandessin location, close to all services and transportation, modern finishes and central air conditioning.",
    price: "35,000/شهر",
    area: 180,
    bedrooms: 3,
    bathrooms: 2,
    type: "rent",
    typeAr: "للإيجار",
    typeEn: "For Rent",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    features: [
      { ar: "مفروش بالكامل", en: "Fully Furnished" },
      { ar: "تكييف مركزي", en: "Central AC" },
      { ar: "إنترنت فايبر", en: "Fiber Internet" },
      { ar: "أمن 24 ساعة", en: "24h Security" },
    ],
  },
  {
    id: 5,
    titleAr: "وحدة تجارية للشراكة بمدينة نصر",
    titleEn: "Commercial Unit Partnership in Nasr City",
    locationAr: "مدينة نصر، القاهرة",
    locationEn: "Nasr City, Cairo",
    descAr:
      "وحدة تجارية استراتيجية في أحد أبرز مراكز مدينة نصر، مناسبة للشراكة في مشاريع التجزئة والخدمات، عائد استثماري مرتفع.",
    descEn:
      "Strategic commercial unit in one of Nasr City's most prominent centers, suitable for retail and services partnership projects, high investment return.",
    price: "8,200,000",
    area: 150,
    bedrooms: 0,
    bathrooms: 2,
    type: "partnership",
    typeAr: "شراكة",
    typeEn: "Partnership",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    features: [
      { ar: "موقع استراتيجي", en: "Strategic Location" },
      { ar: "واجهة تجارية", en: "Commercial Frontage" },
      { ar: "عائد مرتفع", en: "High Return" },
      { ar: "تشطيب كامل", en: "Full Finish" },
    ],
  },
];
