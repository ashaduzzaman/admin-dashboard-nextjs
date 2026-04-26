"use client";

import { useState } from "react";

export default function AccessControlForm() {
  const [formData, setFormData] = useState({
    ipWhitelist: "192.168.1.0/24\n10.0.0.0/8",
    rateLimit: "1000",
    timeout: "5000",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle save logic
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-text-primary">IP Whitelist (CIDR)</label>
        <textarea
          name="ipWhitelist"
          value={formData.ipWhitelist}
          onChange={handleChange}
          className="w-full h-24 bg-background-dark border border-surface-highlight rounded-lg p-3 text-sm text-text-primary focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted/50"
          placeholder="192.168.1.0/24&#10;10.0.0.0/8"
        />
        <p className="text-xs text-muted">Enter IP ranges in CIDR notation, one per line</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-text-primary">Rate Limit (req/sec)</label>
          <input
            type="number"
            name="rateLimit"
            value={formData.rateLimit}
            onChange={handleChange}
            className="w-full bg-background-dark border border-surface-highlight rounded-lg px-3 py-2 text-sm text-text-primary focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted/50"
            placeholder="1000"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-text-primary">Timeout (ms)</label>
          <input
            type="number"
            name="timeout"
            value={formData.timeout}
            onChange={handleChange}
            className="w-full bg-background-dark border border-surface-highlight rounded-lg px-3 py-2 text-sm text-text-primary focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted/50"
            placeholder="5000"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-background-dark text-sm font-semibold rounded-lg hover:brightness-110 transition-all"
        >
          Save Changes
        </button>
        <button
          type="button"
          className="px-4 py-2 border border-surface-highlight text-sm font-semibold rounded-lg hover:bg-surface-highlight transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
