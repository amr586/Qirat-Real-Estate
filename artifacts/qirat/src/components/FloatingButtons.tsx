import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, ChevronDown } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";

const WHATSAPP_NUMBER = "201281378331";

interface Message {
  id: number;
  from: "user" | "bot";
  text: string;
}

const quickReplies = [
  {
    ar: "احنا اي؟ 🏢",
    en: "Who are we? 🏢",
    answerAr:
      "قيراط للعقارات هي شركة متخصصة في سوق العقارات المصري 🏆\nنحن وسيطك الموثوق لشراء وبيع وتأجير وإدارة العقارات في القاهرة والمدن الكبرى.\nنعمل بشفافية تامة واحترافية عالية لضمان أفضل صفقة لك.",
    answerEn:
      "Qirat Real Estate is a specialized company in the Egyptian real estate market 🏆\nWe are your trusted partner for buying, selling, renting, and managing properties in Cairo and major cities.\nWe work with full transparency and high professionalism to ensure the best deal for you.",
  },
  {
    ar: "خدماتنا ايه؟ 🛎️",
    en: "What are our services? 🛎️",
    answerAr:
      "خدماتنا تشمل:\n🔹 بيع وشراء العقارات السكنية والتجارية\n🔹 إيجار الشقق والفلل والوحدات التجارية\n🔹 شراكات استثمارية عقارية بعائد مرتفع\n🔹 تقييم عقاري احترافي ودقيق\n🔹 استشارات قانونية وتوثيق العقود\n🔹 إدارة الأملاك والمتابعة الكاملة",
    answerEn:
      "Our services include:\n🔹 Buying & selling residential and commercial properties\n🔹 Renting apartments, villas, and commercial units\n🔹 Real estate investment partnerships with high returns\n🔹 Professional and accurate property valuation\n🔹 Legal consultation and contract documentation\n🔹 Property management and full follow-up",
  },
  {
    ar: "مكانكم فين؟ 📍",
    en: "Where are you located? 📍",
    answerAr:
      "مكتبنا في قلب القاهرة 📍\nنغطي أبرز المناطق:\n🏙️ الزمالك • المهندسين • مدينة نصر\n🏙️ التجمع الخامس • مصر الجديدة • الشيخ زايد\n🏙️ القاهرة الجديدة • 6 أكتوبر\n\nللتواصل: 01281378331",
    answerEn:
      "Our office is in the heart of Cairo 📍\nWe cover the top areas:\n🏙️ Zamalek • Mohandessin • Nasr City\n🏙️ 5th Settlement • Heliopolis • Sheikh Zayed\n🏙️ New Cairo • 6th of October\n\nContact us: 01281378331",
  },
  {
    ar: "بتساعدوا في اي؟ 🤝",
    en: "How can you help me? 🤝",
    answerAr:
      "قيراط بتساعدك في كل خطوة من رحلتك العقارية 🤝\n✅ لو بتدور على شقة أو فيلا بميزانيتك\n✅ لو عندك عقار وعايز تبيعه أو تأجره بأفضل سعر\n✅ لو بتفكر في الاستثمار العقاري\n✅ لو محتاج تقييم عقاري موثوق\n✅ لو عايز شراكة في مشروع ناجح\n\nاتكلم معانا وهنوفرلك الحل المناسب! 😊",
    answerEn:
      "Qirat helps you at every step of your real estate journey 🤝\n✅ Looking for an apartment or villa within your budget\n✅ Want to sell or rent your property at the best price\n✅ Thinking about real estate investment\n✅ Need a reliable property valuation\n✅ Want a partnership in a successful project\n\nTalk to us and we'll find the right solution! 😊",
  },
  {
    ar: "تواصل مع موظف 👨‍💼",
    en: "Talk to an agent 👨‍💼",
    answerAr:
      "سيتم تحويلك الآن إلى واتساب للتحدث مع أحد مستشارينا العقاريين 📱\nنحن متاحون من السبت إلى الخميس، 9 صباحاً حتى 9 مساءً.",
    answerEn:
      "You'll be redirected to WhatsApp to speak with one of our real estate consultants 📱\nWe're available Saturday to Thursday, 9am to 9pm.",
    action: "whatsapp",
  },
];

