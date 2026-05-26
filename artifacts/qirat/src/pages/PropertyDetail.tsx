import { useState } from "react";
import { useParams, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, BedDouble, Bath, Maximize2, CheckCircle2,
  ArrowLeft, ArrowRight, Send, Phone, Building2, Calendar,
  Layers, Star, TrendingUp, CreditCard, Navigation,
  Home, ChevronLeft, ChevronRight, X, ZoomIn
} from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { properties } from "../data/properties";
import emailjs from "@emailjs/browser";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55 },
  }),
};

export default function PropertyDetail() {
  const { t, lang, dir } = useLang();
  const { id } = useParams<{ id: string }>();
  const property = properties.find((p) => p.id === Number(id));

  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);

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
        "YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID",
        {
          from_name: form.name, from_email: form.email,
          phone: form.phone, message: form.message,
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

  const gallery = property.gallery?.length ? property.gallery : [property.image];
  const prevImg = () => setActiveImg((prev) => (prev - 1 + gallery.length) % gallery.length);
  const nextImg = () => setActiveImg((prev) => (prev + 1) % gallery.length);

  return (
    <div dir={dir} className="pt-20 bg-qirat-cream min-h-screen">

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
          >
            <button className="absolute top-5 right-5 text-white/70 hover:text-white" onClick={() => setLightbox(false)}>
              <X className="w-8 h-8" />
            </button>
            <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2" onClick={(e) => { e.stopPropagation(); prevImg(); }}>
              <ChevronLeft className="w-9 h-9" />
            </button>
            <img
              src={gallery[activeImg]}
              alt=""
              className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2" onClick={(e) => { e.stopPropagation(); nextImg(); }}>
              <ChevronRight className="w-9 h-9" />
            </button>
            <div className="absolute bottom-5 text-white/50 text-sm">{activeImg + 1} / {gallery.length}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero Gallery ── */}
      <div className="relative h-80 md:h-[520px] overflow-hidden group cursor-pointer" onClick={() => setLightbox(true)}>
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImg}
            src={gallery[activeImg]}
            alt={lang === "ar" ? property.titleAr : property.titleEn}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Zoom hint */}
        <div className="absolute top-4 right-4 bg-black/40 text-white/80 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="w-3.5 h-3.5" /> {t("تكبير", "Zoom")}
        </div>

        {/* Gallery nav arrows */}
        {gallery.length > 1 && (
          <>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
              onClick={(e) => { e.stopPropagation(); prevImg(); }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
              onClick={(e) => { e.stopPropagation(); nextImg(); }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Thumbnails */}
        {gallery.length > 1 && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
            {gallery.map((img, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setActiveImg(i); }}
                className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${i === activeImg ? "border-qirat-gold scale-110" : "border-white/40 opacity-60"}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <span
              className="px-4 py-1.5 rounded-full text-sm font-bold text-white mb-3 inline-block"
              style={{ background: typeColors[property.type] }}
            >
              {lang === "ar" ? property.typeAr : property.typeEn}
            </span>
            <h1
              className="text-3xl md:text-5xl font-black text-white mb-2"
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

      <div className="max-w-7xl mx-auto px-4 py-10">
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

          {/* ── Left / Main ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Quick stats */}
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-sm"
              variants={fadeUp} initial="hidden" animate="visible"
            >
              <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                <div>
                  <p className="text-qirat-navy/40 text-sm mb-1">{t("السعر", "Price")}</p>
                  <div
                    className="text-4xl font-black text-qirat-navy"
                    style={{ fontFamily: lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif" }}
                  >
                    {property.price}
                    <span className="text-base font-semibold text-qirat-navy/40 mr-2">{t("ج.م", "EGP")}</span>
                  </div>
                </div>
                {property.investmentReturn && (
                  <div
                    className="flex items-center gap-2 px-5 py-3 rounded-2xl"
                    style={{ background: "linear-gradient(135deg,rgba(201,168,76,.18),rgba(201,168,76,.08))", border: "1px solid rgba(201,168,76,.4)" }}
                  >
                    <TrendingUp className="w-5 h-5 text-qirat-gold" />
                    <div>
                      <p className="text-white/0 text-[0px] leading-none">.</p>
                      <p className="text-xs text-qirat-navy/50">{t("عائد استثماري", "Investment Return")}</p>
                      <p className="text-xl font-black text-qirat-gold">{property.investmentReturn}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gray-100">
                {property.bedrooms > 0 && (
                  <div className="text-center p-3 bg-qirat-cream rounded-2xl">
                    <BedDouble className="w-6 h-6 text-qirat-gold mx-auto mb-1" />
                    <div className="text-2xl font-black text-qirat-navy">{property.bedrooms}</div>
                    <div className="text-qirat-navy/50 text-xs">{t("غرف نوم", "Bedrooms")}</div>
                  </div>
                )}
                <div className="text-center p-3 bg-qirat-cream rounded-2xl">
                  <Bath className="w-6 h-6 text-qirat-gold mx-auto mb-1" />
                  <div className="text-2xl font-black text-qirat-navy">{property.bathrooms}</div>
                  <div className="text-qirat-navy/50 text-xs">{t("حمامات", "Bathrooms")}</div>
                </div>
                <div className="text-center p-3 bg-qirat-cream rounded-2xl">
                  <Maximize2 className="w-6 h-6 text-qirat-gold mx-auto mb-1" />
                  <div className="text-2xl font-black text-qirat-navy">{property.area}</div>
                  <div className="text-qirat-navy/50 text-xs">{t("م²", "m²")}</div>
                </div>
                {property.floor != null && (
                  <div className="text-center p-3 bg-qirat-cream rounded-2xl">
                    <Layers className="w-6 h-6 text-qirat-gold mx-auto mb-1" />
                    <div className="text-2xl font-black text-qirat-navy">{property.floor}</div>
                    <div className="text-qirat-navy/50 text-xs">{t("الطابق", "Floor")}</div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Property specs */}
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-sm"
              variants={fadeUp} initial="hidden" animate="visible" custom={1}
            >
              <h2 className="text-xl font-bold text-qirat-navy mb-6 flex items-center gap-2">
                <Home className="w-5 h-5 text-qirat-gold" />
                {t("بيانات العقار", "Property Specifications")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: Building2,
                    label: t("اسم المبنى / الكمبوند", "Building / Compound"),
                    value: lang === "ar" ? property.compound : property.compoundEn,
                    show: !!(property.compound || property.compoundEn),
                  },
                  {
                    icon: Layers,
                    label: t("الطابق", "Floor"),
                    value: property.floor != null
                      ? `${property.floor} ${t("من", "of")} ${property.totalFloors}`
                      : null,
                    show: property.floor != null,
                  },
                  {
                    icon: Star,
                    label: t("نوع التشطيب", "Finishing Type"),
                    value: lang === "ar" ? property.finishing : property.finishingEn,
                    show: true,
                  },
                  {
                    icon: Calendar,
                    label: t("سنة البناء", "Year Built"),
                    value: property.yearBuilt?.toString(),
                    show: !!property.yearBuilt,
                  },
                  {
                    icon: Calendar,
                    label: t("تاريخ التسليم", "Delivery Date"),
                    value: lang === "ar" ? property.deliveryDate : property.deliveryDateEn,
                    show: !!(property.deliveryDate || property.deliveryDateEn),
                  },
                  {
                    icon: Maximize2,
                    label: t("المساحة الإجمالية", "Total Area"),
                    value: `${property.area} ${t("م²", "m²")}`,
                    show: true,
                  },
                ]
                  .filter((r) => r.show && r.value)
                  .map(({ icon: Icon, label, value }, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 rounded-2xl"
                      style={{ background: "#F9F8F4", border: "1px solid rgba(201,168,76,.12)" }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(201,168,76,.15)" }}
                      >
                        <Icon className="w-4 h-4 text-qirat-gold" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-qirat-navy/45 text-xs">{label}</p>
                        <p className="text-qirat-navy font-bold text-sm truncate">{value}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-sm"
              variants={fadeUp} initial="hidden" animate="visible" custom={2}
            >
              <h2 className="text-xl font-bold text-qirat-navy mb-4">{t("وصف العقار", "Property Description")}</h2>
              <p className="text-qirat-navy/70 leading-relaxed text-base">
                {lang === "ar" ? property.descAr : property.descEn}
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-sm"
              variants={fadeUp} initial="hidden" animate="visible" custom={3}
            >
              <h2 className="text-xl font-bold text-qirat-navy mb-6">{t("المميزات الرئيسية", "Key Features")}</h2>
              <div className="grid grid-cols-2 gap-3">
                {property.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-qirat-cream rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-qirat-gold flex-shrink-0" />
                    <span className="text-qirat-navy/80 text-sm font-medium">{lang === "ar" ? f.ar : f.en}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <motion.div
                className="bg-white rounded-3xl p-8 shadow-sm"
                variants={fadeUp} initial="hidden" animate="visible" custom={4}
              >
                <h2 className="text-xl font-bold text-qirat-navy mb-6">{t("المرافق والخدمات", "Amenities & Services")}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map((a, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-3 rounded-xl text-center justify-center flex-col"
                      style={{ background: "linear-gradient(135deg,rgba(27,58,107,.05),rgba(27,58,107,.02))", border: "1px solid rgba(27,58,107,.08)" }}
                    >
                      <div className="w-8 h-8 rounded-full bg-qirat-gold/15 flex items-center justify-center">
                        <Star className="w-4 h-4 text-qirat-gold" />
                      </div>
                      <span className="text-qirat-navy/75 text-xs font-semibold leading-tight text-center">
                        {lang === "ar" ? a.ar : a.en}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Payment Options */}
            {property.paymentOptions?.length && (
              <motion.div
                className="bg-white rounded-3xl p-8 shadow-sm"
                variants={fadeUp} initial="hidden" animate="visible" custom={5}
              >
                <h2 className="text-xl font-bold text-qirat-navy mb-2 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-qirat-gold" />
                  {t("خيارات الدفع", "Payment Options")}
                </h2>
                {(property.downPayment || property.monthlyInstallment) && (
                  <div className="grid grid-cols-2 gap-4 mb-6 mt-5">
                    {property.downPayment && (
                      <div
                        className="p-4 rounded-2xl text-center"
                        style={{ background: "linear-gradient(135deg,rgba(201,168,76,.15),rgba(201,168,76,.06))", border: "1px solid rgba(201,168,76,.3)" }}
                      >
                        <p className="text-qirat-navy/50 text-xs mb-1">{t("المقدم", "Down Payment")}</p>
                        <p className="text-xl font-black text-qirat-navy">{property.downPayment}</p>
                        <p className="text-qirat-navy/40 text-xs">{t("ج.م", "EGP")}</p>
                      </div>
                    )}
                    {property.monthlyInstallment && (
                      <div
                        className="p-4 rounded-2xl text-center"
                        style={{ background: "linear-gradient(135deg,rgba(27,58,107,.08),rgba(27,58,107,.03))", border: "1px solid rgba(27,58,107,.12)" }}
                      >
                        <p className="text-qirat-navy/50 text-xs mb-1">{t("القسط الشهري", "Monthly Installment")}</p>
                        <p className="text-xl font-black text-qirat-navy">{property.monthlyInstallment}</p>
                        <p className="text-qirat-navy/40 text-xs">{t("ج.م/شهر", "EGP/mo")}</p>
                      </div>
                    )}
                  </div>
                )}
                <div className="space-y-3">
                  {property.paymentOptions.map((opt, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-qirat-cream rounded-xl">
                      <div className="w-6 h-6 rounded-full bg-qirat-gold/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-qirat-gold">
                        {i + 1}
                      </div>
                      <span className="text-qirat-navy/75 text-sm">{lang === "ar" ? opt.ar : opt.en}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Nearby Places */}
            {property.nearbyPlaces?.length > 0 && (
              <motion.div
                className="bg-white rounded-3xl p-8 shadow-sm"
                variants={fadeUp} initial="hidden" animate="visible" custom={6}
              >
                <h2 className="text-xl font-bold text-qirat-navy mb-6 flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-qirat-gold" />
                  {t("المناطق القريبة", "Nearby Places")}
                </h2>
                <div className="space-y-3">
                  {property.nearbyPlaces.map((place, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-qirat-cream rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-qirat-gold/15 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-4 h-4 text-qirat-gold" />
                        </div>
                        <span className="text-qirat-navy/80 text-sm font-medium">
                          {lang === "ar" ? place.ar : place.en}
                        </span>
                      </div>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{ background: "rgba(201,168,76,.15)", color: "#9A7A2E" }}
                      >
                        {place.distance}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Map */}
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-sm flex flex-col items-center"
              variants={fadeUp} initial="hidden" animate="visible" custom={7}
            >
              <h2 className="text-xl font-bold text-qirat-navy mb-2 self-start">{t("موقع العقار", "Property Location")}</h2>
              <p className="text-qirat-navy/50 text-sm mb-7 self-start">
                {lang === "ar" ? property.locationAr : property.locationEn}
              </p>
              <div className="relative flex items-center justify-center" style={{ width: 290, height: 290 }}>
                <motion.div
                  className="absolute rounded-full"
                  style={{ width: 286, height: 286, border: "2px solid rgba(201,168,76,0.2)" }}
                  animate={{ scale: [1, 1.07, 1], opacity: [0.5, 0.1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute rounded-full"
                  style={{ width: 274, height: 274, border: "1.5px solid rgba(201,168,76,0.3)" }}
                  animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.15, 0.6] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: 0.6 }}
                />
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: 264, height: 264, padding: 5,
                    background: "linear-gradient(135deg, #C9A84C 0%, #F0D98A 45%, #A8872E 100%)",
                    boxShadow: "0 0 28px rgba(201,168,76,0.45), 0 0 60px rgba(201,168,76,0.12)",
                  }}
                >
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(lang === "ar" ? property.locationAr : property.locationEn)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-full overflow-hidden"
                    style={{ width: 254, height: 254 }}
                    title={lang === "ar" ? "افتح في خرائط جوجل" : "Open in Google Maps"}
                  >
                    <iframe
                      src="https://www.openstreetmap.org/export/embed.html?bbox=31.1700%2C29.9700%2C31.3100%2C30.0800&layer=mapnik"
                      width="254" height="254"
                      style={{ border: 0, display: "block", pointerEvents: "none" }}
                      title={lang === "ar" ? property.locationAr : property.locationEn}
                      loading="lazy"
                    />
                  </a>
                </div>
                <motion.div
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                >
                  <div
                    className="px-4 py-1.5 rounded-full text-xs font-bold text-white flex items-center gap-1.5 whitespace-nowrap"
                    style={{
                      background: "linear-gradient(135deg, #1B3A6B, #0F2347)",
                      border: "1px solid rgba(201,168,76,0.45)",
                      boxShadow: "0 4px 14px rgba(27,58,107,0.3)",
                    }}
                  >
                    <MapPin className="w-3 h-3 text-qirat-gold" />
                    {lang === "ar" ? property.locationAr : property.locationEn}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* ── Right / Sidebar ── */}
          <div className="lg:col-span-1">
            <motion.div
              className="sticky top-28 rounded-3xl overflow-hidden shadow-xl"
              style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #0F2347 100%)", border: "1px solid rgba(201,168,76,0.2)" }}
              variants={fadeUp} initial="hidden" animate="visible" custom={1}
            >
              <div className="p-8">
                <h3 className="text-xl font-bold text-white mb-1">
                  {t("تواصل بشأن هذا العقار", "Inquire About This Property")}
                </h3>
                <p className="text-white/55 text-sm mb-7">
                  {t("فريقنا جاهز للإجابة على جميع استفساراتك", "Our team is ready to answer all your inquiries")}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { type: "text", key: "name", placeholder: t("اسمك الكريم", "Your Name"), required: true },
                    { type: "tel", key: "phone", placeholder: t("رقم هاتفك", "Your Phone"), required: false },
                    { type: "email", key: "email", placeholder: t("بريدك الإلكتروني", "Your Email"), required: true },
                  ].map(({ type, key, placeholder, required }) => (
                    <input
                      key={key}
                      type={type}
                      placeholder={placeholder}
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      required={required}
                      className="w-full px-4 py-3 rounded-xl text-sm bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-qirat-gold/60 transition-colors"
                    />
                  ))}
                  <textarea
                    placeholder={t("رسالتك (اختياري)", "Your Message (optional)")}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl text-sm bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-qirat-gold/60 transition-colors resize-none"
                  />

                  {status === "success" && (
                    <motion.div
                      className="text-center py-3 px-4 rounded-xl bg-green-500/20 text-green-300 text-sm"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    >
                      {t("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً", "Your message was sent! We'll contact you soon")}
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div
                      className="text-center py-3 px-4 rounded-xl bg-red-500/20 text-red-300 text-sm"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
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
                    className="flex items-center justify-center gap-2 text-qirat-gold font-bold hover:text-qirat-gold/80 transition-colors"
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
