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
  const similarProperties = property
    ? properties
        .filter((p) => p.id !== property.id && (p.type === property.type || p.locationAr.split("،")[0] === property.locationAr.split("،")[0]))
        .slice(0, 3)
    : [];

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
    commercial: "#0F2347",
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
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
          >
            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-4 z-10">
              <span className="text-white/60 text-sm font-medium">
                {activeImg + 1} / {gallery.length}
              </span>
              <button
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                onClick={() => setLightbox(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main image */}
            <div className="flex items-center justify-center w-full px-16 flex-1" onClick={(e) => e.stopPropagation()}>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); prevImg(); }}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={gallery[activeImg]}
                  alt=""
                  className="max-h-[72vh] max-w-full rounded-2xl object-contain shadow-2xl"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  onClick={(e) => e.stopPropagation()}
                />
              </AnimatePresence>

              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); nextImg(); }}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Thumbnail strip */}
            {gallery.length > 1 && (
              <div
                className="flex gap-2 px-4 pb-4 pt-3 overflow-x-auto"
                style={{ maxWidth: "100vw" }}
                onClick={(e) => e.stopPropagation()}
              >
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className="flex-shrink-0 rounded-xl overflow-hidden transition-all"
                    style={{
                      width: 72, height: 52,
                      outline: i === activeImg ? "2px solid #C9A84C" : "2px solid transparent",
                      outlineOffset: 2,
                      opacity: i === activeImg ? 1 : 0.5,
                    }}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mosaic Gallery ── */}
      <div style={{ background: "#0F2347" }} className="pt-20">
        {/* Title bar over dark bg */}
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-4">
          <span
            className="px-4 py-1.5 rounded-full text-sm font-bold text-white mb-3 inline-block"
            style={{ background: typeColors[property.type] }}
          >
            {lang === "ar" ? property.typeAr : property.typeEn}
          </span>
          <h1
            className="text-3xl md:text-4xl font-black text-white mb-1"
            style={{ fontFamily: lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif" }}
          >
            {lang === "ar" ? property.titleAr : property.titleEn}
          </h1>
          <a
            href={`https://www.google.com/maps/search/${encodeURIComponent(lang === "ar" ? property.locationAr : property.locationEn)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/60 hover:text-qirat-gold transition-colors text-sm"
          >
            <MapPin className="w-4 h-4 text-qirat-gold" />
            <span>{lang === "ar" ? property.locationAr : property.locationEn}</span>
          </a>
        </div>

        {/* Photo grid */}
        <div className="max-w-7xl mx-auto px-4 pb-0">
          {/* Mobile: horizontal scroll */}
          <div className="flex md:hidden gap-2 overflow-x-auto pb-3" style={{ scrollbarWidth: "none" }}>
            {gallery.map((img, i) => (
              <button
                key={i}
                className="flex-shrink-0 rounded-2xl overflow-hidden"
                style={{ width: 260, height: 180 }}
                onClick={() => { setActiveImg(i); setLightbox(true); }}
              >
                <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </button>
            ))}
          </div>

          {/* Desktop: mosaic grid */}
          <div className="hidden md:grid gap-2" style={{
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "240px 240px",
          }}>
            {/* Main large image — spans 2 rows, 2 cols */}
            <div
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
              style={{ gridColumn: "1 / 3", gridRow: "1 / 3" }}
              onClick={() => { setActiveImg(0); setLightbox(true); }}
            >
              <img
                src={gallery[0]}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
              <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm text-white/90 text-xs px-2.5 py-1.5 rounded-full flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-3 h-3" /> {t("تكبير", "Zoom")}
              </div>
            </div>

            {/* Side images — each 1 col, 1 row */}
            {gallery.slice(1, 4).map((img, i) => {
              const isLast = i === 2 && gallery.length > 4;
              return (
                <div
                  key={i}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() => { setActiveImg(i + 1); setLightbox(true); }}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    style={{ filter: isLast ? "brightness(0.5)" : undefined }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
                  {isLast && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <span className="text-3xl font-black">+{gallery.length - 4}</span>
                      <span className="text-sm text-white/80 mt-1">{t("صورة أخرى", "more photos")}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* "Show all photos" button */}
          <div className="hidden md:flex justify-end pb-4 pt-2">
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
              onClick={() => { setActiveImg(0); setLightbox(true); }}
            >
              <ZoomIn className="w-4 h-4 text-qirat-gold" />
              {t(`عرض كل الصور (${gallery.length})`, `Show all photos (${gallery.length})`)}
            </button>
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
              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(lang === "ar" ? property.locationAr : property.locationEn)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-qirat-navy/50 hover:text-qirat-gold text-sm mb-7 self-start flex items-center gap-1.5 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-qirat-gold flex-shrink-0" />
                {lang === "ar" ? property.locationAr : property.locationEn}
              </a>
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

                <div className="mt-5 pt-5 border-t border-white/10 text-center">
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

      {/* Similar Properties */}
      {similarProperties.length > 0 && (
        <div className="py-16 px-4 bg-qirat-cream">
          <div className="max-w-7xl mx-auto">
            <motion.div className="mb-10" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="text-qirat-gold font-semibold text-sm uppercase tracking-widest mb-2 block">
                {t("قد يعجبك أيضاً", "You May Also Like")}
              </span>
              <h2
                className="text-3xl font-black text-qirat-navy"
                style={{ fontFamily: lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif" }}
              >
                {t("عقارات مشابهة", "Similar Properties")}
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((prop, i) => (
                <motion.div
                  key={prop.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group"
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={prop.image}
                      alt={lang === "ar" ? prop.titleAr : prop.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span
                      className="absolute top-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{
                        [lang === "ar" ? "right" : "left"]: "12px",
                        background: prop.type === "sale" ? "#1B3A6B" : "#C9A84C",
                      }}
                    >
                      {lang === "ar" ? prop.typeAr : prop.typeEn}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-black text-qirat-navy mb-1 text-base line-clamp-1">
                      {lang === "ar" ? prop.titleAr : prop.titleEn}
                    </h3>
                    <p className="text-qirat-gold text-sm font-semibold mb-3 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {lang === "ar" ? prop.locationAr : prop.locationEn}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-black text-qirat-navy text-base">
                        {prop.price} <span className="text-xs font-semibold text-qirat-navy/40">{t("ج.م", "EGP")}</span>
                      </span>
                      <Link href={`/properties/${prop.id}`}>
                        <motion.button
                          className="text-qirat-gold text-sm font-bold hover:underline flex items-center gap-1"
                          whileHover={{ x: lang === "ar" ? -3 : 3 }}
                        >
                          {t("التفاصيل", "Details")}
                          {lang === "ar" ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
