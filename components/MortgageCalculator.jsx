"use client";

import React, { useState } from "react";
import { Calculator, ArrowRight, Landmark } from "lucide-react";

export default function MortgageCalculator({ onOpenSchedule }) {
  const [homePrice, setHomePrice] = useState(12500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [interestRate, setInterestRate] = useState(6.25);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.15);
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState(24000);
  const [hoaMonthly, setHoaMonthly] = useState(2800);

  const downPaymentAmount = Math.round(homePrice * (downPaymentPercent / 100));
  const loanAmount = homePrice - downPaymentAmount;

  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  const monthlyPI =
    loanAmount > 0 && monthlyRate > 0
      ? (loanAmount *
          (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      : 0;

  const monthlyPropertyTax = Math.round((homePrice * (propertyTaxRate / 100)) / 12);
  const monthlyInsurance = Math.round(homeInsuranceAnnual / 12);
  const totalMonthlyPayment = Math.round(monthlyPI + monthlyPropertyTax + monthlyInsurance + hoaMonthly);

  const piShare = totalMonthlyPayment > 0 ? (monthlyPI / totalMonthlyPayment) * 100 : 0;
  const taxShare = totalMonthlyPayment > 0 ? (monthlyPropertyTax / totalMonthlyPayment) * 100 : 0;
  const insShare = totalMonthlyPayment > 0 ? (monthlyInsurance / totalMonthlyPayment) * 100 : 0;
  const hoaShare = totalMonthlyPayment > 0 ? (hoaMonthly / totalMonthlyPayment) * 100 : 0;

  return (
    <section id="calculator" className="py-14 sm:py-16 bg-[#060709] border-b border-white/[0.06] relative">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-[0.24em] bg-white/[0.04] border border-white/10 text-stone-300 mb-3">
            <Calculator className="w-3 h-3 text-stone-400" /> Redfin & Compass Standard
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-white mb-3">
            Mortgage & Capital Outlay Estimator
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
            Model structured jumbo mortgage payments, escrow allocations, and capital outlays with private banking clarity.
          </p>
        </div>

        <div className="bg-[#0C0E13] border border-white/[0.08] rounded-3xl p-6 sm:p-9 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-5">
              {/* Home Price */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-neutral-300 font-medium">Acquisition Target Price</span>
                  <span className="text-white font-mono font-semibold text-base">
                    ${homePrice.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000000"
                  max="60000000"
                  step="250000"
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-stone-300"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                  <span>$1,000,000</span>
                  <span>$30,000,000</span>
                  <span>$60,000,000+</span>
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-neutral-300 font-medium">Down Payment ({downPaymentPercent}%)</span>
                  <span className="text-stone-300 font-mono font-semibold text-sm">
                    ${downPaymentAmount.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-stone-300"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                  <span>10% ($1.2M)</span>
                  <span>25% Standard Jumbo</span>
                  <span>50%</span>
                </div>
              </div>

              {/* Loan Term & Interest Rate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.14em] text-neutral-400 mb-1.5 font-medium">
                    Financing Term
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setLoanTerm(30)}
                      className={`py-2 rounded-xl border text-xs font-medium uppercase tracking-wider transition-all ${
                        loanTerm === 30
                          ? "bg-white/[0.08] border-white/30 text-white font-semibold"
                          : "bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-white"
                      }`}
                    >
                      30-Year
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoanTerm(15)}
                      className={`py-2 rounded-xl border text-xs font-medium uppercase tracking-wider transition-all ${
                        loanTerm === 15
                          ? "bg-white/[0.08] border-white/30 text-white font-semibold"
                          : "bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-white"
                      }`}
                    >
                      15-Year
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.14em] text-neutral-400 mb-1.5 font-medium">
                    <span>Interest Rate</span>
                    <span className="text-white font-mono font-semibold text-xs">{interestRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="4.0"
                    max="9.0"
                    step="0.125"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-stone-300"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                    <span>4.0%</span>
                    <span>6.25% Current</span>
                    <span>9.0%</span>
                  </div>
                </div>
              </div>

              {/* Property Tax & HOA inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.14em] text-neutral-400 mb-1 font-medium">
                    Tax Rate: {propertyTaxRate}% (${monthlyPropertyTax.toLocaleString()}/mo)
                  </label>
                  <input
                    type="range"
                    min="0.6"
                    max="2.5"
                    step="0.05"
                    value={propertyTaxRate}
                    onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                    className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-stone-300"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.14em] text-neutral-400 mb-1 font-medium">
                    Monthly HOA & Dues
                  </label>
                  <input
                    type="number"
                    value={hoaMonthly}
                    onChange={(e) => setHoaMonthly(Number(e.target.value))}
                    className="w-full bg-[#08090C] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>
            </div>

            {/* Visual Minimalist Breakdown & Total Display */}
            <div className="lg:col-span-5 bg-[#08090C] border border-white/[0.08] rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-medium block mb-1">
                  Estimated Total Outlay
                </span>
                <div className="text-3xl font-serif text-white font-semibold tracking-tight mb-5">
                  ${totalMonthlyPayment.toLocaleString()}
                  <span className="text-xs font-sans font-normal text-neutral-400 ml-1">/ month</span>
                </div>

                {/* Minimalist segmented bar */}
                <div className="w-full h-2 rounded-full bg-neutral-800 flex overflow-hidden mb-5">
                  <div style={{ width: `${piShare}%` }} className="bg-white" title="Principal & Interest" />
                  <div style={{ width: `${taxShare}%` }} className="bg-stone-300" title="Property Tax" />
                  <div style={{ width: `${insShare}%` }} className="bg-neutral-400" title="Insurance" />
                  <div style={{ width: `${hoaShare}%` }} className="bg-neutral-600" title="HOA Dues" />
                </div>

                {/* Breakdown items */}
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-neutral-300">
                      <span className="w-2 h-2 rounded-full bg-white" />
                      Principal & Interest ({loanTerm}yr)
                    </span>
                    <span className="font-mono text-white font-medium">
                      ${Math.round(monthlyPI).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-neutral-300">
                      <span className="w-2 h-2 rounded-full bg-stone-300" />
                      Property Taxes (Escrow)
                    </span>
                    <span className="font-mono text-white font-medium">
                      ${monthlyPropertyTax.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-neutral-300">
                      <span className="w-2 h-2 rounded-full bg-neutral-400" />
                      Hazard Insurance
                    </span>
                    <span className="font-mono text-white font-medium">
                      ${monthlyInsurance.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-neutral-300">
                      <span className="w-2 h-2 rounded-full bg-neutral-600" />
                      HOA & Reserve
                    </span>
                    <span className="font-mono text-white font-medium">
                      ${hoaMonthly.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.05] text-[11px] text-neutral-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Financed Principal:</span>
                    <span className="font-mono text-neutral-200">${loanAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Cash to Close:</span>
                    <span className="font-mono text-stone-300 font-semibold">${downPaymentAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3">
                <button
                  onClick={onOpenSchedule}
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-stone-200 text-neutral-950 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Landmark className="w-3.5 h-3.5" />
                  Consult Lending Desk <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
