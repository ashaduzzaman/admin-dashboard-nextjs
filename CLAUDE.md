# Admin Dashboard Implementation Guide

This document provides comprehensive guidance for implementing the admin dashboard using Next.js 15+ and Tailwind CSS with full dark/light theme support.

## Project Overview

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Material Symbols Outlined (Google Fonts)
- **Fonts**: Manrope (display/body), JetBrains Mono (monospace)
- **Theme System**: CSS Variables with Dark/Light mode toggle

---

## Implementation Status

✅ **Completed**:
- Next.js 15+ project setup with App Router
- Tailwind CSS configuration with CSS variables
- Dark theme (primary design system)
- Light theme (alternative theme)
- Theme toggle functionality in TopNav
- All core components (Sidebar, TopNav, MetricCard, etc.)
- Settings page with API keys, access control, and danger zone
- TypeScript support with interfaces
- Layout components with proper styling

---

## Theme System

### Dark Theme (Primary)

The main theme from `dashboard-dark.html` serves as the primary design system.

| Token               | Value     | Usage                             |
| ------------------- | --------- | --------------------------------- |
| `primary`           | `#00F0FF` | Accent color, active states, CTAs |
| `background-dark`   | `#070B14` | Page background                   |
| `surface`           | `#111827` | Card backgrounds                  |
| `surface-highlight` | `#1F2937` | Borders, hover states             |
| `text-primary`      | `#F9FAFB` | Primary text                      |
| `muted`             | `#9CA3AF` | Secondary text                    |
| `accent-success`    | `#00FF85` | Success states, positive metrics  |
| `accent-error`      | `#FF2A5F` | Error states, critical alerts     |

### Light Theme (Alternative)

Alternative theme implemented with dynamic CSS variables.

| Token               | Value     | Usage                    |
| ------------------- | --------- | ------------------------ |
| `primary`           | `#00C2CC` | Accent color (teal)      |
| `background-dark`   | `#FFFFFF` | Page background (white)  |
| `surface`           | `#FFFFFF` | Card backgrounds (white) |
| `surface-highlight` | `#E5E7EB` | Borders (light gray)     |
| `text-primary`      | `#111827` | Primary text (dark)      |
| `muted`             | `#6B7280` | Secondary text           |
| `accent-success`    | `#059669` | Success states (green)   |
| `accent-error`      | `#DC2626` | Error states (red)       |

---

## Component Architecture

### Layout Components

#### Sidebar (`app/components/Sidebar.tsx`)
- Fixed position, 240px width
- Glass panel effect with backdrop blur
- Logo with icon and text (QUANTUM v2.4.0)
- Navigation items with hover/active states
- **Dynamic active state** based on `usePathname()` hook
  - Active state: `border-left: 2px solid #00F0FF`, `background: rgba(0, 240, 255, 0.05)`, cyan icon
  - Hover state (inactive): subtle background highlight
- Links to all dashboard pages: Dashboard, Data Explorer, Analytics, Logs, Infrastructure, Settings
- User profile section at bottom

#### TopNav (`app/components/TopNav.tsx`)
- Sticky header, 64px height
- Search input with keyboard shortcut hint
- **NotificationsPanel** (replaced notification bell)
- **ThemeCustomizer** (palette icon)
- **AccessibilityToggle** (contrast icon)
- **ThemeToggle** (sun/moon icon)
- Deploy action button

#### ThemeToggle (`app/components/ThemeToggle.tsx`)
- Handles theme switching (dark ↔ light)
- Uses React hooks for client-side rendering
- Persists theme preference to localStorage
- Shows/hides icon based on current theme

### Dashboard Components

#### MetricCard (`app/components/MetricCard.tsx`)
- Glass panel styling
- Title with icon
- Large metric value (mono font)
- Optional sparkline SVG chart
- Hover effect: scale transform + neon border glow
- Change indicators with up/down arrows
- Special indicators: "STABLE", percentage changes

#### SystemAlerts (`app/components/SystemAlerts.tsx`)
- Alert cards with colored left border
- Icon + title + message + timestamp
- Variants: critical (red), info (cyan), log (muted)
- "View All Events" action button

#### ThroughputChart (`app/components/ThroughputChart.tsx`)
- Chart placeholder with decorative bars
- Pulse animation for loading state
- Database cluster and AWS region indicators
- "ANALYZING SIGNAL INTERCEPT..." message

#### DataTable (`app/components/DataTable.tsx`)
- Reusable table component with configurable columns
- Column interface: key, label, sortable, render function
- Features:
  - Custom cell rendering with optional render functions
  - Sortable indicators (chevron icons)
  - Loading state with spinner animation
  - Empty state handling
  - Responsive scrolling
  - Hover effects on rows
  - Glass panel styling with borders

