import { motion } from "framer-motion";
import { Target, Eye, Heart, CheckCircle2 } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
  }),
};

export default function About() {
  const { t, lang, dir } = useLang();

  const values = [
    {
      Icon: Target,
      ar: "رسالتنا",
      en: "Our Mission",
      descAr:
        "تمكين الأفراد والشركات من اتخاذ قرارات عقارية صائبة من خلال تقديم حلول مبتكرة وخدمة احترافية تضمن لهم الحصول على أفضل قيمة استثمارية.",
      descEn:
        "Empowering individuals and companies to make sound real estate decisions through innovative solutions and professional service that guarantee the best investment value.",
    },
    {
      Icon: Eye,
      ar: "رؤيتنا",
      en: "Our Vision",
      descAr:
        "أن نكون الشريك العقاري الأول والأكثر موثوقية في مصر، ونساهم في بناء مستقبل مزدهر لعملائنا وللسوق العقاري المصري.",
      descEn:
        "To be the premier and most trusted real estate partner in Egypt, contributing to a prosperous future for our clients and the Egyptian real estate market.",
    },
    {
      Icon: Heart,
      ar: "قيمنا",
      en: "Our Values",
      descAr:
        "الأمانة والشفافية في كل تعاملاتنا، الاحترافية في تقديم الخدمات، والالتزام بتحقيق رضا العملاء بما يتجاوز توقعاتهم.",
      descEn:
        "Honesty and transparency in all our dealings, professionalism in service delivery, and commitment to achieving customer satisfaction beyond their expectations.",
    },
  ];

  const team = [
    {
      nameAr: "م. أحمد عمر",
      nameEn: "Eng. Ahmed Omar",
      roleAr: "المؤسس والرئيس التنفيذي",
      roleEn: "Founder & CEO",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    },
    {
      nameAr: "م. سارة محمد",
      nameEn: "Eng. Sara Mohamed",
      roleAr: "مديرة المبيعات",
      roleEn: "Sales Director",
      img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80",
    },
    {
      nameAr: "م. كريم علي",
      nameEn: "Eng. Karim Ali",
      roleAr: "مستشار عقاري",
      roleEn: "Real Estate Advisor",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    },
  ];

  return (
    <div dir={dir} className="pt-20">
      {/* Hero */}
      <div
        className="relative py-28 px-4 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #0F2347 100%)" }}
      >
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=60"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-qirat-gold/20"
            style={{
              width: 80 + i * 60,
              height: 80 + i * 60,
              top: "50%",
              left: "50%",
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.span
            className="text-qirat-gold font-semibold text-sm uppercase tracking-widest mb-4 block"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            {t("اعرفنا أكثر", "Learn More About Us")}
          </motion.span>
          <motion.h1
            className="text-5xl md:text-6xl font-black text-white mb-6"
            style={{ fontFamily: lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif" }}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            {t("من نحن", "About Us")}
          </motion.h1>
          <div className="section-divider" />
          <motion.p
            className="text-white/75 text-lg leading-relaxed max-w-2xl mx-auto mt-6"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            {t(
              "قيراط هي شركة عقارية متخصصة تأسست بهدف تقديم تجربة عقارية استثنائية في القاهرة. نجمع بين الخبرة العميقة والتكنولوجيا الحديثة لنوفر لك أفضل الفرص العقارية.",
              "Qirat is a specialized real estate company founded with the goal of providing an exceptional real estate experience in Cairo. We combine deep expertise with modern technology to offer you the best property opportunities."
            )}
          </motion.p>
        </div>
      </div>

      {/* Story */}
      <section className="py-20 px-4 bg-qirat-cream">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-qirat-gold font-semibold text-sm uppercase tracking-widest mb-3 block">
              {t("قصتنا", "Our Story")}
            </span>
            <h2
              className="text-4xl font-black text-qirat-navy mb-6"
              style={{ fontFamily: lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif" }}
            >
              {t("رحلة بُنيت على الثقة", "A Journey Built on Trust")}
            </h2>
            <p className="text-qirat-navy/70 leading-relaxed mb-5">
              {t(
                "بدأت قيراط رحلتها في قلب القاهرة بحلم بسيط: جعل تجربة شراء وبيع العقارات أسهل وأكثر شفافية لكل مصري. خلال أكثر من 15 عاماً، بنينا محفظة عملاء ضخمة وعلاقات موثوقة مع كبار المطورين.",
                "Qirat began its journey in the heart of Cairo with a simple dream: to make the experience of buying and selling real estate easier and more transparent for every Egyptian. Over 15+ years, we've built a large client portfolio and trusted relationships with major developers."
              )}
            </p>
            <p className="text-qirat-navy/70 leading-relaxed">
              {t(
                "اليوم نفخر بكوننا أحد أبرز الشركات العقارية في السوق المصري، مع فريق من المستشارين المتخصصين الذين يضعون مصلحة العميل دائماً في المقام الأول.",
                "Today we are proud to be one of the most prominent real estate companies in the Egyptian market, with a team of specialized advisors who always put the client's interest first."
              )}
            </p>
            <ul className="mt-8 space-y-3">
              {[
                { ar: "أكثر من 500 صفقة عقارية ناجحة", en: "Over 500 successful real estate deals" },
                { ar: "تغطية شاملة في جميع أحياء القاهرة", en: "Comprehensive coverage across all Cairo districts" },
                { ar: "فريق من 20+ مستشاراً معتمداً", en: "A team of 20+ certified consultants" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-qirat-gold flex-shrink-0" />
                  <span className="text-qirat-navy/80 text-sm">{t(item.ar, item.en)}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="relative"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80"
                alt="Qirat Office"
                className="w-full h-[420px] object-cover"
              />
            </div>
            <div
              className="absolute -bottom-6 -left-6 right-6 p-5 rounded-2xl shadow-xl"
              style={{ background: "linear-gradient(135deg, #1B3A6B, #0F2347)", border: "1px solid rgba(201,168,76,0.3)" }}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(201,168,76,0.15)" }}>
                  <span className="text-2xl font-black text-qirat-gold">15+</span>
                </div>
                <div>
                  <div className="text-white font-bold">{t("سنة خبرة", "Years Experience")}</div>
                  <div className="text-white/60 text-sm">{t("في السوق المصري", "In the Egyptian Market")}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section
        className="py-20 px-4"
        style={{ background: "linear-gradient(135deg, #0F2347 0%, #1B3A6B 100%)" }}
      >
        <div className="max-w-6xl mx-auto">
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
              {t("رسالتنا، رؤيتنا، وقيمنا", "Mission, Vision & Values")}
            </h2>
            <div className="section-divider" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map(({ Icon, ar, en, descAr, descEn }, i) => (
              <motion.div
                key={i}
                className="glass rounded-3xl p-8 text-center"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                whileHover={{ y: -6 }}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)" }}>
                  <Icon className="w-8 h-8 text-qirat-gold" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{t(ar, en)}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{t(descAr, descEn)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-qirat-cream">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-qirat-gold font-semibold text-sm uppercase tracking-widest mb-3 block">
              {t("فريقنا", "Our Team")}
            </span>
            <h2
              className="text-4xl font-black text-qirat-navy mb-4"
              style={{ fontFamily: lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif" }}
            >
              {t("الخبراء خلف النجاح", "The Experts Behind Success")}
            </h2>
            <div className="section-divider" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-3xl overflow-hidden shadow-lg property-card text-center"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.img}
                    alt={lang === "ar" ? member.nameAr : member.nameEn}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-qirat-navy">
                    {lang === "ar" ? member.nameAr : member.nameEn}
                  </h3>
                  <p className="text-qirat-gold font-semibold text-sm mt-1">
                    {lang === "ar" ? member.roleAr : member.roleEn}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
