import { z } from "zod";

export const JournalEntrySchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.unknown(),
  plainText: z.string(),
  excerpt: z.string(),
  tags: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
  wordCount: z.number(),
  favorite: z.boolean().optional(),
});

export const MemoryTypeSchema = z.enum([
  "thought",
  "task",
  "idea",
  "link",
  "journal",
]);

export const MemoryItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  type: MemoryTypeSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  completed: z.boolean().optional(),
  sourceJournalId: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const ExportDataSchema = z.object({
  version: z.literal(1),
  exportedAt: z.string(),
  journals: z.array(JournalEntrySchema),
  memories: z.array(MemoryItemSchema),
});

export type ExportData = z.infer<typeof ExportDataSchema>;
