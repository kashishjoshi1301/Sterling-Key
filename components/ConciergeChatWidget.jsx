"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, ArrowRight, User, ShieldCheck } from "lucide-react";
import { useToast } from "./Toast";

export default function ConciergeChatWidget({ 
  onOpenSchedule, 
  onOpenPortal, 
  onScrollTo 
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

    // Realistic tailored assistant responses
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
    <div className="fixed bottom-6 right-6 z-40">
      {/* Minimized Trigger Button */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 p-3 sm:px-4 sm:py-2.5 rounded-full bg-[#0E1015]/95 hover:bg-white text-white hover:text-neutral-950 border border-white/20 hover:border-white shadow-2xl transition-all duration-300"
        >
          <div className="relative">
            <MessageSquare className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-stone-300 animate-ping" />
          </div>
          <span className="text-xs uppercase tracking-wider font-semibold hidden sm:inline">
            Private Concierge
          </span>
        </button>
      ) : (
        /* Expanded Chat Drawer */
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-[#0A0C10] border border-white/20 rounded-3xl shadow-2xl shadow-black flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="p-4 bg-[#0E1015] border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/15">
                <Sparkles className="w-4 h-4 text-stone-300" />
              </div>
              <div>
                <div className="text-xs font-serif text-white font-medium flex items-center gap-1.5">
                  Sterling Private Concierge
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[10px] text-neutral-400">
                  Global Flagship Advisory Desk
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                    m.sender === "user"
                      ? "bg-white text-neutral-950 font-medium rounded-tr-none"
                      : "bg-[#12151D] text-neutral-200 border border-white/[0.06] rounded-tl-none"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="p-3 rounded-2xl bg-[#12151D] border border-white/[0.06] text-neutral-400 text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 rounded-full text-[10px] whitespace-nowrap bg-white/[0.04] hover:bg-white/10 text-neutral-300 border border-white/10 transition-colors"
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
            className="p-3 bg-[#0E1015] border-t border-white/[0.06] flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Inquire on estates, yields, or showings..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 bg-[#08090C] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30 placeholder-neutral-500"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-white hover:bg-stone-200 text-neutral-950 transition-all active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
