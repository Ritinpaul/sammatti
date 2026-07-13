"use client";

import { motion } from "framer-motion";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Edit2, Globe, Palette } from "lucide-react";
import { DEMO_PERSONAS } from "@/lib/api";
import { useStore } from "@/lib/store";
import { getHealthGrade } from "@/lib/utils";
import HealthScoreRing from "@/components/charts/HealthScoreRing";

const DNA_DATA = [
  { axis: "Loss Aversion", value: 75 },
  { axis: "Present Bias", value: 60 },
  { axis: "Herd Mentality", value: 30 },
  { axis: "Awareness", value: 82 },
  { axis: "Long-Term", value: 70 },
  { axis: "Risk Appetite", value: 55 },
];

const PERSONAS = [
  { id: "wise_elder",          emoji: "🧙", name: "Wise Elder" },
  { id: "ambitious_peer",      emoji: "🚀", name: "Ambitious Peer" },
  { id: "cautious_accountant", emoji: "🛡️", name: "Cautious Accountant" },
];

export default function ProfilePage() {
  const { selectedUserId } = useStore();
  const persona = DEMO_PERSONAS.find((p) => p.id === selectedUserId) ?? DEMO_PERSONAS[0];
  const healthScore = 72;
  const { label, color } = getHealthGrade(healthScore);

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <h1 className="font-heading font-bold text-3xl text-brand-dark">Profile</h1>

      {/* User Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-8 flex flex-col md:flex-row items-center gap-8 text-center md:text-left"
      >
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-brand-primary flex items-center justify-center text-4xl font-bold text-white shadow-button">
            {persona.name.charAt(0)}
          </div>
          <div className="absolute bottom-0 right-0 w-7 h-7 bg-brand-green rounded-full border-4 border-white" />
        </div>
        <div className="flex-1">
          <h2 className="font-heading font-bold text-2xl text-brand-dark">{persona.name}</h2>
          <p className="text-brand-gray-500 font-medium">{persona.phone} · {persona.city}</p>
          <div className="flex flex-col md:flex-row items-center gap-3 mt-3">
            <span className="nudge-chip text-brand-gray-500 bg-brand-gray-50 border border-brand-gray-200 px-3 py-1 rounded text-[10px] uppercase font-bold tracking-wider">{persona.tag}</span>
            <span className="text-xs text-brand-gray-400 font-medium">IDBI Customer since 2018</span>
          </div>
        </div>
        <HealthScoreRing score={healthScore} size={100} />
      </motion.div>

      {/* DNA Radar + Settings Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Financial DNA */}
        <div className="card p-8">
          <h3 className="font-heading font-semibold text-brand-dark mb-1 text-lg">Financial DNA</h3>
          <p className="text-xs text-brand-gray-500 mb-6">Behavioral bias profile from psychometric quiz</p>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={DNA_DATA}>
              <PolarGrid stroke="rgba(148,163,184,0.2)" />
              <PolarAngleAxis
                dataKey="axis"
                tick={{ fill: "#64748B", fontSize: 11 }}
              />
              <Radar
                name="DNA"
                dataKey="value"
                stroke="#5244E3"
                fill="#5244E3"
                fillOpacity={0.15}
                strokeWidth={2}
              />
              <Tooltip
                contentStyle={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, fontSize: 12, boxShadow: "0px 10px 40px -10px rgba(0,0,0,0.05)" }}
                itemStyle={{ color: "#5244E3", fontWeight: 600 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Settings */}
        <div className="space-y-6">
          {/* Persona */}
          <div className="card p-6">
            <h3 className="font-heading font-semibold text-brand-dark text-sm mb-4 flex items-center gap-2">
              <Palette className="w-4 h-4 text-brand-primary" /> Advisor Persona
            </h3>
            <div className="space-y-3">
              {PERSONAS.map((p) => (
                <button
                  key={p.id}
                  className="w-full flex items-center gap-4 px-4 py-3 rounded-xl border border-brand-gray-100 hover:border-brand-primary hover:bg-brand-gray-50 transition-all text-left shadow-sm bg-white"
                >
                  <span className="text-2xl">{p.emoji}</span>
                  <span className="text-sm font-semibold text-brand-dark">{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div className="card p-6">
            <h3 className="font-heading font-semibold text-brand-dark text-sm mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4 text-brand-primary" /> Language Preference
            </h3>
            <div className="space-y-3">
              {["English", "हिंदी", "Hinglish"].map((l) => (
                <button key={l} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-brand-gray-100 hover:border-brand-primary hover:bg-brand-gray-50 transition-all text-left shadow-sm bg-white">
                  <span className="text-sm font-semibold text-brand-dark">{l}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Risk & Compliance */}
      <div className="card p-5 md:p-8">
        <h3 className="font-heading font-semibold text-brand-dark mb-4 md:mb-6 text-lg">Risk Profile & Compliance</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {[
            { label: "Risk Appetite", value: "Moderate" },
            { label: "KYC Status", value: "✅ Verified" },
            { label: "SEBI Category", value: "Retail" },
            { label: "AML Status", value: "✅ Clear" },
          ].map((s) => (
            <div key={s.label} className="bg-brand-gray-50 border border-brand-gray-100 rounded-xl p-3 md:p-4">
              <p className="text-[10px] md:text-xs font-semibold text-brand-gray-500 mb-1 uppercase tracking-wider">{s.label}</p>
              <p className="text-sm md:text-base font-bold text-brand-dark">{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
