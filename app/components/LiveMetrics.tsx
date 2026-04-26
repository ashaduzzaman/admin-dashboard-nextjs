"use client";

import { useRealTimeData } from "@/app/hooks/useRealTimeData";

interface LiveMetric {
  label: string;
  value: number;
  unit: string;
  trend: "up" | "down" | "stable";
  percentage: number;
}

export default function LiveMetrics() {
  const { isConnected, lastUpdate } = useRealTimeData({
    interval: 5000,
  });

  const metrics: LiveMetric[] = [
    {
      label: "Active Users",
      value: Math.floor(Math.random() * 10000),
      unit: "users",
      trend: Math.random() > 0.5 ? "up" : "down",
      percentage: Math.floor(Math.random() * 20),
    },
    {
      label: "Requests/sec",
      value: Math.floor(Math.random() * 5000),
      unit: "req/s",
      trend: "up",
      percentage: Math.floor(Math.random() * 15),
    },
    {
      label: "Latency",
      value: Math.floor(Math.random() * 200),
      unit: "ms",
      trend: "stable",
      percentage: 0,
    },
  ];

  return (
    <div className="glass-panel p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-text-primary">Live Metrics</h3>
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              isConnected ? "bg-accent-success animate-pulse" : "bg-accent-error"
            }`}
          />
          <span className="text-xs text-muted">
            {isConnected ? "Live" : "Offline"}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex items-between justify-between pb-4 border-b border-surface-highlight/30">
            <div className="flex-1">
              <p className="text-sm text-muted font-medium">{metric.label}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold text-text-primary font-mono">
                  {metric.value}
                </span>
                <span className="text-xs text-muted">{metric.unit}</span>
              </div>
            </div>
            <div className="text-right">
              <div
                className={`flex items-center gap-1 text-sm font-mono ${
                  metric.trend === "up"
                    ? "text-accent-success"
                    : metric.trend === "down"
                      ? "text-accent-error"
                      : "text-muted"
                }`}
              >
                {metric.trend === "up" && (
                  <span className="material-symbols-outlined text-sm">arrow_upward</span>
                )}
                {metric.trend === "down" && (
                  <span className="material-symbols-outlined text-sm">arrow_downward</span>
                )}
                {metric.trend === "stable" && (
                  <span className="material-symbols-outlined text-sm">trending_flat</span>
                )}
                {metric.percentage}%
              </div>
            </div>
          </div>
        ))}
      </div>

      {lastUpdate && (
        <p className="text-xs text-muted mt-4 text-center">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </p>
      )}
    </div>
  );
}
