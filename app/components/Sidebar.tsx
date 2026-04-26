"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 z-50 h-screen w-60 border-r border-surface-highlight glass-panel flex flex-col justify-between p-4">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-3 px-2">
          <div className="flex items-center justify-center size-8 rounded bg-primary text-background-dark">
            <span className="material-symbols-outlined font-bold">
              terminal
            </span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-text-primary text-base font-bold leading-none tracking-tight">
              QUANTUM
            </h1>
            <p className="text-muted text-[10px] font-mono leading-none mt-1">
              v2.4.0-STABLE
            </p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          <Link
            href="/"
            className={`flex items-center gap-3 px-3 py-2 rounded group cursor-pointer transition-colors ${
              pathname === "/" ? "sidebar-active" : "hover:bg-surface-highlight"
            }`}
          >
            <div
              className={
                pathname === "/"
                  ? "text-primary"
                  : "text-muted group-hover:text-text-primary"
              }
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                dashboard
              </span>
            </div>
            <p
              className={
                pathname === "/"
                  ? "text-text-primary text-sm font-medium"
                  : "text-muted group-hover:text-text-primary text-sm font-medium"
              }
            >
              Dashboard
            </p>
          </Link>

          <Link
            href="/data-explorer"
            className={`flex items-center gap-3 px-3 py-2 rounded group cursor-pointer transition-colors ${
              pathname === "/data-explorer"
                ? "sidebar-active"
                : "hover:bg-surface-highlight"
            }`}
          >
            <div className="text-muted group-hover:text-text-primary">
              <span className="material-symbols-outlined">database</span>
            </div>
            <p className="text-muted group-hover:text-text-primary text-sm font-medium">
              Data Explorer
            </p>
          </Link>

          <Link
            href="/analytics"
            className={`flex items-center gap-3 px-3 py-2 rounded group cursor-pointer transition-colors ${
              pathname === "/analytics"
                ? "sidebar-active"
                : "hover:bg-surface-highlight"
            }`}
          >
            <div
              className={
                pathname === "/analytics"
                  ? "text-primary"
                  : "text-muted group-hover:text-text-primary"
              }
            >
              <span className="material-symbols-outlined">monitoring</span>
            </div>
            <p
              className={
                pathname === "/analytics"
                  ? "text-text-primary text-sm font-medium"
                  : "text-muted group-hover:text-text-primary text-sm font-medium"
              }
            >
              Analytics
            </p>
          </Link>

          <Link
            href="/logs"
            className={`flex items-center gap-3 px-3 py-2 rounded group cursor-pointer transition-colors ${
              pathname === "/logs"
                ? "sidebar-active"
                : "hover:bg-surface-highlight"
            }`}
          >
            <div
              className={
                pathname === "/logs"
                  ? "text-primary"
                  : "text-muted group-hover:text-text-primary"
              }
            >
              <span className="material-symbols-outlined">data_object</span>
            </div>
            <p
              className={
                pathname === "/logs"
                  ? "text-text-primary text-sm font-medium"
                  : "text-muted group-hover:text-text-primary text-sm font-medium"
              }
            >
              Logs
            </p>
          </Link>

          <Link
            href="/infrastructure"
            className={`flex items-center gap-3 px-3 py-2 rounded group cursor-pointer transition-colors ${
              pathname === "/infrastructure"
                ? "sidebar-active"
                : "hover:bg-surface-highlight"
            }`}
          >
            <div
              className={
                pathname === "/infrastructure"
                  ? "text-primary"
                  : "text-muted group-hover:text-text-primary"
              }
            >
              <span className="material-symbols-outlined">memory</span>
            </div>
            <p
              className={
                pathname === "/infrastructure"
                  ? "text-text-primary text-sm font-medium"
                  : "text-muted group-hover:text-text-primary text-sm font-medium"
              }
            >
              Infrastructure
            </p>
          </Link>

          <Link
            href="/settings"
            className={`flex items-center gap-3 px-3 py-2 rounded group cursor-pointer transition-colors mt-4 ${
              pathname === "/settings"
                ? "sidebar-active"
                : "hover:bg-surface-highlight"
            }`}
          >
            <div
              className={
                pathname === "/settings"
                  ? "text-primary"
                  : "text-muted group-hover:text-text-primary"
              }
            >
              <span className="material-symbols-outlined">settings</span>
            </div>
            <p
              className={
                pathname === "/settings"
                  ? "text-text-primary text-sm font-medium"
                  : "text-muted group-hover:text-text-primary text-sm font-medium"
              }
            >
              Settings
            </p>
          </Link>
        </nav>
      </div>

      <div className="mt-auto p-2 border-t border-surface-highlight pt-4">
        <div className="flex items-center gap-3">
          <img
            alt="User Profile"
            className="size-9 rounded-full border border-surface-highlight"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjo5M371wb4rU0c3oMHMzJuFnnyZJIGhT4hw2C1Bhx4i6k53XAlIqDobL25eYW9CLg4jPZds1NlNmrJ_uHxzWRGg8gqjCb9e2H5ew-FWVSezzMX3JdZ_Q5X_T9cwwyXjC2uVsc7Xf8QQWpssmhmG7F2A-x7bcR8KSJVeGmTAIudHmJKsfoTP_j-seBWoChFvoohr7U2ciqLvrA7cFcDcj_9xPUuGAjKwZMtwZpsV5r-F7iP3JiSgcJTE3tvnmtE6yUewLllOTGPyw"
          />
          <div className="flex flex-col">
            <p className="text-text-primary text-sm font-medium truncate">
              Alex Rivera
            </p>
            <p className="text-muted text-xs truncate">Admin Access</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
