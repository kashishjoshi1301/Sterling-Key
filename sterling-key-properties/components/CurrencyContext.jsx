"use client";

import React, { createContext, useContext, useState } from "react";

const CurrencyContext = createContext(null);

const RATES = {
  USD: { symbol: "$", rate: 1, name: "USD" },
  GBP: { symbol: "£", rate: 0.79, name: "GBP" },
  EUR: { symbol: "€", rate: 0.92, name: "EUR" },
  AED: { symbol: "AED ", rate: 3.67, name: "AED" }
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("USD");
  const [unit, setUnit] = useState("sqft"); // "sqft" or "sqm"

  const formatPrice = (usdAmount) => {
    if (!usdAmount) return "Price Upon Request";
    const { symbol, rate } = RATES[currency];
    const converted = Math.round(usdAmount * rate);

    if (converted >= 1000000) {
      const millions = (converted / 1000000).toFixed(1);
      return `${symbol}${millions}M`;
    }
    return `${symbol}${converted.toLocaleString("en-US")}`;
  };

  const formatRawPrice = (usdAmount) => {
    if (!usdAmount) return "Price Upon Request";
    const { symbol, rate } = RATES[currency];
    const converted = Math.round(usdAmount * rate);
    return `${symbol}${converted.toLocaleString("en-US")}`;
  };

  const formatArea = (sqftVal, sqmVal) => {
    if (unit === "sqm") {
      return `${(sqmVal || Math.round(sqftVal * 0.092903)).toLocaleString("en-US")} M²`;
    }
    return `${(sqftVal || 0).toLocaleString("en-US")} SF`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        unit,
        setUnit,
        formatPrice,
        formatRawPrice,
        formatArea,
        activeSymbol: RATES[currency].symbol
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return context;
}
