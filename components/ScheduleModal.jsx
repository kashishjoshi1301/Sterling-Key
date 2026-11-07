"use client";

import React, { useState } from "react";
import { X, Calendar, Check, ShieldCheck } from "lucide-react";
import { PROPERTIES_DATA } from "../data/mockData";
import { useToast } from "./Toast";

export default function ScheduleModal({ isOpen, onClose, preselectedProperty }) {
  const { addToast } = useToast();
  const [propertyTitle, setPropertyTitle] = useState(
    preselectedProperty ? preselectedProperty.title : PROPERTIES_DATA[0].title
  );
  const [tourType, setTourType] = useState("in-person");
  const [date, setDate] = useState("2026-11-12");
  const [timeSlot, setTimeSlot] = useState("afternoon");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast(`Confidential showing requested for ${propertyTitle} on ${date}. Encrypted calendar invite sent to ${email}.`, "success", "Tour Confirmed");
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl max-h-[90vh] bg-[#0A0C10] border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0E1015] border-b border-white/[0.06] p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-stone-300">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-serif text-white font-medium">
                Private Advisory & Tour Booking
              </h3>
              <p className="text-xs text-neutral-400">
                Confidential appointments conducted under strict NDA upon request
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/[0.03] hover:bg-white/10 text-neutral-400 hover:text-white transition-all"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {submitted ? (
            <div className="text-center py-8 space-y-3.5 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-white/[0.06] border border-white/15 flex items-center justify-center text-stone-200 mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-serif text-white">
                Consultation Request Received
              </h4>
              <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-white font-semibold">{name || "Client"}</span>. A Senior Managing Partner from Sterling Key Properties will contact you directly via encrypted channel regarding <span className="text-white font-medium">{propertyTitle}</span>.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-5 py-2 rounded-xl bg-white text-neutral-950 font-semibold text-xs uppercase tracking-wider"
                >
                  Return to Portfolio
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Target Property */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-medium">
                  Property or Focus
                </label>
                <select
                  value={propertyTitle}
                  onChange={(e) => setPropertyTitle(e.target.value)}
                  className="w-full bg-[#0E1015] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-white/30 cursor-pointer [&>option]:bg-[#0E1015]"
                >
                  {PROPERTIES_DATA.map((p) => (
                    <option key={p.id} value={p.title}>
                      {p.title} ({p.priceFormatted})
                    </option>
                  ))}
                  <option value="Institutional Asset Management Evaluation">
                    ★ Institutional Property Management Audit
                  </option>
                  <option value="Off-Market Private Pocket Listing Representation">
                    ★ Private Seller Representation & Off-Market Valuation
                  </option>
                </select>
              </div>

              {/* Consultation Type */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-medium">
                  Experience Format
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "in-person", label: "In-Person Showing" },
                    { id: "virtual", label: "Virtual Tour" },
                    { id: "advisory", label: "Private Advisory" }
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setTourType(type.id)}
                      className={`p-2 rounded-xl border text-center text-xs font-medium uppercase tracking-wider transition-all ${
                        tourType === type.id
                          ? "bg-white/[0.08] border-white/30 text-white font-semibold"
                          : "bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-white"
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-medium">
                    Requested Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#0E1015] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-medium">
                    Time Window
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-[#0E1015] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30 cursor-pointer [&>option]:bg-[#0E1015]"
                  >
                    <option value="morning">Morning (10:00 AM – 12:00 PM)</option>
                    <option value="afternoon">Afternoon (1:00 PM – 4:00 PM)</option>
                    <option value="twilight">Twilight Showcase (5:00 PM – 7:30 PM)</option>
                  </select>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#0E1015] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0E1015] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1 font-medium">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555)..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#0E1015] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between text-[10px] text-neutral-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-stone-300" />
                  Bank-Grade Encryption & Sovereign Privacy
                </span>
                <span>Immediate Confirmation</span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-white hover:bg-stone-200 text-neutral-950 font-semibold text-xs uppercase tracking-wider transition-all"
              >
                Confirm Appointment Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
