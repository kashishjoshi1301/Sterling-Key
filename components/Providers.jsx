"use client";

import React from "react";
import { CurrencyProvider } from "./CurrencyContext";
import { ToastProvider } from "./Toast";
import { TransactionProvider } from "./TransactionContext";

export default function Providers({ children }) {
  return (
    <CurrencyProvider>
      <TransactionProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </TransactionProvider>
    </CurrencyProvider>
  );
}
