"use client";

import { useState } from "react";

export default function DangerZone() {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    // Handle workspace deletion
    setShowConfirm(false);
  };

  return (
    <div className="border-l-4 border-accent-error pl-4">
      <div className="flex items-start gap-3">
        <span className="material-symbols-outlined text-accent-error text-2xl mt-1">warning</span>
        <div className="flex flex-col gap-4 flex-1">
          <div>
            <h3 className="text-lg font-bold text-accent-error mb-1">Danger Zone</h3>
            <p className="text-sm text-muted">
              Irreversible and destructive actions. Proceed with caution.
            </p>
          </div>

          <div className="pt-4 border-t border-accent-error/20">
            <p className="text-sm text-text-primary mb-4">
              Deleting your workspace will permanently remove all associated data, API keys, and
              configurations. This action cannot be undone.
            </p>

            {!showConfirm ? (
              <button
                onClick={() => setShowConfirm(true)}
                className="px-4 py-2 bg-accent-error/20 text-accent-error border border-accent-error rounded-lg hover:bg-accent-error/30 transition-all font-semibold text-sm"
              >
                Delete Workspace
              </button>
            ) : (
              <div className="flex items-center gap-3 p-4 bg-accent-error/5 border border-accent-error/20 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-accent-error mb-3">
                    Are you absolutely sure? This cannot be undone.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleDelete}
                      className="px-3 py-1.5 bg-accent-error text-white text-sm font-semibold rounded hover:brightness-110 transition-all"
                    >
                      Yes, Delete
                    </button>
                    <button
                      onClick={() => setShowConfirm(false)}
                      className="px-3 py-1.5 border border-surface-highlight text-sm font-semibold rounded hover:bg-surface-highlight transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
