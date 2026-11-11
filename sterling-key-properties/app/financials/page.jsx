"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinancialSuite from "@/components/FinancialSuite";
import EstateValuationTool from "@/components/EstateValuationTool";
import MortgageCalculator from "@/components/MortgageCalculator";
import ConciergeChatWidget from "@/components/ConciergeChatWidget";
import ScheduleModal from "@/components/ScheduleModal";
import PortalModal from "@/components/PortalModal";
import { ArrowLeft, TrendingUp, Calculator, ShieldCheck } from "lucide-react";
import { PROPERTIES_DATA } from "@/data/mockData";

export default function FinancialsPage() {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1D20] flex flex-col font-sans selection:bg-[#C5A880]/30 selection:text-[#0A192F]">
      <Navbar
        onOpenPortal={() => setPortalOpen(true)}
        onOpenSchedule={() => setScheduleModalOpen(true)}
      />

      <main className="flex-1 w-full py-10 sm:py-16">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#545B65] hover:text-[#0A192F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C5A880]" />
            <span>Return to Global Overview</span>
          </Link>
        </div>

        {/* Embedded Financial Suite Component */}
        <FinancialSuite onOpenSchedule={() => setScheduleModalOpen(true)} />

        {/* Full Interactive Valuation & Amortization Suite */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-12 space-y-12">
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E4DCD0] shadow-sm">
            <div className="max-w-3xl mb-8">
              <span className="text-xs uppercase font-mono tracking-widest text-[#C5A880] font-bold block mb-1">
                Automated Portfolio Intelligence
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#0A192F] font-bold">
                Jumbo Capital Financing & Amortization
              </h2>
              <p className="text-sm sm:text-base text-[#545B65] mt-2">
                Simulate debt leverage, blended sovereign interest rates, and multi-currency debt structuring for trophy residential investments.
              </p>
            </div>
            <MortgageCalculator initialPrice={38500000} />
          </div>

          <EstateValuationTool />
        </div>
      </main>

      <Footer
        onOpenPortal={() => setPortalOpen(true)}
        onOpenSchedule={() => setScheduleModalOpen(true)}
      />

      {scheduleModalOpen && (
        <ScheduleModal
          property={PROPERTIES_DATA[0]}
          onClose={() => setScheduleModalOpen(false)}
        />
      )}

      {portalOpen && (
        <PortalModal onClose={() => setPortalOpen(false)} />
      )}

      <ConciergeChatWidget />
    </div>
  );
}
