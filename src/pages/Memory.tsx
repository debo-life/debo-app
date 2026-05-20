import { useState, useMemo } from "react";
import type { MemoryItem, MemoryType } from "../types/memory";
import MemoryCard from "../components/MemoryCard";
import EmptyState from "../components/EmptyState";
import { cn } from "../lib/cn";

type FilterType = "all" | MemoryType;

interface MemoryPageProps {
  memories: MemoryItem[];
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const FILTERS: { value: FilterType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "thought", label: "Thoughts" },
  { value: "task", label: "Tasks" },
  { value: "idea", label: "Ideas" },
  { value: "link", label: "Links" },
  { value: "journal", label: "Journals" },
];

export default function MemoryPage({ memories, onDelete, onToggleComplete }: MemoryPageProps) {
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return memories;
    return memories.filter((m) => m.type === filter);
  }, [memories, filter]);

  return (
    <div>
      <div className="page-header">
        <h2>Memory</h2>
        <p>Everything Debo can help you recall.</p>
      </div>

      {memories.length === 0 ? (
        <EmptyState
          icon={
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          }
          title="Nothing remembered yet"
          description="Capture a journal or memory to begin."
        />
      ) : (
        <>
          <div className="memory-filters">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                className={cn("memory-filter", filter === f.value && "active")}
                onClick={() => setFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="memory-list">
            {filtered.map((m) => (
              <MemoryCard
                key={m.id}
                memory={m}
                onDelete={onDelete}
                onToggleComplete={onToggleComplete}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
