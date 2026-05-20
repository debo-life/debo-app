import { useState, useCallback, useEffect } from "react";
import { MemoryItem, MemoryType } from "../types/memory";
import { saveMemory, generateId } from "../lib/storage";
import Toast from "../components/Toast";

const TYPES: MemoryType[] = ["thought", "task", "idea", "link", "journal"];

interface CaptureProps {
  onSaved: (memory: MemoryItem) => void;
}

export default function Capture({ onSaved }: CaptureProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState<MemoryType>("thought");
  const [toast, setToast] = useState<string | null>(null);

  const handleSave = useCallback(() => {
    if (!content.trim()) return;

    const now = new Date().toISOString();
    const memory: MemoryItem = {
      id: generateId(),
      title: title.trim(),
      content: content.trim(),
      type,
      createdAt: now,
      updatedAt: now,
    };

    saveMemory(memory);
    onSaved(memory);
    setTitle("");
    setContent("");
    setType("thought");
    setToast("Memory saved");
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
          <label className="form-label">Title (optional)</label>
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
            placeholder="What do you want Debo to remember?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            autoFocus
          />
        </div>

        <div className="form-group">
          <label className="form-label">Type</label>
          <div className="type-selector">
            {TYPES.map((t) => (
              <button
                key={t}
                className={`type-option${type === t ? " selected" : ""}`}
                onClick={() => setType(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
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
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
