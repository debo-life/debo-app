import type { MemoryItem, MemoryType } from "../types/memory";
import type { JournalEntry } from "../types/journal";

const STORAGE_KEY = "debo_memories";
const JOURNAL_KEY = "debo_journals";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function getMemories(): MemoryItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function createMemory(input: {
  title: string;
  content: string;
  type: MemoryType;
}): MemoryItem {
  const now = new Date().toISOString();
  const memory: MemoryItem = {
    id: generateId(),
    title: input.title,
    content: input.content,
    type: input.type,
    createdAt: now,
    updatedAt: now,
  };
  const memories = getMemories();
  memories.unshift(memory);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
  return memory;
}

export function updateMemory(
  id: string,
  updates: Partial<MemoryItem>
): MemoryItem | null {
  const memories = getMemories();
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

export function deleteMemory(id: string): void {
  const memories = getMemories().filter((m) => m.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
}

export function clearMemories(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function exportMemories(): string {
  return JSON.stringify(getMemories(), null, 2);
}

export function importMemories(json: string): MemoryItem[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    throw new Error("Invalid JSON");
  }
  if (!Array.isArray(parsed)) {
    throw new Error("JSON must be an array of memories");
  }
  const existing = getMemories();
  const existingIds = new Set(existing.map((m) => m.id));
  const valid: MemoryItem[] = [];
  for (const item of parsed) {
    if (
      typeof item === "object" &&
      item !== null &&
      typeof item.id === "string" &&
      typeof item.content === "string" &&
      typeof item.type === "string"
    ) {
      if (!existingIds.has(item.id)) {
        valid.push(item as MemoryItem);
      }
    }
  }
  const merged = [...valid, ...existing];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  return valid;
}

// ===== JOURNAL STORAGE =====

export function getJournals(): JournalEntry[] {
  try {
    const data = localStorage.getItem(JOURNAL_KEY);
    const journals: JournalEntry[] = data ? JSON.parse(data) : [];
    return journals.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  } catch {
    return [];
  }
}

export function getJournal(id: string): JournalEntry | undefined {
  return getJournals().find((j) => j.id === id);
}

export function createJournal(input?: Partial<JournalEntry>): JournalEntry {
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
  const journals = getJournals();
  journals.unshift(journal);
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(journals));
  return journal;
}

export function updateJournal(
  id: string,
  updates: Partial<JournalEntry>
): JournalEntry | null {
  const journals = getJournals();
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

export function deleteJournal(id: string): void {
  const journals = getJournals().filter((j) => j.id !== id);
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(journals));
}

export function duplicateJournal(id: string): JournalEntry | null {
  const original = getJournal(id);
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

export function searchJournals(query: string): JournalEntry[] {
  const q = query.toLowerCase().trim();
  if (!q) return getJournals();
  return getJournals().filter(
    (j) =>
      j.title.toLowerCase().includes(q) ||
      j.plainText.toLowerCase().includes(q) ||
      j.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function exportAllData(): string {
  return JSON.stringify(
    {
      version: 1,
      exportedAt: new Date().toISOString(),
      journals: getJournals(),
      memories: getMemories(),
    },
    null,
    2
  );
}

export function importAllData(json: string): {
  journals: number;
  memories: number;
} {
  const parsed = JSON.parse(json);
  if (!parsed || typeof parsed !== "object") throw new Error("Invalid data");

  let journalCount = 0;
  let memoryCount = 0;

  if (Array.isArray(parsed.journals)) {
    const existing = getJournals();
    const existingIds = new Set(existing.map((j) => j.id));
    const newJournals = parsed.journals.filter(
      (j: JournalEntry) => !existingIds.has(j.id)
    );
    if (newJournals.length > 0) {
      localStorage.setItem(
        JOURNAL_KEY,
        JSON.stringify([...newJournals, ...existing])
      );
      journalCount = newJournals.length;
    }
  }

  if (Array.isArray(parsed.memories)) {
    const existing = getMemories();
    const existingIds = new Set(existing.map((m) => m.id));
    const newMemories = parsed.memories.filter(
      (m: MemoryItem) => !existingIds.has(m.id)
    );
    if (newMemories.length > 0) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...newMemories, ...existing])
      );
      memoryCount = newMemories.length;
    }
  }

  return { journals: journalCount, memories: memoryCount };
}

export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(JOURNAL_KEY);
}
