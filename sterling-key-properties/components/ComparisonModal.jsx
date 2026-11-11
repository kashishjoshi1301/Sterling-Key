"use client";

import React from "react";
import { X, Check, Minus, Calendar, Trash2, Eye } from "lucide-react";
import { useCurrency } from "./CurrencyContext";

export default function ComparisonModal({
  isOpen,
  onClose,
  properties = [],
  onRemoveFromCompare,
  onSelectProperty,
  onScheduleTour
}) {
  const { formatRawPrice, formatArea } = useCurrency();

  if (!isOpen || properties.length === 0) return null;

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

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl lg:max-w-6xl bg-[#FAF8F5] border border-[#E4DCD0] rounded-2xl overflow-hidden shadow-2xl my-auto flex flex-col max-h-[90vh] text-[#1A1D20]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header in Deep Navy */}
        <div className="bg-[#0A192F] text-white border-b border-[#060D18] p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-lg font-serif text-white font-medium">
              Architectural Estate Comparison Matrix
            </h3>
            <p className="text-xs text-[#A8B2C1]">
              Comparing {properties.length} prime sovereign residences side-by-side
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#EADDC9] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Matrix Table */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#FAF8F5]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#383E46] border-collapse min-w-[700px]">
              {/* Property Header Cards */}
              <thead>
                <tr className="border-b border-[#E4DCD0]">
                  <th className="py-4 px-4 w-44 text-[10px] uppercase tracking-wider text-[#747D88] align-top font-semibold">
                    Residence
                  </th>
                  {properties.map((prop) => (
                    <th key={prop.id} className="py-4 px-4 align-top w-72">
                      <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-900 mb-3 group shadow-xs">
                        <img
                          src={prop.images[0]}
                          alt={prop.title}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => onRemoveFromCompare(prop.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-black text-white hover:text-rose-400"
                          title="Remove from comparison"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[10px] text-[#C5A880] uppercase font-semibold">
                        {prop.neighborhood}, {prop.city}
                      </div>
                      <h4 className="text-sm font-serif text-[#0A192F] font-semibold line-clamp-1 mt-0.5">
                        {prop.title}
                      </h4>
                      <div className="text-base font-serif font-bold text-[#0A192F] mt-1">
                        {formatRawPrice(prop.price)}
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <button
                          onClick={() => {
                            onClose();
                            onSelectProperty(prop);
                          }}
                          className="py-1.5 rounded-lg bg-[#F3EFEA] hover:bg-[#EAE3D9] text-[#0A192F] border border-[#E4DCD0] text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1"
                        >
                          <Eye className="w-3 h-3 text-[#C5A880]" /> Dossier
                        </button>
                        <button
                          onClick={() => {
                            onClose();
                            onScheduleTour(prop);
                          }}
                          className="py-1.5 rounded-lg bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1 shadow-xs"
                        >
                          <Calendar className="w-3 h-3 text-[#C5A880]" /> Tour
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Specs Rows */}
              <tbody className="divide-y divide-[#E4DCD0]">
                <tr>
                  <td className="py-3 px-4 text-[#747D88] font-semibold">Interior Area</td>
                  {properties.map((p) => (
                    <td key={p.id} className="py-3 px-4 font-mono text-[#0A192F] font-bold">
                      {formatArea(p.sqft, p.sqm)}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="py-3 px-4 text-[#747D88] font-semibold">Price / Sq.Ft</td>
                  {properties.map((p) => (
                    <td key={p.id} className="py-3 px-4 font-mono text-[#C5A880] font-bold">
                      ${Math.round(p.price / p.sqft).toLocaleString("en-US")} / SF
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="py-3 px-4 text-[#747D88] font-semibold">Bedrooms & Baths</td>
                  {properties.map((p) => (
                    <td key={p.id} className="py-3 px-4 text-[#1A1D20]">
                      {p.beds} Beds · {p.baths} Baths
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="py-3 px-4 text-[#747D88] font-semibold">Lot Size</td>
                  {properties.map((p) => (
                    <td key={p.id} className="py-3 px-4 text-[#1A1D20]">
                      {p.lotSize}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="py-3 px-4 text-[#747D88] font-semibold">Year Built</td>
                  {properties.map((p) => (
                    <td key={p.id} className="py-3 px-4 text-[#1A1D20]">
                      {p.yearBuilt}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="py-3 px-4 text-[#747D88] font-semibold">Projected Net Cap Rate</td>
                  {properties.map((p) => (
                    <td key={p.id} className="py-3 px-4 font-mono text-[#C5A880] font-bold">
                      {p.capRate || "5.2%"}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="py-3 px-4 text-[#747D88] font-semibold">Annual Property Taxes</td>
                  {properties.map((p) => (
                    <td key={p.id} className="py-3 px-4 text-[#383E46] font-mono">
                      {p.taxesAnnual || "$180,000"}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="py-3 px-4 text-[#747D88] font-semibold">Monthly HOA / Concierge</td>
                  {properties.map((p) => (
                    <td key={p.id} className="py-3 px-4 text-[#383E46] font-mono">
                      {p.hoa || "$1,250 / mo"}
                    </td>
                  ))}
                </tr>

                {/* Amenities Matrix Rows */}
                {allAmenities.map((amenity, idx) => (
                  <tr key={idx} className="bg-white/40">
                    <td className="py-2.5 px-4 text-[#545B65] text-[11px] font-medium">{amenity}</td>
                    {properties.map((p) => {
                      const hasAmenity = p.amenities?.some((a) =>
                        a.toLowerCase().includes(amenity.toLowerCase().split(" ")[0])
                      );
                      return (
                        <td key={p.id} className="py-2.5 px-4">
                          {hasAmenity ? (
                            <span className="inline-flex items-center gap-1 text-[#0A192F] text-xs font-semibold">
                              <Check className="w-3.5 h-3.5 text-[#C5A880]" /> Yes
                            </span>
                          ) : (
                            <span className="text-[#A8B2C1]">
                              <Minus className="w-3.5 h-3.5" />
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
        </div>
      </div>
    </div>
  );
}
