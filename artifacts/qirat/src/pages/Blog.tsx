import { motion } from "framer-motion";
import { useLang } from "../contexts/LanguageContext";
import { articles } from "../data/articles";
import { Calendar, Tag } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" } }),
};

export default function Blog() {
  const { t, lang, dir } = useLang();

  return (
    <div dir={dir} className="min-h-screen" style={{ background: "#f8f6f2" }}>
      {/* Hero */}
      <div className="relative py-24 px-4 text-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0F2347 0%, #1B3A6B 100%)" }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #C9A84C 0%, transparent 50%)" }} />
        <motion.div className="relative z-10" variants={fadeUp} initial="hidden" animate="visible">
          <span className="text-qirat-gold text-sm font-bold uppercase tracking-widest mb-3 block">
            {t("قيراط", "Qirat")}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3"
            style={{ fontFamily: lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif" }}>
            {t("المدونة العقارية", "Real Estate Blog")}
          </h1>
          <p className="text-white/70 text-lg">
            {t("أحدث المقالات والنصائح العقارية لمساعدتك في اتخاذ القرار الصحيح",
              "Latest articles and real estate tips to help you make the right decision")}
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.article
              key={article.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-md transition-shadow"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
              whileHover={{ y: -4 }}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={article.image}
                  alt={lang === "ar" ? article.titleAr : article.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span
                  className="absolute top-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ [lang === "ar" ? "right" : "left"]: "16px", background: "rgba(201,168,76,0.9)" }}
                >
                  {lang === "ar" ? article.categoryAr : article.categoryEn}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-qirat-navy/40 text-xs mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{article.date}</span>
                </div>
                <h2 className="text-lg font-black text-qirat-navy mb-2 line-clamp-2 leading-snug">
                  {lang === "ar" ? article.titleAr : article.titleEn}
                </h2>
                <p className="text-qirat-navy/60 text-sm leading-relaxed line-clamp-3">
                  {lang === "ar" ? article.excerptAr : article.excerptEn}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
