import { useState, useEffect, useCallback, useRef } from "react";
import type { JournalEntry } from "../types/journal";
import { updateJournal, deleteJournal } from "../lib/storage";
import PlateEditor from "../components/editor/PlateEditor";
import { formatDateTime } from "../lib/date";

interface JournalDetailProps {
  journal: JournalEntry;
  onBack: () => void;
  onDelete: () => void;
  onUpdate: (journal: JournalEntry) => void;
}

export default function JournalDetail({
  journal,
  onBack,
  onDelete,
  onUpdate,
}: JournalDetailProps) {
  const [title, setTitle] = useState(journal.title);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");
  const [showMenu, setShowMenu] = useState(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    setTitle(journal.title);
  }, [journal.id]);

  const handleTitleChange = useCallback(
    (value: string) => {
      setTitle(value);
      setSaveStatus("unsaved");

      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        const updated = updateJournal(journal.id, { title: value });
        if (updated) {
          onUpdate(updated);
          setSaveStatus("saved");
        }
      }, 800);
    },
    [journal.id, onUpdate]
  );

  const handleContentChange = useCallback(
    (content: unknown, plainText: string, wordCount: number) => {
      setSaveStatus("unsaved");

      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        const excerpt = plainText.slice(0, 150).trim() || "";
        const updated = updateJournal(journal.id, {
          content,
          plainText,
          excerpt,
          wordCount,
        });
        if (updated) {
          onUpdate(updated);
          setSaveStatus("saved");
        }
      }, 1000);
    },
    [journal.id, onUpdate]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        setSaveStatus("saving");
        setTimeout(() => setSaveStatus("saved"), 300);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  const handleDelete = () => {
    deleteJournal(journal.id);
    onDelete();
  };

  return (
    <div>
      <div className="editor-topbar">
        <div className="editor-topbar-left">
          <button className="btn btn-ghost btn-sm" onClick={onBack}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <span className="editor-save-status" data-status={saveStatus}>
            {saveStatus === "saved" ? "Saved" : saveStatus === "saving" ? "Saving..." : "Unsaved"}
          </span>
        </div>
        <div className="editor-topbar-right">
          <span className="editor-updated">
            {formatDateTime(journal.updatedAt)}
          </span>
          <div className="editor-menu-wrapper">
            <button
              className="btn-icon"
              onClick={() => setShowMenu(!showMenu)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </button>
            {showMenu && (
              <div className="dropdown-menu">
                <button
                  className="dropdown-item danger"
                  onClick={() => {
                    handleDelete();
                    setShowMenu(false);
                  }}
                >
                  Delete journal
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="editor-container">
        <input
          className="editor-title-input"
          placeholder="Untitled"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
        />

        <PlateEditor
          initialValue={journal.content}
          onChange={handleContentChange}
          placeholder="Start writing..."
        />

        <div className="editor-meta">
          <span>{journal.wordCount} words</span>
          <span>Created {formatDateTime(journal.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
