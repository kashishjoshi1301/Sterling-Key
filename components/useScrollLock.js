"use client";

import { useEffect } from "react";

let scrollLockCount = 0;

export function useScrollLock(locked = true, onClose = null) {
  // Lock / Unlock Background Scroll
  useEffect(() => {
    if (!locked || typeof document === "undefined") return;

    scrollLockCount++;
    if (scrollLockCount === 1) {
      document.documentElement.classList.add("overflow-locked");
      document.body.classList.add("overflow-locked");
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    }

    return () => {
      scrollLockCount = Math.max(0, scrollLockCount - 1);
      if (scrollLockCount === 0) {
        document.documentElement.classList.remove("overflow-locked");
        document.body.classList.remove("overflow-locked");
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        document.body.style.touchAction = "";
      }
    };
  }, [locked]);

  // Handle Escape Key
  useEffect(() => {
    if (!locked || !onClose || typeof window === "undefined") return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [locked, onClose]);
}
