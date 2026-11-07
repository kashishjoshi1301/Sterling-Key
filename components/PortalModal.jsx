"use client";

import React, { useState } from "react";
import { 
  X, 
  Key, 
  CreditCard, 
  Wrench, 
  QrCode, 
  Download, 
  TrendingUp, 
  Building,
  LogOut,
  Calendar,
  Check,
  ShieldCheck,
  Send,
  Sparkles
} from "lucide-react";
import { useToast } from "./Toast";

export default function PortalModal({ isOpen, onClose }) {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("owner");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rentPaid, setRentPaid] = useState(false);
  
  // Maintenance Sub-Modal State
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);
  const [maintenanceCategory, setMaintenanceCategory] = useState("HVAC & Climate Systems");
  const [urgency, setUrgency] = useState("routine");
  const [issueDescription, setIssueDescription] = useState("");

  if (!isOpen) return null;

  const handlePayRent = () => {
    setRentPaid(true);
    addToast("Rent payment of $12,500 successfully processed via $0 fee ACH. Transaction Ref #SK-882914", "success", "Payment Settled");
  };

  const handleMaintenanceSubmit = (e) => {
    e.preventDefault();
    setShowMaintenanceForm(false);
    addToast(`Ticket #WO-4921 dispatched to on-site engineering team for ${maintenanceCategory} (${urgency.toUpperCase()})`, "success", "Dispatch En Route");
    setIssueDescription("");
  };

  const handleExportStatement = () => {
    addToast("GAAP Monthly Cash Flow Statement & 1099-MISC tax schedule package exported", "success", "Financials Exported");
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl lg:max-w-4xl max-h-[92vh] bg-[#0A0C10] border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#0E1015] border-b border-white/[0.06] p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-stone-300">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-serif text-white font-medium">
                  Sterling Key Gateway
                </h3>
                <span className="px-2 py-0.5 rounded text-[9px] uppercase font-medium tracking-wider bg-white/[0.06] text-stone-300 border border-white/10">
                  Greystar Architecture v4.2
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Institutional Resident & Sovereign Owner Portal
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

        {/* Tab Switcher */}
        <div className="bg-[#07080A] px-6 pt-3.5 border-b border-white/[0.05] flex gap-4">
          <button
            onClick={() => setActiveTab("owner")}
            className={`pb-2.5 text-xs font-medium uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "owner"
                ? "border-white text-white font-semibold"
                : "border-transparent text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Property Owner Portal
          </button>
          <button
            onClick={() => setActiveTab("resident")}
            className={`pb-2.5 text-xs font-medium uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "resident"
                ? "border-white text-white font-semibold"
                : "border-transparent text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            Resident Portal
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {!isLoggedIn ? (
            /* Login Form */
            <div className="max-w-md mx-auto py-6">
              <div className="text-center mb-5">
                <h4 className="text-lg font-serif text-white">
                  Sign in to {activeTab === "owner" ? "Owner Asset Suite" : "Resident Services"}
                </h4>
                <p className="text-xs text-neutral-400 mt-1">
                  Access your encrypted ledger, biometric key passes, and concierge records.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsLoggedIn(true);
                  addToast("Session authenticated via sovereign encrypted handshake", "success", "Welcome Back");
                }}
                className="space-y-3.5"
              >
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                    Registered Email / Sovereign ID
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="investor@sterlingkey.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0E1015] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-white/30"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#0E1015] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-white/30"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-stone-200 text-neutral-950 font-semibold text-xs uppercase tracking-wider transition-all"
                >
                  Enter Portal
                </button>
              </form>
            </div>
          ) : activeTab === "owner" ? (
            /* OWNER DASHBOARD VIEW */
            <div className="space-y-5 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0E1015] border border-white/[0.06] rounded-2xl p-4">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-400 font-medium">
                    Portfolio: Cavendish Trust Holdings
                  </div>
                  <div className="text-base font-serif text-white font-medium">
                    3 Managed Assets (Star Island · Brickell Tower · Bel-Air)
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded text-[10px] font-medium bg-white/[0.05] text-stone-300 border border-white/10 flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-stone-300" /> 100% Occupancy
                  </span>
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      addToast("Signed out from client session", "info", "Session Terminated");
                    }}
                    className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/10 text-neutral-400 hover:text-white"
                    title="Sign Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Financial Snapshot */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#0E1015] border border-white/[0.06] rounded-2xl p-4">
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                    Next ACH Distribution
                  </span>
                  <div className="text-xl font-serif text-white font-semibold mt-1">
                    $68,450.00
                  </div>
                  <div className="text-[10px] text-neutral-400 mt-1 flex items-center gap-1">
                    <Check className="w-2.5 h-2.5 text-stone-300" /> Disbursing Nov 15
                  </div>
                </div>

                <div className="bg-[#0E1015] border border-white/[0.06] rounded-2xl p-4">
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                    2026 YTD Net Operating Income
                  </span>
                  <div className="text-xl font-serif text-white font-semibold mt-1">
                    $624,800.00
                  </div>
                  <div className="text-[10px] text-stone-400 mt-1">
                    +14.2% Optimization
                  </div>
                </div>

                <div className="bg-[#0E1015] border border-white/[0.06] rounded-2xl p-4">
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                    Maintenance Reserve
                  </span>
                  <div className="text-xl font-serif text-white font-semibold mt-1">
                    $45,000.00
                  </div>
                  <div className="text-[10px] text-neutral-400 mt-1">
                    Zero open emergency tickets
                  </div>
                </div>
              </div>

              {/* Active Leases Ledger */}
              <div className="bg-[#0E1015] border border-white/[0.06] rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-serif text-white uppercase tracking-wider">
                    Current Tenant Roster & Leases
                  </h4>
                  <button 
                    onClick={handleExportStatement}
                    className="text-[11px] text-stone-300 hover:text-white font-medium flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" /> Export Ledger
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-neutral-300">
                    <thead className="bg-black/30 text-neutral-400 uppercase text-[9px] tracking-wider">
                      <tr>
                        <th className="py-2 px-2.5">Asset Unit</th>
                        <th className="py-2 px-2.5">Monthly Rent</th>
                        <th className="py-2 px-2.5">Tenant Vetting</th>
                        <th className="py-2 px-2.5">Lease Expiry</th>
                        <th className="py-2 px-2.5">Payment Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      <tr>
                        <td className="py-2.5 px-2.5 font-medium text-white">44 Star Island Villa</td>
                        <td className="py-2.5 px-2.5 font-mono text-white">$180,000 / mo</td>
                        <td className="py-2.5 px-2.5 text-neutral-300">Biometric & Escrow Clear</td>
                        <td className="py-2.5 px-2.5">Oct 2027</td>
                        <td className="py-2.5 px-2.5 text-stone-300 font-medium">Paid in Advance</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-2.5 font-medium text-white">Brickell Tower Suite 4201</td>
                        <td className="py-2.5 px-2.5 font-mono text-white">$12,500 / mo</td>
                        <td className="py-2.5 px-2.5 text-neutral-300">Credit 820+</td>
                        <td className="py-2.5 px-2.5">Aug 2027</td>
                        <td className="py-2.5 px-2.5 text-stone-300 font-medium">Autopay Settled</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            /* RESIDENT DASHBOARD VIEW */
            <div className="space-y-5 animate-fade-in">
              <div className="bg-[#0E1015] border border-white/[0.06] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-400 font-medium">
                    Welcome Home, Resident
                  </div>
                  <div className="text-base font-serif text-white font-medium">
                    Suite 4201 · The Sterling Collection at Brickell
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Concierge On Duty: Marcus · Ext: 104
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePayRent}
                    disabled={rentPaid}
                    className={`py-1.5 px-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                      rentPaid
                        ? "bg-white/[0.08] text-stone-200 border border-white/20"
                        : "bg-white hover:bg-stone-200 text-neutral-950"
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    {rentPaid ? "Rent Paid ($12,500)" : "Pay Rent ($12,500)"}
                  </button>
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      addToast("Signed out of resident portal", "info", "Logged Out");
                    }}
                    className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/10 text-neutral-400 hover:text-white"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Maintenance Sub-Modal View */}
              {showMaintenanceForm ? (
                <div className="bg-[#0E1015] border border-white/20 rounded-2xl p-5 space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                    <h4 className="text-sm font-serif text-white font-medium">
                      Submit 24/7 Concierge Maintenance Dispatch
                    </h4>
                    <button
                      onClick={() => setShowMaintenanceForm(false)}
                      className="text-neutral-400 hover:text-white text-xs"
                    >
                      Cancel
                    </button>
                  </div>

                  <form onSubmit={handleMaintenanceSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase text-neutral-400 mb-1">
                          Category
                        </label>
                        <select
                          value={maintenanceCategory}
                          onChange={(e) => setMaintenanceCategory(e.target.value)}
                          className="w-full bg-[#08090C] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                        >
                          <option value="HVAC & Climate Systems">HVAC & Climate Systems</option>
                          <option value="Smart Home Automation">Smart Home Automation & Lighting</option>
                          <option value="Private Elevator & Doors">Private Elevator & Doors</option>
                          <option value="Plumbing & Spa Equipment">Plumbing & Wellness Spa</option>
                          <option value="Grounds & Exterior Care">Grounds & Exterior Terrace</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase text-neutral-400 mb-1">
                          Urgency Level
                        </label>
                        <select
                          value={urgency}
                          onChange={(e) => setUrgency(e.target.value)}
                          className="w-full bg-[#08090C] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                        >
                          <option value="immediate">Immediate 24/7 Emergency Dispatch</option>
                          <option value="same-day">Same-Day Priority</option>
                          <option value="routine">Routine Scheduled Care</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase text-neutral-400 mb-1">
                        Details & Access Instructions
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="e.g. Master suite thermostat calibration required before 6 PM..."
                        value={issueDescription}
                        onChange={(e) => setIssueDescription(e.target.value)}
                        className="w-full bg-[#08090C] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-white hover:bg-stone-200 text-neutral-950 font-semibold text-xs uppercase tracking-wider"
                    >
                      Dispatch Concierge Engineers
                    </button>
                  </form>
                </div>
              ) : (
                /* Quick Resident Tools Grid */
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-[#0E1015] border border-white/[0.06] rounded-2xl p-4">
                    <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-stone-300 mb-2.5">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-serif text-white font-semibold mb-1">
                      Concierge Dispatch
                    </h4>
                    <p className="text-[11px] text-neutral-400 mb-3">
                      Submit maintenance requests directly to on-site technicians.
                    </p>
                    <button
                      onClick={() => setShowMaintenanceForm(true)}
                      className="w-full py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 text-[11px] font-medium text-white uppercase tracking-wider transition-all"
                    >
                      Open Ticket
                    </button>
                  </div>

                  <div className="bg-[#0E1015] border border-white/[0.06] rounded-2xl p-4">
                    <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-stone-300 mb-2.5">
                      <QrCode className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-serif text-white font-semibold mb-1">
                      Key & Visitor Pass
                    </h4>
                    <p className="text-[11px] text-neutral-400 mb-3">
                      Generate temporary QR guest credentials for elevator & gate.
                    </p>
                    <button
                      onClick={() => addToast("Digital Keyless QR Guest Pass generated (valid 24h). Saved to your Apple/Google Wallet.", "success", "Pass Generated")}
                      className="w-full py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 text-[11px] font-medium text-white uppercase tracking-wider transition-all"
                    >
                      Generate Pass
                    </button>
                  </div>

                  <div className="bg-[#0E1015] border border-white/[0.06] rounded-2xl p-4">
                    <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-stone-300 mb-2.5">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-serif text-white font-semibold mb-1">
                      Private Amenities
                    </h4>
                    <p className="text-[11px] text-neutral-400 mb-3">
                      Book the rooftop observatory, private cinema, or yacht slip.
                    </p>
                    <button
                      onClick={() => addToast("Reservation confirmed for Private Yacht Charter on Saturday at 14:00.", "success", "Amenity Booked")}
                      className="w-full py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 text-[11px] font-medium text-white uppercase tracking-wider transition-all"
                    >
                      Book Amenity
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
