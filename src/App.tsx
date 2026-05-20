import { useState, useCallback } from "react";
import type { MemoryItem } from "./types/memory";
import { getMemories, deleteMemory, updateMemory } from "./lib/storage";
import Sidebar from "./components/Sidebar";
import type { Page } from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Capture from "./pages/Capture";
import MemoryPage from "./pages/Memory";
import Search from "./pages/Search";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";

export type { Page };

export default function App() {
  const [page, setPage] = useState<Page>("dashboard");
  const [memories, setMemories] = useState<MemoryItem[]>(getMemories);

  const refresh = useCallback(() => {
    setMemories(getMemories());
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      deleteMemory(id);
      refresh();
    },
    [refresh]
  );

  const handleToggleTask = useCallback(
    (id: string) => {
      const mem = memories.find((m) => m.id === id);
      if (mem) {
        updateMemory(id, { completed: !mem.completed });
        refresh();
      }
    },
    [memories, refresh]
  );

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard memories={memories} onNavigate={setPage} />;
      case "capture":
        return <Capture onSaved={refresh} />;
      case "memory":
        return (
          <MemoryPage
            memories={memories}
            onDelete={handleDelete}
            onToggleComplete={handleToggleTask}
          />
        );
      case "search":
        return <Search memories={memories} />;
      case "tasks":
        return <Tasks memories={memories} onToggle={handleToggleTask} />;
      case "settings":
        return <Settings memories={memories} onClear={refresh} />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar active={page} onNavigate={setPage} />
      <main className="app-main">{renderPage()}</main>
    </div>
  );
}
