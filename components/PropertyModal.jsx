"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  X, 
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
  ExternalLink,
  CheckCircle2,
  Check
} from "lucide-react";
import { useCurrency } from "./CurrencyContext";
import { useToast } from "./Toast";
import { useTransaction } from "./TransactionContext";
import { formatLocation, downloadPropertyBrochure } from "../data/mockData";
import { useScrollLock } from "./useScrollLock";
import AcquisitionModal from "./AcquisitionModal";

export default function PropertyModal({ 
  property, 
  onClose, 
  onScheduleTour
}) {
  const { formatRawPrice, formatArea } = useCurrency();
  const { addToast } = useToast();
  const { isBought, isRented, buyProperty, rentProperty, releaseProperty } = useTransaction();
  const [activeTab, setActiveTab] = useState("overview");
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [acquisitionModalOpen, setAcquisitionModalOpen] = useState(false);
  const [acquisitionMode, setAcquisitionMode] = useState("buy");
  const contentRef = useRef(null);

  useScrollLock(!!property, onClose);

  // Always reset scroll to top and expand photo when modal opens or tab changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
    setIsScrolled(false);
  }, [property?.id, activeTab]);

  const handleScroll = (e) => {
    const top = e.currentTarget.scrollTop;
    if (top > 30 && !isScrolled) {
      setIsScrolled(true);
    } else if (top <= 10 && isScrolled) {
      setIsScrolled(false);
    }
  };

  if (!property) return null;

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/properties/${property.id}`);
      addToast(`Encrypted dossier link for ${property.title} copied to clipboard`, "success", "Link Copied");
    }
  };

  const handleDownloadSchematics = () => {
    addToast(
      `CAD Vector Schematics & Floor Plan Blueprints for ${property.title} decrypted and opened`,
      "success",
      "CAD Schematics Dispatched"
    );
    const planUrl = property.floorPlan?.planImage || property.images?.[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80";
    if (typeof window !== "undefined") {
      window.open(planUrl, "_blank");
    }
  };

  const images = property.images && property.images.length > 0
    ? property.images
    : ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"];

  return (
    <div 
      className="fixed inset-0 z-[60] bg-[#0A192F]/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in overscroll-contain touch-none"
      onClick={onClose}
      onTouchMove={(e) => {
        if (e.target === e.currentTarget) {
          e.preventDefault();
        }
      }}
    >
      <div 
        className="relative w-full max-w-4xl lg:max-w-5xl h-auto max-h-[85dvh] sm:max-h-[90vh] bg-[#FAF8F5] border border-[#E4DCD0] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto text-[#1A1D20]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Controls - Clean Separation */}
        <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-30 flex items-center gap-1.5 sm:gap-2">
          {/* Share button */}
          <button
            onClick={handleShare}
            className="p-2 sm:p-2.5 rounded-full bg-[#0A192F]/85 hover:bg-[#0A192F] text-white shadow-md transition-all active:scale-95 cursor-pointer backdrop-blur-md"
            title="Share Dossier"
          >
            <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-full bg-[#0A192F]/85 hover:bg-[#0A192F] text-white shadow-md transition-all active:scale-95 cursor-pointer backdrop-blur-md"
            title="Close Preview"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Modal Gallery Hero - Pristine High-Resolution Photography */}
        <div 
          onClick={() => {
            if (isScrolled && contentRef.current) {
              contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
              setIsScrolled(false);
            }
          }}
          className={`relative w-full bg-[#0A192F] shrink-0 overflow-hidden transition-all duration-500 ease-in-out select-none ${
            isScrolled 
              ? "h-[85px] xs:h-[95px] sm:h-[110px] md:h-[120px] cursor-pointer group/hero" 
              : "h-[220px] xs:h-[260px] sm:h-[330px] md:h-[370px]"
          }`}
          title={isScrolled ? "Click to expand photography" : undefined}
        >
          <img
            src={images[activeImgIndex]}
            alt={property.title}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isScrolled ? "brightness-[0.88]" : ""
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/45 pointer-events-none" />

          {/* Status & Exclusive Badges */}
          <div className={`absolute left-3 sm:left-4 z-20 flex items-center gap-2 transition-all duration-300 ${
            isScrolled ? "top-2.5 sm:top-3.5" : "top-3 sm:top-4"
          }`}>
            {isBought(property.id) ? (
              <span className={`rounded-full font-bold uppercase tracking-wider bg-[#8B1E1E] text-white border border-red-400 shadow-md transition-all ${
                isScrolled ? "px-2 py-0.5 text-[9px] sm:text-[10px]" : "px-2.5 py-1 sm:px-3 sm:py-1 text-[10px] sm:text-xs"
              }`}>
                SOLD OUT
              </span>
            ) : isRented(property.id) ? (
              <span className={`rounded-full font-bold uppercase tracking-wider bg-[#475569] text-white border border-slate-400 shadow-md transition-all ${
                isScrolled ? "px-2 py-0.5 text-[9px] sm:text-[10px]" : "px-2.5 py-1 sm:px-3 sm:py-1 text-[10px] sm:text-xs"
              }`}>
                CURRENTLY UNAVAILABLE
              </span>
            ) : (
              <span className={`rounded-full font-bold uppercase tracking-wider bg-[#0A192F]/90 text-[#FAF8F5] border border-[#C5A880]/50 backdrop-blur-md shadow-sm transition-all ${
                isScrolled ? "px-2 py-0.5 text-[9px] sm:text-[10px]" : "px-2.5 py-1 sm:px-3 sm:py-1 text-[10px] sm:text-xs"
              }`}>
                {property.status}
              </span>
            )}
            <span className={`rounded-full font-bold uppercase tracking-wider bg-white/95 text-[#0A192F] border border-[#E4DCD0] shadow-sm transition-all ${
              isScrolled ? "px-2 py-0.5 text-[9px] sm:text-[10px]" : "px-2.5 py-1 sm:px-3 sm:py-1 text-[10px] sm:text-xs"
            }`}>
              {property.category}
            </span>
          </div>

          {/* Click to Expand Photo Hint (appears when shrunk) */}
          {isScrolled && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-[10px] sm:text-xs text-[#FAF8F5] border border-white/20 shadow-md animate-fade-in transition-all">
              <span className="text-[#C5A880] font-bold">↑</span>
              <span>Click to Expand Photo</span>
            </div>
          )}

          {/* Carousel Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImgIndex((prev) => (prev - 1 + images.length) % images.length);
                }}
                className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-[#0A192F]/80 hover:bg-[#0A192F] text-white border border-white/20 shadow-md cursor-pointer transition-all active:scale-90"
                title="Previous Photo"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImgIndex((prev) => (prev + 1) % images.length);
                }}
                className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-[#0A192F]/80 hover:bg-[#0A192F] text-white border border-white/20 shadow-md cursor-pointer transition-all active:scale-90"
                title="Next Photo"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </>
          )}

          {/* Thumbnails Row */}
          {images.length > 1 && (
            <div className={`absolute left-3 right-3 z-20 flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar transition-all duration-300 ${
              isScrolled ? "bottom-1.5 opacity-0 pointer-events-none" : "bottom-3 opacity-100"
            }`}>
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImgIndex(idx);
                  }}
                  className={`w-10 h-7 sm:w-14 sm:h-9 rounded-md sm:rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 shadow-sm ${
                    activeImgIndex === idx 
                      ? "border-[#C5A880] scale-105 opacity-100" 
                      : "border-white/40 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Navigation Tabs */}
        <div className="bg-white border-b border-[#E4DCD0] px-3 sm:px-8 flex items-center gap-2 sm:gap-6 shrink-0 overflow-x-auto no-scrollbar whitespace-nowrap">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-2.5 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm uppercase tracking-wider font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === "overview"
                ? "border-[#0A192F] text-[#0A192F]"
                : "border-transparent text-[#747D88] hover:text-[#0A192F]"
            }`}
          >
            <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A880] shrink-0" />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveTab("floorplan")}
            className={`py-2.5 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm uppercase tracking-wider font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === "floorplan"
                ? "border-[#0A192F] text-[#0A192F]"
                : "border-transparent text-[#747D88] hover:text-[#0A192F]"
            }`}
          >
            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A880] shrink-0" />
            <span>Floor Plans & Specs</span>
          </button>
          <button
            onClick={() => setActiveTab("financials")}
            className={`py-2.5 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm uppercase tracking-wider font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === "financials"
                ? "border-[#0A192F] text-[#0A192F]"
                : "border-transparent text-[#747D88] hover:text-[#0A192F]"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A880] shrink-0" />
            <span>Yield & Capital</span>
          </button>
        </div>

        {/* Modal Body with Generous Bottom Padding to Prevent Content Being Hidden Under Sticky Footer */}
        <div 
          ref={contentRef}
          onScroll={handleScroll}
          className="p-4 sm:p-7 pb-36 sm:pb-28 space-y-4 sm:space-y-6 overflow-y-auto flex-1 min-h-0 bg-[#FAF8F5] overscroll-contain touch-pan-y"
        >
          {/* Title, Address & Price Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-[#E4DCD0] pb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center text-xs text-[#747D88] font-semibold mb-1">
                <MapPin className="w-3.5 h-3.5 mr-1 text-[#C5A880] shrink-0" />
                <span>{property.address}, {formatLocation(property)}</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-[#0A192F] font-bold leading-snug">
                {property.title}
              </h2>
              {property.tagline && (
                <p className="text-xs sm:text-sm text-[#545B65] italic mt-0.5">
                  "{property.tagline}"
                </p>
              )}

              {/* Quick Actions Bar */}
              <div className="mt-2.5 flex items-center gap-2 flex-wrap">
                <Link
                  href={`/properties/${property.id}`}
                  className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-white text-[#0A192F] border border-[#E4DCD0] text-[11px] font-bold uppercase tracking-wider shadow-xs hover:border-[#C5A880]"
                >
                  <span>Full Dossier Page</span>
                  <ExternalLink className="w-3 h-3 text-[#C5A880]" />
                </Link>
                <button
                  onClick={() => {
                    downloadPropertyBrochure(property);
                    addToast(`Brochure and specs for ${property.title} downloaded`, "success", "Brochure Ready");
                  }}
                  className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#0A192F] text-[11px] font-bold uppercase tracking-wider shadow-xs border border-[#E4DCD0] cursor-pointer"
                >
                  <Download className="w-3 h-3 text-[#C5A880]" />
                  <span>Download Spec Sheet</span>
                </button>
              </div>
            </div>

            <div className="text-left sm:text-right shrink-0 pt-1 sm:pt-0">
              <div className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#0A192F] tracking-tight">
                {formatRawPrice(property.price)}
              </div>
              {property.rentalPrice && (
                <div className="text-[11px] sm:text-xs text-[#545B65] font-sans mt-0.5 font-medium">
                  Lease: {property.rentalPrice}
                </div>
              )}
              {/* Acquisition Status & Action */}
              {isBought(property.id) ? (
                <div className="mt-2 flex items-center sm:justify-end gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded-lg bg-[#8B1E1E] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-xs">
                    Sold Out
                  </span>
                  <button
                    onClick={() => {
                      setAcquisitionMode("buy");
                      setAcquisitionModalOpen(true);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#0A192F] border border-[#E4DCD0] text-[10px] sm:text-xs font-semibold uppercase tracking-wider cursor-pointer transition-all shadow-2xs"
                  >
                    View Treaty Dossier
                  </button>
                  <button
                    onClick={() => {
                      releaseProperty(property.id);
                      addToast(`${property.title} released back to inventory`, "info", "Market Reset");
                    }}
                    className="text-[11px] sm:text-xs text-[#8B1E1E] hover:text-[#501010] underline font-semibold cursor-pointer"
                  >
                    Release to Market
                  </button>
                </div>
              ) : isRented(property.id) ? (
                <div className="mt-2 flex items-center sm:justify-end gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded-lg bg-[#475569] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-xs">
                    Currently Unavailable
                  </span>
                  <button
                    onClick={() => {
                      setAcquisitionMode("rent");
                      setAcquisitionModalOpen(true);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#0A192F] border border-[#E4DCD0] text-[10px] sm:text-xs font-semibold uppercase tracking-wider cursor-pointer transition-all shadow-2xs"
                  >
                    View Lease Mandate
                  </button>
                  <button
                    onClick={() => {
                      releaseProperty(property.id);
                      addToast(`${property.title} lease concluded, restored to market`, "info", "Market Reset");
                    }}
                    className="text-[11px] sm:text-xs text-[#475569] hover:text-black underline font-semibold cursor-pointer"
                  >
                    Release Lease
                  </button>
                </div>
              ) : (
                <div className="mt-2 flex items-center sm:justify-end gap-2 flex-wrap">
                  <button
                    onClick={() => {
                      setAcquisitionMode("buy");
                      setAcquisitionModalOpen(true);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-xs cursor-pointer active:scale-95 transition-all flex items-center gap-1.5 border border-[#C5A880]/40"
                  >
                    <Check className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Acquire Residence</span>
                  </button>
                  {property.rentalPrice && (
                    <button
                      onClick={() => {
                        setAcquisitionMode("rent");
                        setAcquisitionModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#F3EFEA] hover:bg-[#EAE3D9] text-[#0A192F] text-[11px] sm:text-xs font-semibold uppercase tracking-wider border border-[#E4DCD0] shadow-2xs cursor-pointer active:scale-95 transition-all"
                    >
                      <span>Lease Residence</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-5 sm:space-y-6 animate-fade-in">
              {/* Key Specs: 6 Cards in Balanced Grid - Zero Truncation & Pixel Perfect Alignment */}
              <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-2.5">
                <div className="bg-white border border-[#E4DCD0] rounded-xl sm:rounded-2xl p-2 sm:p-2.5 text-center shadow-xs flex flex-col justify-center items-center min-h-[74px] sm:min-h-[82px]">
                  <div className="text-[9px] sm:text-[11px] text-[#747D88] uppercase tracking-wider font-bold">Bedrooms</div>
                  <div className="text-sm sm:text-base md:text-lg font-bold text-[#0A192F] font-mono mt-0.5">{property.beds}</div>
                </div>
                <div className="bg-white border border-[#E4DCD0] rounded-xl sm:rounded-2xl p-2 sm:p-2.5 text-center shadow-xs flex flex-col justify-center items-center min-h-[74px] sm:min-h-[82px]">
                  <div className="text-[9px] sm:text-[11px] text-[#747D88] uppercase tracking-wider font-bold">Bathrooms</div>
                  <div className="text-sm sm:text-base md:text-lg font-bold text-[#0A192F] font-mono mt-0.5">{property.baths}</div>
                </div>
                <div className="bg-white border border-[#E4DCD0] rounded-xl sm:rounded-2xl p-2 sm:p-2.5 text-center shadow-xs flex flex-col justify-center items-center min-h-[74px] sm:min-h-[82px]">
                  <div className="text-[9px] sm:text-[11px] text-[#747D88] uppercase tracking-wider font-bold">Interior</div>
                  <div suppressHydrationWarning className="text-xs sm:text-sm md:text-base font-bold text-[#0A192F] font-mono mt-0.5 whitespace-nowrap">{formatArea(property.sqft, property.sqm)}</div>
                </div>
                <div className="bg-white border border-[#E4DCD0] rounded-xl sm:rounded-2xl p-2 sm:p-2.5 text-center shadow-xs flex flex-col justify-center items-center min-h-[74px] sm:min-h-[82px]">
                  <div className="text-[9px] sm:text-[11px] text-[#747D88] uppercase tracking-wider font-bold">Lot Size</div>
                  <div className="text-[11px] sm:text-xs md:text-sm font-bold text-[#0A192F] font-mono mt-0.5 leading-snug break-words text-center px-1">{property.lotSize}</div>
                </div>
                <div className="bg-white border border-[#E4DCD0] rounded-xl sm:rounded-2xl p-2 sm:p-2.5 text-center shadow-xs flex flex-col justify-center items-center min-h-[74px] sm:min-h-[82px]">
                  <div className="text-[9px] sm:text-[11px] text-[#747D88] uppercase tracking-wider font-bold">Year Built</div>
                  <div className="text-sm sm:text-base md:text-lg font-bold text-[#0A192F] font-mono mt-0.5">{property.yearBuilt}</div>
                </div>
                <div className="bg-white border border-[#E4DCD0] rounded-xl sm:rounded-2xl p-2 sm:p-2.5 text-center shadow-xs flex flex-col justify-center items-center min-h-[74px] sm:min-h-[82px]">
                  <div className="text-[9px] sm:text-[11px] text-[#747D88] uppercase tracking-wider font-bold">Proj. Yield</div>
                  <div className="text-sm sm:text-base md:text-lg font-bold text-[#C5A880] font-mono mt-0.5">{property.capRate || "5.2%"}</div>
                </div>
              </div>

              {/* Architectural Narrative */}
              <div>
                <h3 className="text-xs uppercase font-mono tracking-wider text-[#0A192F] font-bold mb-1.5 sm:mb-2">
                  Architectural Narrative
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-[#1A1D20] leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Amenities Grid */}
              <div>
                <h3 className="text-xs uppercase font-mono tracking-wider text-[#0A192F] font-bold mb-2 sm:mb-3">
                  Estate Amenities & Master Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {property.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 sm:p-2.5 px-3 rounded-xl bg-white border border-[#E4DCD0] text-xs sm:text-sm text-[#1A1D20] shadow-xs">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#C5A880] shrink-0" />
                      <span className="font-medium leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FLOOR PLANS & SPECS */}
          {activeTab === "floorplan" && (
            <div className="space-y-4 sm:space-y-5 animate-fade-in">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-sm">
                <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white border border-[#E4DCD0] shadow-xs flex flex-col justify-center min-h-[76px]">
                  <span className="text-[10px] sm:text-xs text-[#747D88] uppercase block font-bold">Levels / Storeys</span>
                  <span className="text-[#0A192F] font-mono font-bold text-xs sm:text-base mt-0.5 block leading-snug">{property.floorPlan?.levels || 2} Floors</span>
                </div>
                <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white border border-[#E4DCD0] shadow-xs flex flex-col justify-center min-h-[76px]">
                  <span className="text-[10px] sm:text-xs text-[#747D88] uppercase block font-bold">Ceiling Height</span>
                  <span className="text-[#0A192F] font-mono font-bold text-xs sm:text-base mt-0.5 block leading-snug">{property.floorPlan?.ceilingHeight || "14 FT"}</span>
                </div>
                <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white border border-[#E4DCD0] shadow-xs flex flex-col justify-center min-h-[76px]">
                  <span className="text-[10px] sm:text-xs text-[#747D88] uppercase block font-bold">Outdoor Living</span>
                  <span className="text-[#0A192F] font-mono font-bold text-xs sm:text-base mt-0.5 block leading-snug">{property.floorPlan?.outdoorDeck || "3,200 SF"}</span>
                </div>
                <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white border border-[#E4DCD0] shadow-xs flex flex-col justify-center min-h-[76px]">
                  <span className="text-[10px] sm:text-xs text-[#747D88] uppercase block font-bold">Gallery Garage</span>
                  <span className="text-[#0A192F] font-mono font-bold text-xs sm:text-base mt-0.5 block leading-snug">{property.floorPlan?.galleryCars || 4} Enclosed Cars</span>
                </div>
              </div>

              {/* Interactive Floor Plan & CAD Vector Schematics (FULLY CLICKABLE) */}
              <div 
                onClick={handleDownloadSchematics}
                className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-[#E4DCD0] hover:border-[#C5A880] bg-[#0A192F] flex flex-col items-center justify-center p-5 sm:p-7 text-center shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group active:scale-[0.99]"
              >
                <img
                  src={property.floorPlan?.planImage || images[0]}
                  alt="Architectural Floor Plan"
                  className="absolute inset-0 w-full h-full object-cover filter contrast-125 opacity-25 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                />
                <div className="relative z-10 flex flex-col items-center justify-center max-w-lg mx-auto">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#C5A880]/20 border border-[#C5A880]/50 flex items-center justify-center text-[#C5A880] mb-2 sm:mb-2.5 shadow-md group-hover:scale-110 group-hover:bg-[#C5A880] group-hover:text-[#0A192F] transition-all">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C5A880]/20 text-[#EADDC9] text-[9px] sm:text-[10px] font-mono uppercase tracking-wider mb-1.5 border border-[#C5A880]/30">
                    <CheckCircle2 className="w-3 h-3 text-[#C5A880]" />
                    <span>CAD Vector Schematics Verified</span>
                  </div>

                  <h4 className="text-base sm:text-xl font-serif text-[#FAF8F5] font-bold group-hover:text-[#C5A880] transition-colors">
                    Architectural CAD Vector Blueprints
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#DDD4C6] max-w-md mt-1 leading-relaxed">
                    Click to inspect and download high-resolution structural blueprints, load-bearing plans, and dimension vectors.
                  </p>

                  <div className="mt-3.5 inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-[#C5A880] hover:bg-[#D4BC96] text-[#0A192F] font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 group-hover:shadow-lg">
                    <Download className="w-3.5 h-3.5" />
                    <span>Open & Download Blueprints</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FINANCIALS */}
          {activeTab === "financials" && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 text-sm">
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#E4DCD0] shadow-xs">
                  <span className="text-[10px] sm:text-xs text-[#747D88] uppercase block font-bold">Projected Cap Rate</span>
                  <span className="text-lg sm:text-2xl text-[#C5A880] font-mono font-bold mt-1 block">{property.capRate || "5.8%"}</span>
                  <span className="text-[11px] sm:text-xs text-[#545B65] mt-0.5 block font-medium">Institutional benchmark yield</span>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#E4DCD0] shadow-xs">
                  <span className="text-[10px] sm:text-xs text-[#747D88] uppercase block font-bold">Annual Property Tax</span>
                  <span className="text-lg sm:text-2xl text-[#0A192F] font-mono font-bold mt-1 block">{property.taxesAnnual || "$180,000"}</span>
                  <span className="text-[11px] sm:text-xs text-[#545B65] mt-0.5 block font-medium">Escrow audited estimate</span>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#E4DCD0] shadow-xs">
                  <span className="text-[10px] sm:text-xs text-[#747D88] uppercase block font-bold">Monthly HOA & Dues</span>
                  <span className="text-lg sm:text-2xl text-[#0A192F] font-mono font-bold mt-1 block">{property.hoa || "$1,250 / mo"}</span>
                  <span className="text-[11px] sm:text-xs text-[#545B65] mt-0.5 block font-medium">White-glove concierge</span>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#E4DCD0] text-xs sm:text-sm text-[#1A1D20] shadow-xs leading-relaxed">
                <span className="text-[#0A192F] font-bold block mb-1">Sterling Key Institutional Management Guarantee:</span>
                Under our Signature Portfolio oversight, this asset qualifies for guaranteed automated ACH distributions by the 5th of each month, 24/7 dedicated dispatch, and 0% repair markup policy.
              </div>
            </div>
          )}
        </div>

        {/* Representing Advisor & Actions Sticky Footer - Compact, Guaranteed 100% Visible */}
        <div className="bg-white border-t border-[#E4DCD0] px-4 py-3 sm:px-8 sm:py-3.5 shrink-0 shadow-xl z-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            {/* Advisor Card with Zero Truncation */}
            <div className="flex items-center gap-3">
              <img
                src={property.agent.image}
                alt={property.agent.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
                }}
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-[#C5A880] shrink-0 shadow-2xs"
              />
              <div className="min-w-0">
                <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#C5A880] font-bold">
                  Represented Exclusively By
                </div>
                <div className="text-xs sm:text-sm font-serif text-[#0A192F] font-bold whitespace-nowrap">
                  {property.agent.name}
                </div>
                <div className="text-[10px] text-[#747D88] hidden sm:block">
                  {property.agent.title}
                </div>
              </div>
            </div>

            {/* Actions Row - Responsive with Full-Width Touch targets on mobile */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {isBought(property.id) && (
                <span className="py-2.5 px-3 rounded-xl bg-red-50 border border-red-200 text-[#8B1E1E] font-bold text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1 whitespace-nowrap">
                  <Check className="w-3.5 h-3.5" /> Sold Out
                </span>
              )}
              {isRented(property.id) && (
                <span className="py-2.5 px-3 rounded-xl bg-slate-100 border border-slate-300 text-[#475569] font-bold text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1 whitespace-nowrap">
                  <Check className="w-3.5 h-3.5" /> Leased
                </span>
              )}
              <button
                onClick={() => {
                  onClose();
                  onScheduleTour(property);
                }}
                className="flex-1 sm:flex-initial py-2.5 px-4 sm:py-2.5 sm:px-5 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-sm whitespace-nowrap cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Schedule Showing</span>
              </button>
              <a
                href={`tel:${property.agent.phone}`}
                className="p-2.5 sm:py-2.5 sm:px-3.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#0A192F] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all border border-[#E4DCD0] shadow-2xs shrink-0"
                title="Call Representative"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="hidden md:inline">Call</span>
              </a>
              <button
                onClick={() => {
                  downloadPropertyBrochure(property);
                  addToast(`Brochure and confidential floor plan for ${property.title} downloaded`, "success", "Brochure Ready");
                }}
                className="p-2.5 sm:py-2.5 sm:px-3.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#0A192F] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all border border-[#E4DCD0] shadow-2xs cursor-pointer shrink-0"
                title="Download Brochure"
              >
                <Download className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="hidden md:inline">Brochure</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Step Institutional Acquisition & Lease Treaty Modal */}
      <AcquisitionModal
        isOpen={acquisitionModalOpen}
        onClose={() => setAcquisitionModalOpen(false)}
        property={property}
        initialMode={acquisitionMode}
      />
    </div>
  );
}
