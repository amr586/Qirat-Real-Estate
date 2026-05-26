import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Home, TrendingUp, Handshake, Key, BarChart3, Shield,
  CheckCircle2, ArrowLeft, ArrowRight
} from "lucide-react";
import { useLang } from "../contexts/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: "easeOut" },
  }),
};

export default function Services() {
  const { t, lang, dir } = useLang();

  const services = [
    {
      Icon: Home,
      ar: "بيع العقارات",
      en: "Property Sales",
      descAr:
        "نساعدك في بيع عقارك بأفضل سعر ممكن خلال أقصر وقت. نوفر تسويقاً احترافياً عبر جميع القنوات الرقمية والتقليدية مع فريق متخصص لإدارة كل مراحل الصفقة.",
      descEn:
        "We help you sell your property at the best possible price in the shortest time. We provide professional marketing across all digital and traditional channels with a specialized team to manage every stage of the deal.",
      features: [
        { ar: "تقييم مجاني للعقار", en: "Free property valuation" },
        { ar: "تسويق احترافي", en: "Professional marketing" },
        { ar: "إدارة كاملة للصفقة", en: "Full deal management" },
      ],
      color: "#1B3A6B",
    },
    {
      Icon: Key,
      ar: "شراء العقارات",
      en: "Property Purchase",
      descAr:
        "ابحث عن عقار أحلامك من بين مئات الخيارات المتاحة في أفضل مناطق القاهرة. نوجهك خطوة بخطوة من البحث حتى توقيع العقد بكل راحة وأمان.",
      descEn:
        "Find your dream property among hundreds of options in Cairo's best areas. We guide you step by step from search to contract signing with complete comfort and safety.",
      features: [
        { ar: "مطابقة متطلباتك تماماً", en: "Match your exact requirements" },
        { ar: "فحص قانوني للعقار", en: "Legal property inspection" },
        { ar: "مفاوضة بالنيابة عنك", en: "Negotiation on your behalf" },
      ],
      color: "#C9A84C",
    },
    {
      Icon: Handshake,
      ar: "الشراكات العقارية",
      en: "Real Estate Partnerships",
      descAr:
        "نقدم فرصاً مميزة للشراكة في المشاريع العقارية المتنوعة بعوائد استثمارية مضمونة ومجدية. سواء كنت مستثمراً صغيراً أو كبيراً، لدينا الفرصة المناسبة لك.",
      descEn:
        "We offer unique partnership opportunities in various real estate projects with guaranteed and profitable investment returns. Whether you're a small or large investor, we have the right opportunity for you.",
      features: [
        { ar: "عوائد استثمارية مضمونة", en: "Guaranteed investment returns" },
        { ar: "مشاريع متنوعة", en: "Diverse projects" },
        { ar: "إدارة احترافية للاستثمار", en: "Professional investment management" },
      ],
      color: "#0F2347",
    },
    {
      Icon: TrendingUp,
      ar: "الاستثمار العقاري",
      en: "Real Estate Investment",
      descAr:
        "استثمر أموالك بذكاء في السوق العقاري المصري تحت إشراف خبراء متخصصين. نحلل السوق ونحدد الفرص الأفضل لتحقيق أعلى عائد على استثمارك.",
      descEn:
        "Invest your money wisely in the Egyptian real estate market under the supervision of specialized experts. We analyze the market and identify the best opportunities to achieve the highest return on your investment.",
      features: [
        { ar: "تحليل السوق الشامل", en: "Comprehensive market analysis" },
        { ar: "توصيات استثمارية", en: "Investment recommendations" },
        { ar: "متابعة دورية للعائد", en: "Regular return monitoring" },
      ],
      color: "#1B3A6B",
    },
    {
      Icon: BarChart3,
      ar: "التقييم العقاري",
      en: "Property Valuation",
      descAr:
        "نوفر خدمة تقييم عقاري دقيقة ومعتمدة من قِبل خبراء متخصصين مع تقرير تفصيلي يعكس القيمة الحقيقية لعقارك في السوق الحالي.",
      descEn:
        "We provide an accurate and certified property valuation service by specialized experts with a detailed report that reflects the true value of your property in the current market.",
      features: [
        { ar: "تقييم معتمد رسمياً", en: "Officially certified valuation" },
        { ar: "تقرير تفصيلي شامل", en: "Comprehensive detailed report" },
        { ar: "مقارنة بأسعار السوق", en: "Market price comparison" },
      ],
      color: "#C9A84C",
    },
    {
      Icon: Shield,
      ar: "الاستشارات القانونية",
      en: "Legal Consultations",
      descAr:
        "نضمن سلامة كل معاملاتك العقارية من الناحية القانونية من خلال فريق من المحامين والمستشارين القانونيين المتخصصين في قانون العقارات.",
      descEn:
        "We ensure the legal safety of all your real estate transactions through a team of lawyers and legal consultants specialized in real estate law.",
      features: [
        { ar: "مراجعة العقود القانونية", en: "Legal contract review" },
        { ar: "فحص الأوراق الرسمية", en: "Official document inspection" },
        { ar: "حل النزاعات العقارية", en: "Real estate dispute resolution" },
      ],
      color: "#0F2347",
    },
  ];

  return (
    <div dir={dir} className="pt-20">
      {/* Hero */}
      <div
        className="relative py-28 px-4 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #0F2347 100%)" }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full"
            style={{
              background: "rgba(201,168,76,0.05)",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
          />
        ))}
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.span
            className="text-qirat-gold font-semibold text-sm uppercase tracking-widest mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t("ما نقدمه لك", "What We Offer")}
          </motion.span>
          <motion.h1
            className="text-5xl md:text-6xl font-black text-white mb-6"
            style={{ fontFamily: lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            {t("خدماتنا", "Our Services")}
          </motion.h1>
          <div className="section-divider" />
          <motion.p
            className="text-white/75 text-lg leading-relaxed max-w-2xl mx-auto mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {t(
              "نقدم باقة متكاملة من الخدمات العقارية المصممة لتلبية جميع احتياجاتك بأعلى مستويات الجودة والاحترافية",
              "We offer a complete package of real estate services designed to meet all your needs with the highest levels of quality and professionalism"
            )}
          </motion.p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-20 px-4 bg-qirat-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(({ Icon, ar, en, descAr, descEn, features, color }, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-3xl overflow-hidden shadow-lg property-card"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <div className="h-3" style={{ background: color }} />
                <div className="p-8">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                  >
                    <Icon className="w-7 h-7" style={{ color }} />
                  </div>
                  <h3
                    className="text-xl font-black text-qirat-navy mb-3"
                    style={{ fontFamily: lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif" }}
                  >
                    {t(ar, en)}
                  </h3>
                  <p className="text-qirat-navy/65 text-sm leading-relaxed mb-5">{t(descAr, descEn)}</p>
                  <ul className="space-y-2 mb-6">
                    {features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color }} />
                        <span className="text-sm text-qirat-navy/75">{t(f.ar, f.en)}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact">
                    <motion.button
                      className="flex items-center gap-2 font-semibold text-sm transition-all hover:gap-3"
                      style={{ color }}
                      whileHover={{ x: lang === "ar" ? -4 : 4 }}
                    >
                      {t("احصل على هذه الخدمة", "Get This Service")}
                      {lang === "ar" ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section
        className="py-20 px-4"
        style={{ background: "linear-gradient(135deg, #0F2347 0%, #1B3A6B 100%)" }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl font-black text-white mb-4"
              style={{ fontFamily: lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif" }}
            >
              {t("كيف نعمل معك؟", "How Do We Work with You?")}
            </h2>
            <div className="section-divider" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", ar: "التواصل", en: "Contact", descAr: "تواصل معنا وحدد احتياجاتك", descEn: "Reach out and define your needs" },
              { step: "02", ar: "الاستشارة", en: "Consultation", descAr: "نقدم لك استشارة مجانية متخصصة", descEn: "We provide a free specialized consultation" },
              { step: "03", ar: "البحث", en: "Search", descAr: "نبحث عن أفضل الخيارات لك", descEn: "We search for the best options for you" },
              { step: "04", ar: "الإغلاق", en: "Close", descAr: "نتم الصفقة بأمان وشفافية", descEn: "We complete the deal safely and transparently" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="text-center"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-qirat-gold/40 text-2xl font-black text-qirat-gold">
                  {item.step}
                </div>
                <h4 className="text-white font-bold mb-2">{t(item.ar, item.en)}</h4>
                <p className="text-white/60 text-sm">{t(item.descAr, item.descEn)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
