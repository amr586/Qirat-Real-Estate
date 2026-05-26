import { Link } from "wouter";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";

export default function Footer() {
  const { t, lang, dir } = useLang();

  return (
    <footer
      dir={dir}
      style={{ background: "linear-gradient(135deg, #0F2347 0%, #1B3A6B 100%)" }}
      className="border-t border-qirat-gold/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link href="/">
              <motion.img
                src="/qirat-logo-transparent.png"
                alt="قيراط"
                className="h-20 w-auto object-contain mb-4 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              />
            </Link>
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

          <div>
            <h3 className="text-qirat-gold font-bold text-lg mb-5">
              {t("خدماتنا", "Services")}
            </h3>
            <ul className="space-y-3">
              {[
                { ar: "بيع العقارات", en: "Property Sales" },
                { ar: "شراء العقارات", en: "Property Purchase" },
                { ar: "الشراكات العقارية", en: "Real Estate Partnerships" },
                { ar: "إيجار العقارات", en: "Property Rental" },
                { ar: "التقييم العقاري", en: "Property Valuation" },
              ].map((item, i) => (
                <li key={i}>
                  <span className="text-white/65 text-sm">{t(item.ar, item.en)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-qirat-gold font-bold text-lg mb-5">
              {t("تواصل معنا", "Contact Us")}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-qirat-gold flex-shrink-0 mt-0.5" />
                <span className="text-white/65 text-sm">
                  {t("القاهرة، جمهورية مصر العربية", "Cairo, Arab Republic of Egypt")}
                </span>
              </li>
              <li>
                <a href="tel:+20100000000">
                  <motion.div
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 mt-1"
                    style={{
                      background: "linear-gradient(135deg, rgba(201,168,76,0.18) 0%, rgba(201,168,76,0.08) 100%)",
                      border: "1px solid rgba(201,168,76,0.35)",
                    }}
                    whileHover={{ scale: 1.03, borderColor: "rgba(201,168,76,0.7)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(201,168,76,0.2)" }}
                    >
                      <Phone className="w-4 h-4 text-qirat-gold" />
                    </div>
                    <div>
                      <div className="text-white/40 text-xs">{t("اتصل بنا", "Call Us")}</div>
                      <div className="text-qirat-gold font-black text-base leading-tight">+20 100 000 0000</div>
                    </div>
                  </motion.div>
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
