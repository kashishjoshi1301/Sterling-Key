"use client";

import React from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { PROPERTIES_DATA } from "../data/mockData";

export default function ComparisonBar({
  compareIds = [],
  onOpenModal,
  onOpenCompare,
  onRemoveId,
  onRemove,
  onClearAll,
  onClear
}) {
  if (!compareIds || compareIds.length === 0) return null;

  const handleOpen = onOpenModal || onOpenCompare;
  const handleRemove = onRemoveId || onRemove;
  const handleClear = onClearAll || onClear;

  const selectedProperties = PROPERTIES_DATA.filter((p) => compareIds.includes(p.id));

  return (
    <div className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[94%] sm:w-auto sm:min-w-[420px] max-w-xl bg-[#0A192F]/95 backdrop-blur-2xl border border-[#C5A880]/50 rounded-2xl p-2 sm:p-3 shadow-2xl shadow-[#060D18]/90 flex items-center justify-between gap-2.5 sm:gap-3 animate-fade-in text-white">
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar min-w-0">
        <span className="text-[10px] uppercase font-mono tracking-wider text-[#C5A880] pl-1 shrink-0 hidden md:inline font-bold">
          Compare ({compareIds.length}/4):
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
            <span className="text-[11px] text-white font-medium max-w-[100px] xs:max-w-[130px] sm:max-w-[170px] truncate" title={p.title}>
              {p.title}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (handleRemove) handleRemove(p.id);
              }}
              className="text-[#A8B2C1] hover:text-white p-0.5 cursor-pointer rounded hover:bg-white/10"
              aria-label="Remove from compare"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (handleClear) handleClear();
          }}
          className="text-[#A8B2C1] hover:text-white text-xs px-2 py-1 transition-colors cursor-pointer rounded hover:bg-white/10 font-medium"
        >
          Clear
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (handleOpen) handleOpen();
          }}
          className="py-1.5 sm:py-2 px-3 sm:px-4 rounded-xl bg-[#C5A880] hover:bg-[#D8BD99] text-[#0A192F] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-95 whitespace-nowrap shadow-sm cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Matrix</span>
        </button>
      </div>
    </div>
  );
}
