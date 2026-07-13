"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter } from "lucide-react";
import NudgeCard from "@/components/nudges/NudgeCard";

const ALL_NUDGES = [
  { id: "n1", type: "loss_framing",    title: "Salary day! 💰",         content: "You received ₹80,000 today. Allocate ₹5,000 to your Dream Home goal now and save 6 months of delay.", trigger_event: "salary_day",       action_taken: false, goal_id: "g1" },
  { id: "n2", type: "social_proof",    title: "You're falling behind 📊", content: "83% of people like you in Bangalore are saving more for their home. Your current pace puts you 14 months late.", trigger_event: "goal_at_risk",   action_taken: false, goal_id: "g1" },
  { id: "n3", type: "progress_viz",    title: "Weekend spending alert 🚨", content: "You spent ₹4,200 on food delivery this weekend — 40% above your usual. That's ₹1,200 your Dream Home missed.", trigger_event: "weekend_spike",  action_taken: true,  goal_id: "g1" },
  { id: "n4", type: "default_bias",    title: "One-click SIP upgrade ✨",  content: "Auto-increase your SIP by ₹500/month every quarter? This is a default on for 92% of goal-oriented savers.", trigger_event: "quarterly_review", action_taken: false, goal_id: "g1" },
  { id: "n5", type: "regret_aversion", title: "Future you is watching 🔮",  content: "At your current savings rate, 65-year-old Rahul will have ₹12L less than he needs. 35-year-old Rahul can fix this with ₹3,000/month.", trigger_event: "monthly_review",  action_taken: false, goal_id: "g4" },
];

const FILTERS = ["All", "Pending", "Completed", "Goal-Linked"];

export default function NudgesPage() {
  const [filter, setFilter] = useState("All");
  const [nudges, setNudges] = useState(ALL_NUDGES);

  const filtered = nudges.filter((n) => {
    if (filter === "Pending")    return !n.action_taken;
    if (filter === "Completed")  return n.action_taken;
    if (filter === "Goal-Linked") return !!n.goal_id;
    return true;
  });

  const pendingCount = nudges.filter((n) => !n.action_taken).length;
  const completedCount = nudges.filter((n) => n.action_taken).length;

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-10">
      <div className="mb-8">
        <h1 className="font-heading font-bold text-3xl text-brand-dark">Smart Nudges</h1>
        <p className="text-brand-gray-500 mt-1">
          {pendingCount} pending · {completedCount} completed · NudgeOS powered by behavioral AI
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {[
          { label: "Pending Actions", value: pendingCount, color: "text-brand-primary" },
          { label: "Completed", value: completedCount, color: "text-brand-green" },
          { label: "Avg Effectiveness", value: "87%", color: "text-brand-orange" },
        ].map((s) => (
          <div key={s.label} className="card p-6 text-center">
            <p className={`font-heading font-bold text-3xl ${s.color}`}>{s.value}</p>
            <p className="text-sm font-medium text-brand-gray-500 mt-2">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3 mb-8">
        <Filter className="w-4 h-4 text-brand-gray-400" />
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-sm ${
              filter === f
                ? "bg-brand-primary border border-brand-primary text-white"
                : "bg-white border border-brand-gray-200 text-brand-gray-500 hover:text-brand-dark hover:border-brand-gray-400"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Nudge List */}
      <AnimatePresence mode="popLayout">
        <div className="space-y-4">
          {filtered.map((nudge, i) => (
            <motion.div
              key={nudge.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <NudgeCard nudge={nudge as any} />
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 text-brand-gray-400 bg-white rounded-2xl border border-brand-gray-100 shadow-sm"
            >
              No nudges in this filter.
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
}
