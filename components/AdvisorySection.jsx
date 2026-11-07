"use client";

import React from "react";
import { AGENTS_DATA, TESTIMONIALS_DATA, PRESS_ACCOLADES } from "../data/mockData";
import { Phone, Mail, Award, Quote } from "lucide-react";

export default function AdvisorySection({ onOpenSchedule }) {
  return (
    <section id="advisory" className="py-14 sm:py-16 bg-[#060709] text-white relative border-b border-white/[0.06]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-[0.24em] bg-white/[0.04] border border-white/10 text-stone-300 mb-3">
            <Award className="w-3 h-3 text-stone-400" /> The Agency Influence
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-white mb-3">
            Private Client Advisory
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
            Representing the world’s most discerning families, institutions, and sovereign wealth entities with absolute confidentiality.
          </p>
        </div>

        {/* Elite Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {AGENTS_DATA.map((agent) => (
            <div
              key={agent.id}
              className="bg-[#0C0E13] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/5] relative overflow-hidden bg-neutral-950">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0E13] via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-medium uppercase tracking-wider bg-black/60 backdrop-blur-md text-stone-200 border border-white/10 inline-block mb-1">
                      {agent.careerSales} Career Volume
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-base font-serif text-white font-medium group-hover:text-stone-300 transition-colors">
                    {agent.name}
                  </h3>
                  <div className="text-xs text-stone-300 font-medium mb-1">
                    {agent.role}
                  </div>
                  <div className="text-[11px] text-neutral-400 mb-2.5">
                    Focus: {agent.region}
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                    {agent.bio}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-white/[0.05]">
                  <a
                    href={`tel:${agent.phone}`}
                    className="py-1.5 px-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] text-neutral-300 hover:text-white text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Phone className="w-3 h-3 text-stone-400" />
                    Call
                  </a>
                  <button
                    onClick={onOpenSchedule}
                    className="py-1.5 px-3 rounded-lg bg-white/[0.06] hover:bg-white/10 text-stone-200 border border-white/10 text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Mail className="w-3 h-3" />
                    Inquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Press Accolades */}
        <div className="bg-[#0C0E13] rounded-2xl border border-white/[0.06] p-7 mb-16">
          <div className="text-center text-[10px] uppercase tracking-[0.24em] text-neutral-400 font-medium mb-6">
            Recognized By
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-center">
            {PRESS_ACCOLADES.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="font-serif text-base font-semibold text-white mb-1.5">
                  {item.outlet}
                </div>
                <p className="text-xs text-neutral-400 italic">
                  "{item.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Client Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#0C0E13] border border-white/[0.06] rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <Quote className="w-6 h-6 text-stone-500 mb-3" />
                <p className="text-xs text-neutral-300 leading-relaxed mb-5 italic">
                  "{t.quote}"
                </p>
              </div>
              <div className="pt-3 border-t border-white/[0.05]">
                <div className="font-serif text-xs text-white font-medium">
                  {t.author}
                </div>
                <div className="text-[11px] text-stone-400">
                  {t.title}
                </div>
                <div className="text-[10px] text-neutral-500">
                  {t.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
