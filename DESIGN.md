# Debo Design System

> Debo is a calm memory OS that makes capturing life feel easy, private, and rewarding.
> It must feel like the debo.life website became a native desktop app.

---

## 1. Product Design Thesis

Debo exists at the intersection of privacy and memory. It is not a productivity app. It is not a note-taking app. It is a quiet space where your thoughts, decisions, and reflections live — on your device, under your control.

The design must communicate:
- **Trust** — this data never leaves your machine
- **Calm** — no noise, no clutter, no anxiety-inducing dashboards
- **Warmth** — subtle encouragement to keep capturing, without gamification overload
- **Premium** — this feels like software built by people who care about craft

The Duolingo-inspired layer exists only as a gentle nudge: progress, streaks, tiny rewards. Never childish. Never cartoon. A slight warmth that makes habit-building feel natural.

---

## 2. Visual Principles

| Principle | Meaning |
|-----------|---------|
| **Private** | Everything stays local. The UI should feel like a private journal, not a cloud dashboard. |
| **Calm** | No aggressive colors, no flashing notifications, no anxiety. |
| **Premium** | Clean typography, generous spacing, considered details. |
| **Soft** | Rounded corners, subtle borders, gentle shadows. |
| **Focused** | One thing at a time. No sidebars competing with content. |
| **Human** | Warm copy, friendly empty states, encouraging microcopy. |
| **Local-first** | Visual cues that reinforce data sovereignty. |
| **Habit-forming** | Subtle progress, streaks, celebrations — but not childish. |

---

## 3. Color System

Inspired by debo.life: dark green-black backgrounds, bright but tasteful green accent, warm off-white text.

### CSS Variables

```css
:root {
  /* Backgrounds */
  --bg: #0a0f0a;
  --bg-soft: #0f150f;
  --surface: #141c14;
  --surface-hover: #1a241a;
  --surface-elevated: #1e2a1e;

  /* Borders */
  --border: #1e2a1e;
  --border-soft: #162016;

  /* Text */
  --text: #e8ede8;
  --text-muted: #8a9a8a;
  --text-soft: #5a6a5a;

  /* Accent — bright green */
  --accent: #22c55e;
  --accent-hover: #16a34a;
  --accent-soft: rgba(34, 197, 94, 0.12);

  /* Semantic */
  --success: #22c55e;
  --warning: #f59e0b;
  --danger: #ef4444;
}
```

### Usage Rules

