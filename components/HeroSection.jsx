"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Search, 
  MapPin, 
  Home, 
  DollarSign, 
  Check, 
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import { useToast } from "./Toast";

export default function HeroSection({ onSearchSubmit, onSelectTab, onOpenStatModal }) {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("buy");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  // Background Real Estate Video Autoplay & Lifecycle Management
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Enforce muted & playsInline for strict browser autoplay policies (Brave, Chrome, Safari)
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("autoplay", "");

    const playVideo = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise
          .then(() => setVideoLoaded(true))
          .catch((err) => {
            console.warn("Autoplay policy delayed playback until user interaction:", err);
          });
      }
    };

    // Force load & play
    video.load();
    playVideo();

    // Auto-resume on user first interaction if browser strictly blocked initial autoplay
    const handleFirstInteraction = () => {
      if (video && video.paused) {
        video.play().catch(() => {});
      }
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });
    window.addEventListener("scroll", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
    };
  }, []);

  const tabs = [
    { id: "buy", label: "Buy Collection", mobileLabel: "Buy" },
    { id: "rent", label: "Luxury Rentals", mobileLabel: "Rent" },
    { id: "developments", label: "Developments", mobileLabel: "Developments" },
    { id: "management", label: "Asset Management", mobileLabel: "Management" }
  ];

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
    <div className="relative min-h-[auto] sm:min-h-[85vh] flex items-center justify-center pt-8 sm:pt-12 pb-16 sm:pb-24 overflow-hidden">
      {/* Background Architectural Video - Continuously Looping High-Definition Real Estate Drone Footage */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop')" }}
      >
        <video
          ref={videoRef}
          key="hero-drone-video-v2"
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          className="w-full h-full object-cover scale-105 filter brightness-[0.72] contrast-[1.08] saturate-[1.05] transition-transform duration-[20000ms] ease-out"
        >
          {/* Primary: Local zero-latency high-rise real estate & institutional property video */}
          <source src="/videos/hero-drone.mp4?v=2" type="video/mp4" />
        </video>

        {/* Sophisticated Luxury Multi-Layer Vignette (Deep Navy to Warm Ivory Canvas) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#0A192F]/45 to-[#0A192F]/65 pointer-events-none" />
      </div>

      {/* Main Centered Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center mt-2 sm:mt-4 w-full">
        {/* Subtle Institutional Badge with Gentle Float */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A192F]/85 border border-[#C5A880]/50 backdrop-blur-xl mb-4 sm:mb-5 shadow-md animate-float-gentle">
          <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-ping" />
          <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-[0.22em] text-[#EADDC9] font-medium">
            Real Estate & Institutional Asset Architecture
          </span>
        </div>

        {/* Headline - Editorial Luxury Typography */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#FAF8F5] leading-[1.12] mb-3 sm:mb-4 drop-shadow-sm animate-fade-up">
          Where Architectural Mastery <br />
          <span className="italic font-light text-[#C5A880] underline decoration-[#C5A880]/30 underline-offset-8">
            Meets Unrivaled Living.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-lg mx-auto text-xs sm:text-sm text-[#DDD4C6] font-sans font-normal leading-relaxed mb-6 sm:mb-8 text-balance animate-fade-up [animation-delay:150ms]">
          Curated private estates, visionary global penthouses, and institutional property management designed to compound generational wealth.
        </p>

        {/* Minimalist Search Engine Card with Frosted Depth */}
        <div className="w-full bg-[#FAF8F5]/95 backdrop-blur-2xl border border-[#E4DCD0] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl shadow-[#0A192F]/20 text-[#1A1D20] transition-all duration-500 ease-out hover:shadow-3xl animate-fade-up [animation-delay:250ms]">
          {/* Mode Switcher Tabs with Silky Transitions - Fully Responsive & Never Truncated */}
          <div className="flex items-center gap-1.5 sm:gap-2 border-b border-[#E4DCD0] pb-3 mb-4 overflow-x-auto no-scrollbar flex-nowrap -mx-1 px-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`shrink-0 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold tracking-[0.06em] uppercase transition-all duration-300 whitespace-nowrap active:scale-95 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#0A192F] text-[#FAF8F5] shadow-sm scale-[1.02]"
                    : "text-[#545B65] hover:text-[#0A192F] hover:bg-[#F3EFEA]"
                }`}
              >
                <span className="sm:hidden">{tab.mobileLabel}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Search Inputs Form */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
            <div>
              <label className="block text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-[#545B65] mb-1 font-semibold">
                Destination
              </label>
              <div className="flex items-center bg-white border border-[#E4DCD0] rounded-xl px-3 py-2.5 focus-within:border-[#C5A880] focus-within:ring-2 focus-within:ring-[#C5A880]/20 transition-all shadow-2xs">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880] mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Bel-Air, Tribeca, London..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent text-xs text-[#1A1D20] placeholder-[#8C95A0] focus:outline-none w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-[#545B65] mb-1 font-semibold">
                Style
              </label>
              <div className="flex items-center bg-white border border-[#E4DCD0] rounded-xl px-3 py-2.5 focus-within:border-[#C5A880] focus-within:ring-2 focus-within:ring-[#C5A880]/20 transition-all shadow-2xs">
                <Home className="w-3.5 h-3.5 text-[#C5A880] mr-2 shrink-0" />
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="bg-transparent text-xs text-[#1A1D20] focus:outline-none w-full cursor-pointer [&>option]:bg-white [&>option]:text-[#1A1D20]"
                >
                  <option value="all">All Architectural Styles</option>
                  <option value="Penthouses">Penthouses</option>
                  <option value="Waterfront">Waterfront & Coastal</option>
                  <option value="Architectural">Modern Architectural</option>
                  <option value="Historic">Historic & Listed</option>
                  <option value="New Developments">New Developments</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-[#545B65] mb-1 font-semibold">
                Price Bracket
              </label>
              <div className="flex items-center bg-white border border-[#E4DCD0] rounded-xl px-3 py-2.5 focus-within:border-[#C5A880] focus-within:ring-2 focus-within:ring-[#C5A880]/20 transition-all shadow-2xs">
                <DollarSign className="w-3.5 h-3.5 text-[#C5A880] mr-2 shrink-0" />
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="bg-transparent text-xs text-[#1A1D20] focus:outline-none w-full cursor-pointer [&>option]:bg-white [&>option]:text-[#1A1D20]"
                >
                  <option value="all">Any Valuation</option>
                  <option value="under10">$5M – $10M</option>
                  <option value="10to25">$10M – $25M</option>
                  <option value="25to50">$25M – $50M</option>
                  <option value="over50">$50M+ Trophy Assets</option>
                </select>
              </div>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 px-5 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Clean Institutional Trust Line with subtle gold checks */}
          <div className="mt-3.5 pt-3 border-t border-[#E4DCD0] flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[10px] sm:text-[11px] text-[#545B65]">
            <span className="flex items-center gap-1.5 hover:text-[#0A192F] transition-colors cursor-default">
              <Check className="w-3 h-3 text-[#C5A880]" /> Off-Market Pocket Access
            </span>
            <span className="flex items-center gap-1.5 hover:text-[#0A192F] transition-colors cursor-default">
              <Check className="w-3 h-3 text-[#C5A880]" /> Greystar-Grade Care
            </span>
            <span className="flex items-center gap-1.5 hover:text-[#0A192F] transition-colors cursor-default">
              <Check className="w-3 h-3 text-[#C5A880]" /> Institutional Protection
            </span>
          </div>
        </div>

        {/* Minimalist Luxury Stat Cards with Lift & Arrow Glide */}
        <div className="mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 border-t border-[#E4DCD0]/60 pt-5 sm:pt-7">
          <button
            onClick={() => onOpenStatModal && onOpenStatModal("volume")}
            className="luxury-card-hover p-3 sm:p-3.5 rounded-2xl bg-white/80 hover:bg-white border border-[#E4DCD0] text-left transition-all shadow-2xs group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="text-xl sm:text-2xl font-serif font-bold text-[#0A192F] tracking-tight">
                $5.2B<span className="text-[#C5A880] font-sans font-light text-sm sm:text-base">+</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#747D88] group-hover:text-[#C5A880] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-[#545B65] mt-1 font-medium">
              Volume Closed
            </div>
          </button>

          <button
            onClick={() => onOpenStatModal && onOpenStatModal("occupancy")}
            className="luxury-card-hover p-3 sm:p-3.5 rounded-2xl bg-white/80 hover:bg-white border border-[#E4DCD0] text-left transition-all shadow-2xs group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="text-xl sm:text-2xl font-serif font-bold text-[#0A192F] tracking-tight">
                99.4<span className="text-[#C5A880] font-sans font-light text-sm sm:text-base">%</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#747D88] group-hover:text-[#C5A880] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-[#545B65] mt-1 font-medium">
              Portfolio Occupancy
            </div>
          </button>

          <button
            onClick={() => onOpenStatModal && onOpenStatModal("offices")}
            className="luxury-card-hover p-3 sm:p-3.5 rounded-2xl bg-white/80 hover:bg-white border border-[#E4DCD0] text-left transition-all shadow-2xs group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="text-xl sm:text-2xl font-serif font-bold text-[#0A192F] tracking-tight">
                14
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#747D88] group-hover:text-[#C5A880] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-[#545B65] mt-1 font-medium">
              Flagship Chambers
            </div>
          </button>

          <button
            onClick={() => onOpenStatModal && onOpenStatModal("placement")}
            className="luxury-card-hover p-3 sm:p-3.5 rounded-2xl bg-white/80 hover:bg-white border border-[#E4DCD0] text-left transition-all shadow-2xs group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="text-xl sm:text-2xl font-serif font-bold text-[#0A192F] tracking-tight">
                18 <span className="text-[#C5A880] font-sans font-light text-xs">Days</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#747D88] group-hover:text-[#C5A880] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-[#545B65] mt-1 font-medium">
              Avg. Placement
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
