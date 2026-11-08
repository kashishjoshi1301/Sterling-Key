"use client";

import React from "react";
import { 
  ShieldCheck, 
  TrendingUp, 
  Key, 
  Wrench, 
  FileText, 
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function PropertyManagementSection({ onOpenPortal, onOpenSchedule }) {
  return (
    <section id="property-management" className="py-16 sm:py-24 bg-[#FAF8F5] text-[#1A1D20] relative border-b border-[#E4DCD0]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.24em] bg-white border border-[#E4DCD0] text-[#0A192F] mb-3 shadow-2xs">
            <Key className="w-3.5 h-3.5 text-[#C5A880]" /> Greystar-Caliber Asset Care
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#0A192F] mb-3">
            Institutional Property Management
          </h2>
          <p className="text-[#545B65] text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Bridging institutional enterprise systems with Mayfair private hospitality. Managing single trophy estates and multi-family portfolios with zero operational friction.
          </p>
        </div>

        {/* 4 Core Pillars Grid with Smooth Lift */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          <div className="luxury-card-hover p-6 rounded-2xl bg-white border border-[#E4DCD0] shadow-2xs transition-all group">
            <div className="w-11 h-11 rounded-xl bg-[#F3EFEA] border border-[#E4DCD0] flex items-center justify-center text-[#C5A880] mb-4 group-hover:scale-110 group-hover:bg-[#0A192F] group-hover:text-[#FAF8F5] transition-all duration-300">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif text-[#0A192F] font-semibold mb-1.5 group-hover:text-[#183664] transition-colors">
              Yield Optimization
            </h3>
            <p className="text-xs text-[#545B65] leading-relaxed">
              Proprietary dynamic pricing algorithms calibrate rental rates to micro-market demand, delivering an average 14% higher Net Operating Income.
            </p>
          </div>

          <div className="luxury-card-hover p-6 rounded-2xl bg-white border border-[#E4DCD0] shadow-2xs transition-all group">
            <div className="w-11 h-11 rounded-xl bg-[#F3EFEA] border border-[#E4DCD0] flex items-center justify-center text-[#C5A880] mb-4 group-hover:scale-110 group-hover:bg-[#0A192F] group-hover:text-[#FAF8F5] transition-all duration-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif text-[#0A192F] font-semibold mb-1.5 group-hover:text-[#183664] transition-colors">
              Tenant Curation
            </h3>
            <p className="text-xs text-[#545B65] leading-relaxed">
              Stringent biometric, institutional credit, and sovereign reference vetting. 0.2% historical default rate across our global portfolio.
            </p>
          </div>

          <div className="luxury-card-hover p-6 rounded-2xl bg-white border border-[#E4DCD0] shadow-2xs transition-all group">
            <div className="w-11 h-11 rounded-xl bg-[#F3EFEA] border border-[#E4DCD0] flex items-center justify-center text-[#C5A880] mb-4 group-hover:scale-110 group-hover:bg-[#0A192F] group-hover:text-[#FAF8F5] transition-all duration-300">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif text-[#0A192F] font-semibold mb-1.5 group-hover:text-[#183664] transition-colors">
              Concierge Dispatch
            </h3>
            <p className="text-xs text-[#545B65] leading-relaxed">
              Zero retail markups on maintenance. We leverage enterprise master vendor contracts and conduct quarterly drone & thermal envelope audits.
            </p>
          </div>

          <div className="luxury-card-hover p-6 rounded-2xl bg-white border border-[#E4DCD0] shadow-2xs transition-all group">
            <div className="w-11 h-11 rounded-xl bg-[#F3EFEA] border border-[#E4DCD0] flex items-center justify-center text-[#C5A880] mb-4 group-hover:scale-110 group-hover:bg-[#0A192F] group-hover:text-[#FAF8F5] transition-all duration-300">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif text-[#0A192F] font-semibold mb-1.5 group-hover:text-[#183664] transition-colors">
              Automated Distributions
            </h3>
            <p className="text-xs text-[#545B65] leading-relaxed">
              Direct ACH deposits disbursed by the 5th of each month. Live access to GAAP-audited cash flow statements and quarterly tax packages.
            </p>
          </div>
        </div>

        {/* Streamlined Institutional Performance Banner */}
        <div className="bg-white border border-[#E4DCD0] rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden transition-all duration-500 hover:shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" /> Portfolio Results
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#0A192F] font-semibold mb-3">
                Institutional Stewardship with Private Boutique Service
              </h3>
              <p className="text-[#545B65] text-xs sm:text-sm leading-relaxed mb-6">
                Whether overseeing a flagship Bel-Air estate or a 40-unit Mayfair residential portfolio, our asset managers treat your capital as sovereign preservation.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenSchedule}
                  className="btn-shimmer py-3 px-5 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <span>Request Asset Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                </button>
                <button
                  onClick={onOpenPortal}
                  className="py-3 px-5 rounded-xl bg-[#F3EFEA] hover:bg-[#EAE3D9] border border-[#E4DCD0] text-[#0A192F] text-xs font-semibold uppercase tracking-wider transition-all duration-300"
                >
                  Owner Portal Login
                </button>
              </div>
            </div>

            {/* Right Metrics Grid */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="luxury-card-hover p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E4DCD0]">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#0A192F] mb-1">
                  +14<span className="text-[#C5A880]">%</span>
                </div>
                <div className="text-xs font-semibold text-[#1A1D20] mb-0.5">Average NOI Uplift</div>
                <p className="text-[11px] text-[#747D88]">Through algorithmic dynamic pricing & vendor discounts</p>
              </div>

              <div className="luxury-card-hover p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E4DCD0]">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#0A192F] mb-1">
                  99.4<span className="text-[#C5A880]">%</span>
                </div>
                <div className="text-xs font-semibold text-[#1A1D20] mb-0.5">Historical Occupancy</div>
                <p className="text-[11px] text-[#747D88]">Pre-qualified sovereign & institutional tenant pipelines</p>
              </div>

              <div className="luxury-card-hover p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E4DCD0]">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#0A192F] mb-1">
                  0.2<span className="text-[#C5A880]">%</span>
                </div>
                <div className="text-xs font-semibold text-[#1A1D20] mb-0.5">Default Rate</div>
                <p className="text-[11px] text-[#747D88]">Biometric vetting & corporate balance sheet security</p>
              </div>

              <div className="luxury-card-hover p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E4DCD0]">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#0A192F] mb-1">
                  By the 5th
                </div>
                <div className="text-xs font-semibold text-[#1A1D20] mb-0.5">Direct ACH Payouts</div>
                <p className="text-[11px] text-[#747D88]">Automated distribution with live GAAP audit trail</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
