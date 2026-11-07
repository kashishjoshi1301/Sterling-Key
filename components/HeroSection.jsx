"use client";

import React, { useState } from "react";
import { Search, MapPin, Home, DollarSign, Check, ArrowUpRight } from "lucide-react";
import { useToast } from "./Toast";

export default function HeroSection({ onSearchSubmit, onSelectTab, onOpenStatModal }) {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("buy");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit({
        tab: activeTab,
        location,
        propertyType,
        priceRange,
      });
      addToast(
        `Filtered portfolio: ${location || "All destinations"}, ${
          propertyType === "all" ? "All architectural styles" : propertyType
        }`,
        "info",
        "Search Calibrated"
      );
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (onSelectTab) {
      onSelectTab(tab);
    }
  };

  return (
    <div className="relative min-h-[82vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-4 pb-8 transition-all duration-700 ease-out">
      {/* 
        Continuous Looping Real Luxury Architectural Video 
        Plays indefinitely in an infinite loop without pausing on modal triggers
      */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=85"
          className="w-full h-full object-cover scale-105 transition-transform duration-1000 ease-out filter brightness-[0.7] contrast-105"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-4286-large.mp4"
            type="video/mp4"
          />
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            type="video/mp4"
          />
        </video>

        {/* Cinematic Vignette Overlay: Deepens contrast so typography stays pristine */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060709]/85 via-[#060709]/60 to-[#060709]" />
      </div>

      {/* Hero Content Container - Majestic & Expansive Width */}
      <div className="relative z-10 w-full max-w-5xl xl:max-w-6xl mx-auto text-center">
        {/* Minimalist Sub-Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-[#0A0C10]/80 backdrop-blur-md mb-4 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-stone-300 animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.24em] font-medium text-stone-300">
            Real Estate & Institutional Asset Architecture
          </span>
        </div>

        {/* Main Editorial Headline - Compacted line height & proportional font sizing */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-white leading-[1.1] mb-3.5 animate-fade-in-slow">
          Where Architectural Mastery <br />
          <span className="italic font-light text-stone-300">Meets Unrivaled Living.</span>
        </h1>

        {/* Subtitle - Sleek & concise */}
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-neutral-300 font-sans font-normal leading-relaxed mb-6 text-balance">
          Curated private estates, visionary global penthouses, and institutional-grade property management designed to protect and compound generational wealth.
        </p>

        {/* Minimalist Search Engine Card - Compact Padding & Slower Transitions */}
        <div className="w-full bg-[#0B0D13]/90 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-3.5 sm:p-5 shadow-2xl shadow-black/80 transition-all duration-700 ease-out">
          {/* Mode Switcher Tabs */}
          <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2 border-b border-white/[0.06] pb-2.5 mb-4 overflow-x-auto no-scrollbar">
            {[
              { id: "buy", label: "Buy Collection" },
              { id: "rent", label: "Luxury Rentals" },
              { id: "developments", label: "Developments" },
              { id: "management", label: "Asset Management" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-[0.08em] uppercase transition-all duration-500 whitespace-nowrap ${
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
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-left">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.14em] text-neutral-400 mb-1 font-medium">
                Destination
              </label>
              <div className="flex items-center bg-[#060709] border border-white/10 rounded-xl px-3 py-2 focus-within:border-white/40 transition-colors duration-500">
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
              <label className="block text-[10px] uppercase tracking-[0.14em] text-neutral-400 mb-1 font-medium">
                Style
              </label>
              <div className="flex items-center bg-[#060709] border border-white/10 rounded-xl px-3 py-2 focus-within:border-white/40 transition-colors duration-500">
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
              <label className="block text-[10px] uppercase tracking-[0.14em] text-neutral-400 mb-1 font-medium">
                Price Bracket
              </label>
              <div className="flex items-center bg-[#060709] border border-white/10 rounded-xl px-3 py-2 focus-within:border-white/40 transition-colors duration-500">
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
                  <option value="ultra60">$60,000,000+ Sovereign Tier</option>
                </select>
              </div>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-stone-200 text-neutral-950 font-semibold text-xs tracking-[0.08em] uppercase flex items-center justify-center gap-2 transition-all duration-500 active:scale-95"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Quick Highlight Tags */}
          <div className="mt-3 pt-2.5 border-t border-white/[0.04] flex flex-wrap items-center justify-between text-[11px] text-neutral-400 gap-2">
            <span className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-stone-300" /> Off-Market Pocket Listings
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-stone-300" /> Greystar-Grade Property Management
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-stone-300" /> Institutional Asset Protection
            </span>
          </div>
        </div>

        {/* 
          Interactive Stat Cards with Click-to-Inspect
          Clicking any card opens its detailed modal while the background video continues looping!
        */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 border-t border-white/[0.08] pt-5">
          <button
            onClick={() => onOpenStatModal && onOpenStatModal("volume")}
            className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-transparent hover:border-white/15 text-left transition-all duration-500 group"
          >
            <div className="flex items-center justify-between">
              <div className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                $5.2B<span className="text-stone-400 font-sans font-light text-base">+</span>
              </div>
              <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-white transition-colors duration-500" />
            </div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-neutral-400 mt-0.5">
              Volume Closed & Managed
            </div>
          </button>

          <button
            onClick={() => onOpenStatModal && onOpenStatModal("occupancy")}
            className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-transparent hover:border-white/15 text-left transition-all duration-500 group"
          >
            <div className="flex items-center justify-between">
              <div className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                99.4<span className="text-stone-400 font-sans font-light text-base">%</span>
              </div>
              <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-white transition-colors duration-500" />
            </div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-neutral-400 mt-0.5">
              Portfolio Occupancy
            </div>
          </button>

          <button
            onClick={() => onOpenStatModal && onOpenStatModal("offices")}
            className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-transparent hover:border-white/15 text-left transition-all duration-500 group"
          >
            <div className="flex items-center justify-between">
              <div className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                14
              </div>
              <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-white transition-colors duration-500" />
            </div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-neutral-400 mt-0.5">
              Flagship Chambers
            </div>
          </button>

          <button
            onClick={() => onOpenStatModal && onOpenStatModal("placement")}
            className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-transparent hover:border-white/15 text-left transition-all duration-500 group"
          >
            <div className="flex items-center justify-between">
              <div className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                18 <span className="text-stone-400 font-sans font-light text-xs">Days</span>
              </div>
              <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-white transition-colors duration-500" />
            </div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-neutral-400 mt-0.5">
              Qualified Placement
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
