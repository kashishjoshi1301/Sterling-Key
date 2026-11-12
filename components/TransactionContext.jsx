"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const TransactionContext = createContext(null);

export function TransactionProvider({ children }) {
  const [boughtIds, setBoughtIds] = useState([]);
  const [rentedIds, setRentedIds] = useState([]);
  const [treaties, setTreaties] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedBought = localStorage.getItem("sterling_bought_ids");
      if (storedBought) setBoughtIds(JSON.parse(storedBought));

      const storedRented = localStorage.getItem("sterling_rented_ids");
      if (storedRented) setRentedIds(JSON.parse(storedRented));

      const storedTreaties = localStorage.getItem("sterling_treaties");
      if (storedTreaties) setTreaties(JSON.parse(storedTreaties));
    } catch {
      // fallback
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Buy property action (with optional treaty dossier data)
  const buyProperty = useCallback((id, treatyData = null) => {
    setBoughtIds((prev) => {
      if (prev.includes(id)) return prev;
      const updated = [...prev, id];
      try {
        localStorage.setItem("sterling_bought_ids", JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // Remove from rented if previously rented
    setRentedIds((prev) => {
      const updated = prev.filter((item) => item !== id);
      try {
        localStorage.setItem("sterling_rented_ids", JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // Store treaty dossier if provided
    if (treatyData) {
      setTreaties((prev) => {
        const updated = { ...prev, [id]: treatyData };
        try {
          localStorage.setItem("sterling_treaties", JSON.stringify(updated));
        } catch {}
        return updated;
      });
    }
  }, []);

  // Rent property action (with optional treaty dossier data)
  const rentProperty = useCallback((id, treatyData = null) => {
    setRentedIds((prev) => {
      if (prev.includes(id)) return prev;
      const updated = [...prev, id];
      try {
        localStorage.setItem("sterling_rented_ids", JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // Remove from bought if previously bought
    setBoughtIds((prev) => {
      const updated = prev.filter((item) => item !== id);
      try {
        localStorage.setItem("sterling_bought_ids", JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // Store treaty dossier if provided
    if (treatyData) {
      setTreaties((prev) => {
        const updated = { ...prev, [id]: treatyData };
        try {
          localStorage.setItem("sterling_treaties", JSON.stringify(updated));
        } catch {}
        return updated;
      });
    }
  }, []);

  // Release back to market
  const releaseProperty = useCallback((id) => {
    setBoughtIds((prev) => {
      const updated = prev.filter((item) => item !== id);
      try {
        localStorage.setItem("sterling_bought_ids", JSON.stringify(updated));
      } catch {}
      return updated;
    });

    setRentedIds((prev) => {
      const updated = prev.filter((item) => item !== id);
      try {
        localStorage.setItem("sterling_rented_ids", JSON.stringify(updated));
      } catch {}
      return updated;
    });

    setTreaties((prev) => {
      const updated = { ...prev };
      delete updated[id];
      try {
        localStorage.setItem("sterling_treaties", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  const isBought = useCallback((id) => boughtIds.includes(id), [boughtIds]);
  const isRented = useCallback((id) => rentedIds.includes(id), [rentedIds]);
  const getTreaty = useCallback((id) => treaties[id] || null, [treaties]);

  const getPropertyStatus = useCallback((prop) => {
    if (!prop) return "Available";
    if (boughtIds.includes(prop.id)) return "Sold Out";
    if (rentedIds.includes(prop.id)) return "Currently Unavailable";
    return prop.status || "Available";
  }, [boughtIds, rentedIds]);

  return (
    <TransactionContext.Provider
      value={{
        boughtIds,
        rentedIds,
        treaties,
        buyProperty,
        rentProperty,
        releaseProperty,
        isBought,
        isRented,
        getTreaty,
        getPropertyStatus,
        isLoaded
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransaction() {
  const context = useContext(TransactionContext);
  if (!context) {
    return {
      boughtIds: [],
      rentedIds: [],
      treaties: {},
      buyProperty: () => {},
      rentProperty: () => {},
      releaseProperty: () => {},
      isBought: () => false,
      isRented: () => false,
      getTreaty: () => null,
      getPropertyStatus: (prop) => (prop ? prop.status || "Available" : "Available"),
      isLoaded: false
    };
  }
  return context;
}
