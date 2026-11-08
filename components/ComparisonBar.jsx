"use client";

import React from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { PROPERTIES_DATA } from "../data/mockData";

export default function ComparisonBar({
  compareIds = [],
  onOpenModal,
  onRemoveId,
  onClearAll
}) {
  if (compareIds.length === 0) return null;

  const selectedProperties = PROPERTIES_DATA.filter((p) => compareIds.includes(p.id));

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] sm:w-auto sm:min-w-[420px] max-w-xl bg-[#0A192F]/95 backdrop-blur-2xl border border-[#C5A880]/40 rounded-2xl p-2.5 sm:p-3 shadow-2xl shadow-[#060D18]/80 flex items-center justify-between gap-3 animate-fade-in text-white">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar min-w-0">
        <span className="text-[10px] uppercase font-mono tracking-wider text-[#C5A880] pl-1 shrink-0 hidden md:inline font-semibold">
          Compare ({compareIds.length}/3):
        </span>

        {selectedProperties.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-1.5 p-1 sm:p-1.5 rounded-xl bg-white/10 border border-[#C5A880]/30 shrink-0"
          >
            <img
              src={p.images[0]}
              alt={p.title}
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg object-cover"
            />
            <span className="text-[11px] text-white font-medium max-w-[70px] sm:max-w-[90px] truncate">
              {p.title}
            </span>
            <button
              onClick={() => onRemoveId(p.id)}
              className="text-[#A8B2C1] hover:text-white p-0.5"
              aria-label="Remove from compare"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onClearAll}
          className="text-[#A8B2C1] hover:text-white text-xs px-1.5 py-1 transition-colors"
        >
          Clear
        </button>

        <button
          onClick={onOpenModal}
          className="py-1.5 sm:py-2 px-3 sm:px-4 rounded-xl bg-[#C5A880] hover:bg-[#D8BD99] text-[#0A192F] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-95 whitespace-nowrap shadow-xs"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Matrix</span>
        </button>
      </div>
    </div>
  );
}
