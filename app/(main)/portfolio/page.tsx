"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { formatCurrency, formatPct } from "@/lib/utils";

const ALLOCATION = [
  { name: "Equity MF", value: 680000, color: "#5244E3", pct: 36.8 },
  { name: "Fixed Deposits", value: 520000, color: "#5d85b8", pct: 28.1 },
  { name: "PPF / NPS", value: 280000, color: "#21B76B", pct: 15.2 },
  { name: "Stocks", value: 220000, color: "#9b59b6", pct: 11.9 },
  { name: "Gold", value: 100000, color: "#e67e22", pct: 5.4 },
  { name: "Liquid Fund", value: 47500, color: "#1abc9c", pct: 2.6 },
];

const PERFORMANCE = [
  { month: "Jan", value: 1520000 },
  { month: "Feb", value: 1580000 },
  { month: "Mar", value: 1490000 },
  { month: "Apr", value: 1610000 },
  { month: "May", value: 1720000 },
  { month: "Jun", value: 1847500 },
];

const PRODUCTS = [
  { name: "Mirae Asset Large Cap", type: "MF", value: 385000, invested: 320000, returns: 20.3, goal: "Dream Home" },
  { name: "IDBI Tax Saver ELSS", type: "MF", value: 295000, invested: 270000, returns: 9.3, goal: "Tax Saving" },
  { name: "IDBI FD 2yr", type: "FD", value: 320000, invested: 300000, returns: 6.8, goal: "Emergency" },
  { name: "SBI FD 1yr", type: "FD", value: 200000, invested: 190000, returns: 5.3, goal: "Goa Trip" },
  { name: "PPF Account", type: "PPF", value: 180000, invested: 160000, returns: 7.1, goal: "Retirement" },
  { name: "Zerodha - HDFC, TCS", type: "STOCK", value: 220000, invested: 185000, returns: 18.9, goal: "General" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-brand-gray-100 shadow-card rounded-xl px-3 py-2 text-xs">
      <p className="text-brand-dark font-semibold">{payload[0].name}</p>
      <p className="text-brand-primary">{formatCurrency(payload[0].value, true)}</p>
    </div>
  );
};

export default function PortfolioPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const total = 1847500;
  const invested = 1600000;
  const returnsAmt = total - invested;
  const returnsPct = ((returnsAmt / invested) * 100);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-3xl text-brand-dark">Portfolio</h1>
          <p className="text-brand-gray-500 mt-1">Unified view across all investments</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-brand-gray-100 rounded-xl px-3 py-2 text-xs text-brand-gray-500 shadow-sm">
          <RefreshCw className="w-3.5 h-3.5" /> Last synced: Just now
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Value", value: formatCurrency(total, true), sub: "Across 6 products" },
          { label: "Total Invested", value: formatCurrency(invested, true), sub: "Your contribution" },
          { label: "Total Returns", value: `+${formatCurrency(returnsAmt, true)}`, sub: `${formatPct(returnsPct)} XIRR`, positive: true },
        ].map((c) => (
          <motion.div key={c.label} whileHover={{ y: -2 }} className="card p-6">
            <p className="text-brand-gray-500 text-xs mb-2">{c.label}</p>
            <p className={`font-heading font-bold text-3xl ${c.positive ? "text-brand-green" : "text-brand-dark"}`}>{c.value}</p>
            <p className="text-brand-gray-400 text-xs mt-2">{c.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Allocation Pie */}
        <div className="card p-8">
          <h2 className="font-heading font-semibold text-brand-dark text-base mb-6">Asset Allocation</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-48 h-48 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ALLOCATION}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={90}
                    dataKey="value"
                    strokeWidth={0}
                    onMouseEnter={(_, i) => setActiveIndex(i)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    {ALLOCATION.map((entry, i) => (
                      <Cell
                        key={i}
                        fill={entry.color}
                        opacity={activeIndex === null || activeIndex === i ? 1 : 0.5}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {ALLOCATION.map((a, i) => (
                <div key={a.name} className="flex items-center gap-3 cursor-pointer" onMouseEnter={() => setActiveIndex(i)} onMouseLeave={() => setActiveIndex(null)}>
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: a.color }} />
                  <span className="text-xs text-brand-gray-500 flex-1 font-medium">{a.name}</span>
                  <span className="text-xs font-bold text-brand-dark">{a.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="card p-8">
          <h2 className="font-heading font-semibold text-brand-dark text-base mb-6">Portfolio Growth (6M)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={PERFORMANCE} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} dy={10} />
              <YAxis tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} dx={-10} tickFormatter={(v) => `₹${(v/100000).toFixed(1)}L`} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148,163,184,0.05)' }} />
              <Bar dataKey="value" name="Value" fill="#5244E3" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product Table */}
      <div className="card overflow-hidden p-0">
        <div className="px-4 md:px-8 py-4 md:py-5 border-b border-brand-gray-100 bg-brand-gray-50/50">
          <h2 className="font-heading font-semibold text-brand-dark text-base">All Holdings</h2>
        </div>
        <div className="divide-y divide-brand-gray-100">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2 md:gap-5 px-4 md:px-8 py-4 md:py-5 hover:bg-brand-gray-50 transition-colors"
            >
              <div className="hidden sm:flex w-10 h-10 rounded-xl bg-brand-gray-100 items-center justify-center text-xs font-bold text-brand-gray-500 flex-shrink-0">
                {p.type}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm font-semibold text-brand-dark truncate">{p.name}</p>
                <p className="text-[10px] md:text-xs text-brand-gray-500 mt-0.5 truncate">Linked: {p.goal}</p>
              </div>
              <div className="text-right shrink-0 min-w-[60px] md:min-w-0">
                <p className="text-sm font-bold text-brand-dark">{formatCurrency(p.value, true)}</p>
                <p className="text-[10px] md:text-xs text-brand-gray-400 mt-0.5 truncate">invested {formatCurrency(p.invested, true)}</p>
              </div>
              <div className={`flex items-center justify-end gap-0.5 md:gap-1 text-xs md:text-sm font-bold shrink-0 w-14 md:w-16 ${p.returns >= 0 ? "text-brand-green" : "text-red-500"}`}>
                {p.returns >= 0 ? <TrendingUp className="w-3 h-3 md:w-4 md:h-4" /> : <TrendingDown className="w-3 h-3 md:w-4 md:h-4" />}
                {formatPct(p.returns)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
