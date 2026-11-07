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
  Calculator,
  Globe,
  Lock,
  TrendingUp
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
      {/* Top Minimalist Ticker Bar with Symmetrical Container Alignment */}
      <div className="bg-[#040507] border-b border-white/[0.05] py-1.5 sm:py-2 text-[10px] sm:text-xs text-neutral-400 font-sans tracking-wide">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-medium tracking-[0.16em] uppercase bg-white/[0.06] text-stone-300 border border-white/[0.08] shrink-0">
              Private Market
            </span>
            <p className="truncate text-stone-400 text-[10px] sm:text-[11px]">
              Exclusive: The Bel-Air Promontory Estate · Managing $4.8B+ in Institutional Assets
            </p>
          </div>

          <div className="hidden md:flex items-center gap-6 text-[11px] text-stone-400">
            {/* Global Currency & Unit Switcher */}
            <div className="flex items-center gap-3 border-r border-white/10 pr-5">
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-stone-400" />
                <select
                  value={currency}
                  onChange={(e) => handleCurrencyChange(e.target.value)}
                  className="bg-transparent text-[11px] text-stone-300 font-medium focus:outline-none cursor-pointer [&>option]:bg-[#0E1015] [&>option]:text-white"
                >
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="AED">AED (د.إ)</option>
                </select>
              </div>

              <button
                onClick={handleUnitToggle}
                className="px-2 py-0.5 rounded text-[9px] uppercase font-mono tracking-wider bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10 transition-colors"
                title="Toggle Area Units"
              >
                {unit === "sqft" ? "SF" : "M²"}
              </button>
            </div>

            {/* Ambient Sound Generator */}
            <AmbientSoundToggle />

            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-300" /> Greystar Certified
            </span>
            <span className="text-neutral-700">|</span>
            <a href="tel:+18005557837" className="hover:text-white transition-colors flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-stone-300" /> +1 (800) 555-7837
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar with Justify-Center Layout */}
      <header
        className={`sticky top-0 z-40 transition-all duration-700 ease-out ${
          scrolled
            ? "bg-[#060709]/95 backdrop-blur-md shadow-2xl shadow-black/50 border-b border-white/[0.08] py-2"
            : "bg-[#060709]/80 backdrop-blur-sm border-b border-white/[0.04] py-2.5"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 lg:gap-4">
          {/* Logo pinned cleanly on left */}
          <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="shrink-0 cursor-pointer">
            <Logo size="md" />
          </div>

          {/* Desktop Nav Links - Centered Perfectly */}
          <nav className="hidden lg:flex items-center justify-center gap-2 xl:gap-3.5 2xl:gap-5 flex-1 min-w-0">
            <button
              onClick={() => scrollToSection("featured-listings")}
              className="text-[10px] xl:text-[11px] 2xl:text-xs font-medium tracking-[0.1em] xl:tracking-[0.14em] text-neutral-300 hover:text-white transition-colors duration-300 uppercase py-1 px-1 whitespace-nowrap"
            >
              Collection
            </button>
            <button
              onClick={() => scrollToSection("vault")}
              className="text-[10px] xl:text-[11px] 2xl:text-xs font-medium tracking-[0.1em] xl:tracking-[0.14em] text-stone-300 hover:text-white transition-colors duration-300 uppercase py-1 px-1 whitespace-nowrap"
            >
              Vault
            </button>
            <button
              onClick={() => scrollToSection("property-management")}
              className="text-[10px] xl:text-[11px] 2xl:text-xs font-medium tracking-[0.1em] xl:tracking-[0.14em] text-neutral-300 hover:text-white transition-colors duration-300 uppercase py-1 px-1 whitespace-nowrap"
            >
              Management
            </button>
            <button
              onClick={() => scrollToSection("valuation")}
              className="text-[10px] xl:text-[11px] 2xl:text-xs font-medium tracking-[0.1em] xl:tracking-[0.14em] text-neutral-300 hover:text-white transition-colors duration-300 uppercase py-1 px-1 whitespace-nowrap"
            >
              Valuation
            </button>
            <button
              onClick={() => scrollToSection("calculator")}
              className="text-[10px] xl:text-[11px] 2xl:text-xs font-medium tracking-[0.1em] xl:tracking-[0.14em] text-neutral-300 hover:text-white transition-colors duration-300 uppercase py-1 px-1 whitespace-nowrap"
            >
              Financials
            </button>
            <button
              onClick={() => scrollToSection("neighborhoods")}
              className="text-[10px] xl:text-[11px] 2xl:text-xs font-medium tracking-[0.1em] xl:tracking-[0.14em] text-neutral-300 hover:text-white transition-colors duration-300 uppercase py-1 px-1 whitespace-nowrap"
            >
              Destinations
            </button>
            <button
              onClick={() => scrollToSection("advisory")}
              className="text-[10px] xl:text-[11px] 2xl:text-xs font-medium tracking-[0.1em] xl:tracking-[0.14em] text-neutral-300 hover:text-white transition-colors duration-300 uppercase py-1 px-1 whitespace-nowrap"
            >
              Advisory
            </button>
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center justify-end gap-1.5 lg:gap-2.5 shrink-0">
            <button
              onClick={onOpenSaved}
              className="relative p-1.5 rounded-lg border border-white/10 text-neutral-300 hover:text-white hover:border-white/25 hover:bg-white/[0.04] transition-all duration-300"
              title="Saved Properties"
            >
              <Heart className={`w-3.5 h-3.5 ${savedCount > 0 ? "text-stone-200 fill-stone-200" : ""}`} />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-stone-200 text-neutral-950 text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenPortal}
              className="px-2.5 py-1.5 rounded-lg border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-stone-200 hover:text-white text-[10px] xl:text-[11px] font-medium uppercase tracking-[0.1em] transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap"
            >
              <Key className="w-3 h-3 text-stone-400" />
              <span>Client Portal</span>
            </button>

            <button
              onClick={onOpenSchedule}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-stone-200 text-neutral-950 font-semibold text-[10px] xl:text-[11px] uppercase tracking-[0.1em] transition-all duration-300 shadow-sm active:scale-95 whitespace-nowrap"
            >
              Private Advisory
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg text-neutral-300 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Drawer / Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#060709]/98 backdrop-blur-2xl flex flex-col p-5 sm:p-6 overflow-y-auto">
          {/* Top Row: Logo + Close Button */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
            <div onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="cursor-pointer">
              <Logo size="sm" />
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg text-neutral-400 hover:text-white border border-white/10 hover:bg-white/5 transition-colors"
              aria-label="Close Navigation Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Actions: Currency, Unit, Sound & Saved */}
          <div className="flex items-center justify-between gap-2 py-3.5 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2">
              <select
                value={currency}
                onChange={(e) => handleCurrencyChange(e.target.value)}
                className="bg-[#0E1015] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-stone-300 font-medium focus:outline-none"
              >
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
                <option value="EUR">EUR (€)</option>
                <option value="AED">AED (د.إ)</option>
              </select>
              <button
                onClick={handleUnitToggle}
                className="px-2.5 py-1.5 rounded-lg text-xs font-mono tracking-wider bg-white/10 text-white border border-white/10"
              >
                {unit.toUpperCase()}
              </button>
              <AmbientSoundToggle />
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSaved();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-stone-200"
            >
              <Heart className={`w-3.5 h-3.5 ${savedCount > 0 ? "text-stone-200 fill-stone-200" : ""}`} />
              <span>Saved ({savedCount})</span>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-1 py-4 flex-1">
            <button
              onClick={() => scrollToSection("featured-listings")}
              className="text-left text-sm font-medium uppercase tracking-[0.14em] text-neutral-300 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors"
            >
              Curated Collection
            </button>
            <button
              onClick={() => scrollToSection("vault")}
              className="text-left text-sm font-medium uppercase tracking-[0.14em] text-stone-300 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-stone-400" /> The Sovereign Vault
              </span>
              <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded bg-white/10 text-stone-300 font-mono">
                Exclusive
              </span>
            </button>
            <button
              onClick={() => scrollToSection("property-management")}
              className="text-left text-sm font-medium uppercase tracking-[0.14em] text-neutral-300 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <Key className="w-4 h-4 text-stone-400" /> Property Management
            </button>
            <button
              onClick={() => scrollToSection("valuation")}
              className="text-left text-sm font-medium uppercase tracking-[0.14em] text-neutral-300 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4 text-stone-400" /> Estate Valuation
            </button>
            <button
              onClick={() => scrollToSection("calculator")}
              className="text-left text-sm font-medium uppercase tracking-[0.14em] text-neutral-300 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-stone-400" /> Mortgage & Financials
            </button>
            <button
              onClick={() => scrollToSection("neighborhoods")}
              className="text-left text-sm font-medium uppercase tracking-[0.14em] text-neutral-300 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <Globe className="w-4 h-4 text-stone-400" /> Global Destinations
            </button>
            <button
              onClick={() => scrollToSection("advisory")}
              className="text-left text-sm font-medium uppercase tracking-[0.14em] text-neutral-300 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors"
            >
              Private Advisory Network
            </button>
          </div>

          {/* Bottom CTAs */}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5 shrink-0">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal();
              }}
              className="w-full py-3 rounded-xl border border-white/20 bg-white/5 text-stone-200 hover:text-white font-medium uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Key className="w-4 h-4" /> Client Portal Access
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSchedule();
              }}
              className="w-full py-3 rounded-xl bg-white hover:bg-stone-200 text-neutral-950 font-bold uppercase tracking-wider text-xs transition-colors shadow-lg"
            >
              Schedule Private Consultation
            </button>
            <div className="flex items-center justify-between text-[11px] text-stone-400 pt-2 px-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-400" /> Greystar Certified
              </span>
              <a href="tel:+18005557837" className="hover:text-white transition-colors flex items-center gap-1">
                <PhoneCall className="w-3 h-3 text-stone-400" /> +1 (800) 555-7837
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}