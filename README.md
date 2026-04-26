# Command Center - Admin Dashboard

A modern SaaS admin dashboard built with Next.js 15, Tailwind CSS, and Material Symbols.

## Features

- 🎨 Dark theme with cyan accent colors
- 🎭 Glass panel design with backdrop blur
- 📊 Metric cards with charts and indicators
- 🔔 System alerts and notifications
- ⚙️ Settings page with API key management
- 📱 Responsive design
- ✨ Smooth animations and transitions

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS 3.4+
- **Icons**: Material Symbols Outlined (Google Fonts)
- **Fonts**: Manrope (display/body), JetBrains Mono (monospace)
- **Language**: TypeScript

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

## Project Structure

```
app/
├── components/
│   ├── Sidebar.tsx
│   ├── TopNav.tsx
│   ├── MetricCard.tsx
│   ├── SystemAlerts.tsx
│   ├── ThroughputChart.tsx
│   └── settings/
│       ├── APIKeysTable.tsx
│       ├── AccessControlForm.tsx
│       └── DangerZone.tsx
├── settings/
│   └── page.tsx
├── types/
│   └── index.ts
├── globals.css
├── layout.tsx
└── page.tsx
```

## Color Palette

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

## Pages

- **Dashboard** (`/`) - Main command center with metrics and system alerts
- **Settings** (`/settings`) - API keys, access control, and danger zone

## Build & Deploy

Build for production:
```bash
npm run build
npm start
```

## Environment Variables

Create a `.env.local` file if needed:
```bash
# Add environment variables here
```

## License

MIT
