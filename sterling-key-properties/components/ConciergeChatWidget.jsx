"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, Settings2, Key, Bot, ExternalLink } from "lucide-react";
import { useToast } from "./Toast";

const PROVIDERS = [
  { id: "free-cloud", name: "Free Cloud AI (No Key Needed)", desc: "Zero setup · Open-weights cloud LLM with domain memory", link: "" },
  { id: "gemini", name: "Google Gemini (Free API)", desc: "15 req/min free · Google AI Studio (Gemini 1.5 Flash)", link: "https://aistudio.google.com/app/apikey" },
  { id: "groq", name: "Groq Cloud (Free Llama 3.3)", desc: "30 req/min free · Ultra-fast sub-second inference", link: "https://console.groq.com/keys" },
  { id: "openrouter", name: "OpenRouter (Free Tier)", desc: "Free tier models (Llama 3.2, Mistral, DeepSeek)", link: "https://openrouter.ai/keys" },
  { id: "ollama", name: "Local Ollama (Offline)", desc: "Runs on localhost:11434 · Completely private & offline", link: "https://ollama.com" },
  { id: "domain", name: "Sovereign Built-in Engine", desc: "Instant zero-latency real estate knowledge", link: "" }
];

export default function ConciergeChatWidget({ 
  onOpenSchedule, 
  onOpenPortal, 
  onScrollTo,
  hasComparisonDock = false
}) {
  const { addToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState("free-cloud");
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [activeApiKey, setActiveApiKey] = useState("");
  const [providerLabel, setProviderLabel] = useState("Free AI Concierge");

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
    "Who developed this website?",
    "Schedule Private Viewing"
  ];

  // Load saved preferences on client mount
  useEffect(() => {
    try {
      const savedKey = localStorage.getItem("sterling_llm_key") || "";
      const savedProvider = localStorage.getItem("sterling_llm_provider") || "free-cloud";
      setActiveApiKey(savedKey);
      setApiKeyInput(savedKey);
      setSelectedProvider(savedProvider);
      
      const found = PROVIDERS.find(p => p.id === savedProvider);
      if (found) setProviderLabel(found.name.split(" ")[0] + " AI");
    } catch (_) {}
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    const cleanKey = apiKeyInput.trim();
    setActiveApiKey(cleanKey);

    // Auto-detect provider if user pasted a known key format
    let targetProvider = selectedProvider;
    if (cleanKey.startsWith("AIza")) targetProvider = "gemini";
    else if (cleanKey.startsWith("gsk_")) targetProvider = "groq";
    else if (cleanKey.startsWith("sk-or-")) targetProvider = "openrouter";

    setSelectedProvider(targetProvider);

    try {
      localStorage.setItem("sterling_llm_key", cleanKey);
      localStorage.setItem("sterling_llm_provider", targetProvider);
    } catch (_) {}

    setShowKeyModal(false);
    const provName = PROVIDERS.find(p => p.id === targetProvider)?.name || targetProvider;
    setProviderLabel(provName.split(" (")[0]);

    addToast(
      cleanKey ? `Connected to ${provName}` : `Switched to ${provName}`,
      "success",
      "LLM Concierge Configured"
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
          apiKey: activeApiKey || undefined,
          provider: selectedProvider
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

  const activeProviderObj = PROVIDERS.find(p => p.id === selectedProvider) || PROVIDERS[0];

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
        <div className="w-[360px] sm:w-[430px] h-[580px] bg-[#FAF8F5] border border-[#E4DCD0] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in text-[#1A1D20]">
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
                <div className="text-[10px] text-[#C5A880] font-mono tracking-wider truncate max-w-[210px]" title={providerLabel}>
                  {providerLabel}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowKeyModal(!showKeyModal)}
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  showKeyModal ? "text-[#C5A880] bg-white/15" : "text-[#A8B2C1] hover:text-[#C5A880] hover:bg-white/10"
                }`}
                title="Configure Free LLM Engine"
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

          {/* Free LLM Configuration Modal Strip */}
          {showKeyModal && (
            <div className="p-4 bg-white border-b border-[#E4DCD0] text-xs space-y-3 animate-fade-in shadow-md">
              <div className="flex items-center justify-between font-bold text-[#0A192F]">
                <span className="flex items-center gap-1.5 text-xs">
                  <Key className="w-3.5 h-3.5 text-[#C5A880]" />
                  Select Free LLM Engine
                </span>
                <button onClick={() => setShowKeyModal(false)} className="text-[#8F949B] hover:text-black">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Provider Dropdown */}
              <div>
                <label className="text-[11px] font-semibold text-[#545B65] block mb-1">
                  AI Model / Provider
                </label>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E4DCD0] rounded-lg px-2.5 py-2 text-xs text-[#0A192F] focus:outline-none focus:border-[#C5A880]"
                >
                  {PROVIDERS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-[#747D88] mt-1">
                  {activeProviderObj.desc}
                </p>
              </div>

              {/* API Key Input (only for providers needing a key) */}
              {["gemini", "groq", "openrouter"].includes(selectedProvider) && (
                <div>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#545B65] mb-1">
                    <span>API Key (100% Free)</span>
                    {activeProviderObj.link && (
                      <a
                        href={activeProviderObj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#C5A880] hover:underline flex items-center gap-1 text-[10px]"
                      >
                        Get Free Key <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                  <input
                    type="password"
                    placeholder={`Paste ${activeProviderObj.name.split(" ")[0]} free API key...`}
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E4DCD0] rounded-lg px-2.5 py-1.5 text-xs text-[#0A192F] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              )}

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setApiKeyInput("");
                    setActiveApiKey("");
                    setSelectedProvider("free-cloud");
                    try {
                      localStorage.removeItem("sterling_llm_key");
                      localStorage.setItem("sterling_llm_provider", "free-cloud");
                    } catch (_) {}
                    setShowKeyModal(false);
                    setProviderLabel("Free Cloud AI");
                    addToast("Reset to Free Cloud AI", "info", "Reset");
                  }}
                  className="px-2.5 py-1 rounded-md text-[11px] text-[#747D88] hover:text-[#0A192F]"
                >
                  Reset Default
                </button>
                <button
                  onClick={handleSaveSettings}
                  className="px-3.5 py-1.5 rounded-lg bg-[#0A192F] text-white font-semibold text-xs hover:bg-[#142E54]"
                >
                  Save Settings
                </button>
              </div>
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
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
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