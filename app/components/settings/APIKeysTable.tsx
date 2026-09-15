"use client";

import { useState } from "react";

interface APIKeyItem {
  id: string;
  name: string;
  secret: string;
  created: string;
}

export default function APIKeysTable() {
  const [keys, setKeys] = useState<APIKeyItem[]>([
    {
      id: "1",
      name: "Production API Key",
      secret: "sk_prod_xxx...xxx",
      created: "2024-01-15",
    },
    {
      id: "2",
      name: "Development API Key",
      secret: "sk_dev_xxx...xxx",
      created: "2024-01-10",
    },
  ]);

  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const toggleReveal = (id: string) => {
    const newRevealed = new Set(revealed);
    if (newRevealed.has(id)) {
      newRevealed.delete(id);
    } else {
      newRevealed.add(id);
    }
    setRevealed(newRevealed);
  };

  const copyToClipboard = (secret: string) => {
    navigator.clipboard.writeText(secret);
  };

  const deleteKey = (id: string) => {
    setKeys(keys.filter((key) => key.id !== id));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-highlight">
              <th className="text-left py-3 px-4 text-muted font-semibold">
                Key Name
              </th>
              <th className="text-left py-3 px-4 text-muted font-semibold">
                Secret Key
              </th>
              <th className="text-left py-3 px-4 text-muted font-semibold">
                Created
              </th>
              <th className="text-left py-3 px-4 text-muted font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {keys.map((key) => (
              <tr
                key={key.id}
                className="border-b border-surface-highlight/50 hover:bg-surface-highlight/20"
              >
                <td className="py-3 px-4 text-text-primary">{key.name}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <code className="text-xs font-mono text-muted bg-surface/50 px-2 py-1 rounded">
                      {revealed.has(key.id) ? key.secret : "••••••••••••••••"}
                    </code>
                    <button
                      onClick={() => toggleReveal(key.id)}
                      className="text-muted hover:text-primary transition-colors"
                      title={revealed.has(key.id) ? "Hide" : "Show"}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {revealed.has(key.id) ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </td>
                <td className="py-3 px-4 text-muted text-xs">{key.created}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(key.secret)}
                      className="text-muted hover:text-primary transition-colors"
                      title="Copy"
                    >
                      <span className="material-symbols-outlined text-sm">
                        content_copy
                      </span>
                    </button>
                    <button
                      onClick={() => deleteKey(key.id)}
                      className="text-muted hover:text-accent-error transition-colors"
                      title="Delete"
                    >
                      <span className="material-symbols-outlined text-sm">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="px-4 py-2 bg-primary text-background-dark text-sm font-semibold rounded-lg hover:brightness-110 transition-all flex items-center gap-2 w-fit">
        <span className="material-symbols-outlined">add</span>
        Generate New Key
      </button>
    </div>
  );
}
