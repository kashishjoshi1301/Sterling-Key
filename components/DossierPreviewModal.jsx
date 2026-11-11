"use client";

import React, { useEffect } from "react";
import { 
  X, 
  ShieldCheck, 
  Download, 
  Printer, 
  FileText, 
  Sparkles, 
  Building2, 
  MapPin, 
  TrendingUp, 
  CheckCircle2,
  Lock
} from "lucide-react";
import { useScrollLock } from "./useScrollLock";

export default function DossierPreviewModal({ dossier, onClose }) {
  useScrollLock(!!dossier, onClose);

  if (!dossier) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#0A192F]/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in overscroll-contain touch-none"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#FAF8F5] border border-[#C5A880] rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto text-[#1A1D20]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#0A192F] text-white px-6 py-4 flex items-center justify-between border-b border-[#C5A880]/40">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#C5A880]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#EADDC9] font-bold">
              Confidential Intelligence Dossier
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-1.5 rounded-full hover:bg-white/10 text-[#DDD4C6] hover:text-white transition-colors cursor-pointer"
              title="Print Dossier"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-[#DDD4C6] hover:text-white transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Top Classification Stamp */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E4DCD0] pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A192F]/5 border border-[#C5A880]/40 text-[10px] font-mono uppercase tracking-widest text-[#0A192F] font-semibold mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{dossier.classification || "SOVEREIGN WEALTH & FAMILY OFFICE TIER"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A192F]">
                {dossier.title || "Q1 2026 Sovereign Portfolio Intelligence"}
              </h2>
            </div>
            <div className="text-left sm:text-right shrink-0">
              <div className="text-[10px] text-[#747D88] uppercase font-mono tracking-wider font-semibold">Reference ID</div>
              <div className="text-sm font-mono font-bold text-[#C5A880]">{dossier.id}</div>
              <div className="text-xs text-[#545B65] mt-0.5">{dossier.issuedDate}</div>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="p-4 rounded-2xl bg-white border border-[#E4DCD0] flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="text-xs text-[#545B65] leading-relaxed">
              Issued to registered recipient <strong className="text-[#0A192F] font-mono">{dossier.recipient}</strong>. Authenticated by Sterling Key Global Advisory Chambers.
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-[#545B65] mb-2">
              Executive Briefing
            </h4>
            <p className="text-sm text-[#1A1D20] leading-relaxed bg-white/70 p-4 rounded-xl border border-[#E4DCD0]">
              {dossier.executiveSummary}
            </p>
          </div>

          {/* Featured Unlisted Offerings */}
          <div>
            <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-[#545B65] mb-3">
              Unlisted Off-Market Offerings (Q1 2026)
            </h4>
            <div className="space-y-3">
              {dossier.featuredOfferings?.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-2xl bg-white border border-[#E4DCD0] hover:border-[#C5A880] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#0A192F] text-[#FAF8F5] font-semibold">
                        {item.status}
                      </span>
                      <span className="text-xs font-mono font-semibold text-[#C5A880]">
                        {item.capRate}
                      </span>
                    </div>
                    <div className="text-base font-serif font-bold text-[#0A192F] mt-1.5">
                      {item.title}
                    </div>
                    <div className="text-xs text-[#747D88] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#C5A880]" />
                      <span>{item.location}</span>
                      <span>•</span>
                      <span>{item.specs}</span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <div className="text-[10px] text-[#747D88] uppercase font-mono tracking-wider font-semibold">Valuation</div>
                    <div className="text-lg font-serif font-bold text-[#0A192F]">{item.valuation}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="bg-white border-t border-[#E4DCD0] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#747D88]">
          <span>Protected under Sterling Key Non-Disclosure Handshake (SHA-256)</span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
}
