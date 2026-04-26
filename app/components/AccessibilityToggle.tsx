"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/app/context/ThemeContext";

export default function AccessibilityToggle() {
  const [mounted, setMounted] = useState(false);
  const { accessibility, toggleAccessibility } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="flex items-center justify-center size-10 rounded-lg hover:bg-surface-highlight text-muted transition-colors">
        <span className="material-symbols-outlined">contrast</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleAccessibility}
      className="flex items-center justify-center size-10 rounded-lg hover:bg-surface-highlight text-muted transition-colors"
      title={`Switch to ${accessibility === "normal" ? "high contrast" : "normal"} mode`}
    >
      <span className="material-symbols-outlined">
        {accessibility === "high-contrast" ? "contrast" : "contrast"}
      </span>
    </button>
  );
}
