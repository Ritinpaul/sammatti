"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-brand-primary flex flex-col font-body">
      {/* Background SVG Waves */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <svg viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <path d="M0,400 C300,500 600,200 900,400 C1200,600 1440,300 1440,300 L1440,900 L0,900 Z" fill="#008866" opacity="0.4" />
          <path d="M0,600 C400,700 800,400 1440,600 L1440,900 L0,900 Z" fill="#009977" opacity="0.3" />
          <path d="M0,200 C400,100 800,400 1440,200 L1440,0 L0,0 Z" fill="#005544" opacity="0.2" />
          <path d="M-100,-100 C300,200 800,100 1100,300 C1400,500 1600,0 1600,0 L1600,-200 L-100,-200 Z" fill="#00A87A" opacity="0.15" />
        </svg>
      </div>

      <div className="relative z-10 flex-1 flex flex-col max-w-[1400px] mx-auto w-full px-8 py-10">
        {/* Navbar */}
        <nav className="flex items-center justify-between mb-16 md:mb-24 px-4">
          <div className="font-heading font-extrabold text-white text-2xl tracking-wide flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span>Sammatti <span className="text-sm font-semibold text-brand-orange ml-1">by IDBI Bank</span></span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-white font-bold text-[15px]">
            <Link href="#" className="hover:text-brand-orange transition-colors">Home</Link>
            <Link href="#" className="hover:text-brand-orange transition-colors">Features</Link>
            <Link href="#" className="hover:text-brand-orange transition-colors">About</Link>
            <Link href="#" className="hover:text-brand-orange transition-colors">Service</Link>
            <Link href="#" className="hover:text-brand-orange transition-colors">Contact</Link>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-between gap-16 pb-20 px-4">
          
          {/* Left Column */}
          <div className="flex-1 max-w-2xl">
            <h1 className="font-heading font-extrabold text-white text-5xl md:text-[4.5rem] leading-[1.1] tracking-tight mb-4">
              Your wealth advisor
              <br />
              <span className="text-brand-orange">that remembers you</span>
            </h1>
            <h2 className="font-heading font-bold text-white text-xl md:text-[22px] mb-8 tracking-wide">
              AI-Powered Behavioral Wealth Management
            </h2>
            <p className="text-white/90 text-base md:text-lg leading-relaxed mb-10 max-w-xl font-medium">
              Not a chatbot. Not a robo-advisor. A <strong className="text-white">behavioral co-pilot</strong> that
              decodes your financial psychology, sets living goals, and nudges you at exactly the right moment.
              Built specifically for IDBI Bank customers.
            </p>

            <div className="flex items-center gap-4 flex-wrap mb-10">
              <Link href="/onboarding">
                <button className="flex items-center gap-2 bg-brand-orange text-white font-extrabold px-9 py-3.5 rounded-full hover:bg-brand-orange/90 transition-all duration-300 tracking-wide text-sm shadow-button">
                  TAKE THE TEST <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/dashboard">
                <button className="flex items-center gap-2 border-2 border-white text-white font-extrabold px-9 py-3.5 rounded-full hover:bg-white hover:text-brand-primary transition-all duration-300 tracking-wide text-sm">
                  VIEW DEMO DASHBOARD
                </button>
              </Link>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full border border-white cursor-pointer"></div>
              <div className="w-2.5 h-2.5 rounded-full border border-white cursor-pointer"></div>
              <div className="w-2.5 h-2.5 rounded-full border border-white bg-white cursor-pointer"></div>
              <div className="w-2.5 h-2.5 rounded-full border border-white cursor-pointer"></div>
            </div>
          </div>

          {/* Right Column - Login Card */}
          <div className="w-full max-w-[420px]">
            <div className="bg-[#F4F7FB] rounded-[2.5rem] p-12 shadow-2xl relative">
              <h3 className="text-center font-heading font-semibold text-brand-gray-500 tracking-[0.2em] text-[13px] mb-12">
                MEMBER LOGIN
              </h3>
              
              <form onSubmit={handleLogin} className="flex flex-col gap-6">
                <input 
                  type="text" 
                  placeholder="ENTER USERNAME" 
                  defaultValue="demo_user"
                  className="w-full bg-white border border-brand-gray-200 rounded-full px-6 py-4 text-xs font-bold text-brand-dark placeholder-brand-gray-600 focus:outline-none focus:border-brand-primary text-center tracking-wider shadow-sm"
                />
                
                <input 
                  type="password" 
                  placeholder="ENTER PASSWORD" 
                  defaultValue="password123"
                  className="w-full bg-white border border-brand-gray-200 rounded-full px-6 py-4 text-xs font-bold text-brand-dark placeholder-brand-gray-600 focus:outline-none focus:border-brand-primary text-center tracking-wider shadow-sm"
                />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-6 gap-4 px-1">
                  <button type="submit" className="w-full sm:w-auto bg-brand-primary text-white font-bold px-10 py-3.5 rounded-full hover:bg-brand-primary/90 transition-colors shadow-button text-xs tracking-wider">
                    LOGIN
                  </button>
                  
                  <div className="flex flex-col items-start gap-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className="w-2.5 h-2.5 rounded-full border border-brand-gray-400 group-hover:border-brand-primary transition-colors"></div>
                      <span className="text-[9px] font-bold text-brand-gray-500 tracking-wider">REMEMBER</span>
                    </label>
                    <Link href="#" className="flex items-center gap-2 group">
                      <div className="w-2.5 h-2.5 rounded-full border border-brand-gray-400 group-hover:border-brand-primary transition-colors"></div>
                      <span className="text-[9px] font-bold text-brand-gray-500 tracking-wider">FORGOT PASSWORD?</span>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
