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

        <div className="p-8 max-w-[800px]">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-text-primary font-display mb-2">
              Settings
            </h1>
            <p className="text-muted">Manage your account, API keys, and security settings.</p>
          </div>

          <section className="glass-panel rounded-lg p-8 mb-8">
            <h2 className="text-xl font-bold mb-2">API Keys</h2>
            <p className="text-muted text-sm mb-4">Manage integration keys for programmatic access.</p>
            <APIKeysTable />
          </section>

          <section className="glass-panel rounded-lg p-8 mb-8">
            <h2 className="text-xl font-bold mb-2">Access Control</h2>
            <p className="text-muted text-sm mb-4">Configure IP whitelisting and rate limits.</p>
            <AccessControlForm />
          </section>

          <section className="glass-panel rounded-lg p-8 border border-accent-error/30">
            <DangerZone />
          </section>
        </div>
      </main>
    </div>
  );
}
