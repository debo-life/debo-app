import { useState, useCallback } from "react";
import { MemoryItem } from "./types/memory";
import { getMemories, deleteMemory, updateMemory } from "./lib/storage";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Capture from "./pages/Capture";
import MemoryPage from "./pages/Memory";
import Search from "./pages/Search";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";

export type Page = "dashboard" | "capture" | "memory" | "search" | "tasks" | "settings";

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
        updateMemory({ ...mem, completed: !mem.completed, updatedAt: new Date().toISOString() });
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
        return <MemoryPage memories={memories} onDelete={handleDelete} />;
      case "search":
        return <Search memories={memories} />;
      case "tasks":
        return <Tasks memories={memories} onToggle={handleToggleTask} />;
      case "settings":
        return <Settings onClear={refresh} />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar active={page} onNavigate={setPage} />
      <main className="app-main">{renderPage()}</main>
    </div>
  );
}
