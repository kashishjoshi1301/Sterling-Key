"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import { ArrowRight, ShieldCheck, Check } from "lucide-react";

export default function Footer({ onOpenPortal, onOpenSchedule }) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#040507] text-neutral-400 text-xs border-t border-white/[0.06] pt-12 pb-8">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Newsletter Banner */}
        <div className="bg-[#090B10] border border-white/[0.07] rounded-3xl p-6 sm:p-8 mb-10 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
            <div className="lg:col-span-7">
              <span className="text-[10px] uppercase tracking-[0.22em] text-stone-400 font-medium mb-1.5 block">
                The Sovereign Wire · Private Dispatch
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-white mb-1.5">
                Receive Off-Market Pocket Offerings
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm">
                Join 14,000+ family offices and sovereign trustees receiving our quarterly intelligence dossier and private listings.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="flex items-center gap-2 p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-stone-200">
                  <Check className="w-4 h-4 shrink-0 text-stone-300" />
                  <span className="text-xs font-medium">
                    You have been subscribed to The Sovereign Wire.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter private email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-[#060709] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
                  />
                  <button
                    type="submit"
                    className="py-2.5 px-5 rounded-xl bg-white hover:bg-stone-200 text-neutral-950 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                  >
                    Subscribe <ArrowRight className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Global Flagship Locations */}
        <div className="mb-14">
          <div className="text-[10px] uppercase tracking-[0.22em] text-neutral-400 font-medium mb-5 text-center">
            Global Flagship Advisory Chambers
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            <div className="p-3.5 rounded-xl bg-[#090A0E] border border-white/[0.05]">
              <div className="text-white font-serif font-semibold text-xs mb-1">New York</div>
              <p className="text-[10px] text-neutral-400 leading-relaxed">
                767 Fifth Avenue, Penthouse 50<br />New York, NY 10153
              </p>
              <div className="text-stone-400 text-[10px] mt-1.5">+1 (212) 791-8840</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#090A0E] border border-white/[0.05]">
              <div className="text-white font-serif font-semibold text-xs mb-1">Beverly Hills</div>
              <p className="text-[10px] text-neutral-400 leading-relaxed">
                9601 Wilshire Boulevard<br />Beverly Hills, CA 90210
              </p>
              <div className="text-stone-400 text-[10px] mt-1.5">+1 (310) 849-2910</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#090A0E] border border-white/[0.05]">
              <div className="text-white font-serif font-semibold text-xs mb-1">Miami Beach</div>
              <p className="text-[10px] text-neutral-400 leading-relaxed">
                1100 Brickell Avenue, Suite 3200<br />Miami, FL 33131
              </p>
              <div className="text-stone-400 text-[10px] mt-1.5">+1 (305) 912-4411</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#090A0E] border border-white/[0.05]">
              <div className="text-white font-serif font-semibold text-xs mb-1">London</div>
              <p className="text-[10px] text-neutral-400 leading-relaxed">
                25 Berkeley Square<br />Mayfair, London W1J 6HN
              </p>
              <div className="text-stone-400 text-[10px] mt-1.5">+44 20 7946 0912</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#090A0E] border border-white/[0.05]">
              <div className="text-white font-serif font-semibold text-xs mb-1">Aspen</div>
              <p className="text-[10px] text-neutral-400 leading-relaxed">
                400 East Cooper Avenue<br />Aspen, CO 81611
              </p>
              <div className="text-stone-400 text-[10px] mt-1.5">+1 (970) 925-1020</div>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-7 mb-14 border-t border-white/[0.06] pt-10">
          {/* Col 1: Brand */}
          <div className="col-span-2">
            <Logo size="md" className="mb-3.5" />
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm mb-3.5">
              Sterling Key Properties represents architectural estates and institutional multi-family assets. Blending the boutique storytelling of The Agency, the precision of Compass & Redfin, the heritage of Douglas Elliman, and the operational rigor of Greystar.
            </p>
            <div className="flex items-center gap-2 text-stone-400 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-300" />
              <span>Certified Sovereign Asset Management Firm</span>
            </div>
          </div>

          {/* Col 2: Real Estate */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.16em] text-white font-semibold mb-3">
              Portfolio
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li><a href="#featured-listings" className="hover:text-white transition-colors">Exclusive Buy</a></li>
              <li><a href="#featured-listings" className="hover:text-white transition-colors">Managed Rentals</a></li>
              <li><a href="#featured-listings" className="hover:text-white transition-colors">Penthouses & Lofts</a></li>
              <li><a href="#featured-listings" className="hover:text-white transition-colors">Waterfront Estates</a></li>
              <li><a href="#featured-listings" className="hover:text-white transition-colors">New Developments</a></li>
            </ul>
          </div>

          {/* Col 3: Property Management */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.16em] text-white font-semibold mb-3">
              Management
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li><button onClick={onOpenPortal} className="hover:text-white transition-colors text-left">Resident Portal</button></li>
              <li><button onClick={onOpenPortal} className="hover:text-white transition-colors text-left">Owner Portal</button></li>
              <li><a href="#property-management" className="hover:text-white transition-colors">Algorithmic Pricing</a></li>
              <li><a href="#property-management" className="hover:text-white transition-colors">Concierge Dispatch</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">Yield Calculator</a></li>
            </ul>
          </div>

          {/* Col 4: Advisory & Legal */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.16em] text-white font-semibold mb-3">
              Private Office
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li><a href="#advisory" className="hover:text-white transition-colors">Managing Partners</a></li>
              <li><button onClick={onOpenSchedule} className="hover:text-white transition-colors text-left">Book Showing</button></li>
              <li><a href="#neighborhoods" className="hover:text-white transition-colors">Market Guides</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Private Treaty Sales</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press Accolades</a></li>
            </ul>
          </div>
        </div>

        {/* Compliance & Copyright Disclaimers */}
        <div className="border-t border-white/[0.04] pt-7 flex flex-col md:flex-row items-center justify-between gap-3.5 text-[10px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} Sterling Key Properties & Asset Management LLC. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="text-stone-300">⌂</span> Equal Housing Opportunity
            </span>
            <span>·</span>
            <span>MLS IDX Compliant</span>
            <span>·</span>
            <a href="#" className="hover:text-neutral-300">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-neutral-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
