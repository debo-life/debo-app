import { useState, useMemo } from "react";
import { MemoryItem } from "../types/memory";
import MemoryCard from "../components/MemoryCard";

interface SearchProps {
  memories: MemoryItem[];
}

export default function Search({ memories }: SearchProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return memories.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.content.toLowerCase().includes(q) ||
        m.type.toLowerCase().includes(q)
    );
  }, [query, memories]);

  return (
    <div>
      <div className="page-header">
        <h2>Search</h2>
        <p>Find anything in your memory</p>
      </div>

      <div className="search-container" style={{ marginBottom: 24 }}>
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          className="search-input"
          type="text"
          placeholder="Search by title, content, or type..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </div>

      {!query.trim() ? (
        <div className="empty-state">
          <svg className="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <div className="empty-state-title">Search your memories</div>
          <div className="empty-state-text">
            Type to search across all your captured thoughts, tasks, and ideas.
          </div>
        </div>
      ) : results.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-title">No results found</div>
          <div className="empty-state-text">
            Nothing matches "{query}". Try a different search term.
          </div>
        </div>
      ) : (
        <div className="memory-list">
          {results.map((m) => (
            <MemoryCard key={m.id} memory={m} />
          ))}
        </div>
      )}
    </div>
  );
}
