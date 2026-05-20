import type { MemoryItem } from "../types/memory";
import MemoryCard from "../components/MemoryCard";
import EmptyState from "../components/EmptyState";


interface MemoryPageProps {
  memories: MemoryItem[];
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export default function MemoryPage({ memories, onDelete, onToggleComplete }: MemoryPageProps) {
  return (
    <div>
      <div className="page-header">
        <h2>Memory</h2>
        <p>{memories.length} {memories.length === 1 ? "memory" : "memories"} saved</p>
      </div>

      {memories.length === 0 ? (
        <EmptyState
          icon={
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          }
          title="No memories yet"
          description="Capture your first one."
        />
      ) : (
        <div className="memory-list">
          {memories.map((m) => (
            <MemoryCard
              key={m.id}
              memory={m}
              onDelete={onDelete}
              onToggleComplete={onToggleComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
