"use client";

import React, { useState } from "react";
import { 
  Calculator, 
  TrendingUp, 
  ArrowRight, 
  Landmark, 
  Sliders, 
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { useCurrency } from "./CurrencyContext";
import { useToast } from "./Toast";

export default function FinancialSuite({ onOpenSchedule, isStandalone = false }) {
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
    <section 
      id="financials" 
      className={`${isStandalone ? "pt-2 sm:pt-4 pb-12 sm:pb-20" : "py-16 sm:py-24"} bg-[#FAF8F5] border-b border-[#E4DCD0] relative`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto ${isStandalone ? "mb-6 sm:mb-8" : "mb-10 sm:mb-14"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.24em] bg-white border border-[#E4DCD0] text-[#0A192F] mb-3 shadow-2xs">
            <Calculator className="w-3.5 h-3.5 text-[#C5A880]" /> Advisory Intelligence Suite
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#0A192F] mb-3">
            Financial & Valuation Intelligence
          </h2>
          <p className="text-[#545B65] text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Algorithmic micro-market valuation models and private jumbo financing estimators unified into one executive advisory dashboard.
          </p>

          {/* Luxury Tab Selector with Sliding Pill */}
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-[#E4DCD0] mt-6 shadow-xs">
            <button
              onClick={() => setActiveTab("valuation")}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                activeTab === "valuation"
                  ? "bg-[#0A192F] text-[#FAF8F5] shadow-sm scale-[1.02]"
                  : "text-[#545B65] hover:text-[#0A192F] hover:bg-[#F3EFEA]"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Estate Valuation (AVM)</span>
            </button>
            <button
              onClick={() => setActiveTab("mortgage")}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                activeTab === "mortgage"
                  ? "bg-[#0A192F] text-[#FAF8F5] shadow-sm scale-[1.02]"
                  : "text-[#545B65] hover:text-[#0A192F] hover:bg-[#F3EFEA]"
              }`}
            >
              <Landmark className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Jumbo Financing</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Valuation Content */}
        {activeTab === "valuation" && (
          <div className="bg-white border border-[#E4DCD0] rounded-3xl p-6 sm:p-10 shadow-sm animate-fade-in transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Inputs */}
              <div className="lg:col-span-7 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.14em] text-[#545B65] mb-1.5 font-semibold">
                      Flagship Market
                    </label>
                    <select
                      value={market}
                      onChange={(e) => setMarket(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E4DCD0] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1D20] font-medium focus:outline-none focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 transition-all cursor-pointer [&>option]:bg-white"
                    >
                      <option value="los-angeles">Los Angeles (Bel-Air / Beverly Hills)</option>
                      <option value="new-york">New York (Manhattan / Tribeca)</option>
                      <option value="miami">Miami Beach & Coastal Islands</option>
                      <option value="london">London (Mayfair / Belgravia)</option>
                      <option value="aspen">Aspen & Red Mountain</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.14em] text-[#545B65] mb-1.5 font-semibold">
                      Typology
                    </label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E4DCD0] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1D20] font-medium focus:outline-none focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 transition-all cursor-pointer [&>option]:bg-white"
                    >
                      <option value="compound">Private Gated Estate</option>
                      <option value="penthouse">Full-Floor Sky Penthouse</option>
                      <option value="waterfront">Deepwater Coastal Residence</option>
                      <option value="townhouse">Historic Heritage Townhouse</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-[#383E46] font-semibold">Interior Living Area</span>
                    <span className="text-[#0A192F] font-mono font-bold text-sm bg-[#FAF8F5] px-2.5 py-0.5 rounded-lg border border-[#E4DCD0]">
                      {sqft.toLocaleString("en-US")} SF
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3000"
                    max="35000"
                    step="500"
                    value={sqft}
                    onChange={(e) => setSqft(Number(e.target.value))}
                    className="w-full h-2 bg-[#EAE3D9] rounded-lg appearance-none cursor-pointer accent-[#0A192F] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.14em] text-[#545B65] mb-2 font-semibold">
                    Architectural Condition
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: "museum", label: "Museum Grade" },
                      { id: "contemporary", label: "Turnkey Modern" },
                      { id: "renovation", label: "Value-Add" }
                    ].map((cond) => (
                      <button
                        key={cond.id}
                        type="button"
                        onClick={() => setCondition(cond.id)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-semibold border text-center transition-all duration-300 ${
                          condition === cond.id
                            ? "bg-[#0A192F] text-white border-[#0A192F] shadow-sm scale-[1.02]"
                            : "bg-[#FAF8F5] text-[#545B65] border-[#E4DCD0] hover:border-[#C5A880] hover:text-[#0A192F]"
                        }`}
                      >
                        {cond.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Output Card with Luxury Depth */}
              <div className="lg:col-span-5 bg-[#FAF8F5] border border-[#E4DCD0] rounded-2xl p-6 sm:p-8 shadow-xs">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" /> Estimated Valuation Range
                </div>
                <div className="text-3xl sm:text-4xl font-serif text-[#0A192F] font-bold mb-1 tracking-tight">
                  ${(estimatedLow / 1000000).toFixed(1)}M – ${(estimatedHigh / 1000000).toFixed(1)}M
                </div>
                <div className="text-xs text-[#747D88] mb-6">
                  ~${Math.round(basePpsf).toLocaleString("en-US")} / SF micro-market baseline
                </div>

                <div className="space-y-3 pt-5 border-t border-[#E4DCD0] text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[#545B65]">Projected Monthly Lease</span>
                    <span className="text-[#0A192F] font-semibold font-mono text-sm">
                      ${estimatedRentMonthly.toLocaleString("en-US")} / mo
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#545B65]">Estimated Net Operating Income</span>
                    <span className="text-[#0A192F] font-semibold font-mono text-sm">
                      ${estimatedNOIAnnual.toLocaleString("en-US")} / yr
                    </span>
                  </div>
                </div>

                <button
                  onClick={onOpenSchedule}
                  className="btn-shimmer w-full mt-6 py-3 px-4 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
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
          <div className="bg-white border border-[#E4DCD0] rounded-3xl p-6 sm:p-10 shadow-sm animate-fade-in transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Sliders */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-[#383E46] font-semibold">Acquisition Target Price</span>
                    <span className="text-[#0A192F] font-mono font-bold text-sm bg-[#FAF8F5] px-2.5 py-0.5 rounded-lg border border-[#E4DCD0]">
                      ${homePrice.toLocaleString("en-US")}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2000000"
                    max="60000000"
                    step="500000"
                    value={homePrice}
                    onChange={(e) => setHomePrice(Number(e.target.value))}
                    className="w-full h-2 bg-[#EAE3D9] rounded-lg appearance-none cursor-pointer accent-[#0A192F] transition-all"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-[#383E46] font-semibold">Down Payment ({downPaymentPercent}%)</span>
                    <span className="text-[#0A192F] font-mono font-bold text-sm bg-[#FAF8F5] px-2.5 py-0.5 rounded-lg border border-[#E4DCD0]">
                      ${downPaymentAmount.toLocaleString("en-US")}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="50"
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full h-2 bg-[#EAE3D9] rounded-lg appearance-none cursor-pointer accent-[#0A192F] transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.14em] text-[#545B65] mb-1.5 font-semibold">
                      Interest Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full bg-[#FAF8F5] border border-[#E4DCD0] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1D20] font-mono font-medium focus:outline-none focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.14em] text-[#545B65] mb-1.5 font-semibold">
                      Loan Term
                    </label>
                    <select
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="w-full bg-[#FAF8F5] border border-[#E4DCD0] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1D20] font-medium focus:outline-none focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 transition-all cursor-pointer [&>option]:bg-white"
                    >
                      <option value="30">30 Years Fixed</option>
                      <option value="15">15 Years Fixed</option>
                      <option value="10">10-Year ARM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Output Card */}
              <div className="lg:col-span-5 bg-[#FAF8F5] border border-[#E4DCD0] rounded-2xl p-6 sm:p-8 shadow-xs">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold mb-1 flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-[#C5A880]" /> Total Estimated Outlay
                </div>
                <div className="text-3xl sm:text-4xl font-serif text-[#0A192F] font-bold mb-1 tracking-tight">
                  ${totalMonthlyPayment.toLocaleString("en-US")}<span className="text-xs text-[#747D88] font-sans font-normal"> / month</span>
                </div>
                <div className="text-xs text-[#747D88] mb-6">
                  Financed Loan Balance: ${loanAmount.toLocaleString("en-US")}
                </div>

                <div className="space-y-3 pt-5 border-t border-[#E4DCD0] text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[#545B65]">Principal & Interest</span>
                    <span className="text-[#0A192F] font-semibold font-mono text-sm">
                      ${Math.round(monthlyPI).toLocaleString("en-US")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#545B65]">Property Taxes (Est.)</span>
                    <span className="text-[#0A192F] font-semibold font-mono text-sm">
                      ${monthlyPropertyTax.toLocaleString("en-US")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#545B65]">Hazard & Flood Insurance</span>
                    <span className="text-[#0A192F] font-semibold font-mono text-sm">
                      ${monthlyInsurance.toLocaleString("en-US")}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onOpenSchedule}
                  className="btn-shimmer w-full mt-6 py-3 px-4 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
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
