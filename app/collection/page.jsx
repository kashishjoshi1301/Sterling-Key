"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyModal from "@/components/PropertyModal";
import ScheduleModal from "@/components/ScheduleModal";
import ComparisonModal from "@/components/ComparisonModal";
import ComparisonBar from "@/components/ComparisonBar";
import SavedDrawer from "@/components/SavedDrawer";
import PortalModal from "@/components/PortalModal";
import ConciergeChatWidget from "@/components/ConciergeChatWidget";
import { useCurrency } from "@/components/CurrencyContext";
import { useToast } from "@/components/Toast";
import { useTransaction } from "@/components/TransactionContext";
import { PROPERTIES_DATA, formatLocation } from "@/data/mockData";
import { 
  Search, 
  MapPin, 
  Home, 
  DollarSign, 
  SlidersHorizontal, 
  Grid, 
  List, 
  Heart, 
  Share2, 
  Layers, 
  ArrowUpDown, 
  X, 
  Sparkles,
  ExternalLink,
  Calendar,
  Building,
  KeyRound,
  History
} from "lucide-react";

function parseRentalMonthly(rentalPriceStr) {
  if (!rentalPriceStr) return 0;
  const num = parseInt(rentalPriceStr.replace(/[^0-9]/g, ""), 10);
  return isNaN(num) ? 0 : num;
}

function CollectionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { formatRawPrice, formatArea } = useCurrency();
  const { addToast } = useToast();
  const { isBought, isRented, buyProperty, rentProperty, releaseProperty } = useTransaction();

  // Read initial query params
  const initialDestination = searchParams.get("destination") || "all";
  const initialStyle = searchParams.get("style") || "all";
  const initialPrice = searchParams.get("price") || "all";
  const rawTab = searchParams.get("tab");
  const initialTab = rawTab === "rent" ? "rent" : "buy";

  // Filter States - ALL DROPDOWNS & TABS
  const [activeTab, setActiveTab] = useState(initialTab); // 'buy' | 'rent'
  const [destination, setDestination] = useState(initialDestination);
  const [style, setStyle] = useState(initialStyle);
  const [priceBracket, setPriceBracket] = useState(initialPrice);
  const [bedrooms, setBedrooms] = useState("all");
  const [sortBy, setSortBy] = useState("curated");
  const [viewMode, setViewMode] = useState("list"); // List view is spacious and accessible

  // Modals & Drawers
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [tourProperty, setTourProperty] = useState(null);
  const [compareIds, setCompareIds] = useState([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [savedIds, setSavedIds] = useState([]);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);

  // Recently Viewed State (Persisted in localStorage)
  const [recentlyViewedIds, setRecentlyViewedIds] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sk_recently_viewed_portfolio");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setRecentlyViewedIds(parsed);
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const trackViewedProperty = (id) => {
    try {
      const updated = [id, ...recentlyViewedIds.filter((item) => item !== id)].slice(0, 6);
      setRecentlyViewedIds(updated);
      localStorage.setItem("sk_recently_viewed_portfolio", JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
  };

  // Sync state if URL params change
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "rent" || tabParam === "buy") {
      setActiveTab(tabParam);
    }
    if (searchParams.get("destination")) setDestination(searchParams.get("destination"));
    if (searchParams.get("style")) setStyle(searchParams.get("style"));
    if (searchParams.get("price")) setPriceBracket(searchParams.get("price"));
  }, [searchParams]);

  // Tab switcher handler
  const handleTabSwitch = (newTab) => {
    setActiveTab(newTab);
    setPriceBracket("all");
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", newTab);
    router.replace(`/collection?${params.toString()}`, { scroll: false });

    if (newTab === "rent") {
      addToast("Browsing Sterling Key Luxury Rental Portfolios", "info", "Rentals Active");
    } else {
      addToast("Browsing Flagship Acquisition Portfolio", "info", "Buy Portfolio Active");
    }
  };

  // Filtering Logic
  const filteredProperties = useMemo(() => {
    return PROPERTIES_DATA.filter((prop) => {
      // Mode Tab filter
      if (activeTab === "rent") {
        if (!prop.rentalPrice) return false;
      }

      // 1. Destination
      if (destination !== "all") {
        const destLower = destination.toLowerCase();
        const cityMatch = prop.city.toLowerCase().includes(destLower);
        const stateMatch = prop.state && prop.state.toLowerCase().includes(destLower);
        const neighMatch = prop.neighborhood.toLowerCase().includes(destLower);
        if (!cityMatch && !stateMatch && !neighMatch) {
          if (destLower.includes("manhattan") && !prop.city.toLowerCase().includes("new york")) return false;
          if (destLower.includes("los angeles") && !prop.city.toLowerCase().includes("los angeles")) return false;
          if (destLower.includes("miami") && !prop.city.toLowerCase().includes("miami")) return false;
          if (destLower.includes("london") && !prop.city.toLowerCase().includes("london")) return false;
          if (destLower.includes("aspen") && !prop.city.toLowerCase().includes("aspen")) return false;
          if (destLower.includes("dubai") && !prop.city.toLowerCase().includes("dubai")) return false;
          if (destLower.includes("bahamas") && !prop.city.toLowerCase().includes("bahamas")) return false;
        }
      }

      // 2. Style
      if (style !== "all") {
        const styleLower = style.toLowerCase();
        const catMatch = prop.category.toLowerCase().includes(styleLower);
        const titleMatch = prop.title.toLowerCase().includes(styleLower);
        if (!catMatch && !titleMatch) {
          if (styleLower.includes("penthouse") && !prop.title.toLowerCase().includes("penthouse") && !prop.category.toLowerCase().includes("penthouse")) return false;
          if (styleLower.includes("waterfront") && !prop.amenities.some(a => a.toLowerCase().includes("water") || a.toLowerCase().includes("ocean") || a.toLowerCase().includes("island"))) return false;
          if (styleLower.includes("historic") && prop.category !== "Historic") return false;
          if (styleLower.includes("architectural") && prop.category !== "Architectural") return false;
        }
      }

      // 3. Price Bracket (Adaptive to Tab)
      if (priceBracket !== "all") {
        if (activeTab === "rent") {
          const monthly = parseRentalMonthly(prop.rentalPrice);
          if (priceBracket === "under50" && monthly >= 50000) return false;
          if (priceBracket === "50to100" && (monthly < 50000 || monthly > 100000)) return false;
          if (priceBracket === "over100" && monthly <= 100000) return false;
        } else {
          if (priceBracket === "under10" || priceBracket === "5-15") {
            if (prop.price > 15000000) return false;
          } else if (priceBracket === "10to25" || priceBracket === "15-30") {
            if (prop.price < 15000000 || prop.price > 30000000) return false;
          } else if (priceBracket === "25to50" || priceBracket === "30-60") {
            if (prop.price < 30000000 || prop.price > 60000000) return false;
          } else if (priceBracket === "over50" || priceBracket === "60+") {
            if (prop.price < 50000000) return false;
          }
        }
      }

      // 4. Bedrooms
      if (bedrooms !== "all") {
        const minBeds = parseInt(bedrooms, 10);
        if (prop.beds < minBeds) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-desc") {
        if (activeTab === "rent") {
          return parseRentalMonthly(b.rentalPrice) - parseRentalMonthly(a.rentalPrice);
        }
        return b.price - a.price;
      }
      if (sortBy === "price-asc") {
        if (activeTab === "rent") {
          return parseRentalMonthly(a.rentalPrice) - parseRentalMonthly(b.rentalPrice);
        }
        return a.price - b.price;
      }
      if (sortBy === "sqft-desc") return b.sqft - a.sqft;
      return 0; // curated priority
    });
  }, [activeTab, destination, style, priceBracket, bedrooms, sortBy]);

  const hasActiveFilters = destination !== "all" || style !== "all" || priceBracket !== "all" || bedrooms !== "all";

  const clearAllFilters = () => {
    setDestination("all");
    setStyle("all");
    setPriceBracket("all");
    setBedrooms("all");
    setSortBy("curated");
    addToast("All search filters cleared", "info", "Filters Reset");
  };

  const toggleCompare = (id) => {
    if (compareIds.includes(id)) {
      setCompareIds(compareIds.filter((item) => item !== id));
    } else {
      if (compareIds.length >= 4) {
        addToast("Comparison suite supports up to 4 assets concurrently", "warning", "Dock Full");
        return;
      }
      setCompareIds([...compareIds, id]);
      addToast("Added to comparative underwriting dock", "info", "Comparison Added");
    }
  };

  const toggleSave = (id, title) => {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((item) => item !== id));
      addToast(`Removed ${title} from saved`, "info", "Saved Updated");
    } else {
      setSavedIds([...savedIds, id]);
      addToast(`Added ${title} to private saved portfolio`, "success", "Saved Portfolio");
    }
  };

  const openPropertyPreview = (prop) => {
    trackViewedProperty(prop.id);
    setSelectedProperty(prop);
  };

  // Compute counts
  const rentCount = PROPERTIES_DATA.filter((p) => p.rentalPrice).length;
  const devCount = PROPERTIES_DATA.filter((p) => p.category === "New Developments").length;
  const buyCount = PROPERTIES_DATA.length;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1D20] flex flex-col font-sans selection:bg-[#C5A880]/30 selection:text-[#0A192F]">
      <Navbar
        onOpenPortal={() => setPortalOpen(true)}
        onOpenSchedule={() => setTourProperty(PROPERTIES_DATA[0])}
        savedCount={savedIds.length}
        onOpenSaved={() => setSavedDrawerOpen(true)}
      />

      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-12 pt-3 pb-10 sm:pt-5 sm:pb-14">
        {/* Page Header */}
        <div className="mb-5 sm:mb-8 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A192F] text-[#FAF8F5] text-xs font-mono uppercase tracking-widest mb-3.5 shadow-sm">
            <Building className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Curated Sovereign Portfolio</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#0A192F] font-bold tracking-tight mb-3">
            The Property Collection
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-[#545B65] leading-relaxed max-w-2xl mx-auto">
            Explore curated private estates, visionary penthouses, and institutional rental holdings across prime global havens.
          </p>

          {/* Top Primary Segmented Control: BUY | RENT */}
          <div className="flex items-center justify-center mt-6 sm:mt-8">
            <div className="inline-flex p-1.5 rounded-2xl bg-[#0A192F]/5 border border-[#E4DCD0] shadow-2xs gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => handleTabSwitch("buy")}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === "buy"
                    ? "bg-[#0A192F] text-[#FAF8F5] shadow-md scale-[1.01]"
                    : "text-[#545B65] hover:text-[#0A192F] hover:bg-white/80"
                }`}
              >
                Buy Portfolio <span className="opacity-70 font-mono text-[11px] sm:text-xs">({buyCount})</span>
              </button>
              <button
                type="button"
                onClick={() => handleTabSwitch("rent")}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === "rent"
                    ? "bg-[#0A192F] text-[#FAF8F5] shadow-md scale-[1.01]"
                    : "text-[#545B65] hover:text-[#0A192F] hover:bg-white/80"
                }`}
              >
                Luxury Rentals <span className="opacity-70 font-mono text-[11px] sm:text-xs">({rentCount})</span>
              </button>
            </div>
          </div>
        </div>

        {/* COMPREHENSIVE DROPDOWN FILTER ENGINE (ALL 4 FIELDS ARE RICH SELECTS) */}
        <div className="bg-white border border-[#E4DCD0] rounded-3xl p-6 sm:p-8 shadow-xs mb-10 sm:mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            {/* 1. Destination Dropdown */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#545B65] mb-2 font-bold flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C5A880]" />
                <span>Destination</span>
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E4DCD0] rounded-xl px-4 py-3 text-sm font-semibold text-[#0A192F] focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] cursor-pointer"
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

            {/* 2. Architectural Style Dropdown */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#545B65] mb-2 font-bold flex items-center gap-1.5">
                <Home className="w-4 h-4 text-[#C5A880]" />
                <span>Architectural Style</span>
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E4DCD0] rounded-xl px-4 py-3 text-sm font-semibold text-[#0A192F] focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] cursor-pointer"
              >
                <option value="all">All Architectural Styles</option>
                <option value="Penthouses">Modern Penthouses</option>
                <option value="Waterfront">Waterfront & Island Compounds</option>
                <option value="Architectural">Contemporary Architectural Villas</option>
                <option value="Historic">Historic & Listed Estates</option>
                <option value="New Developments">New Developments & Towers</option>
              </select>
            </div>

            {/* 3. Valuation / Lease Bracket Dropdown (ADAPTIVE) */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#545B65] mb-2 font-bold flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-[#C5A880]" />
                <span>{activeTab === "rent" ? "Monthly Lease Bracket" : "Valuation Bracket"}</span>
              </label>
              <select
                value={priceBracket}
                onChange={(e) => setPriceBracket(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E4DCD0] rounded-xl px-4 py-3 text-sm font-semibold text-[#0A192F] focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] cursor-pointer"
              >
                {activeTab === "rent" ? (
                  <>
                    <option value="all">All Monthly Lease Brackets</option>
                    <option value="under50">Under $50,000 / month</option>
                    <option value="50to100">$50,000 – $100,000 / month</option>
                    <option value="over100">$100,000+ / month (Ultra-Luxury)</option>
                  </>
                ) : (
                  <>
                    <option value="all">All Valuation Brackets</option>
                    <option value="under10">$5,000,000 – $15,000,000</option>
                    <option value="10to25">$15,000,000 – $30,000,000</option>
                    <option value="25to50">$30,000,000 – $60,000,000</option>
                    <option value="over50">$60,000,000+ (Ultra-Prime)</option>
                  </>
                )}
              </select>
            </div>

            {/* 4. Minimum Bedrooms Dropdown */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#545B65] mb-2 font-bold flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-[#C5A880]" />
                <span>Minimum Suites / Beds</span>
              </label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E4DCD0] rounded-xl px-4 py-3 text-sm font-semibold text-[#0A192F] focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] cursor-pointer"
              >
                <option value="all">Any Bed Count</option>
                <option value="3">3+ Bedroom Suites</option>
                <option value="4">4+ Bedroom Suites</option>
                <option value="5">5+ Bedroom Suites</option>
                <option value="6">6+ Sovereign Estate Bedrooms</option>
              </select>
            </div>
          </div>

          {/* Action Row: Reset, Count & View Mode Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 pt-5 border-t border-[#E4DCD0]">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-[#0A192F] uppercase tracking-wider">
                Showing {filteredProperties.length} of {activeTab === "rent" ? rentCount : buyCount} {activeTab === "rent" ? "Rentals" : "Holdings"}
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-xs text-[#545B65] hover:text-[#0A192F] underline underline-offset-4 flex items-center gap-1 cursor-pointer font-medium"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Clear Filters</span>
                </button>
              )}
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4 w-full sm:w-auto">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <span className="text-[11px] sm:text-xs uppercase font-bold text-[#545B65] shrink-0">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#FAF8F5] border border-[#E4DCD0] rounded-xl px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-[#0A192F] focus:outline-none cursor-pointer max-w-[135px] xs:max-w-[160px] sm:max-w-none truncate"
                >
                  <option value="curated">Curated Priority</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="sqft-desc">Interior Living Area</option>
                </select>
              </div>

              {/* View Switcher: Clear Grid & List Toggle with Icons + Text (Fitted for Mobile) */}
              <div className="flex items-center border border-[#E4DCD0] rounded-xl overflow-hidden bg-[#FAF8F5] shadow-xs shrink-0">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`py-1.5 px-2.5 xs:px-3 sm:px-3.5 transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === "grid" 
                      ? "bg-[#0A192F] text-white shadow-xs font-bold" 
                      : "text-[#545B65] hover:text-[#0A192F] hover:bg-[#F3EFEA] font-medium"
                  }`}
                  title="Grid View"
                  aria-label="Grid View"
                >
                  <Grid className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="hidden xs:inline text-[11px] sm:text-xs uppercase tracking-wider font-semibold">Grid</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`py-1.5 px-2.5 xs:px-3 sm:px-3.5 transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === "list" 
                      ? "bg-[#0A192F] text-white shadow-xs font-bold" 
                      : "text-[#545B65] hover:text-[#0A192F] hover:bg-[#F3EFEA] font-medium"
                  }`}
                  title="List View"
                  aria-label="List View"
                >
                  <List className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="hidden xs:inline text-[11px] sm:text-xs uppercase tracking-wider font-semibold">List</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* PROPERTY LISTINGS DISPLAY */}
        {filteredProperties.length === 0 ? (
          <div className="p-12 sm:p-16 rounded-3xl bg-white border border-[#E4DCD0] text-center space-y-4 max-w-xl mx-auto shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#FAF8F5] text-[#C5A880] flex items-center justify-center mx-auto border border-[#E4DCD0]">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif text-[#0A192F] font-bold">No Matching Properties Found</h3>
            <p className="text-sm text-[#545B65] leading-relaxed">
              No off-market properties currently meet your strict filter criteria. You can clear filters to browse the entire collection or request an off-market private mandate.
            </p>
            <button
              onClick={clearAllFilters}
              className="py-3 px-6 rounded-xl bg-[#0A192F] text-[#FAF8F5] font-bold text-xs uppercase tracking-wider shadow-sm hover:bg-[#142E54] transition-all cursor-pointer"
            >
              Reset Search Filters
            </button>
          </div>
        ) : viewMode === "list" ? (
          /* ==============================================================
             LIST VIEW (Uniform Precision Height: All Cards Identical Dimensions)
             ============================================================== */
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            {filteredProperties.map((prop) => {
              const isCompared = compareIds.includes(prop.id);
              const isFav = savedIds.includes(prop.id);

              return (
                <div
                  key={prop.id}
                  onClick={() => openPropertyPreview(prop)}
                  className="relative group rounded-3xl bg-white border border-[#E4DCD0] overflow-hidden shadow-xs hover:shadow-2xl hover:border-[#C5A880] transition-all duration-300 flex flex-row items-stretch cursor-pointer active:scale-[0.99] p-3 xs:p-4 sm:p-5 lg:p-6 gap-3 xs:gap-4 sm:gap-6 lg:gap-7 h-[260px] sm:h-[275px] lg:h-[290px]"
                >
                  {/* Quick Compare & Favorite Buttons - Dedicated Top-Right Card Placement */}
                  <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-20 flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCompare(prop.id);
                      }}
                      className={`p-1.5 sm:p-2 rounded-full border transition-all cursor-pointer backdrop-blur-md shadow-xs active:scale-95 ${
                        isCompared 
                          ? "bg-[#C5A880] text-[#0A192F] border-[#C5A880]" 
                          : "bg-[#FAF8F5] hover:bg-white text-[#747D88] hover:text-[#0A192F] border-[#E4DCD0] hover:border-[#C5A880]"
                      }`}
                      title={isCompared ? "Remove from Compare Matrix" : "Add to Compare Matrix"}
                    >
                      <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSave(prop.id, prop.title);
                      }}
                      className="p-1.5 sm:p-2 rounded-full bg-[#FAF8F5] hover:bg-white text-[#0A192F] border border-[#E4DCD0] hover:border-[#C5A880] transition-all backdrop-blur-md cursor-pointer shadow-xs hover:shadow-md active:scale-95 group/fav"
                      title="Save to Favorites"
                    >
                      <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${isFav ? "fill-[#C5A880] text-[#C5A880]" : "text-[#747D88] group-hover/fav:text-[#C5A880]"}`} />
                    </button>
                  </div>

                  {/* Left: Thumbnail Image with Uniform Full-Height Proportions */}
                  <div 
                    onClick={() => openPropertyPreview(prop)}
                    className="relative w-28 xs:w-36 sm:w-64 md:w-80 lg:w-88 shrink-0 h-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#FAF8F5] shadow-xs"
                  >
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-70" />

                    {/* Status / Lease Badge with Breathing Room */}
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex items-center gap-1 z-10">
                      {isBought(prop.id) ? (
                        <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-bold uppercase tracking-wider bg-[#8B1E1E] text-white border border-red-400 shadow-sm">
                          SOLD OUT
                        </span>
                      ) : isRented(prop.id) ? (
                        <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-bold uppercase tracking-wider bg-[#475569] text-white border border-slate-400 shadow-sm">
                          CURRENTLY UNAVAILABLE
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-bold uppercase tracking-wider bg-[#0A192F]/92 text-[#FAF8F5] border border-[#C5A880]/50 backdrop-blur-md shadow-sm">
                          {activeTab === "rent" ? "FOR LEASE" : prop.status}
                        </span>
                      )}
                    </div>

                    {/* Cap rate tag or Lease indicator on image bottom */}
                    <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 flex justify-between items-center text-[10px] sm:text-xs text-white font-mono z-10">
                      <span className="text-[#C5A880] font-bold">
                        {activeTab === "rent" ? "Luxury Lease" : `${prop.capRate || "5.8%"} Cap`}
                      </span>
                      <span className="text-white/80 hidden xs:inline">{prop.city}</span>
                    </div>
                  </div>

                  {/* Right: Property Details & Actions with Uniform Equal-Height Structure */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-0.5 sm:py-1">
                    {/* Top Section: Location, Title, & Description - Generous Right Padding to Prevent Overlap with Compare/Save Icons */}
                    <div className="pr-16 xs:pr-20 sm:pr-24">
                      <div className="flex items-center text-[11px] sm:text-xs text-[#747D88] font-semibold mb-0.5 h-4 sm:h-5">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-[#C5A880] shrink-0" />
                        <span className="truncate">{formatLocation(prop)}</span>
                      </div>

                      <Link 
                        href={`/properties/${prop.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          trackViewedProperty(prop.id);
                        }}
                        className="h-[2.5rem] sm:h-[2.85rem] flex items-center"
                      >
                        <h3 className="text-sm xs:text-base sm:text-lg font-serif text-[#0A192F] font-bold hover:text-[#C5A880] transition-colors leading-snug line-clamp-2">
                          {prop.title}
                        </h3>
                      </Link>

                      {/* Clean 2-Line Architectural Description (Never Horizontally Sliced) */}
                      <p className="text-xs sm:text-sm text-[#545B65] leading-snug sm:leading-relaxed line-clamp-2 mt-0.5 font-sans min-h-[2.2rem] sm:min-h-[2.6rem]">
                        {prop.tagline || prop.description}
                      </p>
                    </div>

                    {/* Middle Section: Price & Specs with Exact Spacing */}
                    <div className="my-1 sm:my-2 pt-1.5 sm:pt-2.5 border-t border-[#E4DCD0]/70">
                      {/* Price Row */}
                      <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2 mb-0.5 h-6 sm:h-7">
                        <div suppressHydrationWarning className="text-sm xs:text-base sm:text-xl lg:text-2xl font-serif font-bold text-[#0A192F] tracking-tight">
                          {activeTab === "rent" && prop.rentalPrice ? prop.rentalPrice : formatRawPrice(prop.price)}
                        </div>
                        {activeTab === "rent" ? (
                          <span className="text-[10px] sm:text-xs font-mono text-[#747D88]">
                            (Acquisition: {formatRawPrice(prop.price)})
                          </span>
                        ) : (
                          <span className="text-[10px] sm:text-xs font-mono font-semibold text-[#C5A880]">
                            • {prop.capRate || "5.8%"} Cap Rate
                          </span>
                        )}
                      </div>

                      {/* Specs Row */}
                      <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3.5 gap-y-0.5 text-[10px] sm:text-xs text-[#545B65] font-mono py-0.5 border-t border-[#E4DCD0]/50 h-5 sm:h-6 overflow-hidden">
                        <span className="font-semibold text-[#0A192F]">{prop.beds} Beds</span>
                        <span className="text-[#C5A880]">•</span>
                        <span className="font-semibold text-[#0A192F]">{prop.baths} Baths</span>
                        <span className="text-[#C5A880]">•</span>
                        <span suppressHydrationWarning className="font-semibold text-[#0A192F]">{formatArea(prop.sqft, prop.sqm)}</span>
                        <span className="hidden lg:inline text-[#C5A880]">•</span>
                        <span className="hidden lg:inline text-[#747D88] whitespace-nowrap">{prop.lotSize}</span>
                      </div>
                    </div>

                    {/* Bottom Actions: Responsive 2-Col Grid on Mobile (Guaranteed to Stay Inside Card) */}
                    <div className="grid grid-cols-2 gap-1.5 sm:flex sm:items-center sm:gap-2.5 pt-1.5 sm:pt-2.5 border-t border-[#E4DCD0]/70 w-full">
                      <Link
                        href={`/properties/${prop.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          trackViewedProperty(prop.id);
                        }}
                        className="w-full sm:w-auto py-1.5 sm:py-2 px-2 sm:px-4 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] text-[10px] xs:text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 sm:gap-1.5 shadow-sm active:scale-95 text-center min-w-0"
                      >
                        <span className="truncate"><span className="hidden sm:inline">Full </span>Dossier</span>
                        <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C5A880] shrink-0" />
                      </Link>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openPropertyPreview(prop);
                        }}
                        className="w-full sm:w-auto py-1.5 sm:py-2 px-2 sm:px-4 rounded-xl bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#0A192F] text-[10px] xs:text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all border border-[#E4DCD0] shadow-2xs active:scale-95 cursor-pointer text-center min-w-0"
                      >
                        <span className="truncate">Preview</span>
                      </button>

                      {/* Compare and Tour Icons on Large Screens without crowding primary buttons */}
                      <div className="hidden 2xl:flex items-center gap-2 ml-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCompare(prop.id);
                          }}
                          className={`p-2 rounded-xl border border-[#E4DCD0] transition-all cursor-pointer ${
                            isCompared ? "bg-[#C5A880] text-[#0A192F]" : "bg-[#FAF8F5] text-[#545B65] hover:text-[#0A192F]"
                          }`}
                          title="Compare Asset"
                        >
                          <Layers className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setTourProperty(prop);
                          }}
                          className="p-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#0A192F] transition-all border border-[#E4DCD0] shadow-2xs active:scale-95 cursor-pointer"
                          title="Schedule Private Showing"
                        >
                          <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ==============================================================
             GRID VIEW (Visual Card Showcase: 1-col mobile, 2-col tablet, 3-col desktop)
             ============================================================== */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filteredProperties.map((prop) => {
              const isCompared = compareIds.includes(prop.id);
              const isFav = savedIds.includes(prop.id);

              return (
                <div
                  key={prop.id}
                  onClick={() => openPropertyPreview(prop)}
                  className="group rounded-3xl bg-white border border-[#E4DCD0] overflow-hidden shadow-xs hover:shadow-2xl hover:border-[#C5A880] transition-all duration-300 flex flex-col cursor-pointer active:scale-[0.99]"
                >
                  {/* Image Container - Click to Open Quick Dossier Modal */}
                  <div 
                    onClick={() => openPropertyPreview(prop)}
                    className="relative aspect-[16/10] overflow-hidden cursor-pointer"
                  >
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      {isBought(prop.id) ? (
                        <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#8B1E1E] text-white border border-red-400 shadow-sm">
                          SOLD OUT
                        </span>
                      ) : isRented(prop.id) ? (
                        <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#475569] text-white border border-slate-400 shadow-sm">
                          CURRENTLY UNAVAILABLE
                        </span>
                      ) : (
                        <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0A192F] text-[#FAF8F5] border border-[#C5A880]/40 shadow-sm">
                          {activeTab === "rent" ? "FOR LEASE" : prop.status}
                        </span>
                      )}
                      <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-[#0A192F] border border-[#E4DCD0] shadow-sm">
                        {prop.category}
                      </span>
                    </div>

                    {/* Top Right Save & Compare Buttons */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCompare(prop.id);
                        }}
                        className={`p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                          isCompared ? "bg-[#C5A880] text-[#0A192F]" : "bg-[#0A192F]/80 hover:bg-[#0A192F] text-white"
                        }`}
                        title="Compare Asset"
                      >
                        <Layers className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSave(prop.id, prop.title);
                        }}
                        className="p-2 rounded-full bg-[#0A192F]/80 hover:bg-[#0A192F] text-white transition-all backdrop-blur-md cursor-pointer"
                        title="Save to Favorites"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-[#C5A880] text-[#C5A880]" : ""}`} />
                      </button>
                    </div>

                    {/* Bottom Price on Image */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                      <div>
                        <div className="text-xs text-[#EADDC9] uppercase font-mono tracking-wider font-semibold">
                          {activeTab === "rent" ? "Monthly Lease" : "Valuation"}
                        </div>
                        <div suppressHydrationWarning className="text-2xl font-serif font-bold text-[#FAF8F5] tracking-tight">
                          {activeTab === "rent" && prop.rentalPrice ? prop.rentalPrice : formatRawPrice(prop.price)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-[#EADDC9] uppercase font-mono tracking-wider">
                          {activeTab === "rent" ? "Terms" : "Cap Rate"}
                        </div>
                        <div className="text-sm font-mono font-bold text-[#C5A880]">
                          {activeTab === "rent" ? "Annual / Mo" : (prop.capRate || "5.8%")}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex items-center text-xs text-[#747D88] font-semibold mb-2">
                        <MapPin className="w-3.5 h-3.5 mr-1.5 text-[#C5A880] shrink-0" />
                        <span>{formatLocation(prop)}</span>
                      </div>
                      <Link 
                        href={`/properties/${prop.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          trackViewedProperty(prop.id);
                        }}
                      >
                        <h3 className="text-xl sm:text-2xl font-serif text-[#0A192F] font-bold hover:text-[#C5A880] transition-colors leading-tight">
                          {prop.title}
                        </h3>
                      </Link>
                      <p className="text-xs sm:text-sm text-[#545B65] mt-2.5 leading-relaxed font-sans">
                        {prop.tagline || prop.description}
                      </p>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-3 gap-3 py-3.5 border-y border-[#E4DCD0] text-center text-xs">
                      <div>
                        <span className="text-[10px] text-[#747D88] uppercase block font-semibold">Suites</span>
                        <span className="text-[#0A192F] font-mono font-bold text-sm mt-0.5 block">{prop.beds} Beds · {prop.baths} Baths</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#747D88] uppercase block font-semibold">Living Area</span>
                        <span suppressHydrationWarning className="text-[#0A192F] font-mono font-bold text-sm mt-0.5 block">{formatArea(prop.sqft, prop.sqm)}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#747D88] uppercase block font-semibold">Lot Size</span>
                        <span className="text-[#0A192F] font-mono font-bold text-sm mt-0.5 block leading-snug break-words">{prop.lotSize}</span>
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-3 pt-1">
                      <Link
                        href={`/properties/${prop.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          trackViewedProperty(prop.id);
                        }}
                        className="flex-1 py-3 px-4 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] text-xs font-bold uppercase tracking-wider transition-all text-center flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                      >
                        <span>Full Dossier</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#C5A880]" />
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openPropertyPreview(prop);
                        }}
                        className="py-3 px-3.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#0A192F] text-xs font-bold uppercase tracking-wider transition-all border border-[#E4DCD0] shadow-2xs active:scale-95 cursor-pointer"
                        title="Quick View"
                      >
                        Preview
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setTourProperty(prop);
                        }}
                        className="py-3 px-3.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#0A192F] transition-all border border-[#E4DCD0] shadow-2xs active:scale-95 cursor-pointer"
                        title="Schedule Private Showing"
                      >
                        <Calendar className="w-4 h-4 text-[#C5A880]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* RECENTLY VIEWED RESIDENCES (Spacious, Luxury Carousel / Grid Section) */}
        {recentlyViewedIds.length > 0 && (
          <div className="mt-20 sm:mt-28 pt-12 sm:pt-16 border-t border-[#E4DCD0]">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-10">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C5A880] font-bold mb-1.5">
                  <History className="w-3.5 h-3.5" />
                  <span>Private Session History</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#0A192F]">
                  Recently Viewed Residences
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setRecentlyViewedIds([]);
                  localStorage.removeItem("sk_recently_viewed_portfolio");
                  addToast("Recently viewed history cleared", "info", "History Reset");
                }}
                className="text-xs uppercase tracking-wider font-semibold text-[#747D88] hover:text-[#0A192F] transition-colors cursor-pointer py-1.5 px-3 rounded-lg border border-[#E4DCD0] hover:bg-white"
              >
                Clear History
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {recentlyViewedIds.map((id) => {
                const prop = PROPERTIES_DATA.find((p) => p.id === id);
                if (!prop) return null;
                return (
                  <div
                    key={`recent-${prop.id}`}
                    onClick={() => openPropertyPreview(prop)}
                    className="group bg-white rounded-2xl border border-[#E4DCD0] overflow-hidden hover:shadow-xl hover:border-[#C5A880] transition-all p-4 sm:p-5 cursor-pointer flex flex-col justify-between"
                  >
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3.5 bg-[#FAF8F5]">
                      <img
                        src={prop.images[0]}
                        alt={prop.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {isBought(prop.id) ? (
                        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#8B1E1E] text-white border border-red-400 shadow-xs">
                          SOLD OUT
                        </span>
                      ) : isRented(prop.id) ? (
                        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#475569] text-white border border-slate-400 shadow-xs">
                          CURRENTLY UNAVAILABLE
                        </span>
                      ) : (
                        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#0A192F]/90 text-white border border-[#C5A880]/30 shadow-xs">
                          {prop.status}
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="text-xs text-[#747D88] font-semibold mb-1.5">
                        {formatLocation(prop)}
                      </div>
                      <h4 className="text-sm sm:text-base font-serif font-bold text-[#0A192F] group-hover:text-[#C5A880] transition-colors mb-2.5 leading-snug">
                        {prop.title}
                      </h4>
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-[#0A192F] pt-2.5 border-t border-[#E4DCD0]/60">
                        <span>{formatRawPrice(prop.price)}</span>
                        <span className="text-[#C5A880] text-xs">View Dossier →</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* Comparison Dock Bar */}
      {compareIds.length > 0 && (
        <ComparisonBar
          compareIds={compareIds}
          onRemove={(id) => setCompareIds(compareIds.filter((item) => item !== id))}
          onRemoveId={(id) => setCompareIds(compareIds.filter((item) => item !== id))}
          onClear={() => setCompareIds([])}
          onClearAll={() => setCompareIds([])}
          onOpenCompare={() => setCompareModalOpen(true)}
          onOpenModal={() => setCompareModalOpen(true)}
        />
      )}

      {/* Modals & Drawers */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onScheduleTour={(p) => setTourProperty(p)}
        />
      )}

      {tourProperty && (
        <ScheduleModal
          property={tourProperty}
          onClose={() => setTourProperty(null)}
        />
      )}

      {/* Architectural Estate Comparison Matrix Modal */}
      {compareModalOpen && (
        <ComparisonModal
          isOpen={compareModalOpen}
          compareIds={compareIds}
          properties={PROPERTIES_DATA.filter((p) => compareIds.includes(p.id))}
          onClose={() => setCompareModalOpen(false)}
          onRemoveFromCompare={(id) => {
            const updated = compareIds.filter((item) => item !== id);
            setCompareIds(updated);
            if (updated.length === 0) setCompareModalOpen(false);
          }}
          onSelectProperty={(p) => openPropertyPreview(p)}
          onScheduleTour={(p) => setTourProperty(p)}
        />
      )}

      <SavedDrawer
        isOpen={savedDrawerOpen}
        onClose={() => setSavedDrawerOpen(false)}
        savedIds={savedIds}
        onRemoveSaved={(id) => setSavedIds(savedIds.filter((item) => item !== id))}
        onSelectProperty={(p) => openPropertyPreview(p)}
      />

      {portalOpen && (
        <PortalModal onClose={() => setPortalOpen(false)} />
      )}

      <ConciergeChatWidget hasComparisonDock={compareIds.length > 0} />
    </div>
  );
}

export default function CollectionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center text-sm font-semibold">Loading Sterling Key Portfolio...</div>}>
      <CollectionContent />
    </Suspense>
  );
}