#### LiveMetrics (`app/components/LiveMetrics.tsx`)
- Real-time metrics display using `useRealTimeData` hook
- Shows three metrics: Active Users, Requests/sec, Latency
- Features:
  - Live connection indicator with pulse animation
  - Trend indicators (up/down/stable arrows)
  - Percentage change display
  - Last update timestamp
  - Configurable update intervals
  - Color-coded trends (success/error/muted)

#### NotificationsPanel (`app/components/NotificationsPanel.tsx`)
- Dropdown panel in TopNav showing recent notifications
- Features:
  - Unread count badge (shows 9+ when exceeds 9)
  - 4 most recent notifications displayed
  - Type-based icon and color (feature/improvement/bugfix/security)
  - Dismissible notifications with localStorage persistence
  - Expandable changelog details
  - NEW badge for unread items
  - Connection to `/notifications` data source

### Additional Pages

#### Data Explorer Page (`app/data-explorer/page.tsx`)
- Route: `/data-explorer`
- Features:
  - Summary statistics cards (Total, Active, Pending, Inactive)
  - DataTable component showing sample user data
  - 6 sample users with realistic data
  - Status badges with color coding
  - Request metrics display
  - Full layout with Sidebar and TopNav

#### Documentation Page (`app/docs/page.tsx`)
- Route: `/docs`
- Comprehensive theme system documentation
- Theme controls guide
- Color palette reference
- Feature highlights
- Accessibility features documentation

### Settings Page Components

From `settings-screen.html` - implement only the content area (not navbar/sidebar).

#### APIKeysTable (`app/components/settings/APIKeysTable.tsx`)
- Table with columns: Key Name, Secret Key, Created, Actions
- Masked key display with reveal toggle
- Copy and delete action buttons
- "Generate New Key" button

#### AccessControlForm (`app/components/settings/AccessControlForm.tsx`)
- IP Whitelist textarea (CIDR notation)
- Rate Limit input (req/sec)
- Timeout input (ms)
- Save/Cancel buttons

#### DangerZone (`app/components/settings/DangerZone.tsx`)
- Red bordered section
- Warning icon
- Delete workspace button with confirmation
- Destructive action styling

---

## Theme Implementation

### CSS Variables Architecture

All colors are defined as CSS variables in `app/globals.css`:

```css
html.dark {
  --primary: #00f0ff;
  --background-dark: #070b14;
  /* ... other dark colors */
}

html.light {
  --primary: #00c2cc;
  --background-dark: #ffffff;
  /* ... other light colors */
}
```

### Tailwind Configuration

Updated `tailwind.config.ts` to reference CSS variables:

```typescript
colors: {
  primary: "var(--primary)",
  "background-dark": "var(--background-dark)",
  surface: "var(--surface)",
  // ... all other colors use CSS variables
}
```

This ensures Tailwind classes automatically use the current theme colors.

### Theme Toggle Flow

1. User clicks theme toggle button in TopNav
2. `useTheme()` hook updates theme state
3. `ThemeContext.toggleTheme()` applies `dark`/`light` class to `<html>` element
4. CSS variables update based on `html.dark` or `html.light` selector
5. Tailwind classes automatically reflect new colors
6. Theme preference saved to localStorage

---

## Tailwind Configuration

```typescript
// filepath: tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "background-dark": "var(--background-dark)",
        surface: "var(--surface)",
        "surface-highlight": "var(--surface-highlight)",
        "text-primary": "var(--text-primary)",
        muted: "var(--muted)",
        "accent-success": "var(--accent-success)",
        "accent-error": "var(--accent-error)",
      },
      fontFamily: {
        display: ["var(--font-manrope)", "sans-serif"],
        body: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
export default config;
```

---

## Global Styles

```css
/* filepath: app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-manrope: "Manrope", sans-serif;
  --font-jetbrains: "JetBrains Mono", monospace;
}

html.dark {
  --primary: #00f0ff;
  --background-dark: #070b14;
  --surface: #111827;
  --surface-highlight: #1f2937;
  --text-primary: #f9fafb;
  --muted: #9ca3af;
  --accent-success: #00ff85;
  --accent-error: #ff2a5f;
}

html.light {
  --primary: #00c2cc;
  --background-dark: #ffffff;
  --surface: #ffffff;
  --surface-highlight: #e5e7eb;
  --text-primary: #111827;
  --muted: #6b7280;
  --accent-success: #059669;
  --accent-error: #dc2626;
}

body {
  background-color: var(--background-dark);
  color: var(--text-primary);
  font-family: var(--font-manrope);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.glass-panel {
  background: var(--surface);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border: 1px solid var(--surface-highlight);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

html.dark .glass-panel {
  background: rgba(17, 24, 39, 0.7);
}

html.light .glass-panel {
  background: rgba(255, 255, 255, 0.8);
}

/* ... more styles */
```

