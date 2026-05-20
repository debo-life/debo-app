import { useState, useCallback, useEffect } from "react";
import type { MemoryItem } from "./types/memory";
import type { JournalEntry } from "./types/journal";
import {
  getMemories,
  deleteMemory,
  updateMemory,
  getJournals,
  createJournal,
} from "./lib/storage";
import Sidebar, { type Page } from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Capture from "./pages/Capture";
import MemoryPage from "./pages/Memory";
import Search from "./pages/Search";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";
import Journals from "./pages/Journals";
import JournalDetail from "./pages/JournalDetail";

export type { Page };

export default function App() {
  const [page, setPage] = useState<Page>("dashboard");
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [selectedJournalId, setSelectedJournalId] = useState<string | null>(
    null
  );

  const refreshMemories = useCallback(async () => {
    const data = await getMemories();
    setMemories(data);
  }, []);

  const refreshJournals = useCallback(async () => {
    const data = await getJournals();
    setJournals(data);
  }, []);

  const refresh = useCallback(async () => {
    await Promise.all([refreshMemories(), refreshJournals()]);
  }, [refreshMemories, refreshJournals]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteMemory(id);
      await refreshMemories();
    },
    [refreshMemories]
  );

  const handleToggleTask = useCallback(
    async (id: string) => {
      const mem = memories.find((m) => m.id === id);
      if (mem) {
        await updateMemory(id, { completed: !mem.completed });
        await refreshMemories();
      }
    },
    [memories, refreshMemories]
  );

  const handleNewJournal = useCallback(async () => {
    const journal = await createJournal({ title: "Untitled" });
    await refreshJournals();
    setSelectedJournalId(journal.id);
    setPage("journal-detail");
  }, [refreshJournals]);

  const handleOpenJournal = useCallback((id: string) => {
    setSelectedJournalId(id);
    setPage("journal-detail");
  }, []);

  const handleBackFromJournal = useCallback(() => {
    setSelectedJournalId(null);
    setPage("journals");
  }, []);

  const handleDeleteJournal = useCallback(async () => {
    setSelectedJournalId(null);
    await refreshJournals();
    setPage("journals");
  }, [refreshJournals]);

  const handleUpdateJournal = useCallback(
    async (_journal: JournalEntry) => {
      await refreshJournals();
    },
    [refreshJournals]
  );

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard memories={memories} onNavigate={setPage} />;
      case "capture":
        return <Capture onSaved={refreshMemories} />;
      case "journals":
        return (
          <Journals
            journals={journals}
            onOpen={handleOpenJournal}
            onRefresh={refreshJournals}
          />
        );
      case "journal-detail": {
        const journal = selectedJournalId
          ? journals.find((j) => j.id === selectedJournalId) ?? null
          : null;
        if (!journal) {
          return (
            <div>
              <p>Journal not found.</p>
              <button className="btn btn-primary" onClick={() => setPage("journals")}>
                Back to Journals
              </button>
            </div>
          );
        }
        return (
          <JournalDetail
            journal={journal}
            onBack={handleBackFromJournal}
            onDelete={handleDeleteJournal}
            onUpdate={handleUpdateJournal}
          />
        );
      }
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
        return <Settings memories={memories} onClear={refreshMemories} />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar
        active={page}
        onNavigate={setPage}
        onNewJournal={handleNewJournal}
      />
      <main className="app-main">
        <div className="app-content">{renderPage()}</div>
      </main>
    </div>
  );
}
