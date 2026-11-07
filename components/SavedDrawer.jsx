"use client";

import React from "react";
import { X, Trash2, ExternalLink, Calendar } from "lucide-react";
import { PROPERTIES_DATA } from "../data/mockData";

export default function SavedDrawer({ isOpen, onClose, savedIds = [], onRemoveSave, onSelectProperty, onScheduleTour }) {
  if (!isOpen) return null;

  const savedProperties = PROPERTIES_DATA.filter((p) => savedIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end animate-fade-in">
      <div 
        className="w-full max-w-md bg-[#0A0C10] border-l border-white/10 h-full flex flex-col justify-between shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/[0.06] flex items-center justify-between bg-[#0E1015]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-stone-300" />
            <h3 className="text-sm font-serif text-white font-medium">
              Saved Residences ({savedProperties.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/[0.04] hover:bg-white/10 text-neutral-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content List */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3.5">
          {savedProperties.length === 0 ? (
            <div className="text-center py-16 text-neutral-400 space-y-2">
              <p className="text-sm font-serif text-neutral-300">Your collection is empty.</p>
              <p className="text-xs text-neutral-500">
                Click the heart icon on any residence to save it to your private portfolio.
              </p>
            </div>
          ) : (
            savedProperties.map((p) => (
              <div
                key={p.id}
                className="bg-[#0E1015] border border-white/[0.06] rounded-2xl p-3.5 flex gap-3.5 relative group"
              >
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-serif text-white font-medium line-clamp-1">
                      {p.title}
                    </h4>
                    <div className="text-xs text-white font-mono font-semibold mt-0.5">
                      {p.priceFormatted}
                    </div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">
                      {p.beds} Beds · {p.baths} Baths · {p.sqft.toLocaleString()} SF
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1.5">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectProperty(p);
                      }}
                      className="text-[11px] text-stone-300 hover:text-white font-medium uppercase tracking-wider flex items-center gap-1"
                    >
                      Details <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                    <button
                      onClick={() => onRemoveSave(p.id)}
                      className="text-neutral-500 hover:text-stone-300 transition-colors"
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
          <div className="p-5 border-t border-white/[0.06] bg-[#0E1015]">
            <button
              onClick={() => {
                onClose();
                onScheduleTour(savedProperties[0]);
              }}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-stone-200 text-neutral-950 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              Schedule Showings For Collection
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
