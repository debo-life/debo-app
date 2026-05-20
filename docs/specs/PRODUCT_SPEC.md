# Debo — Product Specification

## What is Debo?

Debo is a local-first personal memory OS. It is a desktop application that lets you capture thoughts, journal daily, track tasks, and search across everything you've written — all stored locally on your device.

## Current Phase

**v0.1.0** — Local journal and memory app.

This is the first usable version of Debo. It focuses on the core writing and capture experience with no external dependencies, no cloud services, and no AI features.

## Target Users

- **Founders** documenting decisions, ideas, and reflections
- **Builders** tracking project thoughts and technical notes
- **Students** journaling and organizing study notes
- **Researchers** capturing observations and references
- **Creators** collecting ideas, drafts, and creative fragments

These users share a need: fast capture, easy retrieval, and a calm writing environment.

## Core Jobs-to-Be-Done

1. **Capture thoughts quickly** — Open the app, write, save. No friction.
2. **Journal daily** — A dedicated writing space with rich text formatting.
3. **Find past entries** — Search across journals and memories by title, content, or type.
4. **Track tasks** — Mark tasks as done or undone, see open vs. completed counts.

## v0.1.0 Scope

### Included

| Feature | Description |
|---------|-------------|
| Journal CRUD | Create, read, update, delete, duplicate journal entries |
| Rich text editor | PlateJS-powered editor with headings, bold, italic, underline, blockquote, lists, links |
| Auto-save | Debounced persistence after every edit |
| Memory capture | Quick capture of thoughts, tasks, ideas, links |
| Task tracking | Filter tasks by open/completed, toggle completion |
| Search | Full-text search across journals and memories |
| Export/Import | JSON export and import of all data |
| Clear data | Wipe all local data with confirmation |
| Command menu | Cmd+K shortcut for quick navigation |

### Not Included

- No AI summarization or extraction
- No cloud sync or remote storage
- No authentication or user accounts
- No backend server
- No multi-device support
- No collaborative editing

## Non-Goals for v0.1.0

These are explicitly out of scope for this release:

1. **AI features** — No summarization, no extraction, no embeddings. Future phases will add these.
2. **Cloud sync** — All data stays on-device. No network requests.
3. **Authentication** — No login, no accounts, no identity layer.
4. **Backend** — No server, no API, no database beyond localStorage.
5. **Mobile** — Desktop only (Tauri). Mobile is a future consideration.

## Data Storage

All data is stored in the browser's `localStorage` under two keys:

- `debo_journals` — Array of journal entries
- `debo_memories` — Array of memory items

This is intentionally simple for v0.1.0. Future versions will migrate to SQLite via Tauri's native storage.

## Future Roadmap

See [ROADMAP.md](../ROADMAP.md) for the full phased plan:

- **Phase 2**: SQLite/Tauri Store migration
- **Phase 3**: AI summarization and extraction (BYOK)
- **Phase 4**: Local embeddings and Ask Debo semantic search
- **Phase 5**: Optional encrypted cloud sync
