import type { MemoryItem } from "../types/memory";
import type { Page } from "../components/Sidebar";
import { isToday } from "../lib/date";
import MemoryCard from "../components/MemoryCard";

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

  // Empty state
  if (total === 0) {
    return (
      <div className="dashboard">
        <div className="dashboard-hero">
          <h1>Good to see you again.</h1>
          <p>Capture what matters. Find it when you need it.</p>
        </div>
        <div className="dashboard-empty">
          <svg className="dashboard-empty-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
          <h3>Start with one line.</h3>
          <p>Your future self will thank you. Capture a thought, task, or idea to begin building your memory.</p>
          <button className="btn btn-primary" onClick={() => onNavigate("capture")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Capture a memory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Hero greeting */}
      <div className="dashboard-hero">
        <h1>Good to see you again.</h1>
        <p>Capture what matters. Find it when you need it.</p>
      </div>

      {/* Primary CTA card */}
      <div className="dashboard-cta">
        <div className="dashboard-cta-card">
          <div>
            <h3>Start with one thought.</h3>
            <p>What should Debo remember today?</p>
          </div>
          <button className="btn btn-primary" onClick={() => onNavigate("capture")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Capture a memory
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-label">Memories saved</div>
          <div className="stat-card-value">{total}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Today's captures</div>
          <div className="stat-card-value accent">{todayCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Open tasks</div>
          <div className="stat-card-value">{openTasks}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Completed</div>
          <div className="stat-card-value">{completedTasks}</div>
        </div>
      </div>

      {/* Recent memories */}
      {recent.length > 0 && (
        <div className="dashboard-section">
          <div className="section-header">
            <h3>Recent memories</h3>
            <button className="btn btn-ghost" onClick={() => onNavigate("memory")}>
              View all
            </button>
          </div>
          <div className="memory-list">
            {recent.map((m) => (
              <MemoryCard key={m.id} memory={m} compact />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
