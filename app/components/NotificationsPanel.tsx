"use client";

import { useState, useEffect } from "react";
import { notifications } from "@/app/data/notifications";

export default function NotificationsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load dismissed notifications from localStorage
    const dismissedNotifications = localStorage.getItem("dismissedNotifications");
    if (dismissedNotifications) {
      setDismissed(new Set(JSON.parse(dismissedNotifications)));
    }

    // Count unread notifications
    const newNotifications = notifications.filter(
      (n) => n.isNew && !dismissed.has(n.id)
    ).length;
    setUnreadCount(newNotifications);
  }, [dismissed]);

  const recentNotifications = notifications.slice(0, 4);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "feature":
        return "text-primary";
      case "improvement":
        return "text-accent-success";
      case "bugfix":
        return "text-accent-error";
      case "security":
        return "text-accent-error";
      default:
        return "text-muted";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "feature":
        return "sparkles";
      case "improvement":
        return "trending_up";
      case "bugfix":
        return "bug_report";
      case "security":
        return "security";
      default:
        return "info";
    }
  };

  const handleDismiss = (id: string) => {
    const newDismissed = new Set(dismissed);
    newDismissed.add(id);
    setDismissed(newDismissed);
    localStorage.setItem("dismissedNotifications", JSON.stringify(Array.from(newDismissed)));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center size-10 rounded-lg hover:bg-surface-highlight text-muted transition-colors relative"
        title="View notifications"
      >
        <span className="material-symbols-outlined">notifications_active</span>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-accent-error text-white text-xs rounded-full flex items-center justify-center font-bold">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 glass-panel rounded-lg shadow-xl z-50 max-h-[600px] overflow-y-auto">
          <div className="sticky top-0 bg-surface/80 backdrop-blur border-b border-surface-highlight p-4">
            <h3 className="text-lg font-bold text-text-primary">Notifications</h3>
          </div>

          <div className="p-4 space-y-3">
            {recentNotifications.length === 0 ? (
              <p className="text-center text-muted py-8">No notifications available</p>
            ) : (
              recentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border transition-colors ${
                    notification.isNew && !dismissed.has(notification.id)
                      ? "border-primary/50 bg-primary/5"
                      : "border-surface-highlight/50 hover:bg-surface-highlight/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-start gap-2 flex-1">
                      <span className={`material-symbols-outlined text-sm mt-0.5 ${getTypeColor(notification.type)}`}>
                        {getTypeIcon(notification.type)}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-text-primary text-sm">
                            {notification.title}
                          </h4>
                          <span className="text-xs text-muted">{notification.version}</span>
                          {notification.isNew && !dismissed.has(notification.id) && (
                            <span className="px-1.5 py-0.5 text-xs font-bold bg-primary text-background-dark rounded-full">
                              NEW
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted mt-0.5">{notification.date}</p>
                      </div>
                    </div>
                    {notification.isNew && !dismissed.has(notification.id) && (
                      <button
                        onClick={() => handleDismiss(notification.id)}
                        className="text-muted hover:text-text-primary transition-colors"
                        title="Dismiss"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-text-primary mb-2">{notification.description}</p>
                  <details className="group">
                    <summary className="cursor-pointer text-xs text-primary hover:underline">
                      View changes
                    </summary>
                    <ul className="mt-2 space-y-1 text-xs text-muted list-disc list-inside">
                      {notification.changes.map((change, idx) => (
                        <li key={idx}>{change}</li>
                      ))}
                    </ul>
                  </details>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
