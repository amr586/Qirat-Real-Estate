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
  floor?: number;
  totalFloors?: number;
  yearBuilt?: number;
  finishing: string;
  finishingEn: string;
  compound?: string;
  compoundEn?: string;
  deliveryDate?: string;
  deliveryDateEn?: string;
  type: "sale" | "rent";
  typeAr: string;
  typeEn: string;
  image: string;
  gallery: string[];
  features: { ar: string; en: string }[];
  amenities: { ar: string; en: string }[];
  nearbyPlaces: { ar: string; en: string; distance: string }[];
  paymentOptions?: { ar: string; en: string }[];
  downPayment?: string;
  monthlyInstallment?: string;
  investmentReturn?: string;
  mapLat?: number;
  mapLng?: number;
}

export const properties: Property[] = [
  {
    id: 1,
    titleAr: "شقة فاخرة بالزمالك",
    titleEn: "Luxury Apartment in Zamalek",
    locationAr: "الزمالك، القاهرة",
    locationEn: "Zamalek, Cairo",
    descAr:
      "شقة فاخرة مميزة في قلب الزمالك بإطلالة بانورامية رائعة على نهر النيل، تتميز بتشطيبات أوروبية فاخرة وأثاث إيطالي راقٍ. تضم غرف نوم فسيحة مع دواليب مدمجة، مطبخ مجهز بأحدث الأجهزة الكهربائية، وصالة كبيرة بإضاءة طبيعية. موقع مثالي يتيح لك الوصول الفوري إلى أرقى المطاعم والمقاهي والمدارس الدولية، مع سهولة التنقل إلى جميع أنحاء القاهرة.",
    descEn:
      "Distinctive luxury apartment in the heart of Zamalek with a breathtaking panoramic Nile view, featuring premium European finishes and elegant Italian furnishings. Spacious bedrooms with built-in wardrobes, a fully equipped modern kitchen, and a large sunlit living room. Prime location with immediate access to top restaurants, cafés, and international schools, with easy commute throughout Cairo.",
    price: "12,500,000",
    area: 280,
    bedrooms: 4,
    bathrooms: 3,
    floor: 8,
    totalFloors: 12,
    yearBuilt: 2019,
    finishing: "تشطيب سوبر لوكس",
    finishingEn: "Super Lux Finishing",
    compound: "برج النيل السكني",
    compoundEn: "Nile Tower Residences",
    deliveryDate: "جاهز للتسليم الفوري",
    deliveryDateEn: "Ready for Immediate Delivery",
    type: "sale",
    typeAr: "للبيع",
    typeEn: "For Sale",
    downPayment: "2,500,000",
    monthlyInstallment: "85,000",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    ],
    features: [
      { ar: "إطلالة على النيل", en: "Nile View" },
      { ar: "موقف سيارات", en: "Parking" },
      { ar: "حارس أمن 24 ساعة", en: "24h Security Guard" },
      { ar: "مصعد كهربائي", en: "Elevator" },
      { ar: "تكييف مركزي", en: "Central AC" },
      { ar: "إنترنت فايبر", en: "Fiber Internet" },
      { ar: "تشطيب سوبر لوكس", en: "Super Lux Finish" },
      { ar: "أثاث إيطالي فاخر", en: "Luxury Italian Furniture" },
    ],
    amenities: [
      { ar: "صالة رياضية", en: "Gym" },
      { ar: "حمام سباحة مشترك", en: "Shared Pool" },
      { ar: "غرفة بوابة", en: "Gate Room" },
      { ar: "مولد كهربائي", en: "Generator" },
      { ar: "خزان مياه احتياطي", en: "Water Tank" },
      { ar: "منطقة استقبال", en: "Reception Area" },
    ],
    nearbyPlaces: [
      { ar: "نادي الجزيرة الرياضي", en: "Gezira Sporting Club", distance: "500م" },
      { ar: "كافيه ريش", en: "Café Riche", distance: "800م" },
      { ar: "مدرسة الحرية الدولية", en: "Al Horreya International School", distance: "1.2كم" },
      { ar: "مترو السادات", en: "Sadat Metro Station", distance: "2كم" },
    ],
    paymentOptions: [
      { ar: "دفع كامل بخصم 5%", en: "Full payment with 5% discount" },
      { ar: "مقدم 20% وأقساط 5 سنوات", en: "20% down, 5-year installments" },
      { ar: "مقدم 30% وأقساط 3 سنوات", en: "30% down, 3-year installments" },
    ],
    mapLat: 30.0616,
    mapLng: 31.2194,
  },
  {
    id: 2,
    titleAr: "فيلا عصرية في التجمع الخامس",
    titleEn: "Modern Villa in New Cairo",
    locationAr: "التجمع الخامس، القاهرة الجديدة",
    locationEn: "5th Settlement, New Cairo",
    descAr:
      "فيلا مستقلة فارهة في أرقى مجمعات التجمع الخامس، تصميم معماري عصري استثنائي يجمع بين الأناقة والوظيفة. تتكون من ثلاثة طوابق تشمل: طابق أرضي بصالة معيشة مفتوحة ومطبخ أمريكي وغرفة ضيوف، طابق أول بغرف النوم الرئيسية مع حمامات جاكوزي، وروف بتراس خاص بحمام سباحة. تحيط بها حديقة خاصة مشجرة مع منطقة شواء وإضاءة خارجية احترافية.",
    descEn:
      "Luxurious independent villa in New Cairo's most prestigious compound, featuring exceptional modern architecture that blends elegance and functionality. Spread across three floors: ground floor with open-plan living, American kitchen, and guest room; first floor with master bedrooms and Jacuzzi bathrooms; and a rooftop with a private pool terrace. Surrounded by a landscaped private garden with BBQ area and professional outdoor lighting.",
    price: "28,000,000",
    area: 600,
    bedrooms: 6,
    bathrooms: 5,
    floor: 1,
    totalFloors: 3,
    yearBuilt: 2021,
    finishing: "تشطيب ديلوكس بالكامل",
    finishingEn: "Full Deluxe Finishing",
    compound: "كمبوند ويستاون",
    compoundEn: "Westown Compound",
    deliveryDate: "جاهز للتسليم الفوري",
    deliveryDateEn: "Ready for Immediate Delivery",
    type: "sale",
    typeAr: "للبيع",
    typeEn: "For Sale",
    downPayment: "5,000,000",
    monthlyInstallment: "195,000",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    ],
    features: [
      { ar: "حديقة خاصة مشجرة", en: "Landscaped Private Garden" },
      { ar: "حمام سباحة على السطح", en: "Rooftop Swimming Pool" },
      { ar: "مرأب لسيارتين", en: "Double Garage" },
      { ar: "غرفة خادمة مستقلة", en: "Independent Maid's Room" },
      { ar: "نظام منزل ذكي", en: "Smart Home System" },
      { ar: "تراس خاص واسع", en: "Wide Private Terrace" },
      { ar: "كاميرات مراقبة", en: "Surveillance Cameras" },
      { ar: "منطقة شواء", en: "BBQ Area" },
    ],
    amenities: [
      { ar: "نادي رياضي متكامل", en: "Full Sports Club" },
      { ar: "حمام سباحة مشترك للأطفال", en: "Kids Shared Pool" },
      { ar: "ملاعب رياضية", en: "Sports Courts" },
      { ar: "مركز تسوق داخلي", en: "Internal Mall" },
      { ar: "روضة أطفال", en: "Kindergarten" },
      { ar: "مسجد", en: "Mosque" },
    ],
    nearbyPlaces: [
      { ar: "الجامعة الأمريكية بالقاهرة", en: "American University Cairo", distance: "3كم" },
      { ar: "سيتي ستارز مول", en: "City Stars Mall", distance: "8كم" },
      { ar: "مطار القاهرة الدولي", en: "Cairo International Airport", distance: "15كم" },
      { ar: "مستشفى كليوباترا", en: "Cleopatra Hospital", distance: "5كم" },
    ],
    paymentOptions: [
      { ar: "دفع كامل بخصم 8%", en: "Full payment with 8% discount" },
      { ar: "مقدم 20% وأقساط 7 سنوات", en: "20% down, 7-year installments" },
      { ar: "مقدم 40% وأقساط 4 سنوات", en: "40% down, 4-year installments" },
    ],
    mapLat: 30.0061,
    mapLng: 31.4356,
  },
  {
    id: 3,
    titleAr: "بنتهاوس مميز في مصر الجديدة",
    titleEn: "Exclusive Penthouse in Heliopolis",
    locationAr: "مصر الجديدة، القاهرة",
    locationEn: "Heliopolis, Cairo",
    descAr:
      "بنتهاوس حصري فريد من نوعه على الطابق الأخير من برج شاهق، يوفر إطلالة 360 درجة على القاهرة الكبرى بجمالها الليلي المبهر. يتميز بتراس دائري واسع يصلح للترفيه والاسترخاء، ومطبخ احترافي متكامل، وغرف نوم مع صالة ملابس واسعة لكل غرفة. التشطيبات تجمع الرخام الإيطالي مع الخشب الطبيعي وأحدث تقنيات الإضاءة الذكية وأنظمة الصوت والصورة المدمجة.",
    descEn:
      "A one-of-a-kind exclusive penthouse on the top floor of a high-rise tower, offering a stunning 360-degree panoramic view of Greater Cairo with breathtaking night scenery. Features a wide circular terrace ideal for entertainment and relaxation, a full professional kitchen, and bedrooms each with a spacious walk-in closet. Finishes combine Italian marble with natural wood, state-of-the-art smart lighting, and built-in audio-visual systems.",
    price: "18,750,000",
    area: 420,
    bedrooms: 5,
    bathrooms: 4,
    floor: 30,
    totalFloors: 30,
    yearBuilt: 2022,
    finishing: "تشطيب ألترا لوكس",
    finishingEn: "Ultra Lux Finishing",
    compound: "برج هيليوس",
    compoundEn: "Helios Tower",
    deliveryDate: "جاهز للتسليم الفوري",
    deliveryDateEn: "Ready for Immediate Delivery",
    type: "sale",
    typeAr: "للبيع",
    typeEn: "For Sale",
    downPayment: "3,750,000",
    monthlyInstallment: "130,000",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
    ],
    features: [
      { ar: "تراس دائري 360°", en: "360° Circular Terrace" },
      { ar: "إطلالة بانورامية كاملة", en: "Full Panoramic View" },
      { ar: "نظام منزل ذكي متكامل", en: "Full Smart Home System" },
      { ar: "أمن وكاميرات 24 ساعة", en: "24h Security & Cameras" },
      { ar: "صالة ملابس لكل غرفة", en: "Walk-in Closet per Room" },
      { ar: "رخام إيطالي فاخر", en: "Italian Marble" },
      { ar: "نظام صوت وصورة مدمج", en: "Built-in AV System" },
      { ar: "إضاءة ذكية متغيرة", en: "Smart Variable Lighting" },
    ],
    amenities: [
      { ar: "مسبح إنفينيتي على السطح", en: "Rooftop Infinity Pool" },
      { ar: "سبا ومركز عافية", en: "Spa & Wellness Center" },
      { ar: "صالة رياضية مجهزة", en: "Fully Equipped Gym" },
      { ar: "ردهة استقبال فندقية", en: "Hotel-Style Lobby" },
      { ar: "خدمة كونسيرج", en: "Concierge Service" },
      { ar: "موقف سيارات بدالة", en: "Valet Parking" },
    ],
    nearbyPlaces: [
      { ar: "مسجد النور", en: "Al Nour Mosque", distance: "300م" },
      { ar: "كارفور مصر الجديدة", en: "Carrefour Heliopolis", distance: "1كم" },
      { ar: "مطار القاهرة الدولي", en: "Cairo International Airport", distance: "6كم" },
      { ar: "مستشفى المعادي العام", en: "Maadi General Hospital", distance: "4كم" },
    ],
    paymentOptions: [
      { ar: "دفع كامل بخصم 10%", en: "Full payment with 10% discount" },
      { ar: "مقدم 25% وأقساط 6 سنوات", en: "25% down, 6-year installments" },
      { ar: "مقدم 30% وأقساط 4 سنوات", en: "30% down, 4-year installments" },
    ],
    mapLat: 30.0911,
    mapLng: 31.3219,
  },
  {
    id: 4,
    titleAr: "شقة للإيجار في المهندسين",
    titleEn: "Apartment for Rent in Mohandessin",
    locationAr: "المهندسين، الجيزة",
    locationEn: "Mohandessin, Giza",
    descAr:
      "شقة فاخرة مفروشة بالكامل في أحيا المهندسين الهادئة، تجمع بين الراحة والأناقة في موقع استراتيجي قريب من كل شيء. تشمل غرف نوم مريحة مع مراتب أرثوبيدية ودواليب مدمجة، صالة معيشة وسفرة بأثاث عصري، مطبخ مجهز بغسالة وثلاجة وميكروويف، وحمامات بتجهيزات فندقية. مناسبة لرجال الأعمال والعائلات الصغيرة، متاحة للإيجار السنوي أو الشهري.",
    descEn:
      "Fully furnished luxury apartment in a quiet Mohandessin neighborhood, combining comfort and elegance in a strategic location close to everything. Features comfortable bedrooms with orthopedic mattresses and built-in wardrobes, modern living and dining room furniture, a kitchen equipped with washer, refrigerator, and microwave, and bathrooms with hotel-quality fixtures. Suitable for business professionals and small families, available for annual or monthly rental.",
    price: "35,000/شهر",
    area: 180,
    bedrooms: 3,
    bathrooms: 2,
    floor: 4,
    totalFloors: 8,
    yearBuilt: 2018,
    finishing: "مفروش بالكامل — سوبر لوكس",
    finishingEn: "Fully Furnished — Super Lux",
    deliveryDate: "متاح فوراً",
    deliveryDateEn: "Available Immediately",
    type: "rent",
    typeAr: "للإيجار",
    typeEn: "For Rent",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80",
      "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80",
    ],
    features: [
      { ar: "مفروش بالكامل", en: "Fully Furnished" },
      { ar: "تكييف مركزي", en: "Central AC" },
      { ar: "إنترنت فايبر مجاني", en: "Free Fiber Internet" },
      { ar: "أمن 24 ساعة", en: "24h Security" },
      { ar: "غسالة ملابس", en: "Washing Machine" },
      { ar: "مطبخ مجهز بالكامل", en: "Fully Equipped Kitchen" },
      { ar: "مصعد كهربائي", en: "Elevator" },
      { ar: "موقف سيارات خاص", en: "Private Parking" },
    ],
    amenities: [
      { ar: "مولد كهربائي احتياطي", en: "Backup Generator" },
      { ar: "بواب طوال اليوم", en: "Full-Day Doorman" },
      { ar: "خزان مياه", en: "Water Tank" },
      { ar: "دش سخن مركزي", en: "Central Water Heater" },
    ],
    nearbyPlaces: [
      { ar: "سوبر ماركت سيفوي", en: "Seoudi Supermarket", distance: "200م" },
      { ar: "محطة مترو الجيزة", en: "Giza Metro Station", distance: "1.5كم" },
      { ar: "مستشفى الهلال", en: "Al Hilal Hospital", distance: "700م" },
      { ar: "شارع جامعة الدول", en: "Arab League Street", distance: "400م" },
    ],
    paymentOptions: [
      { ar: "إيجار شهري 35,000 ج.م", en: "Monthly rent 35,000 EGP" },
      { ar: "إيجار سنوي 380,000 ج.م (توفير شهرين)", en: "Annual rent 380,000 EGP (save 2 months)" },
    ],
    mapLat: 30.0571,
    mapLng: 31.2072,
  },
  {
    id: 5,
    titleAr: "وحدة تجارية مميزة بمدينة نصر",
    titleEn: "Premium Commercial Unit in Nasr City",
    locationAr: "مدينة نصر، القاهرة",
    locationEn: "Nasr City, Cairo",
    descAr:
      "فرصة استثمارية نادرة: وحدة تجارية استراتيجية في أحد أبرز مراكز مدينة نصر التجارية، بواجهة زجاجية على الشارع الرئيسي وحركة مرور كثيفة يومياً. الوحدة بتشطيب كامل جاهزة للعمل فوراً، مناسبة لمشاريع التجزئة والمطاعم والعيادات والخدمات. العائد الاستثماري المتوقع يتراوح بين 12% و18% سنوياً. ندعوك للشراكة في مشروع مضمون بعائد متميز.",
    descEn:
      "A rare investment opportunity: a strategic commercial unit in one of Nasr City's most prominent commercial centers, with a glass frontage on the main street and heavy daily footfall. The unit is fully finished and ready for immediate operation, suitable for retail, restaurants, clinics, and service businesses. Expected investment return between 12% and 18% annually. We invite you to partner in a guaranteed project with an outstanding return.",
    price: "8,200,000",
    area: 150,
    bedrooms: 0,
    bathrooms: 2,
    floor: 1,
    totalFloors: 6,
    yearBuilt: 2020,
    finishing: "تشطيب كامل جاهز للتشغيل",
    finishingEn: "Full Finish Ready to Operate",
    compound: "مركز نصر التجاري",
    compoundEn: "Nasr Business Center",
    deliveryDate: "جاهز للتشغيل الفوري",
    deliveryDateEn: "Ready for Immediate Operation",
    type: "sale",
    typeAr: "للبيع",
    typeEn: "For Sale",
    investmentReturn: "12% – 18%",
    downPayment: "2,000,000",
    monthlyInstallment: "55,000",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&q=80",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
    ],
    features: [
      { ar: "موقع استراتيجي مميز", en: "Prime Strategic Location" },
      { ar: "واجهة زجاجية على الشارع", en: "Glass Street Frontage" },
      { ar: "عائد استثماري 12-18%", en: "12-18% Investment Return" },
      { ar: "تشطيب كامل جاهز", en: "Full Ready Finish" },
      { ar: "موقف سيارات للعملاء", en: "Customer Parking" },
      { ar: "حركة مرور كثيفة يومياً", en: "High Daily Footfall" },
      { ar: "أمن ومراقبة مستمرة", en: "Continuous Security & Surveillance" },
      { ar: "مصعد وسلالم طوارئ", en: "Elevator & Emergency Stairs" },
    ],
    amenities: [
      { ar: "مولد كهربائي احتياطي", en: "Backup Generator" },
      { ar: "أنظمة إطفاء حريق", en: "Fire Suppression Systems" },
      { ar: "تكييف مركزي للمبنى", en: "Central Building AC" },
      { ar: "إنترنت فايبر للمبنى", en: "Building Fiber Internet" },
      { ar: "خدمات صيانة مشتركة", en: "Shared Maintenance Services" },
    ],
    nearbyPlaces: [
      { ar: "كارفور مدينة نصر", en: "Carrefour Nasr City", distance: "500م" },
      { ar: "محكمة شمال القاهرة", en: "North Cairo Court", distance: "1كم" },
      { ar: "مترو العباسية", en: "Abbasia Metro Station", distance: "2كم" },
      { ar: "فندق ماريوت القاهرة", en: "Cairo Marriott Hotel", distance: "4كم" },
    ],
    paymentOptions: [
      { ar: "دفع كامل بخصم 7%", en: "Full payment with 7% discount" },
      { ar: "مقدم 25% وأقساط 5 سنوات", en: "25% down, 5-year installments" },
      { ar: "شراكة بنسبة ربح متفق عليها", en: "Partnership with agreed profit share" },
    ],
    mapLat: 30.0684,
    mapLng: 31.3484,
  },
];
