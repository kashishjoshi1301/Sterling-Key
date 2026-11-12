"use client";

import React, { useState, useEffect } from "react";
import { 
  X, 
  ShieldCheck, 
  Building2, 
  FileText, 
  CheckCircle2, 
  Landmark, 
  DollarSign, 
  Calendar, 
  UserCheck, 
  ArrowRight, 
  ArrowLeft, 
  Download, 
  Lock, 
  Award,
  Sparkles,
  Phone,
  Mail,
  Scale,
  KeyRound
} from "lucide-react";
import { useCurrency } from "./CurrencyContext";
import { useToast } from "./Toast";
import { useTransaction } from "./TransactionContext";
import { useScrollLock } from "./useScrollLock";

export default function AcquisitionModal({ 
  isOpen, 
  onClose, 
  property, 
  initialMode = "buy" 
}) {
  const { formatRawPrice } = useCurrency();
  const { addToast } = useToast();
  const { buyProperty, rentProperty, getTreaty } = useTransaction();

  // Mode: "buy" (Acquisition Treaty) or "rent" (Luxury Lease Mandate)
  const [mode, setMode] = useState(initialMode);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [treatyRef, setTreatyRef] = useState("");

  // Step 1: Principal & Representation
  const [principalName, setPrincipalName] = useState("");
  const [entityType, setEntityType] = useState("Individual / Personal Capacity");
  const [entityName, setEntityName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [domicile, setDomicile] = useState("United States");
  const [representation, setRepresentation] = useState("Direct Principal (Self-Represented)");

  // Step 2: Financial Terms
  const [customPrice, setCustomPrice] = useState("");
  const [settlementMethod, setSettlementMethod] = useState("100% Cash / Fedwire Tier-1 Settlement");
  const [closingHorizon, setClosingHorizon] = useState("30 Calendar Days (Standard Institutional Escrow)");
  const [contingency, setContingency] = useState("Unconditional / As-Is Contract (Priority Escrow Queue)");
  
  // Lease specific terms
  const [leaseTerm, setLeaseTerm] = useState("12 Months (Standard Ultra-Luxury Lease)");
  const [commenceDate, setCommenceDate] = useState("Immediate Occupancy (Within 14 Days)");
  const [reqButler, setReqButler] = useState(true);
  const [reqChauffeur, setReqChauffeur] = useState(true);
  const [reqSecurity, setReqSecurity] = useState(true);

  // Step 3: Proof of Funds & Custodian
  const [custodianBank, setCustodianBank] = useState("J.P. Morgan Private Bank");
  const [bankOfficer, setBankOfficer] = useState("");
  const [fundsCertified, setFundsCertified] = useState(false);

  // Step 4: Digital Signature & Legal Attestation
  const [signatureName, setSignatureName] = useState("");
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [signatureDate, setSignatureDate] = useState("");

  useScrollLock(isOpen, onClose);

  // Sync mode and prefilled prices on open
  useEffect(() => {
    if (isOpen && property) {
      const activeMode = initialMode === "rent" && property.rentalPrice ? "rent" : "buy";
      setMode(activeMode);
      setCustomPrice(activeMode === "buy" ? String(property.price) : property.rentalPrice || "");
      setStep(1);
      setIsSubmitting(false);

      // Check if this property already has an existing treaty
      const existingTreaty = getTreaty(property.id);
      if (existingTreaty) {
        setTreatyRef(existingTreaty.treatyRef);
        setPrincipalName(existingTreaty.principalName || "");
        setEntityType(existingTreaty.entityType || "Individual / Personal Capacity");
        setEntityName(existingTreaty.entityName || "");
        setEmail(existingTreaty.email || "");
        setPhone(existingTreaty.phone || "");
        setMode(existingTreaty.mode || activeMode);
        setStep(5); // Show confirmation dossier directly if already acquired
      } else {
        const randomRef = `SK-${activeMode === "buy" ? "ACQ" : "LEASE"}-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        setTreatyRef(randomRef);
        setSignatureDate(new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        }));
      }
    }
  }, [isOpen, property, initialMode, getTreaty]);

  if (!isOpen || !property) return null;

  // Validation
  const validateStep1 = () => {
    if (!principalName.trim()) {
      addToast("Please provide the full legal name of the principal", "error", "Required Field");
      return false;
    }
    if (!email.trim() || !email.includes("@")) {
      addToast("Please provide a valid encrypted email for escrow deeds", "error", "Required Field");
      return false;
    }
    if (!phone.trim()) {
      addToast("Please provide a direct telephone or private line", "error", "Required Field");
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!fundsCertified) {
      addToast("Please certify that liquid unencumbered funds are held with the custodian", "error", "Certification Required");
      return false;
    }
    return true;
  };

  const validateStep4 = () => {
    if (!signatureName.trim()) {
      addToast("Please type your legal name to execute the digital signature", "error", "Signature Required");
      return false;
    }
    if (!agreedTerms) {
      addToast("Please agree to the Sterling Key Private Treaty Terms & FINCEN Protocols", "error", "Agreement Required");
      return false;
    }
    return true;
  };

  // Execution of Treaty
  const handleExecuteTreaty = () => {
    if (!validateStep4()) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const treatyData = {
        treatyRef,
        mode,
        propertyId: property.id,
        propertyTitle: property.title,
        propertyPrice: property.price,
        propertyRentalPrice: property.rentalPrice,
        principalName,
        entityType,
        entityName: entityName || principalName,
        email,
        phone,
        domicile,
        representation,
        settlementMethod: mode === "buy" ? settlementMethod : "Monthly Wire / Qualified Escrow",
        closingHorizon: mode === "buy" ? closingHorizon : leaseTerm,
        custodianBank,
        signatureName,
        signatureDate,
        agent: property.agent,
        executedAt: new Date().toISOString()
      };

      if (mode === "buy") {
        buyProperty(property.id, treatyData);
        addToast(
          `Treaty ${treatyRef} executed! ${property.title} is now SOLD OUT & placed in Escrow`,
          "success",
          "Acquisition Treaty Executed"
        );
      } else {
        rentProperty(property.id, treatyData);
        addToast(
          `Lease Mandate ${treatyRef} secured! ${property.title} is now CURRENTLY UNAVAILABLE`,
          "success",
          "Lease Mandate Executed"
        );
      }

      setIsSubmitting(false);
      setStep(5);
    }, 1200);
  };

  // Download official treaty dossier text document
  const handleDownloadTreaty = () => {
    const content = `================================================================================
STERLING KEY PROPERTIES & PRIVATE CLIENT ADVISORY
OFFICIAL PRIVATE TREATY & BINDING ESCROW DOSSIER
================================================================================

TREATY REFERENCE: ${treatyRef}
EXECUTION STATUS: EXECUTED & ESCROW INITIATED
TIMESTAMP: ${new Date().toLocaleString()}
JURISDICTION: FINCEN / BSA INSTITUTIONAL COMPLIANCE PROTOCOL

--------------------------------------------------------------------------------
1. PRIME ASSET SPECIFICATION
--------------------------------------------------------------------------------
Asset Title: ${property.title}
Architectural Tagline: "${property.tagline || ""}"
Municipal Address: ${property.address}, ${property.neighborhood}, ${property.city}, ${property.state || ""} ${property.zip || ""}
Transaction Category: ${mode === "buy" ? "EXCLUSIVE SOVEREIGN ACQUISITION (PURCHASE)" : "SOVEREIGN DIPLOMATIC LEASE MANDATE"}
Valuation Consideration: ${mode === "buy" ? formatRawPrice(property.price) : property.rentalPrice}
Earnest Escrow Deposit: ${mode === "buy" ? "10% Liquid Cash Escrow Commitment" : "2 Months Security Deposit + First Month Advance"}

--------------------------------------------------------------------------------
2. PRINCIPAL & ACQUIRING ENTITY
--------------------------------------------------------------------------------
Principal Legal Name: ${principalName}
Acquiring Entity Vehicle: ${entityType}
Entity / Trust Designation: ${entityName || "Direct Personal Capacity"}
Primary Tax Domicile: ${domicile}
Title Encrypted Contact: ${email} · ${phone}
Legal Representation: ${representation}

--------------------------------------------------------------------------------
3. SETTLEMENT STRUCTURE & CUSTODIAL REPOSITORY
--------------------------------------------------------------------------------
Settlement Instrument: ${mode === "buy" ? settlementMethod : "Direct Federal Wire / Escrow Impound"}
Escrow Horizon / Term: ${mode === "buy" ? closingHorizon : leaseTerm}
Qualified Depository Bank: ${custodianBank}
${bankOfficer ? `Bank Officer Reference: ${bankOfficer}\n` : ""}Escrow Underwriter: First American Title Insurance Company & Sovereign Trust Escrow
Depository Liquidity Status: CERTIFIED & UNENCUMBERED

--------------------------------------------------------------------------------
4. LEGAL CERTIFICATION & DIGITAL EXECUTION
--------------------------------------------------------------------------------
Digitally Executed By: ${signatureName}
Execution Date: ${signatureDate}
Biometric/Cryptographic Hash: SHA-256 [VERIFIED]
Legal Declaration: The Principal certifies that all declarations are accurate under 
penalty of perjury, and that the Asset is placed into irrevocable off-market escrow.

--------------------------------------------------------------------------------
5. ASSIGNED MANAGING DIRECTOR & ESCROW OFFICER
--------------------------------------------------------------------------------
Lead Managing Director: ${property.agent?.name || "Julian Vance"}
Institutional Role: ${property.agent?.title || "Senior Vice President | Luxury Estates"}
Direct Private Wire: ${property.agent?.phone || "+1 (310) 849-2910"}
Direct Encrypted Inquiries: ${property.agent?.email || "advisory@sterlingkey.com"}

================================================================================
CONFIDENTIAL NOTICE: This document contains privileged institutional treaty data.
Sterling Key Properties LLC. All rights reserved.
================================================================================`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${treatyRef}_Sterling_Key_Dossier.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addToast(`Official Treaty Dossier ${treatyRef} downloaded to device`, "success", "Dossier Decrypted");
  };

  const earnestAmount = mode === "buy" 
    ? Math.round(property.price * 0.1) 
    : null;

  return (
    <div 
      className="fixed inset-0 z-[80] bg-[#0A192F]/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in overscroll-contain"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] bg-[#FAF8F5] border border-[#E4DCD0] rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#1A1D20]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#0A192F] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#060D18] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#C5A880] border border-[#C5A880]/30 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#C5A880]">
                Private Treaty Protocol • Institutional Escrow
              </div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-white tracking-tight">
                {mode === "buy" ? "Asset Acquisition Treaty" : "Sovereign Lease Mandate"}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
            title="Close Protocol"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Property Context Strip & Mode Switcher */}
        <div className="bg-white border-b border-[#E4DCD0] p-3 sm:px-6 sm:py-3.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <img 
              src={property.images?.[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80"} 
              alt={property.title} 
              className="w-12 h-10 sm:w-14 sm:h-11 rounded-lg object-cover border border-[#E4DCD0] shrink-0" 
            />
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-serif font-bold text-[#0A192F] truncate">
                {property.title}
              </div>
              <div className="text-[11px] text-[#747D88] truncate font-sans">
                {property.address}, {property.city}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {step < 5 && property.rentalPrice && (
              <div className="inline-flex rounded-xl p-1 bg-[#F3EFEA] border border-[#E4DCD0] text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setMode("buy")}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    mode === "buy" 
                      ? "bg-[#0A192F] text-white shadow-xs" 
                      : "text-[#545B65] hover:text-[#0A192F]"
                  }`}
                >
                  Acquire ({formatRawPrice(property.price)})
                </button>
                <button
                  type="button"
                  onClick={() => setMode("rent")}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    mode === "rent" 
                      ? "bg-[#0A192F] text-white shadow-xs" 
                      : "text-[#545B65] hover:text-[#0A192F]"
                  }`}
                >
                  Lease ({property.rentalPrice})
                </button>
              </div>
            )}
            <div className="text-right hidden sm:block">
              <div className="text-[10px] font-mono uppercase text-[#747D88]">Official Consideration</div>
              <div className="text-sm font-bold font-serif text-[#0A192F]">
                {mode === "buy" ? formatRawPrice(property.price) : property.rentalPrice}
              </div>
            </div>
          </div>
        </div>

        {/* Step Indicator (Steps 1 to 4) */}
        {step < 5 && (
          <div className="bg-[#FAF8F5] border-b border-[#E4DCD0] px-4 sm:px-8 py-2.5 shrink-0">
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { num: 1, label: "Principal & Entity" },
                { num: 2, label: "Financial Terms" },
                { num: 3, label: "Custodian & Funds" },
                { num: 4, label: "Sign & Execute" },
              ].map((s) => (
                <div 
                  key={s.num} 
                  className={`flex flex-col items-center pb-1 border-b-2 transition-all ${
                    step === s.num 
                      ? "border-[#C5A880] text-[#0A192F] font-bold" 
                      : step > s.num 
                        ? "border-[#0A192F] text-[#0A192F]" 
                        : "border-transparent text-[#747D88]"
                  }`}
                >
                  <span className="text-[10px] font-mono">Stage 0{s.num}</span>
                  <span className="text-xs truncate max-w-full hidden sm:inline">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scrollable Step Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
          {/* STEP 1: PRINCIPAL & REPRESENTATION */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#0A192F]">
                  Principal Identification & Legal Holding Vehicle
                </h3>
                <p className="text-xs sm:text-sm text-[#545B65] mt-1">
                  Sterling Key requires verified principal credentials to issue an off-market Letter of Intent and initialize title escrow.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#545B65] mb-1 font-bold">
                    Full Legal Name of Principal *
                  </label>
                  <input
                    type="text"
                    required
                    value={principalName}
                    onChange={(e) => setPrincipalName(e.target.value)}
                    placeholder="e.g. Lord Julian Vance / Kashish Mehta"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E4DCD0] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] text-sm text-[#0A192F] outline-hidden shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#545B65] mb-1 font-bold">
                    Acquiring Vehicle Structure
                  </label>
                  <select
                    value={entityType}
                    onChange={(e) => setEntityType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E4DCD0] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] text-sm text-[#0A192F] outline-hidden shadow-2xs"
                  >
                    <option value="Individual / Personal Capacity">Individual / Personal Capacity</option>
                    <option value="Private Family Office">Single/Multi Family Office</option>
                    <option value="Revocable / Irrevocable Asset Trust">Irrevocable Asset Preservation Trust</option>
                    <option value="Institutional LLC / Offshore Corp">Institutional LLC / Offshore Corporation</option>
                    <option value="Sovereign Wealth Vehicle">Sovereign / Diplomatic Entity</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#545B65] mb-1 font-bold">
                    Holding Entity / Trust Name
                  </label>
                  <input
                    type="text"
                    value={entityName}
                    onChange={(e) => setEntityName(e.target.value)}
                    placeholder="e.g. Apex Sovereign Capital Trust LLC"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E4DCD0] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] text-sm text-[#0A192F] outline-hidden shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#545B65] mb-1 font-bold">
                    Confidential Escrow Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#747D88] absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="principal@familyoffice.com"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border border-[#E4DCD0] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] text-sm text-[#0A192F] outline-hidden shadow-2xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#545B65] mb-1 font-bold">
                    Direct Private Line / Signal *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#747D88] absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 019-2834"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border border-[#E4DCD0] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] text-sm text-[#0A192F] outline-hidden shadow-2xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#545B65] mb-1 font-bold">
                    Primary Tax Jurisdiction
                  </label>
                  <select
                    value={domicile}
                    onChange={(e) => setDomicile(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E4DCD0] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] text-sm text-[#0A192F] outline-hidden shadow-2xs"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Singapore">Singapore</option>
                    <option value="European Union">European Union</option>
                    <option value="Cayman Islands">Cayman Islands / Offshore</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#545B65] mb-1 font-bold">
                    Advisory Representation
                  </label>
                  <select
                    value={representation}
                    onChange={(e) => setRepresentation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E4DCD0] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] text-sm text-[#0A192F] outline-hidden shadow-2xs"
                  >
                    <option value="Direct Principal (Self-Represented)">Direct Principal (Self-Represented)</option>
                    <option value="External Family Office Legal Counsel">External General Counsel</option>
                    <option value="Private Wealth Managing Director">Private Wealth Managing Partner</option>
                  </select>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F3EFEA] border border-[#E4DCD0] flex items-center gap-3">
                <Lock className="w-5 h-5 text-[#C5A880] shrink-0" />
                <span className="text-xs text-[#545B65]">
                  All client identity documents are encrypted under AES-256 and subject to reciprocal non-disclosure protections.
                </span>
              </div>
            </div>
          )}

          {/* STEP 2: FINANCIAL TERMS & SETTLEMENT */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#0A192F]">
                  {mode === "buy" ? "Acquisition Settlement & Horizon" : "Lease Consideration & Terms"}
                </h3>
                <p className="text-xs sm:text-sm text-[#545B65] mt-1">
                  Specify consideration structure, settlement instrument, and closing timelines.
                </p>
              </div>

              {mode === "buy" ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white border border-[#E4DCD0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#747D88]">Sovereign Asking Consideration</div>
                      <div className="text-xl sm:text-2xl font-serif font-bold text-[#0A192F]">
                        {formatRawPrice(property.price)}
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A192F]/5 border border-[#0A192F]/10 text-xs font-mono text-[#0A192F]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>100% Asking Price Matched</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#545B65] mb-1 font-bold">
                      Settlement Instrument / Wire Protocol
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        { id: "100% Cash / Fedwire Tier-1 Settlement", title: "100% Cash Fedwire", desc: "Same-day federal reserve liquidity wire" },
                        { id: "Sovereign Treasury Escrow / Letter of Credit", title: "Sovereign Escrow LOC", desc: "Irrevocable letter of credit through qualified trustee" },
                        { id: "Private Banking Syndicate Facility", title: "Private Banking Jumbo Facility", desc: "Underwritten by J.P. Morgan / UBS Wealth Management" },
                        { id: "Cryptographic Qualified Settlement (USDC)", title: "Cryptographic USDC Escrow", desc: "Fidelity Digital / Anchorage qualified custody" }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSettlementMethod(item.id)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            settlementMethod === item.id 
                              ? "bg-white border-[#C5A880] ring-1 ring-[#C5A880] shadow-xs" 
                              : "bg-[#FAF8F5] border-[#E4DCD0] hover:bg-white"
                          }`}
                        >
                          <div className="text-xs font-bold text-[#0A192F]">{item.title}</div>
                          <div className="text-[11px] text-[#747D88] mt-0.5">{item.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#545B65] mb-1 font-bold">
                        Target Escrow Closing Horizon
                      </label>
                      <select
                        value={closingHorizon}
                        onChange={(e) => setClosingHorizon(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E4DCD0] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] text-sm text-[#0A192F] outline-hidden shadow-2xs"
                      >
                        <option value="14 Calendar Days (Expedited Sovereign Settlement)">14 Calendar Days (Expedited Priority)</option>
                        <option value="30 Calendar Days (Standard Institutional Escrow)">30 Calendar Days (Standard Institutional)</option>
                        <option value="60 Calendar Days (Structured Sovereign Transfer)">60 Calendar Days (Multi-Jurisdiction Structured)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#545B65] mb-1 font-bold">
                        Contractual Contingencies
                      </label>
                      <select
                        value={contingency}
                        onChange={(e) => setContingency(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E4DCD0] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] text-sm text-[#0A192F] outline-hidden shadow-2xs"
                      >
                        <option value="Unconditional / As-Is Contract (Priority Escrow Queue)">Unconditional / As-Is (Priority Queue)</option>
                        <option value="7-Day Architectural Survey & Title Contingency">7-Day Architectural & Title Survey</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                /* LEASE TERMS */
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white border border-[#E4DCD0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#747D88]">Monthly Lease Rate</div>
                      <div className="text-xl sm:text-2xl font-serif font-bold text-[#0A192F]">
                        {property.rentalPrice}
                      </div>
                    </div>
                    <div className="text-xs font-mono text-[#545B65]">
                      Includes 24/7 Estate Maintenance & Security
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#545B65] mb-1 font-bold">
                        Lease Duration Mandate
                      </label>
                      <select
                        value={leaseTerm}
                        onChange={(e) => setLeaseTerm(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E4DCD0] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] text-sm text-[#0A192F] outline-hidden shadow-2xs"
                      >
                        <option value="12 Months (Standard Ultra-Luxury Lease)">12 Months (Standard Ultra-Luxury)</option>
                        <option value="24 Months (Multi-Year Sovereign Lease - 5% Capitalized)">24 Months (Multi-Year Sovereign Mandate)</option>
                        <option value="36 Months (Diplomatic Residence Mandate)">36 Months (Diplomatic Residence)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#545B65] mb-1 font-bold">
                        Desired Occupancy Inception
                      </label>
                      <select
                        value={commenceDate}
                        onChange={(e) => setCommenceDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E4DCD0] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] text-sm text-[#0A192F] outline-hidden shadow-2xs"
                      >
                        <option value="Immediate Occupancy (Within 14 Days)">Immediate Occupancy (Within 14 Days)</option>
                        <option value="First Day of Next Month">First Day of Next Month</option>
                        <option value="Next Quarter Inception">Next Quarter Inception</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#545B65] mb-2 font-bold">
                      Requested Sovereign Estate Staffing
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <label className="p-3 rounded-xl bg-white border border-[#E4DCD0] flex items-center gap-2.5 cursor-pointer text-xs font-semibold">
                        <input
                          type="checkbox"
                          checked={reqButler}
                          onChange={(e) => setReqButler(e.target.checked)}
                          className="w-4 h-4 accent-[#0A192F] rounded"
                        />
                        <span>Estate Butler & Service</span>
                      </label>
                      <label className="p-3 rounded-xl bg-white border border-[#E4DCD0] flex items-center gap-2.5 cursor-pointer text-xs font-semibold">
                        <input
                          type="checkbox"
                          checked={reqChauffeur}
                          onChange={(e) => setReqChauffeur(e.target.checked)}
                          className="w-4 h-4 accent-[#0A192F] rounded"
                        />
                        <span>Chauffeur & Fleet Bay</span>
                      </label>
                      <label className="p-3 rounded-xl bg-white border border-[#E4DCD0] flex items-center gap-2.5 cursor-pointer text-xs font-semibold">
                        <input
                          type="checkbox"
                          checked={reqSecurity}
                          onChange={(e) => setReqSecurity(e.target.checked)}
                          className="w-4 h-4 accent-[#0A192F] rounded"
                        />
                        <span>Biometric Security Ring</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: PROOF OF FUNDS & CUSTODIAN */}
          {step === 3 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#0A192F]">
                  Custodian Depository & Escrow Earnest Commitment
                </h3>
                <p className="text-xs sm:text-sm text-[#545B65] mt-1">
                  In accordance with FINCEN institutional protocols, proof of funds must be verified prior to asset reservation.
                </p>
              </div>

              {/* Earnest Calculation Box */}
              <div className="p-5 rounded-2xl bg-[#0A192F] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
                    {mode === "buy" ? "10% Escrow Earnest Deposit" : "Security Reserve Commitment"}
                  </div>
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-white mt-0.5">
                    {mode === "buy" ? formatRawPrice(earnestAmount) : `2 Mos Deposit + 1st Mo Advance`}
                  </div>
                  <div className="text-xs text-white/70 mt-1">
                    Held in third-party escrow with First American Title Insurance Company.
                  </div>
                </div>
                <div className="px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-xs font-mono text-[#C5A880] text-center shrink-0">
                  Escrow Officer: Assigned
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#545B65] mb-1 font-bold">
                    Primary Custodian / Private Banking Depository *
                  </label>
                  <select
                    value={custodianBank}
                    onChange={(e) => setCustodianBank(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E4DCD0] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] text-sm text-[#0A192F] outline-hidden shadow-2xs"
                  >
                    <option value="J.P. Morgan Private Bank">J.P. Morgan Private Bank</option>
                    <option value="UBS Global Wealth Management">UBS Global Wealth Management</option>
                    <option value="Morgan Stanley Private Wealth">Morgan Stanley Private Wealth</option>
                    <option value="Goldman Sachs Private Wealth">Goldman Sachs Private Wealth</option>
                    <option value="HSBC Private Bank (Geneva/London)">HSBC Private Bank (Suisse / UK)</option>
                    <option value="Lombard Odier / Pictet & Cie">Lombard Odier / Pictet & Cie</option>
                    <option value="Citigroup Private Bank">Citigroup Private Bank</option>
                    <option value="Other Sovereign Central Depository">Other Qualified Sovereign Depository</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#545B65] mb-1 font-bold">
                    Direct Private Wealth Officer (Optional)
                  </label>
                  <input
                    type="text"
                    value={bankOfficer}
                    onChange={(e) => setBankOfficer(e.target.value)}
                    placeholder="e.g. Managing Director, Private Wealth"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E4DCD0] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] text-sm text-[#0A192F] outline-hidden shadow-2xs"
                  />
                </div>
              </div>

              {/* Legal Attestation Checkbox */}
              <div className="p-4 rounded-xl bg-white border border-[#E4DCD0] shadow-2xs">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={fundsCertified}
                    onChange={(e) => setFundsCertified(e.target.checked)}
                    className="w-4 h-4 mt-0.5 accent-[#0A192F] rounded shrink-0 cursor-pointer"
                  />
                  <div className="text-xs text-[#545B65] leading-relaxed">
                    <strong className="text-[#0A192F] block mb-0.5 font-sans">
                      Principal Liquidity Certification & Attestation
                    </strong>
                    I hereby certify under penalty of perjury that unencumbered, irrevocable liquid funds equal to or exceeding the acquisition/lease commitment are actively held at the specified depository and available for title escrow draw.
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* STEP 4: DIGITAL SIGNATURE & LEGAL EXECUTION */}
          {step === 4 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#0A192F]">
                  Digital Signature & Formal Treaty Execution
                </h3>
                <p className="text-xs sm:text-sm text-[#545B65] mt-1">
                  Review the institutional treaty summary below and provide your digital signature to place the asset in binding escrow.
                </p>
              </div>

              {/* Dossier Summary Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E4DCD0] space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-[#E4DCD0]">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C5A880]" />
                    <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#0A192F]">
                      Treaty Dossier Summary
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#C5A880]">{treatyRef}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-[#747D88] block text-[10px] font-mono uppercase">Asset</span>
                    <strong className="text-[#0A192F] font-serif">{property.title}</strong>
                  </div>
                  <div>
                    <span className="text-[#747D88] block text-[10px] font-mono uppercase">Consideration</span>
                    <strong className="text-[#0A192F] font-serif">
                      {mode === "buy" ? formatRawPrice(property.price) : property.rentalPrice}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[#747D88] block text-[10px] font-mono uppercase">Principal</span>
                    <strong className="text-[#0A192F]">{principalName}</strong>
                  </div>
                  <div>
                    <span className="text-[#747D88] block text-[10px] font-mono uppercase">Vehicle</span>
                    <span className="text-[#0A192F] truncate block">{entityName || entityType}</span>
                  </div>
                  <div>
                    <span className="text-[#747D88] block text-[10px] font-mono uppercase">Depository</span>
                    <span className="text-[#0A192F]">{custodianBank}</span>
                  </div>
                  <div>
                    <span className="text-[#747D88] block text-[10px] font-mono uppercase">Escrow Closing</span>
                    <span className="text-[#0A192F]">{mode === "buy" ? closingHorizon.split(" ")[0] + " Days" : leaseTerm.split(" ")[0] + " Mos"}</span>
                  </div>
                </div>
              </div>

              {/* Digital Signature Box */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#545B65] mb-1 font-bold">
                  Type Full Legal Name to Digitally Sign *
                </label>
                <input
                  type="text"
                  required
                  value={signatureName}
                  onChange={(e) => setSignatureName(e.target.value)}
                  placeholder="e.g. Julian Vance"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E4DCD0] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] text-sm text-[#0A192F] outline-hidden shadow-2xs"
                />

                {/* Calligraphic Signature Preview */}
                {signatureName && (
                  <div className="mt-3 p-4 rounded-xl bg-[#FAF8F5] border border-[#E4DCD0] text-center">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#747D88] mb-1">
                      Digital Signature Calligraphy Preview
                    </div>
                    <div className="text-2xl sm:text-3xl font-serif italic text-[#0A192F] tracking-wide py-1 border-b border-[#C5A880]/50 inline-block px-6">
                      {signatureName}
                    </div>
                    <div className="text-[11px] font-mono text-[#747D88] mt-2">
                      Executed on {signatureDate} • SHA-256 Protocol Verified
                    </div>
                  </div>
                )}
              </div>

              {/* Binding Checkbox */}
              <div className="p-4 rounded-xl bg-white border border-[#E4DCD0] shadow-2xs">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 accent-[#0A192F] rounded shrink-0 cursor-pointer"
                  />
                  <div className="text-xs text-[#545B65] leading-relaxed">
                    <strong className="text-[#0A192F] block mb-0.5 font-sans">
                      Binding Private Treaty Declaration
                    </strong>
                    I understand that executing this document places <strong>{property.title}</strong> under binding escrow exclusivity and initiates formal title transfer protocols. The property will immediately be withdrawn from public inventory.
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* STEP 5: OFFICIAL CONFIRMATION DOSSIER */}
          {step === 5 && (
            <div className="space-y-6 text-center animate-fade-in py-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-[#0A192F] border-2 border-[#C5A880] flex items-center justify-center text-[#C5A880] shadow-xl animate-scale-in">
                <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-[#C5A880]" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#C5A880]/20 text-[#0A192F] text-[11px] font-mono uppercase tracking-widest font-bold">
                  {mode === "buy" ? "Asset Acquired • Under Escrow" : "Lease Mandate Secured"}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A192F] mt-2">
                  Exclusivity Officially Locked
                </h3>
                <p className="text-xs sm:text-sm text-[#545B65] max-w-lg mx-auto mt-1.5">
                  The treaty protocol for <strong>{property.title}</strong> has been executed. The asset has been marked as <strong>{mode === "buy" ? "SOLD OUT" : "CURRENTLY UNAVAILABLE"}</strong> across the global portfolio.
                </p>
              </div>

              {/* Official Seal Card */}
              <div className="bg-white border border-[#E4DCD0] rounded-2xl p-4 sm:p-6 text-left max-w-xl mx-auto shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E4DCD0]">
                  <div className="text-xs font-mono uppercase text-[#747D88]">Treaty Identifier</div>
                  <div className="text-sm font-mono font-bold text-[#0A192F]">{treatyRef}</div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[#747D88] block text-[10px] font-mono uppercase">Principal</span>
                    <strong className="text-[#0A192F]">{principalName}</strong>
                  </div>
                  <div>
                    <span className="text-[#747D88] block text-[10px] font-mono uppercase">Acquiring Entity</span>
                    <span className="text-[#0A192F]">{entityName || entityType}</span>
                  </div>
                  <div>
                    <span className="text-[#747D88] block text-[10px] font-mono uppercase">Official Consideration</span>
                    <strong className="text-[#0A192F] font-serif">
                      {mode === "buy" ? formatRawPrice(property.price) : property.rentalPrice}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[#747D88] block text-[10px] font-mono uppercase">Depository</span>
                    <span className="text-[#0A192F]">{custodianBank}</span>
                  </div>
                </div>

                {/* Assigned Advisor Info */}
                <div className="pt-3 border-t border-[#E4DCD0] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={property.agent?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                      alt={property.agent?.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#C5A880]/50"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#0A192F]">{property.agent?.name || "Julian Vance"}</div>
                      <div className="text-[10px] text-[#747D88]">{property.agent?.title || "Senior Vice President"}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <a
                      href={`tel:${property.agent?.phone || "+13108492910"}`}
                      className="text-xs font-mono font-bold text-[#C5A880] hover:underline"
                    >
                      {property.agent?.phone || "+1 (310) 849-2910"}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadTreaty}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white border border-[#E4DCD0] hover:bg-[#F3EFEA] text-[#0A192F] font-bold text-xs uppercase tracking-wider shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Download className="w-4 h-4 text-[#C5A880]" />
                  <span>Download Official Treaty Dossier</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 border border-[#C5A880]/30"
                >
                  <span>Complete & Return to Portfolio</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Bar for Steps 1 to 4 */}
        {step < 5 && (
          <div className="bg-white border-t border-[#E4DCD0] p-4 sm:px-6 flex items-center justify-between gap-3 shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="px-4 py-2.5 rounded-xl border border-[#E4DCD0] bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#0A192F] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-[#E4DCD0] bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#545B65] text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
              >
                Cancel
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => {
                  if (step === 1 && !validateStep1()) return;
                  if (step === 3 && !validateStep3()) return;
                  setStep((s) => s + 1);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xs transition-all cursor-pointer active:scale-95 border border-[#C5A880]/30"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleExecuteTreaty}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all cursor-pointer active:scale-95 border border-[#C5A880] disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{isSubmitting ? "Executing Treaty..." : "Execute Private Treaty"}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
