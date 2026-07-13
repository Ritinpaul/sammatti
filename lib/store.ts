// ============================================================
// Sammatti — Zustand Global Store
// ============================================================

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ——— Types ———
export type Language = "en" | "hi" | "hinglish";
export type Persona = "wise_elder" | "ambitious_peer" | "cautious_accountant";
export type AvatarEmotion = "happy" | "concerned" | "celebrating" | "thinking" | "confused" | "excited" | "neutral";
export type LifeStage = "student" | "first_job" | "married" | "parent" | "retiree";

export interface FinancialDNA {
  loss_aversion: number;
  present_bias: number;
  herd_mentality: number;
  overconfidence: number;
  financial_awareness: number;
  emergency_preparedness: number;
  long_term_orientation: number;
  protection_awareness: number;
  risk_appetite: number;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  language: Language;
  persona: Persona;
  life_stage: LifeStage;
  financial_dna: FinancialDNA | null;
  risk_appetite_score: number;
  health_score: number;
}

export interface Goal {
  id: string;
  title: string;
  target_amount: number;
  current_amount: number;
  deadline: string;
  category: string;
  status: string;
  monthly_required: number;
  progress_pct: number;
  visual_url?: string;
}

export interface Nudge {
  id: string;
  type: string;
  title: string;
  content: string;
  channel: string;
  trigger_event: string;
  goal_id?: string;
  action_taken: boolean;
  scheduled_at: string;
}

export interface PortfolioItem {
  id: string;
  product_type: string;
  product_name: string;
  current_value: number;
  invested_value: number;
  returns_pct: number;
  goal_id?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sentiment?: string;
  timestamp: string;
  decision_trail?: DecisionTrail;
}

export interface DecisionTrail {
  confidence_score: number;
  data_sources: string[];
  reasoning_chain: string[];
  alternatives: string[];
  human_review_required: boolean;
}

// ——— Store ———
interface SammattiStore {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;

  // Avatar
  avatarEmotion: AvatarEmotion;
  isSpeaking: boolean;
  setAvatarEmotion: (e: AvatarEmotion) => void;
  setIsSpeaking: (s: boolean) => void;

  // Chat
  messages: ChatMessage[];
  isAvatarTyping: boolean;
  addMessage: (m: ChatMessage) => void;
  clearMessages: () => void;
  setAvatarTyping: (t: boolean) => void;

  // Goals
  goals: Goal[];
  setGoals: (g: Goal[]) => void;
  updateGoal: (id: string, data: Partial<Goal>) => void;

  // Portfolio
  portfolio: PortfolioItem[];
  setPortfolio: (p: PortfolioItem[]) => void;

  // Nudges
  nudges: Nudge[];
  setNudges: (n: Nudge[]) => void;
  markNudgeActioned: (id: string) => void;

  // UI
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  selectedUserId: string; // for demo persona switching
  setSelectedUserId: (id: string) => void;
}

export const useStore = create<SammattiStore>()(
  persist(
    (set) => ({
      // Auth
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false, messages: [] }),

      // Avatar
      avatarEmotion: "neutral",
      isSpeaking: false,
      setAvatarEmotion: (avatarEmotion) => set({ avatarEmotion }),
      setIsSpeaking: (isSpeaking) => set({ isSpeaking }),

      // Chat
      messages: [],
      isAvatarTyping: false,
      addMessage: (m) => set((s) => ({ messages: [...s.messages, m] })),
      clearMessages: () => set({ messages: [] }),
      setAvatarTyping: (isAvatarTyping) => set({ isAvatarTyping }),

      // Goals
      goals: [],
      setGoals: (goals) => set({ goals }),
      updateGoal: (id, data) =>
        set((s) => ({
          goals: s.goals.map((g) => (g.id === id ? { ...g, ...data } : g)),
        })),

      // Portfolio
      portfolio: [],
      setPortfolio: (portfolio) => set({ portfolio }),

      // Nudges
      nudges: [],
      setNudges: (nudges) => set({ nudges }),
      markNudgeActioned: (id) =>
        set((s) => ({
          nudges: s.nudges.map((n) =>
            n.id === id ? { ...n, action_taken: true } : n
          ),
        })),

      // UI
      sidebarOpen: true,
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      selectedUserId: "rahul-001",
      setSelectedUserId: (selectedUserId) => set({ selectedUserId }),
    }),
    { name: "sammatti-store", partialize: (s) => ({ user: s.user, isAuthenticated: s.isAuthenticated, selectedUserId: s.selectedUserId }) }
  )
);
