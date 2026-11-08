"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, Settings2, Key, Bot } from "lucide-react";
import { useToast } from "./Toast";

export default function ConciergeChatWidget({ 
  onOpenSchedule, 
  onOpenPortal, 
  onScrollTo,
  hasComparisonDock = false
}) {
  const { addToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [activeApiKey, setActiveApiKey] = useState("");
  const [providerLabel, setProviderLabel] = useState("Sterling Sovereign AI (Free LLM)");

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Welcome to Sterling Key Properties. I am your Private Sovereign Concierge. How may I assist your portfolio acquisitions, capitalization models, or discreet off-market inquiries today?"
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "Miami Waterfront Cap Rate",
    "How to decrypt The Vault?",
    "Greystar Management Fees",
    "Schedule Private Viewing"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    setActiveApiKey(apiKeyInput.trim());
    setShowKeyModal(false);
    addToast(
      apiKeyInput.trim() ? "Custom Free LLM API key connected" : "Switched to built-in Sovereign AI engine",
      "success",
      "AI Concierge Configured"
    );
  };

  const handleSend = async (textToSend) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInputVal("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          apiKey: activeApiKey || undefined
        })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev, 
          { role: "assistant", content: data.response }
        ]);
        if (data.provider) setProviderLabel(data.provider);
      } else {
        throw new Error("Chat request failed");
      }
    } catch (err) {
      // Graceful fallback response
      setMessages((prev) => [
        ...prev, 
        { 
          role: "assistant", 
          content: "Our Senior Managing Director is reviewing your inquiry. For immediate private treaty guidance, you may schedule a confidential advisory consultation or enter keycode 'STERLING2026' on The Vault page." 
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`fixed right-4 sm:right-6 z-40 transition-all duration-300 ${
      hasComparisonDock ? "bottom-24 sm:bottom-8" : "bottom-6 sm:bottom-8"
    }`}>
      {/* Minimized Trigger Button */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-3 p-3.5 sm:px-5 sm:py-3 rounded-full bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] border border-[#C5A880]/50 shadow-2xl transition-all duration-300 cursor-pointer active:scale-95"
          title="Open AI Private Concierge"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-[#C5A880]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#C5A880] animate-ping" />
          </div>
          <span className="text-xs sm:text-sm uppercase tracking-wider font-bold hidden sm:inline">
            Private Concierge
          </span>
        </button>
      ) : (
        /* Expanded Chat Drawer */
        <div className="w-[360px] sm:w-[420px] h-[560px] bg-[#FAF8F5] border border-[#E4DCD0] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in text-[#1A1D20]">
          {/* Header in Deep Navy */}
          <div className="p-4 bg-[#0A192F] text-white border-b border-[#060D18] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#C5A880] border border-[#C5A880]/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-serif text-white font-bold flex items-center gap-2">
                  Sterling AI Concierge
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[10px] text-[#C5A880] font-mono tracking-wider">
                  {providerLabel}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowKeyModal(!showKeyModal)}
                className="p-2 rounded-full text-[#A8B2C1] hover:text-[#C5A880] hover:bg-white/10 transition-colors cursor-pointer"
                title="Configure Free LLM Key"
              >
                <Settings2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full text-[#A8B2C1] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Optional Free LLM Key Settings Modal Strip */}
          {showKeyModal && (
            <div className="p-3.5 bg-white border-b border-[#E4DCD0] text-xs space-y-2 animate-fade-in shadow-xs">
              <div className="flex items-center justify-between font-bold text-[#0A192F]">
                <span className="flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-[#C5A880]" />
                  Custom Free LLM API Key (Optional)
                </span>
                <button onClick={() => setShowKeyModal(false)} className="text-[#8F949B] hover:text-black">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-[#545B65]">
                Leave empty to use the built-in free Sovereign AI Engine, or paste a free OpenRouter/Gemini key.
              </p>
              <form onSubmit={handleSaveApiKey} className="flex gap-2">
                <input
                  type="password"
                  placeholder="sk-or-... (optional)"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  className="flex-1 bg-[#FAF8F5] border border-[#E4DCD0] rounded-lg px-2.5 py-1.5 text-xs text-[#0A192F] focus:outline-none focus:border-[#C5A880]"
                />
                <button
                  type="submit"
                  className="py-1.5 px-3 rounded-lg bg-[#0A192F] text-white font-semibold text-xs hover:bg-[#142E54]"
                >
                  Save
                </button>
              </form>
            </div>
          )}

          {/* Messages Area with Large, Legible Typography */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-sm bg-[#FAF8F5]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                    m.role === "user"
                      ? "bg-[#0A192F] text-[#FAF8F5] font-medium rounded-tr-none shadow-xs"
                      : "bg-white text-[#1A1D20] border border-[#E4DCD0] rounded-tl-none shadow-xs"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="p-3.5 rounded-2xl bg-white border border-[#E4DCD0] text-[#747D88] text-xs flex items-center gap-1.5 shadow-xs">
                  <Bot className="w-3.5 h-3.5 text-[#C5A880] animate-spin" />
                  <span>Sovereign Concierge is analyzing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3.5 py-2 flex gap-2 overflow-x-auto no-scrollbar bg-[#FAF8F5] border-t border-[#E4DCD0]/60">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="px-3 py-1.5 rounded-full text-xs whitespace-nowrap bg-white hover:bg-[#F3EFEA] text-[#0A192F] border border-[#E4DCD0] font-semibold transition-colors shadow-2xs cursor-pointer"
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
              placeholder="Ask anything about yields, estates, or showings..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 bg-[#FAF8F5] border border-[#E4DCD0] rounded-xl px-4 py-2.5 text-sm text-[#1A1D20] focus:outline-none focus:border-[#C5A880] placeholder-[#8C95A0]"
            />
            <button
              type="submit"
              disabled={isTyping}
              className="p-2.5 rounded-xl bg-[#0A192F] hover:bg-[#142E54] text-[#FAF8F5] transition-all active:scale-95 shadow-sm disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#C5A880]" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
