"use client";

import React, { createContext, useContext, useCallback } from "react";

const ToastContext = createContext({
  addToast: () => {},
  removeToast: () => {}
});

export function ToastProvider({ children }) {
  // Notifications completely disabled across the entire website per user request
  const addToast = useCallback(() => {}, []);
  const removeToast = useCallback(() => {}, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return { addToast: () => {}, removeToast: () => {} };
  }
  return context;
}
