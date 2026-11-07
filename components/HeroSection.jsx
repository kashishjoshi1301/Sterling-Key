"use client";

import React, { useState } from "react";
import { 
  Search, 
  MapPin, 
  Home, 
  DollarSign, 
  Check, 
  ArrowUpRight,
  ShieldAlert
} from "lucide-react";
import { useToast } from "./Toast";

export default function HeroSection({ onSearchSubmit, onSelectTab, onOpenStatModal }) {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("buy");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (onSelectTab) onSelectTab(tabId);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit({
        tab: activeTab,
        location,
        propertyType,
        priceRange
      });
      addToast(`Filtered collection for ${location || "Global Flagships"}`, "success", "Search Executed");
    }
  };

  return (
    <div className="relative min-h-[auto] sm:min-h-[82vh] flex items-center justify-center pt-2 sm:pt-4 pb-8 sm:pb-12 overflow-hidden">
      {/* Background Architectural Video - Continuously Looping */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
          className="w-full h-full object-cover scale-105 filter brightness-[0.42] contrast-[1.08] saturate-[0.92] transition-transform duration-[12000ms] ease-out"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-modern-suburban-houses-in-a-residential-area-41487-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Sophisticated Luxury Multi-Layer Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-transparent to-[#060709]/80" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#08090C]/40 to-[#08090C]/90" />
      </div>

      {/* Main Centered Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center mt-2 sm:mt-6 w-full">
        {/* Subtle Institutional Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl mb-3 sm:mb-4 animate-fade-in-slow">
          <span className="w-1.5 h-1.5 rounded-full bg-stone-300 animate-pulse" />
          <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-[0.2em] text-stone-300">
            Real Estate & Institutional Asset Architecture
          </span>
        </div>

        {/* Headline - Editorial Luxury Typography */}
        <h1 className="text-2xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-white leading-[1.15] mb-2 sm:mb-3.5 animate-fade-in-slow">
          Where Architectural Mastery <br />
          <span className="italic font-light text-stone-300">Meets Unrivaled Living.</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl mx-auto text-[11px] sm:text-sm text-neutral-300 font-sans font-normal leading-relaxed mb-4 sm:mb-6 text-balance">
          Curated private estates, visionary global penthouses, and institutional-grade property management designed to protect and compound generational wealth.
        </p>

        {/* Minimalist Search Engine Card */}
        <div className="w-full bg-[#0B0D13]/90 backdrop-blur-2xl border border-white/[0.08] rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-2xl shadow-black/80 transition-all duration-700 ease-out">
          {/* Mode Switcher Tabs - Start Aligned So First Tab Never Cuts Off on Mobile */}
          <div className="flex items-center justify-start gap-1 sm:gap-2 border-b border-white/[0.06] pb-2 mb-3.5 overflow-x-auto no-scrollbar scroll-smooth">
            {[
              { id: "buy", label: "Buy Collection" },
              { id: "rent", label: "Luxury Rentals" },
              { id: "developments", label: "Developments" },
              { id: "management", label: "Asset Management" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-medium tracking-[0.06em] sm:tracking-[0.08em] uppercase transition-all duration-500 whitespace-nowrap shrink-0 ${
                  activeTab === tab.id
                    ? "bg-white text-neutral-950 font-semibold shadow-sm"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Inputs Form */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 text-left">
            <div>
              <label className="block text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-neutral-400 mb-0.5 sm:mb-1 font-medium">
                Destination
              </label>
              <div className="flex items-center bg-[#060709] border border-white/10 rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 focus-within:border-white/40 transition-colors duration-500">
                <MapPin className="w-3.5 h-3.5 text-stone-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Bel-Air, Tribeca, Star Island..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-neutral-400 mb-0.5 sm:mb-1 font-medium">
                Style
              </label>
              <div className="flex items-center bg-[#060709] border border-white/10 rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 focus-within:border-white/40 transition-colors duration-500">
                <Home className="w-3.5 h-3.5 text-stone-400 mr-2 shrink-0" />
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="bg-transparent text-xs text-white focus:outline-none w-full cursor-pointer [&>option]:bg-[#0E1015] [&>option]:text-white"
                >
                  <option value="all">All Styles</option>
                  <option value="Penthouses">Penthouses</option>
                  <option value="Waterfront">Waterfront & Coastal</option>
                  <option value="Architectural">Modern Architectural</option>
                  <option value="Historic">Historic & Grade Listed</option>
                  <option value="New Developments">New Developments</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-neutral-400 mb-0.5 sm:mb-1 font-medium">
                Price Bracket
              </label>
              <div className="flex items-center bg-[#060709] border border-white/10 rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 focus-within:border-white/40 transition-colors duration-500">
                <DollarSign className="w-3.5 h-3.5 text-stone-400 mr-1.5 shrink-0" />
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="bg-transparent text-xs text-white focus:outline-none w-full cursor-pointer [&>option]:bg-[#0E1015] [&>option]:text-white"
                >
                  <option value="all">Any Valuation</option>
                  <option value="under10">Under $10,000,000</option>
                  <option value="10to30">$10,000,000 – $30,000,000</option>
                  <option value="30to60">$30,000,000 – $60,000,000</option>
                  <option value="ultra60">$60,000,000+ Trophy Assets</option>
                </select>
              </div>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-white hover:bg-stone-200 text-neutral-950 font-semibold py-2 px-4 rounded-xl text-xs uppercase tracking-[0.12em] transition-all duration-500 flex items-center justify-center gap-2 active:scale-95 shadow-md"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Under-Search Institutional Guarantees */}
          <div className="mt-3 pt-2.5 border-t border-white/[0.04] flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-6 text-[10px] sm:text-[11px] text-neutral-400">
            <span className="flex items-center gap-1">
              <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-stone-300" /> Off-Market Pocket Listings
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-stone-300" /> Greystar-Grade Property Management
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-stone-300" /> Institutional Asset Protection
            </span>
          </div>
        </div>

        {/* Interactive Stat Cards with Click-to-Inspect Modal */}
        <div className="mt-4 sm:mt-6 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 border-t border-white/[0.08] pt-3.5 sm:pt-5">
          <button
            onClick={() => onOpenStatModal && onOpenStatModal("volume")}
            className="p-2 sm:p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-transparent hover:border-white/15 text-left transition-all duration-500 group"
          >
            <div className="flex items-center justify-between">
              <div className="text-lg sm:text-2xl font-serif font-bold text-white tracking-tight">
                $5.2B<span className="text-stone-400 font-sans font-light text-sm sm:text-base">+</span>
              </div>
              <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-white transition-colors duration-500" />
            </div>
            <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.16em] text-neutral-400 mt-0.5">
              Volume Closed & Managed
            </div>
          </button>

          <button
            onClick={() => onOpenStatModal && onOpenStatModal("occupancy")}
            className="p-2 sm:p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-transparent hover:border-white/15 text-left transition-all duration-500 group"
          >
            <div className="flex items-center justify-between">
              <div className="text-lg sm:text-2xl font-serif font-bold text-white tracking-tight">
                99.4<span className="text-stone-400 font-sans font-light text-sm sm:text-base">%</span>
              </div>
              <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-white transition-colors duration-500" />
            </div>
            <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.16em] text-neutral-400 mt-0.5">
              Portfolio Occupancy
            </div>
          </button>

          <button
            onClick={() => onOpenStatModal && onOpenStatModal("offices")}
            className="p-2 sm:p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-transparent hover:border-white/15 text-left transition-all duration-500 group"
          >
            <div className="flex items-center justify-between">
              <div className="text-lg sm:text-2xl font-serif font-bold text-white tracking-tight">
                14
              </div>
              <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-white transition-colors duration-500" />
            </div>
            <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.16em] text-neutral-400 mt-0.5">
              Flagship Chambers
            </div>
          </button>

          <button
            onClick={() => onOpenStatModal && onOpenStatModal("placement")}
            className="p-2 sm:p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-transparent hover:border-white/15 text-left transition-all duration-500 group"
          >
            <div className="flex items-center justify-between">
              <div className="text-lg sm:text-2xl font-serif font-bold text-white tracking-tight">
                18 <span className="text-stone-400 font-sans font-light text-xs">Days</span>
              </div>
              <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-white transition-colors duration-500" />
            </div>
            <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.16em] text-neutral-400 mt-0.5">
              Qualified Placement
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}