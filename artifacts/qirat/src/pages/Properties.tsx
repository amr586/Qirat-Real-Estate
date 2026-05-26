import { useState, useEffect, useMemo } from "react";
import { Link, useSearch } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, BedDouble, Bath, Maximize2, ArrowLeft, ArrowRight,
  Search, SlidersHorizontal, ChevronDown, X, Star, Phone,
} from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { properties, Property } from "../data/properties";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

function inferUnitType(p: Property): string {
  const title = p.titleAr + " " + p.titleEn;
  if (/بنتهاوس|Penthouse/i.test(title)) return "penthouse";
  if (/فيلا|Villa/i.test(title)) return "villa";
  if (/تجاري|Commercial/i.test(title) || p.bedrooms === 0) return "commercial";
  if (/شقة|Apartment/i.test(title)) return "apartment";
  return "apartment";
}

function inferPurpose(p: Property): string {
  if (p.bedrooms === 0 || p.type === "partnership") return "commercial";
  return "residential";
}

function parseNumericPrice(price: string): number {
  const n = price.replace(/[^0-9]/g, "");
  return parseInt(n, 10) || 0;
}

const FEATURED_IDS = [1, 2, 3];

const UNIT_TYPE_OPTIONS = [
  { key: "", ar: "الكل", en: "All" },
  { key: "apartment", ar: "شقة", en: "Apartment" },
  { key: "villa", ar: "فيلا", en: "Villa" },
  { key: "penthouse", ar: "بنتهاوس", en: "Penthouse" },
  { key: "commercial", ar: "وحدة تجارية", en: "Commercial" },
];

const PURPOSE_OPTIONS = [
  { key: "", ar: "الكل", en: "All" },
  { key: "residential", ar: "سكني", en: "Residential" },
  { key: "commercial", ar: "تجاري", en: "Commercial" },
];

const AD_TYPE_OPTIONS = [
  { key: "", ar: "الكل", en: "All" },
  { key: "sale", ar: "للبيع", en: "For Sale" },
  { key: "rent", ar: "للإيجار", en: "For Rent" },
  { key: "partnership", ar: "شراكة", en: "Partnership" },
];

const STATUS_OPTIONS = [
  { key: "available", ar: "متاح", en: "Available" },
];

