import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Check } from "lucide-react";
import { useLocation } from "wouter";
import { useLang } from "../contexts/LanguageContext";

const UNIT_TYPES = [
  { ar: "شقة", en: "Apartment", key: "apartment" },
  { ar: "فيلا", en: "Villa", key: "villa" },
  { ar: "بنتهاوس", en: "Penthouse", key: "penthouse" },
  { ar: "دوبلكس", en: "Duplex", key: "duplex" },
  { ar: "ستوديو", en: "Studio", key: "studio" },
  { ar: "وحدة تجارية", en: "Commercial", key: "commercial" },
];

const BEDROOM_OPTIONS = [
  { ar: "أي عدد", en: "Any", val: "" },
  { ar: "1", en: "1", val: "1" },
  { ar: "2", en: "2", val: "2" },
  { ar: "3", en: "3", val: "3" },
  { ar: "4", en: "4", val: "4" },
  { ar: "5+", en: "5+", val: "5" },
];

const PRICE_RANGES = [
  { ar: "أي سعر", en: "Any Price", min: "", max: "" },
  { ar: "أقل من 2 مليون", en: "Under 2M EGP", min: "", max: "2000000" },
  { ar: "2 – 5 مليون", en: "2M – 5M EGP", min: "2000000", max: "5000000" },
  { ar: "5 – 10 مليون", en: "5M – 10M EGP", min: "5000000", max: "10000000" },
  { ar: "10 – 20 مليون", en: "10M – 20M EGP", min: "10000000", max: "20000000" },
  { ar: "أكثر من 20 مليون", en: "Over 20M EGP", min: "20000000", max: "" },
];

type Tab = "compounds" | "units";

interface PortalDropdownProps {
  label: string;
  value: string;
  options: { label: string; val: string }[];
  onChange: (val: string) => void;
}

function PortalDropdown({ label, value, options, onChange }: PortalDropdownProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const selected = options.find((o) => o.val === value);

  const calcPos = useCallback(() => {
    if (!btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    setPos({ top: r.bottom + 6, left: r.left, width: Math.max(r.width, 180) });
  }, []);

  const handleOpen = () => {
    calcPos();
    setOpen((v) => !v);
  };

  useEffect(() => {
    if (!open) return;
    const onScroll = () => { calcPos(); };
    const onResize = () => { calcPos(); };
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
  }, [open, calcPos]);

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={handleOpen}
        className="flex items-center gap-1.5 text-sm font-semibold transition-colors whitespace-nowrap"
        style={{ color: value ? "#1B3A6B" : "#1B3A6B80" }}
      >
        <span>{value ? selected?.label : label}</span>
        <ChevronDown
          className="w-3.5 h-3.5 transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {open && createPortal(
        <>
          <div className="fixed inset-0 z-[9998]" onClick={() => setOpen(false)} />
          <AnimatePresence>
            <motion.div
              className="fixed z-[9999] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
              style={{ top: pos.top, left: pos.left, minWidth: pos.width }}
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.15 }}
            >
              {options.map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => { onChange(opt.val); setOpen(false); }}
                  className="w-full text-start px-4 py-2.5 text-sm hover:bg-qirat-cream transition-colors flex items-center justify-between gap-3"
                  style={{
                    color: opt.val === value ? "#1B3A6B" : "#1B3A6B99",
                    fontWeight: opt.val === value ? "700" : "500",
                  }}
                >
                  <span>{opt.label}</span>
                  {opt.val === value && <Check className="w-3.5 h-3.5 text-qirat-gold flex-shrink-0" />}
                </button>
              ))}
            </motion.div>
          </AnimatePresence>
        </>,
        document.body
      )}
    </div>
  );
}

