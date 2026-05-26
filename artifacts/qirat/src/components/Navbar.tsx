import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";

export default function Navbar() {
  const { t, toggleLang, lang, dir } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", labelAr: "الرئيسية", labelEn: "Home" },
    { href: "/about", labelAr: "من نحن", labelEn: "About" },
    { href: "/services", labelAr: "خدماتنا", labelEn: "Services" },
    { href: "/properties", labelAr: "العقارات", labelEn: "Properties" },
    { href: "/contact", labelAr: "تواصل معنا", labelEn: "Contact" },
  ];

  const isActive = (href: string) => location === href;

  return (
    <>
      <motion.nav
        dir={dir}
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(15, 35, 71, 0.98)"
            : "rgba(27, 58, 107, 0.92)",
          backdropFilter: "blur(12px)",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.25)" : "0 2px 20px rgba(0,0,0,0.15)",
          borderBottom: "1px solid rgba(201,168,76,0.2)",
        }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/">
              <motion.div
                className="flex items-center gap-3 cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src="/qirat-logo-transparent.png"
                  alt="قيراط"
                  className="h-12 w-auto object-contain"
                />
              </motion.div>
            </Link>

            <div className={`hidden md:flex items-center ${lang === "ar" ? "gap-8" : "gap-6"}`}>
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <motion.span
                    className={`nav-link text-sm font-semibold cursor-pointer transition-colors ${
                      isActive(link.href)
                        ? "text-qirat-gold active"
                        : "text-white hover:text-qirat-gold"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    style={{ fontFamily: lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif" }}
                  >
                    {lang === "ar" ? link.labelAr : link.labelEn}
                  </motion.span>
                </Link>
              ))}

              <motion.button
                onClick={toggleLang}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-qirat-gold/40 text-qirat-gold hover:bg-qirat-gold/10 transition-all text-sm font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="w-4 h-4" />
                {lang === "ar" ? "EN" : "عربي"}
              </motion.button>
            </div>

            <div className="md:hidden flex items-center gap-3">
              <motion.button
                onClick={toggleLang}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-qirat-gold/40 text-qirat-gold text-xs font-bold"
                whileHover={{ scale: 1.05 }}
              >
                <Globe className="w-3 h-3" />
                {lang === "ar" ? "EN" : "عربي"}
              </motion.button>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            dir={dir}
            className="fixed inset-0 z-30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0"
              style={{ background: "rgba(15, 35, 71, 0.98)" }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="relative flex flex-col items-center justify-center h-full gap-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <img src="/qirat-logo.jpg" alt="قيراط" className="h-20 w-auto rounded-xl mb-4" />
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link href={link.href}>
                    <span
                      className={`text-2xl font-bold cursor-pointer ${
                        isActive(link.href) ? "text-qirat-gold" : "text-white hover:text-qirat-gold"
                      } transition-colors`}
                      onClick={() => setMenuOpen(false)}
                      style={{ fontFamily: lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif" }}
                    >
                      {lang === "ar" ? link.labelAr : link.labelEn}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
