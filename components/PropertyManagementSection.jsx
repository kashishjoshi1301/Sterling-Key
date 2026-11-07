"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  TrendingUp, 
  Key, 
  Wrench, 
  FileText, 
  Check, 
  ArrowRight, 
  Sliders
} from "lucide-react";
import { MANAGEMENT_TIERS } from "../data/mockData";

export default function PropertyManagementSection({ onOpenPortal, onOpenSchedule }) {
  const [propertyValue, setPropertyValue] = useState(8500000);
  const [monthlyRent, setMonthlyRent] = useState(38000);
  const [selectedTier, setSelectedTier] = useState("tier-signature");

  const grossAnnual = monthlyRent * 12;
  const managementFeePercent = selectedTier === "tier-advisory" ? 0.083 : selectedTier === "tier-signature" ? 0.065 : 0.05;
  const annualManagementFee = grossAnnual * managementFeePercent;
  const estimatedExpenses = grossAnnual * 0.18;
  const estimatedNOI = grossAnnual - annualManagementFee - estimatedExpenses;
  const capRate = ((estimatedNOI / propertyValue) * 100).toFixed(2);
  const dynamicOptimizationGain = Math.round(grossAnnual * 0.14);

  return (
    <section id="property-management" className="py-14 sm:py-16 bg-[#08090C] text-white relative border-b border-white/[0.06]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-[0.24em] bg-white/[0.04] border border-white/10 text-stone-300 mb-3">
            <Key className="w-3 h-3 text-stone-400" /> Greystar-Caliber Asset Care
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-white mb-3">
            Institutional Property Management
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
            Bridging institutional enterprise systems with Mayfair private hospitality. Managing single trophy estates and entire multi-family luxury portfolios with zero operational friction.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          <div className="p-5 rounded-2xl bg-[#0E1015] border border-white/[0.07] hover:border-white/20 transition-all">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-stone-300 mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif text-white font-medium mb-1.5">
              Yield Optimization
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Proprietary dynamic pricing algorithms calibrate rental rates to micro-market demand, delivering an average 14% higher Net Operating Income.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0E1015] border border-white/[0.07] hover:border-white/20 transition-all">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-stone-300 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif text-white font-medium mb-1.5">
              Tenant Curation
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Stringent biometric, institutional credit, and sovereign reference vetting. 0.2% historical default rate across our global portfolio.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0E1015] border border-white/[0.07] hover:border-white/20 transition-all">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-stone-300 mb-4">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif text-white font-medium mb-1.5">
              Concierge Dispatch
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              No retail markups on repairs. We leverage enterprise master contracts and conduct quarterly drone and thermal envelope diagnostics.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0E1015] border border-white/[0.07] hover:border-white/20 transition-all">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-stone-300 mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif text-white font-medium mb-1.5">
              Automated Distributions
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Direct ACH deposits disbursed by the 5th of each month. Live access to GAAP-audited cash flow statements and tax packs.
            </p>
          </div>
        </div>

        {/* Minimalist Owner ROI & Yield Calculator */}
        <div className="bg-[#0C0E13] border border-white/[0.08] rounded-3xl p-6 sm:p-9 mb-16 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Inputs */}
            <div className="lg:col-span-7">
              <div className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-medium mb-2 flex items-center gap-1.5">
                <Sliders className="w-3 h-3" /> Owner Cash Flow Simulator
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-white mb-2">
                Calculate Portfolio Yield
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm mb-6">
                Discover how institutional management eliminates vacancies, lowers operating friction, and optimizes Net Operating Income.
              </p>

              {/* Sliders */}
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-neutral-300 font-medium">Estimated Valuation</span>
                    <span className="text-white font-mono font-semibold text-sm">
                      ${propertyValue.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1500000"
                    max="50000000"
                    step="250000"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                    className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-stone-300"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                    <span>$1.5M</span>
                    <span>$25M</span>
                    <span>$50M+</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-neutral-300 font-medium">Monthly Rental Revenue</span>
                    <span className="text-white font-mono font-semibold text-sm">
                      ${monthlyRent.toLocaleString()} / mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="150000"
                    step="1000"
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(Number(e.target.value))}
                    className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-stone-300"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                    <span>$5k / mo</span>
                    <span>$75k / mo</span>
                    <span>$150k+ / mo</span>
                  </div>
                </div>

                {/* Tier Selection */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.14em] text-neutral-400 mb-1.5 font-medium">
                    Service Scope
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {MANAGEMENT_TIERS.map((tier) => (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setSelectedTier(tier.id)}
                        className={`p-2 rounded-xl border text-center transition-all ${
                          selectedTier === tier.id
                            ? "bg-white/[0.08] border-white/30 text-white font-medium"
                            : "bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-white"
                        }`}
                      >
                        <div className="text-[10px] uppercase tracking-wider truncate">{tier.name.split(" ")[1]}</div>
                        <div className="text-[9px] text-neutral-400 mt-0.5 truncate">{tier.fee}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Output Display Box */}
            <div className="lg:col-span-5 bg-[#08090C] border border-white/[0.08] rounded-2xl p-6 shadow-inner flex flex-col justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-medium mb-4 flex items-center justify-between">
                  <span>Projected Returns</span>
                  <span className="px-2 py-0.5 rounded text-[9px] bg-white/[0.06] text-stone-300 border border-white/10">
                    Live Model
                  </span>
                </div>

                <div className="space-y-3.5">
                  <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.05]">
                    <span className="text-xs text-neutral-400">Gross Annual Revenue</span>
                    <span className="font-mono text-white font-medium text-xs">
                      ${grossAnnual.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.05]">
                    <span className="text-xs text-neutral-400">Projected Net Operating Income</span>
                    <span className="font-mono text-white font-bold text-sm">
                      ${Math.round(estimatedNOI).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.05]">
                    <span className="text-xs text-neutral-400">Estimated Net Cap Rate</span>
                    <span className="font-mono text-stone-200 font-bold text-base">
                      {capRate}%
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-[11px] text-stone-300 font-medium mb-0.5">
                      Optimization Uplift
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      Algorithmic pricing & bulk maintenance is projected to optimize an extra{" "}
                      <span className="text-white font-medium font-mono">+${dynamicOptimizationGain.toLocaleString()}/yr</span>.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/[0.06] flex flex-col gap-2">
                <button
                  onClick={onOpenSchedule}
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-stone-200 text-neutral-950 font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  Request Consultation <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onOpenPortal}
                  className="w-full py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] text-neutral-300 hover:text-white font-medium text-xs uppercase tracking-wider transition-all"
                >
                  Owner Portal Login
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tier Plans Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {MANAGEMENT_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 ${
                tier.badge === "Most Popular"
                  ? "bg-[#0E1015] border border-white/25 shadow-xl"
                  : "bg-[#0A0C10] border border-white/[0.07] hover:border-white/15"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-[0.16em] text-neutral-400 font-medium">
                    {tier.name}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-medium uppercase tracking-wider bg-white/[0.05] text-stone-300 border border-white/10">
                    {tier.badge}
                  </span>
                </div>

                <div className="text-2xl font-serif text-white font-semibold mb-1.5">
                  {tier.fee}
                </div>
                <p className="text-xs text-neutral-400 mb-5 min-h-[32px]">
                  {tier.tagline}
                </p>

                <div className="space-y-2.5 mb-6">
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-stone-300 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06]">
                <div className="text-[10px] text-neutral-500 italic mb-3">
                  Ideal for: {tier.idealFor}
                </div>
                <button
                  onClick={onOpenSchedule}
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                    tier.badge === "Most Popular"
                      ? "bg-white hover:bg-stone-200 text-neutral-950 shadow-sm"
                      : "bg-white/[0.05] hover:bg-white/[0.09] text-white border border-white/10"
                  }`}
                >
                  Select Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
