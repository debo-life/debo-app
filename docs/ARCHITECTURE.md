# Architecture

## Why Tauri

Debo is a desktop application built with [Tauri](https://tauri.app). We chose Tauri for several reasons:

- **Small binary size** — Tauri apps are significantly smaller than Electron equivalents
- **Native performance** — Rust backend with a web-based frontend
- **Security** — Tauri's permission-based command system limits what the frontend can access
- **Cross-platform** — Single codebase for macOS, Windows, and Linux
- **Low memory footprint** — Important for a background productivity app

## Why Local-First

Debo is a local-first application. All data lives on the user's device by default.

- **Privacy** — Your thoughts never leave your machine unless you choose to sync
- **Speed** — No network latency for reads and writes
- **Offline-first** — Works without an internet connection
- **Ownership** — You own your data, always
- **Trust** — No servers to breach, no accounts to compromise

## Frontend Responsibilities

The React + TypeScript frontend handles:

- All user interface rendering
- Client-side state management
- localStorage persistence (current version)
- Search and filtering
- Navigation and routing

## Tauri / Rust Responsibilities

The Rust backend (via Tauri) handles:

- Window management and native OS integration
- File system access (future)
- SQLite database operations (future)
- System tray and global shortcuts (future)
- Native notifications (future)
- Plugin system (future)

## Storage Direction

### Current: localStorage

The v0.0.1 release uses `localStorage` for simplicity. This is sufficient for the MVP but has limitations:

- ~5-10MB storage limit
- No complex queries
- No full-text search indexing
- Blocks the main thread on large datasets

### Future: SQLite

The next phase will migrate to SQLite via Tauri's plugin system:

- Unlimited storage
- Full-text search (FTS5)
- Complex queries and indexing
- Better performance at scale
- Import/export support

## Future AI Provider Abstraction

When AI features are added, Debo will use an abstraction layer:

- Support multiple providers (OpenAI, Anthropic, local models)
- Bring-your-own API key (BYOK)
- Ollama integration for fully local AI
- No vendor lock-in
- User controls which provider to use

## Security Philosophy

- All data stored locally by default
- No telemetry or tracking
- No network requests without user consent
- Tauri's permission system restricts backend access
- Future: encrypted local storage

## Privacy Philosophy

- Debo does not phone home
- Debo does not track users
- Debo does not collect analytics
- AI features (future) will require explicit user opt-in
- Cloud sync (future) will be end-to-end encrypted
- Your data is yours
