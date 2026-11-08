"use client";

import React from "react";
import { X, Trash2, ExternalLink, Calendar } from "lucide-react";
import { PROPERTIES_DATA } from "../data/mockData";

export default function SavedDrawer({ isOpen, onClose, savedIds = [], onRemoveSave, onSelectProperty, onScheduleTour }) {
  if (!isOpen) return null;

  const savedProperties = PROPERTIES_DATA.filter((p) => savedIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/65 backdrop-blur-sm flex justify-end animate-fade-in">
      <div 
        className="w-full max-w-md bg-[#FAF8F5] border-l border-[#E4DCD0] h-full flex flex-col justify-between shadow-2xl text-[#1A1D20]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header in Deep Navy */}
        <div className="p-5 border-b border-[#060D18] flex items-center justify-between bg-[#0A192F] text-white">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
            <h3 className="text-sm font-serif text-white font-medium">
              Saved Residences ({savedProperties.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#EADDC9] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content List */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3.5 bg-[#FAF8F5]">
          {savedProperties.length === 0 ? (
            <div className="text-center py-16 text-[#545B65] space-y-2">
              <p className="text-sm font-serif text-[#0A192F]">Your collection is empty.</p>
              <p className="text-xs text-[#747D88]">
                Click the heart icon on any residence to save it to your private portfolio.
              </p>
            </div>
          ) : (
            savedProperties.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-[#E4DCD0] hover:border-[#C5A880] rounded-2xl p-3.5 flex gap-3.5 relative group shadow-2xs transition-all"
              >
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-serif text-[#0A192F] font-semibold line-clamp-1">
                      {p.title}
                    </h4>
                    <div className="text-xs text-[#0A192F] font-mono font-bold mt-0.5">
                      {p.priceFormatted}
                    </div>
                    <div className="text-[10px] text-[#747D88] mt-0.5">
                      {p.beds} Beds · {p.baths} Baths · {(p.sqft || 0).toLocaleString("en-US")} SF
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1.5">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectProperty(p);
                      }}
                      className="text-[11px] text-[#0A192F] hover:text-[#C5A880] font-semibold uppercase tracking-wider flex items-center gap-1"
                    >
                      Details <ExternalLink className="w-2.5 h-2.5 text-[#C5A880]" />
                    </button>
                    <button
                      onClick={() => onRemoveSave(p.id)}
                      className="text-[#747D88] hover:text-rose-500 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedProperties.length > 0 && (
          <div className="p-5 border-t border-[#E4DCD0] bg-white">
            <button
              onClick={() => {
                onClose();
                onScheduleTour(savedProperties[0]);
              }}
              className="w-full py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
              Schedule Showing for Saved Portfolio
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
