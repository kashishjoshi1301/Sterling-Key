"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { 
  X, 
  MapPin, 
  TrendingUp, 
  ShieldCheck, 
  Building2, 
  Bed, 
  Bath, 
  Maximize2, 
  ArrowUpRight, 
  Calendar, 
  ChevronRight,
  Sparkles
} from "lucide-react";
import { useCurrency } from "./CurrencyContext";
import { useScrollLock } from "./useScrollLock";

export default function DestinationModal({ 
  destination, 
  properties = [], 
  onClose, 
  onSelectProperty,
  onScheduleTour
}) {
  const { formatRawPrice, formatArea } = useCurrency();
  const scrollRef = useRef(null);

  useScrollLock(!!destination, onClose);

  // Reset scroll to top when destination changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [destination?.id]);

  if (!destination) return null;

  const cityName = destination.name.split(",")[0].trim();

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#0A192F]/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in overscroll-contain touch-none"
      onClick={onClose}
      onTouchMove={(e) => {
        if (e.target === e.currentTarget) e.preventDefault();
      }}
    >
      <div 
        className="relative w-full max-w-4xl lg:max-w-5xl max-h-[94vh] sm:max-h-[92vh] bg-[#FAF8F5] border border-[#E4DCD0] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto text-[#1A1D20]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Controls */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 flex items-center gap-2">
          <Link
            href={`/collection?destination=${encodeURIComponent(cityName)}`}
            className="hidden sm:inline-flex py-1.5 px-3.5 rounded-full bg-white/95 hover:bg-[#FAF8F5] text-[#0A192F] border border-[#E4DCD0] text-xs font-semibold uppercase tracking-wider items-center gap-1.5 transition-all shadow-sm"
          >
            <span>View All in Collection</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
          </Link>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full bg-white/95 hover:bg-[#FAF8F5] text-[#0A192F] hover:text-[#C5A880] border border-[#E4DCD0] transition-all shadow-md cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Top-Left Badges */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-1.5 max-w-[calc(100%-60px)] flex-wrap">
          <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#0A192F] text-[#FAF8F5] border border-[#C5A880]/40 shadow-sm">
            Avg Yield {destination.avgYield}
          </span>
          <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-white/95 text-[#0A192F] border border-[#E4DCD0] shadow-sm">
            {destination.activeCount || `${properties.length} Properties`}
          </span>
        </div>

        {/* Hero Photo Banner */}
        <div className="relative h-48 sm:h-64 md:h-72 w-full bg-[#0A192F] shrink-0 border-b border-[#E4DCD0]">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Destination Header Title on Photo */}
          <div className="absolute bottom-3 left-4 right-4 sm:bottom-5 sm:left-6 sm:right-6">
            <div className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#C5A880] font-semibold mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{destination.tag}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-tight">
              {destination.name}
            </h2>
            <p className="text-xs sm:text-sm text-white/85 mt-1 max-w-2xl line-clamp-2">
              {destination.description}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div 
          ref={scrollRef}
          className="p-4 sm:p-7 space-y-6 overflow-y-auto flex-1 min-h-0 bg-[#FAF8F5] overscroll-contain touch-pan-y"
        >
          {/* Market & Investment Telemetry */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5">
            <div className="bg-white border border-[#E4DCD0] rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xs">
              <span className="text-[10px] sm:text-xs text-[#747D88] uppercase block font-bold">Median Valuation</span>
              <span className="text-base sm:text-xl font-serif font-bold text-[#0A192F] mt-1 block">
                {destination.medianPrice}
              </span>
              <span className="text-[10px] text-[#545B65] mt-0.5 block">Prime benchmark</span>
            </div>

            <div className="bg-white border border-[#E4DCD0] rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xs">
              <span className="text-[10px] sm:text-xs text-[#747D88] uppercase block font-bold">Avg Rental Yield</span>
              <span className="text-base sm:text-xl font-mono font-bold text-[#C5A880] mt-1 block">
                {destination.avgYield}
              </span>
              <span className="text-[10px] text-[#545B65] mt-0.5 block">Net projected cap</span>
            </div>

            <div className="bg-white border border-[#E4DCD0] rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xs">
              <span className="text-[10px] sm:text-xs text-[#747D88] uppercase block font-bold">Sovereign Protection</span>
              <span className="text-sm sm:text-base font-serif font-bold text-[#0A192F] mt-1 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                <span>Tier 1 Haven</span>
              </span>
              <span className="text-[10px] text-[#545B65] mt-0.5 block">Institutional safe harbor</span>
            </div>

            <div className="bg-white border border-[#E4DCD0] rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xs">
              <span className="text-[10px] sm:text-xs text-[#747D88] uppercase block font-bold">Active Inventory</span>
              <span className="text-base sm:text-xl font-mono font-bold text-[#0A192F] mt-1 block">
                {properties.length} Residences
              </span>
              <span className="text-[10px] text-[#545B65] mt-0.5 block">Direct off-market & public</span>
            </div>
          </div>

          {/* Prime Enclaves & Districts */}
          {destination.districts && destination.districts.length > 0 && (
            <div className="bg-white border border-[#E4DCD0] rounded-2xl p-4 sm:p-5 shadow-xs">
              <h3 className="text-xs uppercase font-mono tracking-wider text-[#0A192F] font-bold mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Premier Enclaves & Neighborhoods</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {destination.districts.map((district, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1.5 rounded-full bg-[#FAF8F5] border border-[#E4DCD0] text-[#0A192F] font-medium shadow-2xs"
                  >
                    {district}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Active Flagship Properties in this Destination */}
          <div>
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#0A192F]">
                  Available Flagship Residences in {cityName}
                </h3>
                <p className="text-xs text-[#545B65]">
                  Click any property to inspect full architectural dossier, specs & floor plans
                </p>
              </div>

              <Link
                href={`/collection?destination=${encodeURIComponent(cityName)}`}
                className="hidden sm:inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#C5A880] hover:text-[#0A192F] transition-colors"
              >
                <span>View Full List</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {properties.map((prop) => (
                  <div
                    key={prop.id}
                    onClick={() => {
                      onClose();
                      onSelectProperty?.(prop);
                    }}
                    className="group bg-white rounded-2xl overflow-hidden border border-[#E4DCD0] hover:border-[#C5A880] shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#EFE9DF]">
                      <img
                        src={prop.images[0]}
                        alt={prop.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-[#0A192F]/85 backdrop-blur-md text-[#EADDC9] px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-semibold">
                        {prop.category}
                      </div>
                      <div className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur-md text-[#0A192F] px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                        Cap {prop.capRate}
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[11px] text-[#747D88] font-medium mb-0.5">
                          {prop.neighborhood}, {prop.city}
                        </div>
                        <h4 className="text-sm sm:text-base font-serif font-bold text-[#0A192F] group-hover:text-[#C5A880] transition-colors line-clamp-1">
                          {prop.title}
                        </h4>
                        <div className="text-base sm:text-lg font-serif font-bold text-[#0A192F] mt-1.5">
                          {formatRawPrice(prop.price)}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#E4DCD0] mt-3 flex items-center justify-between text-[11px] text-[#545B65]">
                        <span className="flex items-center gap-1">
                          <Bed className="w-3.5 h-3.5 text-[#C5A880]" /> {prop.beds} Beds
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="w-3.5 h-3.5 text-[#C5A880]" /> {prop.baths} Baths
                        </span>
                        <span className="flex items-center gap-1">
                          <Maximize2 className="w-3.5 h-3.5 text-[#C5A880]" /> {formatArea(prop.sqft, prop.sqm)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-white border border-dashed border-[#E4DCD0] text-center">
                <p className="text-sm text-[#545B65] mb-3">
                  All active offerings in {destination.name} are currently held under discreet off-market Sovereign Vault protocols.
                </p>
                <Link
                  href="/vault"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A192F] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#142E54] transition-all"
                >
                  <span>Request Private Vault Clearance</span>
                  <ArrowUpRight className="w-4 h-4 text-[#C5A880]" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="bg-white border-t border-[#E4DCD0] px-4 py-3 sm:px-8 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 shadow-lg">
          <div className="text-xs text-[#545B65] text-center sm:text-left">
            Sterling Key Global Advisory Chambers · {cityName}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <Link
              href={`/collection?destination=${encodeURIComponent(cityName)}`}
              className="flex-1 sm:flex-none py-2.5 px-4 rounded-xl bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#0A192F] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all border border-[#E4DCD0] shadow-xs text-center"
            >
              <span>Explore Collection</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
            </Link>

            <button
              onClick={() => {
                onClose();
                onScheduleTour?.();
              }}
              className="flex-1 sm:flex-none py-2.5 px-4 sm:px-5 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-md cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Inquire with Chamber</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
