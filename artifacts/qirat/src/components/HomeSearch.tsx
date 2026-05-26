import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { useLocation } from "wouter";
import { useLang } from "../contexts/LanguageContext";

const LOCATION_TAGS = [
  { ar: "التجمع الخامس", en: "5th Settlement", key: "5th-settlement" },
  { ar: "جولدن سكوير", en: "Golden Square", key: "golden-square" },
  { ar: "العاصمة الإدارية", en: "New Capital", key: "new-capital" },
  { ar: "التجمع السادس", en: "6th Settlement", key: "6th-settlement" },
  { ar: "مصر الجديدة", en: "Heliopolis", key: "heliopolis" },
  { ar: "الشيخ زايد", en: "Sheikh Zayed", key: "sheikh-zayed" },
  { ar: "مناطق أخرى ›", en: "Other Areas ›", key: "other" },
];

const TYPE_FILTERS = [
  { key: "all", ar: "الكل", en: "All" },
  { key: "sale", ar: "للبيع", en: "For Sale" },
  { key: "rent", ar: "للإيجار", en: "For Rent" },
  { key: "partnership", ar: "شراكة", en: "Partnership" },
] as const;

export default function HomeSearch() {
  const { t, lang, dir } = useLang();
  const [, navigate] = useLocation();

  const [type, setType] = useState<"all" | "sale" | "rent" | "partnership">("all");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (type !== "all") params.set("type", type);
    if (search.trim()) params.set("q", search.trim());
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (minArea) params.set("minArea", minArea);
    if (maxArea) params.set("maxArea", maxArea);
    if (selectedLocation) params.set("location", selectedLocation);
    const qs = params.toString();
    navigate(`/properties${qs ? `?${qs}` : ""}`);
  };

  const handleLocationTag = (key: string) => {
    const next = selectedLocation === key ? "" : key;
    setSelectedLocation(next);
  };

  const hasAdvanced = minPrice || maxPrice || minArea || maxArea;

  return (
    <motion.div
      dir={dir}
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.7 }}
    >
      <div
        className="rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(201,168,76,0.2)",
        }}
      >
        {/* Type tabs */}
        <div
          className="flex border-b"
          style={{ borderColor: "rgba(201,168,76,0.15)", background: "rgba(27,58,107,0.03)" }}
        >
          {TYPE_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setType(f.key)}
              className="flex-1 py-3.5 text-sm font-bold transition-all relative"
              style={{
                color: type === f.key ? "#1B3A6B" : "#1B3A6B80",
                background: type === f.key ? "white" : "transparent",
              }}
            >
              {t(f.ar, f.en)}
              {type === f.key && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: "#C9A84C" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className="p-4 pb-3">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 text-qirat-navy/40"
                style={{ [lang === "ar" ? "right" : "left"]: "14px" }}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder={t("ابحث بالموقع أو نوع العقار...", "Search by location or property type...")}
                className="w-full py-3 rounded-xl border border-gray-200 text-qirat-navy text-sm focus:outline-none focus:border-qirat-gold/60 focus:ring-2 focus:ring-qirat-gold/10 transition-all"
                style={{
                  [lang === "ar" ? "paddingRight" : "paddingLeft"]: "40px",
                  [lang === "ar" ? "paddingLeft" : "paddingRight"]: "16px",
                }}
              />
            </div>

            <motion.button
              onClick={handleSearch}
              className="btn-gold px-6 py-3 rounded-xl font-bold text-sm flex-shrink-0"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {t("بحث", "Search")}
            </motion.button>

            <motion.button
              onClick={() => setShowFilters((v) => !v)}
              className="px-4 py-3 rounded-xl border text-sm font-semibold flex items-center gap-1.5 flex-shrink-0 transition-all"
              style={{
                borderColor: showFilters ? "#C9A84C" : "#e5e7eb",
                color: showFilters ? "#C9A84C" : "#1B3A6B80",
                background: showFilters ? "rgba(201,168,76,0.06)" : "white",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              {showFilters ? (
                <>
                  <X className="w-3.5 h-3.5" />
                  {t("إخفاء", "Hide")}
                </>
              ) : (
                <>
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>{t("فلترة", "Filter")}</span>
                  {hasAdvanced && (
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: "#C9A84C" }}
                    />
                  )}
                </>
              )}
            </motion.button>
          </div>

          {/* Advanced filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="pt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-qirat-navy/55 text-xs font-semibold mb-1.5 uppercase tracking-wide">
                      {t("السعر الأدنى", "Min Price")}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder={t("من", "From")}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-qirat-navy text-sm focus:outline-none focus:border-qirat-gold/60 focus:ring-2 focus:ring-qirat-gold/10 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-qirat-navy/55 text-xs font-semibold mb-1.5 uppercase tracking-wide">
                      {t("السعر الأقصى", "Max Price")}
                    </label>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      placeholder={t("إلى", "To")}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-qirat-navy text-sm focus:outline-none focus:border-qirat-gold/60 focus:ring-2 focus:ring-qirat-gold/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-qirat-navy/55 text-xs font-semibold mb-1.5 uppercase tracking-wide">
                      {t("المساحة (م²)", "Min Area (m²)")}
                    </label>
                    <input
                      type="number"
                      value={minArea}
                      onChange={(e) => setMinArea(e.target.value)}
                      placeholder={t("من", "From")}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-qirat-navy text-sm focus:outline-none focus:border-qirat-gold/60 focus:ring-2 focus:ring-qirat-gold/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-qirat-navy/55 text-xs font-semibold mb-1.5 uppercase tracking-wide">
                      {t("المساحة (م²)", "Max Area (m²)")}
                    </label>
                    <input
                      type="number"
                      value={maxArea}
                      onChange={(e) => setMaxArea(e.target.value)}
                      placeholder={t("إلى", "To")}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-qirat-navy text-sm focus:outline-none focus:border-qirat-gold/60 focus:ring-2 focus:ring-qirat-gold/10 transition-all"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Location chips */}
        <div
          className="px-4 pb-4 pt-1 flex flex-wrap gap-2"
          style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}
        >
          {LOCATION_TAGS.map((tag) => (
            <button
              key={tag.key}
              onClick={() => tag.key !== "other" && handleLocationTag(tag.key)}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={
                selectedLocation === tag.key
                  ? {
                      background: "#1B3A6B",
                      color: "white",
                      boxShadow: "0 2px 8px rgba(27,58,107,0.25)",
                    }
                  : {
                      background: "rgba(27,58,107,0.06)",
                      color: "#1B3A6B",
                      border: "1px solid rgba(27,58,107,0.1)",
                    }
              }
            >
              {t(tag.ar, tag.en)}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
