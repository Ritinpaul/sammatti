"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronRight, Zap, X } from "lucide-react";
import type { Nudge } from "@/lib/store";

interface Props { nudge: Nudge; compact?: boolean; }

const TYPE_STYLES: Record<string, { bg: string; border: string; label: string; emoji: string }> = {
  loss_framing:   { bg: "bg-red-50",    border: "border-red-100",    label: "Loss Framing",   emoji: "⚠️" },
  social_proof:   { bg: "bg-brand-orange/10",   border: "border-brand-orange/20",   label: "Social Proof",   emoji: "👥" },
  default_bias:   { bg: "bg-brand-primary/10", border: "border-brand-primary/20", label: "Smart Default",  emoji: "✨" },
  progress_viz:   { bg: "bg-orange-50", border: "border-orange-100", label: "Progress",       emoji: "📊" },
  regret_aversion:{ bg: "bg-amber-50",  border: "border-amber-100",  label: "Future You",     emoji: "🔮" },
};

export default function NudgeCard({ nudge, compact = false }: Props) {
  const [actioned, setActioned] = useState(nudge.action_taken);
  const [dismissed, setDismissed] = useState(false);
  const style = TYPE_STYLES[nudge.type] ?? TYPE_STYLES.progress_viz;

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: 50, scale: 0.95 }}
        className={`relative rounded-2xl p-5 border ${style.bg} ${style.border} ${actioned ? "opacity-60" : ""}`}
      >
        {/* Dismiss */}
        {!actioned && (
          <button
            onClick={() => setDismissed(true)}
            className="absolute top-3 right-3 text-brand-gray-400 hover:text-brand-gray-800 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        <div className="flex items-start gap-3">
          <span className="text-xl flex-shrink-0 mt-0.5">{style.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="nudge-chip text-brand-gray-500 bg-white border border-brand-gray-200 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">{style.label}</span>
              {actioned && <span className="text-xs text-green-600 font-semibold flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Done</span>}
            </div>
            <p className="text-sm font-semibold text-brand-dark mb-1">{nudge.title}</p>
            {!compact && (
              <p className="text-xs text-brand-gray-500 leading-relaxed">{nudge.content}</p>
            )}
            {compact && (
              <p className="text-xs text-brand-gray-500 line-clamp-1">{nudge.content}</p>
            )}
          </div>
        </div>

        {!actioned && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActioned(true)}
            className="mt-3 w-full flex items-center justify-center gap-2 bg-white hover:bg-brand-gray-50 border border-brand-gray-200 text-brand-primary text-sm font-semibold py-2 rounded-xl transition-all shadow-sm"
          >
            <Zap className="w-4 h-4" /> Take Action <ChevronRight className="w-3.5 h-3.5" />
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
