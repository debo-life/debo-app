import { useState, useCallback, useEffect } from "react";
import type { MemoryType } from "../types/memory";
import { createMemory } from "../lib/storage";
import Toast from "../components/Toast";

const TYPES: { value: MemoryType; label: string }[] = [
  { value: "thought", label: "Thought" },
  { value: "task", label: "Task" },
  { value: "idea", label: "Idea" },
  { value: "link", label: "Link" },
  { value: "journal", label: "Journal" },
];

interface CaptureProps {
  onSaved: () => void;
}

export default function Capture({ onSaved }: CaptureProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState<MemoryType>("thought");
  const [toast, setToast] = useState<string | null>(null);

  const handleSave = useCallback(async () => {
    if (!content.trim()) return;
    await createMemory({ title: title.trim(), content: content.trim(), type });
    setTitle("");
    setContent("");
    setType("thought");
    setToast("Captured. Debo will remember this.");
    onSaved();
  }, [title, content, type, onSaved]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleSave]);

  return (
    <div>
      <div className="page-header">
        <h2>Capture</h2>
        <p>What do you want Debo to remember?</p>
      </div>

      <div className="capture-form">
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            className="form-input"
            type="text"
            placeholder="Give it a name..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Content</label>
          <textarea
            className="form-input"
            placeholder="Start with one line."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            autoFocus
            rows={7}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Type</label>
          <div className="type-selector">
            {TYPES.map((t) => (
              <button
                key={t.value}
                type="button"
                className={`type-option${type === t.value ? " selected" : ""}`}
                onClick={() => setType(t.value)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="capture-actions">
          <span className="kbd-hint">
            <kbd>{navigator.platform.includes("Mac") ? "Cmd" : "Ctrl"}</kbd>
            <span>+</span>
            <kbd>Enter</kbd>
            <span>to save</span>
          </span>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={!content.trim()}
          >
            Save memory
          </button>
        </div>

        <p className="capture-hint">
          Your memory is private on this device.
        </p>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
