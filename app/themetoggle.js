"use client";

import { useState, useEffect } from "react";

export default function themetoggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative w-12 h-7 rounded-full border border-base transition-colors duration-300"
      style={{ background: dark ? "var(--brand)" : "var(--bg-soft)" }}
    >
      <span
        className="absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center text-[10px] transition-transform duration-300"
        style={{ transform: dark ? "translateX(20px)" : "translateX(0)" }}
      >
        {dark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}