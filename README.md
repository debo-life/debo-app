<div align="center">

# Debo

### Local-first memory OS for your life.

A private desktop app to capture, organize, and search your thoughts, tasks, ideas, links, and memories.

[![License: Source-Available](https://img.shields.io/badge/license-source--available-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-0.1.0-green.svg)](https://github.com/debo-life/debo-app/releases)
[![Tauri](https://img.shields.io/badge/Tauri-v2-ffc131.svg)](https://tauri.app)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6.svg)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7-646cff.svg)](https://vite.dev)
[![Bun](https://img.shields.io/badge/Bun-latest-fbf0d1.svg)](https://bun.sh)
[![Rust](https://img.shields.io/badge/Rust-2021-dea584.svg)](https://rust-lang.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Source-Available](https://img.shields.io/badge/source--available-personal--use--free-brightgreen.svg)](LICENSE)

</div>

<!-- TODO: Add screenshot -->
<!-- TODO: Add demo GIF -->

---

## Why Debo Exists

Most note-taking apps are built for document storage, not memory. You write something down, file it away, and hope you remember where it is months later. Traditional productivity tools treat your thoughts as static documents in folders — they don't understand that a fleeting idea at 2am, a task from a meeting, and a link you saved last week are all fragments of your working memory.

Debo is built on a different premise: your personal knowledge should be captured instantly, stored privately, and retrieved effortlessly. It bridges the gap between disposable note apps and heavyweight knowledge management systems. No complex organization schemes, no folder hierarchies to maintain — just capture and find.

Privacy is non-negotiable. Your thoughts, tasks, and ideas are deeply personal. Debo stores everything locally on your device. No accounts, no cloud sync, no telemetry. Your data belongs to you, period. As AI memory tools emerge, Debo will remain a place where you control what's remembered and how it's used.

## Core Principles

- **Local-first** — Your data never leaves your device. No internet required.
- **Privacy-first** — No accounts, no tracking, no analytics, no cloud.
- **Source-available** — Transparent code you can inspect, audit, and learn from.
- **Personal-use free** — Free for individuals. Commercial use requires a license.
- **Minimal premium UX** — Clean, fast, distraction-free. No bloat, no clutter.
- **Built for builders** — Students, founders, researchers, creators, developers.

## Current Features (v0.1.0)

- Capture thoughts, tasks, ideas, links, and journal entries
- Memory timeline with chronological browsing
- Full-text search across all memories
- Task management with completion tracking
- Export/import memories as JSON
- Dark and light theme (follows system preference)
- Keyboard shortcuts (Cmd/Ctrl + Enter to save)
- Local-only storage via localStorage

## Planned Features

- AI-powered memory recall and connections
- Voice input for quick capture
- Tags and categories
- Rich text editor
- SQLite local database
- File attachments
- Global hotkey for instant capture
- Tray app for background access

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Desktop shell | [Tauri v2](https://tauri.app) |
| Frontend | [React 19](https://react.dev), [TypeScript 5.8](https://typescriptlang.org) |
| Build tool | [Vite 7](https://vite.dev) |
| Package manager | [Bun](https://bun.sh) |
| Backend | [Rust](https://rust-lang.org) |
| Storage | localStorage (SQLite planned) |

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (latest)
- [Rust](https://rust-lang.org/tools/install) (for Tauri desktop build)

### Clone and Run

```bash
# Clone
git clone https://github.com/debo-life/debo-app.git
cd debo-app

# Install dependencies
bun install

# Run in browser (development)
bun run dev

# Run as desktop app
bun run tauri dev

# Build for production
bun run tauri build
```

### Development Scripts

```bash
bun run dev          # Start Vite dev server
bun run build        # TypeScript check + Vite build
bun run tauri dev    # Run as Tauri desktop app
bun run tauri build  # Build desktop binary
bun run typecheck    # TypeScript type checking
bun run format       # Format code with Prettier
```

## Project Structure

```
src/
  types/          — TypeScript type definitions
  lib/            — Storage, utilities, helpers
  components/     — Reusable UI components
  pages/          — Application screens
  App.tsx         — Root component
  main.tsx        — Entry point
  index.css       — Design system
src-tauri/
  src/            — Rust backend
  icons/          — App icons
  capabilities/   — Tauri permissions
docs/             — Architecture, design principles
```

See [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) for full details.

## Architecture

```
┌─────────────────────────────────────────┐
│              Debo Desktop               │
├─────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────────────────┐ │
│  │ Sidebar  │  │    Main Content      │ │
│  │          │  │                      │ │
│  │ Dashboard│  │  ┌────────────────┐  │ │
│  │ Capture  │  │  │  Active Page   │  │ │
│  │ Memory   │  │  │                │  │ │
│  │ Search   │  │  │  Dashboard     │  │ │
│  │ Tasks    │  │  │  Capture       │  │ │
│  │ Settings │  │  │  Memory        │  │ │
│  │          │  │  │  Search        │  │ │
│  └──────────┘  │  │  Tasks         │  │ │
│                │  │  Settings      │  │ │
│                │  └────────────────┘  │ │
│                └──────────────────────┘ │
├─────────────────────────────────────────┤
│  Storage Layer (localStorage)           │
│  ┌──────────────────────────────────┐   │
│  │ getMemories | createMemory       │   │
│  │ updateMemory | deleteMemory      │   │
│  │ exportMemories | importMemories  │   │
│  └──────────────────────────────────┘   │
├─────────────────────────────────────────┤
│  Tauri v2 (Rust)                        │
│  ┌──────────────────────────────────┐   │
│  │ Window management                │   │
│  │ System integration               │   │
│  │ File system access (future)      │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### Data Flow

```
User Input → Capture Page → createMemory() → localStorage
                                                  ↓
Dashboard ← getMemories() ←──────────────────────┘
Memory   ← getMemories() ←──────────────────────┘
Search   ← getMemories() → filter → results
Tasks    ← getMemories() → filter(type=task) → task list
Settings → exportMemories() → JSON file
         → importMemories() ← JSON file
         → clearMemories() → clear localStorage
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed architecture documentation.

## Contributing

We welcome contributions from developers of all experience levels. See [CONTRIBUTING.md](CONTRIBUTING.md) for setup instructions, coding conventions, and how to submit pull requests.

New to the project? Check out [docs/GOOD_FIRST_ISSUES.md](docs/GOOD_FIRST_ISSUES.md) for beginner-friendly tasks.

## License

Debo is **source-available** and **personal-use free** under the [Debo Personal Use License v1.0](LICENSE).

- Free for personal, non-commercial use
- Commercial use requires a written license
- Contact: mail@30tools.com

This is a source-available license, not an OSI-approved open source license.

## Roadmap

See [ROADMAP.md](ROADMAP.md) for the full product roadmap covering phases 0 through 5.

## Community

- [GitHub Issues](https://github.com/debo-life/debo-app/issues) — Bug reports and feature requests
- [GitHub Discussions](https://github.com/debo-life/debo-app/discussions) — Questions and ideas
- [Good First Issues](docs/GOOD_FIRST_ISSUES.md) — Start contributing

## Security

To report a vulnerability, see [SECURITY.md](SECURITY.md). Please do not open public issues for security concerns.

## Maintainer

**Shaswat Raj** ([@SH20RAJ](https://github.com/SH20RAJ)) / [debo-life](https://github.com/debo-life)
Contact: mail@30tools.com

---

**Repo description for GitHub:**
> Local-first memory OS for capturing, organizing, and searching your thoughts, tasks, ideas, and memories.

**Suggested topics:**
`tauri` `react` `typescript` `rust` `local-first` `productivity` `memory` `personal-knowledge-management` `desktop-app` `ai`
