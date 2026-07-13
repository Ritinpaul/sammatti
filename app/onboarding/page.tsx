"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Mic, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const DNA_QUESTIONS = [
  {
    id: "loss_aversion",
    question: "You invested ₹1,00,000. It drops to ₹60,000. What do you do?",
    emoji: "📉",
    options: [
      { text: "Sell everything immediately. I can't take this loss.",                 score: 0.9 },
      { text: "Sell half to cut losses, hold the rest.",                              score: 0.6 },
      { text: "Hold. Markets recover. This is temporary.",                            score: 0.3 },
      { text: "Buy more! This is a discount opportunity.",                            score: 0.1 },
    ],
  },
  {
    id: "present_bias",
    question: "A genie offers you ₹10,000 today OR ₹15,000 in 6 months. You choose?",
    emoji: "🧞",
    options: [
      { text: "₹10,000 today — certain money now is better.",                         score: 0.9 },
      { text: "₹10,000 today — I need it for an expense.",                            score: 0.7 },
      { text: "₹15,000 later — that's 50% return in 6 months!",                      score: 0.3 },
      { text: "₹15,000 later — I have no pressing needs.",                            score: 0.1 },
    ],
  },
  {
    id: "herd_mentality",
    question: "Your friend group is all investing in a hot new stock. You:",
    emoji: "🐑",
    options: [
      { text: "Jump in immediately — they must know something I don't.",              score: 0.95 },
      { text: "Invest a small amount to not miss out.",                               score: 0.65 },
      { text: "Research it before deciding. FOMO is real but so is loss.",            score: 0.3 },
      { text: "Ignore it. I stick to my strategy.",                                   score: 0.1 },
    ],
  },
  {
    id: "financial_awareness",
    question: "What is the 50-30-20 rule in personal finance?",
    emoji: "📚",
    options: [
      { text: "No idea.",                                                              score: 0.1 },
      { text: "Something about spending and savings percentages.",                    score: 0.4 },
      { text: "50% needs, 30% wants, 20% savings.",                                  score: 0.85 },
      { text: "50% fixed expenses, 30% investments, 20% emergency fund.",            score: 0.95 },
    ],
  },
  {
    id: "risk_appetite",
    question: "Your ideal investment returns ___",
    emoji: "🎯",
    options: [
      { text: "Guaranteed 5–6%. I want safety above all.",                            score: 0.1 },
      { text: "7–9% with low risk. FDs and bonds.",                                  score: 0.3 },
      { text: "10–14% with moderate risk. Mutual funds.",                            score: 0.6 },
      { text: "15%+ even if volatile. I'm in for the long run.",                     score: 0.9 },
    ],
  },
];

export default function OnboardingPage() {
  const [step, setStep] = useState<"language" | "quiz" | "persona" | "complete">("language");
  const [language, setLanguage] = useState<string>("");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedPersona, setSelectedPersona] = useState<string>("");
  const router = useRouter();

  const selectLanguage = (lang: string) => { setLanguage(lang); setStep("quiz"); };

  const answerQuestion = (score: number) => {
    const q = DNA_QUESTIONS[qIndex];
    const newAnswers = { ...answers, [q.id]: score };
    setAnswers(newAnswers);
    if (qIndex < DNA_QUESTIONS.length - 1) { setQIndex(qIndex + 1); }
    else { setStep("persona"); }
  };

  const PERSONAS = [
    { id: "wise_elder",           emoji: "🧙", name: "Wise Elder",         desc: "Calm, methodical, long-term thinker. Speaks in wisdom, not jargon." },
    { id: "ambitious_peer",       emoji: "🚀", name: "Ambitious Peer",     desc: "High-energy, growth-focused, challenges you to aim higher." },
    { id: "cautious_accountant",  emoji: "🛡️", name: "Cautious Accountant", desc: "Detail-oriented, risk-aware, never lets you forget the downside." },
  ];

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-dark" />
          </div>
          <span className="font-heading font-bold text-white text-xl">Sammatti</span>
        </div>

        {/* Step: Language */}
        {step === "language" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="font-heading font-bold text-2xl text-white text-center mb-2">Welcome to Sammatti</h2>
            <p className="text-white/40 text-center mb-8">Choose your preferred language</p>
            <div className="space-y-3">
              {[
                { code: "en", label: "English", sub: "I prefer English" },
                { code: "hi", label: "हिंदी",   sub: "मैं हिंदी पसंद करता हूँ" },
                { code: "hinglish", label: "Hinglish", sub: "Mix of Hindi + English for me" },
              ].map((l) => (
                <motion.button
                  key={l.code}
                  whileHover={{ scale: 1.02, borderColor: "rgba(244,168,37,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => selectLanguage(l.code)}
                  className="w-full glass border border-white/10 rounded-2xl px-5 py-4 flex items-center justify-between group hover:bg-gold-500/5 transition-all"
                >
                  <div>
                    <p className="font-semibold text-white text-left">{l.label}</p>
                    <p className="text-xs text-white/40">{l.sub}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-gold-400 transition-colors" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step: DNA Quiz */}
        {step === "quiz" && (
          <motion.div key={qIndex} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            {/* Progress */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gold-500 rounded-full"
                  initial={{ width: `${(qIndex / DNA_QUESTIONS.length) * 100}%` }}
                  animate={{ width: `${((qIndex + 1) / DNA_QUESTIONS.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <span className="text-xs text-white/30">{qIndex + 1}/{DNA_QUESTIONS.length}</span>
            </div>

            <div className="glass rounded-2xl p-6 mb-6">
              <span className="text-4xl block mb-4">{DNA_QUESTIONS[qIndex].emoji}</span>
              <h3 className="font-heading font-semibold text-white text-lg leading-snug">
                {DNA_QUESTIONS[qIndex].question}
              </h3>
            </div>

            <div className="space-y-3">
              {DNA_QUESTIONS[qIndex].options.map((opt, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ scale: 1.01, borderColor: "rgba(244,168,37,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => answerQuestion(opt.score)}
                  className="w-full glass border border-white/10 rounded-xl px-4 py-3.5 text-left text-sm text-white/70 hover:text-white hover:bg-gold-500/5 transition-all"
                >
                  {opt.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step: Persona Select */}
        {step === "persona" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="font-heading font-bold text-2xl text-white text-center mb-2">Choose Your Advisor Style</h2>
            <p className="text-white/40 text-center text-sm mb-8">Based on your DNA, all 3 will suit you. Pick what resonates.</p>
            <div className="space-y-3">
              {PERSONAS.map((p) => (
                <motion.button
                  key={p.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedPersona(p.id)}
                  className={`w-full rounded-2xl px-5 py-4 flex items-center gap-4 border transition-all ${
                    selectedPersona === p.id
                      ? "bg-gold-500/15 border-gold-500/40 text-white"
                      : "glass border-white/10 text-white/70 hover:border-gold-500/20"
                  }`}
                >
                  <span className="text-3xl">{p.emoji}</span>
                  <div className="text-left">
                    <p className="font-semibold text-white">{p.name}</p>
                    <p className="text-xs text-white/40 mt-0.5">{p.desc}</p>
                  </div>
                </motion.button>
              ))}
            </div>
            {selectedPersona && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => router.push("/dashboard")}
                className="mt-6 w-full bg-gold-500 hover:bg-gold-400 text-dark font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all glow-gold"
              >
                Meet Sammatti <ArrowRight className="w-5 h-5" />
              </motion.button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
