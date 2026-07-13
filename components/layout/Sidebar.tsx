"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, MessageSquare, Target, TrendingUp,
  Bell, User, Settings, Sparkles, Shield, LogOut
} from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { DEMO_PERSONAS } from "@/lib/api";

const NAV_ITEMS = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/portfolio", icon: TrendingUp,      label: "Portfolio" },
  { href: "/goals",     icon: Target,          label: "Goals" },
  { href: "/nudges",    icon: Bell,            label: "Nudges",   badge: true },
  { href: "/avatar",    icon: MessageSquare,   label: "AI Co-pilot" },
  { href: "/profile",   icon: User,            label: "Profile" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { nudges, selectedUserId, setSelectedUserId } = useStore();
  const unreadNudges = nudges.filter((n) => !n.action_taken).length;

  return (
    <aside className="w-20 h-full flex flex-col items-center py-6 flex-shrink-0 z-20">
      {/* Logo */}
      <Link href="/" className="mb-10 text-white hover:text-white/80 transition-colors">
        <Sparkles className="w-8 h-8" />
      </Link>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col items-center gap-4 w-full">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link key={item.href} href={item.href} className="relative group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300",
                  isActive
                    ? "bg-brand-primary shadow-button text-white"
                    : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
                )}
              >
                <item.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                
                {item.badge && unreadNudges > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-orange text-white text-[10px] font-bold flex items-center justify-center">
                    {unreadNudges}
                  </span>
                )}
              </motion.div>
              
              {/* Tooltip */}
              <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-brand-dark text-white text-xs font-medium rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Demo Persona Switcher (Hidden in pure icon mode, let's put it in Profile or keep a tiny version) */}
      <div className="mt-auto mb-6 relative group w-12 h-12">
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white/60 cursor-pointer hover:bg-white/20">
           <Shield className="w-5 h-5" />
        </div>
        <div className="absolute left-full ml-4 bottom-0 p-3 bg-brand-dark rounded-xl opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 transition-opacity w-48 z-50">
           <p className="text-[10px] text-white/50 uppercase mb-2">Switch Persona</p>
           <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="w-full bg-white/10 border-none rounded-lg px-2 py-1.5 text-xs text-white outline-none"
          >
            {DEMO_PERSONAS.map((p) => (
              <option key={p.id} value={p.id} className="bg-brand-dark">{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Logout */}
      <Link href="/" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white text-brand-primary hover:bg-brand-gray-100 transition-colors">
        <LogOut className="w-5 h-5 ml-1" />
      </Link>
    </aside>
  );
}
