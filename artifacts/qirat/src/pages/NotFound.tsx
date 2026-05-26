import { Link } from "wouter";
import { motion } from "framer-motion";
import { useLang } from "../contexts/LanguageContext";

export default function NotFound() {
  const { t, lang, dir } = useLang();
  return (
    <div
      dir={dir}
      className="min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #0F2347 100%)" }}
    >
      <motion.div
        className="text-center px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.h1
          className="text-9xl font-black text-shimmer mb-4"
          style={{ fontFamily: lang === "ar" ? "Cairo, sans-serif" : "Montserrat, sans-serif" }}
        >
          404
        </motion.h1>
        <p className="text-white/70 text-xl mb-8">
          {t("عذراً، الصفحة غير موجودة", "Sorry, page not found")}
        </p>
        <Link href="/">
          <motion.button
            className="btn-gold px-8 py-4 rounded-2xl font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            {t("العودة للرئيسية", "Back to Home")}
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
