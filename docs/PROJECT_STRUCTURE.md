# Project Structure

## Current Structure

```
debo/
├── .github/                    # GitHub configuration
│   ├── ISSUE_TEMPLATE/         # Issue templates
│   ├── workflows/              # CI workflows
│   ├── CODEOWNERS              # Code ownership
│   ├── FUNDING.yml             # Funding links
│   └── PULL_REQUEST_TEMPLATE.md
├── docs/                       # Project documentation
│   ├── ARCHITECTURE.md
│   ├── DESIGN_PRINCIPLES.md
│   ├── GOOD_FIRST_ISSUES.md
│   ├── PROJECT_STRUCTURE.md
│   ├── RELEASE_PROCESS.md
│   └── RFC_TEMPLATE.md
├── public/                     # Static assets
│   ├── tauri.svg
│   └── vite.svg
├── src/                        # Frontend source
│   ├── components/             # Reusable UI components
│   │   ├── MemoryCard.tsx
│   │   ├── Sidebar.tsx
│   │   └── Toast.tsx
│   ├── lib/                    # Utilities and helpers
│   │   ├── storage.ts
│   │   └── utils.ts
│   ├── pages/                  # Page components
│   │   ├── Capture.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Memory.tsx
│   │   ├── Search.tsx
│   │   ├── Settings.tsx
│   │   └── Tasks.tsx
│   ├── types/                  # TypeScript types
│   │   └── memory.ts
│   ├── App.css
│   ├── App.tsx                 # Root component
│   ├── index.css               # Global styles
│   └── main.tsx                # Entry point
├── src-tauri/                  # Tauri / Rust backend
│   ├── capabilities/           # Tauri permissions
│   ├── icons/                  # App icons
│   ├── src/                    # Rust source
│   ├── build.rs
│   ├── Cargo.toml
│   └── tauri.conf.json
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── GOVERNANCE.md
├── LICENSE
├── README.md
├── ROADMAP.md
├── SECURITY.md
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Key Directories

### `src/components/`

Reusable UI components that are used across multiple pages. These should be:

- Focused on a single responsibility
- Accept props via TypeScript interfaces
- Styled with CSS classes from `index.css`

### `src/pages/`

Page-level components that map to sidebar navigation items. Each page is a self-contained view.

### `src/lib/`

Utility functions, storage helpers, and shared logic. No React components here.

### `src/types/`

TypeScript type definitions shared across the application.

### `src-tauri/`

The Rust backend for Tauri. This handles:

- Window management
- Native OS integration
- Future: SQLite, file system, system tray

## Planned Future Structure

As Debo grows, the structure will expand:

```
src/
├── components/
│   ├── common/              # Generic UI components
│   ├── memory/              # Memory-specific components
│   ├── layout/              # Layout components
│   └── forms/               # Form components
├── hooks/                   # Custom React hooks
├── lib/
│   ├── storage/             # Storage abstraction layer
│   ├── ai/                  # AI provider abstraction
│   └── search/              # Search utilities
├── pages/
├── styles/                  # Theme and style utilities
└── types/

src-tauri/
├── src/
│   ├── commands/            # Tauri commands
│   ├── db/                  # Database operations
│   ├── plugins/             # Custom Tauri plugins
│   └── lib.rs
└── migrations/              # SQLite migrations
```