function SelectBox({
  label, value, onChange, options, dir,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { key: string; ar: string; en: string }[];
  dir: string;
}) {
  const { lang } = useLang();
  return (
    <div className="flex-1 min-w-[120px]">
      <label className="block text-qirat-navy/50 text-[11px] font-bold uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none px-3 py-2.5 rounded-xl border border-gray-200 text-qirat-navy text-sm font-semibold bg-white focus:outline-none focus:border-qirat-gold/60 focus:ring-2 focus:ring-qirat-gold/10 transition-all cursor-pointer"
          dir={dir}
        >
          {options.map((o) => (
            <option key={o.key} value={o.key}>
              {lang === "ar" ? o.ar : o.en}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 text-qirat-navy/40 pointer-events-none"
          style={{ [dir === "rtl" ? "left" : "right"]: "10px" }}
        />
      </div>
    </div>
  );
}

function PriceInput({
  label, value, onChange, placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="flex-1 min-w-[130px]">
      <label className="block text-qirat-navy/50 text-[11px] font-bold uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-qirat-navy text-sm focus:outline-none focus:border-qirat-gold/60 focus:ring-2 focus:ring-qirat-gold/10 transition-all"
      />
    </div>
  );
}

function PropertyCard({ prop, index, featured }: { prop: Property; index: number; featured?: boolean }) {
  const { t, lang } = useLang();
  const typeColors: Record<string, string> = {
    sale: "#1B3A6B",
    rent: "#C9A84C",
    partnership: "#0F2347",
  };

  return (
    <motion.div
      className="property-card bg-white rounded-3xl overflow-hidden shadow-lg relative"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.95 }}
      custom={index}
      layout
    >
      <div className="relative h-60 overflow-hidden">
        <img
          src={prop.image}
          alt={lang === "ar" ? prop.titleAr : prop.titleEn}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
        />
        <div
          className="absolute top-4 flex items-center gap-2"
          style={{ [lang === "ar" ? "right" : "left"]: "16px" }}
        >
          <span
            className="px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg"
            style={{ background: typeColors[prop.type] }}
          >
            {lang === "ar" ? prop.typeAr : prop.typeEn}
          </span>
          {featured && (
            <span
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg"
              style={{ background: "rgba(201,168,76,0.95)" }}
            >
              <Star className="w-3 h-3 fill-white" />
              {t("مميز", "Featured")}
            </span>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="p-6">
        <h3
          className="text-xl font-black text-qirat-navy mb-1 line-clamp-1"
          style={{ fontFamily: lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif" }}
        >
          {lang === "ar" ? prop.titleAr : prop.titleEn}
        </h3>
        <div className="flex items-center gap-1.5 text-qirat-gold text-sm font-semibold mb-4">
          <MapPin className="w-3.5 h-3.5" />
          {lang === "ar" ? prop.locationAr : prop.locationEn}
        </div>
        <div className="flex gap-4 text-qirat-navy/60 text-sm mb-5 flex-wrap">
          {prop.bedrooms > 0 && (
            <div className="flex items-center gap-1.5">
              <BedDouble className="w-4 h-4" />
              <span>{prop.bedrooms} {t("غرف", "Beds")}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4" />
            <span>{prop.bathrooms} {t("حمام", "Bath")}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-4 h-4" />
            <span>{prop.area} {t("م²", "m²")}</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-qirat-navy text-xl font-black">{prop.price}</span>
            <span className="text-qirat-navy/50 text-xs mr-1">{t("ج.م", "EGP")}</span>
          </div>
          <div className="flex items-center gap-2">
            <a href="tel:+201281378331">
              <motion.button
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-white transition-all"
                style={{ background: "linear-gradient(135deg, #1B3A6B, #0F2347)", border: "1px solid rgba(201,168,76,0.3)" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Phone className="w-3.5 h-3.5 text-qirat-gold" />
                {t("اتصل الآن", "Call Now")}
              </motion.button>
            </a>
            <Link href={`/properties/${prop.id}`}>
              <motion.button
                className="flex items-center gap-2 btn-gold px-5 py-2.5 rounded-xl text-sm font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {t("التفاصيل", "Details")}
                {lang === "ar" ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Properties() {
  const { t, lang, dir } = useLang();
  const searchString = useSearch();

  const params = useMemo(() => new URLSearchParams(searchString), [searchString]);

  const [searchText, setSearchText] = useState(params.get("q") || "");
  const [showFilters, setShowFilters] = useState(!!searchString);
  const [unitType, setUnitType] = useState(params.get("unitType") || "");
  const [purpose, setPurpose] = useState(params.get("purpose") || "");
  const [zone, setZone] = useState(params.get("location") || "");
  const [adType, setAdType] = useState((params.get("type") as "sale" | "rent" | "partnership" | "") || "");
  const [minPrice, setMinPrice] = useState(params.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(params.get("maxPrice") || "");
  const [minArea, setMinArea] = useState(params.get("minArea") || "");
  const [maxArea, setMaxArea] = useState(params.get("maxArea") || "");
  const [featuredOnly, setFeaturedOnly] = useState(params.get("featured") === "1");

  const zones = useMemo(() => {
    const seen = new Set<string>();
    return properties
      .map((p) => ({ ar: p.locationAr.split("،")[0].trim(), en: p.locationEn.split(",")[0].trim() }))
      .filter((z) => {
        const key = z.ar;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }, []);

  const zoneOptions = useMemo(() => [
    { key: "", ar: "الكل", en: "All" },
    ...zones.map((z) => ({ key: z.ar, ar: z.ar, en: z.en })),
  ], [zones]);

  const hasActiveFilters = searchText || unitType || purpose || zone || adType || minPrice || maxPrice || minArea || maxArea || featuredOnly;

  const clearFilters = () => {
    setSearchText("");
    setUnitType("");
    setPurpose("");
    setZone("");
    setAdType("");
    setMinPrice("");
    setMaxPrice("");
    setMinArea("");
    setMaxArea("");
    setFeaturedOnly(false);
  };

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (searchText.trim()) {
        const q = searchText.toLowerCase();
        const match =
          p.titleAr.toLowerCase().includes(q) ||
          p.titleEn.toLowerCase().includes(q) ||
          p.locationAr.toLowerCase().includes(q) ||
          p.locationEn.toLowerCase().includes(q);
        if (!match) return false;
      }

      if (unitType && inferUnitType(p) !== unitType) return false;
      if (purpose && inferPurpose(p) !== purpose) return false;

      if (zone) {
        const loc = p.locationAr + " " + p.locationEn;
        if (!loc.includes(zone)) return false;
      }

      if (adType && p.type !== adType) return false;

      const numericPrice = parseNumericPrice(p.price);
      if (minPrice && numericPrice < parseInt(minPrice, 10)) return false;
      if (maxPrice && numericPrice > parseInt(maxPrice, 10)) return false;

      if (minArea && p.area < parseInt(minArea, 10)) return false;
      if (maxArea && p.area > parseInt(maxArea, 10)) return false;

      if (featuredOnly && !FEATURED_IDS.includes(p.id)) return false;

      return true;
    });
  }, [searchText, unitType, purpose, zone, adType, minPrice, maxPrice, minArea, maxArea, featuredOnly]);

  const activeCount = [searchText, unitType, purpose, zone, adType, minPrice, maxPrice, minArea, maxArea, featuredOnly].filter(Boolean).length;

  return (
    <div dir={dir} className="pt-20">
      {/* Hero */}
      <div
        className="relative py-20 px-4 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #0F2347 100%)" }}
      >
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=40"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.span
            className="text-qirat-gold font-semibold text-sm uppercase tracking-widest mb-3 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t("أكثر من 100 عقار في مختلف الأماكن · ابحث، قارن وتواصل معنا", "100+ properties across Cairo · Search, compare and contact us")}
          </motion.span>
          <motion.h1
            className="text-5xl md:text-6xl font-black text-white mb-6"
            style={{ fontFamily: lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            {t("تصفح العقارات", "Browse Properties")}
          </motion.h1>
          <div className="section-divider" />
        </div>
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-20 z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">

          {/* Search row */}
          <div className="flex gap-3 items-center">
            <div className="relative flex-1">
              <Search
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 text-qirat-navy/40"
                style={{ [dir === "rtl" ? "right" : "left"]: "14px" }}
              />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && setSearchText("")}
                placeholder={t("ابحث عن عقار...", "Search for a property...")}
                className="w-full py-2.5 rounded-xl border border-gray-200 text-qirat-navy text-sm focus:outline-none focus:border-qirat-gold/60 focus:ring-2 focus:ring-qirat-gold/10 transition-all"
                style={{
                  [dir === "rtl" ? "paddingRight" : "paddingLeft"]: "40px",
                  [dir === "rtl" ? "paddingLeft" : "paddingRight"]: "14px",
                }}
              />
            </div>

            <motion.button
              onClick={() => setShowFilters((v) => !v)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all flex-shrink-0"
              style={{
                borderColor: showFilters ? "#C9A84C" : "#e5e7eb",
                color: showFilters ? "#C9A84C" : "#1B3A6B",
                background: showFilters ? "rgba(201,168,76,0.06)" : "white",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <SlidersHorizontal className="w-4 h-4" />
              {t("فلاتر", "Filters")}
              {activeCount > 0 && (
                <span
                  className="w-5 h-5 rounded-full text-xs font-bold text-white flex items-center justify-center"
                  style={{ background: "#C9A84C" }}
                >
                  {activeCount}
                </span>
              )}
            </motion.button>

            {hasActiveFilters && (
              <motion.button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-semibold flex-shrink-0"
                style={{ color: "#C9A84C", border: "1px solid rgba(201,168,76,0.3)", background: "rgba(201,168,76,0.06)" }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <X className="w-3.5 h-3.5" />
                {t("مسح", "Clear")}
              </motion.button>
            )}
          </div>

          {/* Expanded filter panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="pt-4 space-y-4">
                  {/* Dropdowns row */}
                  <div className="flex flex-wrap gap-3">
                    <SelectBox
                      label={t("نوع الوحدة", "Unit Type")}
                      value={unitType}
                      onChange={setUnitType}
                      options={UNIT_TYPE_OPTIONS}
                      dir={dir}
                    />
                    <SelectBox
                      label={t("الغرض", "Purpose")}
                      value={purpose}
                      onChange={setPurpose}
                      options={PURPOSE_OPTIONS}
                      dir={dir}
                    />
                    <SelectBox
                      label={t("المنطقة", "Zone")}
                      value={zone}
                      onChange={setZone}
                      options={zoneOptions}
                      dir={dir}
                    />
                    <SelectBox
                      label={t("نوع الإعلان", "Ad Type")}
                      value={adType}
                      onChange={setAdType}
                      options={AD_TYPE_OPTIONS}
                      dir={dir}
                    />
                    <SelectBox
                      label={t("الحالة", "Status")}
                      value="available"
                      onChange={() => {}}
                      options={STATUS_OPTIONS}
                      dir={dir}
                    />
                  </div>

                  {/* Price + Area */}
                  <div className="flex flex-wrap gap-3">
                    <PriceInput
                      label={t("السعر الأدنى (ج)", "Min Price (EGP)")}
                      value={minPrice}
                      onChange={setMinPrice}
                      placeholder={t("0", "0")}
                    />
                    <PriceInput
                      label={t("السعر الأقصى (ج)", "Max Price (EGP)")}
                      value={maxPrice}
                      onChange={setMaxPrice}
                      placeholder={t("غير محدد", "Unlimited")}
                    />
                    <PriceInput
                      label={t("المساحة الأدنى (م²)", "Min Area (m²)")}
                      value={minArea}
                      onChange={setMinArea}
                      placeholder={t("0", "0")}
                    />
                    <PriceInput
                      label={t("المساحة الأقصى (م²)", "Max Area (m²)")}
                      value={maxArea}
                      onChange={setMaxArea}
                      placeholder={t("غير محدد", "Unlimited")}
                    />

                    {/* Featured checkbox */}
                    <div className="flex items-end pb-0.5 min-w-[140px]">
                      <label className="flex items-center gap-2.5 cursor-pointer group">
                        <div
                          className="w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all"
                          style={{
                            borderColor: featuredOnly ? "#C9A84C" : "#d1d5db",
                            background: featuredOnly ? "#C9A84C" : "white",
                          }}
                          onClick={() => setFeaturedOnly((v) => !v)}
                        >
                          {featuredOnly && (
                            <motion.svg
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-3 h-3 text-white"
                              viewBox="0 0 12 12"
                              fill="none"
                            >
                              <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </motion.svg>
                          )}
                        </div>
                        <span className="text-qirat-navy text-sm font-semibold flex items-center gap-1.5">
                          <Star className="w-3.5 h-3.5 text-qirat-gold" />
                          {t("عقارات مميزة", "Featured Only")}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Grid */}
      <section className="py-12 px-4 bg-qirat-cream min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          <motion.p
            className="text-qirat-navy/50 text-sm mb-8"
            key={`${searchText}-${unitType}-${purpose}-${zone}-${adType}-${minPrice}-${maxPrice}-${minArea}-${maxArea}-${featuredOnly}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {t(`عرض ${filtered.length} عقار`, `Showing ${filtered.length} ${filtered.length === 1 ? "property" : "properties"}`)}
          </motion.p>

          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filtered.map((prop, i) => (
                <PropertyCard
                  key={prop.id}
                  prop={prop}
                  index={i}
                  featured={FEATURED_IDS.includes(prop.id)}
                />
              ))}
            </div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div
              className="text-center py-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-qirat-navy/40 text-xl mb-4">
                {t("لا توجد عقارات مطابقة للفلتر", "No properties match your filters")}
              </p>
              <motion.button
                onClick={clearFilters}
                className="btn-gold px-6 py-3 rounded-xl font-bold text-sm"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                {t("عرض جميع العقارات", "Show All Properties")}
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