---

## Font Setup (layout.tsx)

```typescript
// filepath: app/layout.tsx
import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import ClientLayout from "./ClientLayout";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Command Center",
  description: "SaaS Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${manrope.variable} ${jetbrainsMono.variable} font-body antialiased overflow-x-hidden`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
```

---

## Theme Context Setup

```typescript
// filepath: app/context/ThemeContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const initial = stored || "dark";
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const html = document.documentElement;
    if (newTheme === "light") {
      html.classList.remove("dark");
      html.classList.add("light");
    } else {
      html.classList.remove("light");
      html.classList.add("dark");
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      applyTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}
```

---

## Client Layout Wrapper

```typescript
// filepath: app/ClientLayout.tsx
"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./context/ThemeContext";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
```

---

## Page Structure

### Main Dashboard (`app/page.tsx`)

```typescript
"use client";

import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import MetricCard from "./components/MetricCard";
import SystemAlerts from "./components/SystemAlerts";
import ThroughputChart from "./components/ThroughputChart";

export default function Dashboard() {
  return (
    <div className="relative flex min-h-screen w-full bg-background-dark">
      <Sidebar />
      <main className="flex-1 ml-60 flex flex-col">
        <TopNav />
        {/* Dashboard content */}
      </main>
    </div>
  );
}
```

### Settings Page (`app/settings/page.tsx`)

```typescript
"use client";

import Sidebar from "@/app/components/Sidebar";
import TopNav from "@/app/components/TopNav";
import APIKeysTable from "@/app/components/settings/APIKeysTable";
import AccessControlForm from "@/app/components/settings/AccessControlForm";
import DangerZone from "@/app/components/settings/DangerZone";

