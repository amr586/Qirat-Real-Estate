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
          className="fixed bottom-6 left-1/2 z-50 w-full max-w-lg px-4"
          style={{ transform: "translateX(-50%)" }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div
            className="rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #1B3A6B 0%, #0F2347 100%)",
              border: "1px solid rgba(201,168,76,0.3)",
            }}
          >
            <div className="p-5 flex items-center gap-4">
              <motion.div
                className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(201,168,76,0.15)" }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Smartphone className="w-7 h-7 text-qirat-gold" />
              </motion.div>

              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-base leading-tight">
                  {t("حمّل تطبيق قيراط!", "Download the Qirat App!")}
                </p>
                <p className="text-white/70 text-sm mt-1">
                  {t(
                    "اكتشف أفضل العقارات في مكان واحد — الرابط قريباً",
                    "Discover the best properties in one place — Link coming soon"
                  )}
                </p>
              </div>

              <div className="flex flex-col gap-2 flex-shrink-0">
                <button
                  className="btn-gold px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 whitespace-nowrap"
                  onClick={handleDismiss}
                >
                  <Download className="w-4 h-4" />
                  {t("قريباً", "Soon")}
                </button>
              </div>

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
