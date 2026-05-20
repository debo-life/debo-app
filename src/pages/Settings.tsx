import { useState } from "react";
import { clearAllMemories } from "../lib/storage";
import Toast from "../components/Toast";

interface SettingsProps {
  onClear: () => void;
}

export default function Settings({ onClear }: SettingsProps) {
  const [confirming, setConfirming] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleClear = () => {
    clearAllMemories();
    onClear();
    setConfirming(false);
    setToast("All data cleared");
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
          <span className="settings-row-value">v0.0.1</span>
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
          <span className="settings-row-label">Clear all data</span>
          {confirming ? (
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-danger" onClick={handleClear}>
                Confirm delete
              </button>
              <button className="btn btn-secondary" onClick={() => setConfirming(false)}>
                Cancel
              </button>
            </div>
          ) : (
            <button className="btn btn-danger" onClick={() => setConfirming(true)}>
              Clear all data
            </button>
          )}
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
