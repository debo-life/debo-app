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
    setToast("All data cleared");
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
    setToast("Memories exported");
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
        setToast(`Imported ${imported.length} memories`);
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
    <div>
      <div className="page-header">
        <h2>Settings</h2>
        <p>Manage your local data</p>
      </div>

      <div className="settings-section">
        <h3>About Debo</h3>
        <p>A local-first memory inbox for your thoughts, tasks, and ideas.</p>
        <div className="settings-row">
          <span className="settings-row-label">App name</span>
          <span className="settings-row-value">Debo</span>
        </div>
        <div className="settings-row">
          <span className="settings-row-label">Version</span>
          <span className="settings-row-value">v0.1.0</span>
        </div>
        <div className="settings-row">
          <span className="settings-row-label">Total memories</span>
          <span className="settings-row-value">{memories.length}</span>
        </div>
      </div>

      <div className="settings-section">
        <h3>Storage</h3>
        <p>Your data is stored locally on this device. Nothing leaves your machine.</p>
        <div className="settings-row">
          <span className="settings-row-label">Storage location</span>
          <span className="settings-row-value">localStorage</span>
        </div>
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
        <div className="settings-row">
          <span className="settings-row-label">Clear all data</span>
          {confirming ? (
            <div style={{ display: "flex", gap: 8 }}>
              <Button variant="danger" onClick={handleClear}>
                Confirm delete
              </Button>
              <Button variant="secondary" onClick={() => setConfirming(false)}>
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

      {toast && <Toast message={toast} type={toastType} onClose={() => setToast(null)} />}
    </div>
  );
}
