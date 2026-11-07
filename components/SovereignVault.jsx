"use client";

import React, { useState } from "react";
import { Lock, Unlock, Key, ShieldCheck, ArrowRight } from "lucide-react";
import { useToast } from "./Toast";
import { useCurrency } from "./CurrencyContext";

const OFF_MARKET_PROPERTIES = [
  {
    id: "vault-1",
    code: "SOV-BEVERLY-90210",
    title: "The Bel-Air Giga-Compound",
    price: 145000000,
    priceFormatted: "$145,000,000",
    location: "Bel-Air, California",
    acreage: "5.4 Private Hilltop Acres",
    specs: "10 Beds · 18 Baths · 34,000 SF",
    features: ["FAA Approved Private Helipad", "20-Car Sub-Terranean Auto Museum", "Championship Tennis Pavilion", "Fortress-Grade Safe Compound"],
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
    advisor: "Julian Vance"
  },
  {
    id: "vault-2",
    code: "SOV-EXUMA-CAY",
    title: "Little Whale Cay Private Island",
    price: 95000000,
    priceFormatted: "$95,000,000",
    location: "Exuma Cays, Bahamas",
    acreage: "93 Entire Ocean Acres",
    specs: "3 Private Villas · 4,000-FT Jet Airstrip",
    features: ["Private Certified Jet Runway", "Deepwater Mega-Yacht Marina (180 FT)", "Private Solar Micro-Grid & Desalination", "Total Sovereign Seclusion"],
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80",
    advisor: "Mateo Rodriguez"
  },
  {
    id: "vault-3",
    code: "SOV-LONDON-SW1",
    title: "Carlton House Terrace Palace",
    price: 108000000,
    priceFormatted: "£85,000,000 ($108M)",
    location: "St James's, London SW1",
    acreage: "Grade I Royal Regency Landmark",
    specs: "8 Suites · 22,500 SF Palatial Living",
    features: ["Direct Views of St James's Park & The Mall", "Sovereign State Entertaining Ballrooms", "Private Chauffeur Mews & Security Barracks", "Rare Freehold Royal Heritage"],
    image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1600&q=80",
    advisor: "Alistair Montgomery"
  }
];

