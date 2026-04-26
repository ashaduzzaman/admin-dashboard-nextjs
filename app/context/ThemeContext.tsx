"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "dark" | "light";
type AccessibilityMode = "normal" | "high-contrast";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  accessibility: AccessibilityMode;
  toggleAccessibility: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  accessibility: "normal",
  toggleAccessibility: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [accessibility, setAccessibility] = useState<AccessibilityMode>("normal");

  useEffect(() => {
    // Check for stored preference first
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    const storedAccessibility = localStorage.getItem("accessibility") as AccessibilityMode | null;

    // If no stored preference, detect system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = storedTheme || (prefersDark ? "dark" : "light");
    const initialA11y = storedAccessibility || "normal";

    setTheme(initial);
    setAccessibility(initialA11y);
    applyTheme(initial, initialA11y);

    // Listen for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if no user preference is set
      if (!localStorage.getItem("theme")) {
        const newTheme = e.matches ? "dark" : "light";
        setTheme(newTheme);
        applyTheme(newTheme, initialA11y);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const applyTheme = (newTheme: Theme, a11y: AccessibilityMode = "normal") => {
    const html = document.documentElement;

    // Remove all theme classes
    html.classList.remove("dark", "light", "high-contrast");

    // Add theme class
    html.classList.add(newTheme);

    // Add accessibility class if high-contrast
    if (a11y === "high-contrast") {
      html.classList.add("high-contrast");
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      applyTheme(newTheme, accessibility);
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const toggleAccessibility = () => {
    setAccessibility((prev) => {
      const newA11y = prev === "normal" ? "high-contrast" : "normal";
      applyTheme(theme, newA11y);
      localStorage.setItem("accessibility", newA11y);
      return newA11y;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, accessibility, toggleAccessibility }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}
