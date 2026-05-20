import type { MemoryItem, MemoryType } from "../types/memory";

const STORAGE_KEY = "debo_memories";

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
