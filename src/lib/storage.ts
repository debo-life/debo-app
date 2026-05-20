import { MemoryItem } from "../types/memory";

const STORAGE_KEY = "debo_memories";

export function getMemories(): MemoryItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveMemory(memory: MemoryItem): void {
  const memories = getMemories();
  memories.unshift(memory);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
}

export function deleteMemory(id: string): void {
  const memories = getMemories().filter((m) => m.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
}

export function updateMemory(updated: MemoryItem): void {
  const memories = getMemories().map((m) => (m.id === updated.id ? updated : m));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
}

export function clearAllMemories(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
