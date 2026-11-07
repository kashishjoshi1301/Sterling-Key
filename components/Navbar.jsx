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
      <div className="bg-[#040507] border-b border-white/[0.05] py-2 text-xs text-neutral-400 font-sans tracking-wide">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-medium tracking-[0.2em] uppercase bg-white/[0.06] text-stone-300 border border-white/[0.08]">
              Private Market
            </span>
            <p className="truncate text-stone-400 text-[11px]">
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

      {/* Main Sticky Navbar with Justify-Center Layout and No Right Clipping */}
      <header
        className={`sticky top-0 z-40 transition-all duration-700 ease-out ${
          scrolled
            ? "bg-[#060709]/95 backdrop-blur-md shadow-2xl shadow-black/50 border-b border-white/[0.08] py-2"
            : "bg-[#060709]/80 backdrop-blur-sm border-b border-white/[0.04] py-2.5"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2.5 lg:gap-4">
          {/* Logo pinned cleanly on left */}
          <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="shrink-0 cursor-pointer">
            <Logo size="md" />
          </div>

          {/* Desktop Nav Links - Centered Perfectly with Justify Center */}
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

          {/* Right Action CTAs - Guaranteed Fit Without Clipping */}
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
            className="lg:hidden p-2 rounded-lg text-neutral-300 hover:text-white border border-white/10"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[80px] z-30 bg-[#060709]/98 backdrop-blur-2xl border-b border-white/10 p-6 shadow-2xl transition-all duration-500">
          <div className="flex flex-col gap-4 text-center">
            <div className="flex items-center justify-center gap-3 pb-3 border-b border-white/10">
              <select
                value={currency}
                onChange={(e) => handleCurrencyChange(e.target.value)}
                className="bg-[#0E1015] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-stone-300"
              >
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
                <option value="EUR">EUR (€)</option>
                <option value="AED">AED (د.إ)</option>
              </select>
              <button
                onClick={handleUnitToggle}
                className="px-2.5 py-1 rounded-lg text-xs bg-white/10 text-white"
              >
                Units: {unit.toUpperCase()}
              </button>
              <AmbientSoundToggle />
            </div>

            <button
              onClick={() => scrollToSection("featured-listings")}
              className="text-sm font-medium uppercase tracking-wider text-neutral-300 py-1"
            >
              Collection
            </button>
            <button
              onClick={() => scrollToSection("vault")}
              className="text-sm font-medium uppercase tracking-wider text-stone-300 py-1 flex items-center justify-center gap-1"
            >
              <Lock className="w-3.5 h-3.5" /> The Sovereign Vault
            </button>
            <button
              onClick={() => scrollToSection("property-management")}
              className="text-sm font-medium uppercase tracking-wider text-neutral-300 py-1 flex items-center justify-center gap-1.5"
            >
              <Key className="w-3.5 h-3.5" /> Property Management
            </button>
            <button
              onClick={() => scrollToSection("valuation")}
              className="text-sm font-medium uppercase tracking-wider text-neutral-300 py-1 flex items-center justify-center gap-1.5"
            >
              <TrendingUp className="w-3.5 h-3.5" /> Estate Valuation
            </button>
            <button
              onClick={() => scrollToSection("calculator")}
              className="text-sm font-medium uppercase tracking-wider text-neutral-300 py-1"
            >
              Mortgage & Financials
            </button>
            <button
              onClick={() => scrollToSection("advisory")}
              className="text-sm font-medium uppercase tracking-wider text-neutral-300 py-1"
            >
              Private Advisory Network
            </button>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPortal();
                }}
                className="w-full py-2.5 rounded-lg border border-white/20 bg-white/5 text-stone-200 font-medium uppercase tracking-wider text-xs flex items-center justify-center gap-2"
              >
                <Key className="w-3.5 h-3.5" /> Client Portal
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSchedule();
                }}
                className="w-full py-2.5 rounded-lg bg-white text-neutral-950 font-semibold uppercase tracking-wider text-xs"
              >
                Schedule Private Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
