"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  X, 
  MapPin, 
  Calendar, 
  Phone, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  Share2, 
  Compass, 
  Layers, 
  TrendingUp, 
  FileText, 
  Rotate3D,
  ExternalLink
} from "lucide-react";
import { useCurrency } from "./CurrencyContext";
import { useToast } from "./Toast";

export default function PropertyModal({ 
  property, 
  onClose, 
  onScheduleTour,
  onLaunchVirtualTour
}) {
  const { formatRawPrice, formatArea } = useCurrency();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const contentRef = useRef(null);

  // Prevent background page scrolling when modal is open
  useEffect(() => {
    if (!property) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [property]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Always reset scroll to top when modal opens or tab changes so details are never hidden
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [property?.id, activeTab]);

  if (!property) return null;

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/properties/${property.id}`);
      addToast(`Encrypted dossier link for ${property.title} copied to clipboard`, "success", "Link Copied");
    }
  };

  const images = property.images && property.images.length > 0
    ? property.images
    : ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"];

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#0A192F]/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl lg:max-w-5xl max-h-[94vh] sm:max-h-[92vh] bg-[#FAF8F5] border border-[#E4DCD0] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto text-[#1A1D20]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Controls - Clean Separation to Prevent Overlap */}
        {/* Top-Right: Action buttons + Close */}
        <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-30 flex items-center gap-1.5 sm:gap-2">
          {/* Full Dossier Page link (visible on desktop in top-bar; on mobile shown under title) */}
          <Link
            href={`/properties/${property.id}`}
            className="hidden sm:inline-flex py-1.5 px-3 rounded-full bg-white/95 hover:bg-[#FAF8F5] text-[#0A192F] border border-[#E4DCD0] text-xs font-semibold uppercase tracking-wider items-center gap-1.5 transition-all shadow-sm"
          >
            <span>Full Dossier Page</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#C5A880]" />
          </Link>

          {onLaunchVirtualTour && (
            <button
              onClick={() => onLaunchVirtualTour(property.title)}
              className="hidden sm:inline-flex py-1.5 px-3 rounded-full bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] border border-[#C5A880]/30 text-xs font-semibold uppercase tracking-wider items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <Rotate3D className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>360° Tour</span>
            </button>
          )}

          <button
            onClick={handleShare}
            className="hidden sm:inline-flex p-2 rounded-full bg-white/95 hover:bg-[#FAF8F5] text-[#0A192F] hover:text-[#C5A880] border border-[#E4DCD0] transition-all shadow-sm cursor-pointer"
            title="Share Dossier"
          >
            <Share2 className="w-4 h-4" />
          </button>
          
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full bg-white/95 hover:bg-[#FAF8F5] text-[#0A192F] hover:text-[#C5A880] border border-[#E4DCD0] transition-all shadow-md cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>
        </div>

        {/* Top-Left: Badges with safe max-width so they NEVER collide with top-right close button */}
        <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-20 flex items-center gap-1.5 max-w-[calc(100%-54px)] sm:max-w-md flex-wrap">
          {property.status && (
            <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#0A192F] text-[#FAF8F5] border border-[#C5A880]/40 shadow-sm shrink-0">
              {property.status}
            </span>
          )}
          {property.category && (
            <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-white/95 text-[#0A192F] border border-[#E4DCD0] shadow-sm truncate shrink-0 max-w-[140px] sm:max-w-none">
              {property.category}
            </span>
          )}
        </div>

        {/* Gallery Carousel - Optimized Height on Mobile */}
        <div className="relative h-44 sm:h-64 md:h-72 w-full bg-[#EFE9DF] shrink-0 border-b border-[#E4DCD0]">
          <img
            src={images[activeImgIndex] || images[0]}
            alt={property.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80";
            }}
            className="w-full h-full object-cover transition-opacity duration-300"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5]/80 via-transparent to-[#FAF8F5]/30 pointer-events-none" />

          {/* Carousel Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setActiveImgIndex(
                    (prev) => (prev - 1 + images.length) % images.length
                  )
                }
                className="absolute left-2.5 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-white/90 hover:bg-white text-[#0A192F] transition-all shadow-md cursor-pointer z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() =>
                  setActiveImgIndex((prev) => (prev + 1) % images.length)
                }
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-white/90 hover:bg-white text-[#0A192F] transition-all shadow-md cursor-pointer z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Thumbnails Row */}
              <div className="absolute bottom-2 left-4 right-4 sm:bottom-3 sm:left-6 sm:right-6 flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto py-1 no-scrollbar z-10">
                {images.slice(0, 6).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative w-10 h-7 sm:w-14 sm:h-9 rounded-md sm:rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImgIndex === idx
                        ? "border-[#C5A880] scale-105 shadow-md"
                        : "border-white/80 opacity-75 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Modal Navigation Tabs - Horizontal Scrollable & Safe on Mobile */}
        <div className="bg-white border-b border-[#E4DCD0] px-3 sm:px-8 flex items-center gap-2 sm:gap-6 shrink-0 overflow-x-auto no-scrollbar whitespace-nowrap">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-2.5 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm uppercase tracking-wider font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === "overview"
                ? "border-[#0A192F] text-[#0A192F]"
                : "border-transparent text-[#747D88] hover:text-[#0A192F]"
            }`}
          >
            <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A880] shrink-0" />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveTab("floorplan")}
            className={`py-2.5 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm uppercase tracking-wider font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === "floorplan"
                ? "border-[#0A192F] text-[#0A192F]"
                : "border-transparent text-[#747D88] hover:text-[#0A192F]"
            }`}
          >
            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A880] shrink-0" />
            <span>Floor Plans & Specs</span>
          </button>
          <button
            onClick={() => setActiveTab("financials")}
            className={`py-2.5 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm uppercase tracking-wider font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === "financials"
                ? "border-[#0A192F] text-[#0A192F]"
                : "border-transparent text-[#747D88] hover:text-[#0A192F]"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A880] shrink-0" />
            <span>Yield & Capital</span>
          </button>
        </div>

        {/* Modal Body - Always Starts at Top (contentRef) with Clear Typographic Hierarchy */}
        <div 
          ref={contentRef}
          className="p-4 sm:p-7 space-y-4 sm:space-y-6 overflow-y-auto flex-1 min-h-0 bg-[#FAF8F5]"
        >
          {/* Title, Address & Price Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-[#E4DCD0] pb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center text-xs text-[#747D88] font-semibold mb-1">
                <MapPin className="w-3.5 h-3.5 mr-1 text-[#C5A880] shrink-0" />
                <span className="truncate">{property.address}, {property.neighborhood}, {property.city}</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-[#0A192F] font-bold leading-snug">
                {property.title}
              </h2>
              {property.tagline && (
                <p className="text-xs sm:text-sm text-[#545B65] italic mt-0.5">
                  "{property.tagline}"
                </p>
              )}

              {/* Mobile Dossier Link */}
              <div className="mt-2.5 sm:hidden flex items-center gap-2">
                <Link
                  href={`/properties/${property.id}`}
                  className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-white text-[#0A192F] border border-[#E4DCD0] text-[11px] font-bold uppercase tracking-wider shadow-xs hover:border-[#C5A880]"
                >
                  <span>Full Dossier Page</span>
                  <ExternalLink className="w-3 h-3 text-[#C5A880]" />
                </Link>
                {onLaunchVirtualTour && (
                  <button
                    onClick={() => onLaunchVirtualTour(property.title)}
                    className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#0A192F] text-[#FAF8F5] text-[11px] font-bold uppercase tracking-wider shadow-xs"
                  >
                    <Rotate3D className="w-3 h-3 text-[#C5A880]" />
                    <span>360° Tour</span>
                  </button>
                )}
              </div>
            </div>

            <div className="text-left sm:text-right shrink-0 pt-1 sm:pt-0">
              <div className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#0A192F] tracking-tight">
                {formatRawPrice(property.price)}
              </div>
              {property.rentalPrice && (
                <div className="text-[11px] sm:text-xs text-[#545B65] font-sans mt-0.5 font-medium">
                  Lease: {property.rentalPrice}
                </div>
              )}
            </div>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-5 sm:space-y-6 animate-fade-in">
              {/* Key Specs: 6 Cards in Balanced Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
                <div className="bg-white border border-[#E4DCD0] rounded-xl sm:rounded-2xl p-2 sm:p-3 text-center shadow-xs">
                  <div className="text-[9px] sm:text-[11px] text-[#747D88] uppercase tracking-wider font-bold">Bedrooms</div>
                  <div className="text-sm sm:text-lg font-bold text-[#0A192F] font-mono mt-0.5">{property.beds}</div>
                </div>
                <div className="bg-white border border-[#E4DCD0] rounded-xl sm:rounded-2xl p-2 sm:p-3 text-center shadow-xs">
                  <div className="text-[9px] sm:text-[11px] text-[#747D88] uppercase tracking-wider font-bold">Bathrooms</div>
                  <div className="text-sm sm:text-lg font-bold text-[#0A192F] font-mono mt-0.5">{property.baths}</div>
                </div>
                <div className="bg-white border border-[#E4DCD0] rounded-xl sm:rounded-2xl p-2 sm:p-3 text-center shadow-xs">
                  <div className="text-[9px] sm:text-[11px] text-[#747D88] uppercase tracking-wider font-bold">Interior</div>
                  <div className="text-xs sm:text-base font-bold text-[#0A192F] font-mono mt-0.5 truncate">{formatArea(property.sqft, property.sqm)}</div>
                </div>
                <div className="bg-white border border-[#E4DCD0] rounded-xl sm:rounded-2xl p-2 sm:p-3 text-center shadow-xs">
                  <div className="text-[9px] sm:text-[11px] text-[#747D88] uppercase tracking-wider font-bold">Lot Size</div>
                  <div className="text-xs sm:text-base font-bold text-[#0A192F] font-mono mt-0.5 truncate">{property.lotSize}</div>
                </div>
                <div className="bg-white border border-[#E4DCD0] rounded-xl sm:rounded-2xl p-2 sm:p-3 text-center shadow-xs">
                  <div className="text-[9px] sm:text-[11px] text-[#747D88] uppercase tracking-wider font-bold">Year Built</div>
                  <div className="text-sm sm:text-lg font-bold text-[#0A192F] font-mono mt-0.5">{property.yearBuilt}</div>
                </div>
                <div className="bg-white border border-[#E4DCD0] rounded-xl sm:rounded-2xl p-2 sm:p-3 text-center shadow-xs">
                  <div className="text-[9px] sm:text-[11px] text-[#747D88] uppercase tracking-wider font-bold">Proj. Yield</div>
                  <div className="text-sm sm:text-lg font-bold text-[#C5A880] font-mono mt-0.5">{property.capRate || "5.2%"}</div>
                </div>
              </div>

              {/* Architectural Narrative */}
              <div>
                <h3 className="text-xs uppercase font-mono tracking-wider text-[#0A192F] font-bold mb-1.5 sm:mb-2">
                  Architectural Narrative
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-[#1A1D20] leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Amenities Grid */}
              <div>
                <h3 className="text-xs uppercase font-mono tracking-wider text-[#0A192F] font-bold mb-2 sm:mb-3">
                  Estate Amenities & Master Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {property.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 sm:p-2.5 px-3 rounded-xl bg-white border border-[#E4DCD0] text-xs sm:text-sm text-[#1A1D20] shadow-xs">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#C5A880] shrink-0" />
                      <span className="truncate font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FLOOR PLANS & SPECS */}
          {activeTab === "floorplan" && (
            <div className="space-y-4 sm:space-y-5 animate-fade-in">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-sm">
                <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white border border-[#E4DCD0] shadow-xs">
                  <span className="text-[10px] sm:text-xs text-[#747D88] uppercase block font-bold">Levels / Storeys</span>
                  <span className="text-[#0A192F] font-mono font-bold text-xs sm:text-base mt-0.5 block">{property.floorPlan?.levels || 2} Floors</span>
                </div>
                <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white border border-[#E4DCD0] shadow-xs">
                  <span className="text-[10px] sm:text-xs text-[#747D88] uppercase block font-bold">Ceiling Height</span>
                  <span className="text-[#0A192F] font-mono font-bold text-xs sm:text-base mt-0.5 block">{property.floorPlan?.ceilingHeight || "14 FT"}</span>
                </div>
                <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white border border-[#E4DCD0] shadow-xs">
                  <span className="text-[10px] sm:text-xs text-[#747D88] uppercase block font-bold">Outdoor Living</span>
                  <span className="text-[#0A192F] font-mono font-bold text-xs sm:text-base mt-0.5 block truncate">{property.floorPlan?.outdoorDeck || "3,200 SF"}</span>
                </div>
                <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white border border-[#E4DCD0] shadow-xs">
                  <span className="text-[10px] sm:text-xs text-[#747D88] uppercase block font-bold">Gallery Garage</span>
                  <span className="text-[#0A192F] font-mono font-bold text-xs sm:text-base mt-0.5 block truncate">{property.floorPlan?.galleryCars || 4} Enclosed Cars</span>
                </div>
              </div>

              {/* Floor Plan Visual Representation */}
              <div className="relative aspect-[16/9] sm:aspect-[16/8] rounded-xl sm:rounded-2xl overflow-hidden border border-[#E4DCD0] bg-white flex items-center justify-center p-4 sm:p-6 shadow-xs">
                <img
                  src={property.floorPlan?.planImage || images[0]}
                  alt="Architectural Floor Plan"
                  className="w-full h-full object-contain filter contrast-105"
                />
                <div className="absolute inset-0 bg-[#0A192F]/65 flex flex-col items-center justify-center p-4 text-center backdrop-blur-xs">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center text-[#C5A880] mb-2 shadow-sm">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h4 className="text-sm sm:text-lg font-serif text-[#FAF8F5] font-bold">CAD Vector Schematics Verified</h4>
                  <p className="text-[11px] sm:text-xs text-[#DDD4C6] max-w-md mt-1 leading-relaxed">
                    Complete CAD floor plans and structural blueprints are available upon confidential registration.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FINANCIALS */}
          {activeTab === "financials" && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 text-sm">
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#E4DCD0] shadow-xs">
                  <span className="text-[10px] sm:text-xs text-[#747D88] uppercase block font-bold">Projected Cap Rate</span>
                  <span className="text-lg sm:text-2xl text-[#C5A880] font-mono font-bold mt-1 block">{property.capRate || "5.8%"}</span>
                  <span className="text-[11px] sm:text-xs text-[#545B65] mt-0.5 block font-medium">Institutional benchmark yield</span>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#E4DCD0] shadow-xs">
                  <span className="text-[10px] sm:text-xs text-[#747D88] uppercase block font-bold">Annual Property Tax</span>
                  <span className="text-lg sm:text-2xl text-[#0A192F] font-mono font-bold mt-1 block">{property.taxesAnnual || "$180,000"}</span>
                  <span className="text-[11px] sm:text-xs text-[#545B65] mt-0.5 block font-medium">Escrow audited estimate</span>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#E4DCD0] shadow-xs">
                  <span className="text-[10px] sm:text-xs text-[#747D88] uppercase block font-bold">Monthly HOA & Dues</span>
                  <span className="text-lg sm:text-2xl text-[#0A192F] font-mono font-bold mt-1 block">{property.hoa || "$1,250 / mo"}</span>
                  <span className="text-[11px] sm:text-xs text-[#545B65] mt-0.5 block font-medium">White-glove concierge</span>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#E4DCD0] text-xs sm:text-sm text-[#1A1D20] shadow-xs leading-relaxed">
                <span className="text-[#0A192F] font-bold block mb-1">Sterling Key Institutional Management Guarantee:</span>
                Under our Signature Portfolio oversight, this asset qualifies for guaranteed automated ACH distributions by the 5th of each month, 24/7 dedicated dispatch, and 0% repair markup policy.
              </div>
            </div>
          )}
        </div>

        {/* Representing Advisor & Actions Sticky Footer - Fully Responsive */}
        <div className="bg-white border-t border-[#E4DCD0] px-3 py-2.5 sm:px-8 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 shrink-0 shadow-lg">
          <div className="flex items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
            <img
              src={property.agent.image}
              alt={property.agent.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
              }}
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-[#C5A880] shrink-0"
            />
            <div className="min-w-0 flex-1 sm:flex-none">
              <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#C5A880] font-bold truncate">
                Represented Exclusively By
              </div>
              <div className="text-xs sm:text-sm font-serif text-[#0A192F] font-bold truncate">
                {property.agent.name}
              </div>
              <div className="text-[10px] sm:text-xs text-[#747D88] truncate hidden sm:block">
                {property.agent.title}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                onClose();
                onScheduleTour(property);
              }}
              className="flex-1 sm:flex-none py-2.5 px-4 sm:py-3 sm:px-5 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-md whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A880]" />
              <span>Schedule Showing</span>
            </button>
            <a
              href={`tel:${property.agent.phone}`}
              className="py-2.5 px-3 sm:py-3 sm:px-4 rounded-xl bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#0A192F] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all border border-[#E4DCD0] whitespace-nowrap shadow-xs"
              title="Call Representative"
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A880]" />
              <span className="hidden sm:inline">Call</span>
            </a>
            <button
              onClick={() => addToast(`Brochure and confidential floor plan for ${property.title} downloaded`, "success", "Brochure Ready")}
              className="py-2.5 px-3 sm:py-3 sm:px-4 rounded-xl bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#0A192F] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all border border-[#E4DCD0] whitespace-nowrap shadow-xs cursor-pointer"
              title="Download Brochure"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A880]" />
              <span className="hidden sm:inline">Brochure</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
