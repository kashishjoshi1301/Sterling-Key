"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyModal from "@/components/PropertyModal";
import ScheduleModal from "@/components/ScheduleModal";
import VirtualTourModal from "@/components/VirtualTourModal";
import ComparisonModal from "@/components/ComparisonModal";
import ComparisonBar from "@/components/ComparisonBar";
import SavedDrawer from "@/components/SavedDrawer";
import PortalModal from "@/components/PortalModal";
import ConciergeChatWidget from "@/components/ConciergeChatWidget";
import { useCurrency } from "@/components/CurrencyContext";
import { useToast } from "@/components/Toast";
import { PROPERTIES_DATA } from "@/data/mockData";
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
  Rotate3D, 
  Layers, 
  ArrowUpDown, 
  X, 
  Sparkles,
  ExternalLink,
  Calendar,
  Building
} from "lucide-react";

function CollectionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { formatRawPrice, formatArea } = useCurrency();
  const { addToast } = useToast();

  // Read initial query params
  const initialDestination = searchParams.get("destination") || "all";
  const initialStyle = searchParams.get("style") || "all";
  const initialPrice = searchParams.get("price") || "all";
  const initialTab = searchParams.get("tab") || "all";

  // Filter States - ALL DROPDOWNS
  const [destination, setDestination] = useState(initialDestination);
  const [style, setStyle] = useState(initialStyle);
  const [priceBracket, setPriceBracket] = useState(initialPrice);
  const [bedrooms, setBedrooms] = useState("all");
  const [sortBy, setSortBy] = useState("curated");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'

  // Modals & Drawers
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [tourProperty, setTourProperty] = useState(null);
  const [virtualTourTitle, setVirtualTourTitle] = useState(null);
  const [compareIds, setCompareIds] = useState([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [savedIds, setSavedIds] = useState([]);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);

  // Sync state if URL params change
  useEffect(() => {
    if (searchParams.get("destination")) setDestination(searchParams.get("destination"));
    if (searchParams.get("style")) setStyle(searchParams.get("style"));
    if (searchParams.get("price")) setPriceBracket(searchParams.get("price"));
  }, [searchParams]);

  // Filtering Logic
  const filteredProperties = useMemo(() => {
    return PROPERTIES_DATA.filter((prop) => {
      // 1. Destination
      if (destination !== "all") {
        const destLower = destination.toLowerCase();
        const cityMatch = prop.city.toLowerCase().includes(destLower);
        const stateMatch = prop.state && prop.state.toLowerCase().includes(destLower);
        const neighMatch = prop.neighborhood.toLowerCase().includes(destLower);
        if (!cityMatch && !stateMatch && !neighMatch) {
          // Check common mappings
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

      // 3. Price Bracket
      if (priceBracket !== "all") {
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

      // 4. Bedrooms
      if (bedrooms !== "all") {
        const minBeds = parseInt(bedrooms, 10);
        if (prop.beds < minBeds) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "sqft-desc") return b.sqft - a.sqft;
      return 0; // curated priority
    });
  }, [destination, style, priceBracket, bedrooms, sortBy]);

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

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1D20] flex flex-col font-sans selection:bg-[#C5A880]/30 selection:text-[#0A192F]">
      <Navbar
        onOpenPortal={() => setPortalOpen(true)}
        onOpenSchedule={() => setTourProperty(PROPERTIES_DATA[0])}
        savedCount={savedIds.length}
        onOpenSaved={() => setSavedDrawerOpen(true)}
      />

      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16">
        {/* Page Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A192F] text-[#FAF8F5] text-xs font-mono uppercase tracking-widest mb-4 shadow-sm">
            <Building className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Curated Sovereign Portfolio</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif text-[#0A192F] font-bold tracking-tight mb-4">
            The Property Collection
          </h1>
          <p className="text-sm sm:text-base text-[#545B65] leading-relaxed">
            Filter through private estates, iconic penthouses, and prime institutional multi-family holdings managed across sovereign havens.
          </p>
        </div>

        {/* COMPREHENSIVE DROPDOWN FILTER ENGINE (ALL 4 FIELDS ARE RICH SELECTS) */}
        <div className="bg-white border border-[#E4DCD0] rounded-3xl p-6 sm:p-8 shadow-sm mb-10">
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

            {/* 3. Valuation Bracket Dropdown */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#545B65] mb-2 font-bold flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-[#C5A880]" />
                <span>Valuation Bracket</span>
              </label>
              <select
                value={priceBracket}
                onChange={(e) => setPriceBracket(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E4DCD0] rounded-xl px-4 py-3 text-sm font-semibold text-[#0A192F] focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] cursor-pointer"
              >
                <option value="all">Any Valuation Bracket</option>
                <option value="under10">$5M – $15M</option>
                <option value="10to25">$15M – $30M</option>
                <option value="25to50">$30M – $60M</option>
                <option value="over50">$60M+ Trophy Sovereign Assets</option>
              </select>
            </div>

            {/* 4. Bedrooms Dropdown */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#545B65] mb-2 font-bold flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-[#C5A880]" />
                <span>Bedrooms</span>
              </label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E4DCD0] rounded-xl px-4 py-3 text-sm font-semibold text-[#0A192F] focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] cursor-pointer"
              >
                <option value="all">Any Bedroom Count</option>
                <option value="4">4+ Luxury Suites</option>
                <option value="5">5+ Luxury Suites</option>
                <option value="6">6+ Luxury Suites</option>
                <option value="7">7+ Sovereign Compounds</option>
              </select>
            </div>
          </div>

          {/* Results Summary Bar, Sort By, and View Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-[#E4DCD0]">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-sm font-semibold text-[#0A192F]">
                Showing <span className="font-mono text-[#C5A880] font-bold">{filteredProperties.length}</span> Verified Properties
              </span>

              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#0A192F]/10 hover:bg-[#0A192F]/20 text-xs font-semibold text-[#0A192F] transition-all cursor-pointer"
                >
                  <X className="w-3.5 h-3.5 text-red-500" />
                  <span>Clear All Filters</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold text-[#545B65]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#FAF8F5] border border-[#E4DCD0] rounded-xl px-3 py-1.5 text-xs font-semibold text-[#0A192F] focus:outline-none cursor-pointer"
                >
                  <option value="curated">Curated Priority</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="sqft-desc">Interior Living Area</option>
                </select>
              </div>

              {/* View Switcher */}
              <div className="flex items-center border border-[#E4DCD0] rounded-xl overflow-hidden bg-[#FAF8F5]">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${viewMode === "grid" ? "bg-[#0A192F] text-white" : "text-[#545B65] hover:text-[#0A192F]"}`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${viewMode === "list" ? "bg-[#0A192F] text-white" : "text-[#545B65] hover:text-[#0A192F]"}`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
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
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
            {filteredProperties.map((prop) => {
              const isCompared = compareIds.includes(prop.id);
              const isFav = savedIds.includes(prop.id);

              return (
                <div
                  key={prop.id}
                  className={`group rounded-3xl bg-white border border-[#E4DCD0] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col ${
                    viewMode === "list" ? "sm:flex-row" : ""
                  }`}
                >
                  {/* Image Container */}
                  <div className={`relative overflow-hidden ${viewMode === "list" ? "sm:w-2/5 aspect-[16/10] sm:aspect-auto" : "aspect-[16/10]"}`}>
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0A192F] text-[#FAF8F5] border border-[#C5A880]/40 shadow-sm">
                        {prop.status}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-[#0A192F] border border-[#E4DCD0] shadow-sm">
                        {prop.category}
                      </span>
                    </div>

                    {/* Top Right Save & Compare Buttons */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCompare(prop.id);
                        }}
                        className={`p-2 rounded-full backdrop-blur-md transition-all ${
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
                        className="p-2 rounded-full bg-[#0A192F]/80 hover:bg-[#0A192F] text-white transition-all backdrop-blur-md"
                        title="Save to Favorites"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-[#C5A880] text-[#C5A880]" : ""}`} />
                      </button>
                    </div>

                    {/* Bottom Price on Image */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                      <div>
                        <div className="text-xs text-[#EADDC9] uppercase font-mono tracking-wider font-semibold">Valuation</div>
                        <div suppressHydrationWarning className="text-2xl font-serif font-bold text-[#FAF8F5] tracking-tight">{formatRawPrice(prop.price)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-[#EADDC9] uppercase font-mono tracking-wider">Cap Rate</div>
                        <div className="text-sm font-mono font-bold text-[#C5A880]">{prop.capRate || "5.8%"}</div>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                    <div>
                      <div className="flex items-center text-xs text-[#747D88] font-semibold mb-1.5">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-[#C5A880] shrink-0" />
                        <span>{prop.neighborhood}, {prop.city}</span>
                      </div>
                      <Link href={`/properties/${prop.id}`}>
                        <h3 className="text-xl sm:text-2xl font-serif text-[#0A192F] font-bold hover:text-[#C5A880] transition-colors leading-tight">
                          {prop.title}
                        </h3>
                      </Link>
                      <p className="text-xs sm:text-sm text-[#545B65] line-clamp-2 mt-2 leading-relaxed">
                        {prop.description}
                      </p>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-3 gap-2.5 py-3 border-y border-[#E4DCD0] text-center text-xs">
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
                        <span className="text-[#0A192F] font-mono font-bold text-sm mt-0.5 block truncate">{prop.lotSize}</span>
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-2.5 pt-1">
                      <Link
                        href={`/properties/${prop.id}`}
                        className="flex-1 py-3 px-4 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] text-xs font-bold uppercase tracking-wider transition-all text-center flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <span>Full Dossier</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#C5A880]" />
                      </Link>
                      <button
                        onClick={() => setSelectedProperty(prop)}
                        className="py-3 px-3 rounded-xl bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#0A192F] text-xs font-bold uppercase tracking-wider transition-all border border-[#E4DCD0] shadow-2xs"
                        title="Quick View"
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => setTourProperty(prop)}
                        className="py-3 px-3 rounded-xl bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#0A192F] transition-all border border-[#E4DCD0] shadow-2xs"
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
      </main>

      <Footer />

      {/* Comparison Dock Bar */}
      {compareIds.length > 0 && (
        <ComparisonBar
          compareIds={compareIds}
          onRemove={(id) => setCompareIds(compareIds.filter((item) => item !== id))}
          onClear={() => setCompareIds([])}
          onOpenCompare={() => setCompareModalOpen(true)}
        />
      )}

      {/* Modals & Drawers */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onScheduleTour={(p) => setTourProperty(p)}
          onLaunchVirtualTour={(title) => setVirtualTourTitle(title)}
        />
      )}

      {tourProperty && (
        <ScheduleModal
          property={tourProperty}
          onClose={() => setTourProperty(null)}
        />
      )}

      {virtualTourTitle && (
        <VirtualTourModal
          title={virtualTourTitle}
          onClose={() => setVirtualTourTitle(null)}
        />
      )}

      {compareModalOpen && (
        <ComparisonModal
          compareIds={compareIds}
          onClose={() => setCompareModalOpen(false)}
        />
      )}

      <SavedDrawer
        isOpen={savedDrawerOpen}
        onClose={() => setSavedDrawerOpen(false)}
        savedIds={savedIds}
        onRemoveSaved={(id) => setSavedIds(savedIds.filter((item) => item !== id))}
        onSelectProperty={(p) => setSelectedProperty(p)}
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
