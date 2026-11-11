"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  ArrowLeft, 
  Key, 
  Scale, 
  CheckCircle2, 
  Database, 
  Globe2, 
  UserCheck, 
  AlertTriangle 
} from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    {
      id: "charter",
      title: "1. Institutional Charter & Fiduciary Scope",
      icon: ShieldCheck,
      content: `Sterling Key Properties & Asset Management LLC ("Sterling Key", "the Firm", "we", "our") operates as a private multi-jurisdictional fiduciary advisory managing in excess of $4.8B in trophy real estate, sovereign pocket listings, and institutional developments. This Privacy & Confidentiality Protocol establishes our unyielding commitment to maintaining the absolute discretion and anonymity of family offices, ultra-high-net-worth (UHNW) principals, sovereign wealth entities, and institutional trust beneficiaries.`
    },
    {
      id: "nda",
      title: "2. The Sovereign Vault & Non-Disclosure (NDA) Protocol",
      icon: Lock,
      content: `Access to unadvertised assets within The Sovereign Vault is strictly governed under a mutual, legally binding non-disclosure protocol executed upon entering an authorized family office keycode (e.g. STERLING2026) or biometric authorization. Any architectural CAD blueprints, offshore trust ownership structures, private treaty valuations, or high-resolution drone telemetry retrieved through this platform constitute protected trade secrets under the Defend Trade Secrets Act (18 U.S.C. § 1836) and international commercial conventions. Unauthorized dissemination, capture, or distribution is subject to immediate injunctive relief and liquidated statutory damages.`
    },
    {
      id: "data-collected",
      title: "3. Categories of Sovereign Data Collected",
      icon: Database,
      content: `To execute private treaty escrows, private jet showing logistics, and Greystar-grade institutional property management, we collect:
      • Accredited Principal Verification: Government-issued identification, certified beneficial ownership registers, and accredited investor documentation under SEC Rule 501 / UK FSMA.
      • Financial Capability Attestations: Bank-to-bank comfort letters, proof of unencumbered liquidity, and verified SWIFT MT103 transaction traces.
      • Digital Protocol Telemetry: SHA-256 handshake verification, encrypted session tokens, and biometric entry timestamps to ensure vault integrity.
      • Showing Logistics: Private aviation flight manifests, executive security detail clearances, and diplomatic liaison requirements.`
    },
    {
      id: "zero-monetization",
      title: "4. Absolute Zero Commercial Monetization Guarantee",
      icon: CheckCircle2,
      content: `Under no circumstances has Sterling Key ever licensed, traded, monetized, or shared client personal data, inquiry histories, or acquisition mandates with third-party advertising exchanges, data brokers, or marketing networks. Our revenue model derives exclusively from accredited advisory retainers, private treaty transaction fees, and institutional property asset management distributions.`
    },
    {
      id: "encryption",
      title: "5. Encryption Infrastructure & Cross-Border Cloud Security",
      icon: Key,
      content: `All client records, appraisal models, and private correspondence are protected by military-grade AES-256 bit encryption at rest and TLS 1.3 encryption in transit. Our database infrastructure is partitioned across hardened private sovereign cloud enclaves located in New York, Zurich, and London, featuring automated intrusion detection, HSM key rotation, and air-gapped cryptographic escrow archives.`
    },
    {
      id: "compliance",
      title: "6. Anti-Money Laundering (AML) & FINCEN Compliance",
      icon: Scale,
      content: `In compliance with the United States Department of the Treasury Financial Crimes Enforcement Network (FINCEN) Real Estate Geographic Targeting Orders (GTOs) and international Financial Action Task Force (FATF) standards, the Firm conducts confidential anti-money laundering and Counter-Terrorist Financing (CTF) verification on all capital allocations prior to closing.`
    },
    {
      id: "cookies",
      title: "7. Session Cookies & Zero Ad-Pixel Tracking",
      icon: Eye,
      content: `Our portal utilizes strictly essential, encrypted session cookies required to verify authenticated vault passcodes, maintain client preferences (such as USD, GBP, EUR, AED currency conversions and imperial/metric toggles), and prevent automated brute-force attacks. We do not embed Meta Pixel, Google AdSense, or third-party behavioral trackers.`
    },
    {
      id: "rights",
      title: "8. Global Statutory Client Rights (GDPR, CCPA/CPRA, Swiss FADP)",
      icon: Globe2,
      content: `Regardless of your domicile, Sterling Key extends comprehensive privacy rights to all principals:
      • Right to Inspect: You may demand an exhaustive ledger of all records associated with your family office dossier.
      • Right to Fiduciary Rectification: Immediate correction of beneficial ownership or asset valuation logs.
      • Right to Complete Erasure: Upon conclusion of regulatory escrow record-keeping mandates, principals may request permanent cryptographic shredding of all digital dossiers.`
    },
    {
      id: "retention",
      title: "9. Regulatory Retention Lifecycle & Expungement",
      icon: AlertTriangle,
      content: `Transaction dossiers, escrow closing statements, and anti-money laundering compliance records are retained for a statutory period of seven (7) years in accordance with federal real estate and banking regulations, after which all files are purged via DOD 5220.22-M sanitization protocols.`
    },
    {
      id: "contact",
      title: "10. Office of the Chief Compliance Officer",
      icon: UserCheck,
      content: `For formal compliance inquiries, private audit requests, or to exercise statutory privacy rights, please submit an encrypted communique to:
      Sterling Key Properties & Asset Management LLC
      Attn: Office of the Chief Compliance Officer & General Counsel
      Flagship Chambers: 767 Fifth Avenue, Penthouse 50, New York, NY 10153
      Confidential Desk: compliance@sterlingkey.com | Direct Line: +1 (212) 791-8840`
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1D20] flex flex-col font-sans selection:bg-[#C5A880]/30 selection:text-[#0A192F]">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-8 py-10 sm:py-16">
        {/* Navigation Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#545B65] hover:text-[#0A192F] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 text-[#C5A880]" />
          <span>Return to Homepage</span>
        </Link>

        {/* Header Hero */}
        <div className="mb-10 sm:mb-14 pb-8 border-b border-[#E4DCD0]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A192F] text-[#FAF8F5] text-xs font-mono uppercase tracking-widest mb-4 shadow-sm">
            <Lock className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Sovereign Confidentiality Protocol · Institutional Grade</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#0A192F] font-bold tracking-tight mb-4">
            Privacy Policy & Fiduciary Non-Disclosure Charter
          </h1>
          <p className="text-sm sm:text-base text-[#545B65] leading-relaxed max-w-3xl">
            Governing Entity: Sterling Key Properties & Asset Management LLC · Last Revised: November 2026 · Multi-Jurisdictional Scope: United States, United Kingdom, European Union, Switzerland, United Arab Emirates, and The Bahamas.
          </p>
        </div>

        {/* Quick Summary Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0A192F] text-white border border-[#C5A880]/40 shadow-xl mb-12">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#C5A880] shrink-0 border border-[#C5A880]/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#FAF8F5]">
                Executive Summary for Family Offices & Principals
              </h3>
              <p className="text-xs sm:text-sm text-[#DDD4C6] leading-relaxed">
                Sterling Key does not sell data, track browsing across external websites, or disclose beneficial ownership without statutory subpoena. Unlisted pocket listings within The Sovereign Vault are protected under federal trade secret statutes. All private treaty records are secured with AES-256 military-grade encryption.
              </p>
            </div>
          </div>
        </div>

        {/* Elaborated Sections Grid */}
        <div className="space-y-6 sm:space-y-8">
          {sections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <section
                key={sec.id}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E4DCD0] shadow-xs hover:border-[#C5A880]/60 transition-colors space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] border border-[#E4DCD0] flex items-center justify-center text-[#C5A880] shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-serif text-[#0A192F] font-bold">
                    {sec.title}
                  </h2>
                </div>
                <div className="text-xs sm:text-sm text-[#383E46] leading-relaxed whitespace-pre-line pl-0 sm:pl-12">
                  {sec.content}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
