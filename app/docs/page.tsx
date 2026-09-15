"use client";

import Sidebar from "@/app/components/Sidebar";
import TopNav from "@/app/components/TopNav";

export default function DocsPage() {
  return (
    <div className="relative flex min-h-screen w-full bg-background-dark">
      <Sidebar />

      <main className="flex-1 ml-60 flex flex-col">
        <TopNav />

        <div className="p-8 flex flex-col gap-8 overflow-y-auto">
          <div>
            <h1 className="text-4xl font-bold text-text-primary mb-2">
              Documentation
            </h1>
            <p className="text-muted">Theme system and customization guide</p>
          </div>

          {/* Theme System */}
          <section className="glass-panel p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Theme System
            </h2>
            <p className="text-text-primary mb-4">
              The dashboard includes a comprehensive theme system with multiple
              features:
            </p>
            <ul className="space-y-2 text-text-primary">
              <li className="flex gap-2">
                <span className="material-symbols-outlined text-accent-success">
                  check
                </span>
                <span>Dark and Light themes with smooth transitions</span>
              </li>
              <li className="flex gap-2">
                <span className="material-symbols-outlined text-accent-success">
                  check
                </span>
                <span>Automatic system preference detection</span>
              </li>
              <li className="flex gap-2">
                <span className="material-symbols-outlined text-accent-success">
                  check
                </span>
                <span>High contrast mode for accessibility</span>
              </li>
              <li className="flex gap-2">
                <span className="material-symbols-outlined text-accent-success">
                  check
                </span>
                <span>Custom theme presets</span>
              </li>
              <li className="flex gap-2">
                <span className="material-symbols-outlined text-accent-success">
                  check
                </span>
                <span>localStorage persistence</span>
              </li>
            </ul>
          </section>

          {/* Theme Controls */}
          <section className="glass-panel p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Theme Controls
            </h2>
            <div className="space-y-4">
              <div className="border-l-2 border-primary pl-4 py-2">
                <h3 className="font-semibold text-text-primary mb-1">
                  Theme Toggle
                </h3>
                <p className="text-sm text-muted">
                  Click the sun/moon icon in the top navbar to switch between
                  dark and light themes.
                </p>
              </div>
              <div className="border-l-2 border-primary pl-4 py-2">
                <h3 className="font-semibold text-text-primary mb-1">
                  Accessibility Mode
                </h3>
                <p className="text-sm text-muted">
                  Click the contrast icon to enable high contrast mode for
                  better readability.
                </p>
              </div>
              <div className="border-l-2 border-primary pl-4 py-2">
                <h3 className="font-semibold text-text-primary mb-1">
                  Theme Customizer
                </h3>
                <p className="text-sm text-muted">
                  Click the palette icon to select from preset theme variations
                  (Default, Ocean, Sunset, etc).
                </p>
              </div>
            </div>
          </section>

          {/* Color Palettes */}
          <section className="glass-panel p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Color Palettes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dark Theme */}
              <div>
                <h3 className="font-semibold text-text-primary mb-3">
                  Dark Theme
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-primary border border-surface-highlight" />
                    <div>
                      <p className="text-sm font-mono text-text-primary">
                        #00F0FF
                      </p>
                      <p className="text-xs text-muted">Primary Accent</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-accent-success border border-surface-highlight" />
                    <div>
                      <p className="text-sm font-mono text-text-primary">
                        #00FF85
                      </p>
                      <p className="text-xs text-muted">Success</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-accent-error border border-surface-highlight" />
                    <div>
                      <p className="text-sm font-mono text-text-primary">
                        #FF2A5F
                      </p>
                      <p className="text-xs text-muted">Error</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Light Theme */}
              <div>
                <h3 className="font-semibold text-text-primary mb-3">
                  Light Theme
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded border-2 border-primary"
                      style={{ backgroundColor: "#00C2CC" }}
                    />
                    <div>
                      <p className="text-sm font-mono text-text-primary">
                        #00C2CC
                      </p>
                      <p className="text-xs text-muted">Primary Accent</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded border-2 border-primary"
                      style={{ backgroundColor: "#059669" }}
                    />
                    <div>
                      <p className="text-sm font-mono text-text-primary">
                        #059669
                      </p>
                      <p className="text-xs text-muted">Success</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded border-2 border-primary"
                      style={{ backgroundColor: "#DC2626" }}
                    />
                    <div>
                      <p className="text-sm font-mono text-text-primary">
                        #DC2626
                      </p>
                      <p className="text-xs text-muted">Error</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="glass-panel p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-surface-highlight rounded p-4">
                <h3 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-accent-success">
                    auto_awesome
                  </span>
                  Auto-Detection
                </h3>
                <p className="text-sm text-muted">
                  Automatically detects your system theme preference
                </p>
              </div>
              <div className="border border-surface-highlight rounded p-4">
                <h3 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-accent-success">
                    storage
                  </span>
                  Persistent Storage
                </h3>
                <p className="text-sm text-muted">
                  Your theme preference is saved locally
                </p>
              </div>
              <div className="border border-surface-highlight rounded p-4">
                <h3 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-accent-success">
                    accessibility
                  </span>
                  Accessibility
                </h3>
                <p className="text-sm text-muted">
                  High contrast mode for better readability
                </p>
              </div>
              <div className="border border-surface-highlight rounded p-4">
                <h3 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-accent-success">
                    palette
                  </span>
                  Custom Themes
                </h3>
                <p className="text-sm text-muted">
                  Multiple preset theme variations
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
