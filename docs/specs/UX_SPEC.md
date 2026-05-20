# Debo — UX Specification

## Navigation Model

Debo uses a fixed left sidebar (240px) for primary navigation. The main content area scrolls independently.

### Sidebar Structure

```
[Brand: Debo dot + "Debo"]

[Today]        — Home / daily overview
[Journals]     — All journal entries
[Capture]      — Quick memory capture
[Memories]     — All captured memories
[Tasks]        — Task-type memories
[Search]       — Full-text search

───────────────
[+ New journal] — Primary CTA

[Settings]     — Data management
[Local · Private] — Status indicator
```

Active page is indicated by a subtle left border accent and brighter text/icon color. No heavy purple pills or neon highlights.

## Page-by-Page UX

### Today (Dashboard)

**Purpose**: Daily home screen. Entry point.

**Content**:
- Greeting: "Good to see you again."
- Subtitle: "Capture what matters. Find it when you need it."
- 4 stat cards: Total Memories, Today's Captures, Open Tasks, Completed Tasks
- "Capture a memory" CTA button
- 5 most recent memories in compact card view

**Empty state** (no memories):
- Book icon
- "No memories yet"
- "Capture your first thought to get started."
- "Capture a memory" button

### Journals

**Purpose**: List all journal entries.

**Content**:
- Header: "Journals"
- Search input
- Journal cards with: title, excerpt, relative date, word count

**Interactions**:
- Click card → open Journal Detail
- Hover → reveal context menu (⋮)
- Context menu: Duplicate, Delete
- Sort: newest updated first

**Empty state**: "No journals yet. Start with one thought."

### Journal Detail

**Purpose**: Rich text writing experience.

**Layout**:
- Top bar: Back button, save status (Saved/Saving.../Unsaved), updated time, ⋮ menu
- Title input (large, 28px, bold)
- PlateJS rich text editor with toolbar
- Toolbar: H1, H2, H3, Bold, Italic, Underline, Quote, Bullet List, Numbered List
- Meta bar: word count, created date

**Behaviors**:
- Auto-save with 1s debounce on content change
- Auto-save with 800ms debounce on title change
- Cmd+S triggers immediate save
- Save status indicator updates in real-time

**Toolbar actions**:
| Action | Shortcut | Toolbar |
|--------|----------|---------|
| Bold | Cmd+B | B |
| Italic | Cmd+I | I |
| Underline | Cmd+U | U |
| Heading 1 | — | H1 |
| Heading 2 | — | H2 |
| Heading 3 | — | H3 |
| Blockquote | — | " |
| Bullet list | — | • |
| Numbered list | — | 1. |

### Capture

**Purpose**: Quick memory capture without leaving the main flow.

**Content**:
- Title input
- Content textarea (large, comfortable)
- Type selector: 5 pills (Thought, Task, Idea, Link, Journal)
- Save button (Cmd+Enter shortcut)

**Behaviors**:
- Clears form on successful save
- Shows success toast
- Auto-focuses title input

### Memories

**Purpose**: Browse all captured memories.

**Content**:
- Header: "Memories"
- Search input
- Type filter pills: All, Thought, Task, Idea, Link, Journal
- Memory cards with: type badge, title, content preview, relative date

**Interactions**:
- Hover → reveal action buttons (delete, toggle-complete for tasks)
- Toggle complete → checkbox fills, title gets strikethrough

**Empty state**: "No memories found. Capture your first thought to get started."

### Tasks

**Purpose**: Focused task management view.

**Content**:
- Header: "Tasks"
- Open/completed count
- Filter tabs: All, Open, Completed
- Task cards with checkbox, title, content preview

**Behaviors**:
- Click checkbox → toggle completion
- Completed tasks show strikethrough title and muted color

**Empty state**: "No tasks captured yet. Capture a memory with the Task type to track it here."

### Search

**Purpose**: Full-text search across all content.

**Content**:
- Header: "Search"
- Large search input with icon
- Results grouped by: Journals, Memories

**Behaviors**:
- Real-time filtering as user types
- Searches title, content, and type fields
- Click journal result → open Journal Detail

**Empty states**:
- No query: "Search your local memory"
- No results: "No results found. Try different keywords."

### Settings

**Purpose**: Data management and app info.

**Content**:
- About section: app name, version (v0.1.0), memory count, journal count
- Storage section: location (localStorage), export JSON, import JSON, clear all data
- License section: "Source-available. Free for personal, non-commercial use."

**Behaviors**:
- Export → downloads JSON file
- Import → file picker, validates and merges, shows count of imported items
- Clear → confirmation toggle, then wipe and refresh

## Empty States

Every list page has a consistent empty state pattern:
- Icon (48px, muted color)
- Title (bold, secondary text)
- Description (muted text)
- Optional CTA button

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Cmd+K | Open command menu |
| Cmd+N | New journal |
| Cmd+S | Save current journal |
| Cmd+Enter | Save memory (Capture page) |
| Escape | Close command menu / dropdowns |

## Writing Flow

```
New journal (sidebar or Cmd+N)
  → Journal Detail opens with blank title and editor
  → User types title
  → User writes in rich text editor
  → Auto-save triggers after 1s of inactivity
  → Save status shows "Saved"
  → User clicks Back or navigates away
  → Returns to Journals list with new entry at top
```

## Search Flow

```
User navigates to Search (sidebar or Cmd+K → "Go to Search")
  → Large search input focused
  → User types query
  → Results filter in real-time
  → Results grouped: "Journals (3)" then "Memories (5)"
  → Each result shows title, excerpt, date
  → Click journal → opens Journal Detail
```

## Command Menu

Triggered by Cmd+K. Shows a searchable list of actions:

- New journal
- Go to Today
- Go to Journals
- Go to Memories
- Go to Search
- Go to Settings

Fuzzy-matched by label. Selected action executes immediately.
