import { useState, useMemo } from "react";
import type { MemoryItem } from "../types/memory";
import MemoryCard from "../components/MemoryCard";
import EmptyState from "../components/EmptyState";
import { cn } from "../lib/cn";

type Filter = "all" | "open" | "completed";

interface TasksProps {
  memories: MemoryItem[];
  onToggle: (id: string) => void;
}

export default function Tasks({ memories, onToggle }: TasksProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const tasks = useMemo(
    () => memories.filter((m) => m.type === "task"),
    [memories]
  );

  const filtered = useMemo(() => {
    if (filter === "open") return tasks.filter((t) => !t.completed);
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  const openCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div>
      <div className="page-header">
        <h2>Tasks</h2>
        <p>
          {openCount} open
          {completedCount > 0 && ` · ${completedCount} completed`}
        </p>
      </div>

      {tasks.length === 0 ? (
        <EmptyState
          icon={
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          }
          title="No tasks captured yet"
          description="Capture a memory with the Task type to track it here."
        />
      ) : (
        <>
          <div className="task-filters">
            {(["all", "open", "completed"] as Filter[]).map((f) => (
              <button
                key={f}
                className={cn("task-filter", filter === f && "active")}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                {f === "all" && ` (${tasks.length})`}
                {f === "open" && ` (${openCount})`}
                {f === "completed" && ` (${completedCount})`}
              </button>
            ))}
          </div>
          <div className="memory-list">
            {filtered.map((task) => (
              <MemoryCard
                key={task.id}
                memory={task}
                onToggleComplete={onToggle}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
