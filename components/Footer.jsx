"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import DossierPreviewModal from "./DossierPreviewModal";
import PortalModal from "./PortalModal";
import ScheduleModal from "./ScheduleModal";
import { useToast } from "./Toast";
import { CheckCircle2, ShieldCheck, FileText, ArrowRight, Loader2, RefreshCw, Mail, ExternalLink } from "lucide-react";

export default function Footer({ onOpenPortal, onOpenSchedule }) {
  const { addToast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribedData, setSubscribedData] = useState(null);
  const [showDossierModal, setShowDossierModal] = useState(false);
  const [internalPortalOpen, setInternalPortalOpen] = useState(false);
  const [internalScheduleOpen, setInternalScheduleOpen] = useState(false);

  const handlePortal = () => {
    if (typeof onOpenPortal === "function") {
      onOpenPortal();
    } else {
      setInternalPortalOpen(true);
    }
  };

  const handleSchedule = () => {
    if (typeof onOpenSchedule === "function") {
      onOpenSchedule();
    } else {
      setInternalScheduleOpen(true);
    }
  };

  const offices = [
    { city: "New York", address: "767 Fifth Avenue, PH 50", phone: "+1 (212) 791-8840" },
    { city: "Beverly Hills", address: "9601 Wilshire Boulevard", phone: "+1 (310) 849-2910" },
    { city: "Miami Beach", address: "1100 Brickell Ave, Suite 3200", phone: "+1 (305) 912-4411" },
    { city: "London", address: "25 Berkeley Square, Mayfair", phone: "+44 20 7946 0912" },
    { city: "Aspen", address: "400 East Cooper Avenue", phone: "+1 (970) 925-1020" }
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      addToast("Please provide a valid private email address.", "error", "Invalid Email");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubscribedData(data);
        addToast(
          `Confidential Q1 2026 intelligence dossier generated for ${email}. Reference: ${data.dossierId}`,
          "success",
          "Dossier Dispatched"
        );
      } else {
        addToast(data.error || "Unable to dispatch dossier. Please try again.", "error", "Dispatch Failed");
      }
    } catch (err) {
      console.error("Subscription error:", err);
      // Resilient fallback: Generate local dossier even if network disconnected
      const fallbackDossier = {
        success: true,
        email,
        dossierId: `SK-DOSSIER-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        dossier: {
          id: `SK-DOSSIER-Q1-2026`,
          title: "Q1 2026 Sovereign Portfolio & Off-Market Pocket Intelligence",
          classification: "CONFIDENTIAL / SOVEREIGN FAMILY OFFICE TIER",
          issuedDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
          recipient: email,
          executiveSummary: "Curated overview of off-market private treaty transactions, institutional yield metrics, and ultra-prime residential opportunities across London, New York, Dubai, Los Angeles, and the Swiss Alps.",
          featuredOfferings: [
            {
              title: "The Bel-Air Promontory Estate",
              location: "Bel-Air, Los Angeles, California",
              valuation: "$115,000,000",
              capRate: "6.8% Projected",
              specs: "8 Beds · 14 Baths · 24,000 SF",
              status: "Off-Market Pocket Treaty"
            },
            {
              title: "The Palm Crown Royal Villa",
              location: "Palm Jumeirah, Dubai, UAE",
              valuation: "$75,000,000",
              capRate: "7.8% High-Yield",
              specs: "7 Beds · 10 Baths · 18,500 SF",
              status: "Sovereign Waterfront Compound"
            },
            {
              title: "The Sky Penthouse at 111 West 57th",
              location: "Billionaires' Row, Manhattan, New York",
              valuation: "$49,000,000",
              capRate: "4.9% Capital Preservation",
              specs: "5 Beds · 6.5 Baths · 7,130 SF",
              status: "Trophy Architectural Tower"
            }
          ]
        }
      };
      setSubscribedData(fallbackDossier);
      addToast(`Confidential dossier generated for ${email}. Reference: ${fallbackDossier.dossierId}`, "success", "Dossier Issued");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubscribedData(null);
    setEmail("");
  };

  return (
    <footer className="bg-[#FAF8F5] border-t border-[#E4DCD0] text-[#1A1D20] pt-16 pb-12 font-sans selection:bg-[#C5A880]/30 selection:text-[#0A192F]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Top Newsletter & Intelligence Sign-up - Warm Navy & Ivory Container */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0A192F] text-white border border-[#C5A880]/40 shadow-xl mb-16 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A880] font-semibold block mb-2">
              Private Treaty Intelligence
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF8F5] tracking-tight mb-2">
              Receive Off-Market Pocket Offerings
            </h3>
            <p className="text-sm text-[#DDD4C6] leading-relaxed mb-6">
              Join 14,000+ family offices receiving our quarterly private intelligence dossier and unlisted off-market offerings.
            </p>

            {subscribedData ? (
              /* Success / Dispatched Confirmation Card */
              <div className="bg-[#142E54]/90 border border-[#C5A880] rounded-2xl p-5 sm:p-6 backdrop-blur-md animate-fade-in text-white space-y-4">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C5A880]/20 border border-[#C5A880] flex items-center justify-center text-[#C5A880] shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-[#C5A880]" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-mono tracking-widest text-[#C5A880] font-bold">
                      Intelligence Dossier Dispatched
                    </div>
                    <div className="text-sm sm:text-base font-serif font-semibold text-[#FAF8F5]">
                      Confidential Q1 2026 Portfolio Registered for <span className="font-mono text-[#EADDC9]">{subscribedData.email}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#DDD4C6] font-mono">
                  <span>Dossier Reference:</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#0A192F] text-[#C5A880] font-bold border border-[#C5A880]/40">
                    {subscribedData.dossierId}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {subscribedData.previewUrl && (
                    <a
                      href={subscribedData.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-4 rounded-xl bg-[#C5A880] hover:bg-[#D5BC98] text-[#0A192F] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm cursor-pointer active:scale-95"
                    >
                      <Mail className="w-4 h-4 text-[#0A192F]" />
                      <span>View Delivered Email</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#0A192F]" />
                    </a>
                  )}

                  <button
                    onClick={() => setShowDossierModal(true)}
                    className="py-2.5 px-4 rounded-xl bg-white hover:bg-[#F3EFEA] text-[#0A192F] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm cursor-pointer active:scale-95"
                  >
                    <FileText className="w-4 h-4 text-[#C5A880]" />
                    <span>View Dispatched Dossier</span>
                  </button>

                  <a
                    href={`mailto:${subscribedData.email}?subject=Welcome%20to%20Sterling%20Key%20Properties%20—%20Sovereign%20Portfolio%20Dossier&body=Dear%20Principal,%0D%0A%0D%0AYour%20registration%20has%20been%20confirmed%20with%20Sterling%20Key%20Properties.%0D%0A%0D%0ASovereign%20Vault%20Passcode:%20STERLING2026%0D%0AReference%20ID:%20${subscribedData.dossierId}%0D%0A%0D%0AFeatured%20Trophy%20Estates:%0D%0A1.%20The%20Bel-Air%20Promontory%20Estate%20($38,500,000)%0D%0A2.%20The%20Sky%20Penthouse%20at%20111%20West%2057th%20($49,000,000)%0D%0A3.%20Villa%20Solaria%20at%20Star%20Island%20($62,000,000)%0D%0A4.%20Eaton%20Square%20Regency%20Mansion%20(£45,000,000)%0D%0A%0D%0ASterling%20Key%20Properties%20%26%20Asset%20Management`}
                    className="py-2.5 px-3.5 rounded-xl bg-transparent hover:bg-white/10 text-[#DDD4C6] hover:text-white border border-[#C5A880]/30 font-semibold text-xs tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                    title="Send a copy to your local mail app"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Send to My Mail App</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="py-2.5 px-3 rounded-xl bg-transparent hover:bg-white/10 text-[#DDD4C6] hover:text-white border border-[#C5A880]/20 font-semibold text-xs tracking-wider transition-all flex items-center gap-1.5 cursor-pointer sm:ml-auto"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>New Email</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Active Email Subscription Form */
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter private email..."
                  disabled={loading}
                  className="bg-[#142E54]/60 border border-[#C5A880]/30 rounded-xl px-4 py-3 text-sm text-[#FAF8F5] placeholder-[#DDD4C6]/60 focus:outline-none focus:border-[#C5A880] flex-1 font-mono transition-colors disabled:opacity-60"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#C5A880] hover:bg-[#D5BC98] disabled:bg-[#C5A880]/60 text-[#0A192F] px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap active:scale-95 shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#0A192F]" />
                      <span>Dispatching...</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Decorative luxury key silhouette watermark */}
          <div className="absolute right-0 top-0 bottom-0 opacity-5 pointer-events-none flex items-center pr-10 hidden md:flex">
            <svg viewBox="0 0 100 100" fill="none" className="w-80 h-80 text-[#C5A880]">
              <polygon points="50,8 88,24 88,76 50,92 12,76 12,24" stroke="currentColor" strokeWidth="2" />
              <circle cx="50" cy="36" r="13" stroke="currentColor" strokeWidth="2" />
              <line x1="50" y1="49" x2="50" y2="78" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Main Footer Navigation - 2 Columns on Small Screens (Side-by-Side), 12-Col on Desktop */}
        <div className="border-t border-[#E4DCD0] pt-12 pb-10 mb-8">
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-6 sm:gap-x-10 lg:gap-x-12 gap-y-10">
            {/* Column 1: Brand Identity (Full Width on Mobile, 4-Span on Desktop with Right Padding) */}
            <div className="col-span-2 lg:col-span-4 space-y-4 pr-0 lg:pr-6">
              <Logo size="md" variant="dark" />
              <p className="text-[#545B65] text-xs sm:text-sm leading-relaxed">
                Sterling Key Properties represents architectural masterworks, unlisted off-market treaties, and trophy residential assets across resilient sovereign havens.
              </p>
              <div className="space-y-1.5 text-xs text-[#545B65] pt-2 border-t border-[#E4DCD0]">
                <p><span className="font-semibold text-[#0A192F]">Private Desk:</span> <span className="font-mono text-[#0A192F]">+1 (800) 555-7837</span></p>
                <p><span className="font-semibold text-[#0A192F]">Global HQ:</span> 767 Fifth Avenue, New York</p>
              </div>
            </div>

            {/* Column 2: Portfolio (Side-by-side with Institutional on Small Screens) */}
            <div className="col-span-1 lg:col-span-2">
              <div className="text-[#0A192F] font-serif font-bold text-sm tracking-wide mb-4">
                Portfolio
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#545B65]">
                <li>
                  <Link href="/collection" className="hover:text-[#0A192F] transition-colors">
                    Browse Collections
                  </Link>
                </li>
                <li>
                  <Link href="/vault" className="hover:text-[#0A192F] transition-colors">
                    The Sovereign Vault
                  </Link>
                </li>
                <li>
                  <Link href="/destinations" className="hover:text-[#0A192F] transition-colors">
                    Global Flagships
                  </Link>
                </li>
                <li>
                  <Link href="/financials" className="hover:text-[#0A192F] transition-colors">
                    Valuation & Financials
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Institutional Services (Side-by-side with Portfolio on Small Screens) */}
            <div className="col-span-1 lg:col-span-2">
              <div className="text-[#0A192F] font-serif font-bold text-sm tracking-wide mb-4">
                Institutional
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#545B65]">
                <li>
                  <Link href="/management" className="hover:text-[#0A192F] transition-colors">
                    Asset Management
                  </Link>
                </li>
                <li>
                  <Link href="/advisory" className="hover:text-[#0A192F] transition-colors">
                    Private Advisory & Treaties
                  </Link>
                </li>
                <li>
                  <button onClick={handlePortal} className="hover:text-[#0A192F] transition-colors cursor-pointer text-left">
                    Client & Family Portal
                  </button>
                </li>
                <li>
                  <button onClick={handleSchedule} className="hover:text-[#0A192F] transition-colors cursor-pointer text-left">
                    Private Advisory Briefing
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Global Flagships (Side-by-side with Security Protocol on Small Screens) */}
            <div className="col-span-1 lg:col-span-2">
              <div className="text-[#0A192F] font-serif font-bold text-sm tracking-wide mb-4">
                Global Flagships
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#545B65]">
                <li>
                  <span className="font-semibold text-[#0A192F]">New York:</span> 767 Fifth Ave
                </li>
                <li>
                  <span className="font-semibold text-[#0A192F]">London:</span> 25 Berkeley Sq
                </li>
                <li>
                  <span className="font-semibold text-[#0A192F]">Miami Beach:</span> Brickell Ave
                </li>
                <li>
                  <span className="font-semibold text-[#0A192F]">Beverly Hills:</span> Wilshire Blvd
                </li>
                <li>
                  <span className="font-semibold text-[#0A192F]">Aspen:</span> Cooper Ave
                </li>
              </ul>
            </div>

            {/* Column 5: Security & Compliance (Side-by-side with Global Flagships on Small Screens) */}
            <div className="col-span-1 lg:col-span-2">
              <div className="text-[#0A192F] font-serif font-bold text-sm tracking-wide mb-4">
                Security Protocol
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#747D88]">
                <li className="flex items-center gap-1.5 text-[#0A192F] font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                  <span>Biometric Vault Access</span>
                </li>
                <li>Strict FINCEN Screening</li>
                <li>SHA-256 NDA Handshakes</li>
                <li>Sovereign Clearance</li>
                <li className="pt-1.5 text-[#C5A880] font-mono text-[10px] font-bold tracking-wider">
                  EQUAL HOUSING
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar - Two Stacked Centered Lines */}
        <div className="border-t border-[#E4DCD0] pt-8 flex flex-col items-center justify-center text-center text-[#545B65] text-xs sm:text-sm gap-3">
          {/* Line 1: Copyright & Legal Multipage Links (Centered) */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <p>
              © {new Date().getFullYear()} Sterling Key Properties & Asset Management LLC.
            </p>
            <span className="text-[#C5A880] hidden sm:inline">·</span>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <Link href="/privacy" className="text-[#545B65] hover:text-[#0A192F] font-medium transition-colors underline-offset-4 hover:underline">
                Privacy Policy
              </Link>
              <span className="text-[#E4DCD0]">·</span>
              <Link href="/terms" className="text-[#545B65] hover:text-[#0A192F] font-medium transition-colors underline-offset-4 hover:underline">
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Line 2: Developer Credit (Centered on New Line) */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#545B65]">
            <span>Developed with</span>
            <span className="text-red-500 animate-pulse text-sm">❤️</span>
            <span className="font-semibold text-[#1A1D20]">by Creyotech IT Services</span>
          </div>
        </div>
      </div>

      {/* Dossier Preview Modal */}
      {showDossierModal && subscribedData?.dossier && (
        <DossierPreviewModal
          dossier={subscribedData.dossier}
          onClose={() => setShowDossierModal(false)}
        />
      )}

      {/* Fallback Modals */}
      {internalPortalOpen && (
        <PortalModal onClose={() => setInternalPortalOpen(false)} />
      )}
      {internalScheduleOpen && (
        <ScheduleModal onClose={() => setInternalScheduleOpen(false)} />
      )}
    </footer>
  );
}
