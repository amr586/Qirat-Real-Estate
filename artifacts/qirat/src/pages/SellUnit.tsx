import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, User, Phone, MapPin, Building2, Home, FileText, Send, Link } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" } }),
};

const STEPS = [
  {
    num: 1,
    ar: "أضف تفاصيل وحدتك",
    en: "Add Your Unit Details",
    descAr: "أضف جميع المعلومات المتعلقة بوحدتك",
    descEn: "Add all information related to your unit",
  },
  {
    num: 2,
    ar: "سيتصل بك أحد وكلائنا",
    en: "Our Agent Will Contact You",
    descAr: "سنساعدك في العثور على أفضل مشترٍ",
    descEn: "We'll help you find the best buyer",
  },
  {
    num: 3,
    ar: "قابل المشترين الجادين",
    en: "Meet Serious Buyers",
    descAr: "الخطوة الأخيرة لبيع وحدتك",
    descEn: "The last step to selling your unit",
  },
];

const UNIT_TYPES = [
  { ar: "شقة", en: "Apartment" },
  { ar: "فيلا", en: "Villa" },
  { ar: "بنتهاوس", en: "Penthouse" },
  { ar: "دوبلكس", en: "Duplex" },
  { ar: "ستوديو", en: "Studio" },
  { ar: "وحدة تجارية", en: "Commercial Unit" },
  { ar: "مكتب", en: "Office" },
  { ar: "أرض", en: "Land" },
];

