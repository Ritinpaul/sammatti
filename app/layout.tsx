import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sammatti — AI Wealth Avatar | IDBI Bank",
  description:
    "Your personal AI financial co-pilot. Personalized, behaviorally-aware wealth management powered by IDBI Bank.",
  keywords: ["wealth management", "AI advisor", "IDBI", "financial planning", "investment"],
  openGraph: {
    title: "Sammatti — AI Wealth Avatar",
    description: "Behaviorally-aware AI wealth management for every Indian",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} ${inter.variable} font-body bg-dark text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
