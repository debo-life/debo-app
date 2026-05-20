import { MemoryItem } from "../types/memory";
import { formatRelative } from "../lib/date";
import { cn } from "../lib/cn";
import Badge from "./Badge";

interface MemoryCardProps {
  memory: MemoryItem;
  onDelete?: (id: string) => void;
  onToggleComplete?: (id: string) => void;
  compact?: boolean;
}

export default function MemoryCard({ memory, onDelete, onToggleComplete, compact }: MemoryCardProps) {
  return (
    <div className={cn("card", "memory-card", memory.completed && "completed")}>
      <div className="memory-card-main">
        <div className="memory-card-header">
          {memory.type === "task" && onToggleComplete && (
            <input
              type="checkbox"
              className="task-checkbox"
              checked={!!memory.completed}
              onChange={() => onToggleComplete(memory.id)}
            />
          )}
          <Badge type={memory.type} />
          {memory.title && (
            <span className="memory-card-title">{memory.title}</span>
          )}
        </div>
        {!compact && (
          <div className="memory-card-content">{memory.content}</div>
        )}
        <div className="memory-card-meta">
          <span className="memory-card-date">{formatRelative(memory.createdAt)}</span>
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
