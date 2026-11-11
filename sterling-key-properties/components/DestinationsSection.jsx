"use client";

import React, { useState } from "react";
import { NEIGHBORHOODS_DATA } from "../data/mockData";
import { MapPin, ArrowUpRight } from "lucide-react";

export default function DestinationsSection({ onSelectCity }) {
  const [activeCity, setActiveCity] = useState(NEIGHBORHOODS_DATA[0]);

  return (
    <section id="neighborhoods" className="py-16 sm:py-24 bg-[#FAF8F5] text-[#1A1D20] relative border-b border-[#E4DCD0]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#C5A880] mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
              Douglas Elliman Heritage
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#0A192F]">
              Global Flagship Destinations
            </h2>
            <p className="text-[#545B65] text-xs sm:text-sm mt-1 max-w-xl">
              From historic London garden squares to Miami deepwater island parcels, representing premier real estate across resilient sovereign havens.
            </p>
          </div>
        </div>

        {/* Minimalist Destinations Grid on Warm Ivory Canvas with Smooth Lift */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {NEIGHBORHOODS_DATA.map((city) => (
            <div
              key={city.id}
              onClick={() => {
                setActiveCity(city);
                if (onSelectCity) onSelectCity(city.name.split(",")[0]);
              }}
              className={`group relative rounded-3xl overflow-hidden aspect-[4/3] cursor-pointer border transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 ${
                activeCity.id === city.id
                  ? "border-[#C5A880] ring-2 ring-[#C5A880]/40"
                  : "border-[#E4DCD0] hover:border-[#C5A880]"
              }`}
            >
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 transition-opacity duration-300 group-hover:opacity-90" />

              {/* Badges on Top with Frosted Glassmorphism */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider bg-[#0A192F]/85 backdrop-blur-md text-[#EADDC9] border border-[#C5A880]/40 shadow-sm">
                  Avg Yield {city.avgYield}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/10">
                  Median {city.medianPrice}
                </span>
              </div>

              {/* City Bottom Details */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#C5A880] font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{city.tag}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:text-[#C5A880] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>

                <h3 className="text-xl sm:text-2xl font-serif text-white font-semibold mb-2.5 group-hover:text-[#EADDC9] transition-colors">
                  {city.name}
                </h3>

                <div className="flex flex-wrap gap-1.5">
                  {city.districts.slice(0, 3).map((district, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/15 text-white backdrop-blur-md border border-white/10"
                    >
                      {district}
                    </span>
                  ))}
                  {city.districts.length > 3 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/80 backdrop-blur-md">
                      +{city.districts.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
