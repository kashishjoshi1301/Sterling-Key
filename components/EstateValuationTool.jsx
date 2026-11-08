"use client";

import React, { useState } from "react";
import { Calculator, ArrowRight, Sparkles, TrendingUp, Building2, CheckCircle2 } from "lucide-react";
import { useCurrency } from "./CurrencyContext";
import { useToast } from "./Toast";

export default function EstateValuationTool({ onOpenSchedule }) {
  const { formatRawPrice, activeSymbol } = useCurrency();
  const { addToast } = useToast();

  const [market, setMarket] = useState("los-angeles");
  const [propertyType, setPropertyType] = useState("compound");
  const [sqft, setSqft] = useState(8500);
  const [condition, setCondition] = useState("museum");

  // Market baseline price per sqft
  const marketRates = {
    "los-angeles": 2600,
    "new-york": 3400,
    "miami": 2400,
    "london": 3800,
    "aspen": 3100
  };

  const conditionMultiplier = {
    museum: 1.25,
    contemporary: 1.0,
    renovation: 0.8
  };

  const basePpsf = (marketRates[market] || 2500) * (conditionMultiplier[condition] || 1.0);
  const estimatedLow = Math.round(sqft * basePpsf * 0.95);
  const estimatedHigh = Math.round(sqft * basePpsf * 1.08);
  const estimatedRentMonthly = Math.round((estimatedLow * 0.055) / 12);
  const estimatedNOIAnnual = Math.round(estimatedRentMonthly * 12 * 0.82);

  return (
    <section id="valuation" className="py-14 sm:py-16 bg-[#FAF8F5] border-b border-[#E4DCD0] relative">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.24em] bg-white border border-[#E4DCD0] text-[#0A192F] mb-3 shadow-2xs">
            <TrendingUp className="w-3.5 h-3.5 text-[#C5A880]" /> Algorithmic Valuation Model (AVM)
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#0A192F] mb-3">
            Instant Estate Valuation
          </h2>
          <p className="text-[#545B65] text-xs sm:text-sm leading-relaxed">
            Model your property's capital equity, price per square foot, and projected leasing yield using live micro-market comps.
          </p>
        </div>

        <div className="bg-white border border-[#E4DCD0] rounded-3xl p-6 sm:p-9 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.14em] text-[#545B65] mb-1.5 font-medium">
                    Flagship Market
                  </label>
                  <select
                    value={market}
                    onChange={(e) => setMarket(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E4DCD0] rounded-xl px-3 py-2 text-xs text-[#1A1D20] font-medium focus:outline-none focus:border-[#C5A880] cursor-pointer [&>option]:bg-white"
                  >
                    <option value="los-angeles">Los Angeles (Bel-Air / Beverly Hills)</option>
                    <option value="new-york">New York (Manhattan / Billionaires' Row)</option>
                    <option value="miami">Miami Beach & Coastal Islands</option>
                    <option value="london">London (Mayfair / Belgravia)</option>
                    <option value="aspen">Aspen & Red Mountain</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.14em] text-[#545B65] mb-1.5 font-medium">
                    Architectural Typology
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E4DCD0] rounded-xl px-3 py-2 text-xs text-[#1A1D20] font-medium focus:outline-none focus:border-[#C5A880] cursor-pointer [&>option]:bg-white"
                  >
                    <option value="compound">Private Gated Estate / Compound</option>
                    <option value="penthouse">Full-Floor Sky Penthouse</option>
                    <option value="waterfront">Deepwater Coastal Residence</option>
                    <option value="townhouse">Historic Heritage Townhouse</option>
                  </select>
                </div>
              </div>

              {/* Area Slider */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-[#383E46] font-medium">Interior Square Footage</span>
                  <span className="text-[#0A192F] font-mono font-bold text-sm">
                    {sqft.toLocaleString("en-US")} SF
                  </span>
                </div>
                <input
                  type="range"
                  min="2500"
                  max="30000"
                  step="250"
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#EAE3D9] rounded-lg appearance-none cursor-pointer accent-[#0A192F]"
                />
                <div className="flex justify-between text-[10px] text-[#747D88] mt-1 font-mono">
                  <span>2,500 SF</span>
                  <span>15,000 SF</span>
                  <span>30,000+ SF</span>
                </div>
              </div>

              {/* Architectural Condition */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.14em] text-[#545B65] mb-1.5 font-medium">
                  Architectural & Finish Quality
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "museum", label: "Museum-Quality / Turnkey" },
                    { id: "contemporary", label: "Excellent Contemporary" },
                    { id: "renovation", label: "Renovation Potential" }
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCondition(c.id)}
                      className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                        condition === c.id
                          ? "bg-[#0A192F] border-[#0A192F] text-white font-semibold shadow-xs"
                          : "bg-[#F3EFEA] border-[#E4DCD0] text-[#545B65] hover:text-[#0A192F]"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Output Box in Deep Navy */}
            <div className="lg:col-span-5 bg-[#0A192F] text-white border border-[#060D18] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold mb-1">
                  Estimated Capital Valuation Range
                </div>
                <div className="text-2xl sm:text-3xl font-serif text-[#EADDC9] font-semibold tracking-tight mb-4">
                  {formatRawPrice(estimatedLow)} – {formatRawPrice(estimatedHigh)}
                </div>

                <div className="space-y-3 pb-4 border-b border-white/10 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[#A8B2C1]">Target PPSF</span>
                    <span className="font-mono text-white">${Math.round(basePpsf)} / SF</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#A8B2C1]">Potential Gross Rent</span>
                    <span className="font-mono text-white">${estimatedRentMonthly.toLocaleString("en-US")} / mo</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#A8B2C1]">Projected Net Operating Income</span>
                    <span className="font-mono text-[#C5A880] font-semibold">${estimatedNOIAnnual.toLocaleString("en-US")} / yr</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-2 space-y-2">
                <button
                  onClick={() => {
                    onOpenSchedule();
                    addToast("Broker Opinion of Value consultation initiated", "info", "CMA Requested");
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#C5A880] hover:bg-[#D8BD99] text-[#0A192F] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
                >
                  Request Formal CMA Report <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <p className="text-[10px] text-[#A8B2C1] text-center">
                  Subject to on-site physical appraisal and architectural audit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
