"use client";

import React, { useState } from "react";
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

  if (!property) return null;

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/properties/${property.id}`);
      addToast(`Encrypted dossier link for ${property.title} copied to clipboard`, "success", "Link Copied");
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#0A192F]/40 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl lg:max-w-5xl max-h-[92vh] bg-[#FAF8F5] border border-[#E4DCD0] rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto text-[#1A1D20]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar - Clean Warm Ivory & White Controls, ZERO Black */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <Link
            href={`/properties/${property.id}`}
            className="py-1.5 px-3 rounded-full bg-white/95 hover:bg-[#FAF8F5] text-[#0A192F] border border-[#E4DCD0] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm"
          >
            <span>Full Dossier Page</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#C5A880]" />
          </Link>

          {onLaunchVirtualTour && (
            <button
              onClick={() => onLaunchVirtualTour(property.title)}
              className="py-1.5 px-3 rounded-full bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] border border-[#C5A880]/30 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Rotate3D className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>360° Tour</span>
            </button>
          )}

          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/95 hover:bg-[#FAF8F5] text-[#0A192F] hover:text-[#C5A880] border border-[#E4DCD0] transition-all shadow-sm"
            title="Share Dossier"
          >
            <Share2 className="w-4 h-4" />
          </button>
          
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/95 hover:bg-[#FAF8F5] text-[#0A192F] hover:text-[#C5A880] border border-[#E4DCD0] transition-all shadow-sm cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Gallery Carousel - Warm Ambient Framing, No Black Bars */}
        <div className="relative aspect-[21/9] sm:aspect-[21/8] max-h-[260px] sm:max-h-[320px] w-full bg-[#EFE9DF] shrink-0 border-b border-[#E4DCD0]">
          <img
            src={property.images[activeImgIndex]}
            alt={property.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80";
            }}
            className="w-full h-full object-cover transition-opacity duration-300"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5]/80 via-transparent to-[#FAF8F5]/30 pointer-events-none" />

          {/* Navigation Arrows */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setActiveImgIndex(
                    (prev) => (prev - 1 + property.images.length) % property.images.length
                  )
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-[#0A192F] transition-all shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() =>
                  setActiveImgIndex((prev) => (prev + 1) % property.images.length)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-[#0A192F] transition-all shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Thumbnails Row */}
              <div className="absolute bottom-3 left-6 right-6 flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative w-14 h-9 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      activeImgIndex === idx
                        ? "border-[#C5A880] scale-105 shadow-md"
                        : "border-white/80 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Badges on Gallery */}
          <div className="absolute top-4 left-5 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0A192F] text-[#FAF8F5] border border-[#C5A880]/40 shadow-sm">
              {property.status}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-[#0A192F] border border-[#E4DCD0] shadow-sm">
              {property.category}
            </span>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="bg-white border-b border-[#E4DCD0] px-6 sm:px-8 flex items-center gap-6 sm:gap-8 shrink-0">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-3 text-xs sm:text-sm uppercase tracking-wider font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "overview"
                ? "border-[#0A192F] text-[#0A192F]"
                : "border-transparent text-[#545B65] hover:text-[#0A192F]"
            }`}
          >
            <Compass className="w-4 h-4 text-[#C5A880]" /> Overview
          </button>
          <button
            onClick={() => setActiveTab("floorplan")}
            className={`py-3 text-xs sm:text-sm uppercase tracking-wider font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "floorplan"
                ? "border-[#0A192F] text-[#0A192F]"
                : "border-transparent text-[#545B65] hover:text-[#0A192F]"
            }`}
          >
            <Layers className="w-4 h-4 text-[#C5A880]" /> Floor Plans & Specs
          </button>
          <button
            onClick={() => setActiveTab("financials")}
            className={`py-3 text-xs sm:text-sm uppercase tracking-wider font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "financials"
                ? "border-[#0A192F] text-[#0A192F]"
                : "border-transparent text-[#545B65] hover:text-[#0A192F]"
            }`}
          >
            <TrendingUp className="w-4 h-4 text-[#C5A880]" /> Yield & Capital
          </button>
        </div>

        {/* Modal Body - Warm Ivory, High Contrast Typography */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1 min-h-0 bg-[#FAF8F5]">
          {/* Top Title & Price Bar */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E4DCD0] pb-5">
            <div>
              <div className="flex items-center text-xs sm:text-sm text-[#747D88] font-semibold mb-1">
                <MapPin className="w-4 h-4 mr-1 text-[#C5A880] shrink-0" />
                <span>{property.address}, {property.neighborhood}, {property.city}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#0A192F] font-bold">
                {property.title}
              </h2>
              <p className="text-sm text-[#545B65] italic mt-0.5">
                "{property.tagline}"
              </p>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#0A192F] tracking-tight">
                {formatRawPrice(property.price)}
              </div>
              {property.rentalPrice && (
                <div className="text-xs sm:text-sm text-[#545B65] font-sans mt-0.5 font-medium">
                  Available for lease: {property.rentalPrice}
                </div>
              )}
            </div>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                <div className="bg-white border border-[#E4DCD0] rounded-2xl p-3 text-center shadow-xs">
                  <div className="text-[10px] sm:text-xs text-[#747D88] uppercase tracking-wider font-bold">Bedrooms</div>
                  <div className="text-base sm:text-lg font-bold text-[#0A192F] font-mono mt-1">{property.beds}</div>
                </div>
                <div className="bg-white border border-[#E4DCD0] rounded-2xl p-3 text-center shadow-xs">
                  <div className="text-[10px] sm:text-xs text-[#747D88] uppercase tracking-wider font-bold">Bathrooms</div>
                  <div className="text-base sm:text-lg font-bold text-[#0A192F] font-mono mt-1">{property.baths}</div>
                </div>
                <div className="bg-white border border-[#E4DCD0] rounded-2xl p-3 text-center shadow-xs">
                  <div className="text-[10px] sm:text-xs text-[#747D88] uppercase tracking-wider font-bold">Interior</div>
                  <div className="text-base sm:text-lg font-bold text-[#0A192F] font-mono mt-1">{formatArea(property.sqft, property.sqm)}</div>
                </div>
                <div className="bg-white border border-[#E4DCD0] rounded-2xl p-3 text-center shadow-xs">
                  <div className="text-[10px] sm:text-xs text-[#747D88] uppercase tracking-wider font-bold">Lot Size</div>
                  <div className="text-base sm:text-lg font-bold text-[#0A192F] font-mono mt-1 truncate">{property.lotSize}</div>
                </div>
                <div className="bg-white border border-[#E4DCD0] rounded-2xl p-3 text-center shadow-xs">
                  <div className="text-[10px] sm:text-xs text-[#747D88] uppercase tracking-wider font-bold">Year Built</div>
                  <div className="text-base sm:text-lg font-bold text-[#0A192F] font-mono mt-1">{property.yearBuilt}</div>
                </div>
                <div className="bg-white border border-[#E4DCD0] rounded-2xl p-3 text-center shadow-xs">
                  <div className="text-[10px] sm:text-xs text-[#747D88] uppercase tracking-wider font-bold">Proj. Yield</div>
                  <div className="text-base sm:text-lg font-bold text-[#C5A880] font-mono mt-1">{property.capRate || "5.2%"}</div>
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase font-mono tracking-wider text-[#0A192F] font-bold mb-2">
                  Architectural Narrative
                </h3>
                <p className="text-sm sm:text-base text-[#1A1D20] leading-relaxed">
                  {property.description}
                </p>
              </div>

              <div>
                <h3 className="text-xs uppercase font-mono tracking-wider text-[#0A192F] font-bold mb-3">
                  Estate Amenities & Master Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {property.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 px-3 rounded-xl bg-white border border-[#E4DCD0] text-xs sm:text-sm text-[#1A1D20] shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-[#C5A880] shrink-0" />
                      <span className="truncate font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FLOOR PLANS & SPECS */}
          {activeTab === "floorplan" && (
            <div className="space-y-5 animate-fade-in">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div className="p-3.5 rounded-2xl bg-white border border-[#E4DCD0] shadow-xs">
                  <span className="text-xs text-[#747D88] uppercase block font-bold">Levels / Storeys</span>
                  <span className="text-[#0A192F] font-mono font-bold text-sm sm:text-base mt-0.5 block">{property.floorPlan?.levels || 2} Floors</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-[#E4DCD0] shadow-xs">
                  <span className="text-xs text-[#747D88] uppercase block font-bold">Ceiling Height</span>
                  <span className="text-[#0A192F] font-mono font-bold text-sm sm:text-base mt-0.5 block">{property.floorPlan?.ceilingHeight || "14 FT"}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-[#E4DCD0] shadow-xs">
                  <span className="text-xs text-[#747D88] uppercase block font-bold">Outdoor Living</span>
                  <span className="text-[#0A192F] font-mono font-bold text-sm sm:text-base mt-0.5 block">{property.floorPlan?.outdoorDeck || "3,200 SF"}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-[#E4DCD0] shadow-xs">
                  <span className="text-xs text-[#747D88] uppercase block font-bold">Gallery Garage</span>
                  <span className="text-[#0A192F] font-mono font-bold text-sm sm:text-base mt-0.5 block">{property.floorPlan?.galleryCars || 4} Enclosed Cars</span>
                </div>
              </div>

              {/* Floor Plan Display in Warm Ivory & White Canvas */}
              <div className="relative aspect-[16/8] rounded-2xl overflow-hidden border border-[#E4DCD0] bg-white flex items-center justify-center p-6 shadow-xs">
                <img
                  src={property.floorPlan?.planImage || property.images[0]}
                  alt="Architectural Floor Plan"
                  className="w-full h-full object-contain filter contrast-105"
                />
                <div className="absolute inset-0 bg-[#0A192F]/60 flex flex-col items-center justify-center p-6 text-center backdrop-blur-xs">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-[#C5A880] mb-2 shadow-sm">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h4 className="text-base sm:text-lg font-serif text-[#FAF8F5] font-bold">CAD Vector Schematics Verified</h4>
                  <p className="text-xs sm:text-sm text-[#DDD4C6] max-w-md mt-1 leading-relaxed">
                    Complete CAD floor plans and structural blueprints are available upon confidential registration.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FINANCIALS */}
          {activeTab === "financials" && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-sm">
                <div className="p-4 rounded-2xl bg-white border border-[#E4DCD0] shadow-xs">
                  <span className="text-xs text-[#747D88] uppercase block font-bold">Projected Cap Rate</span>
                  <span className="text-xl sm:text-2xl text-[#C5A880] font-mono font-bold mt-1 block">{property.capRate || "5.8%"}</span>
                  <span className="text-xs text-[#545B65] mt-1 block font-medium">Institutional benchmark yield</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#E4DCD0] shadow-xs">
                  <span className="text-xs text-[#747D88] uppercase block font-bold">Annual Property Tax</span>
                  <span className="text-xl sm:text-2xl text-[#0A192F] font-mono font-bold mt-1 block">{property.taxesAnnual || "$180,000"}</span>
                  <span className="text-xs text-[#545B65] mt-1 block font-medium">Escrow audited estimate</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#E4DCD0] shadow-xs">
                  <span className="text-xs text-[#747D88] uppercase block font-bold">Monthly HOA & Dues</span>
                  <span className="text-xl sm:text-2xl text-[#0A192F] font-mono font-bold mt-1 block">{property.hoa || "$1,250 / mo"}</span>
                  <span className="text-xs text-[#545B65] mt-1 block font-medium">Full white-glove concierge</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E4DCD0] text-xs sm:text-sm text-[#1A1D20] shadow-xs leading-relaxed">
                <span className="text-[#0A192F] font-bold block mb-1">Sterling Key Institutional Management Guarantee:</span>
                Under our Signature Portfolio oversight, this asset qualifies for guaranteed automated ACH distributions by the 5th of each month, 24/7 dedicated dispatch, and 0% repair markup policy.
              </div>
            </div>
          )}
        </div>

        {/* Representing Advisor & Actions Footer - Light Warm Ivory & White Styling, ZERO Pitch Black */}
        <div className="bg-white border-t border-[#E4DCD0] px-6 py-4 sm:px-8 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 shadow-lg">
          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            <img
              src={property.agent.image}
              alt={property.agent.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
              }}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#C5A880] shrink-0"
            />
            <div className="truncate">
              <div className="text-[10px] sm:text-xs uppercase tracking-wider text-[#C5A880] font-bold">
                Represented Exclusively By
              </div>
              <div className="text-sm sm:text-base font-serif text-[#0A192F] font-bold truncate">
                {property.agent.name}
              </div>
              <div className="text-xs text-[#545B65] truncate font-medium">
                {property.agent.title}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                onClose();
                onScheduleTour(property);
              }}
              className="flex-1 sm:flex-none py-3 px-5 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#C5A880]" />
              Schedule Showing
            </button>
            <a
              href={`tel:${property.agent.phone}`}
              className="py-3 px-4 rounded-xl bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#0A192F] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all border border-[#E4DCD0] whitespace-nowrap shadow-xs"
            >
              <Phone className="w-4 h-4 text-[#C5A880]" />
              Call
            </a>
            <button
              onClick={() => addToast(`Brochure and confidential floor plan for ${property.title} downloaded`, "success", "Brochure Ready")}
              className="py-3 px-4 rounded-xl bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#0A192F] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all border border-[#E4DCD0] whitespace-nowrap shadow-xs cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#C5A880]" />
              Brochure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