export default function SovereignVault({ onScheduleTour }) {
  const { addToast } = useToast();
  const { formatRawPrice } = useCurrency();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [errorShake, setErrorShake] = useState(false);

  const handleUnlock = (e) => {
    e.preventDefault();
    const cleanCode = passcode.trim().toUpperCase();
    if (cleanCode === "STERLING" || cleanCode === "VAULT2026" || cleanCode === "STERLING2026" || cleanCode === "KEY") {
      setIsUnlocked(true);
      addToast("Biometric NDA Handshake Validated. Welcome to The Sovereign Vault.", "success", "Vault Decrypted");
    } else {
      setErrorShake(true);
      addToast("Invalid authorization code. Try demo code 'STERLING' or 'STERLING2026'", "error", "Access Denied");
      setTimeout(() => setErrorShake(false), 800);
    }
  };

  const handleQuickUnlock = () => {
    setPasscode("STERLING2026");
    setIsUnlocked(true);
    addToast("VIP Passcode Verified. Off-Market Dossiers Unlocked.", "success", "Vault Decrypted");
  };

  return (
    <section id="vault" className="py-16 sm:py-20 bg-[#FAF8F5] border-b border-[#E4DCD0] relative overflow-hidden text-[#1A1D20]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header in Deep Navy & Champagne Gold */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.24em] bg-white border border-[#E4DCD0] text-[#0A192F] mb-3 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" /> Strict NDA Protocol
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-[#0A192F] mb-3">
            The Sovereign Vault
          </h2>
          <p className="text-[#545B65] text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Discreet off-market pocket listings, sovereign private treaties, and unlisted mega-compounds represented outside public MLS registries.
          </p>
        </div>

        {!isUnlocked ? (
          /* LOCKED VAULT VIEW - Warm Ivory & Deep Navy Card */
          <div className="max-w-xl mx-auto bg-white border border-[#E4DCD0] rounded-3xl p-8 sm:p-10 shadow-xl relative">
            <div className="w-16 h-16 rounded-2xl bg-[#0A192F] border border-[#C5A880]/50 flex items-center justify-center text-[#C5A880] mx-auto mb-6 shadow-md">
              <Lock className="w-7 h-7" />
            </div>

            <div className="text-center mb-6">
              <h3 className="text-lg font-serif text-[#0A192F] font-semibold">
                Authorization Required
              </h3>
              <p className="text-xs text-[#545B65] mt-1">
                Enter your private family office code or request instant demonstration clearance.
              </p>
            </div>

            <form onSubmit={handleUnlock} className={`space-y-4 ${errorShake ? "animate-pulse" : ""}`}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter Keycode (Demo: STERLING2026)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E4DCD0] rounded-xl px-4 py-3 text-xs text-center font-mono tracking-widest text-[#0A192F] font-bold uppercase focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]/30 placeholder:normal-case placeholder:tracking-normal placeholder:font-normal placeholder:text-[#8C95A0]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleQuickUnlock}
                  className="py-2.5 px-3 rounded-xl bg-[#F3EFEA] hover:bg-[#EAE3D9] text-[#0A192F] border border-[#E4DCD0] text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  Quick Demo Access
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-4 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] font-semibold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-sm"
                >
                  Unlock Vault
                </button>
              </div>
            </form>

            <div className="mt-6 pt-4 border-t border-[#E4DCD0] flex items-center justify-between text-[11px] text-[#747D88]">
              <span>Encrypted SHA-256 Protocol</span>
              <span className="text-[#C5A880] font-semibold">Off-Market: $348,000,000+</span>
            </div>
          </div>
        ) : (
          /* UNLOCKED VAULT LISTINGS */
          <div className="space-y-8 animate-fade-in">
            {/* Unlocked status bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E4DCD0] shadow-sm">
              <div className="flex items-center gap-2.5 text-xs text-[#0A192F] font-medium">
                <Unlock className="w-4 h-4 text-[#C5A880]" />
                <span>Confidential Off-Market Dossiers Unlocked · Session Authenticated</span>
              </div>
              <button
                onClick={() => {
                  setIsUnlocked(false);
                  addToast("Sovereign Vault re-locked", "info", "Security Secured");
                }}
                className="text-xs text-[#0A192F] hover:text-[#C5A880] uppercase font-mono tracking-wider transition-colors font-semibold"
              >
                Re-Lock Vault
              </button>
            </div>

            {/* Off-Market Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
              {OFF_MARKET_PROPERTIES.map((prop) => (
                <div
                  key={prop.id}
                  className="bg-white border border-[#E4DCD0] hover:border-[#C5A880] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl flex flex-col justify-between transition-all group"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                    <img
                      src={prop.image}
                      alt={prop.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded text-[10px] font-mono tracking-wider bg-[#0A192F]/85 backdrop-blur-md text-[#EADDC9] border border-[#C5A880]/40">
                        {prop.code}
                      </span>
                      <span className="px-2.5 py-0.5 rounded text-[9px] uppercase font-bold bg-[#C5A880] text-[#0A192F]">
                        Strict NDA
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880] mb-1 font-semibold">
                        {prop.location}
                      </div>
                      <h4 className="text-lg font-serif text-[#0A192F] font-semibold mb-1">
                        {prop.title}
                      </h4>
                      <div className="text-xl font-serif text-[#0A192F] font-bold mb-2">
                        {prop.priceFormatted}
                      </div>

                      <div className="text-xs text-[#545B65] pb-3 mb-3 border-b border-[#E4DCD0]">
                        {prop.specs}
                      </div>

                      <div className="space-y-1.5 mb-5">
                        {prop.features.map((feat, i) => (
                          <div key={i} className="text-[11px] text-[#383E46] flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => onScheduleTour && onScheduleTour(prop)}
                      className="w-full py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95"
                    >
                      <span>Request NDA & Private Showing</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}