"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import PropertyListings from "../components/PropertyListings";
import SovereignVault from "../components/SovereignVault";
import PropertyManagementSection from "../components/PropertyManagementSection";
import FinancialSuite from "../components/FinancialSuite";
import DestinationsSection from "../components/DestinationsSection";
import AdvisorySection from "../components/AdvisorySection";
import Footer from "../components/Footer";

import PropertyModal from "../components/PropertyModal";
import PortalModal from "../components/PortalModal";
import ScheduleModal from "../components/ScheduleModal";
import SavedDrawer from "../components/SavedDrawer";
import ComparisonModal from "../components/ComparisonModal";
import ComparisonBar from "../components/ComparisonBar";
import VirtualTourModal from "../components/VirtualTourModal";
import ConciergeChatWidget from "../components/ConciergeChatWidget";
import StatCardModal from "../components/StatCardModal";

import { ToastProvider, useToast } from "../components/Toast";
import { CurrencyProvider } from "../components/CurrencyContext";
import { PROPERTIES_DATA } from "../data/mockData";

function MainContent() {
  const { addToast } = useToast();
  const [properties, setProperties] = useState(PROPERTIES_DATA);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [scheduleTargetProperty, setScheduleTargetProperty] = useState(null);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [savedIds, setSavedIds] = useState([]);

  // Comparison State
  const [compareIds, setCompareIds] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Virtual 360 Tour State
  const [virtualTourTitle, setVirtualTourTitle] = useState(null);

  // Stat Card Modal State
  const [statCardType, setStatCardType] = useState(null);

  const handleToggleSave = (id) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleCompare = (id) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        addToast("You can compare up to 3 properties at a time", "error", "Comparison Limit");
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleScheduleTour = (property) => {
    setScheduleTargetProperty(property);
    setIsScheduleOpen(true);
  };

  const handleOpenGeneralSchedule = () => {
    setScheduleTargetProperty(null);
    setIsScheduleOpen(true);
  };

  const handleSearchSubmit = (filter) => {
    let filtered = [...PROPERTIES_DATA];

    if (filter.tab === "rent") {
      filtered = filtered.filter((p) => p.rentalPrice !== null || p.listingType === "rent");
    } else if (filter.tab === "management") {
      const pmSection = document.getElementById("property-management");
      if (pmSection) pmSection.scrollIntoView({ behavior: "smooth" });
      return;
    } else if (filter.tab === "developments") {
      filtered = filtered.filter((p) => p.category === "New Developments");
    }

    if (filter.location && filter.location.trim() !== "") {
      const q = filter.location.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.city.toLowerCase().includes(q) ||
          p.neighborhood.toLowerCase().includes(q) ||
          p.title.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q)
      );
    }

    if (filter.propertyType && filter.propertyType !== "all") {
      filtered = filtered.filter((p) => p.category === filter.propertyType);
    }

    if (filter.priceRange === "under10") {
      filtered = filtered.filter((p) => p.price < 10000000);
    } else if (filter.priceRange === "10to30") {
      filtered = filtered.filter((p) => p.price >= 10000000 && p.price <= 30000000);
    } else if (filter.priceRange === "30to60") {
      filtered = filtered.filter((p) => p.price > 30000000 && p.price <= 60000000);
    } else if (filter.priceRange === "ultra60") {
      filtered = filtered.filter((p) => p.price > 60000000);
    }

    setProperties(filtered);

    const listingsSection = document.getElementById("featured-listings");
    if (listingsSection) {
      listingsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectCity = (cityName) => {
    const q = cityName.toLowerCase();
    const filtered = PROPERTIES_DATA.filter((p) =>
      p.city.toLowerCase().includes(q) || p.neighborhood.toLowerCase().includes(q)
    );
    setProperties(filtered.length > 0 ? filtered : PROPERTIES_DATA);

    const listingsSection = document.getElementById("featured-listings");
    if (listingsSection) {
      listingsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1D20] flex flex-col font-sans selection:bg-[#C5A880]/30 selection:text-[#0A192F]">
      {/* Navigation Header */}
      <Navbar
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenSchedule={handleOpenGeneralSchedule}
        savedCount={savedIds.length}
        onOpenSaved={() => setIsSavedOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Cinematic Auto-Playing Ken Burns Hero with Continuous Architectural Video */}
        <HeroSection
          onSearchSubmit={handleSearchSubmit}
          onSelectTab={(tab) => {
            if (tab === "management") {
              scrollToId("property-management");
            }
          }}
          onOpenStatModal={(type) => setStatCardType(type)}
        />

        {/* Featured Luxury Portfolio with Grid/Map Switcher */}
        <PropertyListings
          properties={properties}
          onSelectProperty={(prop) => setSelectedProperty(prop)}
          onScheduleTour={handleScheduleTour}
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
          compareIds={compareIds}
          onToggleCompare={handleToggleCompare}
        />

        {/* The Sovereign Vault (Off-Market Pocket Listings with Passcode Lock) */}
        <SovereignVault
          onScheduleTour={handleScheduleTour}
        />

        {/* Greystar-Caliber Institutional Property Management */}
        <PropertyManagementSection
          onOpenPortal={() => setIsPortalOpen(true)}
          onOpenSchedule={handleOpenGeneralSchedule}
        />

        {/* Unified Financial & Valuation Intelligence Suite */}
        <FinancialSuite
          onOpenSchedule={handleOpenGeneralSchedule}
        />

        {/* Global Flagship Destinations */}
        <DestinationsSection
          onSelectCity={handleSelectCity}
        />

        {/* Private Client Advisory */}
        <AdvisorySection
          onOpenSchedule={handleOpenGeneralSchedule}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenSchedule={handleOpenGeneralSchedule}
      />

      {/* Sticky Bottom Comparison Floating Dock */}
      <ComparisonBar
        compareIds={compareIds}
        onOpenModal={() => setIsCompareModalOpen(true)}
        onRemoveId={(id) => handleToggleCompare(id)}
        onClearAll={() => setCompareIds([])}
      />

      {/* Interactive Modals & Drawers */}
      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onScheduleTour={handleScheduleTour}
        onLaunchVirtualTour={(title) => setVirtualTourTitle(title)}
      />

      <PortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
      />

      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        preselectedProperty={scheduleTargetProperty}
      />

      <SavedDrawer
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        savedIds={savedIds}
        onRemoveSave={handleToggleSave}
        onSelectProperty={(prop) => setSelectedProperty(prop)}
        onScheduleTour={handleScheduleTour}
      />

      <ComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        properties={PROPERTIES_DATA.filter((p) => compareIds.includes(p.id))}
        onRemoveFromCompare={(id) => handleToggleCompare(id)}
        onSelectProperty={(prop) => setSelectedProperty(prop)}
        onScheduleTour={handleScheduleTour}
      />

      <VirtualTourModal
        isOpen={Boolean(virtualTourTitle)}
        onClose={() => setVirtualTourTitle(null)}
        propertyTitle={virtualTourTitle}
      />

      {/* Stat Card In-Depth Modal */}
      <StatCardModal
        statType={statCardType}
        onClose={() => setStatCardType(null)}
        onScheduleTour={handleScheduleTour}
      />

      {/* AI Private Concierge Floating Widget */}
      <ConciergeChatWidget
        onOpenSchedule={handleOpenGeneralSchedule}
        onOpenPortal={() => setIsPortalOpen(true)}
        onScrollTo={scrollToId}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <ToastProvider>
      <CurrencyProvider>
        <MainContent />
      </CurrencyProvider>
    </ToastProvider>
  );
}