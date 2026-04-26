"use client";

export default function ThroughputChart() {
  return (
    <div className="glass-panel rounded-xl overflow-hidden flex flex-col">
      <div className="p-6 border-b border-surface-highlight flex justify-between items-center">
        <h3 className="text-lg font-bold">System Throughput</h3>
        <div className="flex gap-2">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-surface-highlight/50 text-[10px] font-mono border border-surface-highlight">
            <div className="size-1.5 rounded-full bg-primary animate-pulse"></div>
            DB_CLUSTER_A
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-surface-highlight/50 text-[10px] font-mono border border-surface-highlight">
            <div className="size-1.5 rounded-full bg-accent-success"></div>
            AWS_US_EAST_1
          </div>
        </div>
      </div>

      <div className="p-6 h-[300px] relative">
        <div className="absolute inset-0 p-8 flex items-end gap-2 overflow-hidden opacity-40 pointer-events-none">
          <div className="w-full bg-primary/20 rounded-t h-[40%]"></div>
          <div className="w-full bg-primary/20 rounded-t h-[65%]"></div>
          <div className="w-full bg-primary/20 rounded-t h-[50%]"></div>
          <div className="w-full bg-primary/20 rounded-t h-[80%]"></div>
          <div className="w-full bg-primary/20 rounded-t h-[95%]"></div>
          <div className="w-full bg-primary/20 rounded-t h-[70%]"></div>
          <div className="w-full bg-primary/20 rounded-t h-[55%]"></div>
          <div className="w-full bg-primary/20 rounded-t h-[60%]"></div>
          <div className="w-full bg-primary/20 rounded-t h-[85%]"></div>
          <div className="w-full bg-primary/20 rounded-t h-[45%]"></div>
        </div>

        <div className="h-full w-full flex flex-col items-center justify-center text-center gap-4 relative z-10">
          <div className="relative size-24 flex items-center justify-center">
            <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-[ping_3s_linear_infinite]"></div>
            <div className="absolute inset-4 border-2 border-primary/40 rounded-full animate-[ping_2s_linear_infinite]"></div>
            <span className="material-symbols-outlined text-primary text-4xl">sensors</span>
          </div>
          <p className="text-text-primary font-mono text-sm tracking-tight">
            ANALYZING SIGNAL INTERCEPT...
          </p>
          <p className="text-muted text-xs">Awaiting primary data signals from global endpoints</p>
        </div>
      </div>
    </div>
  );
}
