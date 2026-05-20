# Debo Roadmap

## Phase 0: Foundation — v0.0.1 ✓

Repo setup and Tauri + React scaffold.

- Tauri v2 desktop shell
- React 19 + TypeScript + Vite 7
- Basic project structure
- CI/CD and contribution docs
- License and governance

## Phase 1: Local Journal & Memory App — v0.1.0 ✓

Full-featured local-first journaling and memory capture.

- Dashboard with stats and quick actions
- Memory capture with type classification (thought, task, idea, link, journal)
- PlateJS rich-text journal editor (headings, bold, italic, lists, blockquote, links)
- Journals listing with search and context menu (duplicate, delete)
- Journal detail view with auto-save and Cmd+S
- Tasks view with open/completed filtering
- Search across all memories and journals
- Settings with export/import JSON and clear data
- localStorage persistence
- Dark theme with green accent
- Responsive sidebar navigation

## Phase 2: SQLite & Tauri Store

Migrate from localStorage to SQLite for better performance and data integrity.

- Replace localStorage with SQLite via Tauri plugin
- Full-text search via FTS5
- Proper journal and memory tables with foreign keys
- Migration system for schema updates
- Tauri Store for app settings
- Data integrity checks on startup

## Phase 3: AI Summarization & Extraction

BYOK AI integration for intelligent memory processing.

- User-provided API key storage via Tauri Stronghold
- Provider support: OpenAI, Anthropic, OpenRouter
- Auto-extract memories from journal entries
- Journal summarization
- Smart tag suggestions
- AI settings page with provider configuration
- Token usage tracking

## Phase 4: Local Embeddings & Ask Debo

Semantic search powered by local embeddings.

- sqlite-vec for vector storage and similarity search
- Embedding generation via user-configured provider
- Chunking pipeline for journals and memories
- "Ask Debo" natural language interface
- Semantic search alongside keyword search
- Context-aware answers citing specific journals/memories
- Background indexing on new content

## Phase 5: Optional Encrypted Cloud Sync

E2E encrypted sync for users who want multi-device access.

- Tauri Stronghold for key management
- E2E encryption of all synced data
- Conflict resolution for offline-first workflow
- Optional — fully functional without sync
- Sync status indicator in UI
- Selective sync (exclude specific journals)
