import type { MemoryItem, MemoryType } from "../types/memory";
import type { JournalEntry } from "../types/journal";

const STORAGE_KEY = "debo_memories";
const JOURNAL_KEY = "debo_journals";

function isTauri(): boolean {
  return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// ===== MEMORY STORAGE =====

export async function getMemories(): Promise<MemoryItem[]> {
  if (isTauri()) {
    const { invoke } = await import("@tauri-apps/api/core");
    return invoke("get_memories");
  }
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export async function createMemory(input: {
  title: string;
  content: string;
  type: MemoryType;
}): Promise<MemoryItem> {
  if (isTauri()) {
    const { invoke } = await import("@tauri-apps/api/core");
    return invoke("create_memory", {
      title: input.title,
      content: input.content,
      memoryType: input.type,
    });
  }
  const now = new Date().toISOString();
  const memory: MemoryItem = {
    id: generateId(),
    title: input.title,
    content: input.content,
    type: input.type,
    createdAt: now,
    updatedAt: now,
  };
  const memories = getMemoriesSync();
  memories.unshift(memory);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
  return memory;
}

export async function updateMemory(
  id: string,
  updates: Partial<MemoryItem>
): Promise<MemoryItem | null> {
  if (isTauri()) {
    const { invoke } = await import("@tauri-apps/api/core");
    await invoke("update_memory", {
      id,
      title: updates.title ?? null,
      content: updates.content ?? null,
      memoryType: updates.type ?? null,
      completed: updates.completed ?? null,
    });
    return { id, ...updates } as MemoryItem;
  }
  const memories = getMemoriesSync();
  const index = memories.findIndex((m) => m.id === id);
  if (index === -1) return null;
  memories[index] = {
    ...memories[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
  return memories[index];
}

export async function deleteMemory(id: string): Promise<void> {
  if (isTauri()) {
    const { invoke } = await import("@tauri-apps/api/core");
    return invoke("delete_memory", { id });
  }
  const memories = getMemoriesSync().filter((m) => m.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
}

function getMemoriesSync(): MemoryItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// ===== JOURNAL STORAGE =====

export async function getJournals(): Promise<JournalEntry[]> {
  if (isTauri()) {
    const { invoke } = await import("@tauri-apps/api/core");
    return invoke("get_journals");
  }
  try {
    const data = localStorage.getItem(JOURNAL_KEY);
    const journals: JournalEntry[] = data ? JSON.parse(data) : [];
    return journals.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  } catch {
    return [];
  }
}

export async function getJournal(
  id: string
): Promise<JournalEntry | undefined> {
  const journals = await getJournals();
  return journals.find((j) => j.id === id);
}

export async function createJournal(
  input?: Partial<JournalEntry>
): Promise<JournalEntry> {
  if (isTauri()) {
    const { invoke } = await import("@tauri-apps/api/core");
    return invoke("create_journal", {
      title: input?.title || "Untitled",
      content: input?.content ? JSON.stringify(input.content) : null,
      plainText: input?.plainText || "",
      excerpt: input?.excerpt || "",
      tags: JSON.stringify(input?.tags || []),
      wordCount: input?.wordCount || 0,
    });
  }
  const now = new Date().toISOString();
  const journal: JournalEntry = {
    id: generateId(),
    title: input?.title || "Untitled",
    content: input?.content || null,
    plainText: input?.plainText || "",
    excerpt: input?.excerpt || "",
    tags: input?.tags || [],
    createdAt: now,
    updatedAt: now,
    wordCount: input?.wordCount || 0,
    favorite: false,
  };
  const journals = getJournalsSync();
  journals.unshift(journal);
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(journals));
  return journal;
}

export async function updateJournal(
  id: string,
  updates: Partial<JournalEntry>
): Promise<JournalEntry | null> {
  if (isTauri()) {
    const { invoke } = await import("@tauri-apps/api/core");
    await invoke("update_journal", {
      id,
      title: updates.title ?? null,
      content: updates.content ? JSON.stringify(updates.content) : null,
      plainText: updates.plainText ?? null,
      excerpt: updates.excerpt ?? null,
      tags: updates.tags ? JSON.stringify(updates.tags) : null,
      wordCount: updates.wordCount ?? null,
      favorite: updates.favorite ?? null,
    });
    return { id, ...updates } as JournalEntry;
  }
  const journals = getJournalsSync();
  const index = journals.findIndex((j) => j.id === id);
  if (index === -1) return null;
  journals[index] = {
    ...journals[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(journals));
  return journals[index];
}

export async function deleteJournal(id: string): Promise<void> {
  if (isTauri()) {
    const { invoke } = await import("@tauri-apps/api/core");
    return invoke("delete_journal", { id });
  }
  const journals = getJournalsSync().filter((j) => j.id !== id);
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(journals));
}

export async function duplicateJournal(
  id: string
): Promise<JournalEntry | null> {
  const original = await getJournal(id);
  if (!original) return null;
  return createJournal({
    title: `${original.title} (copy)`,
    content: original.content,
    plainText: original.plainText,
    excerpt: original.excerpt,
    tags: [...original.tags],
    wordCount: original.wordCount,
  });
}

function getJournalsSync(): JournalEntry[] {
  try {
    const data = localStorage.getItem(JOURNAL_KEY);
    const journals: JournalEntry[] = data ? JSON.parse(data) : [];
    return journals.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  } catch {
    return [];
  }
}

// ===== COMBINED =====

export async function exportAllData(): Promise<string> {
  const memories = await getMemories();
  const journals = await getJournals();
  return JSON.stringify(
    {
      version: 1,
      exportedAt: new Date().toISOString(),
      journals,
      memories,
    },
    null,
    2
  );
}

export async function importAllData(
  json: string
): Promise<{ journals: number; memories: number }> {
  const parsed = JSON.parse(json);
  if (!parsed || typeof parsed !== "object") throw new Error("Invalid data");
  let journalCount = 0;
  let memoryCount = 0;

  if (Array.isArray(parsed.memories)) {
    for (const m of parsed.memories) {
      if (m.id && m.content && m.type) {
        await createMemory({
          title: m.title || "",
          content: m.content,
          type: m.type,
        });
        memoryCount++;
      }
    }
  }

  if (Array.isArray(parsed.journals)) {
    for (const j of parsed.journals) {
      if (j.id) {
        await createJournal({
          title: j.title,
          content: j.content,
          plainText: j.plainText || "",
          excerpt: j.excerpt || "",
          tags: j.tags || [],
          wordCount: j.wordCount || 0,
        });
        journalCount++;
      }
    }
  }

  return { journals: journalCount, memories: memoryCount };
}

export async function clearAllData(): Promise<void> {
  if (isTauri()) {
    const { invoke } = await import("@tauri-apps/api/core");
    const memories = await getMemories();
    for (const m of memories) {
      await invoke("delete_memory", { id: m.id });
    }
    const journals = await getJournals();
    for (const j of journals) {
      await invoke("delete_journal", { id: j.id });
    }
    return;
  }
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(JOURNAL_KEY);
}
