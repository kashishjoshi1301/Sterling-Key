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
    <section id="calculator" className="py-14 sm:py-16 bg-[#FAF8F5] border-b border-[#E4DCD0] relative">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.24em] bg-white border border-[#E4DCD0] text-[#0A192F] mb-3 shadow-2xs">
            <Calculator className="w-3 h-3 text-[#C5A880]" /> Redfin & Compass Standard
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#0A192F] mb-3">
            Mortgage & Capital Outlay Estimator
          </h2>
          <p className="text-[#545B65] text-xs sm:text-sm leading-relaxed">
            Model structured jumbo mortgage payments, escrow allocations, and capital outlays with private banking clarity.
          </p>
        </div>

        <div className="bg-white border border-[#E4DCD0] rounded-3xl p-6 sm:p-9 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-5">
              {/* Home Price */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-[#383E46] font-medium">Acquisition Target Price</span>
                  <span className="text-[#0A192F] font-mono font-bold text-base">
                    ${homePrice.toLocaleString("en-US")}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000000"
                  max="60000000"
                  step="250000"
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#EAE3D9] rounded-lg appearance-none cursor-pointer accent-[#0A192F]"
                />
                <div className="flex justify-between text-[10px] text-[#747D88] mt-1 font-mono">
                  <span>$1,000,000</span>
                  <span>$30,000,000</span>
                  <span>$60,000,000+</span>
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-[#383E46] font-medium">Down Payment ({downPaymentPercent}%)</span>
                  <span className="text-[#0A192F] font-mono font-bold text-sm">
                    ${downPaymentAmount.toLocaleString("en-US")}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#EAE3D9] rounded-lg appearance-none cursor-pointer accent-[#0A192F]"
                />
                <div className="flex justify-between text-[10px] text-[#747D88] mt-1 font-mono">
                  <span>10% ($1.2M)</span>
                  <span>25% Standard Jumbo</span>
                  <span>50%</span>
                </div>
              </div>

              {/* Loan Term & Interest Rate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.14em] text-[#545B65] mb-1.5 font-medium">
                    Financing Term
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setLoanTerm(30)}
                      className={`py-2 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all ${
                        loanTerm === 30
                          ? "bg-[#0A192F] border-[#0A192F] text-white shadow-xs"
                          : "bg-[#F3EFEA] border-[#E4DCD0] text-[#545B65] hover:text-[#0A192F]"
                      }`}
                    >
                      30-Year
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoanTerm(15)}
                      className={`py-2 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all ${
                        loanTerm === 15
                          ? "bg-[#0A192F] border-[#0A192F] text-white shadow-xs"
                          : "bg-[#F3EFEA] border-[#E4DCD0] text-[#545B65] hover:text-[#0A192F]"
                      }`}
                    >
                      15-Year
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.14em] text-[#545B65] mb-1.5 font-medium">
                    <span>Interest Rate</span>
                    <span className="text-[#0A192F] font-mono font-bold text-xs">{interestRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="4.0"
                    max="9.0"
                    step="0.125"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#EAE3D9] rounded-lg appearance-none cursor-pointer accent-[#0A192F]"
                  />
                  <div className="flex justify-between text-[10px] text-[#747D88] mt-1 font-mono">
                    <span>4.0%</span>
                    <span>6.25% Current</span>
                    <span>9.0%</span>
                  </div>
                </div>
              </div>

              {/* Property Tax & HOA inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.14em] text-[#545B65] mb-1 font-medium">
                    Tax Rate: {propertyTaxRate}% (${monthlyPropertyTax.toLocaleString("en-US")}/mo)
                  </label>
                  <input
                    type="range"
                    min="0.6"
                    max="2.5"
                    step="0.05"
                    value={propertyTaxRate}
                    onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#EAE3D9] rounded-lg appearance-none cursor-pointer accent-[#0A192F]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.14em] text-[#545B65] mb-1 font-medium">
                    Monthly HOA & Dues
                  </label>
                  <input
                    type="number"
                    value={hoaMonthly}
                    onChange={(e) => setHoaMonthly(Number(e.target.value))}
                    className="w-full bg-[#FAF8F5] border border-[#E4DCD0] rounded-xl px-3 py-1.5 text-xs text-[#1A1D20] font-mono focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>
            </div>

            {/* Visual Minimalist Breakdown & Total Display in Deep Navy */}
            <div className="lg:col-span-5 bg-[#0A192F] text-white border border-[#060D18] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold block mb-1">
                  Estimated Total Outlay
                </span>
                <div className="text-3xl font-serif text-[#EADDC9] font-semibold tracking-tight mb-5">
                  ${totalMonthlyPayment.toLocaleString("en-US")}
                  <span className="text-xs font-sans font-normal text-[#A8B2C1] ml-1">/ month</span>
                </div>

                {/* Segmented bar in champagne gold & complementary tones */}
                <div className="w-full h-2 rounded-full bg-white/10 flex overflow-hidden mb-5">
                  <div style={{ width: `${piShare}%` }} className="bg-[#C5A880]" title="Principal & Interest" />
                  <div style={{ width: `${taxShare}%` }} className="bg-[#EADDC9]" title="Property Tax" />
                  <div style={{ width: `${insShare}%` }} className="bg-[#9B7E48]" title="Insurance" />
                  <div style={{ width: `${hoaShare}%` }} className="bg-white/40" title="HOA Dues" />
                </div>

                {/* Breakdown items */}
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[#EAE3D9]">
                      <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
                      Principal & Interest ({loanTerm}yr)
                    </span>
                    <span className="font-mono text-white font-medium">
                      ${Math.round(monthlyPI).toLocaleString("en-US")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[#EAE3D9]">
                      <span className="w-2 h-2 rounded-full bg-[#EADDC9]" />
                      Property Taxes (Escrow)
                    </span>
                    <span className="font-mono text-white font-medium">
                      ${monthlyPropertyTax.toLocaleString("en-US")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[#EAE3D9]">
                      <span className="w-2 h-2 rounded-full bg-[#9B7E48]" />
                      Hazard Insurance
                    </span>
                    <span className="font-mono text-white font-medium">
                      ${monthlyInsurance.toLocaleString("en-US")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[#EAE3D9]">
                      <span className="w-2 h-2 rounded-full bg-white/40" />
                      HOA & Reserve
                    </span>
                    <span className="font-mono text-white font-medium">
                      ${hoaMonthly.toLocaleString("en-US")}
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 text-[11px] text-[#A8B2C1] space-y-1">
                  <div className="flex justify-between">
                    <span>Financed Principal:</span>
                    <span className="font-mono text-white">${loanAmount.toLocaleString("en-US")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Cash to Close:</span>
                    <span className="font-mono text-[#C5A880] font-semibold">${downPaymentAmount.toLocaleString("en-US")}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3">
                <button
                  onClick={onOpenSchedule}
                  className="w-full py-2.5 rounded-xl bg-[#C5A880] hover:bg-[#D8BD99] text-[#0A192F] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
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
