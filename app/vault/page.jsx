"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SovereignVault from "@/components/SovereignVault";
import ConciergeChatWidget from "@/components/ConciergeChatWidget";
import ScheduleModal from "@/components/ScheduleModal";
import PortalModal from "@/components/PortalModal";
import { Lock, ShieldAlert, KeyRound, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PROPERTIES_DATA } from "@/data/mockData";

export default function VaultPage() {
  const [scheduleProperty, setScheduleProperty] = useState(null);
  const [portalOpen, setPortalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1D20] flex flex-col font-sans selection:bg-[#C5A880]/30 selection:text-[#0A192F]">
      <Navbar
        onOpenPortal={() => setPortalOpen(true)}
        onOpenSchedule={() => setScheduleProperty(PROPERTIES_DATA[0])}
      />

      <main className="flex-1 w-full py-10 sm:py-16">
        {/* Header Breadcrumb */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#545B65] hover:text-[#0A192F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C5A880]" />
            <span>Return to Global Overview</span>
          </Link>
        </div>

        {/* Embedded Sovereign Vault Component with Full Keycode Unlock Protocol */}
        <SovereignVault onScheduleTour={(item) => setScheduleProperty(item)} />
      </main>

      <Footer
        onOpenPortal={() => setPortalOpen(true)}
        onOpenSchedule={() => setScheduleProperty(PROPERTIES_DATA[0])}
      />

      {scheduleProperty && (
        <ScheduleModal
          property={scheduleProperty}
          onClose={() => setScheduleProperty(null)}
        />
      )}

      {portalOpen && (
        <PortalModal onClose={() => setPortalOpen(false)} />
      )}

      <ConciergeChatWidget />
    </div>
  );
}
