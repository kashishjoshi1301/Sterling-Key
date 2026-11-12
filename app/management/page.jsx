"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyManagementSection from "@/components/PropertyManagementSection";
import ConciergeChatWidget from "@/components/ConciergeChatWidget";
import ScheduleModal from "@/components/ScheduleModal";
import PortalModal from "@/components/PortalModal";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { PROPERTIES_DATA } from "@/data/mockData";

export default function ManagementPage() {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1D20] flex flex-col font-sans selection:bg-[#C5A880]/30 selection:text-[#0A192F]">
      <Navbar
        onOpenPortal={() => setPortalOpen(true)}
        onOpenSchedule={() => setScheduleModalOpen(true)}
      />

      <main className="flex-1 w-full pt-3 pb-12 sm:pt-5 sm:pb-16">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 mb-3 sm:mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#545B65] hover:text-[#0A192F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C5A880]" />
            <span>Return to Global Overview</span>
          </Link>
        </div>

        {/* Dedicated Property Management Section */}
        <PropertyManagementSection onOpenSchedule={() => setScheduleModalOpen(true)} isStandalone={true} />
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
