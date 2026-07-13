import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, compact = false): string {
  if (compact) {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000)   return `₹${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000)     return `₹${(amount / 1000).toFixed(0)}K`;
    return `₹${amount.toFixed(0)}`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPct(value: number, decimals = 1): string {
  return `${value >= 0 ? "+" : ""}${value.toFixed(decimals)}%`;
}

export function getGreeting(name: string): string {
  const hour = new Date().getHours();
  if (hour < 12) return `Good morning, ${name} 🌅`;
  if (hour < 17) return `Good afternoon, ${name} ☀️`;
  return `Good evening, ${name} 🌙`;
}

export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function getHealthGrade(score: number): { grade: string; color: string; label: string } {
  if (score >= 80) return { grade: "A", color: "#27AE60", label: "Excellent" };
  if (score >= 65) return { grade: "B", color: "#F4A825", label: "Good" };
  if (score >= 50) return { grade: "C", color: "#E67E22", label: "Fair" };
  if (score >= 35) return { grade: "D", color: "#E74C3C", label: "Needs Work" };
  return { grade: "F", color: "#C0392B", label: "Critical" };
}

export function getBiasLabel(score: number): string {
  if (score > 0.75) return "Very High";
  if (score > 0.55) return "High";
  if (score > 0.35) return "Moderate";
  return "Low";
}

export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1)  return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}
