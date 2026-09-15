"use client";

import { useState } from "react";

interface ThemeOption {
  name: string;
  colors: {
    primary: string;
    background: string;
    text: string;
    accent: string;
  };
}

const presetThemes: Record<string, ThemeOption> = {
  default_dark: {
    name: "Default Dark",
    colors: {
      primary: "#00f0ff",
      background: "#070b14",
      text: "#f9fafb",
      accent: "#00ff85",
    },
  },
  default_light: {
    name: "Default Light",
    colors: {
      primary: "#00c2cc",
      background: "#ffffff",
      text: "#111827",
      accent: "#059669",
    },
  },
  ocean_dark: {
    name: "Ocean Dark",
    colors: {
      primary: "#0ea5e9",
      background: "#0c1428",
      text: "#f1f5f9",
      accent: "#10b981",
    },
  },
  sunset_dark: {
    name: "Sunset Dark",
    colors: {
      primary: "#f97316",
      background: "#1a0f0a",
      text: "#fef3c7",
      accent: "#ec4899",
    },
  },
};

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("default_dark");

  const handleThemeSelect = (themeKey: string) => {
    setSelectedTheme(themeKey);
    const theme = presetThemes[themeKey];

    // Apply custom theme colors to CSS variables
    if (theme) {
      const root = document.documentElement;
      root.style.setProperty("--primary", theme.colors.primary);
      root.style.setProperty("--background-dark", theme.colors.background);
      root.style.setProperty("--text-primary", theme.colors.text);
      root.style.setProperty("--accent-success", theme.colors.accent);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center size-10 rounded-lg hover:bg-surface-highlight text-muted transition-colors"
        title="Theme customizer"
      >
        <span className="material-symbols-outlined">palette</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 glass-panel rounded-lg p-4 z-50 shadow-xl">
          <h4 className="text-sm font-semibold text-text-primary mb-3">
            Theme Presets
          </h4>
          <div className="space-y-2">
            {Object.entries(presetThemes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => handleThemeSelect(key)}
                className={`w-full text-left px-3 py-2 rounded transition-colors ${
                  selectedTheme === key
                    ? "bg-primary text-background-dark font-semibold"
                    : "hover:bg-surface-highlight text-text-primary"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                  <span className="text-sm">{theme.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
