"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConciergeChatWidget from "@/components/ConciergeChatWidget";
import ScheduleModal from "@/components/ScheduleModal";
import PortalModal from "@/components/PortalModal";
import PropertyModal from "@/components/PropertyModal";
import DestinationModal from "@/components/DestinationModal";
import SavedDrawer from "@/components/SavedDrawer";
import { 
  ArrowLeft, 
  Globe, 
  MapPin, 
  ArrowUpRight, 
  TrendingUp, 
  ShieldCheck, 
  Building2, 
  Bed, 
  Bath, 
  Maximize2, 
  Heart,
  SlidersHorizontal,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { PROPERTIES_DATA, NEIGHBORHOODS_DATA, formatLocation } from "@/data/mockData";
import { useCurrency } from "@/components/CurrencyContext";
import { useToast } from "@/components/Toast";

// Helper to reliably match properties to a destination
export const getDestinationProperties = (dest) => {
  if (!dest) return [];
  const id = (dest.id || "").toLowerCase();
  return PROPERTIES_DATA.filter((p) => {
    const pCity = (p.city || "").toLowerCase();
    const pNeigh = (p.neighborhood || "").toLowerCase();
    
    if (id === "manhattan") return pCity.includes("new york") || pNeigh.includes("manhattan") || pNeigh.includes("tribeca") || pNeigh.includes("billionaires") || pNeigh.includes("village");
    if (id === "los-angeles") return pCity.includes("los angeles") || pNeigh.includes("bel-air") || pNeigh.includes("beverly") || pNeigh.includes("malibu") || pNeigh.includes("brentwood");
    if (id === "miami") return pCity.includes("miami");
    if (id === "london") return pCity.includes("london") || pNeigh.includes("mayfair") || pNeigh.includes("belgravia");
    if (id === "aspen") return pCity.includes("aspen");
    if (id === "dubai") return pCity.includes("dubai");
    if (id === "monaco") return pCity.includes("monaco") || pCity.includes("riviera");
    if (id === "paris") return pCity.includes("paris") || pNeigh.includes("marais");
    if (id === "lake-como") return pCity.includes("lake como") || pCity.includes("milan") || pNeigh.includes("bellagio");
    if (id === "tokyo") return pCity.includes("tokyo") || pNeigh.includes("toranomon");
    if (id === "geneva") return pCity.includes("geneva") || pCity.includes("swiss") || pNeigh.includes("cologny");
    if (id === "bahamas") return pCity.includes("bahamas") || pNeigh.includes("lyford");
    return false;
  });
};

export default function DestinationsPage() {
  const { formatRawPrice, formatArea } = useCurrency();
  const { addToast } = useToast();
  const [selectedCityId, setSelectedCityId] = useState(NEIGHBORHOODS_DATA[0].id);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [portalOpen, setPortalOpen] = useState(false);
  const [savedIds, setSavedIds] = useState([]);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);

  const activeDestination = useMemo(() => {
    return NEIGHBORHOODS_DATA.find((c) => c.id === selectedCityId) || NEIGHBORHOODS_DATA[0];
  }, [selectedCityId]);

  // Find properties matching the selected destination
  const destinationProperties = useMemo(() => {
    return getDestinationProperties(activeDestination);
  }, [activeDestination]);

  const handleToggleSave = (id, title) => {
    setSavedIds((prev) => {
      if (prev.includes(id)) {
        addToast(`${title} removed from saved portfolio`, "info", "Removed");
        return prev.filter((i) => i !== id);
      } else {
        addToast(`${title} saved to your private portfolio`, "success", "Saved Residence");
        return [...prev, id];
      }
    });
  };

  const handleCardClick = (city) => {
    setSelectedCityId(city.id);
    setSelectedDestination(city);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1D20] flex flex-col font-sans selection:bg-[#C5A880]/30 selection:text-[#0A192F]">
      <Navbar
        onOpenPortal={() => setPortalOpen(true)}
        onOpenSchedule={() => setScheduleModalOpen(true)}
        savedCount={savedIds.length}
        onOpenSaved={() => setSavedDrawerOpen(true)}
      />

      <main className="flex-1 w-full pt-3 pb-10 sm:pt-5 sm:pb-14">
        {/* Navigation Breadcrumb */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 mb-3 sm:mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#545B65] hover:text-[#0A192F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C5A880]" />
            <span>Return to Global Overview</span>
          </Link>
        </div>

        {/* Page Hero Header */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 mb-6 sm:mb-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0A192F] text-white border border-[#C5A880]/40 shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/20 text-[#EADDC9] border border-[#C5A880]/30 text-xs font-mono uppercase tracking-widest mb-4">
                <Globe className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>12 Global Flagship Chambers · Sovereign Havens</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#FAF8F5] tracking-tight mb-4 leading-tight">
                Global Flagship Destinations & Regional Intelligence
              </h1>
              <p className="text-sm sm:text-base text-[#DDD4C6] leading-relaxed">
                From historic Mayfair garden squares to Dubai tax-free waterfront compounds and Swiss alpine retreats. Explore real estate market metrics, sovereign tax shields, and active flagship residences across 12 prime world capitals.
              </p>
            </div>
            
            {/* Background subtle watermark */}
            <div className="absolute right-0 bottom-0 top-0 opacity-10 pointer-events-none flex items-center pr-12 hidden lg:flex">
              <Building2 className="w-80 h-80 text-[#C5A880]" />
            </div>
          </div>
        </div>

        {/* 12 Global Flagship Chambers Grid */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 mb-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 border-b border-[#E4DCD0] pb-4">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A880] font-bold block mb-1">
                Territorial Coverage
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A192F]">
                Select a Flagship Chamber
              </h2>
            </div>
            <span className="text-xs text-[#545B65] font-mono">
              Click any chamber card to open regional dossier & active residences
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {NEIGHBORHOODS_DATA.map((city) => {
              const isSelected = city.id === selectedCityId;
              const matchingPropsCount = getDestinationProperties(city).length;

              return (
                <div
                  key={city.id}
                  onClick={() => handleCardClick(city)}
                  className={`group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer border transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 ${
                    isSelected
                      ? "border-[#C5A880] ring-3 ring-[#C5A880]/50 scale-[1.02]"
                      : "border-[#E4DCD0] hover:border-[#C5A880]"
                  }`}
                  title={`Open ${city.name} dossier`}
                >
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-opacity duration-300" />

                  {/* Badges on Top */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-[#0A192F]/85 backdrop-blur-md text-[#EADDC9] border border-[#C5A880]/40 shadow-sm">
                      Avg Yield {city.avgYield}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-white bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-md border border-white/10">
                      {city.activeCount || `${matchingPropsCount} Properties`}
                    </span>
                  </div>

                  {/* Destination Info on Bottom */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] text-[#C5A880] font-medium pr-2">
                        {city.tag}
                      </span>
                      <span className="p-1 rounded-full bg-white/20 backdrop-blur-xs group-hover:bg-[#C5A880] text-white transition-all shrink-0">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-serif text-white font-bold leading-snug group-hover:text-[#EADDC9] transition-colors">
                      {city.name}
                    </h3>
                    <p className="text-[10px] text-white/75 font-mono mt-0.5">
                      Median: {city.medianPrice}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Destination Spotlight & Active Properties On-Page */}
        <div id="selected-destination" className="max-w-[1600px] mx-auto px-4 sm:px-8 pt-4 pb-16">
          <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#E4DCD0] shadow-sm mb-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E4DCD0]">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs text-[#C5A880] font-mono uppercase tracking-widest font-semibold mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Selected Regional Dossier</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A192F]">
                  {activeDestination.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#545B65] mt-1 max-w-2xl">
                  {activeDestination.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 bg-[#FAF8F5] p-4 rounded-2xl border border-[#E4DCD0]">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#545B65] block font-semibold">
                    Median Valuation
                  </span>
                  <span className="text-lg font-serif font-bold text-[#0A192F]">
                    {activeDestination.medianPrice}
                  </span>
                </div>
                <div className="h-8 w-px bg-[#E4DCD0]" />
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#545B65] block font-semibold">
                    Average Rental Yield
                  </span>
                  <span className="text-lg font-serif font-bold text-[#C5A880]">
                    {activeDestination.avgYield}
                  </span>
                </div>
                <div className="h-8 w-px bg-[#E4DCD0]" />
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#545B65] block font-semibold">
                    Prime Districts
                  </span>
                  <span className="text-xs font-semibold text-[#0A192F] block">
                    {activeDestination.districts ? activeDestination.districts.slice(0, 3).join(", ") : "Premier Enclaves"}
                  </span>
                </div>
              </div>
            </div>

            {/* Active Property Listings for this Destination */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif font-bold text-[#0A192F]">
                  Available Flagship Residences in {activeDestination.name.split(",")[0]}
                </h3>
                <Link
                  href={`/collection?destination=${encodeURIComponent(activeDestination.name.split(",")[0])}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C5A880] hover:text-[#0A192F] transition-colors"
                >
                  <span>View All in Collection</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {destinationProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {destinationProperties.map((prop) => (
                    <div
                      key={prop.id}
                      onClick={() => setSelectedProperty(prop)}
                      className="group bg-[#FAF8F5] rounded-2xl overflow-hidden border border-[#E4DCD0] shadow-2xs hover:shadow-lg hover:border-[#C5A880] transition-all cursor-pointer flex flex-col"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                        <img
                          src={prop.images[0]}
                          alt={prop.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 bg-[#0A192F]/85 backdrop-blur-md text-[#EADDC9] px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-semibold">
                          {prop.category}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleSave(prop.id, prop.title);
                          }}
                          className="absolute top-3 right-3 p-2 rounded-full bg-white/85 backdrop-blur-md text-[#383E46] hover:text-red-500 transition-colors shadow-sm cursor-pointer"
                        >
                          <Heart className={`w-3.5 h-3.5 ${savedIds.includes(prop.id) ? "fill-red-500 text-red-500" : ""}`} />
                        </button>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-xs text-[#545B65] mb-1">
                            <span>{formatLocation(prop)}</span>
                            <span className="text-[#C5A880] font-mono font-bold">Cap {prop.capRate}</span>
                          </div>
                          <h4 className="text-base font-serif font-bold text-[#0A192F] group-hover:text-[#C5A880] transition-colors leading-snug">
                            {prop.title}
                          </h4>
                          <p suppressHydrationWarning className="text-lg font-serif font-bold text-[#0A192F] mt-2">
                            {formatRawPrice(prop.price)}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-[#E4DCD0] mt-4 flex items-center justify-between text-xs text-[#545B65]">
                          <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5 text-[#C5A880]" /> {prop.beds} Beds</span>
                          <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5 text-[#C5A880]" /> {prop.baths} Baths</span>
                          <span suppressHydrationWarning className="flex items-center gap-1"><Maximize2 className="w-3.5 h-3.5 text-[#C5A880]" /> {formatArea(prop.sqft, prop.sqm)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-dashed border-[#E4DCD0] text-center">
                  <p className="text-sm text-[#545B65] mb-3">
                    Active offerings in {activeDestination.name} are currently held under discreet off-market Sovereign Vault protocols.
                  </p>
                  <Link
                    href="/vault"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A192F] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#142E54] transition-all"
                  >
                    <span>Check The Sovereign Vault</span>
                    <ArrowUpRight className="w-4 h-4 text-[#C5A880]" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer
        onOpenPortal={() => setPortalOpen(true)}
        onOpenSchedule={() => setScheduleModalOpen(true)}
      />

      {/* Destination Dossier Modal */}
      {selectedDestination && (
        <DestinationModal
          destination={selectedDestination}
          properties={getDestinationProperties(selectedDestination)}
          onClose={() => setSelectedDestination(null)}
          onSelectProperty={(prop) => {
            setSelectedProperty(prop);
          }}
          onScheduleTour={() => setScheduleModalOpen(true)}
        />
      )}

      {/* Property Details Modal */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onScheduleTour={(p) => {
            setSelectedProperty(null);
            setScheduleModalOpen(true);
          }}
          isSaved={savedIds.includes(selectedProperty.id)}
          onToggleSave={() => handleToggleSave(selectedProperty.id, selectedProperty.title)}
        />
      )}

      {scheduleModalOpen && (
        <ScheduleModal
          property={PROPERTIES_DATA[0]}
          onClose={() => setScheduleModalOpen(false)}
        />
      )}

      {portalOpen && (
        <PortalModal onClose={() => setPortalOpen(false)} />
      )}

      {savedDrawerOpen && (
        <SavedDrawer
          isOpen={savedDrawerOpen}
          onClose={() => setSavedDrawerOpen(false)}
          savedIds={savedIds}
          properties={PROPERTIES_DATA}
          onSelectProperty={(p) => {
            setSavedDrawerOpen(false);
            setSelectedProperty(p);
          }}
          onRemoveSaved={(id) => handleToggleSave(id, "Property")}
        />
      )}

      <ConciergeChatWidget />
    </div>
  );
}
