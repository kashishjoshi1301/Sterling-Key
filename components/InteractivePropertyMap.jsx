"use client";

import React, { useState } from "react";
import { MapPin, Navigation, ZoomIn, ZoomOut, Layers, Eye, Heart, Bed, Bath, Maximize2 } from "lucide-react";
import { useCurrency } from "./CurrencyContext";

export default function InteractivePropertyMap({ 
  properties = [], 
  onSelectProperty, 
  savedIds = [], 
  onToggleSave 
}) {
  const { formatPrice } = useCurrency();
  const [activePin, setActivePin] = useState(properties[0] || null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [regionFilter, setRegionFilter] = useState("all");

  const regions = [
    { id: "all", name: "Global View" },
    { id: "CA", name: "California" },
    { id: "NY", name: "New York" },
    { id: "FL", name: "Florida" },
    { id: "UK", name: "London" },
    { id: "CO", name: "Colorado" }
  ];

  const filteredProperties = regionFilter === "all" 
    ? properties 
    : properties.filter(p => p.state === regionFilter);

  return (
    <div className="relative w-full h-[620px] rounded-3xl overflow-hidden border border-white/10 bg-[#07080A] shadow-2xl flex flex-col">
      {/* Top Map Bar Controls */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Region Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0E1015]/90 backdrop-blur-md border border-white/10 pointer-events-auto">
          {regions.map((reg) => (
            <button
              key={reg.id}
              onClick={() => setRegionFilter(reg.id)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-medium uppercase tracking-wider transition-all ${
                regionFilter === reg.id
                  ? "bg-white text-neutral-950 font-semibold shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {reg.name}
            </button>
          ))}
        </div>

        {/* Map Zoom Controls */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0E1015]/90 backdrop-blur-md border border-white/10 pointer-events-auto">
          <button
            onClick={() => setZoomLevel((prev) => Math.min(prev + 0.2, 1.6))}
            className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <span className="text-[10px] font-mono text-neutral-400 px-1">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => setZoomLevel((prev) => Math.max(prev - 0.2, 0.8))}
            className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="px-2 py-1 rounded-lg text-[9px] uppercase tracking-wider bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Styled Minimalist Architectural Canvas */}
      <div 
        className="relative flex-1 w-full overflow-hidden cursor-grab active:cursor-grabbing transition-transform duration-500 ease-out"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        {/* Subtle Map Grid & Vector Terrain Art */}
        <svg 
          viewBox="0 0 1000 600" 
          className="w-full h-full opacity-20 pointer-events-none stroke-white/10 fill-none"
        >
          {/* Latitude / Longitude Matrix */}
          <line x1="0" y1="150" x2="1000" y2="150" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="0" y1="300" x2="1000" y2="300" strokeWidth="0.75" />
          <line x1="0" y1="450" x2="1000" y2="450" strokeWidth="0.5" strokeDasharray="4 4" />
          
          <line x1="250" y1="0" x2="250" y2="600" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="500" y1="0" x2="500" y2="600" strokeWidth="0.75" />
          <line x1="750" y1="0" x2="750" y2="600" strokeWidth="0.5" strokeDasharray="4 4" />

          {/* Abstract Minimalist Continental Contours */}
          {/* North America Coastline abstraction */}
          <path d="M 120,80 Q 200,120 230,220 T 260,350 T 290,480" strokeWidth="1.2" stroke="white" opacity="0.3" />
          <path d="M 230,220 Q 320,180 420,240 T 550,220" strokeWidth="0.8" />
          
          {/* East Coast & Caribbean */}
          <path d="M 680,180 Q 740,240 760,320 T 730,460" strokeWidth="1.2" stroke="white" opacity="0.3" />
          
          {/* Europe / UK */}
          <circle cx="510" cy="160" r="45" strokeWidth="1" stroke="white" opacity="0.25" strokeDasharray="3 3" />
          
          {/* Topographic depth circles */}
          <circle cx="220" cy="330" r="120" strokeWidth="0.5" stroke="white" opacity="0.15" />
          <circle cx="730" cy="460" r="140" strokeWidth="0.5" stroke="white" opacity="0.15" />
        </svg>

        {/* Dynamic Property Map Pins (Compass Style Floating Price Pills) */}
        {filteredProperties.map((prop) => {
          const isSelected = activePin?.id === prop.id;
          const coords = prop.mapCoords || { x: 50, y: 50 };

          return (
            <div
              key={prop.id}
              onClick={() => setActivePin(prop)}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group transition-all duration-300"
              style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
            >
              {/* Ripple Radar Wave for Selected Pin */}
              {isSelected && (
                <div className="absolute inset-0 -m-3 rounded-full bg-white/20 animate-ping pointer-events-none" />
              )}

              {/* Price Tag Pill */}
              <div
                className={`relative px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 shadow-xl flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-white text-neutral-950 scale-110 ring-4 ring-white/20"
                    : "bg-[#0E1015]/95 text-stone-200 border border-white/20 hover:scale-105 hover:bg-neutral-900 hover:border-white/50"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-neutral-950" : "bg-stone-300"}`} />
                <span>{formatPrice(prop.price)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Active Property Card Teaser (Compass & Redfin Style) */}
      {activePin && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-20 sm:max-w-md bg-[#0C0E13]/95 backdrop-blur-xl border border-white/15 rounded-2xl p-4 shadow-2xl flex gap-4 animate-fade-in">
          <img
            src={activePin.images[0]}
            alt={activePin.title}
            className="w-24 h-24 rounded-xl object-cover shrink-0"
          />

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium">
                  {activePin.city}, {activePin.state}
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] uppercase font-semibold bg-white/10 text-stone-200 border border-white/10">
                  {activePin.status}
                </span>
              </div>
              <h4 className="text-xs font-serif text-white font-medium line-clamp-1 mt-0.5">
                {activePin.title}
              </h4>
              <div className="text-sm font-serif font-semibold text-white mt-0.5">
                {formatPrice(activePin.price)}
              </div>
              <div className="text-[10px] text-neutral-400 mt-0.5">
                {activePin.beds} Beds · {activePin.baths} Baths · {activePin.sqft.toLocaleString()} SF
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => onSelectProperty(activePin)}
                className="flex-1 py-1.5 rounded-lg bg-white hover:bg-stone-200 text-neutral-950 text-[11px] font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1"
              >
                <Eye className="w-3 h-3" /> View Dossier
              </button>
              <button
                onClick={() => onToggleSave(activePin.id)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10"
                title="Save"
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    savedIds.includes(activePin.id) ? "fill-stone-200 text-stone-200" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
