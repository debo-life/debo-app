# Debo UI System

The visual design system for Debo desktop. All values derive from `src/index.css`.

## Colors

### Backgrounds (Dark Theme)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#0a0f0a` | App background, main content area |
| `--bg-secondary` | `#0f150f` | Sidebar, cards, elevated surfaces |
| `--bg-tertiary` | `#141c14` | Inputs, editor toolbar, nested cards |
| `--bg-hover` | `#1a241a` | Hover states on interactive elements |
| `--bg-active` | `#1e2a1e` | Active/pressed states |

The dark theme uses a green-black base inspired by debo.life — not pure black, not grey, not purple.

### Backgrounds (Light Theme)

| Token | Value |
|-------|-------|
| `--bg-primary` | `#f8faf8` |
| `--bg-secondary` | `#f0f4f0` |
| `--bg-tertiary` | `#e8ede8` |

Activated via `@media (prefers-color-scheme: light)`.

### Borders

| Token | Value | Usage |
|-------|-------|-------|
| `--border` | `#1e2a1e` | Default card and section borders |
| `--border-light` | `#263226` | Hover borders, dividers, focus rings |

Borders are always subtle. They define space, not draw attention.

### Text

| Token | Value | Usage |
|-------|-------|-------|
| `--text-primary` | `#e8ede8` | Headings, body text, active labels |
| `--text-secondary` | `#8a9a8a` | Descriptions, secondary info |
| `--text-tertiary` | `#5a6a5a` | Meta text, timestamps, placeholders |

Text uses a warm off-white — never pure `#fff`, never cold blue-grey.

### Accent

| Token | Value | Usage |
|-------|-------|-------|
| `--accent` | `#22c55e` | Primary buttons, links, active indicators |
| `--accent-hover` | `#16a34a` | Hover state for accent elements |
| `--accent-muted` | `rgba(34, 197, 94, 0.12)` | Subtle accent backgrounds |

Green is the brand color. Used sparingly — never as a background fill for large areas.

### Semantic

| Token | Value | Usage |
|-------|-------|-------|
| `--danger` | `#ef4444` | Delete actions, errors |
| `--success` | `#22c55e` | Saved state, completion |
| `--warning` | `#f59e0b` | Saving in progress, caution |
| `--info` | `#3b82f6` | Informational badges |

## Typography

- **Font stack**: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- **Page titles**: 24–28px, weight 700, letter-spacing -0.5px
- **Section headings**: 15px, weight 600
- **Body text**: 14px, weight 400, line-height 1.5
- **Meta text**: 12px, weight 400, color `--text-tertiary`
- **Editor text**: 16px, line-height 1.75

## Spacing

Debo uses an 8px grid:

| Token | Value | Usage |
|-------|-------|-------|
| Sidebar width | 240px | Fixed left sidebar |
| Content padding | 40px vertical, 48px horizontal | Main content area |
| Card padding | 18–20px | Cards and sections |
| Section gap | 24–32px | Between page sections |
| Element gap | 8–12px | Between related elements |

## Radii

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 6px | Buttons, badges, small elements |
| `--radius-md` | 8px | Inputs, cards, toolbar buttons |
| `--radius-lg` | 12px | Large cards, modals, panels |

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.3)` | Subtle elevation |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.3)` | Dropdowns, popovers |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.4)` | Modals, toast notifications |

## Transitions

Default: `150ms ease`. Applied to hover states, focus rings, and color changes.

## Component Rules

### Buttons

- **Primary**: Solid accent background, dark text. Used for the main action on a page.
- **Secondary**: Transparent with border. Used for secondary actions.
- **Danger**: Muted red background. Used for destructive actions only.
- **Ghost**: No background, no border. Used for toolbar and inline actions.

### Cards

- Background: `--bg-tertiary`
- Border: `1px solid --border`
- Radius: `--radius-lg`
- Hover: border lightens to `--border-light`

### Badges

- Pill-shaped (fully rounded)
- Type-specific colors: thought (blue), task (amber), idea (grey), link (green), journal (red)
- Always lowercase

### Inputs

- Background: `--bg-tertiary`
- Border: `1px solid --border`
- Focus: border lightens + subtle ring
- Placeholder: `--text-tertiary`

## What Not To Do

- No purple accent or purple-heavy themes
- No random gradients or glassmorphism
- No neon buttons or glowing effects
- No empty black screens with tiny centered content
- No generic AI dashboard aesthetics
- No childish illustrations or robot mascots
- No decorative animations that slow the user down
- No engagement tricks or dark patterns
- No pure white text on pure black backgrounds

## References

Debo's visual feel draws from:

- **Linear** — clean, fast, opinionated UI
- **Raycast** — premium keyboard-first design
- **Notion** — organized, flexible, calm
- **Superhuman** — polished, fast, focused
- **Apple Notes** — simple, trustworthy, readable
- **Arc** — modern, minimal, intentional
