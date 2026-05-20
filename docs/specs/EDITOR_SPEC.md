# Debo Editor Specification

## Why PlateJS

PlateJS was chosen over alternatives for the journal editor:

| Option | Verdict |
|--------|---------|
| **Textarea** | No rich text. Users expect formatting. Rejected. |
| **TipTap** | Good but heavier, ProseMirror-based. Plate uses Slate which aligns better with React. |
| **Lexical** | Meta's editor. Powerful but complex API, less React-native, fewer community plugins. |
| **Raw Slate** | Too low-level. Plate provides the plugin architecture and React components on top of Slate. |
| **PlateJS** | Slate-based, React-native, plugin system, active maintenance. Selected. |

PlateJS gives us a rich text editor with minimal custom code. The plugin architecture means we add only what we need.

## Editor Features (v0.1.0)

### Block Types

| Feature | Plugin | Shortcut |
|---------|--------|----------|
| Paragraph | Default | Enter |
| Heading 1 | `H1Plugin` | Toolbar |
| Heading 2 | `H2Plugin` | Toolbar |
| Heading 3 | `H3Plugin` | Toolbar |
| Blockquote | `BlockquotePlugin` | Toolbar |
| Bullet list | `BulletedListPlugin` | Toolbar |
| Numbered list | `NumberedListPlugin` | Toolbar |

### Inline Marks

| Mark | Plugin | Shortcut |
|------|--------|----------|
| Bold | `BoldPlugin` | Cmd+B |
| Italic | `ItalicPlugin` | Cmd+I |
| Underline | `UnderlinePlugin` | Cmd+U |
| Link | `LinkPlugin` | Toolbar |

### Toolbar

The editor toolbar sits above the writing area and provides buttons for:

- H1, H2, H3 (block type toggles)
- Bold, Italic, Underline (mark toggles)
- Blockquote
- Bullet list, Numbered list

The toolbar uses ghost buttons with hover highlights. Active states are visually indicated.

## Content Storage Format

Journal content is stored as a **PlateJS Value** — an array of Slate JSON nodes:

```json
[
  {
    "type": "h1",
    "children": [{ "text": "My Journal Entry" }]
  },
  {
    "type": "p",
    "children": [
      { "text": "Today I " },
      { "text": "learned", "bold": true },
      { "text": " something new." }
    ]
  },
  {
    "type": "blockquote",
    "children": [{ "text": "A good insight." }]
  }
]
```

This JSON is stored in `localStorage` as part of the `JournalEntry.content` field.

Additionally, the editor produces:
- `plainText` — extracted text content for search indexing
- `excerpt` — first 150 characters of plain text for list display
- `wordCount` — word count from plain text

## Auto-Save Behavior

Debo uses debounced auto-save to avoid excessive writes:

| Trigger | Delay | Behavior |
|---------|-------|----------|
| Content change | 1000ms | Saves editor value, plain text, excerpt, word count |
| Title change | 800ms | Saves title only |
| Cmd+S | Immediate | Manual save with "Saving..." feedback |

Save status is displayed in the editor top bar:
- **Saved** (green) — all changes persisted
- **Saving** (amber) — write in progress
- **Unsaved** (grey) — pending changes not yet saved

The save timer resets on every keystroke. Only the last change in a burst of typing triggers a write.

## Editor Layout

```
┌──────────────────────────────────────────┐
│ ← Back   Journals   Saved   ···         │  ← Top bar
├──────────────────────────────────────────┤
│                                          │
│ [Title input — large, no border]         │
│                                          │
│ ┌──────────────────────────────────────┐ │
│ │ H1 H2 H3 │ B I U │ " • 1.           │ │  ← Toolbar
│ └──────────────────────────────────────┘ │
│                                          │
│ [Rich text editor area — 760px max]      │
│                                          │
│ Start writing...                         │  ← Placeholder
│                                          │
├──────────────────────────────────────────┤
│ 42 words · Created May 20, 2026          │  ← Meta bar
└──────────────────────────────────────────┘
```

- Editor max-width: 760px for comfortable reading
- Min-height: 400px for ample writing space
- Font-size: 16px with 1.75 line-height

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Cmd+B | Toggle bold |
| Cmd+I | Toggle italic |
| Cmd+U | Toggle underline |
| Cmd+S | Manual save |
| Escape | Close menus/modals |

## Future AI Editor Actions

Planned for Phase 3+:

| Action | Description |
|--------|-------------|
| **Summarize** | Generate a summary of the current journal entry |
| **Extract memories** | Pull out tasks, ideas, and key thoughts into the memory system |
| **Improve writing** | Suggest grammar and clarity improvements |
| **Continue writing** | AI-assisted writing continuation |
| **Tag suggestion** | Auto-suggest tags based on content |

These will be triggered from the editor toolbar or command menu. The editor architecture (PlateJS plugins) supports adding custom toolbar buttons and inline actions without modifying core editor logic.
