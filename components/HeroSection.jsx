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
  Sparkles
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
    
    // Seamless Multipage Navigation: Transition directly to /collection with query parameters
    const params = new URLSearchParams();
    if (location && location !== "all") params.set("destination", location);
    if (propertyType && propertyType !== "all") params.set("style", propertyType);
    if (priceRange && priceRange !== "all") params.set("price", priceRange);
    if (activeTab) params.set("tab", activeTab);

    addToast(`Filtering flagship collection for ${location === "all" ? "Global Portfolios" : location}`, "success", "Search Executed");
    router.push(`/collection?${params.toString()}`);
  };

  return (
    <div className="relative min-h-[auto] flex items-center justify-center pt-3 sm:pt-5 lg:pt-6 pb-6 sm:pb-8 overflow-hidden">
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

      {/* Main Centered Content Container - Perfectly Proportioned so Bottom Metrics are 100% Visible */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center w-full">
        {/* Subtle Institutional Badge with Gentle Float */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#0A192F]/90 border border-[#C5A880]/50 backdrop-blur-xl mb-2 sm:mb-2.5 shadow-md animate-float-gentle">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#C5A880] animate-ping" />
          <span className="text-[9px] sm:text-[11px] uppercase font-mono tracking-[0.16em] sm:tracking-[0.2em] text-[#EADDC9] font-semibold">
            Real Estate & Institutional Asset Architecture
          </span>
        </div>

        {/* Headline - Editorial Luxury Typography with Controlled Height */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[44px] font-serif font-normal tracking-tight text-[#FAF8F5] leading-[1.12] mb-1.5 sm:mb-2.5 drop-shadow-md animate-fade-up">
          Where Architectural Mastery <br className="hidden sm:inline" />
          <span className="italic font-light text-[#C5A880] underline decoration-[#C5A880]/30 underline-offset-4 sm:underline-offset-6">
            Meets Unrivaled Living.
          </span>
        </h1>

        {/* Subtitle with High-Contrast Typography & Balanced Line Length */}
        <p className="max-w-xl mx-auto text-[11px] sm:text-xs lg:text-sm text-[#EAE3D9] font-sans font-normal leading-relaxed mb-3 sm:mb-4 text-balance animate-fade-up [animation-delay:150ms]">
          Curated private estates, visionary global penthouses, and institutional property management designed to compound generational wealth.
        </p>

        {/* Minimalist Search Engine Card with Frosted Depth */}
        <div className="w-full bg-[#FAF8F5]/98 backdrop-blur-2xl border border-[#E4DCD0] rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 lg:p-5 shadow-2xl shadow-[#0A192F]/20 text-[#1A1D20] transition-all duration-500 ease-out hover:shadow-3xl animate-fade-up [animation-delay:250ms]">
          {/* Mode Switcher Tabs with Silky Transitions */}
          <div className="flex items-center gap-1 sm:gap-2 border-b border-[#E4DCD0] pb-2 mb-2.5 sm:mb-3 overflow-x-auto no-scrollbar flex-nowrap -mx-1 px-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`shrink-0 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold tracking-[0.06em] uppercase transition-all duration-300 whitespace-nowrap active:scale-95 cursor-pointer ${
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

          {/* Search Inputs Form: ALL 3 FIELDS ARE DROPDOWNS AS REQUESTED */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 text-left">
            {/* Field 1: Destination Dropdown */}
            <div>
              <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.12em] text-[#545B65] mb-1 font-bold">
                Destination
              </label>
              <div className="flex items-center bg-white border border-[#E4DCD0] rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 focus-within:border-[#C5A880] focus-within:ring-2 focus-within:ring-[#C5A880]/20 transition-all shadow-2xs">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880] mr-1.5 sm:mr-2 shrink-0" />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm font-medium text-[#1A1D20] focus:outline-none w-full cursor-pointer [&>option]:bg-white [&>option]:text-[#1A1D20]"
                >
                  <option value="all">All Global Destinations</option>
                  <option value="Manhattan, New York">Manhattan, New York</option>
                  <option value="Los Angeles, California">Los Angeles, California</option>
                  <option value="Miami, Florida">Miami & Islands, Florida</option>
                  <option value="London, United Kingdom">Central London, United Kingdom</option>
                  <option value="Aspen, Colorado">Aspen & Snowmass, Colorado</option>
                  <option value="Dubai, United Arab Emirates">Dubai, United Arab Emirates</option>
                  <option value="Monaco">Monaco & French Riviera</option>
                  <option value="Paris, France">Paris, France</option>
                  <option value="Lake Como, Italy">Lake Como & Milan, Italy</option>
                  <option value="Tokyo, Japan">Tokyo, Japan</option>
                  <option value="Geneva, Switzerland">Geneva, Switzerland</option>
                  <option value="Bahamas">Bahamas & Sovereign Cays</option>
                </select>
              </div>
            </div>

            {/* Field 2: Architectural Style Dropdown */}
            <div>
              <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.12em] text-[#545B65] mb-1 font-bold">
                Architectural Style
              </label>
              <div className="flex items-center bg-white border border-[#E4DCD0] rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 focus-within:border-[#C5A880] focus-within:ring-2 focus-within:ring-[#C5A880]/20 transition-all shadow-2xs">
                <Home className="w-3.5 h-3.5 text-[#C5A880] mr-1.5 sm:mr-2 shrink-0" />
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm font-medium text-[#1A1D20] focus:outline-none w-full cursor-pointer [&>option]:bg-white [&>option]:text-[#1A1D20]"
                >
                  <option value="all">All Architectural Styles</option>
                  <option value="Penthouses">Modern Penthouses</option>
                  <option value="Waterfront">Waterfront & Island Compounds</option>
                  <option value="Architectural">Contemporary Villas</option>
                  <option value="Historic">Historic & Listed Estates</option>
                  <option value="New Developments">New Developments</option>
                </select>
              </div>
            </div>

            {/* Field 3: Valuation Range Dropdown */}
            <div>
              <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.12em] text-[#545B65] mb-1 font-bold">
                Valuation Bracket
              </label>
              <div className="flex items-center bg-white border border-[#E4DCD0] rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 focus-within:border-[#C5A880] focus-within:ring-2 focus-within:ring-[#C5A880]/20 transition-all shadow-2xs">
                <DollarSign className="w-3.5 h-3.5 text-[#C5A880] mr-1.5 sm:mr-2 shrink-0" />
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm font-medium text-[#1A1D20] focus:outline-none w-full cursor-pointer [&>option]:bg-white [&>option]:text-[#1A1D20]"
                >
                  <option value="all">Any Valuation Bracket</option>
                  <option value="under10">$5M – $10M</option>
                  <option value="10to25">$10M – $25M</option>
                  <option value="25to50">$25M – $50M</option>
                  <option value="over50">$50M+ Trophy Sovereign Assets</option>
                </select>
              </div>
            </div>

            {/* Action Search Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2 sm:py-2.5 px-4 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-98 cursor-pointer group"
              >
                <Search className="w-3.5 h-3.5 text-[#C5A880] transition-transform group-hover:scale-110" />
                <span>Search Portfolio</span>
              </button>
            </div>
          </form>

          {/* Institutional Trust Line */}
          <div className="mt-2.5 pt-2 border-t border-[#E4DCD0] flex flex-wrap items-center justify-center gap-2.5 sm:gap-5 text-[9px] sm:text-[11px] text-[#545B65]">
            <span className="flex items-center gap-1 font-medium hover:text-[#0A192F] transition-colors cursor-default">
              <Check className="w-3 h-3 text-[#C5A880]" /> Off-Market Pocket Access
            </span>
            <span className="flex items-center gap-1 font-medium hover:text-[#0A192F] transition-colors cursor-default">
              <Check className="w-3 h-3 text-[#C5A880]" /> Greystar-Grade Care
            </span>
            <span className="flex items-center gap-1 font-medium hover:text-[#0A192F] transition-colors cursor-default">
              <Check className="w-3 h-3 text-[#C5A880]" /> Institutional Protection
            </span>
          </div>
        </div>

        {/* Live Portfolio Metrics Strip - Perfectly Proportioned 2x2 Grid on Mobile, 4-Col Row on Desktop */}
        <div className="mt-3.5 sm:mt-5 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5 w-full max-w-full overflow-hidden">
          <button
            onClick={() => onOpenStatModal && onOpenStatModal("volume")}
            className="w-full min-w-0 min-h-[76px] sm:min-h-[86px] p-3 sm:p-4 rounded-2xl bg-[#FAF8F5]/98 border border-[#E4DCD0] shadow-sm backdrop-blur-md text-left transition-all hover:-translate-y-0.5 hover:border-[#C5A880] cursor-pointer group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between w-full">
              <p className="text-xl sm:text-2xl font-serif text-[#0A192F] font-bold tracking-tight">
                $5.2B<span className="text-[#C5A880]">+</span>
              </p>
              <ArrowUpRight className="w-4 h-4 text-[#8F949B] group-hover:text-[#C5A880] transition-colors shrink-0 ml-1" />
            </div>
            <p className="text-[10px] sm:text-xs font-mono tracking-wider uppercase text-[#545B65] mt-1 font-semibold truncate w-full">
              Volume Closed
            </p>
          </button>

          <button
            onClick={() => onOpenStatModal && onOpenStatModal("occupancy")}
            className="w-full min-w-0 min-h-[76px] sm:min-h-[86px] p-3 sm:p-4 rounded-2xl bg-[#FAF8F5]/98 border border-[#E4DCD0] shadow-sm backdrop-blur-md text-left transition-all hover:-translate-y-0.5 hover:border-[#C5A880] cursor-pointer group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between w-full">
              <p className="text-xl sm:text-2xl font-serif text-[#0A192F] font-bold tracking-tight">
                99.4<span className="text-[#C5A880]">%</span>
              </p>
              <ArrowUpRight className="w-4 h-4 text-[#8F949B] group-hover:text-[#C5A880] transition-colors shrink-0 ml-1" />
            </div>
            <p className="text-[10px] sm:text-xs font-mono tracking-wider uppercase text-[#545B65] mt-1 font-semibold truncate w-full">
              Portfolio Occupancy
            </p>
          </button>

          <button
            onClick={() => onOpenStatModal && onOpenStatModal("flagships")}
            className="w-full min-w-0 min-h-[76px] sm:min-h-[86px] p-3 sm:p-4 rounded-2xl bg-[#FAF8F5]/98 border border-[#E4DCD0] shadow-sm backdrop-blur-md text-left transition-all hover:-translate-y-0.5 hover:border-[#C5A880] cursor-pointer group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between w-full">
              <p className="text-xl sm:text-2xl font-serif text-[#0A192F] font-bold tracking-tight">
                14
              </p>
              <ArrowUpRight className="w-4 h-4 text-[#8F949B] group-hover:text-[#C5A880] transition-colors shrink-0 ml-1" />
            </div>
            <p className="text-[10px] sm:text-xs font-mono tracking-wider uppercase text-[#545B65] mt-1 font-semibold truncate w-full">
              Flagship Chambers
            </p>
          </button>

          <button
            onClick={() => onOpenStatModal && onOpenStatModal("placement")}
            className="w-full min-w-0 min-h-[76px] sm:min-h-[86px] p-3 sm:p-4 rounded-2xl bg-[#FAF8F5]/98 border border-[#E4DCD0] shadow-sm backdrop-blur-md text-left transition-all hover:-translate-y-0.5 hover:border-[#C5A880] cursor-pointer group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between w-full">
              <p className="text-xl sm:text-2xl font-serif text-[#0A192F] font-bold tracking-tight">
                18 <span className="text-xs sm:text-sm text-[#545B65] font-sans font-normal">Days</span>
              </p>
              <ArrowUpRight className="w-4 h-4 text-[#8F949B] group-hover:text-[#C5A880] transition-colors shrink-0 ml-1" />
            </div>
            <p className="text-[10px] sm:text-xs font-mono tracking-wider uppercase text-[#545B65] mt-1 font-semibold truncate w-full">
              Avg. Placement
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}