export default function HomeSearch() {
  const { t, lang, dir } = useLang();
  const [, navigate] = useLocation();
  const [tab, setTab] = useState<Tab>("compounds");
  const [search, setSearch] = useState("");
  const [unitType, setUnitType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search.trim()) params.set("q", search.trim());
    if (tab === "units") {
      if (unitType) params.set("unitType", unitType);
      if (bedrooms) params.set("bedrooms", bedrooms);
    }
    if (priceRange.min) params.set("minPrice", priceRange.min);
    if (priceRange.max) params.set("maxPrice", priceRange.max);
    const qs = params.toString();
    navigate(`/properties${qs ? `?${qs}` : ""}`);
  };

  const selectedPrice = PRICE_RANGES.find(
    (p) => p.min === priceRange.min && p.max === priceRange.max
  );

  return (
    <motion.div
      dir={dir}
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.7 }}
    >
      <div
        className="rounded-3xl shadow-2xl"
        style={{
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(201,168,76,0.2)",
        }}
      >
        {/* Tabs */}
        <div className="flex border-b" style={{ borderColor: "rgba(201,168,76,0.15)", background: "rgba(27,58,107,0.03)" }}>
          {([
            { key: "compounds", ar: "كمبوندات", en: "Compounds" },
            { key: "units", ar: "وحدات", en: "Units" },
          ] as const).map((t_) => (
            <button
              key={t_.key}
              onClick={() => setTab(t_.key)}
              className="flex-1 py-3.5 text-sm font-bold transition-all relative"
              style={{
                color: tab === t_.key ? "#1B3A6B" : "#1B3A6B80",
                background: tab === t_.key ? "white" : "transparent",
              }}
            >
              {t(t_.ar, t_.en)}
              {tab === t_.key && (
                <motion.div
                  layoutId="home-tab"
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: "#C9A84C" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className="p-4 pb-0">
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
                placeholder={t("البحث بالكمبوند، الموقع، المطور العقاري", "Search by compound, location, developer")}
                className="w-full py-3.5 rounded-2xl border border-gray-200 text-qirat-navy text-sm focus:outline-none focus:border-qirat-gold/60 focus:ring-2 focus:ring-qirat-gold/10 transition-all"
                style={{
                  [lang === "ar" ? "paddingRight" : "paddingLeft"]: "42px",
                  [lang === "ar" ? "paddingLeft" : "paddingRight"]: "16px",
                }}
              />
            </div>
            <motion.button
              onClick={handleSearch}
              className="btn-gold px-7 py-3 rounded-2xl font-bold text-sm flex-shrink-0"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {t("ابحث", "Search")}
            </motion.button>
          </div>
        </div>

        {/* Filters row */}
        <div
          className="px-5 py-3.5 flex items-center gap-5 flex-wrap"
          style={{ borderTop: "1px solid rgba(201,168,76,0.12)", marginTop: "12px" }}
        >
          {/* Price range */}
          <PortalDropdown
            label={t("أي سعر", "Any Price")}
            value={`${priceRange.min}-${priceRange.max}`}
            options={PRICE_RANGES.map((p) => ({ label: t(p.ar, p.en), val: `${p.min}-${p.max}` }))}
            onChange={(val) => {
              const idx = val.indexOf("-");
              const min = val.slice(0, idx);
              const max = val.slice(idx + 1);
              setPriceRange({ min, max });
            }}
          />

          {tab === "units" && (
            <>
              <div className="w-px h-4 bg-gray-200 flex-shrink-0" />

              {/* Unit type */}
              <PortalDropdown
                label={t("نوع الوحدة", "Unit Type")}
                value={unitType}
                options={[
                  { label: t("كل الأنواع", "All Types"), val: "" },
                  ...UNIT_TYPES.map((u) => ({ label: t(u.ar, u.en), val: u.key })),
                ]}
                onChange={setUnitType}
              />

              <div className="w-px h-4 bg-gray-200 flex-shrink-0" />

              {/* Bedrooms — pill buttons */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-sm font-semibold text-qirat-navy/50 me-1">
                  {t("غرف نوم", "Beds")}
                </span>
                {BEDROOM_OPTIONS.map((b) => (
                  <button
                    key={b.val}
                    type="button"
                    onClick={() => setBedrooms(b.val)}
                    className="w-8 h-8 rounded-full text-xs font-bold transition-all"
                    style={{
                      background: bedrooms === b.val ? "#1B3A6B" : "rgba(27,58,107,0.08)",
                      color: bedrooms === b.val ? "white" : "#1B3A6B",
                      border: bedrooms === b.val ? "none" : "1px solid rgba(27,58,107,0.15)",
                    }}
                  >
                    {t(b.ar, b.en)}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Active indicator */}
          {(priceRange.min || priceRange.max || unitType || bedrooms) && (
            <button
              type="button"
              onClick={() => { setPriceRange({ min: "", max: "" }); setUnitType(""); setBedrooms(""); }}
              className="text-xs text-qirat-gold/80 hover:text-qirat-gold font-semibold transition-colors ms-auto"
            >
              {t("مسح الكل", "Clear")}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
