"use client";

import React, { useState } from "react";
import { 
  Calculator, 
  TrendingUp, 
  ArrowRight, 
  Landmark, 
  Sliders, 
  CheckCircle2 
} from "lucide-react";
import { useCurrency } from "./CurrencyContext";
import { useToast } from "./Toast";

export default function FinancialSuite({ onOpenSchedule }) {
  const { formatRawPrice } = useCurrency();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("valuation"); // "valuation" | "mortgage"

  // Valuation State
  const [market, setMarket] = useState("los-angeles");
  const [propertyType, setPropertyType] = useState("compound");
  const [sqft, setSqft] = useState(8500);
  const [condition, setCondition] = useState("museum");

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

  // Mortgage State
  const [homePrice, setHomePrice] = useState(12500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [interestRate, setInterestRate] = useState(6.25);
  const [loanTerm, setLoanTerm] = useState(30);

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

  const monthlyPropertyTax = Math.round((homePrice * 0.0115) / 12);
  const monthlyInsurance = Math.round(24000 / 12);
  const totalMonthlyPayment = Math.round(monthlyPI + monthlyPropertyTax + monthlyInsurance);

  return (
    <section id="financials" className="py-16 sm:py-20 bg-[#FAF8F5] border-b border-[#E4DCD0] relative">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.24em] bg-white border border-[#E4DCD0] text-[#0A192F] mb-3 shadow-2xs">
            <Calculator className="w-3.5 h-3.5 text-[#C5A880]" /> Advisory Intelligence Suite
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#0A192F] mb-3">
            Financial & Valuation Intelligence
          </h2>
          <p className="text-[#545B65] text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Algorithmic micro-market valuation models and private jumbo financing estimators unified into one executive advisory dashboard.
          </p>

          {/* Tab Selector */}
          <div className="inline-flex p-1 rounded-2xl bg-white border border-[#E4DCD0] mt-6 shadow-2xs">
            <button
              onClick={() => setActiveTab("valuation")}
              className={`px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === "valuation"
                  ? "bg-[#0A192F] text-[#FAF8F5] shadow-xs"
                  : "text-[#545B65] hover:text-[#0A192F]"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Estate Valuation (AVM)</span>
            </button>
            <button
              onClick={() => setActiveTab("mortgage")}
              className={`px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === "mortgage"
                  ? "bg-[#0A192F] text-[#FAF8F5] shadow-xs"
                  : "text-[#545B65] hover:text-[#0A192F]"
              }`}
            >
              <Landmark className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Jumbo Financing</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Valuation Content */}
        {activeTab === "valuation" && (
          <div className="bg-white border border-[#E4DCD0] rounded-3xl p-6 sm:p-10 shadow-sm animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Inputs */}
              <div className="lg:col-span-7 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.14em] text-[#545B65] mb-1.5 font-medium">
                      Flagship Market
                    </label>
                    <select
                      value={market}
                      onChange={(e) => setMarket(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E4DCD0] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1D20] font-medium focus:outline-none focus:border-[#C5A880] cursor-pointer [&>option]:bg-white"
                    >
                      <option value="los-angeles">Los Angeles (Bel-Air / Beverly Hills)</option>
                      <option value="new-york">New York (Manhattan / Tribeca)</option>
                      <option value="miami">Miami Beach & Coastal Islands</option>
                      <option value="london">London (Mayfair / Belgravia)</option>
                      <option value="aspen">Aspen & Red Mountain</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.14em] text-[#545B65] mb-1.5 font-medium">
                      Typology
                    </label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E4DCD0] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1D20] font-medium focus:outline-none focus:border-[#C5A880] cursor-pointer [&>option]:bg-white"
                    >
                      <option value="compound">Private Gated Estate</option>
                      <option value="penthouse">Full-Floor Sky Penthouse</option>
                      <option value="waterfront">Deepwater Coastal Residence</option>
                      <option value="townhouse">Historic Heritage Townhouse</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-[#383E46] font-medium">Interior Living Area</span>
                    <span className="text-[#0A192F] font-mono font-bold text-sm">
                      {sqft.toLocaleString()} SF
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3000"
                    max="35000"
                    step="500"
                    value={sqft}
                    onChange={(e) => setSqft(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#EAE3D9] rounded-lg appearance-none cursor-pointer accent-[#0A192F]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.14em] text-[#545B65] mb-1.5 font-medium">
                    Architectural Condition
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "museum", label: "Museum Grade" },
                      { id: "contemporary", label: "Turnkey Modern" },
                      { id: "renovation", label: "Value-Add" }
                    ].map((cond) => (
                      <button
                        key={cond.id}
                        type="button"
                        onClick={() => setCondition(cond.id)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                          condition === cond.id
                            ? "bg-[#0A192F] text-white border-[#0A192F]"
                            : "bg-[#FAF8F5] text-[#545B65] border-[#E4DCD0] hover:border-[#C5A880]"
                        }`}
                      >
                        {cond.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Output Card */}
              <div className="lg:col-span-5 bg-[#FAF8F5] border border-[#E4DCD0] rounded-2xl p-6 sm:p-7">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold mb-1">
                  Estimated Valuation Range
                </div>
                <div className="text-2xl sm:text-3xl font-serif text-[#0A192F] font-bold mb-1">
                  ${(estimatedLow / 1000000).toFixed(1)}M – ${(estimatedHigh / 1000000).toFixed(1)}M
                </div>
                <div className="text-xs text-[#747D88] mb-6">
                  ~${Math.round(basePpsf).toLocaleString()} / SF micro-market baseline
                </div>

                <div className="space-y-3 pt-4 border-t border-[#E4DCD0] text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#545B65]">Projected Monthly Lease</span>
                    <span className="text-[#0A192F] font-semibold font-mono">
                      ${estimatedRentMonthly.toLocaleString()} / mo
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#545B65]">Estimated Net Operating Income</span>
                    <span className="text-[#0A192F] font-semibold font-mono">
                      ${estimatedNOIAnnual.toLocaleString()} / yr
                    </span>
                  </div>
                </div>

                <button
                  onClick={onOpenSchedule}
                  className="w-full mt-6 py-2.5 px-4 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <span>Request Full Appraisal Report</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Mortgage Content */}
        {activeTab === "mortgage" && (
          <div className="bg-white border border-[#E4DCD0] rounded-3xl p-6 sm:p-10 shadow-sm animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Sliders */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-[#383E46] font-medium">Acquisition Target Price</span>
                    <span className="text-[#0A192F] font-mono font-bold text-sm">
                      ${homePrice.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2000000"
                    max="60000000"
                    step="500000"
                    value={homePrice}
                    onChange={(e) => setHomePrice(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#EAE3D9] rounded-lg appearance-none cursor-pointer accent-[#0A192F]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-[#383E46] font-medium">Down Payment ({downPaymentPercent}%)</span>
                    <span className="text-[#0A192F] font-mono font-bold text-sm">
                      ${downPaymentAmount.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="50"
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#EAE3D9] rounded-lg appearance-none cursor-pointer accent-[#0A192F]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.14em] text-[#545B65] mb-1.5 font-medium">
                      Interest Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full bg-[#FAF8F5] border border-[#E4DCD0] rounded-xl px-3.5 py-2 text-xs text-[#1A1D20] font-mono font-medium focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.14em] text-[#545B65] mb-1.5 font-medium">
                      Loan Term
                    </label>
                    <select
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="w-full bg-[#FAF8F5] border border-[#E4DCD0] rounded-xl px-3.5 py-2 text-xs text-[#1A1D20] font-medium focus:outline-none focus:border-[#C5A880] cursor-pointer [&>option]:bg-white"
                    >
                      <option value="30">30 Years Fixed</option>
                      <option value="15">15 Years Fixed</option>
                      <option value="10">10-Year ARM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Output Card */}
              <div className="lg:col-span-5 bg-[#FAF8F5] border border-[#E4DCD0] rounded-2xl p-6 sm:p-7">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold mb-1">
                  Total Estimated Outlay
                </div>
                <div className="text-2xl sm:text-3xl font-serif text-[#0A192F] font-bold mb-1">
                  ${totalMonthlyPayment.toLocaleString()}<span className="text-xs text-[#747D88] font-sans font-normal"> / month</span>
                </div>
                <div className="text-xs text-[#747D88] mb-6">
                  Financed Loan Balance: ${loanAmount.toLocaleString()}
                </div>

                <div className="space-y-3 pt-4 border-t border-[#E4DCD0] text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#545B65]">Principal & Interest</span>
                    <span className="text-[#0A192F] font-semibold font-mono">
                      ${Math.round(monthlyPI).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#545B65]">Property Taxes (Est.)</span>
                    <span className="text-[#0A192F] font-semibold font-mono">
                      ${monthlyPropertyTax.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#545B65]">Hazard & Flood Insurance</span>
                    <span className="text-[#0A192F] font-semibold font-mono">
                      ${monthlyInsurance.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onOpenSchedule}
                  className="w-full mt-6 py-2.5 px-4 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <span>Connect with Private Lending Desk</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}