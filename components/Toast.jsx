"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, Info, AlertCircle, X } from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success", title = "") => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type, title }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast Render Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-[#0E1015]/95 backdrop-blur-xl border border-white/15 text-white p-3.5 rounded-2xl shadow-2xl shadow-black/80 flex items-start gap-3 animate-fade-in transition-all"
          >
            <div className="shrink-0 mt-0.5">
              {toast.type === "success" && (
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-stone-200">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
              {toast.type === "info" && (
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-stone-200">
                  <Info className="w-4 h-4" />
                </div>
              )}
              {toast.type === "error" && (
                <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400">
                  <AlertCircle className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              {toast.title && (
                <div className="text-xs font-serif font-medium text-white line-clamp-1">
                  {toast.title}
                </div>
              )}
              <div className="text-[11px] text-neutral-300 leading-snug">
                {toast.message}
              </div>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-neutral-500 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
