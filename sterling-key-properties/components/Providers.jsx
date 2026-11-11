"use client";

import React from "react";
import { CurrencyProvider } from "./CurrencyContext";
import { ToastProvider } from "./Toast";

export default function Providers({ children }) {
  return (
    <CurrencyProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </CurrencyProvider>
  );
}
