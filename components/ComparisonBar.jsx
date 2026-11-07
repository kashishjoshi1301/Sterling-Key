"use client";

import React from "react";
import { SlidersHorizontal, X, ArrowRight } from "lucide-react";
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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-2xl bg-[#0E1015]/95 backdrop-blur-2xl border border-white/20 rounded-2xl p-3 shadow-2xl shadow-black/80 flex items-center justify-between gap-4 animate-fade-in">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 pl-2 shrink-0 hidden sm:inline">
          Compare ({compareIds.length}/3):
        </span>

        {selectedProperties.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-2 p-1.5 rounded-xl bg-white/[0.04] border border-white/10 shrink-0"
          >
            <img
              src={p.images[0]}
              alt={p.title}
              className="w-8 h-8 rounded-lg object-cover"
            />
            <span className="text-xs text-white font-medium max-w-[100px] truncate">
              {p.title}
            </span>
            <button
              onClick={() => onRemoveId(p.id)}
              className="text-neutral-500 hover:text-white p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onClearAll}
          className="text-neutral-400 hover:text-white text-xs px-2 py-1"
        >
          Clear
        </button>

        <button
          onClick={onOpenModal}
          className="py-2 px-4 rounded-xl bg-white hover:bg-stone-200 text-neutral-950 font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-95"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Compare Matrix</span>
        </button>
      </div>
    </div>
  );
}
