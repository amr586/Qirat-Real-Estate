import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, Download } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";

export default function AppDownloadBanner() {
  const { t, dir } = useLang();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setVisible(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          dir={dir}
          className="fixed bottom-0 left-0 right-0 z-50 sm:bottom-6 sm:left-1/2 sm:right-auto sm:w-full sm:max-w-lg sm:-translate-x-1/2 px-0 sm:px-4"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
        >
          <div
            className="rounded-none sm:rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #1B3A6B 0%, #0F2347 100%)",
              border: "1px solid rgba(201,168,76,0.3)",
            }}
          >
            <div className="px-4 py-4 sm:p-5 flex items-center gap-3 sm:gap-4">
              <motion.div
                className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(201,168,76,0.15)" }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Smartphone className="w-6 h-6 sm:w-7 sm:h-7 text-qirat-gold" />
              </motion.div>

              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm sm:text-base leading-tight">
                  {t("حمّل تطبيق قيراط!", "Download the Qirat App!")}
                </p>
                <p className="text-white/70 text-xs sm:text-sm mt-0.5 sm:mt-1 leading-snug">
                  {t(
                    "اكتشف أفضل العقارات في مكان واحد — الرابط قريباً",
                    "Discover the best properties in one place — Link coming soon"
                  )}
                </p>
              </div>

              <button
                className="btn-gold px-3 py-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 whitespace-nowrap flex-shrink-0"
                onClick={handleDismiss}
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {t("قريباً", "Soon")}
              </button>

              <button
                onClick={handleDismiss}
                className="flex-shrink-0 p-1.5 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
