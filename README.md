# Debo

A local-first memory inbox desktop app. Capture thoughts, tasks, ideas, links, and journal entries — all stored locally on your device.

## Features

- **Capture** — Quickly save thoughts, tasks, ideas, links, and journal entries
- **Memory browser** — Browse all saved memories in reverse chronological order
- **Search** — Full-text search across titles, content, and types
- **Tasks** — Track and complete tasks with a dedicated view
- **Dashboard** — See stats and recent memories at a glance
- **Local storage** — Everything stays on your device, no cloud, no accounts
- **Keyboard shortcut** — Cmd/Ctrl + Enter to save instantly
- **Dark/light theme** — Follows your system preference

## Tech stack

- [Tauri](https://tauri.app) — Native desktop shell
- [React](https://react.dev) — UI framework
- [TypeScript](https://typescriptlang.org) — Type safety
- [Vite](https://vite.dev) — Build tool

## Getting started

```bash
# Install dependencies
bun install

# Run in development (web only)
bun run dev

# Run as desktop app
bun run tauri dev

# Build for production
bun run tauri build
```

## Project structure

```
src/
  types/memory.ts      — Data types
  lib/storage.ts       — localStorage helpers
  lib/utils.ts         — Formatting utilities
  components/
    Sidebar.tsx         — Navigation sidebar
    MemoryCard.tsx      — Reusable memory card
    Toast.tsx           — Success notification
  pages/
    Dashboard.tsx       — Home with stats and recent memories
    Capture.tsx         — Create new memories
    Memory.tsx          — Browse all memories
    Search.tsx          — Search across memories
    Tasks.tsx           — Task management
    Settings.tsx        — App settings and data management
  App.tsx               — Root layout and navigation
```

## Roadmap

- [ ] AI-powered memory recall and connections
- [ ] Voice input for quick capture
- [ ] Tags and categories
- [ ] Rich text editor
- [ ] SQLite local database
- [ ] File attachments
- [ ] Export/import
- [ ] Global hotkey for instant capture
- [ ] Tray app for background access