- **Backgrounds**: Near-black with a subtle green undertone. Never pure black.
- **Surfaces**: Slightly lighter than bg. Cards, panels, sidebar.
- **Text**: Warm off-white (#e8ede8), never pure white.
- **Accent**: Bright green. Use sparingly — active states, CTAs, progress.
- **Borders**: Subtle green-gray. Visible but quiet.
- **Muted text**: Green-gray. For secondary information, dates, metadata.

### What NOT to Do

- No purple-heavy UI
- No neon gradients
- No pure black (#000) backgrounds
- No pure white (#fff) text
- No rainbow accents

---

## 4. Typography

Font stack: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

### Scale

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|-------|------|--------|-------------|----------------|-----|
| Page title | 28px | 700 | 1.2 | -0.7px | Main page headings |
| Section title | 20px | 600 | 1.3 | -0.3px | Section headings |
| Card title | 15px | 600 | 1.4 | 0 | Card headings |
| Body | 14px | 400 | 1.6 | 0 | Default text |
| Muted | 13px | 400 | 1.5 | 0 | Secondary text |
| Editor text | 16px | 400 | 1.7 | 0 | Writing area |
| Caption | 12px | 500 | 1.4 | 0.3px | Labels, badges, metadata |

### Feel

- Large, calm, spacious — like debo.life
- Generous line height for readability
- Tight letter spacing on headings for precision
- No bold body text — only headings and emphasis

---

## 5. Layout Rules

### Sidebar

- Width: 240px
- Background: `var(--bg-soft)` — slightly different from main
- Border-right: 1px solid `var(--border-soft)`
- Feels native and quiet — like a system panel, not a marketing nav
- Compact sections with clear hierarchy

### Main Content

- Max-width: 820px for most pages (centered)
- Full-width only for: Search, Editor (when useful)
- Consistent padding: 32px top, 40px sides
- No random huge empty space
- Cards align cleanly in grids

### Editor

- Centered, max-width ~780px
- Comfortable reading/writing width
- Title area large and prominent
- Minimal toolbar — never cluttered

### Dashboard

- Alive but not cluttered
- Stats in a clean row
- Recent items below
- No chart overload
- One clear primary CTA

---

## 6. Component Rules

### Sidebar

- Brand section: dot + "Debo" text
- Nav items: icon + label, subtle active state (green text + soft green bg)
- Bottom section: status indicators (Local, Private, AI status)
- No big purple pill for active state

### Buttons

| Variant | Use | Style |
|---------|-----|-------|
| Primary | Main CTA | Green bg, white text |
| Secondary | Alternate actions | Surface bg, border |
| Ghost | Tertiary, sidebar | Transparent, text only |
| Danger | Destructive | Red bg (muted), confirmation required |
| Soft | Subtle emphasis | Accent-soft bg, accent text |

- Height: 36px
- Padding: 0 16px
- Border-radius: 8px
- Font: 13.5px, weight 600

### Cards

| Variant | Use | Style |
|---------|-----|-------|
| Default | Standard container | Surface bg, subtle border |
| Elevated | Highlighted content | Surface-elevated bg, shadow |
| Interactive | Clickable items | Hover: surface-hover, cursor pointer |
| Success | Achievement, celebration | Accent-soft bg, accent border |

- Border-radius: 12px
- Padding: 16px 20px
- Border: 1px solid var(--border)

### Badges

| Type | Color |
|------|-------|
| thought | Blue (#3b82f6) |
| task | Amber (#f59e0b) |
| idea | Accent green |
| journal | Rose (#f43f5e) |
| link | Teal (#14b8a6) |
| ai | Purple (#a78bfa) |
| private | Gray (#6b7280) |

- Padding: 2px 8px
- Border-radius: 100px
- Font: 11px, weight 600, uppercase

### Inputs / Textareas

- Background: var(--surface)
- Border: 1px solid var(--border)
- Border-radius: 8px
- Padding: 10px 14px
- Focus: accent border, subtle glow
- Placeholder: var(--text-soft)

### Editor

- Background: transparent (inherits surface)
- Title: 28px, weight 700, no border
- Body: 16px, line-height 1.7
- Toolbar: floating, minimal, icon-only
- Placeholder: "Start writing..."

### Memory Cards

- Show: type badge, title, content preview (2-line clamp), date
- Hover: subtle border-light change
- Delete: icon button, appears on hover

### Task Cards

- Checkbox: custom-styled, accent green when checked
- Strikethrough on completion
- Subtle completion animation (CSS transition)

### Settings Panels

- Section cards with clear headings
- Rows: label left, value/action right
- Danger zone: restrained red, confirmation required
- No settings dump — group logically

### Command Menu

- Centered modal, max-width 560px
- Search input at top
- Results list below
- Keyboard navigation
- Subtle backdrop blur

### Empty States

- Centered, generous padding (60px vertical)
- Icon or illustration (subtle, not cartoon)
- Title: warm, human
- Description: encouraging, specific
- Optional CTA button

### Toasts

- Fixed bottom-right
- Surface bg, border, shadow
- Auto-dismiss: 2.5s
- Variants: success (green), error (red), info (blue)

### Dialogs

- Centered modal
- Backdrop: rgba(0,0,0,0.6) with blur
- Surface bg, border-radius 16px
- Clear title, description, action buttons
- Danger actions require confirmation text

---

## 7. Duolingo-Inspired Habit Layer

> Subtle, premium, warm. Never childish.

### Daily Writing Streak

- Track consecutive days with at least one capture
- Display as a small flame icon + number
- Show in dashboard and sidebar
- Example: "3-day streak"

### Memory Score

- Simple count of total memories
- Display as a stat card
- No complex scoring algorithm

### Today's Progress

- Show captures made today
- Small progress indicator
- Example: "3 captures today"

### Weekly Capture Goal

- Default: 7 captures per week (1/day)
- Progress ring or bar
- Example: "5/7 this week"
- Friendly message when goal met: "You hit your weekly goal."

### Friendly Empty States

- "Start with one line."
- "Your future self will thank you."
- "Nothing here yet. Capture something worth remembering."
- "One thought saved today."

### Tiny Celebrations

- After save: brief green pulse on the memory card
- After first memory: "First memory captured" achievement card
- After 3-day streak: "3-day streak" badge
- After weekly goal: "Weekly goal reached" celebration
- Keep these subtle — a green glow, not confetti

### Achievement Cards (Optional)

- Appear on dashboard when earned
- Dismissible
- Example: "First journal entry", "3-day streak", "10 memories"
- Use accent-soft bg, green icon, short text

### Progress Ring

- SVG circle with stroke-dasharray animation
- Green accent color
- Show percentage or fraction
- Use on dashboard for weekly goal

---

## 8. Page-by-Page UX

### Today (Dashboard)

**Purpose**: Home screen. Show what's happening, encourage daily use.

**Layout**:
1. Hero greeting: "Good to see you again."
2. Subtitle: "Capture what matters. Find it when you need it."
3. Primary CTA card: "Start with one thought." + "New journal" button
4. Stats row: Today's captures, Writing streak, Open tasks, Memories saved
5. Weekly progress card with ring
6. Recent journals (3)
7. Recent memories (3)
8. Open tasks (3)

**Primary action**: New journal

**Empty state**: "Start with one line. Your future self will thank you."

**Microinteractions**: Cards hover softly, progress ring animates on load.

**What not to do**: No chart clutter, no enterprise dashboard, no competing CTAs.

---

### Journals

**Purpose**: Browse and manage journal entries.

**Layout**:
1. Header: "Journals" + subtitle
2. Primary button: "New journal"
3. Search/filter bar
4. Journal cards in a list
5. Empty state

**Primary action**: New journal

**Empty state**: "No journals yet. Start with one thought. Debo will remember it."

**Microinteractions**: Cards lift slightly on hover, search filters instantly.

**What not to do**: No table layout, no complex sorting UI, no folder trees.

---

### Journal Editor

**Purpose**: Write journal entries in a calm, focused environment.

**Layout**:
1. Top bar: Back, Saved status, More menu
2. Centered editor (max-width 780px)
3. Title input (large, prominent)
4. Editor body (rich text or markdown)
5. Metadata: word count, last updated, local badge

**Primary action**: Write

**Empty state**: "Start writing..." or "What should Debo remember?"

**Microinteractions**: Save status pulses when saving, subtle success toast after save.

**What not to do**: No cluttered toolbar, no floating random buttons, no generic rich-text editor look.

---

### Memories

**Purpose**: Browse all captured memories.

**Layout**:
1. Header: "Memory" + subtitle
2. Filter tabs: All, Thoughts, Tasks, Ideas, Links, Journals
3. Memory timeline (reverse chronological)
4. Empty state

**Primary action**: Browse

**Empty state**: "Nothing remembered yet. Capture a journal or memory to begin."

**Microinteractions**: Filter tabs switch smoothly, cards fade in.

**What not to do**: No table layout, no complex search, no competing filters.

---

### Ask Debo

**Purpose**: Query your local memory using AI.

**Layout**:
1. Header: "Ask Debo" + subtitle
2. Large search input
3. Results area
4. Empty state

**Primary action**: Ask a question

**Empty state**: "Ask Debo anything about your saved memories."

**Microinteractions**: Results stream in, thinking indicator.

**What not to do**: No chat bubble UI, no generic AI dashboard, no neon accents.

---

### Tasks

**Purpose**: Manage task-type memories.

**Layout**:
1. Header: "Tasks" + subtitle
2. Filter: All, Open, Completed
3. Task cards with checkboxes
4. Empty state

**Primary action**: Toggle tasks

**Empty state**: "No tasks captured yet. Capture a memory with the Task type."

**Microinteractions**: Checkbox animation, subtle completion celebration.

**What not to do**: No kanban board, no complex task management, no date pickers.

---

### Search

**Purpose**: Find anything in saved memory.

**Layout**:
1. Header: "Search" + subtitle
2. Large search input
3. Results grouped by type
4. Empty states (before search, no results)

**Primary action**: Search

**Empty state (before)**: "Search your local memory."
**Empty state (no results)**: "I couldn't find that in your saved memory."

**Microinteractions**: Results filter as you type, matched text highlighted.

**What not to do**: No complex filters, no search operators, no analytics.

---

### AI Settings

**Purpose**: Configure AI providers and privacy controls.

**Layout**:
1. Header: "AI Settings" + subtitle
2. Tabs: Providers, Models, Privacy, Advanced
3. Provider cards with status
4. Privacy controls (visually prominent)
5. Empty state

**Primary action**: Add provider

**Empty state**: "No AI provider connected yet. Add OpenAI, Anthropic, or Ollama."

**Microinteractions**: Test button shows success/failure, toggle animations.

**What not to do**: No technical jargon wall, no complex configuration, no scary warnings.

---

### Settings

**Purpose**: Manage app settings, storage, and data.

**Layout**:
1. Header: "Settings" + subtitle
2. Sections: General, Storage, Import/Export, Appearance, License, Danger Zone
3. Each section as a card

**Primary action**: Manage data

**Empty state**: N/A (always has content)

**Microinteractions**: Confirm dialogs for destructive actions, toast for actions.

**What not to do**: No settings dump, no complex toggles, no enterprise admin panel.

---

## 9. Motion Rules

### Allowed Motions

| Motion | Use | Implementation |
|--------|-----|----------------|
| Fade in | Page load, card appearance | CSS transition, 200ms ease |
| Card lift | Hover on interactive cards | transform + shadow, 150ms ease |
| Success pulse | After save | Green box-shadow pulse, 300ms |
| Command menu | Open/close | Scale + fade, 200ms ease |
| Save confirmation | Status change | Text fade, 150ms |
| Progress ring | Load animation | stroke-dashoffset, 600ms ease-out |
| Task completion | Checkbox toggle | Scale bounce, 200ms |

### Rules

- Duration: 150ms–300ms for most, 600ms for progress
- Easing: ease or ease-out (never linear)
- No flashy animations
- No bouncing, no rubber-band, no spring
- Subtle only — if you notice the animation, it's too much

---

## 10. Copywriting Tone

Debo should sound: **calm, helpful, private, encouraging, intelligent.**

### Examples

| Context | Copy |
|---------|------|
| After save | "Captured. Debo will remember this." |
| Privacy | "Your memory is private on this device." |
| Daily progress | "One thought saved today." |
| Empty capture | "Start with one line." |
| Empty memory | "Nothing here yet. Your future self will thank you." |
| Streak | "3-day streak. Keep going." |
| Weekly goal | "You hit your weekly goal." |
| First memory | "First memory captured. Welcome to Debo." |
| Export | "Your memories, exported." |
| Clear data | "This will delete all memories. This cannot be undone." |
| AI not configured | "AI not configured. Add a provider to get started." |

### Rules

- Short sentences
- No exclamation marks (except celebrations)
- No corporate jargon
- No "Hey there!" or "Awesome!"
- Warm but not saccharine
- Intelligent but not cold

---

## 11. Redesign Checklist

Every implementation agent must follow this checklist:

### Visual
- [ ] Background uses `var(--bg)` or `var(--bg-soft)` — not random dark colors
- [ ] Surfaces use `var(--surface)` — consistent card backgrounds
- [ ] Text uses `var(--text)` for primary, `var(--text-muted)` for secondary
- [ ] Accent uses `var(--accent)` — green, not purple
- [ ] Borders use `var(--border)` — subtle, not harsh
- [ ] No purple-heavy styling anywhere
- [ ] No neon gradients
- [ ] No generic SaaS look

### Typography
- [ ] Page titles use 28px, weight 700
- [ ] Card titles use 15px, weight 600
- [ ] Body text uses 14px, weight 400
- [ ] Line height is generous (1.5–1.7)
- [ ] Letter spacing is tight on headings

### Layout
- [ ] Sidebar is 240px, quiet, native-feeling
- [ ] Main content max-width is controlled (820px)
- [ ] No random huge empty space
- [ ] Cards align cleanly
- [ ] Consistent padding (32px top, 40px sides)

### Components
- [ ] Buttons use defined variants (primary, secondary, ghost, danger, soft)
- [ ] Cards use defined variants (default, elevated, interactive, success)
- [ ] Badges match type colors
- [ ] Inputs have proper focus states
- [ ] Empty states are warm and human

### Copy
- [ ] Empty states use Debo copy, not generic placeholders
- [ ] Toast messages are specific and warm
- [ ] Button labels are descriptive ("Save memory" not "Save")
- [ ] No exclamation marks in UI text

### Motion
- [ ] Transitions are 150–300ms, ease or ease-out
- [ ] No flashy animations
- [ ] Success states have subtle feedback

### Duolingo Layer
- [ ] Progress/streak visuals are subtle, not childish
- [ ] No cartoon mascots
- [ ] No excessive gamification
- [ ] Warm but premium

### Build
- [ ] `bun run typecheck` passes
- [ ] `bun run build` passes
- [ ] No broken imports
- [ ] No unused files
