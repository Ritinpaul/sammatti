"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, MicOff, Info, User, Bot, AlertTriangle } from "lucide-react";
import { useStore } from "@/lib/store";
import { generateSessionId, timeAgo } from "@/lib/utils";
import { chatApi } from "@/lib/api";

// ——— Typing Indicator ———
function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="w-8 h-8 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4 text-brand-primary" />
      </div>
      <div className="card shadow-sm rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5 border border-brand-gray-100">
        <div className="typing-dot bg-brand-primary" />
        <div className="typing-dot bg-brand-primary" />
        <div className="typing-dot bg-brand-primary" />
      </div>
    </div>
  );
}

// ——— Decision Trail ———
function DecisionTrail({ trail }: { trail: any }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2">
      <button
        onClick={() => setOpen(!open)}
        className="text-xs text-brand-primary/70 hover:text-brand-primary flex items-center gap-1 transition-colors font-medium"
      >
        <Info className="w-3 h-3" /> Why this? (Confidence: {Math.round(trail.confidence_score * 100)}%)
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 bg-brand-primary/5 border border-brand-primary/10 rounded-xl p-3 space-y-2 overflow-hidden"
          >
            <p className="text-xs font-semibold text-brand-primary">Data Sources</p>
            {trail.data_sources?.map((s: string, i: number) => (
              <p key={i} className="text-xs text-brand-gray-500 font-medium">· {s}</p>
            ))}
            <p className="text-xs font-semibold text-brand-primary mt-2">Reasoning</p>
            {trail.reasoning_chain?.map((r: string, i: number) => (
              <p key={i} className="text-xs text-brand-gray-500 font-medium">→ {r}</p>
            ))}
            {trail.human_review_required && (
              <p className="text-xs text-red-500 font-semibold flex items-center gap-1 mt-2">
                <AlertTriangle className="w-3 h-3" /> Recommend human RM review for this decision
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ——— Mock responses (used if backend unavailable) ———
const MOCK_RESPONSES: Record<string, any> = {
  default: {
    content: "Namaste Rahul! I can see your Dream Home goal is 24% funded. At your current savings rate, you'll reach it in 6 years — but I have a way to cut that to 4.5 years. Want to explore? 🏠",
    emotion: "happy",
    decision_trail: {
      confidence_score: 0.85,
      data_sources: ["Your transactions (last 90 days)", "Market data: Nifty 50 at 24,200", "SEBI suitability guidelines"],
      reasoning_chain: ["Detected 40% above-pattern food delivery spend", "Dream Home goal is below expected pace", "Salary credit of ₹80,000 detected today"],
      alternatives: ["Continue current pace (achieve in 6 years)", "Reduce discretionary spend by 15% (achieve in 5 years)"],
      human_review_required: false,
    },
  },
};

function getMockResponse(msg: string) {
  const lower = msg.toLowerCase();
  if (lower.includes("house") || lower.includes("home"))
    return {
      content: "Great goal! A ₹50L house in Bangalore by 2029 — with 6% inflation, you'll actually need ₹63L. Your current savings rate covers ₹39L. I recommend a ₹5,000/month top-up to an ELSS fund. Monthly cost: ₹5,000. Benefit: 8 months faster! Shall I set this up? 🏠",
      emotion: "thinking",
      decision_trail: { confidence_score: 0.82, data_sources: ["Your income: ₹80K/month", "Inflation assumption: 6%", "IDBI ELSS product catalog"], reasoning_chain: ["Target ₹50L → inflation adjusted ₹63L over 5 years", "Current contribution: ₹3,000/month", "Gap: ₹2,000/month more needed"], alternatives: ["IDBI Tax Saver FD (lower returns but capital-safe)", "NPS Tier-2 (tax benefit + equity exposure)"], human_review_required: false },
    };
  if (lower.includes("market") || lower.includes("crash") || lower.includes("worried"))
    return {
      content: "I hear you, Rahul. Market volatility is stressful. But here's what the data shows: your Dream Home goal is 5 years away. In every 5-year window since 1990, staying invested beat panic selling 94% of the time. Your SIP is actually up 4.2% since last month's dip. Breathe — and stay the course. 🧘",
      emotion: "concerned",
      decision_trail: { confidence_score: 0.91, data_sources: ["Historical Nifty 50 data (1990–2024)", "Your goal timeline: 5 years", "Behavioral profile: high loss aversion"], reasoning_chain: ["User expressed market anxiety", "5-year goal → short-term volatility is noise", "Historical data: 94% positive 5Y returns"], alternatives: [], human_review_required: false },
    };
  if (lower.includes("swiggy") || lower.includes("food") || lower.includes("spend"))
    return {
      content: "I noticed you spent ₹12,400 on food delivery this month — 40% above your usual ₹8,800. Those 2 extra Swiggy orders per week cost ₹3,600/month. Redirected to your Dream Home goal, that's ₹43,200/year — shortening your journey by 5 months! Want me to set a weekly food budget nudge? 🍕",
      emotion: "happy",
      decision_trail: { confidence_score: 0.88, data_sources: ["Your food delivery transactions (30 days)", "Peer benchmark: similar income bracket in Bangalore"], reasoning_chain: ["₹12,400 spend vs ₹8,800 baseline = ₹3,600 excess", "Redirected to ELSS at 12% CAGR over 5 years = ₹4.8L extra"], alternatives: ["Set daily limit: ₹200 (saves ₹2,000/month)", "Cooking 3 days/week (saves ₹4,800/month)"], human_review_required: false },
    };
  return MOCK_RESPONSES.default;
}

export default function AvatarPage() {
  const { messages, addMessage, isAvatarTyping, setAvatarTyping, setAvatarEmotion, user } = useStore();
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [sessionId] = useState(generateSessionId);
  const bottomRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isAvatarTyping]);

  // Web Speech API
  useEffect(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = "hi-IN";
    rec.onresult = (e: any) => { setInput(e.results[0][0].transcript); setIsListening(false); };
    rec.onend = () => setIsListening(false);
    recognitionRef.current = rec;
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) { recognitionRef.current.stop(); setIsListening(false); }
    else { recognitionRef.current.start(); setIsListening(true); }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now().toString(), role: "user" as const, content: input, timestamp: new Date().toISOString() };
    addMessage(userMsg);
    setInput("");
    setAvatarTyping(true);
    setAvatarEmotion("thinking");

    await new Promise((r) => setTimeout(r, 1400 + Math.random() * 600));

    let responseData = getMockResponse(input);
    try {
      const userId = user?.id ?? "rahul-001";
      const data = await chatApi.sendMessage(userId, sessionId, input, "en");
      if (data.content) responseData = data;
    } catch {}

    setAvatarTyping(false);
    setAvatarEmotion(responseData.emotion as any ?? "happy");
    addMessage({
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: responseData.content,
      timestamp: new Date().toISOString(),
      decision_trail: responseData.decision_trail,
    });
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const QUICK_PROMPTS = [
    "I want to buy a house 🏠",
    "Market is crashing! 😰",
    "Where is my money going? 💸",
    "Review my portfolio 📊",
  ];

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col bg-brand-gray-50 rounded-[2rem] overflow-hidden m-2 border border-brand-gray-100 shadow-2xl">
      {/* Avatar Header */}
      <div className="flex items-center gap-4 px-8 py-5 border-b border-brand-gray-100 bg-white/50 backdrop-blur-md flex-shrink-0 z-10">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center text-xl animate-float shadow-button">
            🧙
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-brand-green rounded-full border-2 border-white" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-brand-dark text-lg">Sammatti</h1>
          <p className="text-xs text-brand-green font-bold uppercase tracking-wider">Online · IDBI Bank AI Advisor</p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="nudge-chip text-brand-gray-500 bg-white border border-brand-gray-200 px-3 py-1 rounded text-[10px] uppercase font-bold tracking-wider">Wise Elder</span>
          <span className="text-xs font-semibold text-brand-gray-400">SEBI-compliant · Explainable AI</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 relative">
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full text-center gap-8"
          >
            <div className="text-7xl animate-float drop-shadow-2xl">🧙</div>
            <div>
              <h2 className="font-heading font-bold text-3xl text-brand-dark mb-3">Namaste! I&apos;m Sammatti</h2>
              <p className="text-brand-gray-500 max-w-md text-base leading-relaxed font-medium">Your AI wealth co-pilot from IDBI Bank. I remember our past conversations, know your goals, and can sense when you&apos;re stressed about money.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
              {QUICK_PROMPTS.map((p) => (
                <motion.button
                  key={p}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setInput(p); }}
                  className="bg-white border border-brand-gray-100 shadow-sm hover:border-brand-primary hover:shadow-card text-brand-dark text-sm px-5 py-4 rounded-xl text-left transition-all font-semibold"
                >
                  {p}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-end gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-lg shadow-sm ${msg.role === "user" ? "bg-brand-primary" : "bg-white border border-brand-gray-100"}`}>
                {msg.role === "user" ? <User className="w-5 h-5 text-white" /> : "🧙"}
              </div>
              <div className={`max-w-[75%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
                <div className={`px-5 py-4 rounded-2xl text-[15px] font-medium leading-relaxed shadow-sm ${msg.role === "user" ? "bg-brand-primary text-white rounded-br-sm" : "bg-white border border-brand-gray-100 text-brand-dark rounded-bl-sm"}`}>
                  {msg.content}
                </div>
                {msg.decision_trail && <DecisionTrail trail={msg.decision_trail} />}
                <p className="text-xs text-brand-gray-400 mt-1.5 px-1 font-semibold">{timeAgo(msg.timestamp)}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isAvatarTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <TypingIndicator />
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Bar */}
      <div className="px-8 py-5 border-t border-brand-gray-100 bg-white/50 backdrop-blur-md flex-shrink-0 z-10">
        <div className="flex items-end gap-3 max-w-5xl mx-auto">
          <div className="flex-1 bg-white border border-brand-gray-200 shadow-sm rounded-2xl px-5 py-3.5 focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/20 transition-all">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask me anything about your finances… (Hindi or English)"
              className="w-full bg-transparent text-brand-dark text-base font-medium placeholder-brand-gray-400 outline-none resize-none max-h-32"
              rows={1}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleListening}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all flex-shrink-0 shadow-sm font-semibold ${isListening ? "bg-red-50 border border-red-200 text-red-500 animate-pulse" : "bg-white border border-brand-gray-200 text-brand-gray-500 hover:text-brand-primary hover:border-brand-primary"}`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={sendMessage}
            disabled={!input.trim()}
            className="w-12 h-12 rounded-xl bg-brand-primary text-white flex items-center justify-center flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-button"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
        <p className="text-xs text-brand-gray-400 font-semibold text-center mt-3">
          Sammatti provides AI-generated guidance. Not SEBI-registered financial advice. Investments subject to market risks.
        </p>
      </div>
    </div>
  );
}
