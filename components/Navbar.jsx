"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useCurrency } from "./CurrencyContext";
import { useToast } from "./Toast";
import AmbientSoundToggle from "./AmbientSoundToggle";
import PortalModal from "./PortalModal";
import ScheduleModal from "./ScheduleModal";
import SavedDrawer from "./SavedDrawer";

export default function Navbar({ 
  onOpenPortal, 
  onOpenSchedule, 
  savedCount = 0,
  onOpenSaved
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currency, setCurrency, unit, setUnit } = useCurrency();
  const { addToast } = useToast();

  const [internalPortalOpen, setInternalPortalOpen] = useState(false);
  const [internalScheduleOpen, setInternalScheduleOpen] = useState(false);
  const [internalSavedOpen, setInternalSavedOpen] = useState(false);

  const handleOpenPortal = () => {
    if (typeof onOpenPortal === "function") {
      onOpenPortal();
    } else {
      setInternalPortalOpen(true);
    }
  };

  const handleOpenSchedule = () => {
    if (typeof onOpenSchedule === "function") {
      onOpenSchedule();
    } else {
      setInternalScheduleOpen(true);
    }
  };

  const handleOpenSaved = () => {
    if (typeof onOpenSaved === "function") {
      onOpenSaved();
    } else {
      setInternalSavedOpen(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCurrencyChange = (newCur) => {
    setCurrency(newCur);
    addToast(`Portfolio valuation updated to ${newCur}`, "info", "Currency Converted");
  };

  const handleUnitToggle = () => {
    const newUnit = unit === "sqft" ? "sqm" : "sqft";
    setUnit(newUnit);
    addToast(`Units switched to ${newUnit === "sqm" ? "M²" : "SF"}`, "info", "Unit Preferences");
  };

  const navLinks = [
    { href: "/collection", label: "Collection" },
    { href: "/vault", label: "Vault", hasLock: true },
    { href: "/management", label: "Management" },
    { href: "/financials", label: "Financials" },
    { href: "/destinations", label: "Destinations" },
    { href: "/advisory", label: "Advisory" }
  ];

  return (
    <>
      {/* Top Deep Navy Ticker Bar - Strictly Single-Line & Fully Responsive */}
      <div className="bg-[#0A192F] border-b border-[#060D18] py-1.5 sm:py-2 text-xs text-[#EAE3D9] font-sans tracking-wide w-full overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 w-full overflow-hidden">
          {/* Left Ticker Teaser */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-hidden min-w-0 flex-1">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-semibold tracking-[0.14em] uppercase bg-[#C5A880]/20 text-[#EADDC9] border border-[#C5A880]/30 shrink-0">
              Private Market
            </span>
            <p className="text-[#DDD4C6] text-xs font-medium min-w-0 whitespace-nowrap overflow-hidden">
              <span className="hidden xl:inline">
                Exclusive: The Bel-Air Promontory Estate · Managing $4.8B+ in Institutional Assets
              </span>
              <span className="hidden md:inline xl:hidden">
                Exclusive: The Bel-Air Promontory Estate · $4.8B+ in Assets
              </span>
              <span className="md:hidden">
                Exclusive: The Bel-Air Promontory Estate
              </span>
            </p>
          </div>

          {/* Right Preferences & Contact Desk */}
          <div className="hidden sm:flex items-center gap-3.5 lg:gap-5 text-xs text-[#DDD4C6] shrink-0">
            {/* Currency & Unit Switcher */}
            <div className="flex items-center gap-2 border-r border-white/15 pr-3.5">
              <div className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#C5A880]" />
                <select
                  value={currency}
                  onChange={(e) => handleCurrencyChange(e.target.value)}
                  className="bg-transparent text-xs text-[#FAF8F5] font-semibold focus:outline-none cursor-pointer [&>option]:bg-[#0A192F] [&>option]:text-white"
                >
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="AED">AED (د.إ)</option>
                </select>
              </div>

              <button
                onClick={handleUnitToggle}
                className="px-1.5 py-0.5 rounded text-[9px] uppercase font-mono tracking-wider bg-white/10 hover:bg-white/20 text-[#FAF8F5] border border-white/20 transition-colors font-bold"
                title="Toggle Area Units"
              >
                {unit === "sqft" ? "SF" : "M²"}
              </button>
            </div>

            {/* Ambient Sound */}
            <AmbientSoundToggle />

            {/* Institutional Certification - Shown on large displays */}
            <span className="hidden xl:flex items-center gap-1.5 hover:text-white transition-colors cursor-default font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" /> Greystar Certified
            </span>

            <span className="hidden xl:inline text-white/20">|</span>

            {/* Direct Phone */}
            <a href="tel:+18005557837" className="hover:text-white transition-colors flex items-center gap-1.5 font-medium whitespace-nowrap">
              <PhoneCall className="w-3.5 h-3.5 text-[#C5A880]" /> +1 (800) 555-7837
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar - Zero Overlap at ANY Screen Width */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ease-out w-full max-w-full overflow-hidden ${
          scrolled
            ? "bg-[#FAF8F5]/98 backdrop-blur-xl shadow-md border-b border-[#E4DCD0] py-2.5"
            : "bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE3D9] py-3 sm:py-3.5"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 w-full">
          {/* Brand Logo - Fixed on left, gracefully responsive */}
          <Link href="/" className="shrink-0 cursor-pointer transition-opacity hover:opacity-95 mr-1 sm:mr-2 max-w-[65%] sm:max-w-none">
            <Logo size="md" variant="dark" />
          </Link>

          {/* Desktop Navigation Links - Perfectly Spaced with Zero Overlap Guarantee */}
          <nav className="hidden xl:flex items-center justify-center gap-2.5 2xl:gap-6 flex-1 min-w-0 px-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[11px] 2xl:text-xs font-semibold tracking-[0.1em] 2xl:tracking-[0.14em] uppercase py-1.5 px-1.5 2xl:px-2.5 transition-all whitespace-nowrap flex items-center gap-1 relative shrink-0 ${
                    isActive
                      ? "text-[#0A192F] font-bold after:content-[''] after:absolute after:bottom-0 after:left-1 after:right-1 after:h-[2px] after:bg-[#C5A880]"
                      : "text-[#545B65] hover:text-[#0A192F]"
                  }`}
                >
                  {link.hasLock && <Lock className="w-3 h-3 text-[#C5A880] shrink-0" />}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTAs - Responsive without any horizontal overflow */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-2.5 shrink-0 ml-auto">
            {/* Favorites Button */}
            <button
              onClick={handleOpenSaved}
              className="relative p-2 sm:p-2.5 rounded-xl border border-[#E4DCD0] text-[#383E46] hover:text-[#0A192F] hover:border-[#C5A880] hover:bg-[#F3EFEA] transition-all cursor-pointer active:scale-95 shrink-0"
              title="Saved Properties"
            >
              <Heart className={`w-4 h-4 ${savedCount > 0 ? "text-[#C5A880] fill-[#C5A880]" : ""}`} />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0A192F] text-[#FAF8F5] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Client Portal Button - Shown on sm+ screens */}
            <button
              onClick={handleOpenPortal}
              className="hidden sm:flex items-center gap-1.5 px-2.5 2xl:px-3.5 py-2 rounded-xl border border-[#0A192F]/20 bg-white hover:bg-[#F3EFEA] text-[#0A192F] text-xs font-semibold uppercase tracking-[0.08em] transition-all shadow-2xs hover:border-[#C5A880] cursor-pointer shrink-0"
            >
              <Key className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
              <span className="hidden 2xl:inline">Client </span>
              <span>Portal</span>
            </button>

            {/* Primary Action Button - Hidden on mobile screens to prevent navbar overflow, prominently featured in Mobile Drawer */}
            <button
              onClick={handleOpenSchedule}
              className="btn-shimmer hidden md:inline-flex px-3 sm:px-3.5 2xl:px-4 py-2 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] font-semibold text-xs uppercase tracking-[0.08em] transition-all shadow-sm active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
            >
              Private Advisory
            </button>

            {/* Mobile / Tablet Drawer Toggle - Always visible and perfectly fitted on mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-white border border-[#E4DCD0] text-[#0A192F] hover:border-[#C5A880] transition-colors cursor-pointer shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#C5A880]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[96px] z-50 bg-[#FAF8F5] border-t border-[#E4DCD0] p-6 flex flex-col justify-between xl:hidden animate-fade-in overflow-y-auto">
          <div className="space-y-4">
            <div className="text-xs uppercase font-mono tracking-widest text-[#C5A880] font-bold">
              Portfolio Navigation
            </div>

            <div className="flex flex-col space-y-2">
              <Link
                href="/collection"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-left text-lg font-serif py-3 border-b border-[#E4DCD0] flex items-center justify-between ${pathname === "/collection" ? "text-[#0A192F] font-bold" : "text-[#545B65]"}`}
              >
                <span>Browse All Collections</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880]" />
              </Link>
              <Link
                href="/vault"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-left text-lg font-serif py-3 border-b border-[#E4DCD0] flex items-center justify-between ${pathname === "/vault" ? "text-[#0A192F] font-bold" : "text-[#545B65]"}`}
              >
                <span>The Sovereign Vault</span>
                <span className="text-xs uppercase font-mono text-[#C5A880] bg-[#0A192F] px-2 py-0.5 rounded font-bold">NDA</span>
              </Link>
              <Link
                href="/management"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-left text-lg font-serif py-3 border-b border-[#E4DCD0] flex items-center justify-between ${pathname === "/management" ? "text-[#0A192F] font-bold" : "text-[#545B65]"}`}
              >
                <span>Institutional Management</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880]" />
              </Link>
              <Link
                href="/financials"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-left text-lg font-serif py-3 border-b border-[#E4DCD0] flex items-center justify-between ${pathname === "/financials" ? "text-[#0A192F] font-bold" : "text-[#545B65]"}`}
              >
                <span>Yield Intelligence & Financials</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880]" />
              </Link>
              <Link
                href="/destinations"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-left text-lg font-serif py-3 border-b border-[#E4DCD0] flex items-center justify-between ${pathname === "/destinations" ? "text-[#0A192F] font-bold" : "text-[#545B65]"}`}
              >
                <span>Global Flagship Chambers</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880]" />
              </Link>
              <Link
                href="/advisory"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-left text-lg font-serif py-3 border-b border-[#E4DCD0] flex items-center justify-between ${pathname === "/advisory" ? "text-[#0A192F] font-bold" : "text-[#545B65]"}`}
              >
                <span>Family Office & Private Advisory</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880]" />
              </Link>
            </div>
          </div>

          <div className="pt-6 space-y-3 border-t border-[#E4DCD0] mt-6">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenPortal();
              }}
              className="w-full py-3 rounded-xl bg-white border border-[#E4DCD0] text-[#0A192F] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Key className="w-4 h-4 text-[#C5A880]" />
              Resident & Owner Portal
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenSchedule();
              }}
              className="w-full py-3 rounded-xl bg-[#0A192F] text-[#FAF8F5] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              Schedule Advisory Consultation
            </button>
          </div>
        </div>
      )}

      {/* Internal Modals as Fallback when page does not manage them */}
      {internalPortalOpen && (
        <PortalModal onClose={() => setInternalPortalOpen(false)} />
      )}
      {internalScheduleOpen && (
        <ScheduleModal onClose={() => setInternalScheduleOpen(false)} />
      )}
      {internalSavedOpen && (
        <SavedDrawer onClose={() => setInternalSavedOpen(false)} />
      )}
    </>
  );
}
