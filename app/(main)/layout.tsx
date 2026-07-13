"use client";

import Sidebar from "@/components/layout/Sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col-reverse md:flex-row h-screen bg-brand-primary p-2 md:p-4 font-body overflow-hidden">
      {/* Sidebar - detached and floating style */}
      <Sidebar />

      {/* Main Content Area - White rounded card */}
      <main className="flex-1 flex flex-col bg-brand-gray-50 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl relative border-4 border-brand-primary/20 mb-2 md:mb-0 md:ml-4">
        {/* Top Header Placeholder (Search, date, profile) would go inside page or here */}
        
        {/* Scrollable page content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
