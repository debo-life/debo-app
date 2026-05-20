# ADR-0001: Use PlateJS for Rich Text Editor

## Status

Accepted

## Context

Debo needs a rich text editor for journal entries. The initial v0.0.1 used a plain textarea, which was insufficient for a journaling app. We needed an editor that supports:

- Paragraphs, headings (H1-H3)
- Bold, italic, underline
- Bullet lists, numbered lists
- Blockquotes
- Links
- Keyboard shortcuts
- Programmatic access to content for auto-save and search indexing

## Alternatives Considered

### Plain Textarea

- **Pros**: Zero dependencies, fast, simple
- **Cons**: No formatting, no structure, poor writing experience for a journal app
- **Verdict**: Rejected — formatting is core to journaling

### TipTap

- **Pros**: Mature, excellent docs, modular plugin system, ProseMirror-based
- **Cons**: Pro license for some features, ProseMirror is heavier than Slate, larger bundle
- **Verdict**: Strong contender but PlateJS chosen for Slate familiarity

### Lexical (Meta)

- **Pros**: Modern, performant, backed by Meta, used in Facebook
- **Cons**: Younger ecosystem, less community content, API is more verbose, fewer ready-made plugins
- **Verdict**: Rejected — ecosystem maturity gap

### Raw Slate

- **Pros**: Full control, no abstraction overhead
- **Cons**: Requires building everything from scratch — toolbar, mark handling, block transforms, serialization
- **Verdict**: Rejected — too much custom code for v0.1.0 scope

### PlateJS

- **Pros**: Built on Slate, rich plugin ecosystem, React-native, excellent TypeScript support, active maintenance (v49+), shadcn/ui-inspired component approach, ready-made plugins for all needed features
- **Cons**: Adds ~700KB to bundle, plugin API has a learning curve, some plugins have opinionated behavior
- **Verdict**: **Selected**

## Decision

Use PlateJS v49 as the rich text editor framework.

## Rationale

1. **Slate-based**: Slate is a proven editor framework. PlateJS adds a structured plugin layer on top without replacing the core.
2. **Plugin system**: Headings, marks, lists, blockquote, and links are available as individual plugins with minimal configuration.
3. **React-native**: Uses React hooks (`usePlateEditor`) and components (`Plate`, `PlateContent`), fitting naturally into the existing React app.
4. **TypeScript**: Full type support for editor value, plugin configuration, and content manipulation.
5. **Active maintenance**: Regularly updated (v49+ as of May 2026), responsive maintainers.
6. **Content as JSON**: Plate stores content as Slate node arrays (JSON), which is easy to serialize, store, and rehydrate.

## Consequences

- Bundle size increases by ~700KB (acceptable for a desktop app)
- Team needs to learn Plate's plugin API and content model
- Future AI features can hook into the editor via Plate's plugin system (e.g., inline suggestions, content transforms)
- Content stored as JSON enables future features like collaborative editing, version history, and markdown export
