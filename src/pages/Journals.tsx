import { useState, useMemo } from "react";
import type { JournalEntry } from "../types/journal";
import { deleteJournal, duplicateJournal } from "../lib/storage";
import { formatRelative } from "../lib/date";
import EmptyState from "../components/EmptyState";

interface JournalsProps {
  journals: JournalEntry[];
  onOpen: (id: string) => void;
  onRefresh: () => void;
}

export default function Journals({ journals, onOpen, onRefresh }: JournalsProps) {
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return journals;
    const q = search.toLowerCase();
    return journals.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.plainText.toLowerCase().includes(q)
    );
  }, [journals, search]);

  const handleDelete = async (id: string) => {
    await deleteJournal(id);
    setOpenMenu(null);
    onRefresh();
  };

  const handleDuplicate = async (id: string) => {
    await duplicateJournal(id);
    setOpenMenu(null);
    onRefresh();
  };

  return (
    <div>
      <div className="page-header">
        <h2>Journals</h2>
        <p>All your journal entries</p>
      </div>

      <div className="search-container" style={{ marginBottom: 24 }}>
        <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          className="search-input"
          placeholder="Search journals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          }
          title={search ? "No journals found" : "No journals yet"}
          description={search ? "Try different keywords." : "Start with one thought."}
        />
      ) : (
        <div className="journal-list">
          {filtered.map((journal) => (
            <div
              key={journal.id}
              className="journal-card"
              onClick={() => onOpen(journal.id)}
            >
              <div className="journal-card-header">
                <h3 className="journal-card-title">
                  {journal.title || "Untitled"}
                </h3>
                <div className="journal-card-actions">
                  <button
                    className="btn-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenu(openMenu === journal.id ? null : journal.id);
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg>
                  </button>
                  {openMenu === journal.id && (
                    <div className="dropdown-menu">
                      <button
                        className="dropdown-item"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDuplicate(journal.id);
                        }}
                      >
                        Duplicate
                      </button>
                      <button
                        className="dropdown-item danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(journal.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {journal.excerpt && (
                <p className="journal-card-excerpt">{journal.excerpt}</p>
              )}
              <div className="journal-card-meta">
                <span>{formatRelative(journal.updatedAt)}</span>
                <span>{journal.wordCount} words</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
