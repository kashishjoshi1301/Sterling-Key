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
  Share2,
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

  const handleShare = (e, property) => {
    e.stopPropagation();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}#${property.id}`);
      addToast(`Encrypted dossier link for ${property.title} copied to clipboard`, "success", "Link Copied");
    }
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
    <section id="featured-listings" className="py-14 sm:py-16 bg-[#060709] border-b border-white/[0.06] relative">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] font-medium text-stone-400 mb-2">
              Curated Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
              Featured Sovereign Residences
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1.5 max-w-xl">
              Hand-selected trophy properties represented exclusively by Sterling Key with institutional management verification.
            </p>
          </div>

          {/* Right Header Controls: Sort + View Mode Switcher */}
          <div className="flex items-center gap-3">
            {/* View Mode Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-[#0E1015] border border-white/10">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider ${
                  viewMode === "grid"
                    ? "bg-white text-neutral-950 font-semibold"
                    : "text-neutral-400 hover:text-white"
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`p-2 rounded-lg transition-all flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider ${
                  viewMode === "map"
                    ? "bg-white text-neutral-950 font-semibold"
                    : "text-neutral-400 hover:text-white"
                }`}
                title="Interactive Map View"
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Map</span>
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-[#0E1015] border border-white/10 rounded-xl px-3 py-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs uppercase tracking-wider text-neutral-300 focus:outline-none cursor-pointer [&>option]:bg-[#0E1015]"
              >
                <option value="featured">Featured</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="sqft">Largest Area</option>
              </select>
            </div>
          </div>
        </div>

        {/* Minimalist Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-[0.08em] uppercase transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-white text-neutral-950 font-semibold shadow-sm"
                  : "bg-white/[0.03] border border-white/[0.08] text-neutral-400 hover:text-white hover:border-white/20"
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
          /* Properties Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredProperties.map((property) => {
              const currentImgIdx = currentImageIndices[property.id] || 0;
              const isSaved = savedIds.includes(property.id);
              const isCompared = compareIds.includes(property.id);

              return (
                <div
                  key={property.id}
                  onClick={() => onSelectProperty(property)}
                  className="group bg-[#0C0E13] border border-white/[0.07] hover:border-white/25 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer"
                >
                  {/* Image Container with Slider Controls */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-neutral-950">
                    <img
                      src={property.images[currentImgIdx] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"}
                      alt={property.title}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80";
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25" />

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-medium tracking-wider uppercase bg-black/60 backdrop-blur-md text-stone-200 border border-white/10">
                        {property.status}
                      </span>
                      {property.capRate && (
                        <span className="px-2 py-1 rounded-md text-[10px] font-medium tracking-wider uppercase bg-black/60 backdrop-blur-md text-stone-300 border border-white/10 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-stone-400" /> Yield {property.capRate}
                        </span>
                      )}
                    </div>

                    {/* Action Controls: Compare, Share, Save */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                      <button
                        onClick={(e) => handleCompareClick(e, property.id, property.title)}
                        className={`p-2 rounded-full backdrop-blur-md transition-all ${
                          isCompared
                            ? "bg-white text-neutral-950 scale-105"
                            : "bg-black/50 text-white hover:bg-black/80 opacity-0 group-hover:opacity-100"
                        }`}
                        title={isCompared ? "Remove from comparison" : "Compare with other estates"}
                      >
                        <Scale className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={(e) => handleShare(e, property)}
                        className="p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100"
                        title="Share listing"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={(e) => handleSaveClick(e, property.id, property.title)}
                        className="p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:text-stone-200 hover:bg-black/80 transition-all"
                        title="Save to favorites"
                      >
                        <Heart
                          className={`w-4 h-4 transition-transform active:scale-125 ${
                            isSaved ? "fill-stone-200 text-stone-200" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {/* Image Navigation Arrows */}
                    {property.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => handlePrevImage(e, property.id, property.images.length)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Previous photo"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleNextImage(e, property.id, property.images.length)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Next photo"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>

                        {/* Photo indicator dots */}
                        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1">
                          {property.images.map((_, idx) => (
                            <span
                              key={idx}
                              className={`h-1 rounded-full transition-all ${
                                idx === currentImgIdx ? "w-3.5 bg-white" : "w-1 bg-white/40"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Property Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center text-[11px] text-stone-400 font-medium mb-1">
                        <MapPin className="w-3 h-3 mr-1 shrink-0" />
                        <span>{property.neighborhood}, {property.city}</span>
                      </div>

                      <h3 className="text-lg font-serif text-white font-medium group-hover:text-stone-300 transition-colors line-clamp-1 mb-1">
                        {property.title}
                      </h3>
                      <p className="text-[11px] text-neutral-400 line-clamp-1 mb-3">
                        {property.address}
                      </p>

                      {/* Price Header */}
                      <div className="flex items-baseline gap-2 mb-3.5 pb-3.5 border-b border-white/[0.06]">
                        <span className="text-xl font-serif font-semibold text-white tracking-tight">
                          {formatPrice(property.price)}
                        </span>
                        {property.rentalPrice && (
                          <span className="text-[11px] text-neutral-400 font-sans">
                            or {property.rentalPrice}
                          </span>
                        )}
                      </div>

                      {/* Spec Pillars */}
                      <div className="grid grid-cols-3 gap-2 py-1 text-neutral-300 text-xs mb-3.5">
                        <div className="flex items-center gap-1.5">
                          <Bed className="w-3.5 h-3.5 text-stone-400" />
                          <span><strong>{property.beds}</strong> Beds</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Bath className="w-3.5 h-3.5 text-stone-400" />
                          <span><strong>{property.baths}</strong> Baths</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Maximize2 className="w-3.5 h-3.5 text-stone-400" />
                          <span><strong>{formatArea(property.sqft, property.sqm)}</strong></span>
                        </div>
                      </div>

                      {/* Amenities Pill Preview */}
                      <div className="flex flex-wrap gap-1 mb-5">
                        {property.amenities.slice(0, 2).map((amenity, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.04] text-neutral-300"
                          >
                            {amenity}
                          </span>
                        ))}
                        {property.amenities.length > 2 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.02] text-neutral-500">
                            +{property.amenities.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProperty(property);
                        }}
                        className="py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-neutral-200 text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Eye className="w-3 h-3 text-stone-400" />
                        Details
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onScheduleTour(property);
                        }}
                        className="py-2 px-3 rounded-xl bg-white hover:bg-stone-200 text-neutral-950 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all active:scale-95"
                      >
                        <Calendar className="w-3 h-3" />
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
          <div className="text-center py-16 bg-[#0E1015] rounded-2xl border border-white/[0.06]">
            <p className="text-base font-serif text-neutral-300">No properties found matching your selection.</p>
            <button
              onClick={() => setActiveCategory("All")}
              className="mt-3 px-5 py-2 rounded-xl bg-white text-neutral-950 font-semibold text-xs uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
