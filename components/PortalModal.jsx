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
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl lg:max-w-4xl max-h-[92vh] bg-[#FAF8F5] border border-[#E4DCD0] rounded-2xl overflow-hidden shadow-2xl flex flex-col my-auto text-[#1A1D20]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header in Deep Navy */}
        <div className="bg-[#0A192F] text-white border-b border-[#060D18] p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-serif text-white font-medium">
                  Sterling Key Gateway
                </h3>
                <span className="px-2 py-0.5 rounded text-[9px] uppercase font-semibold tracking-wider bg-white/10 text-[#EADDC9] border border-white/15">
                  Greystar Architecture v4.2
                </span>
              </div>
              <p className="text-xs text-[#A8B2C1]">
                Institutional Resident & Sovereign Owner Portal
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#EADDC9] hover:text-white transition-all"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="bg-white px-6 pt-3.5 border-b border-[#E4DCD0] flex gap-4">
          <button
            onClick={() => setActiveTab("owner")}
            className={`pb-2.5 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "owner"
                ? "border-[#0A192F] text-[#0A192F]"
                : "border-transparent text-[#545B65] hover:text-[#0A192F]"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-[#C5A880]" />
            Property Owner Portal
          </button>
          <button
            onClick={() => setActiveTab("resident")}
            className={`pb-2.5 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "resident"
                ? "border-[#0A192F] text-[#0A192F]"
                : "border-transparent text-[#545B65] hover:text-[#0A192F]"
            }`}
          >
            <Building className="w-3.5 h-3.5 text-[#C5A880]" />
            Resident Portal
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-[#FAF8F5]">
          {!isLoggedIn ? (
            /* Login Form */
            <div className="max-w-md mx-auto py-6">
              <div className="text-center mb-5">
                <h4 className="text-lg font-serif text-[#0A192F] font-semibold">
                  Sign in to {activeTab === "owner" ? "Owner Asset Suite" : "Resident Services"}
                </h4>
                <p className="text-xs text-[#545B65] mt-1">
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
                  <label className="block text-[10px] uppercase tracking-wider text-[#545B65] mb-1 font-medium">
                    Registered Email / Sovereign ID
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="investor@sterlingkey.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-[#E4DCD0] rounded-xl px-3.5 py-2 text-xs text-[#1A1D20] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#545B65] mb-1 font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-[#E4DCD0] rounded-xl px-3.5 py-2 text-xs text-[#1A1D20] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] font-semibold text-xs uppercase tracking-wider transition-all shadow-sm"
                >
                  Enter Portal
                </button>
              </form>
            </div>
          ) : activeTab === "owner" ? (
            /* OWNER DASHBOARD VIEW */
            <div className="space-y-5 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-[#E4DCD0] rounded-2xl p-4 shadow-2xs">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#C5A880] font-semibold">
                    Portfolio: Cavendish Trust Holdings
                  </div>
                  <div className="text-base font-serif text-[#0A192F] font-semibold">
                    3 Managed Assets (Star Island · Brickell Tower · Bel-Air)
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded text-[10px] font-semibold bg-[#F3EFEA] text-[#0A192F] border border-[#E4DCD0] flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-[#C5A880]" /> 100% Occupancy
                  </span>
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      addToast("Signed out from client session", "info", "Session Terminated");
                    }}
                    className="p-1.5 rounded-lg bg-[#F3EFEA] hover:bg-[#EAE3D9] text-[#545B65] hover:text-[#0A192F]"
                    title="Sign Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Financial Snapshot */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white border border-[#E4DCD0] rounded-2xl p-4 shadow-2xs">
                  <span className="text-[10px] text-[#747D88] uppercase tracking-wider font-semibold">
                    Next ACH Distribution
                  </span>
                  <div className="text-xl font-serif text-[#0A192F] font-bold mt-1">
                    $68,450.00
                  </div>
                  <div className="text-[10px] text-[#545B65] mt-1 flex items-center gap-1">
                    <Check className="w-2.5 h-2.5 text-[#C5A880]" /> Disbursing Nov 15
                  </div>
                </div>

                <div className="bg-white border border-[#E4DCD0] rounded-2xl p-4 shadow-2xs">
                  <span className="text-[10px] text-[#747D88] uppercase tracking-wider font-semibold">
                    2026 YTD Net Operating Income
                  </span>
                  <div className="text-xl font-serif text-[#0A192F] font-bold mt-1">
                    $624,800.00
                  </div>
                  <div className="text-[10px] text-[#C5A880] font-semibold mt-1">
                    +14.2% Optimization
                  </div>
                </div>

                <div className="bg-white border border-[#E4DCD0] rounded-2xl p-4 shadow-2xs">
                  <span className="text-[10px] text-[#747D88] uppercase tracking-wider font-semibold">
                    Maintenance Reserve
                  </span>
                  <div className="text-xl font-serif text-[#0A192F] font-bold mt-1">
                    $45,000.00
                  </div>
                  <div className="text-[10px] text-[#545B65] mt-1">
                    Zero open emergency tickets
                  </div>
                </div>
              </div>

              {/* Active Leases Ledger */}
              <div className="bg-white border border-[#E4DCD0] rounded-2xl p-4 shadow-2xs">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-serif text-[#0A192F] uppercase tracking-wider font-semibold">
                    Current Tenant Roster & Leases
                  </h4>
                  <button 
                    onClick={handleExportStatement}
                    className="text-[11px] text-[#0A192F] hover:text-[#C5A880] font-semibold flex items-center gap-1"
                  >
                    <Download className="w-3 h-3 text-[#C5A880]" /> Export Ledger
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-[#383E46]">
                    <thead className="bg-[#FAF8F5] text-[#545B65] uppercase text-[9px] tracking-wider font-semibold">
                      <tr>
                        <th className="py-2 px-2.5">Asset Unit</th>
                        <th className="py-2 px-2.5">Monthly Rent</th>
                        <th className="py-2 px-2.5">Tenant Vetting</th>
                        <th className="py-2 px-2.5">Lease Expiry</th>
                        <th className="py-2 px-2.5">Payment Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E4DCD0]">
                      <tr>
                        <td className="py-2.5 px-2.5 font-semibold text-[#0A192F]">44 Star Island Villa</td>
                        <td className="py-2.5 px-2.5 font-mono font-bold text-[#0A192F]">$180,000 / mo</td>
                        <td className="py-2.5 px-2.5 text-[#545B65]">Biometric & Escrow Clear</td>
                        <td className="py-2.5 px-2.5">Oct 2027</td>
                        <td className="py-2.5 px-2.5 text-[#C5A880] font-semibold">Paid in Advance</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-2.5 font-semibold text-[#0A192F]">Brickell Tower Suite 4201</td>
                        <td className="py-2.5 px-2.5 font-mono font-bold text-[#0A192F]">$12,500 / mo</td>
                        <td className="py-2.5 px-2.5 text-[#545B65]">Credit 820+</td>
                        <td className="py-2.5 px-2.5">Aug 2027</td>
                        <td className="py-2.5 px-2.5 text-[#C5A880] font-semibold">Autopay Settled</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            /* RESIDENT DASHBOARD VIEW */
            <div className="space-y-5 animate-fade-in">
              <div className="bg-white border border-[#E4DCD0] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#C5A880] font-semibold">
                    Welcome Home, Resident
                  </div>
                  <div className="text-base font-serif text-[#0A192F] font-semibold">
                    Suite 4201 · The Sterling Collection at Brickell
                  </div>
                  <p className="text-[11px] text-[#545B65] mt-0.5">
                    Concierge On Duty: Marcus · Ext: 104
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePayRent}
                    disabled={rentPaid}
                    className={`py-1.5 px-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xs ${
                      rentPaid
                        ? "bg-[#F3EFEA] text-[#0A192F] border border-[#E4DCD0]"
                        : "bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5]"
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5 text-[#C5A880]" />
                    {rentPaid ? "Rent Paid ($12,500)" : "Pay Rent ($12,500)"}
                  </button>
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      addToast("Signed out of resident portal", "info", "Logged Out");
                    }}
                    className="p-1.5 rounded-lg bg-[#F3EFEA] hover:bg-[#EAE3D9] text-[#545B65] hover:text-[#0A192F]"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Maintenance Sub-Modal View */}
              {showMaintenanceForm ? (
                <div className="bg-white border border-[#E4DCD0] rounded-2xl p-5 space-y-4 animate-fade-in shadow-md">
                  <div className="flex items-center justify-between border-b border-[#E4DCD0] pb-3">
                    <h4 className="text-sm font-serif text-[#0A192F] font-semibold">
                      Submit 24/7 Concierge Maintenance Dispatch
                    </h4>
                    <button
                      onClick={() => setShowMaintenanceForm(false)}
                      className="text-[#747D88] hover:text-[#0A192F] text-xs font-semibold"
                    >
                      Cancel
                    </button>
                  </div>

                  <form onSubmit={handleMaintenanceSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase text-[#545B65] mb-1 font-medium">
                          Category
                        </label>
                        <select
                          value={maintenanceCategory}
                          onChange={(e) => setMaintenanceCategory(e.target.value)}
                          className="w-full bg-[#FAF8F5] border border-[#E4DCD0] rounded-xl px-3 py-2 text-xs text-[#1A1D20] font-medium focus:outline-none focus:border-[#C5A880]"
                        >
                          <option value="HVAC & Climate Systems">HVAC & Climate Systems</option>
                          <option value="Smart Home Automation">Smart Home Automation & Lighting</option>
                          <option value="Private Elevator & Doors">Private Elevator & Doors</option>
                          <option value="Plumbing & Spa Equipment">Plumbing & Wellness Spa</option>
                          <option value="Grounds & Exterior Care">Grounds & Exterior Terrace</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase text-[#545B65] mb-1 font-medium">
                          Urgency Level
                        </label>
                        <select
                          value={urgency}
                          onChange={(e) => setUrgency(e.target.value)}
                          className="w-full bg-[#FAF8F5] border border-[#E4DCD0] rounded-xl px-3 py-2 text-xs text-[#1A1D20] font-medium focus:outline-none focus:border-[#C5A880]"
                        >
                          <option value="immediate">Immediate 24/7 Emergency Dispatch</option>
                          <option value="same-day">Same-Day Priority</option>
                          <option value="routine">Routine Scheduled Care</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase text-[#545B65] mb-1 font-medium">
                        Details & Access Instructions
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="e.g. Master suite thermostat calibration required before 6 PM..."
                        value={issueDescription}
                        onChange={(e) => setIssueDescription(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#E4DCD0] rounded-xl p-3 text-xs text-[#1A1D20] focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] font-semibold text-xs uppercase tracking-wider shadow-sm"
                    >
                      Dispatch Concierge Engineers
                    </button>
                  </form>
                </div>
              ) : (
                /* Quick Resident Tools Grid */
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-white border border-[#E4DCD0] rounded-2xl p-4 shadow-2xs">
                    <div className="w-8 h-8 rounded-xl bg-[#F3EFEA] border border-[#E4DCD0] flex items-center justify-center text-[#C5A880] mb-2.5">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-serif text-[#0A192F] font-semibold mb-1">
                      Concierge Dispatch
                    </h4>
                    <p className="text-[11px] text-[#545B65] mb-3">
                      Submit maintenance requests directly to on-site technicians.
                    </p>
                    <button
                      onClick={() => setShowMaintenanceForm(true)}
                      className="w-full py-1.5 rounded-lg bg-[#F3EFEA] hover:bg-[#EAE3D9] text-[11px] font-semibold text-[#0A192F] uppercase tracking-wider transition-all border border-[#E4DCD0]"
                    >
                      Open Ticket
                    </button>
                  </div>

                  <div className="bg-white border border-[#E4DCD0] rounded-2xl p-4 shadow-2xs">
                    <div className="w-8 h-8 rounded-xl bg-[#F3EFEA] border border-[#E4DCD0] flex items-center justify-center text-[#C5A880] mb-2.5">
                      <QrCode className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-serif text-[#0A192F] font-semibold mb-1">
                      Key & Visitor Pass
                    </h4>
                    <p className="text-[11px] text-[#545B65] mb-3">
                      Generate temporary QR guest credentials for elevator & gate.
                    </p>
                    <button
                      onClick={() => addToast("Digital Keyless QR Guest Pass generated (valid 24h). Saved to your Apple/Google Wallet.", "success", "Pass Generated")}
                      className="w-full py-1.5 rounded-lg bg-[#F3EFEA] hover:bg-[#EAE3D9] text-[11px] font-semibold text-[#0A192F] uppercase tracking-wider transition-all border border-[#E4DCD0]"
                    >
                      Generate Pass
                    </button>
                  </div>

                  <div className="bg-white border border-[#E4DCD0] rounded-2xl p-4 shadow-2xs">
                    <div className="w-8 h-8 rounded-xl bg-[#F3EFEA] border border-[#E4DCD0] flex items-center justify-center text-[#C5A880] mb-2.5">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-serif text-[#0A192F] font-semibold mb-1">
                      Private Amenities
                    </h4>
                    <p className="text-[11px] text-[#545B65] mb-3">
                      Book the rooftop observatory, private cinema, or yacht slip.
                    </p>
                    <button
                      onClick={() => addToast("Reservation confirmed for Private Yacht Charter on Saturday at 14:00.", "success", "Amenity Booked")}
                      className="w-full py-1.5 rounded-lg bg-[#F3EFEA] hover:bg-[#EAE3D9] text-[11px] font-semibold text-[#0A192F] uppercase tracking-wider transition-all border border-[#E4DCD0]"
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
