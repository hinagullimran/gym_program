import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gym Logger",
  description: "A minimal, mobile-first gym logging web app",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-white min-h-screen`}
      >
        <div className="max-w-md mx-auto min-h-screen border-x border-zinc-900 shadow-2xl bg-zinc-950 relative overflow-hidden">
          {/* Subtle background glow effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-48 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" />
          
          <main className="relative z-10 px-4 py-8 pb-24 h-full">
            <header className="mb-8">
              <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Gym Logger
              </h1>
              <p className="text-zinc-400 text-sm mt-1">Track your progress</p>
            </header>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
