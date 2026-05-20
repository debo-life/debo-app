import { useMemo } from "react";
import { MemoryItem } from "../types/memory";
import { Page } from "../App";
import MemoryCard from "../components/MemoryCard";

interface DashboardProps {
  memories: MemoryItem[];
  onNavigate: (page: Page) => void;
}

export default function Dashboard({ memories, onNavigate }: DashboardProps) {
  const stats = useMemo(() => {
    const today = new Date().toDateString();
    return {
      total: memories.length,
      today: memories.filter((m) => new Date(m.createdAt).toDateString() === today).length,
      tasks: memories.filter((m) => m.type === "task").length,
    };
  }, [memories]);

  const recent = memories.slice(0, 5);

  return (
    <div>
      <div className="welcome-section">
        <h2>Good to see you again.</h2>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-label">Total memories</div>
          <div className="stat-card-value">{stats.total}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Today's captures</div>
          <div className="stat-card-value">{stats.today}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Saved tasks</div>
          <div className="stat-card-value">{stats.tasks}</div>
        </div>
      </div>

      <div className="cta-section">
        <button className="btn btn-primary" onClick={() => onNavigate("capture")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Capture a memory
        </button>
      </div>

      {recent.length > 0 && (
        <>
          <div className="section-header">
            <h3>Recent memories</h3>
            <button className="btn btn-ghost" onClick={() => onNavigate("memory")}>
              View all
            </button>
          </div>
          <div className="memory-list">
            {recent.map((m) => (
              <MemoryCard key={m.id} memory={m} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
