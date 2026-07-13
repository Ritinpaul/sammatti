"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowUpRight, ArrowDownRight, Target, Plus, Search, 
  Bell, MoreVertical, ExternalLink, Moon, Maximize, TrendingUp, ChevronRight
} from "lucide-react";
import { useStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import {
  BarChart, Bar, Cell, ResponsiveContainer, XAxis, Tooltip,
  AreaChart, Area, PieChart, Pie
} from "recharts";

// --- MOCK DATA ---
const PORTFOLIO_DATA = [
  { day: "Mon", value: 300 },
  { day: "Tue", value: 450 },
  { day: "Wed", value: 890 },
  { day: "Thu", value: 500 },
  { day: "Fri", value: 320 },
  { day: "Sat", value: 400 },
];

const GROWTH_DATA = [
  { name: "Received", data: [1000, 1200, 1100, 1609, 1500, 1700, 1600] },
  { name: "Ordered", data: [2500, 2400, 2100, 2189, 2300, 2400, 2300] }
];

const RECENT_NUDGES = [
  { name: "Dream Home", time: "Today", tag: "New", tagColor: "bg-green-100 text-green-600", amount: "+₹4,500" },
  { name: "Emergency Fund", time: "2 Day Ago", tag: "New", tagColor: "bg-green-100 text-green-600", amount: "+₹2,000" },
  { name: "Goa Trip", time: "1 Day Ago", tag: "Cancelled", tagColor: "bg-red-100 text-red-600", amount: "₹0" },
  { name: "Car Downpayment", time: "2 Days Ago", tag: "Completed", tagColor: "bg-brand-primary/20 text-brand-primary", amount: "+₹8,400" },
];

const ACTIVE_GOALS = [
  { name: "Dream Home", cat: "Real Estate", amount: "₹1.2M", progress: 65, color: "#5244E3", trend: "+12%" },
  { name: "Emergency Fund", cat: "Savings", amount: "₹3.2L", progress: 40, color: "#5244E3", trend: "-2%" },
  { name: "Vacation", cat: "Travel", amount: "₹80K", progress: 85, color: "#5244E3", trend: "+42%" },
  { name: "New Car", cat: "Auto", amount: "₹5L", progress: 20, color: "#5244E3", trend: "+29%" },
];

export default function DashboardPage() {
  const { user } = useStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1400px] mx-auto min-h-full">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between mb-8">
        <div className="relative w-96">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray-400" />
          <input 
            type="text" 
            placeholder="Start searching here..."
            className="w-full bg-white rounded-full py-3 pl-12 pr-4 text-sm outline-none text-brand-dark shadow-sm border border-brand-gray-100 placeholder:text-brand-gray-400"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-white rounded-full py-2 px-4 shadow-sm border border-brand-gray-100">
            <Bell className="w-4 h-4 text-brand-gray-500" />
            <span className="text-sm font-medium">Sat, 26 Sep</span>
            <div className="w-6 h-6 rounded-full bg-brand-orange text-white text-[10px] font-bold flex items-center justify-center">12</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-brand-gray-200 overflow-hidden border-2 border-white shadow-sm">
             {/* Profile image placeholder */}
             <div className="w-full h-full bg-brand-orange flex items-center justify-center text-white font-bold">{user?.name?.charAt(0) || "R"}</div>
          </div>
        </div>
      </div>

      {/* Title & Actions */}
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-bold text-3xl text-brand-dark">Your Wealth Analysis</h1>
        <div className="flex items-center gap-3">
          <button className="bg-brand-primary text-white px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 shadow-button hover:bg-brand-primary/90 transition-colors">
            <Plus className="w-4 h-4" /> Add Widget
          </button>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-card text-brand-dark hover:bg-brand-gray-50">
            <Moon className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-card text-brand-dark hover:bg-brand-gray-50">
            <Maximize className="w-4 h-4" />
          </button>
          <button className="bg-white text-brand-dark px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 shadow-card hover:bg-brand-gray-50">
             Filter
          </button>
        </div>
      </div>

      {/* Grid Layout - 3x2 Bento Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 1. AI Assistant Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card !bg-[#0A1128] !border-none relative overflow-hidden flex flex-col justify-between text-white !rounded-[2rem] min-h-[320px]">
          <div className="relative z-10">
            <h2 className="font-heading font-bold text-2xl mb-2">AI Assistant</h2>
            <p className="text-white/60 text-sm leading-relaxed max-w-[200px]">
              Analyze portfolio growth over last year.<br/>Compare returns, risk, and goals.
            </p>
          </div>
          {/* Abstract glowing shape representation */}
          <div className="absolute right-[-20%] top-[20%] w-64 h-64 bg-brand-primary/40 rounded-full blur-[60px]" />
          <div className="absolute bottom-[-20%] left-[10%] w-48 h-48 bg-brand-orange/20 rounded-full blur-[50px]" />
          
          <Link href="/avatar" className="relative z-10 w-full mt-auto">
            <div className="flex items-center justify-between bg-white/10 backdrop-blur-md rounded-full p-2 pl-6 hover:bg-white/20 transition-colors cursor-pointer border border-white/10">
              <span className="text-sm font-medium">Analyze portfolio</span>
              <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* 2. Total Portfolio (Bar Chart) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card !rounded-[2rem] flex flex-col min-h-[320px]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-gray-50 flex items-center justify-center text-brand-dark">
                <span className="font-bold text-xs">$</span>
              </div>
              <h3 className="font-semibold text-brand-dark">Portfolio Value</h3>
            </div>
            <div className="flex items-center gap-2">
              <select className="bg-brand-gray-50 rounded-full px-3 py-1.5 text-xs font-medium outline-none">
                <option>Week</option>
              </select>
              <button className="w-8 h-8 rounded-full bg-brand-gray-50 flex items-center justify-center"><MoreVertical className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="flex-1 w-full h-full relative -ml-4 mt-8">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={PORTFOLIO_DATA} margin={{ top: 20 }}>
                 <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} dy={10} />
                 <Bar dataKey="value" radius={[20, 20, 20, 20]} barSize={32}>
                   {PORTFOLIO_DATA.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.day === 'Wed' ? '#FE6B52' : '#F1F5F9'} />
                   ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
             {/* Fake tooltip for 'Wed' */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 bg-white shadow-card rounded-xl px-3 py-1.5 text-xs font-bold text-brand-dark">
               ₹1.8M
             </div>
          </div>
        </motion.div>

        {/* 3. Wealth Growth (Area Charts) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card !rounded-[2rem] flex flex-col min-h-[320px]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-gray-50 flex items-center justify-center text-brand-dark">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-brand-dark">Wealth Growth</h3>
            </div>
            <button className="w-8 h-8 rounded-full bg-brand-gray-50 flex items-center justify-center"><MoreVertical className="w-4 h-4" /></button>
          </div>
          
          <div className="flex gap-4 flex-1">
            {/* Green Line Area */}
            <div className="flex-1 flex flex-col">
              <div className="flex items-center gap-1 text-brand-green text-xs font-bold mb-1">
                <ArrowUpRight className="w-3 h-3" /> 24% for 1 day
              </div>
              <div className="font-heading font-bold text-2xl text-brand-dark mb-1">₹16.09L</div>
              <div className="flex items-center gap-1 text-xs text-brand-gray-500 mb-4">
                <div className="w-2 h-2 rounded-full bg-brand-primary"></div> Invested Amount
              </div>
              <div className="flex-1 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={GROWTH_DATA[0].data.map(v => ({ value: v }))}>
                    <defs>
                      <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#21B76B" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#21B76B" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke="#21B76B" strokeWidth={2} fillOpacity={1} fill="url(#colorGreen)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Red Line Area */}
            <div className="flex-1 flex flex-col border-l border-brand-gray-100 pl-4">
              <div className="flex items-center gap-1 text-brand-orange text-xs font-bold mb-1">
                <ArrowDownRight className="w-3 h-3" /> 8%
              </div>
              <div className="font-heading font-bold text-2xl text-brand-dark mb-1">₹21.89L</div>
              <div className="flex items-center gap-1 text-xs text-brand-gray-500 mb-4">
                <div className="w-2 h-2 rounded-full bg-brand-orange"></div> Current Value
              </div>
              <div className="flex-1 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={GROWTH_DATA[1].data.map(v => ({ value: v }))}>
                    <defs>
                      <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FE6B52" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#FE6B52" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke="#FE6B52" strokeWidth={2} fillOpacity={1} fill="url(#colorRed)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4. Recent Nudges (List) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card !rounded-[2rem] flex flex-col min-h-[320px]">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-gray-50 flex items-center justify-center text-brand-dark">
                  <Target className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-brand-dark">Recent Activity</h3>
             </div>
             <div className="flex items-center gap-2">
               <button className="w-8 h-8 rounded-full bg-brand-gray-50 flex items-center justify-center text-brand-gray-500"><Search className="w-4 h-4" /></button>
               <select className="bg-brand-gray-50 rounded-full px-3 py-1.5 text-xs font-medium outline-none">
                 <option>Week</option>
               </select>
             </div>
          </div>
          
          <div className="space-y-4 flex-1 overflow-hidden">
            {RECENT_NUDGES.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-gray-100 flex items-center justify-center overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}`} alt="" className="w-full h-full object-cover"/>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-dark">{item.name}</p>
                    <p className="text-xs text-brand-gray-500">{item.time}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.tagColor}`}>
                  {item.tag}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-brand-dark w-16 text-right">{item.amount}</span>
                  <button className="text-brand-gray-400 hover:text-brand-dark"><ExternalLink className="w-4 h-4" /></button>
                  <button className="text-brand-gray-400 hover:text-brand-dark"><MoreVertical className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 5. Health Score (Donut) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="card !rounded-[2rem] flex flex-col min-h-[320px]">
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-gray-50 flex items-center justify-center text-brand-dark">
                  <Target className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-brand-dark">Health Score</h3>
             </div>
             <button className="w-8 h-8 rounded-full bg-brand-gray-50 flex items-center justify-center"><MoreVertical className="w-4 h-4" /></button>
          </div>
          
          <div className="flex-1 relative flex items-center justify-center -mt-4">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={[{ value: 73.1 }, { value: 100 - 73.1 }]}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={10}
                >
                  <Cell fill="#5244E3" />
                  <Cell fill="#F1F5F9" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-heading font-bold text-3xl text-brand-dark">+73.1%</span>
              <span className="text-xs text-brand-gray-500 font-medium">Excellent</span>
            </div>
          </div>
        </motion.div>

        {/* 6. Active Goals (Progress Bars) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="card !rounded-[2rem] flex flex-col min-h-[320px]">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-gray-50 flex items-center justify-center text-brand-dark">
                  <Target className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-brand-dark">Top Goals</h3>
             </div>
             <button className="text-xs font-semibold text-brand-dark flex items-center">
                View All <ChevronRight className="w-3 h-3 ml-1" />
             </button>
          </div>

          <div className="space-y-5 flex-1">
            {ACTIVE_GOALS.map((goal, idx) => (
              <div key={idx} className="flex items-center justify-between gap-4">
                <div className="w-32">
                  <p className="text-sm font-semibold text-brand-dark truncate">{goal.name}</p>
                  <p className="text-[10px] text-brand-gray-500">{goal.cat}</p>
                </div>
                
                <div className="flex-1 flex items-center">
                  <div className="w-full h-2.5 bg-brand-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ width: `${goal.progress}%`, backgroundColor: goal.color }}
                    />
                  </div>
                </div>

                <div className="text-right w-16">
                  <p className="text-sm font-bold text-brand-dark">{goal.amount}</p>
                  <p className={`text-[10px] font-bold ${goal.trend.startsWith('+') ? 'text-brand-green' : 'text-brand-orange'}`}>
                    {goal.trend.startsWith('+') ? <ArrowUpRight className="w-2.5 h-2.5 inline" /> : <ArrowDownRight className="w-2.5 h-2.5 inline" />}
                    {goal.trend}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
