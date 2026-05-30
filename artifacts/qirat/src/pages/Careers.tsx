import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2, User, Phone, Mail, FileText, Send,
  TrendingUp, Users, Award, Banknote, Upload, Paperclip, X
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { useLang } from "../contexts/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" } }),
};

const PERKS = [
  { Icon: Banknote, ar: "عمولات تنافسية", en: "Competitive Commissions", descAr: "أعلى نسب عمولة في السوق", descEn: "Highest commission rates in the market" },
  { Icon: TrendingUp, ar: "نمو مهني", en: "Career Growth", descAr: "مسار واضح للترقي والتطور", descEn: "Clear path for promotion and growth" },
  { Icon: Users, ar: "فريق داعم", en: "Supportive Team", descAr: "فريق محترف يساعدك في كل خطوة", descEn: "A professional team to help you at every step" },
  { Icon: Award, ar: "تدريب مستمر", en: "Continuous Training", descAr: "برامج تدريبية متخصصة في العقارات", descEn: "Specialized real estate training programs" },
];

export default function Careers() {
  const { t, lang, dir } = useLang();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fields, setFields] = useState({ name: "", phone: "", email: "", reason: "" });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleFile = (file: File | null) => {
    if (!file) return;
    const allowed = ["application/pdf", "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(file.type)) {
      alert(t("يُقبل فقط PDF أو Word", "Only PDF or Word files are accepted"));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert(t("الحد الأقصى للحجم 5 ميجا", "Max file size is 5 MB"));
      return;
    }
    setCvFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0] ?? null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY",
      );
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div dir={dir} className="min-h-screen" style={{ background: "#f8f6f2" }}>
      {/* Hero */}
      <div
        className="relative py-24 px-4 text-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0F2347 0%, #1B3A6B 100%)" }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #C9A84C 0%, transparent 60%), radial-gradient(circle at 80% 50%, #C9A84C 0%, transparent 60%)" }} />
        <motion.div className="relative z-10 max-w-3xl mx-auto"
          variants={fadeUp} initial="hidden" animate="visible">
          <span className="text-qirat-gold text-sm font-bold uppercase tracking-widest mb-3 block">
            {t("انضم للفريق", "Join the Team")}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif" }}>
            {t("وظائف قيراط للعقارات", "Qirat Real Estate Careers")}
          </h1>
          <p className="text-white/70 text-lg">
            {t("ابنِ مستقبلك المهني مع أسرة قيراط وكن جزءاً من فريق النجاح",
              "Build your professional future with the Qirat family and be part of the success team")}
          </p>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Perks */}
        <motion.div className="text-center mb-12"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-3xl font-black text-qirat-navy mb-3">
            {t("لماذا تعمل معنا؟", "Why Work With Us?")}
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          {PERKS.map(({ Icon, ar, en, descAr, descEn }, i) => (
            <motion.div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)" }}>
                <Icon className="w-6 h-6 text-qirat-gold" />
              </div>
              <h3 className="font-black text-qirat-navy mb-1 text-sm">{t(ar, en)}</h3>
              <p className="text-qirat-navy/50 text-xs">{t(descAr, descEn)}</p>
            </motion.div>
          ))}
        </div>

        {/* Job Card */}
        <motion.div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-10"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-qirat-gold mb-2 block">
                {t("وظيفة متاحة الآن", "Position Available Now")}
              </span>
              <h3 className="text-2xl font-black text-qirat-navy mb-2">
                {t("مستشار مبيعات عقاري", "Real Estate Sales Consultant")}
              </h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  { ar: "دوام كامل", en: "Full-time" },
                  { ar: "القاهرة", en: "Cairo" },
                  { ar: "عمولات + راتب أساسي", en: "Commission + Base Salary" },
                ].map((tag, i) => (
                  <span key={i} className="px-3 py-1 rounded-full font-semibold"
                    style={{ background: "rgba(27,58,107,0.07)", color: "#1B3A6B" }}>
                    {t(tag.ar, tag.en)}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 pt-5 border-t border-gray-100">
            <h4 className="font-bold text-qirat-navy mb-3">{t("المتطلبات:", "Requirements:")}</h4>
            <ul className="space-y-2">
              {[
                { ar: "خبرة في المبيعات (عقارات أو أي مجال آخر)", en: "Sales experience (real estate or any field)" },
                { ar: "مهارات تواصل ممتازة", en: "Excellent communication skills" },
                { ar: "قدرة على العمل ضمن فريق", en: "Ability to work in a team" },
                { ar: "امتلاك سيارة (يُفضَّل)", en: "Owning a car (preferred)" },
              ].map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-qirat-navy/70">
                  <CheckCircle2 className="w-4 h-4 text-qirat-gold flex-shrink-0 mt-0.5" />
                  {t(req.ar, req.en)}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Application Form */}
        <motion.div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="px-8 pt-8 pb-4 border-b border-gray-100">
            <h2 className="text-2xl font-black text-qirat-navy">{t("سجّل طلبك الآن", "Apply Now")}</h2>
            <p className="text-qirat-navy/50 text-sm mt-1">
              {t("ستصلنا بياناتك وسنرد عليك في أقرب وقت", "We'll receive your application and respond as soon as possible")}
            </p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="p-8 space-y-5">
            {/* Hidden field for email routing */}
            <input type="hidden" name="to_email" value="amrw4634@gmail.com" />
            <input type="hidden" name="subject" value="طلب توظيف - مستشار مبيعات عقاري" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="block text-qirat-navy/60 text-xs font-bold uppercase tracking-wider mb-2">
                  {t("الاسم الكامل", "Full Name")} *
                </label>
                <div className="relative">
                  <User className="absolute top-1/2 -translate-y-1/2 w-4 h-4 text-qirat-navy/30"
                    style={{ [lang === "ar" ? "right" : "left"]: "14px" }} />
                  <input
                    name="from_name"
                    required
                    value={fields.name}
                    onChange={e => setFields({ ...fields, name: e.target.value })}
                    placeholder={t("اسمك الكامل", "Your full name")}
                    className="w-full py-3 rounded-xl border border-gray-200 text-qirat-navy text-sm focus:outline-none focus:border-qirat-gold/60 focus:ring-2 focus:ring-qirat-gold/10 transition-all"
                    style={{ [lang === "ar" ? "paddingRight" : "paddingLeft"]: "40px", [lang === "ar" ? "paddingLeft" : "paddingRight"]: "16px" }}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-qirat-navy/60 text-xs font-bold uppercase tracking-wider mb-2">
                  {t("رقم الهاتف", "Phone Number")} *
                </label>
                <div className="relative">
                  <Phone className="absolute top-1/2 -translate-y-1/2 w-4 h-4 text-qirat-navy/30"
                    style={{ [lang === "ar" ? "right" : "left"]: "14px" }} />
                  <input
                    name="from_phone"
                    required
                    type="tel"
                    value={fields.phone}
                    onChange={e => setFields({ ...fields, phone: e.target.value })}
                    placeholder="01xxxxxxxxx"
                    className="w-full py-3 rounded-xl border border-gray-200 text-qirat-navy text-sm focus:outline-none focus:border-qirat-gold/60 focus:ring-2 focus:ring-qirat-gold/10 transition-all"
                    style={{ [lang === "ar" ? "paddingRight" : "paddingLeft"]: "40px", [lang === "ar" ? "paddingLeft" : "paddingRight"]: "16px" }}
                  />
                </div>
              </div>

              {/* Email — spans full width */}
              <div className="md:col-span-2">
                <label className="block text-qirat-navy/60 text-xs font-bold uppercase tracking-wider mb-2">
                  {t("البريد الإلكتروني", "Email")} *
                </label>
                <div className="relative">
                  <Mail className="absolute top-1/2 -translate-y-1/2 w-4 h-4 text-qirat-navy/30"
                    style={{ [lang === "ar" ? "right" : "left"]: "14px" }} />
                  <input
                    name="reply_to"
                    required
                    type="email"
                    value={fields.email}
                    onChange={e => setFields({ ...fields, email: e.target.value })}
                    placeholder={t("بريدك الإلكتروني", "Your email")}
                    className="w-full py-3 rounded-xl border border-gray-200 text-qirat-navy text-sm focus:outline-none focus:border-qirat-gold/60 focus:ring-2 focus:ring-qirat-gold/10 transition-all"
                    style={{ [lang === "ar" ? "paddingRight" : "paddingLeft"]: "40px", [lang === "ar" ? "paddingLeft" : "paddingRight"]: "16px" }}
                  />
                </div>
              </div>
            </div>

            {/* CV Upload */}
            <div>
              <label className="block text-qirat-navy/60 text-xs font-bold uppercase tracking-wider mb-2">
                {t("السيرة الذاتية", "CV / Resume")} *
              </label>

              {/* Hidden actual file input */}
              <input
                ref={fileInputRef}
                type="file"
                name="cv_attachment"
                accept=".pdf,.doc,.docx"
                required
                className="hidden"
                onChange={e => handleFile(e.target.files?.[0] ?? null)}
              />

              {cvFile ? (
                /* File selected — show info card */
                <motion.div
                  className="flex items-center gap-3 p-4 rounded-2xl border"
                  style={{ background: "rgba(201,168,76,0.06)", borderColor: "rgba(201,168,76,0.35)" }}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(201,168,76,0.15)" }}>
                    <Paperclip className="w-5 h-5 text-qirat-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-qirat-navy font-bold text-sm truncate">{cvFile.name}</p>
                    <p className="text-qirat-navy/45 text-xs mt-0.5">{formatSize(cvFile.size)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setCvFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                    className="p-1.5 rounded-full hover:bg-red-50 text-qirat-navy/40 hover:text-red-500 transition-colors flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                /* Drop zone */
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  className="flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed cursor-pointer transition-all select-none"
                  style={{
                    borderColor: dragOver ? "#C9A84C" : "rgba(27,58,107,0.15)",
                    background: dragOver ? "rgba(201,168,76,0.05)" : "rgba(27,58,107,0.02)",
                  }}
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.25)" }}>
                    <Upload className="w-6 h-6 text-qirat-gold" />
                  </div>
                  <div className="text-center">
                    <p className="text-qirat-navy font-bold text-sm">
                      {t("اسحب الملف هنا أو اضغط للرفع", "Drag & drop or click to upload")}
                    </p>
                    <p className="text-qirat-navy/45 text-xs mt-1">
                      {t("PDF أو Word — الحد الأقصى 5 ميجا", "PDF or Word — max 5 MB")}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Reason */}
            <div>
              <label className="block text-qirat-navy/60 text-xs font-bold uppercase tracking-wider mb-2">
                {t("لماذا تريد الانضمام لقيراط؟", "Why do you want to join Qirat?")} *
              </label>
              <div className="relative">
                <FileText className="absolute top-3.5 w-4 h-4 text-qirat-navy/30"
                  style={{ [lang === "ar" ? "right" : "left"]: "14px" }} />
                <textarea
                  name="message"
                  required
                  value={fields.reason}
                  onChange={e => setFields({ ...fields, reason: e.target.value })}
                  rows={4}
                  placeholder={t(
                    "اكتب عن نفسك وخبراتك وسبب اختيارك للعمل معنا...",
                    "Write about yourself, your experience, and why you chose to work with us..."
                  )}
                  className="w-full py-3 rounded-xl border border-gray-200 text-qirat-navy text-sm focus:outline-none focus:border-qirat-gold/60 focus:ring-2 focus:ring-qirat-gold/10 transition-all resize-none"
                  style={{ [lang === "ar" ? "paddingRight" : "paddingLeft"]: "40px", [lang === "ar" ? "paddingLeft" : "paddingRight"]: "16px" }}
                />
              </div>
            </div>

            {/* Status messages */}
            {status === "success" && (
              <motion.div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 text-green-700 text-sm"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                {t("تم استلام طلبك! سنتواصل معك قريباً.", "Your application was received! We'll contact you soon.")}
              </motion.div>
            )}
            {status === "error" && (
              <motion.div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                {t("حدث خطأ، يرجى المحاولة لاحقاً.", "An error occurred, please try again.")}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={status === "sending" || status === "success"}
              className="w-full btn-gold py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 disabled:opacity-70"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            >
              {status === "sending" ? (
                <motion.div className="w-5 h-5 border-2 border-qirat-navy/30 border-t-qirat-navy rounded-full"
                  animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
              ) : (
                <><Send className="w-5 h-5" />{t("إرسال الطلب", "Submit Application")}</>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
