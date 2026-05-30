import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Calendar, Clock, Tag, ArrowRight, ArrowLeft, ChevronRight } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { articles } from "../data/articles";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.55, ease: "easeOut" } }),
};

export default function BlogDetail() {
  const { t, lang, dir } = useLang();
  const { id } = useParams<{ id: string }>();

  const article = articles.find((a) => a.id === Number(id));

  const related = article
    ? articles
        .filter(
          (a) =>
            a.id !== article.id &&
            (a.categoryAr === article.categoryAr || a.categoryEn === article.categoryEn)
        )
        .slice(0, 3)
    : [];

  const otherArticles = article
    ? articles.filter((a) => a.id !== article.id && !related.find((r) => r.id === a.id)).slice(0, 3 - related.length)
    : [];

  const relatedFinal = [...related, ...otherArticles].slice(0, 3);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!article) {
    return (
      <div dir={dir} className="pt-24 min-h-screen flex items-center justify-center" style={{ background: "#f8f6f2" }}>
        <div className="text-center">
          <p className="text-qirat-navy/50 text-xl mb-4">{t("المقال غير موجود", "Article not found")}</p>
          <Link href="/blog">
            <button className="btn-gold px-6 py-3 rounded-xl font-bold">
              {t("العودة للمدونة", "Back to Blog")}
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const categoryColor: Record<string, string> = {
    استثمار: "#1B3A6B", Investment: "#1B3A6B",
    مناطق: "#C9A84C", Areas: "#C9A84C",
    نصائح: "#2E7D32", Tips: "#2E7D32",
    مشاريع: "#7B1FA2", Projects: "#7B1FA2",
  };
  const catKey = lang === "ar" ? article.categoryAr : article.categoryEn;
  const catColor = categoryColor[catKey] ?? "#1B3A6B";

  return (
    <div dir={dir} className="min-h-screen" style={{ background: "#f8f6f2" }}>

      {/* Hero image */}
      <div className="relative h-72 md:h-[460px] overflow-hidden">
        <img
          src={article.image}
          alt={lang === "ar" ? article.titleAr : article.titleEn}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {/* Back button */}
        <div className="absolute top-6 w-full px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog">
              <motion.span
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm cursor-pointer transition-colors bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full"
                whileHover={{ x: lang === "ar" ? 3 : -3 }}
              >
                {lang === "ar" ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                {t("المدونة", "Blog")}
              </motion.span>
            </Link>
          </div>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-4xl mx-auto">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold text-white mb-3 inline-block"
              style={{ background: catColor }}
            >
              {lang === "ar" ? article.categoryAr : article.categoryEn}
            </span>
            <h1
              className="text-2xl md:text-4xl font-black text-white leading-snug"
              style={{ fontFamily: lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif" }}
            >
              {lang === "ar" ? article.titleAr : article.titleEn}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Meta row */}
        <motion.div
          className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-gray-200"
          variants={fadeUp} initial="hidden" animate="visible"
        >
          <div className="flex items-center gap-1.5 text-qirat-navy/50 text-sm">
            <Calendar className="w-4 h-4 text-qirat-gold" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-1.5 text-qirat-navy/50 text-sm">
            <Clock className="w-4 h-4 text-qirat-gold" />
            <span>{lang === "ar" ? article.readTimeAr : article.readTimeEn}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <Tag className="w-4 h-4 text-qirat-gold" />
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white"
              style={{ background: catColor }}
            >
              {lang === "ar" ? article.categoryAr : article.categoryEn}
            </span>
          </div>
        </motion.div>

        {/* Article body */}
        <motion.div
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm mb-10"
          variants={fadeUp} initial="hidden" animate="visible" custom={1}
        >
          <p className="text-qirat-navy/70 text-base leading-relaxed mb-6 font-medium italic border-r-4 border-qirat-gold pr-4"
            style={{ borderRight: lang === "ar" ? "4px solid #C9A84C" : undefined, borderLeft: lang === "en" ? "4px solid #C9A84C" : undefined, paddingRight: lang === "ar" ? "16px" : "0", paddingLeft: lang === "en" ? "16px" : "0" }}>
            {lang === "ar" ? article.excerptAr : article.excerptEn}
          </p>

          <div className="space-y-5">
            {(lang === "ar" ? article.bodyAr : article.bodyEn).map((paragraph, i) => (
              <motion.p
                key={i}
                className="text-qirat-navy/80 leading-[2] text-base"
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.5}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Related articles */}
        {relatedFinal.length > 0 && (
          <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-qirat-navy">
                {t("مقالات مشابهة", "Related Articles")}
              </h2>
              <Link href="/blog">
                <span className="flex items-center gap-1 text-qirat-gold text-sm font-bold cursor-pointer hover:underline">
                  {t("كل المقالات", "All Articles")}
                  <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {relatedFinal.map((a, i) => {
                const relCatKey = lang === "ar" ? a.categoryAr : a.categoryEn;
                const relCatColor = categoryColor[relCatKey] ?? "#1B3A6B";
                return (
                  <motion.div
                    key={a.id}
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                    whileHover={{ y: -4 }}
                  >
                    <Link href={`/blog/${a.id}`}>
                      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer group hover:shadow-md transition-shadow h-full flex flex-col">
                        <div className="relative h-44 overflow-hidden flex-shrink-0">
                          <img
                            src={a.image}
                            alt={lang === "ar" ? a.titleAr : a.titleEn}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                          <span
                            className="absolute top-3 px-2.5 py-0.5 rounded-full text-xs font-bold text-white"
                            style={{ [lang === "ar" ? "right" : "left"]: "12px", background: relCatColor }}
                          >
                            {lang === "ar" ? a.categoryAr : a.categoryEn}
                          </span>
                        </div>
                        <div className="p-4 flex flex-col flex-1">
                          <div className="flex items-center gap-2 text-qirat-navy/40 text-xs mb-2">
                            <Calendar className="w-3 h-3" />
                            <span>{a.date}</span>
                          </div>
                          <h3 className="text-sm font-black text-qirat-navy line-clamp-2 leading-snug flex-1">
                            {lang === "ar" ? a.titleAr : a.titleEn}
                          </h3>
                          <span className="mt-3 text-qirat-gold text-xs font-bold flex items-center gap-1">
                            {t("اقرأ المزيد", "Read more")}
                            <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
