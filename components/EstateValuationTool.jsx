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
    <section id="valuation" className="py-14 sm:py-16 bg-[#060709] border-b border-white/[0.06] relative">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-[0.24em] bg-white/[0.04] border border-white/10 text-stone-300 mb-3">
            <TrendingUp className="w-3.5 h-3.5 text-stone-400" /> Algorithmic Valuation Model (AVM)
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-white mb-3">
            Instant Estate Valuation
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
            Model your property's capital equity, price per square foot, and projected leasing yield using live micro-market comps.
          </p>
        </div>

        <div className="bg-[#0C0E14] border border-white/[0.08] rounded-3xl p-6 sm:p-9 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.14em] text-neutral-400 mb-1.5 font-medium">
                    Flagship Market
                  </label>
                  <select
                    value={market}
                    onChange={(e) => setMarket(e.target.value)}
                    className="w-full bg-[#08090C] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none cursor-pointer [&>option]:bg-[#0E1015]"
                  >
                    <option value="los-angeles">Los Angeles (Bel-Air / Beverly Hills)</option>
                    <option value="new-york">New York (Manhattan / Billionaires' Row)</option>
                    <option value="miami">Miami Beach & Coastal Islands</option>
                    <option value="london">London (Mayfair / Belgravia)</option>
                    <option value="aspen">Aspen & Red Mountain</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.14em] text-neutral-400 mb-1.5 font-medium">
                    Architectural Typology
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-[#08090C] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none cursor-pointer [&>option]:bg-[#0E1015]"
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
                  <span className="text-neutral-300 font-medium">Interior Square Footage</span>
                  <span className="text-white font-mono font-semibold text-sm">
                    {sqft.toLocaleString()} SF
                  </span>
                </div>
                <input
                  type="range"
                  min="2500"
                  max="30000"
                  step="250"
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-stone-300"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                  <span>2,500 SF</span>
                  <span>15,000 SF</span>
                  <span>30,000+ SF</span>
                </div>
              </div>

              {/* Architectural Condition */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.14em] text-neutral-400 mb-1.5 font-medium">
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
                          ? "bg-white/[0.08] border-white/30 text-white font-semibold"
                          : "bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-white"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Output Box */}
            <div className="lg:col-span-5 bg-[#08090C] border border-white/[0.08] rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-medium mb-1">
                  Estimated Capital Valuation Range
                </div>
                <div className="text-2xl sm:text-3xl font-serif text-white font-semibold tracking-tight mb-4">
                  {formatRawPrice(estimatedLow)} – {formatRawPrice(estimatedHigh)}
                </div>

                <div className="space-y-3 pb-4 border-b border-white/[0.06] text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Target PPSF</span>
                    <span className="font-mono text-white">${Math.round(basePpsf)} / SF</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Potential Gross Rent</span>
                    <span className="font-mono text-white">${estimatedRentMonthly.toLocaleString()} / mo</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Projected Net Operating Income</span>
                    <span className="font-mono text-stone-300 font-semibold">${estimatedNOIAnnual.toLocaleString()} / yr</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-2 space-y-2">
                <button
                  onClick={() => {
                    onOpenSchedule();
                    addToast("Broker Opinion of Value consultation initiated", "info", "CMA Requested");
                  }}
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-stone-200 text-neutral-950 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all active:scale-95"
                >
                  Request Formal CMA Report <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <p className="text-[10px] text-neutral-500 text-center">
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
