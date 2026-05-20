export type JournalEntry = {
  id: string;
  title: string;
  content: unknown;
  plainText: string;
  excerpt: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  wordCount: number;
  favorite?: boolean;
};
