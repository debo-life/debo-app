import { useMemo } from "react";
import { MemoryItem } from "../types/memory";
import { formatDate } from "../lib/utils";

interface TasksProps {
  memories: MemoryItem[];
  onToggle: (id: string) => void;
}

export default function Tasks({ memories, onToggle }: TasksProps) {
  const tasks = useMemo(
    () => memories.filter((m) => m.type === "task"),
    [memories]
  );

  const pending = useMemo(
    () => tasks.filter((t) => !t.completed),
    [tasks]
  );

  const completed = useMemo(
    () => tasks.filter((t) => t.completed),
    [tasks]
  );

  return (
    <div>
      <div className="page-header">
        <h2>Tasks</h2>
        <p>
          {pending.length} pending
          {completed.length > 0 && ` · ${completed.length} completed`}
        </p>
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <svg className="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
          <div className="empty-state-title">No tasks yet</div>
          <div className="empty-state-text">
            Capture a memory with the "Task" type to track it here.
          </div>
        </div>
      ) : (
        <div className="memory-list">
          {pending.map((task) => (
            <div key={task.id} className="card task-card">
              <input
                type="checkbox"
                className="task-checkbox"
                checked={false}
                onChange={() => onToggle(task.id)}
              />
              <div className="memory-card-main">
                <div className="memory-card-header">
                  {task.title && (
                    <span className="memory-card-title">{task.title}</span>
                  )}
                </div>
                <div className="memory-card-content">{task.content}</div>
                <div className="memory-card-meta">
                  <span className="memory-card-date">{formatDate(task.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
          {completed.length > 0 && pending.length > 0 && (
            <div style={{ margin: "16px 0 8px", fontSize: 12, fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Completed
            </div>
          )}
          {completed.map((task) => (
            <div key={task.id} className="card task-card completed">
              <input
                type="checkbox"
                className="task-checkbox"
                checked={true}
                onChange={() => onToggle(task.id)}
              />
              <div className="memory-card-main">
                <div className="memory-card-header">
                  {task.title && (
                    <span className="memory-card-title">{task.title}</span>
                  )}
                </div>
                <div className="memory-card-content">{task.content}</div>
                <div className="memory-card-meta">
                  <span className="memory-card-date">{formatDate(task.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
