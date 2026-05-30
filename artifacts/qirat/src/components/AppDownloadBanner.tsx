import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";

function GooglePlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M3.18 23.76c.37.2.8.22 1.2.04l12.35-7.13-2.7-2.7L3.18 23.76zM.5 1.4C.19 1.8 0 2.36 0 3.07v17.86c0 .71.19 1.27.5 1.67l.09.08 10.01-10.01v-.22L.59 1.32.5 1.4zM20.49 10.28l-2.86-1.65-3.02 3.02 3.02 3.02 2.88-1.66c.82-.47.82-1.25-.02-1.73zM4.38.24L16.73 7.37l-2.7 2.7L3.18.24C3.58.06 4.01.08 4.38.24z"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

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
          className="fixed bottom-0 left-0 right-0 z-50 sm:bottom-6 sm:left-1/2 sm:right-auto sm:w-full sm:max-w-xl sm:-translate-x-1/2 px-0 sm:px-4"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
        >
          <div
            className="rounded-none sm:rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #1B3A6B 0%, #0F2347 100%)",
              border: "1px solid rgba(201,168,76,0.3)",
            }}
          >
            <div className="px-5 py-4 sm:p-5">
              {/* Header row */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="flex-shrink-0 w-11 h-11 rounded-xl overflow-hidden"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <img
                      src="/qirat-logo.jpg"
                      alt="قيراط"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </motion.div>
                  <div>
                    <p className="text-white font-black text-sm sm:text-base leading-tight">
                      {t("حمّل تطبيق قيراط!", "Download the Qirat App!")}
                    </p>
                    <p className="text-white/60 text-xs mt-0.5">
                      {t("اكتشف أفضل العقارات في مكان واحد", "Discover the best properties in one place")}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleDismiss}
                  className="flex-shrink-0 p-1.5 rounded-full hover:bg-white/10 transition-colors mt-0.5"
                >
                  <X className="w-4 h-4 text-white/50" />
                </button>
              </div>

              {/* Download buttons */}
              <div className="flex gap-3">
                {/* Google Play */}
                <motion.a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex-1 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl font-bold text-sm transition-all"
                  style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)", color: "white" }}
                  whileHover={{ background: "rgba(255,255,255,0.2)", scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <GooglePlayIcon />
                  <div className="text-start leading-tight">
                    <div className="text-white/60 text-[10px]">{t("تحميل من", "Get it on")}</div>
                    <div className="font-black text-xs">Google Play</div>
                  </div>
                </motion.a>

                {/* App Store */}
                <motion.a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex-1 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl font-bold text-sm transition-all"
                  style={{ background: "rgba(201,168,76,0.2)", border: "1px solid rgba(201,168,76,0.4)", color: "white" }}
                  whileHover={{ background: "rgba(201,168,76,0.35)", scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <AppleIcon />
                  <div className="text-start leading-tight">
                    <div className="text-white/60 text-[10px]">{t("تحميل من", "Download on the")}</div>
                    <div className="font-black text-xs">App Store</div>
                  </div>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
