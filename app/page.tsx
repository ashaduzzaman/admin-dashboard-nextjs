"use client";

import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import MetricCard from "./components/MetricCard";
import SystemAlerts from "./components/SystemAlerts";
import ThroughputChart from "./components/ThroughputChart";
import LiveMetrics from "./components/LiveMetrics";

export default function Dashboard() {
  return (
    <div className="relative flex min-h-screen w-full bg-background-dark">
      <Sidebar />

      <main className="flex-1 ml-60 flex flex-col">
        <TopNav />

        <div className="p-8 flex flex-col gap-8">
          {/* Header Section */}
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-extrabold tracking-tight text-text-primary font-display">
                Command Center
              </h2>
              <p className="text-muted max-w-xl">
                Real-time system health, throughput metrics, and global performance monitoring.
              </p>
            </div>
            <button className="px-4 py-2 border border-surface-highlight rounded-lg text-sm font-semibold hover:bg-surface-highlight transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">calendar_today</span>
              Last 24 Hours
            </button>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <MetricCard
              title="Total Requests"
              value="1.24M"
              change="12.5%"
              positive
              chart
            />
            <MetricCard title="Active Nodes" value="48/50" change="2.1%" positive={false} />
            <MetricCard
              title="Avg Latency"
              value="24ms"
              change="5.0ms"
              positive={false}
              chart
            />
            <MetricCard title="Error Rate" value="0.04%" change="STABLE" positive />
          </div>

          {/* System Performance Detail Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ThroughputChart />
            </div>
            <LiveMetrics />
          </div>

          {/* System Alerts */}
          <SystemAlerts />

          {/* Bottom Grid: Infrastructure Health */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[300px] glass-panel p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-2 rounded-full bg-accent-success shadow-[0_0_8px_#00FF85]"></div>
                <p className="text-sm font-medium">API Gateway</p>
              </div>
              <p className="text-xs font-mono text-muted">99.99% UPTIME</p>
            </div>

            <div className="flex-1 min-w-[300px] glass-panel p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-2 rounded-full bg-accent-success shadow-[0_0_8px_#00FF85]"></div>
                <p className="text-sm font-medium">Edge Compute</p>
              </div>
              <p className="text-xs font-mono text-muted">14MS AVG</p>
            </div>

            <div className="flex-1 min-w-[300px] glass-panel p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-2 rounded-full bg-accent-error shadow-[0_0_8px_#FF2A5F]"></div>
                <p className="text-sm font-medium">Postgres Cluster</p>
              </div>
              <p className="text-xs font-mono text-muted">LATENCY SPIKE</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
