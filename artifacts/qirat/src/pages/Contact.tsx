import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Clock, MessageCircle } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import emailjs from "@emailjs/browser";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7 },
  }),
};

export default function Contact() {
  const { t, lang, dir } = useLang();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

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
          subject: form.subject,
          message: form.message,
          to_email: "amrw4634@gmail.com",
        },
        "YOUR_PUBLIC_KEY"
      );
      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const contactInfo = [
    {
      Icon: Phone,
      labelAr: "اتصل بنا",
      labelEn: "Call Us",
      valueAr: "+20 100 000 0000",
      valueEn: "+20 100 000 0000",
      href: "tel:+20100000000",
    },
    {
      Icon: Mail,
      labelAr: "راسلنا",
      labelEn: "Email Us",
      valueAr: "amrw4634@gmail.com",
      valueEn: "amrw4634@gmail.com",
      href: "mailto:amrw4634@gmail.com",
    },
    {
      Icon: MapPin,
      labelAr: "موقعنا",
      labelEn: "Our Location",
      valueAr: "القاهرة، جمهورية مصر العربية",
      valueEn: "Cairo, Arab Republic of Egypt",
      href: "#",
    },
    {
      Icon: Clock,
      labelAr: "ساعات العمل",
      labelEn: "Working Hours",
      valueAr: "السبت – الخميس: 9ص – 6م",
      valueEn: "Sat – Thu: 9AM – 6PM",
      href: "#",
    },
  ];

  return (
    <div dir={dir} className="pt-20">
      {/* Hero */}
      <div
        className="relative py-28 px-4 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #0F2347 100%)" }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-qirat-gold/30"
            style={{
              top: `${10 + Math.random() * 80}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.span
            className="text-qirat-gold font-semibold text-sm uppercase tracking-widest mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t("نحن هنا لمساعدتك", "We're Here to Help")}
          </motion.span>
          <motion.h1
            className="text-5xl md:text-6xl font-black text-white mb-6"
            style={{ fontFamily: lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            {t("تواصل معنا", "Contact Us")}
          </motion.h1>
          <div className="section-divider" />
          <motion.p
            className="text-white/75 text-lg mt-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {t(
              "فريقنا جاهز للإجابة على جميع استفساراتك وتقديم المساعدة في أي وقت",
              "Our team is ready to answer all your inquiries and provide assistance at any time"
            )}
          </motion.p>
        </div>
      </div>

      {/* Contact cards */}
      <section className="py-16 px-4 bg-qirat-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
            {contactInfo.map(({ Icon, labelAr, labelEn, valueAr, valueEn, href }, i) => (
              <motion.a
                key={i}
                href={href}
                className="bg-white rounded-2xl p-6 text-center shadow-sm property-card block"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(27,58,107,0.08)" }}
                >
                  <Icon className="w-6 h-6 text-qirat-navy" />
                </div>
                <div className="text-qirat-gold font-semibold text-xs mb-2 uppercase tracking-wide">
                  {t(labelAr, labelEn)}
                </div>
                <div className="text-qirat-navy font-semibold text-sm">
                  {t(valueAr, valueEn)}
                </div>
              </motion.a>
            ))}
          </div>

          {/* Form + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Form */}
            <motion.div
              className="bg-white rounded-3xl p-10 shadow-lg"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(201,168,76,0.12)" }}
                >
                  <MessageCircle className="w-6 h-6 text-qirat-gold" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-qirat-navy">
                    {t("أرسل رسالتك", "Send Your Message")}
                  </h2>
                  <p className="text-qirat-navy/50 text-sm">
                    {t("سنرد عليك خلال 24 ساعة", "We'll reply within 24 hours")}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-qirat-navy/70 text-sm font-medium mb-1.5">
                      {t("الاسم *", "Name *")}
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      placeholder={t("اسمك الكريم", "Your Name")}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-qirat-navy text-sm focus:outline-none focus:border-qirat-gold/60 focus:ring-2 focus:ring-qirat-gold/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-qirat-navy/70 text-sm font-medium mb-1.5">
                      {t("الهاتف", "Phone")}
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder={t("رقم هاتفك", "Your Phone")}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-qirat-navy text-sm focus:outline-none focus:border-qirat-gold/60 focus:ring-2 focus:ring-qirat-gold/10 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-qirat-navy/70 text-sm font-medium mb-1.5">
                    {t("البريد الإلكتروني *", "Email *")}
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    placeholder={t("بريدك الإلكتروني", "Your Email")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-qirat-navy text-sm focus:outline-none focus:border-qirat-gold/60 focus:ring-2 focus:ring-qirat-gold/10 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-qirat-navy/70 text-sm font-medium mb-1.5">
                    {t("موضوع الرسالة", "Subject")}
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-qirat-navy text-sm focus:outline-none focus:border-qirat-gold/60 transition-all bg-white"
                  >
                    <option value="">{t("اختر موضوع", "Select Subject")}</option>
                    <option value="buy">{t("شراء عقار", "Buy Property")}</option>
                    <option value="sell">{t("بيع عقار", "Sell Property")}</option>
                    <option value="rent">{t("إيجار عقار", "Rent Property")}</option>
                    <option value="partnership">{t("شراكة عقارية", "Real Estate Partnership")}</option>
                    <option value="other">{t("استفسار عام", "General Inquiry")}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-qirat-navy/70 text-sm font-medium mb-1.5">
                    {t("رسالتك *", "Message *")}
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    placeholder={t("اكتب رسالتك هنا...", "Write your message here...")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-qirat-navy text-sm focus:outline-none focus:border-qirat-gold/60 focus:ring-2 focus:ring-qirat-gold/10 transition-all resize-none"
                  />
                </div>

                {status === "success" && (
                  <motion.div
                    className="text-center py-4 px-5 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {t(
                      "✓ تم إرسال رسالتك بنجاح! سيتواصل معك فريقنا خلال 24 ساعة.",
                      "✓ Your message was sent successfully! Our team will contact you within 24 hours."
                    )}
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    className="text-center py-4 px-5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {t(
                      "حدث خطأ في الإرسال. يرجى المحاولة مرة أخرى أو التواصل مباشرة.",
                      "Sending failed. Please try again or contact us directly."
                    )}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full btn-gold py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 disabled:opacity-70"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {status === "sending" ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-qirat-navy/30 border-t-qirat-navy rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      />
                      {t("جارٍ الإرسال...", "Sending...")}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t("إرسال الرسالة", "Send Message")}
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Right side - Info */}
            <motion.div
              className="space-y-6 flex flex-col justify-center"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
            >
              <div
                className="rounded-3xl p-8 h-64 overflow-hidden relative"
                style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #0F2347 100%)" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=70"
                  alt="Cairo"
                  className="absolute inset-0 w-full h-full object-cover opacity-20"
                />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-white mb-3">
                      {t("مكتبنا الرئيسي", "Our Main Office")}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {t(
                        "القاهرة، جمهورية مصر العربية\nنرحب بزيارتك خلال ساعات العمل",
                        "Cairo, Arab Republic of Egypt\nWe welcome your visit during working hours"
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-white/70 text-sm">
                      {t("مفتوح الآن", "Open Now")}
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="rounded-3xl p-8"
                style={{ background: "linear-gradient(135deg, #C9A84C 0%, #A8872E 100%)" }}
              >
                <h3 className="text-2xl font-black text-white mb-3">
                  {t("استشارة مجانية", "Free Consultation")}
                </h3>
                <p className="text-white/85 text-sm mb-5 leading-relaxed">
                  {t(
                    "احجز جلسة استشارية مجانية مع أحد خبرائنا العقاريين المتخصصين وابدأ رحلتك نحو العقار المثالي",
                    "Book a free consultation session with one of our specialized real estate experts and start your journey toward the perfect property"
                  )}
                </p>
                <a href="tel:+20100000000">
                  <motion.button
                    className="bg-white text-qirat-navy font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm hover:bg-white/90 transition-colors"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Phone className="w-4 h-4" />
                    {t("اتصل الآن", "Call Now")}
                  </motion.button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
