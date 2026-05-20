import { useState, useMemo } from "react";
import type { MemoryItem } from "../types/memory";
import MemoryCard from "../components/MemoryCard";
import EmptyState from "../components/EmptyState";

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
        <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <EmptyState
          icon={
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          }
          title="Search your local memory"
          description="Type to search across all your captured thoughts, tasks, and ideas."
        />
      ) : results.length === 0 ? (
        <EmptyState
          title="No results found"
          description={`Nothing matches "${query}". Try a different search term.`}
        />
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
