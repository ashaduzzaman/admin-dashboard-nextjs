"use client";

import ThemeToggle from "./ThemeToggle";
import AccessibilityToggle from "./AccessibilityToggle";
import ThemeCustomizer from "./ThemeCustomizer";
import NotificationsPanel from "./NotificationsPanel";

export default function TopNav() {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-surface-highlight glass-panel px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-[400px] group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
            <span className="material-symbols-outlined text-xl">search</span>
          </div>
          <input
            className="w-full h-10 bg-background-dark border border-surface-highlight rounded-lg pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted/50"
            placeholder="Search system commands... (Press /)"
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <NotificationsPanel />
        <ThemeCustomizer />
        <AccessibilityToggle />
        <ThemeToggle />
        <button className="h-10 px-4 bg-primary text-background-dark text-sm font-bold rounded-lg hover:brightness-110 transition-all flex items-center gap-2">
          <span>Deploy</span>
          <span className="material-symbols-outlined text-lg">rocket_launch</span>
        </button>
      </div>
    </header>
  );
}
