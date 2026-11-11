"use client";

import React, { useState, useMemo } from "react";
import { 
  Heart, 
  Bed, 
  Bath, 
  Maximize2, 
  MapPin, 
  Eye, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  SlidersHorizontal,
  TrendingUp,
  LayoutGrid,
  Map as MapIcon,
  Scale
} from "lucide-react";
import { useCurrency } from "./CurrencyContext";
import { useToast } from "./Toast";
import InteractivePropertyMap from "./InteractivePropertyMap";

export default function PropertyListings({ 
  properties = [], 
  onSelectProperty, 
  onScheduleTour,
  savedIds = [], 
  onToggleSave,
  compareIds = [],
  onToggleCompare
}) {
  const { formatPrice, formatArea } = useCurrency();
  const { addToast } = useToast();
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [currentImageIndices, setCurrentImageIndices] = useState({});

  const categories = [
    "All",
    "Penthouses",
    "Waterfront",
    "Architectural",
    "Historic",
    "New Developments"
  ];

  const handleNextImage = (e, propId, totalImages) => {
    e.stopPropagation();
    setCurrentImageIndices((prev) => ({
      ...prev,
      [propId]: ((prev[propId] || 0) + 1) % totalImages
    }));
  };

  const handlePrevImage = (e, propId, totalImages) => {
    e.stopPropagation();
    setCurrentImageIndices((prev) => ({
      ...prev,
      [propId]: ((prev[propId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  const handleSaveClick = (e, propId, propTitle) => {
    e.stopPropagation();
    onToggleSave(propId);
    const isNowSaved = !savedIds.includes(propId);
    if (isNowSaved) {
      addToast(`${propTitle} added to your private portfolio`, "success", "Saved Residence");
    } else {
      addToast(`${propTitle} removed from your portfolio`, "info", "Removed");
    }
  };

  const handleCompareClick = (e, propId, propTitle) => {
    e.stopPropagation();
    if (onToggleCompare) {
      onToggleCompare(propId);
      const isNowCompared = !compareIds.includes(propId);
      if (isNowCompared) {
        addToast(`${propTitle} added to comparison matrix`, "info", "Added to Compare");
      }
    }
  };

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (sortBy === "priceHigh") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "priceLow") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "sqft") {
      result.sort((a, b) => b.sqft - a.sqft);
    }

    return result;
  }, [properties, activeCategory, sortBy]);

  return (
    <section id="featured-listings" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#E4DCD0] relative">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#C5A880] mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
              Curated Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#0A192F] tracking-tight">
              Featured Sovereign Residences
            </h2>
            <p className="text-[#545B65] text-xs sm:text-sm mt-1 max-w-xl">
              Hand-selected trophy properties represented exclusively by Sterling Key with verified institutional management.
            </p>
          </div>

          {/* Right Header Controls: Sort + View Mode Switcher */}
          <div className="flex items-center gap-2.5">
            {/* View Mode Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-white border border-[#E4DCD0] shadow-2xs">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-300 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${
                  viewMode === "grid"
                    ? "bg-[#0A192F] text-[#FAF8F5] shadow-xs"
                    : "text-[#545B65] hover:text-[#0A192F]"
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`p-2 rounded-lg transition-all duration-300 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${
                  viewMode === "map"
                    ? "bg-[#0A192F] text-[#FAF8F5] shadow-xs"
                    : "text-[#545B65] hover:text-[#0A192F]"
                }`}
                title="Interactive Map View"
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Map</span>
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-white border border-[#E4DCD0] rounded-xl px-3 py-2 shadow-2xs hover:border-[#C5A880] transition-colors">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A880]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs uppercase tracking-wider text-[#1A1D20] font-medium focus:outline-none cursor-pointer [&>option]:bg-white [&>option]:text-[#1A1D20]"
              >
                <option value="featured">Featured</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="sqft">Largest Area</option>
              </select>
            </div>
          </div>
        </div>

        {/* Minimalist Category Pills with Smooth Hover Glow */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2.5 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-[0.08em] uppercase transition-all duration-300 whitespace-nowrap active:scale-95 ${
                activeCategory === cat
                  ? "bg-[#0A192F] text-[#FAF8F5] font-semibold shadow-sm scale-[1.02]"
                  : "bg-white border border-[#E4DCD0] text-[#545B65] hover:text-[#0A192F] hover:border-[#C5A880] shadow-2xs"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Interactive View Mode: Map View vs Grid View */}
        {viewMode === "map" ? (
          <div className="animate-fade-in mb-8">
            <InteractivePropertyMap
              properties={filteredProperties}
              onSelectProperty={onSelectProperty}
              savedIds={savedIds}
              onToggleSave={onToggleSave}
            />
          </div>
        ) : (
          /* Decluttered Luxury Properties Grid with Smooth Lift */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProperties.map((property) => {
              const currentImgIdx = currentImageIndices[property.id] || 0;
              const isSaved = savedIds.includes(property.id);
              const isCompared = compareIds.includes(property.id);

              return (
                <div
                  key={property.id}
                  onClick={() => onSelectProperty(property)}
                  className="luxury-card-hover group bg-white border border-[#E4DCD0] rounded-2xl overflow-hidden shadow-xs flex flex-col cursor-pointer"
                >
                  {/* Image Container with Slider Controls & Slow Cinematic Zoom */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                    <img
                      src={property.images[currentImgIdx] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"}
                      alt={property.title}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80";
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20" />

                    {/* Status Badge with Glassmorphism */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-wider uppercase bg-[#0A192F]/90 backdrop-blur-md text-[#FAF8F5] border border-white/15 shadow-sm">
                        {property.status}
                      </span>
                      {property.capRate && (
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-wider uppercase bg-[#FAF8F5]/95 backdrop-blur-md text-[#0A192F] border border-[#C5A880]/50 flex items-center gap-1 shadow-sm">
                          <TrendingUp className="w-3 h-3 text-[#C5A880]" /> Yield {property.capRate}
                        </span>
                      )}
                    </div>

                    {/* Action Controls: Compare, Save with Micro-Interactions */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                      <button
                        onClick={(e) => handleCompareClick(e, property.id, property.title)}
                        className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                          isCompared
                            ? "bg-[#0A192F] text-white scale-105 shadow-md"
                            : "bg-black/50 text-white hover:bg-[#0A192F] opacity-0 group-hover:opacity-100 hover:scale-110"
                        }`}
                        title={isCompared ? "Remove from comparison" : "Compare residence"}
                      >
                        <Scale className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={(e) => handleSaveClick(e, property.id, property.title)}
                        className="p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:text-[#C5A880] hover:bg-black/80 transition-all duration-300 hover:scale-110 active:scale-90"
                        title="Save to favorites"
                      >
                        <Heart
                          className={`w-4 h-4 transition-transform ${
                            isSaved ? "fill-[#C5A880] text-[#C5A880] scale-110" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {/* Image Navigation Arrows */}
                    {property.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => handlePrevImage(e, property.id, property.images.length)}
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-[#0A192F] opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                          aria-label="Previous photo"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleNextImage(e, property.id, property.images.length)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-[#0A192F] opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                          aria-label="Next photo"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>

                        {/* Photo indicator dots */}
                        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                          {property.images.map((_, idx) => (
                            <span
                              key={idx}
                              className={`h-1 rounded-full transition-all duration-300 ${
                                idx === currentImgIdx ? "w-4 bg-white" : "w-1 bg-white/40"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Property Content - Clean & Breathable */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center text-[11px] text-[#747D88] font-medium mb-1.5">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-[#C5A880] shrink-0" />
                        <span>{property.neighborhood}, {property.city}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-serif text-[#0A192F] font-semibold group-hover:text-[#183664] transition-colors line-clamp-1 mb-1">
                        {property.title}
                      </h3>
                      <p className="text-[11px] text-[#747D88] line-clamp-1 mb-3.5">
                        {property.address}
                      </p>

                      {/* Price Header */}
                      <div className="flex items-baseline gap-2 mb-4 pb-3.5 border-b border-[#E4DCD0]">
                        <span className="text-2xl font-serif font-bold text-[#0A192F] tracking-tight">
                          {formatPrice(property.price)}
                        </span>
                        {property.rentalPrice && (
                          <span className="text-xs text-[#747D88] font-sans">
                            or {property.rentalPrice}
                          </span>
                        )}
                      </div>

                      {/* Spec Pillars */}
                      <div className="grid grid-cols-3 gap-2 py-1 text-[#383E46] text-xs mb-4">
                        <div className="flex items-center gap-1.5">
                          <Bed className="w-3.5 h-3.5 text-[#C5A880]" />
                          <span><strong className="text-[#0A192F]">{property.beds}</strong> Beds</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Bath className="w-3.5 h-3.5 text-[#C5A880]" />
                          <span><strong className="text-[#0A192F]">{property.baths}</strong> Baths</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Maximize2 className="w-3.5 h-3.5 text-[#C5A880]" />
                          <span><strong className="text-[#0A192F]">{formatArea(property.sqft, property.sqm)}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Card Action Buttons with Shimmer Sweep */}
                    <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-[#E4DCD0]/70">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProperty(property);
                        }}
                        className="py-2.5 px-3 rounded-xl bg-[#F3EFEA] hover:bg-[#EAE3D9] border border-[#E4DCD0] text-[#1A1D20] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
                        Details
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onScheduleTour(property);
                        }}
                        className="btn-shimmer py-2.5 px-3 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-95 shadow-sm"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                        Book Tour
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E4DCD0] shadow-sm">
            <p className="text-base font-serif text-[#1A1D20]">No properties found matching your selection.</p>
            <button
              onClick={() => setActiveCategory("All")}
              className="mt-3 px-5 py-2 rounded-xl bg-[#0A192F] text-[#FAF8F5] font-semibold text-xs uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
