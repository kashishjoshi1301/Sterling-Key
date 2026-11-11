"use client";

import React from "react";
import { X, TrendingUp, ShieldCheck, MapPin, Clock, ArrowRight } from "lucide-react";
import { useScrollLock } from "./useScrollLock";

export default function StatCardModal({ statType, onClose, onScheduleTour }) {
  useScrollLock(!!statType, onClose);

  if (!statType) return null;

  const statDetails = {
    volume: {
      badge: "Institutional Audit 2026",
      title: "$5.2B+ Volume Closed & Under Management",
      icon: TrendingUp,
      subtitle: "Capital allocation and sovereign transaction volume certified by institutional audits.",
      metrics: [
        { label: "Private Estates & Compounds", value: "$2.18B (42%)" },
        { label: "Full-Floor Penthouses", value: "$1.97B (38%)" },
        { label: "Coastal & Waterfront Enclaves", value: "$1.05B (20%)" },
        { label: "Average Transaction Size", value: "$24,800,000" }
      ],
      description: "Representing private family trusts, sovereign funds, and high-net-worth acquisitions across the United States, United Kingdom, and the Caribbean. Our hybrid brokerage and property management model safeguards and compounds equity across generational horizons."
    },
    occupancy: {
      badge: "Greystar Certified Systems",
      title: "99.4% Historical Portfolio Occupancy",
      icon: ShieldCheck,
      subtitle: "Industry-leading tenant curation and retention standard across managed assets.",
      metrics: [
        { label: "Average Lease Tenancy", value: "28.4 Months" },
        { label: "Biometric & Credit Verification", value: "0.2% Default Rate" },
        { label: "Renewal Retention Rate", value: "89.2% Year-Over-Year" },
        { label: "Maintenance Downtime", value: "Zero Unplanned Days" }
      ],
      description: "By pairing Greystar institutional rigor with Mayfair white-glove resident hospitality, Sterling Key assets experience virtually zero turnover friction and command top-percentile rental rates."
    },
    offices: {
      badge: "Global Footprint",
      title: "14 Global Flagship Advisory Chambers",
      icon: MapPin,
      subtitle: "Private offices located in the world's most resilient capital preservation havens.",
      metrics: [
        { label: "Americas Hubs", value: "Manhattan · Beverly Hills · Miami · Aspen · Palm Beach" },
        { label: "EMEA Chambers", value: "London Mayfair · Zurich · Paris · Geneva · Monaco" },
        { label: "APAC & Middle East", value: "Dubai DIFC · Singapore · Tokyo · Sydney" },
        { label: "Private Advisors", value: "120+ Licensed Luxury Partners" }
      ],
      description: "Each flagship chamber is situated in premier financial and cultural epicenters, providing direct client advisory, off-market pocket deal flow, and seamless cross-border conveyance."
    },
    placement: {
      badge: "Algorithmic Placement Engine",
      title: "18 Days Average Qualified Placement",
      icon: Clock,
      subtitle: "Proprietary high-net-worth network linking verified tenants to landmark properties.",
      metrics: [
        { label: "Pre-Vetted Sovereign Roster", value: "14,000+ Family Offices" },
        { label: "Average Escrow Turnaround", value: "72 Hours" },
        { label: "Direct Trade Repairs Markup", value: "0% (Wholesale Invoicing)" },
        { label: "Automated ACH Disbursal", value: "Guaranteed by 5th of Month" }
      ],
      description: "Our algorithmic dynamic pricing engine tests micro-market rental demand in real time, matching estates with vetted executives, diplomatic corps, and luxury tenants in record turnaround."
    }
  };

  const current = statDetails[statType] || statDetails.volume;
  const IconComponent = current.icon;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 transition-all duration-700 ease-out animate-fade-in text-[#1A1D20]"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl xl:max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FAF8F5] border border-[#E4DCD0] rounded-2xl p-5 sm:p-7 shadow-2xl my-auto transition-all duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#F3EFEA] hover:bg-[#EAE3D9] text-[#545B65] hover:text-[#0A192F] transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#0A192F] border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880] shadow-sm">
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C5A880] block">
              {current.badge}
            </span>
            <h3 className="text-xl sm:text-2xl font-serif text-[#0A192F] font-semibold">
              {current.title}
            </h3>
          </div>
        </div>

        <p className="text-xs text-[#545B65] leading-relaxed mb-6">
          {current.subtitle}
        </p>

        {/* 4 Metric Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {current.metrics.map((m, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-white border border-[#E4DCD0] shadow-2xs">
              <span className="text-[10px] text-[#747D88] uppercase tracking-wider block mb-1 font-semibold">
                {m.label}
              </span>
              <span className="text-sm font-serif font-bold text-[#0A192F]">
                {m.value}
              </span>
            </div>
          ))}
        </div>

        <p className="text-xs text-[#383E46] leading-relaxed p-4 rounded-2xl bg-white border border-[#E4DCD0] mb-6 shadow-2xs">
          {current.description}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl bg-[#F3EFEA] hover:bg-[#EAE3D9] text-[#0A192F] text-xs font-semibold uppercase tracking-wider transition-colors border border-[#E4DCD0]"
          >
            Close Overview
          </button>
          <button
            onClick={() => {
              onClose();
              if (onScheduleTour) onScheduleTour({ title: `Institutional Consultation (${current.badge})` });
            }}
            className="py-2.5 px-5 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
          >
            <span>Request Institutional Briefing</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
          </button>
        </div>
      </div>
    </div>
  );
}
