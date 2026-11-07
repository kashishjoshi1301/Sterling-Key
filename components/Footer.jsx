"use client";

import React, { useState } from "react";
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
    <footer className="bg-[#07111E] text-[#A8B2C1] text-xs border-t border-[#0A192F] pt-12 pb-8">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Top Newsletter Banner */}
        <div className="bg-[#0A192F] border border-[#C5A880]/30 rounded-3xl p-6 sm:p-8 mb-12 shadow-xl relative overflow-hidden text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#C5A880] font-semibold mb-1 block">
                The Sovereign Wire · Private Dispatch
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-[#FAF8F5] mb-1 font-semibold">
                Receive Off-Market Pocket Offerings
              </h3>
              <p className="text-[#A8B2C1] text-xs sm:text-sm">
                Join 14,000+ family offices receiving our quarterly private intelligence dossier and unlisted off-market offerings.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="flex items-center gap-2 p-3.5 rounded-xl bg-white/10 border border-[#C5A880]/40 text-[#EADDC9]">
                  <Check className="w-4 h-4 shrink-0 text-[#C5A880]" />
                  <span className="text-xs font-medium">
                    You have been subscribed to The Sovereign Wire.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter private email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-[#07111E] border border-[#C5A880]/30 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#747D88] focus:outline-none focus:border-[#C5A880]"
                  />
                  <button
                    type="submit"
                    className="py-2.5 px-5 rounded-xl bg-[#C5A880] hover:bg-[#D8BD99] text-[#0A192F] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm shrink-0"
                  >
                    Subscribe <ArrowRight className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Global Flagship Locations - Streamlined Row */}
        <div className="mb-12">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[#C5A880] font-semibold mb-4 text-center">
            Global Flagship Advisory Chambers
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {offices.map((office, i) => (
              <div key={i} className="p-3 rounded-xl bg-[#0A192F]/80 border border-white/10">
                <div className="text-white font-serif font-semibold text-xs mb-0.5">{office.city}</div>
                <p className="text-[10px] text-[#A8B2C1] line-clamp-1">{office.address}</p>
                <div className="text-[#C5A880] text-[10px] mt-1 font-mono">{office.phone}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 border-t border-white/10 pt-10">
          <div>
            <Logo size="md" variant="light" className="mb-3" />
            <p className="text-[#A8B2C1] text-xs leading-relaxed max-w-xs">
              Sterling Key Properties represents architectural masterworks and institutional multi-family assets across resilient sovereign havens.
            </p>
          </div>

          <div>
            <div className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Portfolio</div>
            <ul className="space-y-2 text-[#A8B2C1]">
              <li><a href="#featured-listings" className="hover:text-white transition-colors">Featured Estates</a></li>
              <li><a href="#vault" className="hover:text-white transition-colors">The Sovereign Vault</a></li>
              <li><a href="#neighborhoods" className="hover:text-white transition-colors">Global Flagships</a></li>
              <li><a href="#financials" className="hover:text-white transition-colors">Valuation Intelligence</a></li>
            </ul>
          </div>

          <div>
            <div className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Institutional</div>
            <ul className="space-y-2 text-[#A8B2C1]">
              <li><a href="#property-management" className="hover:text-white transition-colors">Asset Management</a></li>
              <li><button onClick={onOpenPortal} className="hover:text-white transition-colors">Client & Resident Portal</button></li>
              <li><a href="#financials" className="hover:text-white transition-colors">Jumbo Lending Desk</a></li>
              <li><button onClick={onOpenSchedule} className="hover:text-white transition-colors">Private Advisory Briefing</button></li>
            </ul>
          </div>

          <div>
            <div className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Security & Compliance</div>
            <p className="text-[#747D88] text-[11px] leading-relaxed mb-3">
              Encrypted biometric vault access, SHA-256 NDA handshakes, and strict FINCEN anti-money laundering institutional screening protocols.
            </p>
            <div className="text-[10px] text-[#C5A880] font-mono">
              EQUAL HOUSING OPPORTUNITY
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-[#747D88] text-[11px] gap-3">
          <p>© {new Date().getFullYear()} Sterling Key Properties & Asset Management LLC. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Regulatory Disclosures</span>
          </div>
        </div>
      </div>
    </footer>
  );
}