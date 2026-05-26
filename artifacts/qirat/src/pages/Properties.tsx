import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, BedDouble, Bath, Maximize2, ArrowLeft, ArrowRight, SlidersHorizontal } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { properties, Property } from "../data/properties";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

function PropertyCard({ prop, index }: { prop: Property; index: number }) {
  const { t, lang } = useLang();

  const typeColors: Record<string, string> = {
    sale: "#1B3A6B",
    rent: "#C9A84C",
    partnership: "#0F2347",
  };

  return (
    <motion.div
      className="property-card bg-white rounded-3xl overflow-hidden shadow-lg"
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
        <div className="absolute top-4 left-4">
          <span
            className="px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg"
            style={{ background: typeColors[prop.type] }}
          >
            {lang === "ar" ? prop.typeAr : prop.typeEn}
          </span>
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
            <span className="text-qirat-navy text-xl font-black">
              {prop.price}
            </span>
            <span className="text-qirat-navy/50 text-xs mr-1">{t("ج.م", "EGP")}</span>
          </div>
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
    </motion.div>
  );
}

export default function Properties() {
  const { t, lang, dir } = useLang();
  const [filter, setFilter] = useState<"all" | "sale" | "rent" | "partnership">("all");

  const filtered = filter === "all" ? properties : properties.filter((p) => p.type === filter);

  const filters = [
    { key: "all", ar: "الكل", en: "All" },
    { key: "sale", ar: "للبيع", en: "For Sale" },
    { key: "rent", ar: "للإيجار", en: "For Rent" },
    { key: "partnership", ar: "شراكة", en: "Partnership" },
  ] as const;

  return (
    <div dir={dir} className="pt-20">
      {/* Hero */}
      <div
        className="relative py-28 px-4 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #0F2347 100%)" }}
      >
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=40"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.span
            className="text-qirat-gold font-semibold text-sm uppercase tracking-widest mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t("كل العقارات في مكان واحد", "All Properties in One Place")}
          </motion.span>
          <motion.h1
            className="text-5xl md:text-6xl font-black text-white mb-6"
            style={{ fontFamily: lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            {t("عقارات القاهرة", "Cairo Properties")}
          </motion.h1>
          <div className="section-divider" />
          <motion.p
            className="text-white/75 text-lg mt-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {t(
              "تصفح أفضل العقارات في القاهرة — سكنية وتجارية — بأسعار تنافسية وخدمة احترافية",
              "Browse the best properties in Cairo — residential and commercial — at competitive prices with professional service"
            )}
          </motion.p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-20 z-20 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 flex-wrap">
            <SlidersHorizontal className="w-5 h-5 text-qirat-navy/50 flex-shrink-0" />
            {filters.map((f) => (
              <motion.button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all"
                style={
                  filter === f.key
                    ? { background: "#1B3A6B", color: "white", boxShadow: "0 4px 12px rgba(27,58,107,0.3)" }
                    : { background: "#F5F5F0", color: "#1B3A6B" }
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {t(f.ar, f.en)}
                <span className="ml-2 opacity-60 text-xs">
                  ({f.key === "all" ? properties.length : properties.filter((p) => p.type === f.key).length})
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-16 px-4 bg-qirat-cream min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          <motion.p
            className="text-qirat-navy/50 text-sm mb-8"
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {t(`عرض ${filtered.length} عقار`, `Showing ${filtered.length} properties`)}
          </motion.p>

          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filtered.map((prop, i) => (
                <PropertyCard key={prop.id} prop={prop} index={i} />
              ))}
            </div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-qirat-navy/40">
              {t("لا توجد عقارات مطابقة", "No matching properties")}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
