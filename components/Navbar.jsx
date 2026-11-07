"use client";

import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import { 
  Key, 
  Heart, 
  PhoneCall, 
  Menu, 
  X, 
  ShieldCheck, 
  Globe, 
  Lock, 
  Calculator,
  Building2,
  Users
} from "lucide-react";
import { useCurrency } from "./CurrencyContext";
import { useToast } from "./Toast";
import AmbientSoundToggle from "./AmbientSoundToggle";

export default function Navbar({ 
  onOpenPortal, 
  onOpenSchedule, 
  savedCount = 0,
  onOpenSaved
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currency, setCurrency, unit, setUnit } = useCurrency();
  const { addToast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCurrencyChange = (newCur) => {
    setCurrency(newCur);
    addToast(`Portfolio valuation updated to ${newCur}`, "info", "Currency Converted");
  };

  const handleUnitToggle = () => {
    const newUnit = unit === "sqft" ? "sqm" : "sqft";
    setUnit(newUnit);
    addToast(`Measurement units switched to ${newUnit === "sqm" ? "Square Metres (M²)" : "Square Feet (SF)"}`, "info", "Unit Preferences");
  };

  return (
    <>
      {/* Top Deep Navy Ticker Bar */}
      <div className="bg-[#0A192F] border-b border-[#060D18] py-1.5 sm:py-2 text-[10px] sm:text-xs text-[#EAE3D9] font-sans tracking-wide">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-medium tracking-[0.16em] uppercase bg-[#C5A880]/20 text-[#EADDC9] border border-[#C5A880]/30 shrink-0">
              Private Market
            </span>
            <p className="truncate text-[#DDD4C6] text-[10px] sm:text-[11px]">
              Exclusive: The Bel-Air Promontory Estate · Managing $4.8B+ in Institutional Assets
            </p>
          </div>

          <div className="hidden md:flex items-center gap-6 text-[11px] text-[#DDD4C6]">
            {/* Global Currency & Unit Switcher */}
            <div className="flex items-center gap-3 border-r border-white/15 pr-5">
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#C5A880]" />
                <select
                  value={currency}
                  onChange={(e) => handleCurrencyChange(e.target.value)}
                  className="bg-transparent text-[11px] text-[#FAF8F5] font-medium focus:outline-none cursor-pointer [&>option]:bg-[#0A192F] [&>option]:text-white"
                >
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="AED">AED (د.إ)</option>
                </select>
              </div>

              <button
                onClick={handleUnitToggle}
                className="px-2 py-0.5 rounded text-[9px] uppercase font-mono tracking-wider bg-white/10 hover:bg-white/20 text-[#FAF8F5] border border-white/20 transition-colors"
                title="Toggle Area Units"
              >
                {unit === "sqft" ? "SF" : "M²"}
              </button>
            </div>

            {/* Ambient Sound Generator */}
            <AmbientSoundToggle />

            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" /> Greystar Certified
            </span>
            <span className="text-white/20">|</span>
            <a href="tel:+18005557837" className="hover:text-white transition-colors flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-[#C5A880]" /> +1 (800) 555-7837
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar in Warm Ivory */}
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ease-out ${
          scrolled
            ? "bg-[#FAF8F5]/95 backdrop-blur-md shadow-lg shadow-[#0A192F]/5 border-b border-[#E4DCD0] py-2.5"
            : "bg-[#FAF8F5]/90 backdrop-blur-sm border-b border-[#EAE3D9] py-3.5"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo pinned cleanly on left */}
          <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="shrink-0 cursor-pointer">
            <Logo size="md" variant="dark" />
          </div>

          {/* Desktop Nav Links in Charcoal */}
          <nav className="hidden lg:flex items-center justify-center gap-3 xl:gap-5 flex-1 min-w-0">
            <button
              onClick={() => scrollToSection("featured-listings")}
              className="text-[11px] xl:text-xs font-medium tracking-[0.12em] text-[#383E46] hover:text-[#0A192F] transition-colors uppercase py-1 px-1.5 whitespace-nowrap"
            >
              Collection
            </button>
            <button
              onClick={() => scrollToSection("vault")}
              className="text-[11px] xl:text-xs font-semibold tracking-[0.12em] text-[#0A192F] hover:text-[#C5A880] transition-colors uppercase py-1 px-1.5 whitespace-nowrap flex items-center gap-1"
            >
              <Lock className="w-3 h-3 text-[#C5A880]" /> Vault
            </button>
            <button
              onClick={() => scrollToSection("property-management")}
              className="text-[11px] xl:text-xs font-medium tracking-[0.12em] text-[#383E46] hover:text-[#0A192F] transition-colors uppercase py-1 px-1.5 whitespace-nowrap"
            >
              Management
            </button>
            <button
              onClick={() => scrollToSection("financials")}
              className="text-[11px] xl:text-xs font-medium tracking-[0.12em] text-[#383E46] hover:text-[#0A192F] transition-colors uppercase py-1 px-1.5 whitespace-nowrap"
            >
              Financials
            </button>
            <button
              onClick={() => scrollToSection("neighborhoods")}
              className="text-[11px] xl:text-xs font-medium tracking-[0.12em] text-[#383E46] hover:text-[#0A192F] transition-colors uppercase py-1 px-1.5 whitespace-nowrap"
            >
              Destinations
            </button>
            <button
              onClick={() => scrollToSection("advisory")}
              className="text-[11px] xl:text-xs font-medium tracking-[0.12em] text-[#383E46] hover:text-[#0A192F] transition-colors uppercase py-1 px-1.5 whitespace-nowrap"
            >
              Advisory
            </button>
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center justify-end gap-2 xl:gap-3 shrink-0">
            <button
              onClick={onOpenSaved}
              className="relative p-2 rounded-xl border border-[#E4DCD0] text-[#383E46] hover:text-[#0A192F] hover:border-[#C5A880] hover:bg-[#F3EFEA] transition-all"
              title="Saved Properties"
            >
              <Heart className={`w-3.5 h-3.5 ${savedCount > 0 ? "text-[#C5A880] fill-[#C5A880]" : ""}`} />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0A192F] text-[#FAF8F5] text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenPortal}
              className="px-3 py-2 rounded-xl border border-[#0A192F]/20 bg-white hover:bg-[#F3EFEA] text-[#0A192F] text-xs font-semibold uppercase tracking-[0.1em] transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <Key className="w-3 h-3 text-[#C5A880]" />
              <span>Client Portal</span>
            </button>

            <button
              onClick={onOpenSchedule}
              className="px-4 py-2 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] font-semibold text-xs uppercase tracking-[0.1em] transition-all shadow-sm active:scale-95"
            >
              Private Advisory
            </button>
          </div>

          {/* Mobile Right Controls: Saved + Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenSaved}
              className="relative p-2 rounded-xl bg-white border border-[#E4DCD0] text-[#0A192F]"
              aria-label="Favorites"
            >
              <Heart className={`w-4 h-4 ${savedCount > 0 ? "text-[#C5A880] fill-[#C5A880]" : ""}`} />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0A192F] text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white border border-[#E4DCD0] text-[#0A192F]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#C5A880]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[96px] z-50 bg-[#FAF8F5] border-t border-[#E4DCD0] p-6 flex flex-col justify-between sm:hidden animate-fade-in overflow-y-auto">
          <div className="space-y-4">
            <div className="text-[10px] uppercase font-mono tracking-widest text-[#C5A880]">
              Navigation
            </div>

            <div className="flex flex-col space-y-2">
              <button
                onClick={() => scrollToSection("featured-listings")}
                className="text-left text-lg font-serif text-[#0A192F] font-semibold py-2 border-b border-[#E4DCD0]"
              >
                Collection
              </button>
              <button
                onClick={() => scrollToSection("vault")}
                className="text-left text-lg font-serif text-[#0A192F] font-semibold py-2 border-b border-[#E4DCD0] flex items-center justify-between"
              >
                <span>The Sovereign Vault</span>
                <span className="text-xs uppercase font-mono text-[#C5A880] bg-[#0A192F] px-2 py-0.5 rounded">NDA</span>
              </button>
              <button
                onClick={() => scrollToSection("property-management")}
                className="text-left text-lg font-serif text-[#0A192F] font-semibold py-2 border-b border-[#E4DCD0]"
              >
                Institutional Management
              </button>
              <button
                onClick={() => scrollToSection("financials")}
                className="text-left text-lg font-serif text-[#0A192F] font-semibold py-2 border-b border-[#E4DCD0]"
              >
                Financial & Valuation Suite
              </button>
              <button
                onClick={() => scrollToSection("neighborhoods")}
                className="text-left text-lg font-serif text-[#0A192F] font-semibold py-2 border-b border-[#E4DCD0]"
              >
                Global Flagships
              </button>
              <button
                onClick={() => scrollToSection("advisory")}
                className="text-left text-lg font-serif text-[#0A192F] font-semibold py-2 border-b border-[#E4DCD0]"
              >
                Private Client Advisory
              </button>
            </div>
          </div>

          <div className="pt-6 space-y-3 border-t border-[#E4DCD0]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal();
              }}
              className="w-full py-3 rounded-xl bg-white border border-[#E4DCD0] text-[#0A192F] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Key className="w-4 h-4 text-[#C5A880]" />
              Client & Resident Portal
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSchedule();
              }}
              className="w-full py-3 rounded-xl bg-[#0A192F] text-[#FAF8F5] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
            >
              Private Advisory Briefing
            </button>
          </div>
        </div>
      )}
    </>
  );
}