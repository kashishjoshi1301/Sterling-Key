"use client";

import React from "react";
import Link from "next/link";
import Logo from "./Logo";

export default function Footer({ onOpenPortal, onOpenSchedule }) {
  const offices = [
    { city: "New York", address: "767 Fifth Avenue, PH 50", phone: "+1 (212) 791-8840" },
    { city: "Beverly Hills", address: "9601 Wilshire Boulevard", phone: "+1 (310) 849-2910" },
    { city: "Miami Beach", address: "1100 Brickell Ave, Suite 3200", phone: "+1 (305) 912-4411" },
    { city: "London", address: "25 Berkeley Square, Mayfair", phone: "+44 20 7946 0912" },
    { city: "Aspen", address: "400 East Cooper Avenue", phone: "+1 (970) 925-1020" }
  ];

  return (
    <footer className="bg-[#FAF8F5] border-t border-[#E4DCD0] text-[#1A1D20] pt-16 pb-12 font-sans selection:bg-[#C5A880]/30 selection:text-[#0A192F]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Top Newsletter & Intelligence Sign-up - Warm Navy & Ivory Container */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0A192F] text-white border border-[#C5A880]/40 shadow-xl mb-16 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A880] font-semibold block mb-2">
              Private Treaty Intelligence
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF8F5] tracking-tight mb-2">
              Receive Off-Market Pocket Offerings
            </h3>
            <p className="text-sm text-[#DDD4C6] leading-relaxed mb-6">
              Join 14,000+ family offices receiving our quarterly private intelligence dossier and unlisted off-market offerings.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter private email..."
                className="bg-[#142E54]/60 border border-[#C5A880]/30 rounded-xl px-4 py-3 text-sm text-[#FAF8F5] placeholder-[#DDD4C6]/60 focus:outline-none focus:border-[#C5A880] flex-1 font-mono transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-[#C5A880] hover:bg-[#D5BC98] text-[#0A192F] px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap active:scale-95 shadow-md cursor-pointer"
              >
                Subscribe &rarr;
              </button>
            </form>
          </div>

          {/* Decorative luxury key silhouette watermark */}
          <div className="absolute right-0 top-0 bottom-0 opacity-5 pointer-events-none flex items-center pr-10 hidden md:flex">
            <svg viewBox="0 0 100 100" fill="none" className="w-80 h-80 text-[#C5A880]">
              <polygon points="50,8 88,24 88,76 50,92 12,76 12,24" stroke="currentColor" strokeWidth="2" />
              <circle cx="50" cy="36" r="13" stroke="currentColor" strokeWidth="2" />
              <line x1="50" y1="49" x2="50" y2="78" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Global Advisory Chambers / Physical Locations */}
        <div className="mb-16">
          <div className="text-center mb-6">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A880] font-bold">
              Global Flagship Advisory Chambers
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {offices.map((office, i) => (
              <div key={i} className="p-4 rounded-xl bg-white border border-[#E4DCD0] shadow-sm hover:border-[#C5A880] transition-colors">
                <div className="text-[#0A192F] font-serif font-semibold text-sm mb-1">{office.city}</div>
                <p className="text-xs text-[#747D88] line-clamp-1">{office.address}</p>
                <div className="text-[#C5A880] text-xs mt-1.5 font-mono font-semibold">{office.phone}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Navigation Columns - Generous Brand Column Space */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 mb-14 border-t border-[#E4DCD0] pt-12">
          {/* Brand Info Column (2-Span on tablet and desktop so logo NEVER truncates) */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Logo size="md" variant="dark" className="mb-4" />
            <p className="text-[#545B65] text-sm leading-relaxed max-w-sm">
              Sterling Key Properties represents architectural masterworks and institutional multi-family assets across resilient sovereign havens.
            </p>
          </div>

          <div>
            <div className="text-[#0A192F] font-semibold text-sm uppercase tracking-wider mb-4">Portfolio Pages</div>
            <ul className="space-y-2.5 text-sm text-[#545B65]">
              <li><Link href="/collection" className="hover:text-[#0A192F] transition-colors font-medium">Browse All Collections</Link></li>
              <li><Link href="/vault" className="hover:text-[#0A192F] transition-colors font-medium">The Sovereign Vault</Link></li>
              <li><Link href="/destinations" className="hover:text-[#0A192F] transition-colors font-medium">Global Flagships</Link></li>
              <li><Link href="/financials" className="hover:text-[#0A192F] transition-colors font-medium">Valuation & Financials</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-[#0A192F] font-semibold text-sm uppercase tracking-wider mb-4">Institutional Services</div>
            <ul className="space-y-2.5 text-sm text-[#545B65]">
              <li><Link href="/management" className="hover:text-[#0A192F] transition-colors font-medium">Asset & Property Management</Link></li>
              <li><Link href="/advisory" className="hover:text-[#0A192F] transition-colors font-medium">Private Advisory & Treaties</Link></li>
              <li><button onClick={onOpenPortal} className="hover:text-[#0A192F] transition-colors font-medium cursor-pointer text-left">Client & Resident Portal</button></li>
              <li><button onClick={onOpenSchedule} className="hover:text-[#0A192F] transition-colors font-medium cursor-pointer text-left">Private Advisory Briefing</button></li>
            </ul>
          </div>

          <div>
            <div className="text-[#0A192F] font-semibold text-sm uppercase tracking-wider mb-4">Security & Compliance</div>
            <p className="text-[#747D88] text-xs leading-relaxed mb-4">
              Encrypted biometric vault access, SHA-256 NDA handshakes, and strict FINCEN anti-money laundering institutional screening protocols.
            </p>
            <div className="text-xs text-[#C5A880] font-mono font-semibold tracking-wider">
              EQUAL HOUSING OPPORTUNITY
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar - Two Stacked Centered Lines */}
        <div className="border-t border-[#E4DCD0] pt-8 flex flex-col items-center justify-center text-center text-[#545B65] text-xs sm:text-sm gap-3">
          {/* Line 1: Copyright & Legal Multipage Links (Centered) */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <p>
              © {new Date().getFullYear()} Sterling Key Properties & Asset Management LLC.
            </p>
            <span className="text-[#C5A880] hidden sm:inline">·</span>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <Link href="/privacy" className="text-[#545B65] hover:text-[#0A192F] font-medium transition-colors underline-offset-4 hover:underline">
                Privacy Policy
              </Link>
              <span className="text-[#E4DCD0]">·</span>
              <Link href="/terms" className="text-[#545B65] hover:text-[#0A192F] font-medium transition-colors underline-offset-4 hover:underline">
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Line 2: Developer Credit (Centered on New Line) */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#545B65]">
            <span>Developed with</span>
            <span className="text-red-500 animate-pulse text-sm">❤️</span>
            <span className="font-semibold text-[#1A1D20]">by Creyotech IT Services</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
