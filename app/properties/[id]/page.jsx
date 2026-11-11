"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  MapPin, 
  Calendar, 
  Phone, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  Share2, 
  Compass, 
  Layers, 
  TrendingUp, 
  FileText, 
  Rotate3D,
  ArrowLeft,
  Check,
  ShieldCheck,
  Building,
  Heart
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScheduleModal from "@/components/ScheduleModal";
import PortalModal from "@/components/PortalModal";
import SavedDrawer from "@/components/SavedDrawer";
import DossierPreviewModal from "@/components/DossierPreviewModal";
import VirtualTourModal from "@/components/VirtualTourModal";
import MortgageCalculator from "@/components/MortgageCalculator";
import { useCurrency } from "@/components/CurrencyContext";
import { useToast } from "@/components/Toast";
import { PROPERTIES_DATA, downloadPropertyBrochure } from "@/data/mockData";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { formatRawPrice, formatArea } = useCurrency();
  const { addToast } = useToast();

  const property = PROPERTIES_DATA.find((p) => p.id === params.id) || PROPERTIES_DATA[0];
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [virtualTourOpen, setVirtualTourOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast(`Encrypted dossier link for ${property.title} copied to clipboard`, "success", "Link Copied");
    }
  };

  const handleToggleSave = () => {
    setIsSaved(!isSaved);
    addToast(
      !isSaved ? `Added ${property.title} to saved portfolio` : `Removed ${property.title} from saved`,
      "info",
      "Portfolio Updated"
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1D20] flex flex-col font-sans selection:bg-[#C5A880]/30 selection:text-[#0A192F]">
      <Navbar 
        onOpenPortal={() => setPortalOpen(true)}
        onOpenSchedule={() => setScheduleModalOpen(true)}
        onOpenSaved={() => setSavedDrawerOpen(true)}
        savedCount={isSaved ? 1 : 0}
      />

      <main className="flex-1 max-w-[1500px] w-full mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E4DCD0]">
          <Link
            href="/collection"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#545B65] hover:text-[#0A192F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C5A880]" />
            <span>Back to Property Collection</span>
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleToggleSave}
              className={`p-2.5 rounded-xl border transition-all ${
                isSaved ? "bg-[#0A192F] text-[#FAF8F5] border-[#0A192F]" : "bg-white text-[#545B65] border-[#E4DCD0] hover:border-[#C5A880]"
              }`}
              title="Save Property"
            >
              <Heart className={`w-4 h-4 ${isSaved ? "fill-[#C5A880] text-[#C5A880]" : ""}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-white border border-[#E4DCD0] text-[#545B65] hover:text-[#0A192F] hover:border-[#C5A880] transition-all shadow-xs"
              title="Share Dossier"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Gallery Section - Elegant Editorial Framing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          {/* Main Visual Display */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden border border-[#E4DCD0] bg-[#EFE9DF] shadow-lg">
              <img
                src={property.images[activeImgIndex]}
                alt={property.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80";
                }}
                className="w-full h-full object-cover transition-all duration-500"
              />

              {/* Badges */}
              <div className="absolute top-5 left-5 flex items-center gap-2.5">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0A192F] text-[#FAF8F5] border border-[#C5A880]/40 shadow-sm">
                  {property.status}
                </span>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-[#0A192F] border border-[#E4DCD0] shadow-sm">
                  {property.category}
                </span>
              </div>

              {/* 360 Tour Launcher */}
              <div className="absolute top-5 right-5">
                <button
                  onClick={() => setVirtualTourOpen(true)}
                  className="py-2 px-4 rounded-full bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
                >
                  <Rotate3D className="w-4 h-4 text-[#C5A880]" />
                  <span>Launch 360° Tour</span>
                </button>
              </div>

              {/* Prev / Next controls */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImgIndex((prev) => (prev - 1 + property.images.length) % property.images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white text-[#0A192F] transition-all shadow-md"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImgIndex((prev) => (prev + 1) % property.images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white text-[#0A192F] transition-all shadow-md"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {property.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImgIndex === idx ? "border-[#C5A880] scale-105 shadow-md" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Transaction & Advisor Card (Sticky) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E4DCD0] shadow-md space-y-6">
              <div>
                <div className="flex items-center text-xs sm:text-sm text-[#747D88] font-semibold mb-1">
                  <MapPin className="w-4 h-4 mr-1 text-[#C5A880] shrink-0" />
                  <span>{property.address}, {property.city}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-serif text-[#0A192F] font-bold leading-tight">
                  {property.title}
                </h1>
                <p className="text-xs sm:text-sm text-[#545B65] italic mt-1">
                  "{property.tagline}"
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E4DCD0]">
                <div className="text-xs uppercase font-mono tracking-wider text-[#545B65] font-semibold">
                  Sovereign Asking Price
                </div>
                <div suppressHydrationWarning className="text-3xl sm:text-4xl font-serif font-bold text-[#0A192F] tracking-tight mt-1">
                  {formatRawPrice(property.price)}
                </div>
                {property.rentalPrice && (
                  <div className="text-xs sm:text-sm text-[#545B65] font-medium mt-1">
                    Lease Option: {property.rentalPrice}
                  </div>
                )}

                {/* Core Property Metrics Row */}
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#545B65] font-mono pt-3 mt-3 border-t border-[#E4DCD0]">
                  <span className="font-bold text-[#0A192F]">{property.beds} Beds</span>
                  <span className="text-[#C5A880]">•</span>
                  <span className="font-bold text-[#0A192F]">{property.baths} Baths</span>
                  <span className="text-[#C5A880]">•</span>
                  <span suppressHydrationWarning className="font-bold text-[#0A192F]">{formatArea(property.sqft, property.sqm)}</span>
                  <span className="text-[#C5A880]">•</span>
                  <span className="font-bold text-[#C5A880]">{property.capRate || "5.8%"} Cap</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setScheduleModalOpen(true)}
                  className="w-full py-4 px-6 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#C5A880]" />
                  <span>Schedule Private Showing</span>
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`tel:${property.agent.phone}`}
                    className="py-3 px-4 rounded-xl bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#0A192F] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all border border-[#E4DCD0] shadow-xs"
                  >
                    <Phone className="w-4 h-4 text-[#C5A880]" />
                    <span>Call Broker</span>
                  </a>
                  <button
                    onClick={() => {
                      downloadPropertyBrochure(property);
                      setShowBrochureModal(true);
                      addToast(`Official investment brochure for ${property.title} downloaded`, "success", "Brochure Ready");
                    }}
                    className="py-3 px-4 rounded-xl bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#0A192F] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all border border-[#E4DCD0] shadow-xs cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#C5A880]" />
                    <span>Brochure</span>
                  </button>
                </div>
              </div>

              {/* Broker Profile */}
              <div className="pt-5 border-t border-[#E4DCD0] flex items-center gap-4">
                <img
                  src={property.agent.image}
                  alt={property.agent.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#C5A880] shrink-0"
                />
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-wider text-[#C5A880] font-bold">
                    Exclusive Representation
                  </div>
                  <div className="text-base font-serif text-[#0A192F] font-bold">
                    {property.agent.name}
                  </div>
                  <div className="text-xs text-[#545B65]">
                    {property.agent.title}
                  </div>
                  <div className="text-xs text-[#0A192F] font-mono font-semibold mt-0.5">
                    {property.agent.phone}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs & Specifications */}
        <div className="space-y-6 sm:space-y-8">
          <div className="flex items-center gap-2 sm:gap-6 border-b border-[#E4DCD0] pb-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-2.5 sm:py-3 px-3 sm:px-1 text-xs sm:text-sm uppercase tracking-wider font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap cursor-pointer ${
                activeTab === "overview" ? "border-[#0A192F] text-[#0A192F]" : "border-transparent text-[#545B65] hover:text-[#0A192F]"
              }`}
            >
              <Compass className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span>Overview</span>
              <span className="hidden sm:inline">& Narrative</span>
            </button>
            <button
              onClick={() => setActiveTab("floorplan")}
              className={`py-2.5 sm:py-3 px-3 sm:px-1 text-xs sm:text-sm uppercase tracking-wider font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap cursor-pointer ${
                activeTab === "floorplan" ? "border-[#0A192F] text-[#0A192F]" : "border-transparent text-[#545B65] hover:text-[#0A192F]"
              }`}
            >
              <Layers className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span>Floor Plans & Specs</span>
            </button>
            <button
              onClick={() => setActiveTab("financials")}
              className={`py-2.5 sm:py-3 px-3 sm:px-1 text-xs sm:text-sm uppercase tracking-wider font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap cursor-pointer ${
                activeTab === "financials" ? "border-[#0A192F] text-[#0A192F]" : "border-transparent text-[#545B65] hover:text-[#0A192F]"
              }`}
            >
              <TrendingUp className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span>Yield & Financials</span>
            </button>
          </div>

          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                <div className="p-4 rounded-2xl bg-white border border-[#E4DCD0] text-center shadow-xs">
                  <div className="text-xs text-[#747D88] uppercase tracking-wider font-bold">Bedrooms</div>
                  <div className="text-xl font-bold text-[#0A192F] font-mono mt-1">{property.beds}</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#E4DCD0] text-center shadow-xs">
                  <div className="text-xs text-[#747D88] uppercase tracking-wider font-bold">Bathrooms</div>
                  <div className="text-xl font-bold text-[#0A192F] font-mono mt-1">{property.baths}</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#E4DCD0] text-center shadow-xs">
                  <div className="text-xs text-[#747D88] uppercase tracking-wider font-bold">Interior Living</div>
                  <div suppressHydrationWarning className="text-xl font-bold text-[#0A192F] font-mono mt-1">{formatArea(property.sqft, property.sqm)}</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#E4DCD0] text-center shadow-xs">
                  <div className="text-xs text-[#747D88] uppercase tracking-wider font-bold">Parcel Lot Size</div>
                  <div className="text-xl font-bold text-[#0A192F] font-mono mt-1">{property.lotSize}</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#E4DCD0] text-center shadow-xs">
                  <div className="text-xs text-[#747D88] uppercase tracking-wider font-bold">Year Commissioned</div>
                  <div className="text-xl font-bold text-[#0A192F] font-mono mt-1">{property.yearBuilt}</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#E4DCD0] text-center shadow-xs">
                  <div className="text-xs text-[#747D88] uppercase tracking-wider font-bold">Projected Cap Rate</div>
                  <div className="text-xl font-bold text-[#C5A880] font-mono mt-1">{property.capRate || "5.8%"}</div>
                </div>
              </div>

              {/* Description */}
              <div className="p-8 rounded-3xl bg-white border border-[#E4DCD0] shadow-sm space-y-4">
                <h3 className="text-xl font-serif text-[#0A192F] font-bold">
                  Curated Architectural Narrative
                </h3>
                <p className="text-base text-[#1A1D20] leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="p-8 rounded-3xl bg-white border border-[#E4DCD0] shadow-sm space-y-6">
                <h3 className="text-xl font-serif text-[#0A192F] font-bold">
                  Master Amenities & Security Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {property.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E4DCD0] text-sm text-[#1A1D20] shadow-2xs">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#C5A880] shrink-0" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "floorplan" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-[#E4DCD0] shadow-xs">
                  <span className="text-xs text-[#747D88] uppercase block font-bold">Levels / Storeys</span>
                  <span className="text-lg font-mono font-bold text-[#0A192F] mt-1 block">{property.floorPlan?.levels || 2} Floors</span>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-[#E4DCD0] shadow-xs">
                  <span className="text-xs text-[#747D88] uppercase block font-bold">Ceiling Clearances</span>
                  <span className="text-lg font-mono font-bold text-[#0A192F] mt-1 block">{property.floorPlan?.ceilingHeight || "14 FT"}</span>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-[#E4DCD0] shadow-xs">
                  <span className="text-xs text-[#747D88] uppercase block font-bold">Outdoor Terrace Area</span>
                  <span className="text-lg font-mono font-bold text-[#0A192F] mt-1 block">{property.floorPlan?.outdoorDeck || "3,200 SF"}</span>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-[#E4DCD0] shadow-xs">
                  <span className="text-xs text-[#747D88] uppercase block font-bold">Gallery Garage Capacity</span>
                  <span className="text-lg font-mono font-bold text-[#0A192F] mt-1 block">{property.floorPlan?.galleryCars || 4} Enclosed Cars</span>
                </div>
              </div>

              <div className="relative aspect-[16/8] rounded-3xl overflow-hidden border border-[#E4DCD0] bg-white flex items-center justify-center p-8 shadow-sm">
                <img
                  src={property.floorPlan?.planImage || property.images[0]}
                  alt="Architectural Floor Plan"
                  className="w-full h-full object-contain filter contrast-105"
                />
                <div className="absolute inset-0 bg-[#0A192F]/60 flex flex-col items-center justify-center p-8 text-center backdrop-blur-xs">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-[#C5A880] mb-3 shadow-sm">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-serif text-[#FAF8F5] font-bold">CAD Vector Schematics Verified</h4>
                  <p className="text-sm text-[#DDD4C6] max-w-lg mt-1.5 leading-relaxed">
                    Complete CAD floor plans, mechanical engineering schematics, and structural blueprints are available upon private NDA registration.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "financials" && (
            <div className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
                <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#E4DCD0] shadow-xs">
                  <span className="text-[10px] sm:text-xs text-[#747D88] uppercase block font-bold">Projected Cap Rate</span>
                  <span className="text-2xl sm:text-3xl text-[#C5A880] font-mono font-bold mt-1 block">{property.capRate || "5.8%"}</span>
                  <span className="text-xs text-[#545B65] mt-1 block font-medium">Institutional benchmark yield</span>
                </div>
                <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#E4DCD0] shadow-xs">
                  <span className="text-[10px] sm:text-xs text-[#747D88] uppercase block font-bold">Annual Property Tax</span>
                  <span className="text-2xl sm:text-3xl text-[#0A192F] font-mono font-bold mt-1 block">{property.taxesAnnual || "$180,000"}</span>
                  <span className="text-xs text-[#545B65] mt-1 block font-medium">Escrow audited estimate</span>
                </div>
                <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#E4DCD0] shadow-xs">
                  <span className="text-[10px] sm:text-xs text-[#747D88] uppercase block font-bold">Monthly HOA & Dues</span>
                  <span className="text-2xl sm:text-3xl text-[#0A192F] font-mono font-bold mt-1 block">{property.hoa || "$1,250 / mo"}</span>
                  <span className="text-xs text-[#545B65] mt-1 block font-medium">Full white-glove concierge</span>
                </div>
              </div>

              {/* Interactive Mortgage Calculator Component Embedded */}
              <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-[#E4DCD0] shadow-sm">
                <h3 className="text-lg sm:text-xl font-serif text-[#0A192F] font-bold mb-4 sm:mb-6">
                  Financing & Capital Expenditure Model
                </h3>
                <MortgageCalculator initialPrice={property.price} />
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer 
        onOpenPortal={() => setPortalOpen(true)}
        onOpenSchedule={() => setScheduleModalOpen(true)}
      />

      {/* Modals */}
      {scheduleModalOpen && (
        <ScheduleModal
          isOpen={true}
          property={property}
          onClose={() => setScheduleModalOpen(false)}
        />
      )}

      {portalOpen && (
        <PortalModal
          isOpen={true}
          onClose={() => setPortalOpen(false)}
        />
      )}

      {savedDrawerOpen && (
        <SavedDrawer
          onClose={() => setSavedDrawerOpen(false)}
        />
      )}

      {virtualTourOpen && (
        <VirtualTourModal
          title={property.title}
          onClose={() => setVirtualTourOpen(false)}
        />
      )}

      {showBrochureModal && (
        <DossierPreviewModal
          dossier={{
            id: `SK-${property.id.toUpperCase()}-2026`,
            title: `${property.title} — Official Investment Dossier`,
            classification: "SOVEREIGN WEALTH & PRIVATE CLIENT ARCHIVE",
            issuedDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
            recipient: "Confidential Registered Investor",
            executiveSummary: property.description,
            featuredOfferings: [
              {
                title: property.title,
                status: property.status,
                capRate: `${property.capRate || "5.8%"} Cap Rate`,
                location: `${property.neighborhood}, ${property.city}`,
                specs: `${property.beds} Beds · ${property.baths} Baths · ${property.sqft ? property.sqft.toLocaleString() + " SF" : ""}`,
                valuation: property.priceFormatted || "$" + property.price.toLocaleString()
              }
            ]
          }}
          onClose={() => setShowBrochureModal(false)}
        />
      )}
    </div>
  );
}
