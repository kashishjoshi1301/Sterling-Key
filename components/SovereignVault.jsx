"use client";

import React, { useState } from "react";
import { Lock, Unlock, Key, ShieldCheck, ArrowRight, FileCheck, Eye, EyeOff, Sparkles } from "lucide-react";
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
      addToast("Invalid authorization code. Try demo code 'STERLING' or 'VAULT2026'", "error", "Access Denied");
      setTimeout(() => setErrorShake(false), 800);
    }
  };

  const handleQuickUnlock = () => {
    setPasscode("STERLING2026");
    setIsUnlocked(true);
    addToast("VIP Passcode Verified. Off-Market Dossiers Unlocked.", "success", "Vault Decrypted");
  };

  return (
    <section id="vault" className="py-14 sm:py-16 bg-[#060709] border-b border-white/[0.08] relative overflow-hidden">
      {/* Decorative ambient subtle lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-[0.24em] bg-white/[0.04] border border-white/10 text-stone-300 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-stone-300" /> Strict NDA Protocol
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-white mb-3">
            The Sovereign Vault
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Discreet off-market pocket listings, sovereign private treaties, and unlisted mega-compounds represented outside public MLS registries.
          </p>
        </div>

        {!isUnlocked ? (
          /* LOCKED VAULT VIEW */
          <div className="max-w-xl mx-auto bg-[#0C0E14] border border-white/15 rounded-3xl p-8 sm:p-10 shadow-2xl relative">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-stone-300 mx-auto mb-6">
              <Lock className="w-7 h-7" />
            </div>

            <div className="text-center mb-6">
              <h3 className="text-lg font-serif text-white font-medium">
                Authorization Required
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
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
                  className="w-full bg-[#07080A] border border-white/15 rounded-xl px-4 py-3 text-xs text-center font-mono tracking-widest text-white uppercase focus:outline-none focus:border-white/40 placeholder:normal-case placeholder:tracking-normal placeholder:text-neutral-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleQuickUnlock}
                  className="py-2.5 px-3 rounded-xl bg-white/[0.05] hover:bg-white/10 text-stone-200 border border-white/10 text-xs font-medium uppercase tracking-wider transition-all"
                >
                  Quick Demo Access
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-4 rounded-xl bg-white hover:bg-stone-200 text-neutral-950 font-semibold text-xs uppercase tracking-wider transition-all active:scale-95"
                >
                  Unlock Vault
                </button>
              </div>
            </form>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-500">
              <span>Encrypted SHA-256 Vault Protocol</span>
              <span>Off-Market Holdings: $348,000,000+</span>
            </div>
          </div>
        ) : (
          /* UNLOCKED VAULT LISTINGS */
          <div className="space-y-8 animate-fade-in">
            {/* Unlocked status bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="flex items-center gap-2.5 text-xs text-stone-300">
                <Unlock className="w-4 h-4 text-stone-200" />
                <span>Confidential Off-Market Dossiers Unlocked · Session Authenticated</span>
              </div>
              <button
                onClick={() => {
                  setIsUnlocked(false);
                  addToast("Sovereign Vault re-locked", "info", "Security Secured");
                }}
                className="text-xs text-neutral-400 hover:text-white uppercase font-mono tracking-wider"
              >
                Re-Lock Vault
              </button>
            </div>

            {/* Off-Market Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {OFF_MARKET_PROPERTIES.map((prop) => (
                <div
                  key={prop.id}
                  className="bg-[#0C0E14] border border-white/15 hover:border-white/30 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between transition-all group"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                      <img
                        src={prop.image}
                        alt={prop.title}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80";
                        }}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded text-[10px] font-mono tracking-wider bg-black/70 backdrop-blur-md text-stone-300 border border-white/10">
                          {prop.code}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-0.5 rounded text-[9px] uppercase font-bold bg-white text-neutral-950">
                          Private Treaty
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="text-[10px] text-stone-400 uppercase font-medium">
                        {prop.location} · {prop.acreage}
                      </div>
                      <h3 className="text-base font-serif text-white font-medium mt-1 mb-2">
                        {prop.title}
                      </h3>
                      <div className="text-xl font-serif font-semibold text-white mb-3">
                        {formatRawPrice(prop.price)}
                      </div>

                      <div className="text-xs text-neutral-400 mb-4 pb-3 border-b border-white/[0.06]">
                        {prop.specs}
                      </div>

                      <div className="space-y-1.5 mb-2">
                        {prop.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      onClick={() => onScheduleTour({ title: `${prop.title} (Off-Market Vault)`, priceFormatted: prop.priceFormatted })}
                      className="w-full py-2.5 rounded-xl bg-white hover:bg-stone-200 text-neutral-950 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                    >
                      <FileCheck className="w-3.5 h-3.5" /> Request Offering Memorandum
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
