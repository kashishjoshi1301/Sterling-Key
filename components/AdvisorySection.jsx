"use client";

import React from "react";
import { AGENTS_DATA, PRESS_ACCOLADES } from "../data/mockData";
import { Phone, Mail, Award, Quote } from "lucide-react";

export default function AdvisorySection({ onOpenSchedule }) {
  return (
    <section id="advisory" className="py-16 sm:py-20 bg-[#FAF8F5] text-[#1A1D20] relative border-b border-[#E4DCD0]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.24em] bg-white border border-[#E4DCD0] text-[#0A192F] mb-3 shadow-2xs">
            <Award className="w-3.5 h-3.5 text-[#C5A880]" /> The Agency Influence
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#0A192F] mb-3">
            Private Client Advisory
          </h2>
          <p className="text-[#545B65] text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Representing the world’s most discerning families, institutions, and sovereign wealth entities with absolute confidentiality.
          </p>
        </div>

        {/* Elite Managing Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {AGENTS_DATA.map((agent) => (
            <div
              key={agent.id}
              className="bg-white border border-[#E4DCD0] rounded-2xl overflow-hidden hover:border-[#C5A880] transition-all duration-300 group flex flex-col justify-between shadow-2xs hover:shadow-xl"
            >
              <div>
                <div className="aspect-[4/5] relative overflow-hidden bg-neutral-900">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-[#0A192F]/85 backdrop-blur-md text-[#EADDC9] border border-white/10 inline-block shadow-xs">
                      {agent.careerSales} Career Volume
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-base font-serif text-[#0A192F] font-semibold group-hover:text-[#183664] transition-colors">
                    {agent.name}
                  </h3>
                  <div className="text-xs text-[#C5A880] font-semibold mb-1">
                    {agent.role}
                  </div>
                  <div className="text-[11px] text-[#747D88] mb-2">
                    Region: {agent.region}
                  </div>
                  <p className="text-xs text-[#545B65] leading-relaxed line-clamp-2">
                    {agent.bio}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-[#E4DCD0]">
                  <a
                    href={`tel:${agent.phone}`}
                    className="py-1.5 px-3 rounded-lg bg-[#F3EFEA] hover:bg-[#EAE3D9] text-[#1A1D20] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all border border-[#E4DCD0]"
                  >
                    <Phone className="w-3 h-3 text-[#C5A880]" />
                    Call
                  </a>
                  <button
                    onClick={onOpenSchedule}
                    className="py-1.5 px-3 rounded-lg bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs"
                  >
                    <Mail className="w-3 h-3 text-[#C5A880]" />
                    Inquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Streamlined Press & Recognition Strip */}
        <div className="bg-white rounded-3xl border border-[#E4DCD0] p-6 sm:p-8 shadow-2xs">
          <div className="text-center text-[10px] uppercase tracking-[0.24em] text-[#C5A880] font-semibold mb-6">
            Global Recognition & Media Authority
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            {PRESS_ACCOLADES.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E4DCD0]">
                <div className="font-serif text-sm font-semibold text-[#0A192F] mb-1">
                  {item.outlet}
                </div>
                <p className="text-xs text-[#545B65] italic">
                  "{item.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
