"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
import { useToast } from "./Toast";

export default function ConciergeChatWidget({ 
  onOpenSchedule, 
  onOpenPortal, 
  onScrollTo,
  hasComparisonDock = false
}) {
  const { addToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "concierge",
      text: "Welcome to Sterling Key Properties. I am Julian's private digital concierge. How may I assist your portfolio inquiries today?"
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "Explore Miami Waterfront",
    "Unlock Sovereign Vault",
    "Property Management Fees",
    "Schedule a Private Showing"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg = { sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    setTimeout(() => {
      let reply = "Our Senior Advisory partners are available for a confidential consultation.";
      const lower = text.toLowerCase();

      if (lower.includes("miami") || lower.includes("waterfront")) {
        reply = "We currently represent Villa Solaria on Star Island ($62,000,000) with a 150-ft mega-yacht dock and The Sterling Collection at Brickell. I have highlighted our Coastal Waterfront collection for you.";
        if (onScrollTo) onScrollTo("featured-listings");
      } else if (lower.includes("vault") || lower.includes("off-market")) {
        reply = "The Sovereign Vault holds our private off-market estates ($348M+ in unlisted holdings). You can enter demo access code 'STERLING2026' to decrypt the vault.";
        if (onScrollTo) onScrollTo("vault");
      } else if (lower.includes("management") || lower.includes("fee") || lower.includes("greystar")) {
        reply = "Sterling Key manages luxury single-family estates and multi-family buildings from 6.5% monthly collections, backed by 24/7 concierge dispatch and automated distributions on the 5th.";
        if (onScrollTo) onScrollTo("property-management");
      } else if (lower.includes("showing") || lower.includes("tour") || lower.includes("book")) {
        reply = "I would be honored to arrange a private showing. Opening the confidential appointment booking calendar for you now.";
        if (onOpenSchedule) onOpenSchedule();
      } else if (lower.includes("portal") || lower.includes("resident") || lower.includes("owner")) {
        reply = "Opening the Greystar-grade Client & Resident Portal for you.";
        if (onOpenPortal) onOpenPortal();
      } else {
        reply = `Thank you for your inquiry regarding "${text}". A Managing Director from our Private Office has been notified. You can also schedule an immediate confidential briefing below.`;
      }

      setMessages((prev) => [...prev, { sender: "concierge", text: reply }]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className={`fixed right-4 sm:right-6 z-40 transition-all duration-300 ${
      hasComparisonDock ? "bottom-20 sm:bottom-6" : "bottom-5 sm:bottom-6"
    }`}>
      {/* Minimized Trigger Button */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 p-3 sm:px-4 sm:py-2.5 rounded-full bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] border border-[#C5A880]/40 shadow-xl transition-all duration-300 cursor-pointer"
        >
          <div className="relative">
            <MessageSquare className="w-4 h-4 text-[#C5A880]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#C5A880] animate-ping" />
          </div>
          <span className="text-xs uppercase tracking-wider font-semibold hidden sm:inline">
            Private Concierge
          </span>
        </button>
      ) : (
        /* Expanded Chat Drawer */
        <div className="w-[340px] sm:w-[400px] h-[500px] bg-[#FAF8F5] border border-[#E4DCD0] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in text-[#1A1D20]">
          {/* Header in Deep Navy */}
          <div className="p-4 bg-[#0A192F] text-white border-b border-[#060D18] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#C5A880] border border-[#C5A880]/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-serif text-white font-medium flex items-center gap-1.5">
                  Sterling Private Concierge
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                </div>
                <div className="text-[10px] text-[#A8B2C1]">
                  Global Flagship Advisory Desk
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-[#A8B2C1] hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-[#FAF8F5]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                    m.sender === "user"
                      ? "bg-[#0A192F] text-[#FAF8F5] font-medium rounded-tr-none shadow-xs"
                      : "bg-white text-[#1A1D20] border border-[#E4DCD0] rounded-tl-none shadow-2xs"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="p-3 rounded-2xl bg-white border border-[#E4DCD0] text-[#747D88] text-[11px] flex items-center gap-1 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto no-scrollbar bg-[#FAF8F5]">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 rounded-full text-[10px] whitespace-nowrap bg-white hover:bg-[#F3EFEA] text-[#0A192F] border border-[#E4DCD0] font-medium transition-colors shadow-2xs cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-[#E4DCD0] flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Inquire on estates, yields, or showings..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 bg-[#FAF8F5] border border-[#E4DCD0] rounded-xl px-3 py-2 text-xs text-[#1A1D20] focus:outline-none focus:border-[#C5A880] placeholder-[#8C95A0]"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] transition-all active:scale-95 shadow-xs cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-[#C5A880]" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}