import { useState } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { MapPin, BedDouble, Bath, Maximize2, CheckCircle2, ArrowLeft, ArrowRight, Send, Phone } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { properties } from "../data/properties";
import emailjs from "@emailjs/browser";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6 },
  }),
};

export default function PropertyDetail() {
  const { t, lang, dir } = useLang();
  const { id } = useParams<{ id: string }>();
  const property = properties.find((p) => p.id === Number(id));

  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  if (!property) {
    return (
      <div dir={dir} className="pt-20 min-h-screen flex items-center justify-center bg-qirat-cream">
        <div className="text-center">
          <p className="text-qirat-navy/50 text-xl mb-4">{t("العقار غير موجود", "Property not found")}</p>
          <Link href="/properties">
            <button className="btn-gold px-6 py-3 rounded-xl font-bold">
              {t("العودة للعقارات", "Back to Properties")}
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          message: form.message,
          property_title: lang === "ar" ? property.titleAr : property.titleEn,
          property_location: lang === "ar" ? property.locationAr : property.locationEn,
          to_email: "amrw4634@gmail.com",
        },
        "YOUR_PUBLIC_KEY"
      );
      setStatus("success");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const typeColors: Record<string, string> = {
    sale: "#1B3A6B",
    rent: "#C9A84C",
    partnership: "#0F2347",
  };

  return (
    <div dir={dir} className="pt-20 bg-qirat-cream min-h-screen">
      {/* Hero image */}
      <div className="relative h-80 md:h-[500px] overflow-hidden">
        <img
          src={property.image}
          alt={lang === "ar" ? property.titleAr : property.titleEn}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <span
              className="px-4 py-2 rounded-full text-sm font-bold text-white mb-4 inline-block"
              style={{ background: typeColors[property.type] }}
            >
              {lang === "ar" ? property.typeAr : property.typeEn}
            </span>
            <h1
              className="text-3xl md:text-5xl font-black text-white mb-3"
              style={{ fontFamily: lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif" }}
            >
              {lang === "ar" ? property.titleAr : property.titleEn}
            </h1>
            <div className="flex items-center gap-2 text-white/80">
              <MapPin className="w-4 h-4 text-qirat-gold" />
              <span>{lang === "ar" ? property.locationAr : property.locationEn}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <Link href="/properties">
          <motion.div
            className="flex items-center gap-2 text-qirat-navy/60 hover:text-qirat-gold transition-colors text-sm mb-8 cursor-pointer w-fit"
            whileHover={{ x: lang === "ar" ? 4 : -4 }}
          >
            {lang === "ar" ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            {t("العودة للعقارات", "Back to Properties")}
          </motion.div>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats */}
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-sm"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <div className="flex flex-wrap gap-6 mb-8">
                <div
                  className="text-3xl font-black text-qirat-navy"
                  style={{ fontFamily: lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif" }}
                >
                  {property.price}
                  <span className="text-base font-semibold text-qirat-navy/50 mr-2">{t("ج.م", "EGP")}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-100">
                {property.bedrooms > 0 && (
                  <div className="text-center">
                    <BedDouble className="w-6 h-6 text-qirat-gold mx-auto mb-2" />
                    <div className="text-2xl font-black text-qirat-navy">{property.bedrooms}</div>
                    <div className="text-qirat-navy/50 text-sm">{t("غرف نوم", "Bedrooms")}</div>
                  </div>
                )}
                <div className="text-center">
                  <Bath className="w-6 h-6 text-qirat-gold mx-auto mb-2" />
                  <div className="text-2xl font-black text-qirat-navy">{property.bathrooms}</div>
                  <div className="text-qirat-navy/50 text-sm">{t("حمامات", "Bathrooms")}</div>
                </div>
                <div className="text-center">
                  <Maximize2 className="w-6 h-6 text-qirat-gold mx-auto mb-2" />
                  <div className="text-2xl font-black text-qirat-navy">{property.area}</div>
                  <div className="text-qirat-navy/50 text-sm">{t("م²", "m²")}</div>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-sm"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <h2 className="text-xl font-bold text-qirat-navy mb-4">{t("وصف العقار", "Property Description")}</h2>
              <p className="text-qirat-navy/70 leading-relaxed text-base">
                {lang === "ar" ? property.descAr : property.descEn}
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-sm"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              <h2 className="text-xl font-bold text-qirat-navy mb-6">{t("المميزات", "Features")}</h2>
              <div className="grid grid-cols-2 gap-4">
                {property.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-qirat-gold flex-shrink-0" />
                    <span className="text-qirat-navy/75 text-sm">{lang === "ar" ? f.ar : f.en}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-1">
            <motion.div
              className="sticky top-28 rounded-3xl overflow-hidden shadow-xl"
              style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #0F2347 100%)", border: "1px solid rgba(201,168,76,0.2)" }}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <div className="p-8">
                <h3 className="text-xl font-bold text-white mb-2">
                  {t("تواصل بشأن هذا العقار", "Inquire About This Property")}
                </h3>
                <p className="text-white/60 text-sm mb-7">
                  {t("فريقنا جاهز للإجابة على جميع استفساراتك", "Our team is ready to answer all your inquiries")}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder={t("اسمك الكريم", "Your Name")}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-qirat-gold/60 transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder={t("رقم هاتفك", "Your Phone")}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-qirat-gold/60 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder={t("بريدك الإلكتروني", "Your Email")}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-qirat-gold/60 transition-colors"
                  />
                  <textarea
                    placeholder={t("رسالتك (اختياري)", "Your Message (optional)")}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl text-sm bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-qirat-gold/60 transition-colors resize-none"
                  />

                  {status === "success" && (
                    <motion.div
                      className="text-center py-3 px-4 rounded-xl bg-green-500/20 text-green-300 text-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {t("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً", "Your message was sent successfully! We'll contact you soon")}
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div
                      className="text-center py-3 px-4 rounded-xl bg-red-500/20 text-red-300 text-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {t("حدث خطأ، يرجى المحاولة لاحقاً", "An error occurred, please try again later")}
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full btn-gold py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-70"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {status === "sending" ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-qirat-navy/30 border-t-qirat-navy rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {t("إرسال الاستفسار", "Send Inquiry")}
                      </>
                    )}
                  </motion.button>
                </form>

                <div className="mt-6 pt-6 border-t border-white/10 text-center">
                  <p className="text-white/50 text-xs mb-3">{t("أو اتصل بنا مباشرة", "Or call us directly")}</p>
                  <a
                    href="tel:+20100000000"
                    className="flex items-center justify-center gap-2 text-qirat-gold font-bold hover:text-qirat-gold-light transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    +20 100 000 0000
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
