"use client";

import React from "react";

export default function Logo({ size = "md", showText = true, className = "", variant = "dark" }) {
  const emblemSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
    xl: "w-14 h-14"
  };

  const titleSizes = {
    sm: "text-xs tracking-[0.12em]",
    md: "text-sm sm:text-base tracking-[0.14em]",
    lg: "text-lg tracking-[0.16em]",
    xl: "text-2xl tracking-[0.18em]"
  };

  const subtitleSizes = {
    sm: "text-[8px] tracking-[0.12em]",
    md: "text-[9px] sm:text-[10px] tracking-[0.14em]",
    lg: "text-[11px] tracking-[0.16em]",
    xl: "text-xs tracking-[0.18em]"
  };

  const isLight = variant === "light";

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none group cursor-pointer ${className}`}>
      {/* High-Contrast Architectural Emblem */}
      <div
        className={`relative ${emblemSizes[size]} rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105 ${
          isLight
            ? "bg-[#FAF8F5] border border-[#C5A880]"
            : "bg-[#0A192F] border border-[#C5A880]/60"
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[70%] h-[70%]"
        >
          {/* Outer Octagon */}
          <polygon
            points="50,8 88,24 88,76 50,92 12,76 12,24"
            stroke="#C5A880"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Key Circle Head */}
          <circle
            cx="50"
            cy="36"
            r="13"
            stroke="#C5A880"
            strokeWidth="3.5"
            fill={isLight ? "#FAF8F5" : "#0A192F"}
          />
          <circle
            cx="50"
            cy="36"
            r="5"
            fill="#C5A880"
          />

          {/* Key Stem */}
          <line
            x1="50"
            y1="49"
            x2="50"
            y2="78"
            stroke="#C5A880"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Key Teeth */}
          <line
            x1="50"
            y1="64"
            x2="62"
            y2="64"
            stroke="#C5A880"
            strokeWidth="3.5"
            strokeLinecap="square"
          />
          <line
            x1="50"
            y1="72"
            x2="59"
            y2="72"
            stroke="#C5A880"
            strokeWidth="3.5"
            strokeLinecap="square"
          />
        </svg>
      </div>

      {/* Typography - Perfectly Balanced 2-Line Architectural Lockup */}
      {showText && (
        <div className="flex flex-col text-left shrink-0 justify-center">
          <span
            style={{ color: isLight ? "#FAF8F5" : "#0A192F" }}
            className={`font-serif uppercase font-bold leading-tight ${titleSizes[size]} transition-colors whitespace-nowrap`}
          >
            Sterling Key
          </span>
          <span
            style={{ color: isLight ? "#C5A880" : "#747D88" }}
            className={`font-sans uppercase font-semibold leading-tight mt-0.5 ${subtitleSizes[size]} whitespace-nowrap`}
          >
            Properties & Asset Management
          </span>
        </div>
      )}
    </div>
  );
}