export default function SettingsPage() {
  return (
    <div className="relative flex min-h-screen w-full bg-background-dark">
      <Sidebar />
      <main className="flex-1 ml-60 flex flex-col">
        <TopNav />
        {/* Settings content */}
      </main>
    </div>
  );
}
```

---

## Component File Structure

```
app/
├── components/
│   ├── Sidebar.tsx
│   ├── TopNav.tsx
│   ├── ThemeToggle.tsx
│   ├── ThemeCustomizer.tsx
│   ├── AccessibilityToggle.tsx
│   ├── NotificationsPanel.tsx
│   ├── MetricCard.tsx
│   ├── SystemAlerts.tsx
│   ├── ThroughputChart.tsx
│   ├── DataTable.tsx
│   ├── LiveMetrics.tsx
│   └── settings/
│       ├── APIKeysTable.tsx
│       ├── AccessControlForm.tsx
│       └── DangerZone.tsx
├── context/
│   └── ThemeContext.tsx
├── hooks/
│   └── useRealTimeData.ts
├── data/
│   └── notifications.ts
├── settings/
│   └── page.tsx
├── data-explorer/
│   └── page.tsx
├── docs/
│   └── page.tsx
├── types/
│   └── index.ts
├── ClientLayout.tsx
├── globals.css
├── layout.tsx
└── page.tsx
```

---

## Key Design Patterns

- **Glass Effect**: `background: rgba(17, 24, 39, 0.7)` + `backdrop-filter: blur(12px)`
- **Neon Hover**: Border color change + box-shadow glow
- **Mono Fonts**: Use JetBrains Mono for metrics, timestamps, code
- **Active States**: Left border accent + subtle background tint
- **Icons**: Material Symbols Outlined with `font-variation-settings`
- **Theme Variables**: All colors use CSS variables for dynamic theming

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

---

## Theme Toggle Features

- ✅ Click sun/moon icon in TopNav to switch themes
- ✅ Theme preference persists across sessions (localStorage)
- ✅ Smooth transitions between themes (0.3s)
- ✅ All components respond to theme changes
- ✅ CSS variables automatically update colors
- ✅ Works seamlessly with Tailwind classes

---

## Common Pitfalls to Avoid

1. **Backdrop blur compatibility**: Use `-webkit-backdrop-filter` for Safari support
2. **Fixed sidebar z-index**: Ensure sidebar has higher z-index than main content
3. **Font loading**: Use `next/font/google` to prevent layout shift
4. **Icon rendering**: Always set `font-variation-settings` for Material Symbols
5. **Dark mode class**: Ensure `<html>` has `class="dark"` or `class="light"` for Tailwind dark mode
6. **Theme context**: Wrap app with `ThemeProvider` in `ClientLayout` to ensure context is available
7. **Hydration**: Use `suppressHydrationWarning` on `<html>` to prevent SSR/client mismatch

---

## Testing the Implementation

1. **Dark Theme**: Default theme on first load
2. **Light Theme**: Click theme toggle to switch
3. **Persistence**: Refresh page - theme preference is maintained
4. **Component Colors**: All elements update colors when theme changes
5. **Search Bar**: Focus states work in both themes
6. **Alerts**: Color-coded alerts display correctly in both themes
7. **Settings Page**: Navigate to `/settings` to see settings components
8. **Data Explorer**: Navigate to `/data-explorer` to see DataTable with sample data
9. **Notifications**: Click notification bell in TopNav to see notification panel
10. **Live Metrics**: View Dashboard to see real-time metrics updating
11. **Sidebar Navigation**: Click different sidebar items to see active state change
12. **Documentation**: Navigate to `/docs` for theme system documentation

---

## Future Enhancements - COMPLETED ✅

### ✅ 1. System Preference Auto-Detection
- Automatically detects OS theme preference (dark/light)
- Falls back to stored user preference from localStorage
- Listens to system theme changes and updates accordingly
- Implementation: `ThemeContext.tsx` with `window.matchMedia()` API

### ✅ 2. Animation Transitions
- Smooth theme switching with cubic-bezier easing
- 0.3s transition duration for all theme changes
- Color transitions applied to: background, text, borders, shadows
- CSS: `transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)`

### ✅ 3. High Contrast Mode
- Accessibility toggle in TopNav (contrast icon)
- Enhanced border widths and contrast ratios
- Improved color differentiation for better readability
- Component: `AccessibilityToggle.tsx`
- Storage: localStorage persists contrast preference

### ✅ 4. Theme Customization
- Four preset themes: Default Dark, Default Light, Ocean Dark, Sunset Dark
- Theme customizer dropdown in TopNav (palette icon)
- Dynamic CSS variable overriding
- Component: `ThemeCustomizer.tsx`
- Allows switching between predefined color schemes

### ✅ 5. Data Table Component
- Reusable `DataTable.tsx` component
- Column configuration with custom rendering
- Loading states with spinner animation
- Sortable column indicators
- Empty state handling
- Hover effects on rows
- Responsive scrolling

### ✅ 6. Real-Time Data Integration
- Custom hook: `useRealTimeData()` for data streaming
- Live connection status indicator (pulse animation)
- Last update timestamp display
- Component: `LiveMetrics.tsx` showing live data example
- Configurable update intervals
- Callback support for data updates

### ✅ 7. Theme Documentation Page
- Dedicated `/docs` route with comprehensive information
- Theme system overview
- Theme controls explanation
- Color palette reference (both dark and light)
- Feature highlights
- Accessible documentation design

### ✅ 8. Notifications System
- Renamed from "Updates" to "Notifications" for better semantics
- Component: `NotificationsPanel.tsx` in TopNav
- Features:
  - Unread badge counter (9+ overflow)
  - Recent notifications dropdown (4 most recent)
  - Dismissible notifications with localStorage persistence
  - Type-based color coding (feature/improvement/bugfix/security)
  - Expandable changelog details
  - Notification data: `app/data/notifications.ts`

### ✅ 9. Data Explorer Page with DataTable
- Route: `/data-explorer`
- Components:
  - Reusable `DataTable.tsx` with column configuration
  - Custom column rendering with status badges
  - Sortable column indicators
  - Hover effects and responsive scrolling
- Features:
  - Sample user data with 6 test records
  - Summary stats cards (Total, Active, Pending, Inactive)
  - Color-coded status badges (active/inactive/pending)
  - Request metrics with visual highlighting
  - Sidebar navigation link to Data Explorer

### ✅ 10. Sidebar Active Navigation
- Dynamic active state based on current route using `usePathname()`
- Routes:
  - `/` → Dashboard (Command Center)
  - `/data-explorer` → Data Explorer
  - `/analytics` → Analytics
  - `/logs` → Logs
  - `/infrastructure` → Infrastructure
  - `/settings` → Settings
- Features:
  - Active button styling: cyan icon, primary text, `sidebar-active` class
  - Smooth transitions on hover (inactive state)
  - Dynamic color changes based on current pathname
  - Responsive to navigation changes

### ✅ 11. LiveMetrics Integration in Dashboard
- Component: `LiveMetrics.tsx` with `useRealTimeData()` hook
- Location: Dashboard System Performance section (right panel)
- Features:
  - Real-time metrics display: Active Users, Requests/sec, Latency
  - Live connection indicator with pulse animation
  - Trend arrows showing up/down/stable trends with percentages
  - Last update timestamp
  - Configurable update intervals (default 5 seconds)
  - Simulated real-time data updates
