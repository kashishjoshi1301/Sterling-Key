"use client";

import React, { useRef } from "react";
import { X, Check, Minus, Calendar, Trash2, Eye, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { useCurrency } from "./CurrencyContext";
import { useScrollLock } from "./useScrollLock";
import { PROPERTIES_DATA } from "../data/mockData";

export default function ComparisonModal({
  isOpen = true,
  onClose,
  properties = [],
  compareIds = [],
  onRemoveFromCompare,
  onSelectProperty,
  onScheduleTour
}) {
  const { formatRawPrice, formatArea } = useCurrency();
  const scrollRef = useRef(null);

  const scrollTable = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -280 : 280,
        behavior: "smooth"
      });
    }
  };

  const activeProperties = (properties && properties.length > 0)
    ? properties
    : PROPERTIES_DATA.filter((p) => compareIds.includes(p.id));

  useScrollLock(isOpen !== false && activeProperties.length > 0, onClose);

  if (isOpen === false || activeProperties.length === 0) return null;

  const allAmenities = [
    "Zero-Edge Infinity Pool",
    "Wellness Spa & Cold Plunge",
    "Dolby Atmos Screening Room",
    "Temperature Wine Cellar",
    "Sub-Terranean Gallery Garage",
    "Deepwater Mega-Yacht Dock",
    "Biometric Security System",
    "Keyless Elevator Foyer",
    "24/7 Doorman & Concierge"
  ];

  const specRows = [
    {
      label: "Interior Area",
      render: (p) => (
        <span className="font-mono text-[#0A192F] font-bold text-xs">
          {formatArea(p.sqft, p.sqm)}
        </span>
      )
    },
    {
      label: "Price / Sq.Ft",
      render: (p) => (
        <span className="font-mono text-[#C5A880] font-bold text-xs">
          ${Math.round(p.price / p.sqft).toLocaleString("en-US")} / SF
        </span>
      )
    },
    {
      label: "Bedrooms & Baths",
      render: (p) => (
        <span className="text-[#1A1D20] text-xs">
          {p.beds} Beds · {p.baths} Baths
        </span>
      )
    },
    {
      label: "Lot Size",
      render: (p) => (
        <span className="text-[#1A1D20] text-[11px] sm:text-xs leading-snug break-words">
          {p.lotSize}
        </span>
      )
    },
    {
      label: "Year Built",
      render: (p) => (
        <span className="text-[#1A1D20] text-xs font-mono">
          {p.yearBuilt}
        </span>
      )
    },
    {
      label: "Projected Net Cap Rate",
      render: (p) => (
        <span className="font-mono text-[#C5A880] font-bold text-xs">
          {p.capRate || "5.2%"}
        </span>
      )
    },
    {
      label: "Annual Property Taxes",
      render: (p) => (
        <span className="font-mono text-[#383E46] text-xs">
          {p.taxesAnnual || "$180,000"}
        </span>
      )
    },
    {
      label: "Monthly HOA / Concierge",
      render: (p) => (
        <span className="font-mono text-[#383E46] text-xs">
          {p.hoa || "$1,250 / mo"}
        </span>
      )
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl xl:max-w-6xl bg-[#FAF8F5] border border-[#E4DCD0] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] text-[#1A1D20]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header in Deep Navy */}
        <div className="bg-[#0A192F] text-white border-b border-[#060D18] px-3.5 py-3 sm:px-6 sm:py-5 flex items-center justify-between shrink-0">
          <div className="min-w-0 pr-2">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#C5A880] shrink-0" />
              <h3 className="text-sm sm:text-lg font-serif text-white font-medium truncate">
                Architectural Estate Comparison Matrix
              </h3>
            </div>
            <p className="text-[10px] sm:text-xs text-[#A8B2C1] mt-0.5 truncate sm:whitespace-normal">
              Comparing {activeProperties.length} prime sovereign {activeProperties.length === 1 ? "residence" : "residences"} · Swipe ↔ to explore
            </p>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {activeProperties.length > 1 && (
              <div className="flex items-center gap-0.5 sm:gap-1 bg-white/10 rounded-xl p-1 border border-[#C5A880]/30 mr-1">
                <button
                  type="button"
                  onClick={() => scrollTable("left")}
                  className="p-1 rounded-lg text-[#EADDC9] hover:text-white hover:bg-white/20 cursor-pointer transition-colors"
                  title="Scroll to previous residence"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <span className="text-[9px] sm:text-[10px] text-[#C5A880] font-mono px-1 font-semibold uppercase tracking-wider hidden sm:inline">
                  Navigate
                </span>
                <button
                  type="button"
                  onClick={() => scrollTable("right")}
                  className="p-1 rounded-lg text-[#EADDC9] hover:text-white hover:bg-white/20 cursor-pointer transition-colors"
                  title="Scroll to next residence"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#EADDC9] hover:text-white cursor-pointer transition-colors"
              title="Close comparison"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Matrix Table with Hidden Scrollbars & Sticky Headers */}
        <div 
          ref={scrollRef}
          className="overflow-auto flex-1 bg-[#FAF8F5] relative no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:h-0"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch"
          }}
        >
          <table className="w-full text-left text-xs border-collapse">
            <colgroup>
              <col className="w-[110px] sm:w-[170px]" style={{ minWidth: "110px" }} />
              {activeProperties.map((p) => (
                <col key={p.id} className="w-[215px] sm:w-[270px]" style={{ minWidth: "215px" }} />
              ))}
            </colgroup>

            {/* Property Header Cards */}
            <thead>
              <tr>
                {/* Frozen Top-Left Cell - Compact on Mobile */}
                <th className="sticky top-0 left-0 z-30 p-2.5 sm:p-4 align-top bg-[#FAF8F5] border-r-2 border-b border-[#E4DCD0] shadow-[4px_0_12px_-2px_rgba(0,0,0,0.08)]">
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-wider text-[#C5A880] font-bold block">
                        Estate Matrix
                      </span>
                      <h4 className="text-xs sm:text-sm font-serif text-[#0A192F] font-semibold mt-0.5">
                        Sovereign Portfolio
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-[#747D88] mt-1 leading-relaxed hidden sm:block">
                        Side-by-side architectural and yield analysis
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-8 pt-2 sm:pt-4 border-t border-[#E4DCD0] text-[9px] sm:text-[10px] text-[#8C95A1] font-mono uppercase tracking-wider">
                      Specification
                    </div>
                  </div>
                </th>

                {/* Property Columns */}
                {activeProperties.map((prop) => (
                  <th 
                    key={prop.id} 
                    className="sticky top-0 z-10 p-2.5 sm:p-4 align-top bg-[#FAF8F5] border-b border-[#E4DCD0]"
                  >
                    {/* Image Card with Fixed Height, Fallback & Gradient */}
                    <div className="relative rounded-xl overflow-hidden h-28 sm:h-36 w-full bg-[#EAE3D9] mb-2 sm:mb-3 group shadow-xs border border-[#E4DCD0]">
                      <img
                        src={prop.images?.[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"}
                        alt={prop.title}
                        loading="eager"
                        decoding="async"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";
                        }}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 flex items-center gap-1 pointer-events-none">
                        <span className="px-1.5 sm:px-2 py-0.5 rounded bg-[#0A192F]/85 backdrop-blur-xs text-[#EADDC9] font-mono text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold border border-[#C5A880]/30">
                          {prop.status || "Exclusive"}
                        </span>
                        <span className="px-1 sm:px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white/90 text-[8px] sm:text-[9px] font-medium hidden xs:inline">
                          {prop.category || "Trophy"}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveFromCompare && onRemoveFromCompare(prop.id)}
                        className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 p-1.5 rounded-full bg-black/60 hover:bg-rose-600 text-white cursor-pointer transition-colors shadow-sm"
                        title="Remove from comparison"
                      >
                        <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </button>
                    </div>

                    {/* Location - Full text without truncation */}
                    <div className="text-[9px] sm:text-[10px] text-[#C5A880] uppercase font-semibold tracking-wider leading-tight">
                      {prop.neighborhood}, {prop.city}
                    </div>

                    {/* Title - FULL NAME ALWAYS VISIBLE ON EVERY DEVICE */}
                    <h4 
                      className="text-xs sm:text-sm font-serif text-[#0A192F] font-semibold mt-0.5 leading-snug break-words min-h-[2.4rem] sm:min-h-[2.8rem] flex items-start"
                      title={prop.title}
                    >
                      {prop.title}
                    </h4>

                    {/* Price */}
                    <div className="text-sm sm:text-base font-serif font-bold text-[#0A192F] mt-0.5 flex items-center">
                      {formatRawPrice(prop.price)}
                    </div>

                    {/* Action Buttons - Perfectly Sized & Aligned */}
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          if (onSelectProperty) onSelectProperty(prop);
                        }}
                        className="py-1.5 px-1 sm:px-2 rounded-lg bg-[#F3EFEA] hover:bg-[#EAE3D9] text-[#0A192F] border border-[#E4DCD0] text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-2xs whitespace-nowrap"
                      >
                        <Eye className="w-3 h-3 text-[#C5A880] shrink-0" />
                        <span>Dossier</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          if (onScheduleTour) onScheduleTour(prop);
                        }}
                        className="py-1.5 px-1 sm:px-2 rounded-lg bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1 shadow-xs cursor-pointer transition-colors whitespace-nowrap"
                      >
                        <Calendar className="w-3 h-3 text-[#C5A880] shrink-0" />
                        <span>Tour</span>
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Matrix Body */}
            <tbody>
              {/* Specification Rows */}
              {specRows.map((spec, idx) => (
                <tr 
                  key={idx} 
                  className="border-b border-[#E4DCD0]/70 hover:bg-[#F5EFE6]/40 transition-colors"
                >
                  <td className="sticky left-0 z-20 bg-[#FAF8F5] py-2.5 sm:py-3.5 px-2.5 sm:px-4 font-semibold text-[#545B65] text-[10px] sm:text-xs border-r-2 border-[#E4DCD0] shadow-[4px_0_12px_-2px_rgba(0,0,0,0.08)] leading-tight">
                    {spec.label}
                  </td>
                  {activeProperties.map((p) => (
                    <td key={p.id} className="py-2.5 sm:py-3.5 px-2.5 sm:px-4 text-[11px] sm:text-xs leading-normal">
                      {spec.render(p)}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Signature Amenities Header Row */}
              <tr className="bg-[#EFE8DF]/70 border-y border-[#E4DCD0]">
                <td className="sticky left-0 z-20 bg-[#EFE8DF] py-2 px-2.5 sm:px-4 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-[#0A192F] border-r-2 border-[#E4DCD0] shadow-[4px_0_12px_-2px_rgba(0,0,0,0.08)]">
                  Signature Amenities
                </td>
                {activeProperties.map((p) => (
                  <td key={p.id} className="py-2 px-2.5 sm:px-4 text-[9px] sm:text-[10px] font-mono text-[#747D88] uppercase tracking-wider">
                    Included Features
                  </td>
                ))}
              </tr>

              {/* Amenity Rows */}
              {allAmenities.map((amenity, idx) => (
                <tr 
                  key={idx} 
                  className="border-b border-[#E4DCD0]/50 hover:bg-[#F5EFE6]/40 transition-colors"
                >
                  <td className="sticky left-0 z-20 bg-[#FAF8F5] py-2 sm:py-2.5 px-2.5 sm:px-4 text-[#545B65] text-[10px] sm:text-[11px] font-medium border-r-2 border-[#E4DCD0] shadow-[4px_0_12px_-2px_rgba(0,0,0,0.08)] leading-tight">
                    {amenity}
                  </td>
                  {activeProperties.map((p) => {
                    const hasAmenity = p.amenities?.some((a) =>
                      a.toLowerCase().includes(amenity.toLowerCase().split(" ")[0])
                    );
                    return (
                      <td key={p.id} className="py-2 sm:py-2.5 px-2.5 sm:px-4 text-[10px] sm:text-xs">
                        {hasAmenity ? (
                          <span className="inline-flex items-center gap-1.5 text-emerald-800 font-semibold text-[10px] sm:text-xs">
                            <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                            Included
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-[#A8B2C1] text-[10px] sm:text-xs">
                            <Minus className="w-3.5 h-3.5 text-[#CCD4DE]" />
                            —
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#FAF8F5] border-t border-[#E4DCD0] px-5 py-3 flex items-center justify-between text-xs text-[#747D88] shrink-0">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
            <span>Comparing {activeProperties.length} of 4 comparative slots</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
