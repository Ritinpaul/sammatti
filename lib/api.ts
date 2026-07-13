// ============================================================
// Sammatti — Typed API Client
// ============================================================

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ——— Helpers ———
async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("sammatti_token") : null;

  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || `API error ${res.status}`);
  }
  return res.json();
}

// ——— Auth ———
export const authApi = {
  sendOtp: (phone: string) =>
    apiFetch("/api/v1/auth/otp/send", { method: "POST", body: JSON.stringify({ phone }) }),
  verifyOtp: (phone: string, otp: string) =>
    apiFetch<{ token: string; user: any }>("/api/v1/auth/otp/verify", {
      method: "POST",
      body: JSON.stringify({ phone, otp }),
    }),
};

// ——— Users ———
export const userApi = {
  getProfile: (id: string) => apiFetch<any>(`/api/v1/users/${id}/profile`),
  submitDNA: (id: string, answers: Record<string, any>) =>
    apiFetch<any>(`/api/v1/users/${id}/dna`, {
      method: "POST",
      body: JSON.stringify({ answers }),
    }),
  getHealthScore: (id: string) => apiFetch<any>(`/api/v1/users/${id}/health-score`),
  getSpendingAnalysis: (id: string) => apiFetch<any>(`/api/v1/users/${id}/spending-analysis`),
  getCashflowForecast: (id: string) => apiFetch<any>(`/api/v1/users/${id}/cashflow-forecast`),
};

// ——— Chat ———
export const chatApi = {
  sendMessage: (userId: string, sessionId: string, message: string, language: string) =>
    apiFetch<any>("/api/v1/chat/message", {
      method: "POST",
      body: JSON.stringify({ user_id: userId, session_id: sessionId, message, language }),
    }),
  getHistory: (sessionId: string) => apiFetch<any[]>(`/api/v1/chat/${sessionId}/history`),
};

// ——— Goals ———
export const goalApi = {
  list: (userId: string) => apiFetch<any[]>(`/api/v1/goals?user_id=${userId}`),
  get: (id: string) => apiFetch<any>(`/api/v1/goals/${id}`),
  create: (data: any) =>
    apiFetch<any>("/api/v1/goals", { method: "POST", body: JSON.stringify(data) }),
  stressTest: (id: string) =>
    apiFetch<any>(`/api/v1/goals/${id}/stress-test`, { method: "POST" }),
  getMicroGoals: (id: string) => apiFetch<any[]>(`/api/v1/goals/${id}/micro-goals`),
};

// ——— Portfolio ———
export const portfolioApi = {
  get: (userId: string) => apiFetch<any[]>(`/api/v1/users/${userId}/portfolio`),
};

// ——— Nudges ———
export const nudgeApi = {
  list: (userId: string) => apiFetch<any[]>(`/api/v1/users/${userId}/nudges`),
  interact: (id: string, action: "open" | "action" | "dismiss", rating?: number) =>
    apiFetch(`/api/v1/nudges/${id}/interact`, {
      method: "POST",
      body: JSON.stringify({ action, rating }),
    }),
  generate: (userId: string) =>
    apiFetch(`/api/v1/nudges/generate`, {
      method: "POST",
      body: JSON.stringify({ user_id: userId }),
    }),
};

// ——— IDBI ———
export const idbiApi = {
  getFdRates: () => apiFetch<any[]>("/api/v1/idbi/fd-rates"),
  getMfCatalog: (risk: string) => apiFetch<any[]>(`/api/v1/idbi/mf-catalog?risk=${risk}`),
  getMarketSummary: () => apiFetch<any>("/api/v1/market/summary"),
};

// ——— Synthetic Demo Personas (fallback) ———
export const DEMO_PERSONAS = [
  { id: "rahul-001",  name: "Rahul Sharma",    phone: "+91 98765 43210", city: "Bangalore", income: 80000,  tag: "Urban Millennial" },
  { id: "priya-002",  name: "Priya Mehta",     phone: "+91 98765 43211", city: "Mumbai",    income: 120000, tag: "New Parent" },
  { id: "ramesh-003", name: "Ramesh Gupta",    phone: "+91 98765 43212", city: "Jaipur",    income: 55000,  tag: "Small Business" },
  { id: "arun-004",   name: "Arun Nair",       phone: "+91 98765 43213", city: "Hyderabad", income: 200000, tag: "NRI Returnee" },
  { id: "sunita-005", name: "Sunita Devi",     phone: "+91 98765 43214", city: "Village",   income: 25000,  tag: "Rural Saver" },
];
