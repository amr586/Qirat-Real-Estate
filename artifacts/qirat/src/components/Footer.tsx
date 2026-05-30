import { Link } from "wouter";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";

function GooglePlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="currentColor">
      <path d="M3.18 23.76c.37.2.8.22 1.2.04l12.35-7.13-2.7-2.7L3.18 23.76zM.5 1.4C.19 1.8 0 2.36 0 3.07v17.86c0 .71.19 1.27.5 1.67l.09.08 10.01-10.01v-.22L.59 1.32.5 1.4zM20.49 10.28l-2.86-1.65-3.02 3.02 3.02 3.02 2.88-1.66c.82-.47.82-1.25-.02-1.73zM4.38.24L16.73 7.37l-2.7 2.7L3.18.24C3.58.06 4.01.08 4.38.24z"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

const APP_LINK = "https://qirat.app";

export default function Footer() {
  const { t, lang, dir } = useLang();

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(APP_LINK)}&color=C9A84C&bgcolor=1B3A6B&margin=6`;

  return (
    <footer
      dir={dir}
      style={{ background: "linear-gradient(135deg, #0F2347 0%, #1B3A6B 100%)" }}
      className="border-t border-qirat-gold/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="mb-5">
              <img
                src="/qirat-logo-nobg.png"
                alt="قيراط"
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-white/65 text-sm leading-relaxed">
              {t(
                "قيراط — شريكك الموثوق في سوق العقارات المصري. نقدم أفضل الفرص العقارية في القاهرة بشفافية واحترافية.",
                "Qirat — your trusted partner in the Egyptian real estate market. We offer the best real estate opportunities in Cairo with transparency and professionalism."
              )}
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Youtube, href: "#" },
              ].map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-qirat-gold/30 text-qirat-gold hover:bg-qirat-gold/10 transition-colors"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-qirat-gold font-bold text-lg mb-5">
              {t("روابط سريعة", "Quick Links")}
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", ar: "الرئيسية", en: "Home" },
                { href: "/about", ar: "من نحن", en: "About" },
                { href: "/services", ar: "خدماتنا", en: "Services" },
                { href: "/properties", ar: "العقارات", en: "Properties" },
                { href: "/sell", ar: "بيع وحدتك", en: "Sell Your Unit" },
                { href: "/blog", ar: "المدونة", en: "Blog" },
                { href: "/careers", ar: "وظائف", en: "Careers" },
                { href: "/contact", ar: "تواصل معنا", en: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-white/65 hover:text-qirat-gold transition-colors text-sm cursor-pointer">
                      {t(link.ar, link.en)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-qirat-gold font-bold text-lg mb-5">
              {t("خدماتنا", "Services")}
            </h3>
            <ul className="space-y-3">
              {[
                { ar: "بيع العقارات", en: "Property Sales" },
                { ar: "شراء العقارات", en: "Property Purchase" },
                { ar: "إيجار العقارات", en: "Property Rental" },
                { ar: "التقييم العقاري", en: "Property Valuation" },
              ].map((item, i) => (
                <li key={i}>
                  <Link href="/services">
                    <span className="text-white/65 hover:text-qirat-gold transition-colors text-sm cursor-pointer">
                      {t(item.ar, item.en)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-qirat-gold font-bold text-lg mb-5">
              {t("تواصل معنا", "Contact Us")}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-qirat-gold flex-shrink-0 mt-0.5" />
                <a
                  href="https://www.google.com/maps/search/القاهرة،+مصر"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/65 hover:text-qirat-gold text-sm transition-colors"
                >
                  {t("القاهرة، جمهورية مصر العربية", "Cairo, Arab Republic of Egypt")}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-qirat-gold flex-shrink-0" />
                <a href="tel:+20100000000" className="text-white/65 hover:text-qirat-gold text-sm transition-colors">
                  +20 100 000 0000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-qirat-gold flex-shrink-0" />
                <a href="mailto:amrw4634@gmail.com" className="text-white/65 hover:text-qirat-gold text-sm transition-colors">
                  amrw4634@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h3 className="text-qirat-gold font-bold text-lg mb-5">
              {t("حمّل التطبيق", "Download App")}
            </h3>

            {/* QR Code */}
            <div className="mb-4">
              <div
                className="inline-block p-2 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(201,168,76,0.25)" }}
              >
                <img
                  src={qrUrl}
                  alt="QR Code"
                  width={100}
                  height={100}
                  className="rounded-xl block"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>
              <p className="text-white/45 text-xs mt-2">
                {t("امسح الكود لتحميل التطبيق", "Scan to download the app")}
              </p>
            </div>

            {/* Store buttons */}
            <div className="flex flex-col gap-2">
              <motion.a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
                whileHover={{ background: "rgba(255,255,255,0.15)", scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <GooglePlayIcon />
                <div className="leading-tight">
                  <div className="text-white/50 text-[10px]">{t("تحميل من", "Get it on")}</div>
                  <div className="text-white font-bold text-xs">Google Play</div>
                </div>
              </motion.a>

              <motion.a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all"
                style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.35)" }}
                whileHover={{ background: "rgba(201,168,76,0.28)", scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <AppleIcon />
                <div className="leading-tight">
                  <div className="text-white/50 text-[10px]">{t("تحميل من", "Download on the")}</div>
                  <div className="text-white font-bold text-xs">App Store</div>
                </div>
              </motion.a>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-qirat-gold/15 text-center">
          <p className="text-white/40 text-sm">
            © 2025 {t("قيراط للعقارات. جميع الحقوق محفوظة.", "Qirat Real Estate. All rights reserved.")}
          </p>
        </div>
      </div>
    </footer>
  );
}
