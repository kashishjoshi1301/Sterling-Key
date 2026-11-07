"use client";

import React from "react";

export default function Logo({ size = "md", showText = true, className = "" }) {
  const emblemSizes = {
    sm: "w-6 h-6 sm:w-7 sm:h-7",
    md: "w-7 h-7 sm:w-9 sm:h-9",
    lg: "w-10 h-10 sm:w-12 sm:h-12",
    xl: "w-12 h-12 sm:w-16 sm:h-16"
  };

  const titleSizes = {
    sm: "text-[10px] sm:text-xs tracking-[0.16em] sm:tracking-[0.22em]",
    md: "text-xs sm:text-sm tracking-[0.18em] sm:tracking-[0.26em]",
    lg: "text-base sm:text-lg tracking-[0.22em] sm:tracking-[0.3em]",
    xl: "text-lg sm:text-xl tracking-[0.26em] sm:tracking-[0.35em]"
  };

  const subtitleSizes = {
    sm: "text-[6.5px] sm:text-[8px] tracking-[0.12em] sm:tracking-[0.16em]",
    md: "text-[7px] sm:text-[8.5px] tracking-[0.12em] sm:tracking-[0.24em]",
    lg: "text-[9px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.28em]",
    xl: "text-[10px] sm:text-xs tracking-[0.22em] sm:tracking-[0.32em]"
  };

  return (
    <div className={`flex items-center gap-2 sm:gap-3 select-none group cursor-pointer ${className}`}>
      {/* Minimalist Architectural Geometric Crest */}
      <div className={`relative ${emblemSizes[size]} flex items-center justify-center shrink-0`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10 transition-transform duration-300 group-hover:scale-105"
        >
          {/* Outer Minimalist Geometric Frame */}
          <polygon
            points="50,6 90,26 90,74 50,94 10,74 10,26"
            stroke="url(#minimalPlatinum)"
            strokeWidth="1.8"
            strokeLinejoin="round"
            className="transition-colors duration-300 group-hover:stroke-white"
          />

          {/* Key Bow: Architectural Circle */}
          <circle
            cx="50"
            cy="34"
            r="12"
            stroke="url(#minimalPlatinum)"
            strokeWidth="1.8"
            fill="#08090C"
          />
          <circle
            cx="50"
            cy="34"
            r="4.5"
            stroke="#C8BCAC"
            strokeWidth="1.2"
          />

          {/* Key Stem */}
          <line
            x1="50"
            y1="46"
            x2="50"
            y2="82"
            stroke="url(#minimalPlatinum)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Architectural Minimalist Teeth */}
          <line
            x1="50"
            y1="64"
            x2="61"
            y2="64"
            stroke="#C8BCAC"
            strokeWidth="2"
            strokeLinecap="square"
          />
          <line
            x1="50"
            y1="72"
            x2="58"
            y2="72"
            stroke="#C8BCAC"
            strokeWidth="2"
            strokeLinecap="square"
          />

          {/* Subtle Sand/Platinum Gradient */}
          <defs>
            <linearGradient id="minimalPlatinum" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#D5CDC2" />
              <stop offset="100%" stopColor="#A89B8A" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-serif uppercase font-semibold text-white ${titleSizes[size]} transition-colors group-hover:text-stone-200`}
          >
            Sterling Key
          </span>
          <span
            className={`font-sans uppercase text-stone-400 font-medium ${subtitleSizes[size]}`}
          >
            Properties & Asset Management
          </span>
        </div>
      )}
    </div>
  );
}