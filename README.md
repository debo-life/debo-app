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

---

## Why Debo Exists

Most note-taking apps are built for document storage, not memory. You write something down, file it away, and hope you remember where it is months later. Traditional productivity tools treat your thoughts as static documents in folders — they don't understand that a fleeting idea at 2am, a task from a meeting, and a link you saved last week are all fragments of your working memory.

Debo is built on a different premise: your personal knowledge should be captured instantly, stored privately, and retrieved effortlessly. It bridges the gap between disposable note apps and heavyweight knowledge management systems. No complex organization schemes, no folder hierarchies to maintain — just capture and find.

Privacy is non-negotiable. Your thoughts, tasks, and ideas are deeply personal. Debo stores everything locally on your device. No accounts, no cloud sync, no telemetry. Your data belongs to you, period.

## Core Principles

- **Local-first** — Your data never leaves your device. No internet required.
- **Privacy-first** — No accounts, no tracking, no analytics, no cloud.
- **Source-available** — Transparent code you can inspect, audit, and learn from.
- **Personal-use free** — Free for individuals. Commercial use requires a license.
- **Minimal premium UX** — Clean, fast, distraction-free. No bloat, no clutter.
- **Built for builders** — Students, founders, researchers, creators, developers.

## Current Features (v0.1.0)

- **Journal system** with PlateJS rich text editor — headings, bold, italic, underline, blockquote, lists, links
- **Auto-save** with debounced persistence and Cmd+S manual save
- **Memory capture** for thoughts, tasks, ideas, links
- **Memory timeline** with type filters and chronological browsing
- **Task management** with completion tracking (open/completed filters)
- **Full-text search** across journals and memories
- **Export/import** all data as JSON
- **Dark and light theme** (follows system preference)
- **Keyboard shortcuts** — Cmd+S save
- **Local-only storage** via localStorage

## Planned Features

See [docs/specs/ROADMAP.md](docs/specs/ROADMAP.md) for the full roadmap.

- AI-powered memory recall and connections (v0.3.0)
- SQLite with vector embeddings for semantic search (v0.2.0)
- Voice input for quick capture
- Global hotkey for instant capture
- Optional encrypted cloud sync (v0.5.0)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Desktop shell | [Tauri v2](https://tauri.app) |
| Frontend | [React 19](https://react.dev), [TypeScript 5.8](https://typescriptlang.org) |
| Build tool | [Vite 7](https://vite.dev) |
| Package manager | [Bun](https://bun.sh) |
| Backend | [Rust](https://rust-lang.org) |
| Rich text editor | [PlateJS v49](https://platejs.org) (Slate-based) |
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
  types/          — TypeScript type definitions (MemoryItem, JournalEntry)
  lib/            — Storage layer, utilities, date formatting
  components/
    editor/       — PlateJS rich text editor
    Sidebar.tsx   — Navigation sidebar
    MemoryCard.tsx, Badge.tsx, Button.tsx, etc.
  pages/
    Dashboard.tsx — Today view with stats
    Journals.tsx  — Journal listing with search
    JournalDetail.tsx — Rich text journal editor
    Capture.tsx   — Quick memory capture
    Memory.tsx    — Memory timeline
    Tasks.tsx     — Task management
    Search.tsx    — Full-text search
    Settings.tsx  — Data management
  App.tsx         — Root component with routing
  main.tsx        — Entry point
  index.css       — Design system (plain CSS)
src-tauri/
  src/            — Rust backend
  icons/          — App icons
  capabilities/   — Tauri permissions
docs/
  specs/          — Product, UX, editor, data model specs
  adr/            — Architecture decision records
```

## Documentation

| Document | Description |
|----------|-------------|
| [Product Spec](docs/specs/PRODUCT_SPEC.md) | What Debo is and who it's for |
| [UX Spec](docs/specs/UX_SPEC.md) | Navigation, pages, writing flow |
| [UI System](docs/specs/UI_SYSTEM.md) | Design tokens, typography, spacing |
| [Editor Spec](docs/specs/EDITOR_SPEC.md) | PlateJS editor design and features |
| [Data Model](docs/specs/DATA_MODEL.md) | JournalEntry, MemoryItem, storage |
| [Roadmap](docs/specs/ROADMAP.md) | Phase 0 through Phase 5 |
| [ADR: PlateJS](docs/adr/0001-use-platejs-for-rich-text-editor.md) | Why PlateJS over alternatives |

## Contributing

We welcome contributions from developers of all experience levels. See [CONTRIBUTING.md](CONTRIBUTING.md) for setup instructions, coding conventions, and how to submit pull requests.

New to the project? Check out [docs/GOOD_FIRST_ISSUES.md](docs/GOOD_FIRST_ISSUES.md) for beginner-friendly tasks.

## License

Debo is **source-available** and **personal-use free** under the [Debo Personal Use License v1.0](LICENSE).

- Free for personal, non-commercial use
- Commercial use requires a written license
- Contact: mail@30tools.com

This is a source-available license, not an OSI-approved open source license.

## Maintainer

**Shaswat Raj** ([@SH20RAJ](https://github.com/SH20RAJ)) / [debo-life](https://github.com/debo-life)
Contact: mail@30tools.com

---

**Repo description for GitHub:**
> Local-first memory OS for capturing, organizing, and searching your thoughts, tasks, ideas, and memories.

**Suggested topics:**
`tauri` `react` `typescript` `rust` `local-first` `productivity` `memory` `personal-knowledge-management` `desktop-app` `ai`