export default function FloatingButtons() {
  const { t, lang, dir } = useLang();
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  let msgId = useRef(100);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typing]);

  const openChat = () => {
    setChatOpen(true);
    if (!started) {
      setStarted(true);
      setTimeout(() => {
        addBotMsg(
          lang === "ar"
            ? "مرحباً بك في قيراط للعقارات! 👋\nأنا مساعدك الذكي، كيف يمكنني مساعدتك اليوم؟"
            : "Welcome to Qirat Real Estate! 👋\nI'm your smart assistant, how can I help you today?"
        );
      }, 400);
    }
  };

  const addBotMsg = (text: string) => {
    setMessages((prev) => [...prev, { id: msgId.current++, from: "bot", text }]);
  };

  const addUserMsg = (text: string) => {
    setMessages((prev) => [...prev, { id: msgId.current++, from: "user", text }]);
  };

  const handleQuickReply = (qr: typeof quickReplies[0]) => {
    addUserMsg(lang === "ar" ? qr.ar : qr.en);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      addBotMsg(lang === "ar" ? qr.answerAr : qr.answerEn);
      if (qr.action === "whatsapp") {
        setTimeout(() => {
          window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank");
        }, 1200);
      }
    }, 900);
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    addUserMsg(trimmed);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      addBotMsg(
        lang === "ar"
          ? "شكراً على رسالتك! 😊 للمساعدة الفورية يمكنك اختيار أحد الأسئلة أدناه أو التواصل معنا مباشرة على واتساب."
          : "Thanks for your message! 😊 For immediate help, choose one of the questions below or contact us directly on WhatsApp."
      );
    }, 900);
  };

  return (
    <div
      dir={dir}
      className="fixed bottom-6 z-50 flex flex-col items-end gap-3"
      style={{ [lang === "ar" ? "left" : "right"]: "1.5rem" }}
    >
      {/* ── AI Chat Widget ── */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            className="w-[340px] sm:w-[370px] rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            style={{
              background: "linear-gradient(160deg,#0F2347 0%,#1B3A6B 100%)",
              border: "1px solid rgba(201,168,76,0.3)",
              maxHeight: "520px",
            }}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ background: "linear-gradient(135deg,rgba(201,168,76,.25),rgba(201,168,76,.10))", borderBottom: "1px solid rgba(201,168,76,.2)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-qirat-gold/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-qirat-gold" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{t("مساعد قيراط", "Qirat Assistant")}</p>
                  <p className="text-qirat-gold text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    {t("متاح الآن", "Available now")}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-white/50 hover:text-white transition-colors"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ maxHeight: "300px" }}>
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    className={`flex ${msg.from === "user" ? (lang === "ar" ? "justify-start" : "justify-end") : (lang === "ar" ? "justify-end" : "justify-start")}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div
                      className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-line leading-relaxed ${
                        msg.from === "bot"
                          ? "bg-white/10 text-white/90 rounded-tl-sm"
                          : "text-qirat-navy font-semibold rounded-tr-sm"
                      }`}
                      style={msg.from === "user" ? { background: "linear-gradient(135deg,#C9A84C,#E8C96A)" } : {}}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {typing && (
                  <motion.div
                    className={`flex ${lang === "ar" ? "justify-end" : "justify-start"}`}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  >
                    <div className="bg-white/10 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-qirat-gold/70"
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            <div className="px-4 pb-2 flex flex-col gap-1.5">
              <p className="text-white/30 text-xs mb-1">{t("أسئلة شائعة", "Quick Questions")}</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((qr, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickReply(qr)}
                    disabled={typing}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all disabled:opacity-50"
                    style={{
                      background: "rgba(201,168,76,.15)",
                      border: "1px solid rgba(201,168,76,.35)",
                      color: "#E8C96A",
                    }}
                  >
                    {lang === "ar" ? qr.ar : qr.en}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div
              className="flex items-center gap-2 px-4 py-3 mt-1"
              style={{ borderTop: "1px solid rgba(255,255,255,.08)" }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={t("اكتب سؤالك...", "Type your question...")}
                className="flex-1 bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/35 focus:outline-none focus:border-qirat-gold/50 transition-colors"
              />
              <motion.button
                onClick={handleSend}
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#C9A84C,#A8872E)" }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
              >
                <Send className="w-4 h-4 text-qirat-navy" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Button Row ── */}
      <div className="flex items-center gap-3">
        {/* WhatsApp */}
        <motion.a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
          style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.93 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
          title={t("تواصل عبر واتساب", "Contact via WhatsApp")}
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </motion.a>

        {/* AI Chat */}
        <motion.button
          onClick={chatOpen ? () => setChatOpen(false) : openChat}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
          style={{ background: "linear-gradient(135deg,#1B3A6B,#0F2347)", border: "2px solid rgba(201,168,76,.6)" }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.93 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, type: "spring", stiffness: 260, damping: 20 }}
          title={t("تحدث مع المساعد الذكي", "Talk to AI Assistant")}
        >
          <AnimatePresence mode="wait">
            {chatOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X className="w-6 h-6 text-qirat-gold" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <MessageCircle className="w-6 h-6 text-qirat-gold" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
