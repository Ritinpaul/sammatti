"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Filter, Target } from "lucide-react";
import Link from "next/link";
import GoalCard from "@/components/goals/GoalCard";

const MOCK_GOALS = [
  { id: "g1", title: "Dream Home 🏠", category: "home", target_amount: 5000000, current_amount: 1200000, deadline: "2029-12-31", monthly_required: 45000, progress_pct: 24, status: "saving" },
  { id: "g2", title: "Emergency Fund 🛡️", category: "emergency", target_amount: 480000, current_amount: 320000, deadline: "2025-09-30", monthly_required: 8000, progress_pct: 67, status: "saving" },
  { id: "g3", title: "Goa Trip ✈️", category: "vacation", target_amount: 80000, current_amount: 12000, deadline: "2025-12-01", monthly_required: 5000, progress_pct: 15, status: "planning" },
  { id: "g4", title: "Child Education 📚", category: "education", target_amount: 3000000, current_amount: 250000, deadline: "2035-06-01", monthly_required: 18000, progress_pct: 8, status: "investing" },
];

const CATEGORIES = ["All", "Home", "Emergency", "Education", "Vacation", "Retirement"];

export default function GoalsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? MOCK_GOALS
    : MOCK_GOALS.filter((g) => g.category === activeFilter.toLowerCase());

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-3xl text-brand-dark">Your Goals</h1>
          <p className="text-brand-gray-500 mt-1">{MOCK_GOALS.length} goals · 2 on track · 2 need attention</p>
        </div>
        <Link href="/goals/create">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all shadow-button"
          >
            <Plus className="w-4 h-4" /> New Goal
          </motion.button>
        </Link>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-3 flex-wrap">
        <Filter className="w-4 h-4 text-brand-gray-400" />
        {CATEGORIES.map((cat) => (
          <motion.button
            key={cat}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-sm ${
              activeFilter === cat
                ? "bg-brand-primary border border-brand-primary text-white"
                : "bg-white border border-brand-gray-200 text-brand-gray-500 hover:text-brand-dark hover:border-brand-gray-400"
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Goals Grid */}
      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((g, i) => (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <GoalCard goal={g as any} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 gap-4 text-center bg-white rounded-2xl border border-brand-gray-100 shadow-sm"
          >
            <Target className="w-12 h-12 text-brand-gray-200" />
            <p className="text-brand-gray-500 font-medium">No goals in this category yet.</p>
            <Link href="/goals/create">
              <button className="text-brand-primary hover:text-brand-primary/80 text-sm font-bold">
                + Create one
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
