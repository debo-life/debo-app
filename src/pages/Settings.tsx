import { useState, useRef } from "react";
import type { MemoryItem } from "../types/memory";
import { clearMemories, exportMemories, importMemories } from "../lib/storage";
import Button from "../components/Button";
import Toast from "../components/Toast";

interface SettingsProps {
  memories: MemoryItem[];
  onClear: () => void;
}

export default function Settings({ memories, onClear }: SettingsProps) {
  const [confirming, setConfirming] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    clearMemories();
    onClear();
    setConfirming(false);
    setToast("All data cleared. Your slate is clean.");
    setToastType("success");
  };

  const handleExport = () => {
    const json = exportMemories();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `debo-memories-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setToast("Your memories, exported.");
    setToastType("success");
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = importMemories(reader.result as string);
        onClear();
        setToast(`Imported ${imported.length} memories. Welcome back.`);
        setToastType("success");
      } catch (err) {
        setToast(err instanceof Error ? err.message : "Import failed");
        setToastType("error");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h2>Settings</h2>
        <p>Manage your local data and preferences</p>
      </div>

      <div className="settings-grid">
        {/* About */}
        <div className="settings-section">
          <div className="settings-section-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <h3>About Debo</h3>
          </div>
          <p className="settings-section-desc">A calm memory OS for your life.</p>
          <div className="settings-row">
            <span className="settings-row-label">App name</span>
            <span className="settings-row-value">Debo</span>
          </div>
          <div className="settings-row">
            <span className="settings-row-label">Version</span>
            <span className="settings-row-value settings-row-value--mono">v0.1.0</span>
          </div>
          <div className="settings-row">
            <span className="settings-row-label">Total memories</span>
            <span className="settings-row-value settings-row-value--accent">{memories.length}</span>
          </div>
        </div>

        {/* Storage */}
        <div className="settings-section">
          <div className="settings-section-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
            <h3>Storage</h3>
          </div>
          <p className="settings-section-desc">
            Your memory is private on this device. Nothing leaves your machine.
          </p>
          <div className="settings-row">
            <span className="settings-row-label">Storage location</span>
            <span className="settings-row-value settings-row-value--mono">localStorage</span>
          </div>
          <div className="settings-row">
            <span className="settings-row-label">Data sovereignty</span>
            <span className="settings-row-badge settings-row-badge--local">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Local only
            </span>
          </div>
        </div>

        {/* Import / Export */}
        <div className="settings-section">
          <div className="settings-section-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <h3>Import & Export</h3>
          </div>
          <p className="settings-section-desc">
            Export your memories as JSON for backup, or import from a previous export.
          </p>
          <div className="settings-row">
            <span className="settings-row-label">Export data</span>
            <Button variant="secondary" onClick={handleExport}>
              Export JSON
            </Button>
          </div>
          <div className="settings-row">
            <span className="settings-row-label">Import data</span>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                style={{ display: "none" }}
                onChange={handleImport}
              />
              <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
                Import JSON
              </Button>
            </div>
          </div>
        </div>

        {/* License */}
        <div className="settings-section">
          <div className="settings-section-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <h3>License</h3>
          </div>
          <p className="settings-section-desc">
            Source-available. Free for personal, non-commercial use.
          </p>
          <div className="settings-row">
            <span className="settings-row-label">License type</span>
            <span className="settings-row-value">Debo Personal Use License v1.0</span>
          </div>
          <div className="settings-row">
            <span className="settings-row-label">Commercial use</span>
            <span className="settings-row-value">Requires written permission</span>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="settings-section settings-section--danger">
          <div className="settings-section-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <h3>Danger Zone</h3>
          </div>
          <p className="settings-section-desc">
            This will delete all memories. This cannot be undone.
          </p>
          <div className="settings-row">
            <span className="settings-row-label">Clear all data</span>
            {confirming ? (
              <div className="settings-confirm-group">
                <span className="settings-confirm-text">Are you sure?</span>
                <Button variant="danger" onClick={handleClear}>
                  Yes, delete everything
                </Button>
                <Button variant="ghost" onClick={() => setConfirming(false)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <Button variant="danger" onClick={() => setConfirming(true)}>
                Clear all data
              </Button>
            )}
          </div>
        </div>
      </div>

      {toast && <Toast message={toast} type={toastType} onClose={() => setToast(null)} />}
    </div>
  );
}
