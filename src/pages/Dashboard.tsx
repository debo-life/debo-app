import type { MemoryItem } from "../types/memory";
import type { Page } from "../components/Sidebar";
import { isToday } from "../lib/date";
import StatCard from "../components/StatCard";
import MemoryCard from "../components/MemoryCard";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";

interface DashboardProps {
  memories: MemoryItem[];
  onNavigate: (page: Page) => void;
}

export default function Dashboard({ memories, onNavigate }: DashboardProps) {
  const total = memories.length;
  const todayCount = memories.filter((m) => isToday(m.createdAt)).length;
  const openTasks = memories.filter((m) => m.type === "task" && !m.completed).length;
  const completedTasks = memories.filter((m) => m.type === "task" && m.completed).length;
  const recent = memories.slice(0, 5);

  if (total === 0) {
    return (
      <div>
        <div className="page-header">
          <h2>Good to see you again.</h2>
          <p>Capture what matters. Find it when you need it.</p>
        </div>
        <EmptyState
          icon={
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          }
          title="No memories yet"
          description="Capture your first thought to get started."
          action={
            <Button variant="primary" onClick={() => onNavigate("capture")}>
              Capture a memory
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h2>Good to see you again.</h2>
        <p>Capture what matters. Find it when you need it.</p>
      </div>

      <div className="stats-grid">
        <StatCard label="Total memories" value={total} />
        <StatCard label="Today's captures" value={todayCount} />
        <StatCard label="Open tasks" value={openTasks} />
        <StatCard label="Completed tasks" value={completedTasks} />
      </div>

      <div className="cta-section">
        <Button variant="primary" onClick={() => onNavigate("capture")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Capture a memory
        </Button>
      </div>

      {recent.length > 0 && (
        <>
          <div className="section-header">
            <h3>Recent memories</h3>
            <Button variant="ghost" onClick={() => onNavigate("memory")}>
              View all
            </Button>
          </div>
          <div className="memory-list">
            {recent.map((m) => (
              <MemoryCard key={m.id} memory={m} compact />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