export default function SellUnit() {
  const { t, lang, dir } = useLang();
  const [form, setForm] = useState({
    name: "", phone: "", location: "", mapsLink: "", compound: "", unitType: "", description: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
          template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
          user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY",
          template_params: {
            from_name: form.name,
            from_phone: form.phone,
            property_location: form.location,
            property_compound: form.compound,
            property_type: form.unitType,
            message: `طلب بيع وحدة\nالاسم: ${form.name}\nالهاتف: ${form.phone}\nالموقع: ${form.location}\nرابط جوجل مابس: ${form.mapsLink || "لم يُرفق"}\nالكمبوند: ${form.compound}\nنوع الوحدة: ${form.unitType}\nالوصف: ${form.description}`,
            to_email: "amrw4634@gmail.com",
            reply_to: "amrw4634@gmail.com",
          },
        }),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div dir={dir} className="min-h-screen" style={{ background: "#f8f6f2" }}>
      {/* Hero */}
      <div
        className="relative py-24 px-4 text-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0F2347 0%, #1B3A6B 100%)" }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #C9A84C 0%, transparent 60%), radial-gradient(circle at 80% 50%, #C9A84C 0%, transparent 60%)" }}
        />
        <motion.div className="relative z-10 max-w-3xl mx-auto"
          variants={fadeUp} initial="hidden" animate="visible">
          <span className="text-qirat-gold text-sm font-bold uppercase tracking-widest mb-3 block">
            {t("قيراط للعقارات", "Qirat Real Estate")}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif" }}>
            {t("بيع وحدتك مع قيراط", "Sell Your Unit with Qirat")}
          </h1>
          <p className="text-white/70 text-lg">
            {t("نساعدك في الوصول لأفضل مشتري بأعلى سعر وأسرع وقت", "We help you reach the best buyer at the highest price in the shortest time")}
          </p>
        </motion.div>
      </div>

      {/* Steps */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative bg-white rounded-3xl p-8 text-center shadow-sm border border-gray-100"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl font-black text-white"
                style={{ background: "linear-gradient(135deg, #1B3A6B, #0F2347)" }}
              >
                {step.num}
              </div>
              <h3 className="text-lg font-black text-qirat-navy mb-2">{t(step.ar, step.en)}</h3>
              <p className="text-qirat-navy/60 text-sm">{t(step.descAr, step.descEn)}</p>
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -end-3 w-6 h-6 rounded-full bg-qirat-gold flex items-center justify-center z-10">
                  <span className="text-white text-xs font-bold">{lang === "ar" ? "←" : "→"}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Form */}
        <motion.div
          className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          <div className="px-8 pt-8 pb-4 border-b border-gray-100">
            <h2 className="text-2xl font-black text-qirat-navy">
              {t("أدخل تفاصيل وحدتك", "Enter Your Unit Details")}
            </h2>
            <p className="text-qirat-navy/50 text-sm mt-1">
              {t("خصوصيتك مهمة بالنسبة لنا. لن ننشر أو نشارك معلوماتك مع أي شخص",
                "Your privacy matters to us. We will not publish or share your information with anyone.")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="block text-qirat-navy/60 text-xs font-bold uppercase tracking-wider mb-2">
                  {t("الاسم", "Name")}
                </label>
                <div className="relative">
                  <User className="absolute top-1/2 -translate-y-1/2 w-4 h-4 text-qirat-navy/30"
                    style={{ [lang === "ar" ? "right" : "left"]: "14px" }} />
                  <input
                    required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder={t("اسمك الكامل", "Your full name")}
                    className="w-full py-3 rounded-xl border border-gray-200 text-qirat-navy text-sm focus:outline-none focus:border-qirat-gold/60 focus:ring-2 focus:ring-qirat-gold/10 transition-all"
                    style={{ [lang === "ar" ? "paddingRight" : "paddingLeft"]: "40px", [lang === "ar" ? "paddingLeft" : "paddingRight"]: "16px" }}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-qirat-navy/60 text-xs font-bold uppercase tracking-wider mb-2">
                  {t("رقم الهاتف", "Phone Number")}
                </label>
                <div className="relative">
                  <Phone className="absolute top-1/2 -translate-y-1/2 w-4 h-4 text-qirat-navy/30"
                    style={{ [lang === "ar" ? "right" : "left"]: "14px" }} />
                  <input
                    required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder={t("01xxxxxxxxx", "01xxxxxxxxx")} type="tel"
                    className="w-full py-3 rounded-xl border border-gray-200 text-qirat-navy text-sm focus:outline-none focus:border-qirat-gold/60 focus:ring-2 focus:ring-qirat-gold/10 transition-all"
                    style={{ [lang === "ar" ? "paddingRight" : "paddingLeft"]: "40px", [lang === "ar" ? "paddingLeft" : "paddingRight"]: "16px" }}
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-qirat-navy/60 text-xs font-bold uppercase tracking-wider mb-2">
                  {t("الموقع", "Location")}
                </label>
                <div className="relative">
                  <MapPin className="absolute top-1/2 -translate-y-1/2 w-4 h-4 text-qirat-navy/30"
                    style={{ [lang === "ar" ? "right" : "left"]: "14px" }} />
                  <input
                    required value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
                    placeholder={t("المنطقة / المدينة", "Area / City")}
                    className="w-full py-3 rounded-xl border border-gray-200 text-qirat-navy text-sm focus:outline-none focus:border-qirat-gold/60 focus:ring-2 focus:ring-qirat-gold/10 transition-all"
                    style={{ [lang === "ar" ? "paddingRight" : "paddingLeft"]: "40px", [lang === "ar" ? "paddingLeft" : "paddingRight"]: "16px" }}
                  />
                </div>
              </div>

              {/* Google Maps Link */}
              <div>
                <label className="block text-qirat-navy/60 text-xs font-bold uppercase tracking-wider mb-2">
                  {t("رابط الموقع على جوجل مابس (اختياري)", "Google Maps Link (Optional)")}
                </label>
                <div className="relative">
                  <Link className="absolute top-1/2 -translate-y-1/2 w-4 h-4 text-qirat-navy/30"
                    style={{ [lang === "ar" ? "right" : "left"]: "14px" }} />
                  <input
                    type="url"
                    value={form.mapsLink}
                    onChange={e => setForm({ ...form, mapsLink: e.target.value })}
                    placeholder={t("https://maps.google.com/...", "https://maps.google.com/...")}
                    className="w-full py-3 rounded-xl border border-gray-200 text-qirat-navy text-sm focus:outline-none focus:border-qirat-gold/60 focus:ring-2 focus:ring-qirat-gold/10 transition-all"
                    style={{ [lang === "ar" ? "paddingRight" : "paddingLeft"]: "40px", [lang === "ar" ? "paddingLeft" : "paddingRight"]: "16px" }}
                    dir="ltr"
                  />
                </div>
                <p className="mt-1.5 text-xs text-qirat-navy/40">
                  {t("افتح جوجل مابس وشارك رابط الموقع للتحقق من العنوان بدقة", "Open Google Maps, drop a pin and share the link for accurate location")}
                </p>
                {form.mapsLink && (
                  <a
                    href={form.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-qirat-gold hover:underline"
                  >
                    <MapPin className="w-3 h-3" />
                    {t("معاينة الموقع", "Preview Location")}
                  </a>
                )}
              </div>

              {/* Compound */}
              <div>
                <label className="block text-qirat-navy/60 text-xs font-bold uppercase tracking-wider mb-2">
                  {t("الكمبوند (اختياري)", "Compound (Optional)")}
                </label>
                <div className="relative">
                  <Building2 className="absolute top-1/2 -translate-y-1/2 w-4 h-4 text-qirat-navy/30"
                    style={{ [lang === "ar" ? "right" : "left"]: "14px" }} />
                  <input
                    value={form.compound} onChange={e => setForm({ ...form, compound: e.target.value })}
                    placeholder={t("اسم الكمبوند إن وُجد", "Compound name if applicable")}
                    className="w-full py-3 rounded-xl border border-gray-200 text-qirat-navy text-sm focus:outline-none focus:border-qirat-gold/60 focus:ring-2 focus:ring-qirat-gold/10 transition-all"
                    style={{ [lang === "ar" ? "paddingRight" : "paddingLeft"]: "40px", [lang === "ar" ? "paddingLeft" : "paddingRight"]: "16px" }}
                  />
                </div>
              </div>
            </div>

            {/* Unit Type */}
            <div>
              <label className="block text-qirat-navy/60 text-xs font-bold uppercase tracking-wider mb-2">
                {t("نوع الوحدة", "Unit Type")}
              </label>
              <div className="relative">
                <Home className="absolute top-1/2 -translate-y-1/2 w-4 h-4 text-qirat-navy/30"
                  style={{ [lang === "ar" ? "right" : "left"]: "14px" }} />
                <select
                  required value={form.unitType} onChange={e => setForm({ ...form, unitType: e.target.value })}
                  className="w-full py-3 rounded-xl border border-gray-200 text-qirat-navy text-sm focus:outline-none focus:border-qirat-gold/60 focus:ring-2 focus:ring-qirat-gold/10 transition-all appearance-none bg-white cursor-pointer"
                  style={{ [lang === "ar" ? "paddingRight" : "paddingLeft"]: "40px", [lang === "ar" ? "paddingLeft" : "paddingRight"]: "16px" }}
                >
                  <option value="">{t("اختر نوع الوحدة", "Select unit type")}</option>
                  {UNIT_TYPES.map(u => (
                    <option key={u.ar} value={u.ar}>{t(u.ar, u.en)}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-qirat-navy/60 text-xs font-bold uppercase tracking-wider mb-2">
                {t("وصف الوحدة", "Unit Description")}
              </label>
              <div className="relative">
                <FileText className="absolute top-3.5 w-4 h-4 text-qirat-navy/30"
                  style={{ [lang === "ar" ? "right" : "left"]: "14px" }} />
                <textarea
                  required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={4}
                  placeholder={t("صف وحدتك: المساحة، التشطيب، عدد الغرف، السعر المطلوب...", "Describe your unit: area, finishing, rooms, asking price...")}
                  className="w-full py-3 rounded-xl border border-gray-200 text-qirat-navy text-sm focus:outline-none focus:border-qirat-gold/60 focus:ring-2 focus:ring-qirat-gold/10 transition-all resize-none"
                  style={{ [lang === "ar" ? "paddingRight" : "paddingLeft"]: "40px", [lang === "ar" ? "paddingLeft" : "paddingRight"]: "16px" }}
                />
              </div>
            </div>

            {status === "success" && (
              <motion.div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 text-green-700 text-sm"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                {t("تم إرسال بياناتك! سيتواصل معك أحد وكلائنا قريباً.", "Your details were sent! One of our agents will contact you soon.")}
              </motion.div>
            )}
            {status === "error" && (
              <motion.div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                {t("حدث خطأ، يرجى المحاولة لاحقاً.", "An error occurred, please try again.")}
              </motion.div>
            )}

            <motion.button
              type="submit" disabled={status === "sending" || status === "success"}
              className="w-full btn-gold py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 disabled:opacity-70"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            >
              {status === "sending" ? (
                <motion.div className="w-5 h-5 border-2 border-qirat-navy/30 border-t-qirat-navy rounded-full"
                  animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {t("إرسال الطلب", "Submit Request")}
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
