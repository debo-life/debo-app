import { MemoryItem } from "../types/memory";
import { formatDate } from "../lib/utils";

interface MemoryCardProps {
  memory: MemoryItem;
  onDelete?: (id: string) => void;
}

export default function MemoryCard({ memory, onDelete }: MemoryCardProps) {
  return (
    <div className="card memory-card">
      <div className="memory-card-main">
        <div className="memory-card-header">
          <span className={`type-badge ${memory.type}`}>{memory.type}</span>
          {memory.title && (
            <span className="memory-card-title">{memory.title}</span>
          )}
        </div>
        <div className="memory-card-content">{memory.content}</div>
        <div className="memory-card-meta">
          <span className="memory-card-date">{formatDate(memory.createdAt)}</span>
        </div>
      </div>
      {onDelete && (
        <div className="memory-card-actions">
          <button
            className="btn-icon danger"
            onClick={() => onDelete(memory.id)}
            title="Delete"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
