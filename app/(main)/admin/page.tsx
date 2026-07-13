"use client";

import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Area, AreaChart
} from "recharts";
import { Users, TrendingUp, Bell, Target, Brain, Shield } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const PERSONA_DIST = [
  { name: "Urban Millennial", count: 12400 },
  { name: "New Parent",       count: 8200 },
  { name: "Small Business",   count: 6100 },
  { name: "NRI Returnee",     count: 3400 },
  { name: "Rural Saver",      count: 9800 },
];

const NUDGE_EFFECTIVENESS = [
  { type: "Loss Framing",    accepted: 78, dismissed: 22 },
  { type: "Social Proof",    accepted: 65, dismissed: 35 },
  { type: "Smart Default",   accepted: 92, dismissed: 8 },
  { type: "Progress Viz",    accepted: 71, dismissed: 29 },
  { type: "Future You",      accepted: 83, dismissed: 17 },
];

const GROWTH = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  users: Math.round(28000 + i * 3200 + Math.random() * 1000),
  assets: Math.round(4.2e9 + i * 0.4e9),
}));

const KPI = [
  { icon: Users,       label: "Total Users",      value: "39,900",   change: "+12.4%", positive: true },
  { icon: TrendingUp,  label: "AUM Managed",      value: "₹4,200 Cr", change: "+8.2%", positive: true },
  { icon: Bell,        label: "Nudge Accept Rate", value: "78.2%",    change: "+3.1%", positive: true },
  { icon: Target,      label: "Goal Achievement",  value: "61%",      change: "+5.8%", positive: true },
  { icon: Brain,       label: "DNA Profiles",      value: "39,900",   change: "100%",  positive: true },
  { icon: Shield,      label: "SEBI Compliance",   value: "100%",     change: "Audit-ready", positive: true },
];

export default function AdminPage() {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10">
      <div>
        <h1 className="font-heading font-bold text-3xl text-brand-dark">IDBI Sammatti — Analytics Dashboard</h1>
        <p className="text-brand-gray-500 mt-2 font-medium">Bank-facing operational intelligence · Last updated: Just now</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {KPI.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="card p-5"
          >
            <k.icon className="w-5 h-5 text-brand-primary mb-3" />
            <p className="font-heading font-bold text-2xl text-brand-dark">{k.value}</p>
            <p className="text-xs font-semibold text-brand-gray-500 mt-1 uppercase tracking-wider">{k.label}</p>
            <p className={`text-xs font-bold mt-1.5 ${k.positive ? "text-brand-green" : "text-brand-orange"}`}>{k.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Growth */}
        <div className="card p-8">
          <h2 className="font-heading font-semibold text-brand-dark mb-6 text-lg">User Growth (12M)</h2>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={GROWTH}>
              <defs>
                <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#5244E3" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#5244E3" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
              <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748B", fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, fontSize: 12, boxShadow: "0px 10px 40px -10px rgba(0,0,0,0.05)" }} />
              <Area type="monotone" dataKey="users" name="Users" stroke="#5244E3" fill="url(#userGrad)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Nudge Effectiveness */}
        <div className="card p-8">
          <h2 className="font-heading font-semibold text-brand-dark mb-6 text-lg">NudgeOS Effectiveness</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={NUDGE_EFFECTIVENESS} layout="vertical" barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#64748B", fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <YAxis dataKey="type" type="category" tick={{ fill: "#64748B", fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} width={100} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, fontSize: 12, boxShadow: "0px 10px 40px -10px rgba(0,0,0,0.05)" }} />
              <Bar dataKey="accepted" name="Accepted %" fill="#21B76B" radius={[0, 6, 6, 0]} />
              <Bar dataKey="dismissed" name="Dismissed %" fill="#E2E8F0" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Persona Distribution */}
      <div className="card p-8">
        <h2 className="font-heading font-semibold text-brand-dark mb-6 text-lg">User Segment Distribution</h2>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={PERSONA_DIST} barSize={56}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "#64748B", fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#64748B", fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}K`} />
            <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, fontSize: 12, boxShadow: "0px 10px 40px -10px rgba(0,0,0,0.05)" }} cursor={{ fill: "rgba(148,163,184,0.05)" }} />
            <Bar dataKey="count" name="Users" fill="#5244E3" radius={[8, 8, 0, 0]}>
              {PERSONA_DIST.map((_, i) => (
                <rect key={i} fill={["#5244E3", "#21B76B", "#F4A825", "#FE6B52", "#0A1128"][i % 5]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
