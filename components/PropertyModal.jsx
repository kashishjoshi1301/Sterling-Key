"use client";

import React, { useState } from "react";
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
  Sparkles
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
      navigator.clipboard.writeText(`${window.location.origin}#${property.id}`);
      addToast(`Encrypted dossier link for ${property.title} copied to clipboard`, "success", "Link Copied");
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl lg:max-w-4xl max-h-[92vh] bg-[#0A0C10] border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar with Close & Share */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
          {onLaunchVirtualTour && (
            <button
              onClick={() => onLaunchVirtualTour(property.title)}
              className="py-1 px-2.5 rounded-full bg-black/75 hover:bg-white text-white hover:text-neutral-950 border border-white/20 text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1 transition-all shadow-lg backdrop-blur-md"
            >
              <Rotate3D className="w-3 h-3" />
              <span>360° Tour</span>
            </button>
          )}

          <button
            onClick={handleShare}
            className="p-1.5 rounded-full bg-black/70 hover:bg-black text-white hover:text-stone-300 border border-white/15 transition-all backdrop-blur-md"
            title="Share Dossier"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-black/70 hover:bg-black text-white hover:text-stone-300 border border-white/15 transition-all backdrop-blur-md"
            aria-label="Close modal"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Gallery Carousel - Sleek Panoramic Ratio that fits laptop viewports */}
        <div className="relative aspect-[21/8] sm:aspect-[21/7] max-h-[180px] sm:max-h-[220px] w-full bg-neutral-950 shrink-0">
          <img
            src={property.images[activeImgIndex]}
            alt={property.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80";
            }}
            className="w-full h-full object-cover transition-opacity duration-300"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-transparent to-black/35" />

          {/* Nav arrows */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setActiveImgIndex(
                    (prev) => (prev - 1 + property.images.length) % property.images.length
                  )
                }
                className="absolute left-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/60 hover:bg-black text-white transition-all backdrop-blur-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setActiveImgIndex((prev) => (prev + 1) % property.images.length)
                }
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/60 hover:bg-black text-white transition-all backdrop-blur-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Thumbnails */}
              <div className="absolute bottom-2 left-4 right-4 flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative w-10 h-7 rounded overflow-hidden shrink-0 border transition-all ${
                      activeImgIndex === idx
                        ? "border-white scale-105 shadow-md"
                        : "border-white/20 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Badges on Gallery */}
          <div className="absolute top-3 left-4 flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded text-[9px] font-medium uppercase tracking-wider bg-black/70 backdrop-blur-md text-stone-200 border border-white/10">
              {property.status}
            </span>
            <span className="px-2 py-0.5 rounded text-[9px] font-medium uppercase tracking-wider bg-black/70 backdrop-blur-md text-neutral-300 border border-white/10">
              {property.category}
            </span>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="bg-[#07080A] border-b border-white/[0.06] px-4 sm:px-6 flex items-center gap-4 sm:gap-6 shrink-0">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-2 text-[11px] uppercase tracking-wider font-medium border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === "overview"
                ? "border-white text-white font-semibold"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            <Compass className="w-3 h-3" /> Overview
          </button>
          <button
            onClick={() => setActiveTab("floorplan")}
            className={`py-2 text-[11px] uppercase tracking-wider font-medium border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === "floorplan"
                ? "border-white text-white font-semibold"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            <Layers className="w-3 h-3" /> Floor Plans & Specs
          </button>
          <button
            onClick={() => setActiveTab("financials")}
            className={`py-2 text-[11px] uppercase tracking-wider font-medium border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === "financials"
                ? "border-white text-white font-semibold"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            <TrendingUp className="w-3 h-3" /> Yield & Capital
          </button>
        </div>

        {/* Modal Body - Smooth internal scrolling, never overflows the screen */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1 min-h-0">
          {/* Top Title & Price */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/[0.06] pb-3">
            <div>
              <div className="flex items-center text-[11px] text-stone-400 font-medium mb-0.5">
                <MapPin className="w-3 h-3 mr-1 text-stone-400 shrink-0" />
                <span className="truncate">{property.address}, {property.neighborhood}, {property.city}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif text-white font-medium">
                {property.title}
              </h2>
              <p className="text-[11px] text-neutral-400 italic">
                "{property.tagline}"
              </p>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <div className="text-xl sm:text-2xl font-serif font-semibold text-white tracking-tight">
                {formatRawPrice(property.price)}
              </div>
              {property.rentalPrice && (
                <div className="text-[11px] text-stone-400 font-sans">
                  Available for lease: {property.rentalPrice}
                </div>
              )}
            </div>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                <div className="bg-[#0E1015] border border-white/[0.06] rounded-xl p-2 text-center">
                  <div className="text-[9px] text-neutral-400 uppercase tracking-wider">Bedrooms</div>
                  <div className="text-sm font-semibold text-white font-mono mt-0.5">{property.beds}</div>
                </div>
                <div className="bg-[#0E1015] border border-white/[0.06] rounded-xl p-2 text-center">
                  <div className="text-[9px] text-neutral-400 uppercase tracking-wider">Bathrooms</div>
                  <div className="text-sm font-semibold text-white font-mono mt-0.5">{property.baths}</div>
                </div>
                <div className="bg-[#0E1015] border border-white/[0.06] rounded-xl p-2 text-center">
                  <div className="text-[9px] text-neutral-400 uppercase tracking-wider">Interior</div>
                  <div className="text-sm font-semibold text-white font-mono mt-0.5">{formatArea(property.sqft, property.sqm)}</div>
                </div>
                <div className="bg-[#0E1015] border border-white/[0.06] rounded-xl p-2 text-center">
                  <div className="text-[9px] text-neutral-400 uppercase tracking-wider">Lot Size</div>
                  <div className="text-sm font-semibold text-white font-mono mt-0.5 truncate">{property.lotSize}</div>
                </div>
                <div className="bg-[#0E1015] border border-white/[0.06] rounded-xl p-2 text-center">
                  <div className="text-[9px] text-neutral-400 uppercase tracking-wider">Year Built</div>
                  <div className="text-sm font-semibold text-white font-mono mt-0.5">{property.yearBuilt}</div>
                </div>
                <div className="bg-[#0E1015] border border-white/[0.06] rounded-xl p-2 text-center">
                  <div className="text-[9px] text-neutral-400 uppercase tracking-wider">Proj. Yield</div>
                  <div className="text-sm font-semibold text-stone-300 font-mono mt-0.5">{property.capRate || "5.2%"}</div>
                </div>
              </div>

              <div>
                <h3 className="text-[11px] font-serif text-white uppercase tracking-wider mb-1">
                  Architectural Narrative
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {property.description}
                </p>
              </div>

              <div>
                <h3 className="text-[11px] font-serif text-white uppercase tracking-wider mb-1.5">
                  Estate Amenities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5">
                  {property.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 p-1.5 px-2 rounded-lg bg-white/[0.03] border border-white/[0.04] text-[11px] text-neutral-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FLOOR PLANS */}
          {activeTab === "floorplan" && (
            <div className="space-y-3 animate-fade-in">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[#0E1015] border border-white/[0.06]">
                  <span className="text-[9px] text-neutral-400 uppercase block">Levels / Storeys</span>
                  <span className="text-white font-mono font-semibold text-xs">{property.floorPlan?.levels || 2} Floors</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0E1015] border border-white/[0.06]">
                  <span className="text-[9px] text-neutral-400 uppercase block">Ceiling Height</span>
                  <span className="text-white font-mono font-semibold text-xs">{property.floorPlan?.ceilingHeight || "14 FT"}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0E1015] border border-white/[0.06]">
                  <span className="text-[9px] text-neutral-400 uppercase block">Outdoor Living</span>
                  <span className="text-white font-mono font-semibold text-xs">{property.floorPlan?.outdoorDeck || "3,200 SF"}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0E1015] border border-white/[0.06]">
                  <span className="text-[9px] text-neutral-400 uppercase block">Gallery Garage</span>
                  <span className="text-white font-mono font-semibold text-xs">{property.floorPlan?.galleryCars || 4} Enclosed Cars</span>
                </div>
              </div>

              <div className="relative aspect-[16/7] rounded-xl overflow-hidden border border-white/10 bg-neutral-900 flex items-center justify-center">
                <img
                  src={property.floorPlan?.planImage || property.images[0]}
                  alt="Architectural Floor Plan"
                  className="w-full h-full object-cover opacity-60 filter contrast-125"
                />
                <div className="absolute inset-0 bg-[#08090C]/65 flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white mb-1.5">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-serif text-white font-medium">CAD Vector Schematics Verified</h4>
                  <p className="text-[10px] text-neutral-400 max-w-sm mt-0.5">
                    Complete CAD floor plans and structural blueprints are available upon confidential registration.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FINANCIALS */}
          {activeTab === "financials" && (
            <div className="space-y-3 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-[#0E1015] border border-white/[0.06]">
                  <span className="text-[9px] text-neutral-400 uppercase block">Projected Cap Rate</span>
                  <span className="text-base text-stone-200 font-mono font-bold mt-0.5 block">{property.capRate || "5.8%"}</span>
                  <span className="text-[10px] text-neutral-500 mt-0.5 block">Institutional benchmark</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0E1015] border border-white/[0.06]">
                  <span className="text-[9px] text-neutral-400 uppercase block">Annual Property Tax</span>
                  <span className="text-base text-white font-mono font-bold mt-0.5 block">{property.taxesAnnual || "$180,000"}</span>
                  <span className="text-[10px] text-neutral-500 mt-0.5 block">Escrow estimated</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0E1015] border border-white/[0.06]">
                  <span className="text-[9px] text-neutral-400 uppercase block">Monthly HOA & Dues</span>
                  <span className="text-base text-white font-mono font-bold mt-0.5 block">{property.hoa || "$1,250 / mo"}</span>
                  <span className="text-[10px] text-neutral-500 mt-0.5 block">Full concierge included</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0E1015] border border-white/[0.06] text-[11px] text-neutral-300">
                <span className="text-stone-300 font-medium block mb-0.5">Sterling Key Institutional Management Guarantee:</span>
                Under our Signature Portfolio oversight, this asset qualifies for guaranteed automated ACH distributions by the 5th of each month, 24/7 dedicated dispatch, and 0% repair markup policy.
              </div>
            </div>
          )}
        </div>

        {/* Representing Advisor & Actions Footer - Sticky at bottom of modal */}
        <div className="bg-[#0E1015] border-t border-white/[0.08] px-4 py-2.5 sm:px-5 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <img
              src={property.agent.image}
              alt={property.agent.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
              }}
              className="w-9 h-9 rounded-full object-cover border border-white/20 grayscale shrink-0"
            />
            <div className="truncate">
              <div className="text-[9px] uppercase tracking-wider text-stone-400 font-medium">
                Represented Exclusively By
              </div>
              <div className="text-xs font-serif text-white font-medium truncate">
                {property.agent.name}
              </div>
              <div className="text-[10px] text-neutral-400 truncate">
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
              className="flex-1 sm:flex-none py-2 px-4 rounded-xl bg-white hover:bg-stone-200 text-neutral-950 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-sm whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              Schedule Showing
            </button>
            <a
              href={`tel:${property.agent.phone}`}
              className="py-2 px-3 rounded-xl bg-white/[0.05] hover:bg-white/10 text-white text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all border border-white/10 whitespace-nowrap"
            >
              <Phone className="w-3 h-3 text-stone-400" />
              Call
            </a>
            <button
              onClick={() => addToast(`Brochure and confidential floor plan for ${property.title} downloaded`, "success", "Brochure Ready")}
              className="py-2 px-3 rounded-xl border border-white/10 hover:bg-white/5 text-neutral-300 text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all whitespace-nowrap"
            >
              <Download className="w-3 h-3" />
              Brochure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
