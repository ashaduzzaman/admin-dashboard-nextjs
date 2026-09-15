import { MetricCardProps } from "@/app/types";

export default function MetricCard({
  title,
  value,
  change,
  positive = true,
  chart = false,
}: MetricCardProps) {
  const isPositive = change.includes("%") && positive;
  const isNegative = change.includes("%") && !positive;

  return (
    <div className="glass-panel p-6 rounded-xl flex flex-col gap-4 transition-all duration-300 transform hover:scale-[1.02] neon-border-hover cursor-pointer group">
      <div className="flex justify-between items-start">
        <p className="text-muted text-xs font-semibold uppercase tracking-wider">
          {title}
        </p>
        <div
          className={`flex items-center text-xs font-mono ${
            change === "STABLE"
              ? "text-accent-success"
              : isPositive
                ? "text-accent-success"
                : "text-accent-error"
          }`}
        >
          {change !== "STABLE" && (
            <span className="material-symbols-outlined text-sm">
              {isPositive ? "arrow_upward" : "arrow_downward"}
            </span>
          )}
          {change === "STABLE" ? (
            <>
              <span className="material-symbols-outlined text-sm">
                check_circle
              </span>
              <span className="ml-1">{change}</span>
            </>
          ) : (
            change
          )}
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <h3 className="text-3xl font-bold font-mono text-text-primary">
          {value}
        </h3>
      </div>

      {chart && (
        <div className="h-12 w-full mt-2">
          <svg className="w-full h-full" viewBox="0 0 200 40">
            <path
              className="opacity-80"
              d="M0 35 Q 25 30, 50 32 T 100 20 T 150 15 T 200 5"
              fill="none"
              stroke={isNegative ? "#FF2A5F" : "#00F0FF"}
              strokeWidth="2"
            />
            <path
              className="opacity-20"
              d="M0 35 Q 25 30, 50 32 T 100 20 T 150 15 T 200 5 V 40 H 0 Z"
              fill={`url(#gradient-${isNegative ? "red" : "cyan"})`}
            />
            <defs>
              <linearGradient
                id="gradient-cyan"
                x1="0%"
                x2="0%"
                y1="0%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#00F0FF", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#00F0FF", stopOpacity: 0 }}
                />
              </linearGradient>
              <linearGradient
                id="gradient-red"
                x1="0%"
                x2="0%"
                y1="0%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#FF2A5F", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#FF2A5F", stopOpacity: 0 }}
                />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}

      {title === "Active Nodes" && (
        <div className="flex gap-1 mt-4">
          <div className="h-2 flex-1 rounded-full bg-accent-success shadow-[0_0_8px_rgba(0,255,133,0.4)]"></div>
          <div className="h-2 flex-1 rounded-full bg-accent-success shadow-[0_0_8px_rgba(0,255,133,0.4)]"></div>
          <div className="h-2 flex-1 rounded-full bg-accent-success shadow-[0_0_8px_rgba(0,255,133,0.4)]"></div>
          <div className="h-2 flex-1 rounded-full bg-accent-error shadow-[0_0_8px_rgba(255,42,95,0.4)]"></div>
          <div className="h-2 flex-1 rounded-full bg-accent-error shadow-[0_0_8px_rgba(255,42,95,0.4)]"></div>
        </div>
      )}

      {title === "Error Rate" && (
        <div className="mt-4 flex items-center gap-2">
          <div className="h-1.5 w-full bg-surface-highlight rounded-full overflow-hidden">
            <div className="h-full bg-accent-success w-[4%]"></div>
          </div>
        </div>
      )}
    </div>
  );
}
