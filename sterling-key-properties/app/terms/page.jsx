"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Scale, 
  ShieldCheck, 
  Lock, 
  Building2, 
  Landmark, 
  Briefcase, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Gavel, 
  DollarSign, 
  Award, 
  ArrowLeft,
  Key
} from "lucide-react";

export default function TermsPage() {
  const sections = [
    {
      id: "preamble",
      title: "1. Institutional Preamble & Acceptance of Fiduciary Terms",
      icon: Scale,
      content: `These Terms of Service & Fiduciary Governance Charter ("Terms", "Agreement") constitute a legally binding covenant between Sterling Key Properties & Asset Management LLC ("Sterling Key", "the Firm", "we", "our") and any institutional entity, sovereign principal, family office trustee, or authorized individual ("Client", "User", "You") accessing our digital platforms, confidential vault infrastructures, proprietary financial analytics engines, or private treaty escrows.

By accessing, browsing, unlocking, or submitting confidential instructions through any Sterling Key domain, API, or encrypted client portal, you affirmatively attest that you have read, understood, and irrevocably agreed to be governed by these Terms and our companion Privacy & Non-Disclosure Protocol.`
    },
    {
      id: "accredited",
      title: "2. Accredited Investor Verification & Qualified Purchaser Criteria",
      icon: Award,
      content: `Due to the multi-jurisdictional complexity and off-market nature of transactions curated by Sterling Key, access to designated tier-one acquisitions, fractional debt syndications, and private equity developments is strictly restricted to:
      • Accredited Investors as defined under Rule 501 of Regulation D promulgated under the United States Securities Act of 1933;
      • Qualified Purchasers as defined under Section 2(a)(51) of the Investment Company Act of 1940 ($5,000,000+ in investable assets);
      • Institutional Clients or High-Net-Worth Individuals as categorized under the United Kingdom Financial Services and Markets Act 2000 (FSMA) and MiFID II regulations in the European Union.

Principals utilizing our advisory services warrant that capital deployed represents bona fide unencumbered liquidity, cleared through tier-one central reserve or commercial banking institutions.`
    },
    {
      id: "vault",
      title: "3. The Sovereign Vault Protocols, Biometric Passcodes & Trade Secret Covenants",
      icon: Lock,
      content: `The Sovereign Vault contains confidential off-market pocket listings, diplomatic residences, sovereign treaties, and trophy assets represented outside public MLS registries. Access granted via biometric handshake or authorized demonstration keycode (e.g. STERLING2026) constitutes an express non-disclosure agreement.

Under the United States Defend Trade Secrets Act of 2016 (18 U.S.C. § 1836) and the Uniform Trade Secrets Act (UTSA):
      • Strict Confidentiality: You shall not take screenshots, extract raster telemetry, download vector CAD floorplans, or publish pricing matrices without explicit written consent from the Managing Director of Sterling Key.
      • Breach & Liquidated Damages: Any unauthorized disclosure or circumvention of our exclusive representation mandates shall entitle the Firm to immediate ex parte temporary injunctive relief, compensatory damages, and statutory liquidated damages of not less than 2.5% of the total underlying asset valuation.`
    },
    {
      id: "representations",
      title: "4. Property Representations, Architectural CAD Blueprints & Analytical Disclaimers",
      icon: Building2,
      content: `While Sterling Key utilizes state-of-the-art LiDAR topographical surveys, institutional drone photogrammetry, and verified county deed registries:
      • Analytical Projections: Historical cap rates, projected rental yields (e.g. 4.8% to 7.8%), 10-year Net Operating Income (NOI) models, and internal rate of return (IRR) figures displayed on our platform are estimations generated for modeling purposes only.
      • No Guarantees of Future Valuation: Real estate investments are inherently subject to macroeconomic fluctuations, municipal zoning variances, and currency exchange rates.
      • Independent Survey Obligation: Every principal is encouraged to retain independent certified land surveyors, MEP engineering consultants, structural architects, and legal counsel prior to releasing non-refundable earnest money deposits.`
    },
    {
      id: "escrow",
      title: "5. Earnest Money Escrow, Bank-to-Bank SWIFT MT103 Protocols & Title Verification",
      icon: DollarSign,
      content: `All acquisitions, private tenders, and reservation retainers initiated through Sterling Key are executed under strict escrow protections:
      • Institutional Escrow Depositaries: Earnest money funds are held exclusively by chartered, FDIC-insured institutional escrow agents (including First American Title, Chicago Title, and Stewart Title) in dedicated segregated interest-bearing accounts.
      • SWIFT MT103 Authentication: Wire transfers must originate from accounts registered in the exact legal name of the verified purchasing principal or designated asset holding LLC/Trust, accompanied by clean SWIFT MT103 confirmation traces.
      • ALTA Title Policy: Every transaction is conditioned upon issuance of an unencumbered American Land Title Association (ALTA) Owner's Policy of Title Insurance, free of mechanics' liens, municipal lis pendens, or undisclosed easements.`
    },
    {
      id: "management",
      title: "6. Institutional Property Management Service Level Agreements (SLA)",
      icon: Briefcase,
      content: `Clients engaging Sterling Key for full-spectrum asset management and luxury leasing benefit from our Greystar-grade institutional SLA covenants:
      • Portfolio Occupancy Benchmark: We target a 99.4% cross-portfolio occupancy rate across prime global residential markets, backed by institutional tenant vetting algorithms.
      • Rapid Resident Placement: Average placement cycles are maintained at approximately 18 days for qualified premier tier occupants.
      • Zero Repair Markups: Sterling Key operates under an open-book fiduciary standard. All third-party structural maintenance, MEP servicing, and estate landscaping are billed at direct contractor invoice cost with 0% vendor markup.
      • Emergency Concierge Response: 24/7/365 dedicated engineering and physical security dispatch with guaranteed 45-minute response times for critical estate infrastructure.`
    },
    {
      id: "advisory",
      title: "7. Family Office Advisory, Cross-Border Treaties & Sovereign Tax Shields",
      icon: Landmark,
      content: `Our Family Office Advisory practice advises on cross-border real estate holdings, statutory wealth preservation, and institutional portfolio structuring:
      • Informational Scope: Guidance regarding Section 1031 Like-Kind Exchanges, Delaware Statutory Trusts (DSTs), Foreign Investment in Real Property Tax Act (FIRPTA) exemptions, and Swiss Private Wealth Shields is provided for strategic portfolio planning.
      • Independent Tax Counsel: Sterling Key does not serve as a certified public accounting firm or formal tax authority. Principals must ratify all cross-border structures with their respective jurisdictional tax attorneys.
      • Conflict of Interest Avoidance: In any dual-agency or multi-principal scenario, Sterling Key provides full statutory disclosure and maintains segregated deal teams to prevent information spillage.`
    },
    {
      id: "aml",
      title: "8. Anti-Money Laundering (AML), FINCEN GTOs & OFAC Sanctions Compliance",
      icon: ShieldCheck,
      content: `Sterling Key enforces rigorous compliance with federal and international anti-financial crime statutes:
      • FINCEN Geographic Targeting Orders: In mandatory US metro jurisdictions (New York, Miami-Dade, Los Angeles), we collect certified Corporate Transparency Act beneficial ownership disclosures identifying every individual holding a 25%+ equity interest.
      • Sanctions Screening: All buyers, sellers, trustees, and authorized signatories are screened against the United States Office of Foreign Assets Control (OFAC) Specially Designated Nationals (SDN) list, United Nations sanctions lists, and UK HM Treasury consolidated asset freeze registers.
      • Refusal of Service: Sterling Key reserves the unqualified right to freeze or terminate any escrow transaction if unverified, anonymous, or sanctioned capital sources are detected.`
    },
    {
      id: "ip",
      title: "9. Intellectual Property, CAD Vector Blueprints & Media Rights",
      icon: FileText,
      content: `All design collateral, typography, proprietary algorithms, 3D interactive virtual tour models, high-altitude drone cinematics, and brand emblems (including the Sterling Key Octagonal Keymark) are the exclusive intellectual property of Sterling Key Properties & Asset Management LLC.
      
Clients are granted a revocable, non-exclusive, non-transferable internal license to review portfolio dossiers for the sole purpose of private evaluation. Reverse engineering of our automated yield calculators, scraping of proprietary listing feeds, or automated harvesting via bots or AI scrapers without written API authorization is strictly prohibited.`
    },
    {
      id: "indemnity",
      title: "10. Limitation of Fiduciary Liability & Mutual Indemnification",
      icon: AlertCircle,
      content: `To the maximum extent permitted by applicable law, Sterling Key, its managing members, directors, affiliates, and institutional partners shall not be held liable for indirect, incidental, special, consequential, or punitive damages arising out of:
      • Technical downtime or temporary unreachability of digital client portals;
      • Unforeseen force majeure events, municipal rezoning, environmental seismic occurrences, or sovereign geopolitical sanctions;
      • Acts or omissions of third-party escrow title companies, general contractors, or appraisal inspectors.
      
Client agrees to defend, indemnify, and hold harmless Sterling Key from and against any third-party claims arising from Client's intentional breach of confidentiality or misrepresentation of accredited financial liquidity.`
    },
    {
      id: "arbitration",
      title: "11. Binding Commercial Arbitration (JAMS Manhattan, NY) & Class Action Waiver",
      icon: Gavel,
      content: `Any dispute, claim, or controversy arising out of or relating to this Agreement or the breach, termination, enforcement, interpretation, or validity thereof shall be determined by private binding commercial arbitration administered by JAMS in Manhattan, New York:
      • Single Arbitrator: The arbitration shall be conducted before a single retired federal or state appellate judge experienced in commercial real estate.
      • Expedited Procedures: JAMS Comprehensive Arbitration Rules & Procedures shall govern, and hearings may be conducted virtually or at the JAMS New York resolution center.
      • Class Action Waiver: You and Sterling Key agree that each may bring claims against the other only in an individual capacity, and not as a plaintiff or class member in any purported class, collective, or representative proceeding.`
    },
    {
      id: "severability",
      title: "12. Amendments, Severability, Statutory Supremacy & Executed Private Treaties",
      icon: CheckCircle2,
      content: `Sterling Key reserves the prerogative to amend or modernize these Terms to reflect legislative changes, judicial rulings, or expanded sovereign operations. Updated versions will be published with an updated Effective Date.

If any provision of these Terms is deemed unlawful or unenforceable by an arbitrator or competent tribunal, that provision shall be enforced to the maximum extent permissible, and the remaining provisions shall remain in full force. In the event of a direct conflict between these Terms and an executed Private Treaty Purchase & Sale Agreement, the terms of the executed Private Treaty Agreement shall supersede and govern.`
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
            <Scale className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Institutional Governance · Fiduciary Charter</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#0A192F] font-bold tracking-tight mb-4">
            Terms of Service & Advisory Protocols
          </h1>
          <p className="text-sm sm:text-base text-[#545B65] leading-relaxed max-w-3xl">
            Governing Entity: Sterling Key Properties & Asset Management LLC · Effective Date: January 1, 2026 · Multi-Jurisdictional Scope: United States, United Kingdom, European Union, Switzerland, United Arab Emirates, and The Bahamas.
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
                Executive Fiduciary Overview for Family Offices & Trustees
              </h3>
              <p className="text-xs sm:text-sm text-[#DDD4C6] leading-relaxed">
                Sterling Key enforces institutional diligence across every engagement: unlisted assets inside The Sovereign Vault are protected under federal trade secrets statutes, escrow deposits are verified via bank-to-bank SWIFT MT103 protocols, and asset management operates with 0% maintenance markups and a 99.4% occupancy commitment.
              </p>
            </div>
          </div>
        </div>

        {/* 12 Elaborated Sections */}
        <div className="space-y-6 sm:space-y-8">
          {sections.map((sec) => {
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

        {/* Closing Contact & Compliance Card */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] border border-[#C5A880]/40 text-center space-y-3">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#0A192F] text-[#C5A880] mx-auto mb-1">
            <Key className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-serif font-bold text-[#0A192F]">
            Direct Inquiries to Office of General Counsel
          </h3>
          <p className="text-xs sm:text-sm text-[#545B65] max-w-xl mx-auto">
            Questions regarding private treaty covenants, JAMS arbitration clauses, or institutional property management agreements should be submitted directly to our legal desk at <a href="mailto:legal@sterlingkey.com" className="text-[#0A192F] font-semibold underline">legal@sterlingkey.com</a> or via our Manhattan Flagship Chambers at +1 (212) 791-8840.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
