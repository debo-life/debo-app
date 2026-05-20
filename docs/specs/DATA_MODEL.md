# Debo Data Model

## JournalEntry

Primary content type for rich-text journal entries created via PlateJS editor.

| Field        | Type      | Description                                      |
|--------------|-----------|--------------------------------------------------|
| id           | string    | Unique identifier (nanoid)                       |
| title        | string    | User-provided title, defaults to "Untitled"      |
| content      | unknown   | PlateJS Value (Slate node array), stored as JSON |
| plainText    | string    | Extracted plain text for search indexing          |
| excerpt      | string    | First ~150 chars of plainText for list display    |
| tags         | string[]  | User-assigned tags                                |
| createdAt    | string    | ISO 8601 timestamp                                |
| updatedAt    | string    | ISO 8601 timestamp, updated on every save         |
| wordCount    | number    | Computed from plainText                           |
| favorite     | boolean?  | Optional bookmark flag                            |

## MemoryItem

Lightweight memory entries — thoughts, tasks, ideas, links, or journal-derived items.

| Field            | Type        | Description                                  |
|------------------|-------------|----------------------------------------------|
| id               | string      | Unique identifier (nanoid)                   |
| title            | string      | Short title                                  |
| content          | string      | Plain text content                           |
| type             | MemoryType  | Category discriminator                       |
| createdAt        | string      | ISO 8601 timestamp                           |
| updatedAt        | string      | ISO 8601 timestamp                           |
| completed        | boolean?    | Only meaningful for type="task"              |
| sourceJournalId  | string?     | Links back to originating journal if derived |
| tags             | string[]?   | Optional tags                                |

## MemoryType

```typescript
type MemoryType = "thought" | "task" | "idea" | "link" | "journal";
```

## Storage Keys

| Key              | Contents                  |
|------------------|---------------------------|
| `debo_journals`  | JSON array of JournalEntry |
| `debo_memories`  | JSON array of MemoryItem   |

## Current Storage: localStorage

All data is persisted in the browser's `localStorage` as JSON strings. This is sufficient for v0.1.0 but has limitations:

- ~5-10MB storage limit per origin
- No querying — full array parsed on every read
- No full-text search without loading all data
- No indexing or ordering guarantees

## Future: SQLite Migration (Phase 2)

Planned migration to SQLite via `@tauri-apps/plugin-sql` or a custom Rust command layer.

### Proposed Schema

```sql
CREATE TABLE journals (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  content TEXT,          -- PlateJS Value as JSON
  plain_text TEXT,
  excerpt TEXT,
  tags TEXT,             -- JSON array
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  word_count INTEGER DEFAULT 0,
  favorite INTEGER DEFAULT 0
);

CREATE VIRTUAL TABLE journals_fts USING fts5(
  title, plain_text, tags,
  content='journals',
  content_rowid='rowid'
);

CREATE TABLE memories (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  content TEXT,
  type TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  completed INTEGER DEFAULT 0,
  source_journal_id TEXT,
  tags TEXT,             -- JSON array
  FOREIGN KEY (source_journal_id) REFERENCES journals(id)
);

CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT
);
```

### Future: Embeddings Table (Phase 4)

```sql
CREATE TABLE embeddings (
  id TEXT PRIMARY KEY,
  source_type TEXT NOT NULL,   -- "journal" or "memory"
  source_id TEXT NOT NULL,
  chunk_text TEXT NOT NULL,
  embedding BLOB NOT NULL,     -- sqlite-vec float32 blob
  created_at TEXT NOT NULL
);

CREATE VIRTUAL TABLE embeddings_vec USING vec0(
  id TEXT PRIMARY KEY,
  embedding float[384]         -- dimension depends on model
);
```
