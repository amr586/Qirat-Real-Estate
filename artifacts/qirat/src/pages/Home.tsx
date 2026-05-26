import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown, Star, Building2, Users, Award, ArrowLeft, ArrowRight } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { properties } from "../data/properties";
import HomeSearch from "../components/HomeSearch";

const BG_VIDEOS = [
  "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-residential-neighborhood-41890-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-luxury-villa-overlooking-the-sea-45422-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-modern-living-room-44882-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-drone-view-of-a-suburban-neighborhood-41893-large.mp4",
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
  }),
};

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const [count, setCount] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const num = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!triggered) return;
    let start = 0;
    const duration = 1800;
    const steps = 80;
    const interval = duration / steps;
    const step = num / steps;
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, interval);
    return () => clearInterval(timer);
  }, [triggered, num]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-black text-shimmer mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-white/70 text-sm">{label}</div>
    </div>
  );
}

const HERO_WORDS_AR = ["قيراط", "ثقة", "جودة", "قيراط"];
const HERO_WORDS_EN = ["QIRAT", "TRUST", "QUALITY", "QIRAT"];

export default function Home() {
  const { t, lang, dir } = useLang();
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const [wordIndex, setWordIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((i) => (i + 1) % HERO_WORDS_AR.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const handleVideoEnded = useCallback(() => {
    setVideoLoaded(false);
    setVideoIndex((i) => (i + 1) % BG_VIDEOS.length);
  }, []);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.load();
    vid.play().catch(() => {});
  }, [videoIndex]);

  const words = lang === "ar" ? HERO_WORDS_AR : HERO_WORDS_EN;

  return (
    <div dir={dir} className="overflow-x-hidden">
      {/* Hero */}
      <div ref={heroRef} className="relative min-h-screen min-h-[820px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: videoY }}>
          {/* Fallback background image (shows while video loads) */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 0,
            }}
          />
          {/* Real estate background video */}
          <AnimatePresence>
            {videoLoaded && (
              <motion.div
                className="absolute inset-0"
                style={{ zIndex: 1 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
              />
            )}
          </AnimatePresence>
          <video
            ref={videoRef}
            key={videoIndex}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 1 }}
            autoPlay
            muted
            playsInline
            onCanPlay={() => setVideoLoaded(true)}
            onEnded={handleVideoEnded}
          >
            <source src={BG_VIDEOS[videoIndex]} type="video/mp4" />
          </video>
          <div className="video-overlay absolute inset-0" style={{ zIndex: 2 }} />
        </motion.div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <div className="h-24 md:h-32 flex items-center justify-center overflow-hidden mb-4">
            <AnimatePresence mode="wait">
              <motion.h1
                key={wordIndex}
                className="text-6xl md:text-8xl font-black text-shimmer select-none"
                style={{ fontFamily: lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif" }}
                initial={{ y: 80, opacity: 0, rotateX: -30 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                exit={{ y: -80, opacity: 0, rotateX: 30 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {words[wordIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>

          <motion.p
            className="text-lg md:text-xl max-w-2xl mb-10 leading-relaxed text-[#1515a3cc]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            style={{ fontFamily: lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif" }}
          >
            {t(
              "شريكك الموثوق في عالم العقارات — نقدم لك أفضل الفرص العقارية في القاهرة بشفافية واحترافية لا مثيل لهما",
              "Your trusted partner in real estate — offering you the finest property opportunities in Cairo with unmatched transparency and professionalism"
            )}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <Link href="/contact">
              <motion.button
                className="px-8 py-4 rounded-2xl text-base font-bold text-white border-2 border-white/30 hover:border-qirat-gold/70 hover:text-qirat-gold transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {t("تواصل معنا", "Contact Us")}
              </motion.button>
            </Link>
          </motion.div>

          <div className="w-full px-4">
            <HomeSearch />
          </div>

          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-qirat-gold" />
          </motion.div>
        </div>
      </div>
      {/* Stats */}
      <section
        style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #0F2347 100%)" }}
        className="py-16 border-y border-qirat-gold/20"
      >
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { val: "500+", ar: "عقار مُباع", en: "Properties Sold" },
            { val: "15+", ar: "سنة خبرة", en: "Years Experience" },
            { val: "1200+", ar: "عميل سعيد", en: "Happy Clients" },
            { val: "98%", ar: "نسبة الرضا", en: "Satisfaction Rate" },
          ].map((s, i) => (
            <AnimatedStat key={i} value={s.val} label={t(s.ar, s.en)} />
          ))}
        </div>
      </section>
      {/* Featured Properties */}
      <section className="py-20 px-4 bg-qirat-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-qirat-gold font-semibold text-sm uppercase tracking-widest mb-3 block">
              {t("عقاراتنا المميزة", "Featured Properties")}
            </span>
            <h2
              className="text-4xl md:text-5xl font-black text-qirat-navy mb-4"
              style={{ fontFamily: lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif" }}
            >
              {t("أبرز عقارات القاهرة", "Top Cairo Properties")}
            </h2>
            <div className="section-divider" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {properties.slice(0, 3).map((prop, i) => (
              <motion.div
                key={prop.id}
                className="property-card bg-white rounded-3xl overflow-hidden shadow-lg"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={prop.image}
                    alt={lang === "ar" ? prop.titleAr : prop.titleEn}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1.5 rounded-full text-xs font-bold text-white"
                      style={{
                        background: prop.type === "sale" ? "#1B3A6B" : prop.type === "rent" ? "#C9A84C" : "#0F2347",
                      }}
                    >
                      {lang === "ar" ? prop.typeAr : prop.typeEn}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-qirat-navy mb-1">
                    {lang === "ar" ? prop.titleAr : prop.titleEn}
                  </h3>
                  <p className="text-qirat-gold font-semibold text-sm mb-3">
                    {lang === "ar" ? prop.locationAr : prop.locationEn}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-qirat-navy font-black text-lg">
                      {prop.price} {t("ج.م", "EGP")}
                    </span>
                    <Link href={`/properties/${prop.id}`}>
                      <motion.button
                        className="flex items-center gap-2 text-qirat-gold font-semibold text-sm hover:gap-3 transition-all"
                        whileHover={{ x: lang === "ar" ? -4 : 4 }}
                      >
                        {t("التفاصيل", "Details")}
                        {lang === "ar" ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/properties">
              <motion.button
                className="btn-gold px-10 py-4 rounded-2xl font-bold text-lg shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {t("عرض جميع العقارات", "View All Properties")}
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
      {/* Why Qirat */}
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
            <span className="text-qirat-gold font-semibold text-sm uppercase tracking-widest mb-3 block">
              {t("لماذا تختارنا", "Why Choose Us")}
            </span>
            <h2
              className="text-4xl md:text-5xl font-black text-white mb-4"
              style={{ fontFamily: lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif" }}
            >
              {t("ما يميز قيراط", "What Sets Qirat Apart")}
            </h2>
            <div className="section-divider" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                Icon: Star,
                ar: "خبرة متميزة",
                en: "Premium Experience",
                descAr: "أكثر من 15 عاماً في سوق العقارات المصري مع فريق من الخبراء المعتمدين",
                descEn: "Over 15 years in the Egyptian real estate market with a team of certified experts",
              },
              {
                Icon: Building2,
                ar: "محفظة متنوعة",
                en: "Diverse Portfolio",
                descAr: "مئات العقارات المتنوعة في أفضل مناطق القاهرة تناسب جميع الميزانيات",
                descEn: "Hundreds of varied properties in Cairo's best areas, suitable for all budgets",
              },
              {
                Icon: Users,
                ar: "خدمة شخصية",
                en: "Personal Service",
                descAr: "نخصص لكل عميل مستشاراً عقارياً متخصصاً لمرافقتك طوال رحلة البحث والشراء",
                descEn: "We dedicate a specialized real estate consultant to accompany you throughout your search and purchase journey",
              },
            ].map(({ Icon, ar, en, descAr, descEn }, i) => (
              <motion.div
                key={i}
                className="glass rounded-3xl p-8 text-center group hover:border-qirat-gold/40 transition-all"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                whileHover={{ y: -6 }}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 pulse-gold"
                  style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)" }}>
                  <Icon className="w-8 h-8 text-qirat-gold" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t(ar, en)}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{t(descAr, descEn)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="py-20 px-4 bg-qirat-cream">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Award className="w-14 h-14 text-qirat-gold mx-auto mb-6 float-animation" />
            <h2
              className="text-4xl md:text-5xl font-black text-qirat-navy mb-5"
              style={{ fontFamily: lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif" }}
            >
              {t("هل أنت مستعد للبدء؟", "Ready to Get Started?")}
            </h2>
            <p className="text-qirat-navy/65 text-lg mb-10 leading-relaxed">
              {t(
                "تواصل معنا اليوم واحصل على استشارة عقارية مجانية من فريق متخصص",
                "Contact us today and get a free real estate consultation from a specialized team"
              )}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  className="btn-gold px-10 py-4 rounded-2xl font-bold text-lg shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {t("احجز استشارتك", "Book Your Consultation")}
                </motion.button>
              </Link>
              <Link href="/properties">
                <motion.button
                  className="px-10 py-4 rounded-2xl font-bold text-lg text-qirat-navy border-2 border-qirat-navy/30 hover:border-qirat-gold hover:text-qirat-gold transition-all"
                  whileHover={{ scale: 1.05 }}
                >
                  {t("استعرض العقارات", "Browse Properties")}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
