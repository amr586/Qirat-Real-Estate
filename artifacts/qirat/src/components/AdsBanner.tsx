import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";

const ADS = [
  {
    id: 1,
    titleAr: "عروض قيراط الحصرية",
    titleEn: "Qirat Exclusive Offers",
    subtitleAr: "+ كل عروض السوق العقاري",
    subtitleEn: "+ All Real Estate Market Deals",
    bg: "linear-gradient(135deg, #0F2347 0%, #1B3A6B 60%, #2a4d8f 100%)",
    accent: "#C9A84C",
    icon: "%",
    iconBg: "rgba(201,168,76,0.18)",
    href: "/properties",
  },
  {
    id: 2,
    titleAr: "استثمر بذكاء في القاهرة",
    titleEn: "Invest Smartly in Cairo",
    subtitleAr: "عائد إيجاري يصل إلى 12% سنوياً",
    subtitleEn: "Rental yield up to 12% annually",
    bg: "linear-gradient(135deg, #C9A84C 0%, #a87d30 60%, #8a6420 100%)",
    accent: "#ffffff",
    icon: "↑",
    iconBg: "rgba(255,255,255,0.18)",
    href: "/services",
  },
  {
    id: 3,
    titleAr: "بيع وحدتك بأعلى سعر",
    titleEn: "Sell Your Unit at Best Price",
    subtitleAr: "نسوّق عقارك لأكثر من 10,000 مشتري",
    subtitleEn: "We market your property to 10,000+ buyers",
    bg: "linear-gradient(135deg, #1B3A6B 0%, #0F2347 60%, #091929 100%)",
    accent: "#C9A84C",
    icon: "🏠",
    iconBg: "rgba(201,168,76,0.15)",
    href: "/sell",
  },
];

export default function AdsBanner() {
  const { t, lang, dir } = useLang();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((i) => (i + 1) % ADS.length), []);
  const prev = useCallback(() => setCurrent((i) => (i - 1 + ADS.length) % ADS.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <section className="py-10 px-4" style={{ background: "#f5f0e8" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex items-end justify-between mb-6 flex-wrap gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <span className="text-qirat-gold font-semibold text-xs uppercase tracking-widest mb-1 block">
              {t("إعلانات", "Promotions")}
            </span>
            <h2
              className="text-2xl md:text-3xl font-black text-qirat-navy"
              style={{ fontFamily: lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif" }}
            >
              {t("عروض حصرية", "Exclusive Offers")}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {ADS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === current ? 24 : 8,
                  height: 8,
                  background: i === current ? "#C9A84C" : "#1B3A6B33",
                }}
              />
            ))}
          </div>
        </motion.div>

        <div
          className="relative overflow-hidden rounded-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          dir={dir}
        >
          <AnimatePresence mode="wait">
            <motion.a
              key={current}
              href={ADS[current].href}
              className="flex items-center justify-between gap-6 px-10 py-10 md:py-12 cursor-pointer select-none"
              style={{ background: ADS[current].bg, minHeight: 160 }}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              <div
                className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center text-4xl md:text-5xl font-black"
                style={{
                  background: ADS[current].iconBg,
                  color: ADS[current].accent,
                  border: `1.5px solid ${ADS[current].accent}33`,
                }}
              >
                {ADS[current].icon}
              </div>

              <div className="flex-1 text-center md:text-start">
                <h3
                  className="text-2xl md:text-4xl font-black mb-2 leading-tight"
                  style={{
                    color: ADS[current].accent,
                    fontFamily: lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif",
                  }}
                >
                  {t(ADS[current].titleAr, ADS[current].titleEn)}
                </h3>
                <p
                  className="text-base md:text-lg font-semibold opacity-80"
                  style={{ color: ADS[current].accent }}
                >
                  {t(ADS[current].subtitleAr, ADS[current].subtitleEn)}
                </p>
              </div>

              <motion.div
                className="flex-shrink-0 px-6 py-3 rounded-xl font-bold text-sm hidden md:block"
                style={{
                  background: ADS[current].accent,
                  color: ADS[current].accent === "#ffffff" ? "#1B3A6B" : "#ffffff",
                }}
                whileHover={{ scale: 1.05 }}
              >
                {t("اكتشف الآن", "Explore Now")}
              </motion.div>
            </motion.a>
          </AnimatePresence>

          <button
            onClick={(e) => { e.preventDefault(); prev(); }}
            className="absolute top-1/2 -translate-y-1/2 start-3 w-9 h-9 rounded-full flex items-center justify-center transition-all z-10"
            style={{ background: "rgba(0,0,0,0.25)", color: "#fff" }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); next(); }}
            className="absolute top-1/2 -translate-y-1/2 end-3 w-9 h-9 rounded-full flex items-center justify-center transition-all z-10"
            style={{ background: "rgba(0,0,0,0.25)", color: "#fff" }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
