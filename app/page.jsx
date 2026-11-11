"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";

import PropertyModal from "../components/PropertyModal";
import PortalModal from "../components/PortalModal";
import ScheduleModal from "../components/ScheduleModal";
import SavedDrawer from "../components/SavedDrawer";
import ComparisonModal from "../components/ComparisonModal";
import ComparisonBar from "../components/ComparisonBar";
import VirtualTourModal from "../components/VirtualTourModal";
import ConciergeChatWidget from "../components/ConciergeChatWidget";
import StatCardModal from "../components/StatCardModal";

import { useToast } from "../components/Toast";
import { useCurrency } from "../components/CurrencyContext";
import { PROPERTIES_DATA, NEIGHBORHOODS_DATA, formatLocation } from "../data/mockData";
import { 
  ArrowRight, 
  Lock, 
  Globe, 
  ShieldCheck, 
  TrendingUp, 
  Building2, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Heart, 
  Sparkles,
  ArrowUpRight,
  Calculator,
  Briefcase
} from "lucide-react";

export default function Home() {
  const { addToast } = useToast();
  const { formatRawPrice, formatArea } = useCurrency();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [scheduleTargetProperty, setScheduleTargetProperty] = useState(null);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [savedIds, setSavedIds] = useState([]);

  // Comparison State
  const [compareIds, setCompareIds] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Virtual 360 Tour State
  const [virtualTourTitle, setVirtualTourTitle] = useState(null);

  // Stat Card Modal State
  const [statCardType, setStatCardType] = useState(null);

  const handleToggleSave = (id, title) => {
    setSavedIds((prev) => {
      if (prev.includes(id)) {
        addToast(`${title || "Property"} removed from saved portfolio`, "info", "Removed");
        return prev.filter((item) => item !== id);
      } else {
        addToast(`${title || "Property"} added to your private portfolio`, "success", "Saved Residence");
        return [...prev, id];
      }
    });
  };

  const handleToggleCompare = (id, title) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 4) {
        addToast("Comparison suite supports up to 4 assets concurrently", "warning", "Dock Full");
        return prev;
      }
      addToast(`${title || "Property"} added to comparison matrix`, "info", "Added to Compare");
      return [...prev, id];
    });
  };

  const handleScheduleTour = (property) => {
    setScheduleTargetProperty(property);
    setIsScheduleOpen(true);
  };

  const handleOpenGeneralSchedule = () => {
    setScheduleTargetProperty(null);
    setIsScheduleOpen(true);
  };

  // Top 6 curated residences for the homepage showcase
  const featuredShowcase = PROPERTIES_DATA.slice(0, 6);

  // Top 6 global destinations for the homepage teaser
  const featuredDestinations = NEIGHBORHOODS_DATA.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1D20] flex flex-col font-sans selection:bg-[#C5A880]/30 selection:text-[#0A192F]">
      {/* Navigation Header */}
      <Navbar
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenSchedule={handleOpenGeneralSchedule}
        savedCount={savedIds.length}
        onOpenSaved={() => setIsSavedOpen(true)}
      />

      {/* Main Multipage Gateway Content */}
      <main className="flex-1">
        {/* Cinematic Auto-Playing Ken Burns Hero with Continuous Architectural Video */}
        <HeroSection
          onOpenStatModal={(type) => setStatCardType(type)}
        />

        {/* 1. Curated Trophy Masterworks Showcase (6 Curated Cards + Full Collection Link) */}
        <section className="py-14 sm:py-20 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 border-b border-[#E4DCD0]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#C5A880] mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                Curated Trophy Masterworks
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#0A192F] tracking-tight font-bold">
                Featured Global Residences
              </h2>
              <p className="text-[#545B65] text-xs sm:text-sm mt-1 max-w-xl">
                Representing architectural landmarks across Bel-Air, Billionaires' Row, Palm Jumeirah, and Mayfair with Greystar-grade asset management.
              </p>
            </div>

            <Link
              href="/collection"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider transition-all shadow-sm shrink-0"
            >
              <span>Browse All 24+ Properties</span>
              <ArrowRight className="w-4 h-4 text-[#C5A880]" />
            </Link>
          </div>

          {/* 6 Curated Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredShowcase.map((property) => (
              <div
                key={property.id}
                onClick={() => setSelectedProperty(property)}
                className="group bg-white rounded-3xl overflow-hidden border border-[#E4DCD0] shadow-sm hover:shadow-xl hover:border-[#C5A880] transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#0A192F]/90 backdrop-blur-md text-[#EADDC9] border border-[#C5A880]/40 shadow-sm">
                      {property.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-md text-[#0A192F]">
                      {property.status}
                    </span>
                  </div>

                  {/* Top Right Save & Compare Buttons */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleSave(property.id, property.title);
                      }}
                      className="p-2.5 rounded-full bg-white/90 backdrop-blur-md text-[#383E46] hover:text-red-500 hover:scale-110 transition-all shadow-sm"
                      title="Save Residence"
                    >
                      <Heart className={`w-3.5 h-3.5 ${savedIds.includes(property.id) ? "fill-red-500 text-red-500" : ""}`} />
                    </button>
                  </div>

                  {/* Price Tag on Bottom of Image */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-[#C5A880] font-semibold block">
                        Listing Valuation
                      </span>
                      <p suppressHydrationWarning className="text-xl sm:text-2xl font-serif text-white font-bold tracking-tight">
                        {formatRawPrice(property.price)}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-[#EADDC9] bg-[#0A192F]/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#C5A880]/30 font-semibold">
                      Cap {property.capRate}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-[#545B65] font-medium mb-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{formatLocation(property)}</span>
                    </div>
                    <h3 className="text-lg font-serif font-bold text-[#0A192F] group-hover:text-[#C5A880] transition-colors leading-snug">
                      {property.title}
                    </h3>
                    <p className="text-xs text-[#545B65] mt-1.5 leading-relaxed font-sans min-h-[2.4rem]">
                      {property.tagline}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E4DCD0] mt-5 flex items-center justify-between text-xs text-[#545B65] font-medium">
                    <span className="flex items-center gap-1"><Bed className="w-4 h-4 text-[#C5A880]" /> {property.beds} Beds</span>
                    <span className="flex items-center gap-1"><Bath className="w-4 h-4 text-[#C5A880]" /> {property.baths} Baths</span>
                    <span suppressHydrationWarning className="flex items-center gap-1"><Maximize2 className="w-4 h-4 text-[#C5A880]" /> {formatArea(property.sqft, property.sqm)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Callout Banner to Dedicated Collection Page */}
          <div className="mt-12 p-8 rounded-3xl bg-[#0A192F] text-white border border-[#C5A880]/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-[#C5A880] font-bold block mb-1">
                Complete Sovereign Portfolio
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FAF8F5]">
                Looking for Specific Architectural Styles or Price Brackets?
              </h3>
              <p className="text-xs sm:text-sm text-[#DDD4C6] mt-1">
                Our full collection includes 24+ penthouses, waterfront villas, and historic estates across 12 countries.
              </p>
            </div>
            <Link
              href="/collection"
              className="px-6 py-3.5 rounded-xl bg-[#C5A880] hover:bg-[#D8BD99] text-[#0A192F] font-bold text-xs uppercase tracking-wider transition-all shadow-md shrink-0 flex items-center gap-2"
            >
              <span>Explore Dedicated Collection Page</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* 2. The Sovereign Vault Teaser Card (Off-Market Pocket Listings) */}
        <section className="py-14 sm:py-18 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 border-b border-[#E4DCD0]">
          <div className="relative rounded-3xl overflow-hidden bg-[#060D18] border border-[#C5A880]/50 p-8 sm:p-14 text-white shadow-2xl">
            {/* Subtle luxury glow effect */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A192F] text-[#EADDC9] border border-[#C5A880]/40 text-xs font-mono uppercase tracking-widest mb-4">
                <Lock className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Strict Non-Disclosure Protocol · Off-Market Private Treaties</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#FAF8F5] tracking-tight mb-4">
                The Sovereign Vault
              </h2>
              <p className="text-sm sm:text-base text-[#DDD4C6] leading-relaxed mb-6">
                Representing $348,000,000+ in discreet off-market pocket listings, diplomatic residences, and unlisted sovereign compounds protected outside public MLS registries. Access requires authorized family office keycode clearance.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/vault"
                  className="px-6 py-3.5 rounded-xl bg-[#FAF8F5] hover:bg-white text-[#0A192F] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
                >
                  <Lock className="w-4 h-4 text-[#C5A880]" />
                  <span>Enter The Sovereign Vault Page</span>
                  <ArrowRight className="w-4 h-4 text-[#0A192F]" />
                </Link>
                <span className="text-xs text-[#A8B2C1] font-mono">
                  Demo Passcode: <span className="text-[#C5A880] font-bold">STERLING2026</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Global Flagship Destinations Teaser (12 Sovereign Havens Link) */}
        <section className="py-14 sm:py-20 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 border-b border-[#E4DCD0]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#C5A880] mb-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#C5A880]" />
                Douglas Elliman Heritage
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#0A192F] tracking-tight font-bold">
                Global Flagship Chambers
              </h2>
              <p className="text-[#545B65] text-xs sm:text-sm mt-1 max-w-xl">
                Representing premier real estate across 12 resilient sovereign havens from London garden squares to Dubai coastal sanctuaries.
              </p>
            </div>

            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#E4DCD0] hover:border-[#C5A880] text-[#0A192F] text-xs font-semibold uppercase tracking-wider transition-all shadow-2xs shrink-0"
            >
              <span>Explore All 12 Destinations</span>
              <ArrowRight className="w-4 h-4 text-[#C5A880]" />
            </Link>
          </div>

          {/* 6 Destination Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDestinations.map((dest) => (
              <Link
                key={dest.id}
                href="/destinations"
                className="group relative rounded-3xl overflow-hidden aspect-[4/3] border border-[#E4DCD0] hover:border-[#C5A880] shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider bg-[#0A192F]/85 backdrop-blur-md text-[#EADDC9] border border-[#C5A880]/40">
                    Avg Yield {dest.avgYield}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-white bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-md">
                    Median {dest.medianPrice}
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                  <span className="text-xs text-[#C5A880] font-medium block mb-1">
                    {dest.tag}
                  </span>
                  <h3 className="text-xl font-serif text-white font-bold group-hover:text-[#EADDC9] transition-colors flex items-center justify-between">
                    <span>{dest.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:text-[#C5A880] transition-colors" />
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. Institutional Services & Financial Suite Split Teaser */}
        <section className="py-14 sm:py-20 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 border-b border-[#E4DCD0]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Card: Property Management */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E4DCD0] shadow-sm flex flex-col justify-between hover:border-[#C5A880] transition-all">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5] text-[#0A192F] border border-[#E4DCD0] text-xs font-mono uppercase tracking-wider font-semibold mb-4">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Greystar-Grade SLA</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A192F] mb-3">
                  Institutional Asset & Property Management
                </h3>
                <p className="text-xs sm:text-sm text-[#545B65] leading-relaxed mb-6">
                  99.4% cross-portfolio occupancy commitment, 18-day average resident placement, and zero markup on maintenance contracts. Turnkey oversight designed to compound generational net operating income.
                </p>
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E4DCD0] mb-6 text-center">
                  <div>
                    <span className="text-lg font-serif font-bold text-[#0A192F] block">99.4%</span>
                    <span className="text-[10px] text-[#545B65] font-mono uppercase">Occupancy</span>
                  </div>
                  <div className="border-x border-[#E4DCD0]">
                    <span className="text-lg font-serif font-bold text-[#0A192F] block">18 Days</span>
                    <span className="text-[10px] text-[#545B65] font-mono uppercase">Placement</span>
                  </div>
                  <div>
                    <span className="text-lg font-serif font-bold text-[#C5A880] block">0%</span>
                    <span className="text-[10px] text-[#545B65] font-mono uppercase">Vendor Markup</span>
                  </div>
                </div>
              </div>

              <Link
                href="/management"
                className="w-full py-3.5 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] font-semibold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2"
              >
                <span>Dedicated Management Webpage</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880]" />
              </Link>
            </div>

            {/* Right Card: Financial Intelligence & Yield Optimization */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E4DCD0] shadow-sm flex flex-col justify-between hover:border-[#C5A880] transition-all">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5] text-[#0A192F] border border-[#E4DCD0] text-xs font-mono uppercase tracking-wider font-semibold mb-4">
                  <TrendingUp className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Quantitative Underwriting</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A192F] mb-3">
                  Yield Intelligence & Financial Suite
                </h3>
                <p className="text-xs sm:text-sm text-[#545B65] leading-relaxed mb-6">
                  Interactive 10-year cash flow projections, global cap rate heatmaps, automated estate valuation models, and tax-shielded 1031 like-kind exchange frameworks.
                </p>
                <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E4DCD0] mb-6">
                  <div className="flex items-center gap-2.5">
                    <Calculator className="w-4 h-4 text-[#C5A880]" />
                    <span className="text-xs font-semibold text-[#0A192F]">Jumbo Debt Modeling</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <TrendingUp className="w-4 h-4 text-[#C5A880]" />
                    <span className="text-xs font-semibold text-[#0A192F]">Cap Rate Heatmap</span>
                  </div>
                </div>
              </div>

              <Link
                href="/financials"
                className="w-full py-3.5 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] font-semibold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2"
              >
                <span>Dedicated Financial Suite Webpage</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880]" />
              </Link>
            </div>
          </div>
        </section>

        {/* 5. Family Office Advisory Consultation Spotlight */}
        <section className="py-14 sm:py-20 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#FAF8F5] border border-[#C5A880]/50 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0A192F] text-[#C5A880] flex items-center justify-center mx-auto mb-2 shadow-sm">
              <Briefcase className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase font-mono tracking-widest text-[#C5A880] font-bold block">
              Family Office & Private Treaties
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0A192F]">
              Discreet Sovereign Representation
            </h2>
            <p className="text-xs sm:text-sm text-[#545B65] max-w-2xl mx-auto leading-relaxed">
              Sterling Key advises sovereign entities, family offices, and qualified institutional trustees on complex multi-jurisdictional real estate transactions.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/advisory"
                className="px-6 py-3.5 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] font-semibold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-2"
              >
                <span>Open Dedicated Advisory Webpage</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880]" />
              </Link>
              <button
                onClick={handleOpenGeneralSchedule}
                className="px-6 py-3.5 rounded-xl bg-white border border-[#E4DCD0] hover:border-[#C5A880] text-[#0A192F] font-semibold text-xs uppercase tracking-wider transition-all shadow-2xs"
              >
                Schedule Private Consultation
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenSchedule={handleOpenGeneralSchedule}
      />

      {/* Sticky Bottom Comparison Floating Dock */}
      <ComparisonBar
        compareIds={compareIds}
        onOpenModal={() => setIsCompareModalOpen(true)}
        onRemoveId={(id) => handleToggleCompare(id)}
        onClearAll={() => setCompareIds([])}
      />

      {/* Interactive Modals & Drawers */}
      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onScheduleTour={handleScheduleTour}
        isSaved={selectedProperty && savedIds.includes(selectedProperty.id)}
        onToggleSave={() => selectedProperty && handleToggleSave(selectedProperty.id, selectedProperty.title)}
      />

      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        property={scheduleTargetProperty}
      />

      <PortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
      />

      <SavedDrawer
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        savedIds={savedIds}
        properties={PROPERTIES_DATA}
        onSelectProperty={(prop) => {
          setIsSavedOpen(false);
          setSelectedProperty(prop);
        }}
        onRemoveSaved={(id) => handleToggleSave(id)}
      />

      <ComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        compareIds={compareIds}
        properties={PROPERTIES_DATA}
        onRemoveFromCompare={(id) => handleToggleCompare(id)}
        onScheduleTour={handleScheduleTour}
      />

      <VirtualTourModal
        isOpen={!!virtualTourTitle}
        onClose={() => setVirtualTourTitle(null)}
        propertyTitle={virtualTourTitle}
      />

      <StatCardModal
        type={statCardType}
        onClose={() => setStatCardType(null)}
        onOpenSchedule={handleOpenGeneralSchedule}
      />

      {/* Floating Concierge Chatbot Widget */}
      <ConciergeChatWidget />
    </div>
  );
}
