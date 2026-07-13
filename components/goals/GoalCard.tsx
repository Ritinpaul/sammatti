"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Target, ChevronRight, Flame } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { Goal } from "@/lib/store";

interface Props { goal: Goal; }

const CATEGORY_EMOJI: Record<string, string> = {
  home: "🏠", emergency: "🛡️", education: "📚", retirement: "🌅",
  vacation: "✈️", wedding: "💍", startup: "🚀", car: "🚗",
};

const STATUS_COLOR: Record<string, string> = {
  dreaming: "text-brand-orange", planning: "text-brand-primary",
  saving: "text-brand-primary", investing: "text-brand-green",
  protecting: "text-orange-500", achieving: "text-emerald-500",
};

export default function GoalCard({ goal }: Props) {
  const emoji = CATEGORY_EMOJI[goal.category] ?? "🎯";
  const pct = goal.progress_pct ?? Math.round((goal.current_amount / goal.target_amount) * 100);
  const isAtRisk = pct < 30 && new Date(goal.deadline) < new Date(Date.now() + 180 * 86400000);
  const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - Date.now()) / 86400000);

  return (
    <Link href={`/goals/${goal.id}`}>
      <motion.div
        whileHover={{ y: -3, borderColor: "rgba(82,68,227,0.3)" }}
        className="card cursor-pointer transition-all duration-200 group"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{emoji}</span>
            <div>
              <h3 className="font-heading font-semibold text-brand-dark text-base group-hover:text-brand-primary transition-colors">
                {goal.title}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`text-xs font-semibold capitalize ${STATUS_COLOR[goal.status] ?? "text-brand-gray-500"}`}>
                  {goal.status}
                </span>
                <span className="text-brand-gray-300">·</span>
                <span className="text-xs text-brand-gray-500">{daysLeft}d left</span>
                {isAtRisk && (
                  <>
                    <span className="text-brand-gray-300">·</span>
                    <span className="flex items-center gap-1 text-xs text-red-500 font-semibold">
                      <Flame className="w-3 h-3" /> At risk
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-brand-gray-300 group-hover:text-brand-primary transition-colors mt-1" />
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-brand-gray-500">{formatCurrency(goal.current_amount, true)} saved</span>
            <span className="text-xs font-bold text-brand-primary">{pct}%</span>
          </div>
          <div className="h-1.5 bg-brand-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              className="h-full bg-brand-primary"
            />
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xs text-brand-gray-400">Target: {formatCurrency(goal.target_amount, true)}</span>
            <span className="text-xs text-brand-gray-400">₹{formatCurrency(goal.monthly_required, true)}/mo required</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
