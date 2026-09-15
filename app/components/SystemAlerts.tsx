"use client";

export default function SystemAlerts() {
  const alerts = [
    {
      id: "1",
      type: "critical" as const,
      title: "Critical Alert",
      message: "Redis Cache Overflow in EU-Central",
      timestamp: "04:12:33 UTC",
    },
    {
      id: "2",
      type: "info" as const,
      title: "Update",
      message: "Auto-scale deployment successful",
      timestamp: "03:55:01 UTC",
    },
    {
      id: "3",
      type: "log" as const,
      title: "Log Entry",
      message: "Backup completed for DB_SHARD_04",
      timestamp: "02:10:15 UTC",
    },
  ];

  const getAlertStyles = (type: string) => {
    switch (type) {
      case "critical":
        return {
          bg: "bg-accent-error/5",
          border: "border-accent-error/20",
          textColor: "text-accent-error",
          icon: "warning",
        };
      case "info":
        return {
          bg: "bg-primary/5",
          border: "border-primary/20",
          textColor: "text-primary",
          icon: "info",
        };
      default:
        return {
          bg: "hover:bg-surface-highlight/50",
          border: "border-transparent",
          textColor: "text-muted",
          icon: "schedule",
        };
    }
  };

  return (
    <div className="glass-panel rounded-xl flex flex-col h-full">
      <div className="p-6 border-b border-surface-highlight">
        <h3 className="text-lg font-bold">System Alerts</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {alerts.map((alert) => {
          const styles = getAlertStyles(alert.type);
          const isLog = alert.type === "log";

          return (
            <div
              key={alert.id}
              className={`p-3 rounded-lg ${styles.bg} border ${styles.border} flex gap-3 ${
                isLog ? "cursor-pointer transition-all" : ""
              }`}
            >
              <div className={styles.textColor}>
                <span className="material-symbols-outlined text-xl">
                  {styles.icon}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <p
                  className={`text-xs font-bold uppercase tracking-widest ${styles.textColor}`}
                >
                  {alert.title}
                </p>
                <p
                  className={`text-sm ${isLog ? "text-muted group-hover:text-text-primary" : "text-text-primary"}`}
                >
                  {alert.message}
                </p>
                <p className="text-[10px] font-mono text-muted">
                  {alert.timestamp}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 mt-auto">
        <button className="w-full py-2 bg-surface-highlight hover:bg-surface-highlight/80 rounded text-sm font-semibold transition-colors">
          View All Events
        </button>
      </div>
    </div>
  );
}
