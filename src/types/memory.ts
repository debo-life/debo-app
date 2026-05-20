export type MemoryType = "thought" | "task" | "idea" | "link" | "journal";

export interface MemoryItem {
  id: string;
  title: string;
  content: string;
  type: MemoryType;
  createdAt: string;
  updatedAt: string;
  completed?: boolean;
}
