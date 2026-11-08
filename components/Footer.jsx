"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { ArrowRight, Check } from "lucide-react";

export default function Footer({ onOpenPortal, onOpenSchedule }) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
    }
  };

  const offices = [
    { city: "New York", address: "767 Fifth Avenue, PH 50", phone: "+1 (212) 791-8840" },
    { city: "Beverly Hills", address: "9601 Wilshire Boulevard", phone: "+1 (310) 849-2910" },
    { city: "Miami Beach", address: "1100 Brickell Ave, Suite 3200", phone: "+1 (305) 912-4411" },
    { city: "London", address: "25 Berkeley Square, Mayfair", phone: "+44 20 7946 0912" },
    { city: "Aspen", address: "400 East Cooper Avenue", phone: "+1 (970) 925-1020" }
  ];

  return (
    <footer className="bg-[#FAF8F5] text-[#545B65] text-sm border-t border-[#E4DCD0] pt-16 pb-24 sm:pb-28">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Top Newsletter Banner in Deep Navy with Champagne Gold Accents */}
        <div className="bg-[#0A192F] border border-[#C5A880]/40 rounded-3xl p-6 sm:p-10 mb-14 shadow-xl relative overflow-hidden text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs uppercase tracking-[0.22em] text-[#C5A880] font-semibold mb-1.5 block">
                The Sovereign Wire · Private Dispatch
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#FAF8F5] mb-2 font-semibold">
                Receive Off-Market Pocket Offerings
              </h3>
              <p className="text-[#DDD4C6] text-sm sm:text-base leading-relaxed">
                Join 14,000+ family offices receiving our quarterly private intelligence dossier and unlisted off-market offerings.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="flex items-center gap-2.5 p-4 rounded-xl bg-white/10 border border-[#C5A880]/40 text-[#EADDC9]">
                  <Check className="w-5 h-5 shrink-0 text-[#C5A880]" />
                  <span className="text-sm font-medium">
                    You have been subscribed to The Sovereign Wire.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    required
                    placeholder="Enter private email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-[#060D18] border border-[#C5A880]/40 rounded-xl px-4 py-3 text-sm text-white placeholder-[#8F949B] focus:outline-none focus:border-[#C5A880]"
                  />
                  <button
                    type="submit"
                    className="py-3 px-6 rounded-xl bg-[#C5A880] hover:bg-[#D8BD99] text-[#0A192F] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm shrink-0 cursor-pointer"
                  >
                    <span>Subscribe</span> <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Global Flagship Locations - Warm Ivory & White Cards */}
        <div className="mb-14">
          <div className="text-xs uppercase tracking-[0.22em] text-[#C5A880] font-semibold mb-5 text-center">
            Global Flagship Advisory Chambers
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

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14 border-t border-[#E4DCD0] pt-12">
          <div>
            <Logo size="md" variant="dark" className="mb-4" />
            <p className="text-[#545B65] text-sm leading-relaxed max-w-xs">
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
              <span className="text-[#C5A880]">·</span>
              <Link href="/terms" className="text-[#545B65] hover:text-[#0A192F] font-medium transition-colors underline-offset-4 hover:underline">
                Terms & Conditions
              </Link>
            </div>
          </div>
          
          {/* Line 2: Developer Credit with Red Heart Love Sign (Centered on New Line) */}
          <div className="font-medium text-[#1A1D20] text-xs sm:text-sm">
            Developed with <span className="text-red-500 font-bold inline-block mx-1 animate-pulse" aria-label="love">❤️</span> by <span className="font-semibold text-[#0A192F]">Creyotech IT Services</span>
          </div>
        </div>
      </div>
    </footer>
  );
}