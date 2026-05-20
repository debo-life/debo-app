# Debo

### Debo — local-first memory OS for your life.

A private desktop app to capture, organize, and search your thoughts, tasks, ideas, links, and memories. Everything stays on your device.

<!-- Status badges -->
<!-- ![CI](https://github.com/debo-life/debo-app/actions/workflows/ci.yml/badge.svg) -->
<!-- ![License](https://img.shields.io/badge/license-source--available-blue) -->

<!-- Screenshot placeholder -->
<!-- ![Debo Screenshot](docs/screenshots/debo-light.png) -->
<!-- ![Debo Screenshot Dark](docs/screenshots/debo-dark.png) -->

---

## Why Debo exists

Your thoughts, ideas, and tasks deserve a home that respects your privacy. Debo is a local-first memory OS — a quiet, fast, trustworthy place to capture what matters to you without sending anything to the cloud.

Built for builders, students, founders, researchers, and creators who want a simple tool that stays out of the way.

## Core Principles

- **Local-first** — All data lives on your device. No servers, no accounts.
- **Privacy-first** — Nothing leaves your machine unless you choose to export.
- **Source-available** — Transparent code you can read, audit, and contribute to.
- **Personal-use free** — Free for individuals. Commercial use requires a license.
- **Minimal premium UX** — Clean, calm, keyboard-friendly design. No clutter.

## Current Features

- Capture thoughts, tasks, ideas, links, and journal entries
- Dashboard with stats and recent memories
- Full-text search across all memories
- Task view with completion tracking
- Dark and light theme (follows system preference)
- Keyboard shortcut: Cmd/Ctrl + Enter to save
- Settings with data management (clear all data)
- Responsive layout for smaller windows

## Planned Features

- SQLite local database
- Import/export (JSON, Markdown)
- Tags, categories, and backlinks
- AI-powered memory recall and summarization
- Voice input and file attachments
- Global hotkey for instant capture
- System tray app
- Encrypted local storage
- Optional encrypted cloud sync

See [ROADMAP.md](ROADMAP.md) for the full plan.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Desktop shell | [Tauri](https://tauri.app) |
| Frontend | [React](https://react.dev) |
| Language | [TypeScript](https://typescriptlang.org) |
| Build tool | [Vite](https://vite.dev) |
| Package manager | [Bun](https://bun.sh) |
| Backend | [Rust](https://rust-lang.org) |

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (latest)
- [Rust](https://rustup.rs/) (stable)
- Tauri CLI dependencies — see [Tauri prerequisites](https://tauri.app/start/prerequisites/)

### Install and run

```bash
# Clone
git clone https://github.com/debo-life/debo-app.git
cd debo-app

# Install dependencies
bun install

# Run in browser (web only)
bun run dev

# Run as desktop app
bun run tauri dev

# TypeScript check
bun run typecheck

# Format code
bun run format
```

## Project Structure

```
src/
  components/       Reusable UI components
  pages/            Page-level views
  lib/              Utilities and helpers
  types/            TypeScript type definitions

src-tauri/          Tauri / Rust backend

docs/               Project documentation
.github/            GitHub templates and CI
```

See [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) for details.

## Contributing

We welcome contributions of all kinds — bug fixes, features, documentation, design feedback.

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup instructions, coding standards, and how to submit a pull request.

New to the project? Check out [docs/GOOD_FIRST_ISSUES.md](docs/GOOD_FIRST_ISSUES.md) for beginner-friendly tasks.

## License

Debo is **source-available** and **personal-use free** under the [Debo Personal Use License v1.0](LICENSE).

- Free for personal, non-commercial use
- Commercial use requires a written license
- Contact: mail@30tools.com

This is a source-available license, not an OSI-approved open source license.

## Roadmap

See [ROADMAP.md](ROADMAP.md) for the full development plan across six phases — from foundation to optional cloud.

## Community

- [Issues](https://github.com/debo-life/debo-app/issues) — Report bugs, request features
- [Discussions](https://github.com/debo-life/debo-app/discussions) — Ask questions, share ideas
- [Good First Issues](docs/GOOD_FIRST_ISSUES.md) — Start contributing

## Security

To report a vulnerability, see [SECURITY.md](SECURITY.md). Please do not open public issues for security concerns.

## Maintainer

**Shaswat Raj** — [GitHub](https://github.com/SH20RAJ)  
Contact: mail@30tools.com

---

**Repo description for GitHub:**  
Local-first memory OS for capturing, organizing, and searching your thoughts, tasks, ideas, and memories.

**Suggested topics:**  
`tauri` `react` `typescript` `rust` `local-first` `productivity` `memory` `personal-knowledge-management` `desktop-app` `ai`
