export interface Notification {
  id: string;
  version: string;
  date: string;
  title: string;
  description: string;
  type: "feature" | "improvement" | "bugfix" | "security";
  changes: string[];
  isNew?: boolean;
}

export const notifications: Notification[] = [
  {
    id: "1",
    version: "2.5.0",
    date: "2026-04-25",
    title: "Theme System Enhancements",
    description:
      "Major update with system preference detection, high contrast mode, and theme customization",
    type: "feature",
    isNew: true,
    changes: [
      "Auto-detect system theme preference (dark/light)",
      "High contrast mode for accessibility",
      "Four preset theme variations (Default, Ocean, Sunset)",
      "Smooth animation transitions between themes",
      "Theme preference persistence with localStorage",
    ],
  },
  {
    id: "2",
    version: "2.4.5",
    date: "2026-04-20",
    title: "Real-Time Data Components",
    description:
      "Added live metrics and real-time data integration capabilities",
    type: "feature",
    changes: [
      "LiveMetrics component with real-time updates",
      "useRealTimeData custom hook for data streaming",
      "Connection status indicator with pulse animation",
      "Last update timestamp display",
      "Configurable update intervals",
    ],
  },
  {
    id: "3",
    version: "2.4.0",
    date: "2026-04-15",
    title: "Data Table Component Release",
    description: "Reusable, configurable data table with advanced features",
    type: "feature",
    changes: [
      "Reusable DataTable component",
      "Custom column rendering",
      "Sortable column indicators",
      "Loading states with spinner animation",
      "Hover effects and empty state handling",
    ],
  },
  {
    id: "4",
    version: "2.3.2",
    date: "2026-04-10",
    title: "Security Patch",
    description:
      "Fixed theme context hydration issues and improved component stability",
    type: "security",
    changes: [
      "Fixed hydration mismatch in ThemeProvider",
      "Improved client-side component initialization",
      "Enhanced error handling in context hooks",
    ],
  },
  {
    id: "5",
    version: "2.3.1",
    date: "2026-04-05",
    title: "UI Improvements",
    description: "Various UI and UX improvements throughout the dashboard",
    type: "improvement",
    changes: [
      "Enhanced TopNav styling and layout",
      "Improved Sidebar navigation interactions",
      "Better hover states on interactive elements",
      "Optimized MetricCard animations",
    ],
  },
];
