"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Search, 
  MapPin, 
  Home, 
  DollarSign, 
  Check, 
  ArrowUpRight,
  Sparkles,
  ChevronDown
} from "lucide-react";
import { useToast } from "./Toast";

export default function HeroSection({ onSearchSubmit, onSelectTab, onOpenStatModal }) {
  const router = useRouter();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("buy");
  const [location, setLocation] = useState("all");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  // Background Real Estate Video Autoplay & Lifecycle Management
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Enforce muted & playsInline for strict browser autoplay policies
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

    video.load();
    playVideo();

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
    { id: "developments", label: "Developments", mobileLabel: "Develop" },
    { id: "management", label: "Asset Management", mobileLabel: "Manage" }
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
    }
    
    const params = new URLSearchParams();
    if (location && location !== "all") params.set("destination", location);
    if (propertyType && propertyType !== "all") params.set("style", propertyType);
    if (priceRange && priceRange !== "all") params.set("price", priceRange);
    if (activeTab) params.set("tab", activeTab);

    addToast(`Filtering flagship collection for ${location === "all" ? "Global Portfolios" : location}`, "success", "Search Executed");
    router.push(`/collection?${params.toString()}`);
  };

  return (
    <div className="relative min-h-[auto] flex items-center justify-center pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 overflow-hidden">
      {/* Background Architectural Video */}
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
          <source src="/videos/hero-drone.mp4?v=2" type="video/mp4" />
        </video>

        {/* Sophisticated Luxury Multi-Layer Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#0A192F]/45 to-[#0A192F]/65 pointer-events-none" />
      </div>

      {/* Main Centered Content Container with Generous Breathing Room */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center w-full">
        {/* Subtle Institutional Badge */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-[#0A192F]/90 border border-[#C5A880]/50 backdrop-blur-xl mb-3.5 sm:mb-4 shadow-md animate-float-gentle">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#C5A880] animate-ping" />
          <span className="text-[9px] sm:text-[11px] uppercase font-mono tracking-[0.16em] sm:tracking-[0.2em] text-[#EADDC9] font-semibold">
            Real Estate & Institutional Asset Architecture
          </span>
        </div>

        {/* Headline with Relaxed Line-Height and Spacing */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-[#FAF8F5] leading-snug sm:leading-tight mb-3 sm:mb-4 drop-shadow-md animate-fade-up">
          Where Architectural Mastery <br className="hidden sm:inline" />
          <span className="italic font-light text-[#C5A880] underline decoration-[#C5A880]/30 underline-offset-4 sm:underline-offset-6">
            Meets Unrivaled Living.
          </span>
        </h1>

        {/* Subtitle with High-Contrast Typography & Generous Spacing */}
        <p className="max-w-xl mx-auto text-xs sm:text-sm lg:text-base text-[#EAE3D9] font-sans font-normal leading-relaxed mb-6 sm:mb-8 text-balance animate-fade-up [animation-delay:150ms]">
          Curated private estates, visionary global penthouses, and institutional property management designed to compound generational wealth.
        </p>

        {/* Minimalist Search Engine Card with Spacious Padding */}
        <div className="w-full bg-[#FAF8F5]/98 backdrop-blur-2xl border border-[#E4DCD0] rounded-3xl p-5 sm:p-6 lg:p-7 shadow-2xl shadow-[#0A192F]/20 text-[#1A1D20] transition-all duration-500 ease-out hover:shadow-3xl animate-fade-up [animation-delay:250ms]">
          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2 border-b border-[#E4DCD0] pb-3 mb-4 sm:mb-5 overflow-x-auto no-scrollbar flex-nowrap -mx-1 px-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`shrink-0 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-semibold tracking-[0.06em] uppercase transition-all duration-300 whitespace-nowrap active:scale-95 cursor-pointer ${
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

          {/* Search Inputs Form with Spacious Balanced Proportions */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.18fr_1.18fr_1.1fr_auto] gap-3 sm:gap-3.5 text-left items-end">
            {/* Field 1: Destination Dropdown */}
            <div>
              <label className="block text-[11px] sm:text-xs uppercase tracking-[0.12em] text-[#545B65] mb-1.5 font-bold">
                Destination
              </label>
              <div className="flex items-center justify-between bg-white border border-[#E4DCD0] rounded-xl px-3 py-2.5 sm:py-3 focus-within:border-[#C5A880] focus-within:ring-2 focus-within:ring-[#C5A880]/20 transition-all shadow-2xs relative">
                <div className="flex items-center min-w-0 flex-1 mr-1">
                  <MapPin className="w-4 h-4 text-[#C5A880] mr-2 shrink-0" />
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-transparent text-xs sm:text-[13px] font-medium text-[#1A1D20] focus:outline-none w-full cursor-pointer appearance-none truncate pr-1 [&>option]:bg-white [&>option]:text-[#1A1D20]"
                  >
                    <option value="all">All Destinations</option>
                    <option value="Manhattan">Manhattan, NY</option>
                    <option value="Los Angeles">Los Angeles, CA</option>
                    <option value="Miami">Miami & Islands, FL</option>
                    <option value="London">Central London, UK</option>
                    <option value="Aspen">Aspen & Snowmass, CO</option>
                    <option value="Dubai">Dubai, UAE</option>
                    <option value="Monaco">Monaco & French Riviera</option>
                    <option value="Paris">Paris, France</option>
                    <option value="Lake Como">Lake Como & Milan</option>
                    <option value="Tokyo">Tokyo, Japan</option>
                    <option value="Geneva">Geneva, Switzerland</option>
                    <option value="Bahamas">Bahamas & Sovereign Cays</option>
                  </select>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#747D88] shrink-0 pointer-events-none" />
              </div>
            </div>

            {/* Field 2: Architectural Style Dropdown */}
            <div>
              <label className="block text-[11px] sm:text-xs uppercase tracking-[0.12em] text-[#545B65] mb-1.5 font-bold">
                Architectural Style
              </label>
              <div className="flex items-center justify-between bg-white border border-[#E4DCD0] rounded-xl px-3 py-2.5 sm:py-3 focus-within:border-[#C5A880] focus-within:ring-2 focus-within:ring-[#C5A880]/20 transition-all shadow-2xs relative">
                <div className="flex items-center min-w-0 flex-1 mr-1">
                  <Home className="w-4 h-4 text-[#C5A880] mr-2 shrink-0" />
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="bg-transparent text-xs sm:text-[13px] font-medium text-[#1A1D20] focus:outline-none w-full cursor-pointer appearance-none truncate pr-1 [&>option]:bg-white [&>option]:text-[#1A1D20]"
                  >
                    <option value="all">All Styles</option>
                    <option value="Penthouses">Modern Penthouses</option>
                    <option value="Waterfront">Waterfront & Islands</option>
                    <option value="Architectural">Contemporary Villas</option>
                    <option value="Historic">Historic Estates</option>
                    <option value="New Developments">New Developments</option>
                  </select>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#747D88] shrink-0 pointer-events-none" />
              </div>
            </div>

            {/* Field 3: Valuation Range Dropdown */}
            <div>
              <label className="block text-[11px] sm:text-xs uppercase tracking-[0.12em] text-[#545B65] mb-1.5 font-bold">
                Valuation Bracket
              </label>
              <div className="flex items-center justify-between bg-white border border-[#E4DCD0] rounded-xl px-3 py-2.5 sm:py-3 focus-within:border-[#C5A880] focus-within:ring-2 focus-within:ring-[#C5A880]/20 transition-all shadow-2xs relative">
                <div className="flex items-center min-w-0 flex-1 mr-1">
                  <DollarSign className="w-4 h-4 text-[#C5A880] mr-2 shrink-0" />
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="bg-transparent text-xs sm:text-[13px] font-medium text-[#1A1D20] focus:outline-none w-full cursor-pointer appearance-none truncate pr-1 [&>option]:bg-white [&>option]:text-[#1A1D20]"
                  >
                    <option value="all">Any Valuation</option>
                    <option value="under10">$5M – $10M</option>
                    <option value="10to25">$10M – $25M</option>
                    <option value="25to50">$25M – $50M</option>
                    <option value="over50">$50M+ Trophy Assets</option>
                  </select>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#747D88] shrink-0 pointer-events-none" />
              </div>
            </div>

            {/* Action Search Button */}
            <div className="w-full">
              <button
                type="submit"
                className="w-full py-2.5 sm:py-3 px-6 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-98 cursor-pointer group whitespace-nowrap"
              >
                <Search className="w-4 h-4 text-[#C5A880] transition-transform group-hover:scale-110" />
                <span>Search Portfolio</span>
              </button>
            </div>
          </form>

          {/* Institutional Trust Line */}
          <div className="mt-4 pt-3.5 border-t border-[#E4DCD0] flex flex-wrap items-center justify-center gap-3.5 sm:gap-6 text-[10px] sm:text-xs text-[#545B65]">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#C5A880]" /> Off-Market Pocket Access
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#C5A880]" /> Greystar-Grade Care
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#C5A880]" /> Institutional Protection
            </span>
          </div>
        </div>

        {/* Live Metrics Quad Cards with Generous Spacing */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8">
          {/* Stat 1 */}
          <button
            onClick={() => onOpenStatModal && onOpenStatModal("volume")}
            className="p-3.5 sm:p-5 rounded-2xl bg-[#FAF8F5]/90 backdrop-blur-xl border border-[#E4DCD0] text-left hover:border-[#C5A880] hover:shadow-md transition-all group cursor-pointer active:scale-98"
          >
            <div className="flex items-baseline justify-between">
              <div className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#0A192F] group-hover:text-[#C5A880] transition-colors">
                $5.2B<span className="text-[#C5A880] font-sans text-lg">+</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#545B65] group-hover:text-[#C5A880] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <div className="text-[10px] sm:text-xs uppercase font-mono tracking-wider text-[#545B65] mt-1 font-semibold">
              Volume Closed
            </div>
          </button>

          {/* Stat 2 */}
          <button
            onClick={() => onOpenStatModal && onOpenStatModal("occupancy")}
            className="p-3.5 sm:p-5 rounded-2xl bg-[#FAF8F5]/90 backdrop-blur-xl border border-[#E4DCD0] text-left hover:border-[#C5A880] hover:shadow-md transition-all group cursor-pointer active:scale-98"
          >
            <div className="flex items-baseline justify-between">
              <div className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#0A192F] group-hover:text-[#C5A880] transition-colors">
                99.4<span className="text-[#C5A880] font-sans text-lg">%</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#545B65] group-hover:text-[#C5A880] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <div className="text-[10px] sm:text-xs uppercase font-mono tracking-wider text-[#545B65] mt-1 font-semibold">
              Portfolio Occupancy
            </div>
          </button>

          {/* Stat 3 */}
          <button
            onClick={() => onOpenStatModal && onOpenStatModal("destinations")}
            className="p-3.5 sm:p-5 rounded-2xl bg-[#FAF8F5]/90 backdrop-blur-xl border border-[#E4DCD0] text-left hover:border-[#C5A880] hover:shadow-md transition-all group cursor-pointer active:scale-98"
          >
            <div className="flex items-baseline justify-between">
              <div className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#0A192F] group-hover:text-[#C5A880] transition-colors">
                12<span className="text-[#C5A880] font-sans text-lg">+</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#545B65] group-hover:text-[#C5A880] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <div className="text-[10px] sm:text-xs uppercase font-mono tracking-wider text-[#545B65] mt-1 font-semibold">
              Global Chambers
            </div>
          </button>

          {/* Stat 4 */}
          <button
            onClick={() => onOpenStatModal && onOpenStatModal("placement")}
            className="p-3.5 sm:p-5 rounded-2xl bg-[#FAF8F5]/90 backdrop-blur-xl border border-[#E4DCD0] text-left hover:border-[#C5A880] hover:shadow-md transition-all group cursor-pointer active:scale-98"
          >
            <div className="flex items-baseline justify-between">
              <div className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#0A192F] group-hover:text-[#C5A880] transition-colors">
                18 <span className="text-xs sm:text-sm font-sans font-normal text-[#545B65]">Days</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#545B65] group-hover:text-[#C5A880] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <div className="text-[10px] sm:text-xs uppercase font-mono tracking-wider text-[#545B65] mt-1 font-semibold">
              Avg. Placement
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
