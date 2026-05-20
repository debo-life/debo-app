export type MemoryType = "thought" | "task" | "idea" | "link" | "journal";

export type MemoryItem = {
  id: string;
  title: string;
  content: string;
  type: MemoryType;
  createdAt: string;
  updatedAt: string;
  completed?: boolean;
  sourceJournalId?: string;
  tags?: string[];
};
