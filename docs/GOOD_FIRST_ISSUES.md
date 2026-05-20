# Good First Issues

These are beginner-friendly tasks for new contributors. Each one is scoped to be achievable in a few hours.

---

## 1. Improve empty states

**Difficulty:** Easy  
**Files:** `src/pages/Memory.tsx`, `src/pages/Search.tsx`, `src/pages/Tasks.tsx`

Add better empty state illustrations or SVG icons when there are no memories, no search results, or no tasks.

**Acceptance criteria:**
- Each empty state has a unique, relevant icon
- Text is helpful and guides the user to take action
- Styling matches the design system

---

## 2. Add app icon placeholder

**Difficulty:** Easy  
**Files:** `src-tauri/icons/`

Replace the default Tauri icons with a simple Debo-branded placeholder.

**Acceptance criteria:**
- Icons are the correct sizes for each platform
- The app icon appears in the dock/taskbar
- macOS, Windows, and Linux icon formats are included

---

## 3. Add keyboard shortcuts documentation

**Difficulty:** Easy  
**Files:** `docs/KEYBOARD_SHORTCUTS.md`

Document all current keyboard shortcuts (like Cmd+Enter to save) and suggest new ones.

**Acceptance criteria:**
- All existing shortcuts are documented
- Format is clear and scannable
- Suggestions for new shortcuts are marked separately

---

## 4. Polish dark mode styling

**Difficulty:** Easy  
**Files:** `src/index.css`

Review and improve the dark mode color palette. Ensure contrast ratios meet accessibility standards.

**Acceptance criteria:**
- All text meets WCAG AA contrast requirements
- Borders and backgrounds are distinct
- Hover and focus states are visible

---

## 5. Add memory card component variants

**Difficulty:** Easy  
**Files:** `src/components/MemoryCard.tsx`

Create visual variants of the MemoryCard for different types (task, idea, link, etc.) with subtle styling differences.

**Acceptance criteria:**
- Each type has a distinct visual indicator
- Links show a preview or favicon (if possible)
- Tasks show completion state

---

## 6. Add localStorage helper improvements

**Difficulty:** Easy  
**Files:** `src/lib/storage.ts`

Add error handling for localStorage quota exceeded, corrupted data, and JSON parse failures.

**Acceptance criteria:**
- Graceful fallback when localStorage is full
- Handles corrupted JSON without crashing
- Returns sensible defaults on error

---

## 7. Add settings screen improvements

**Difficulty:** Easy  
**Files:** `src/pages/Settings.tsx`

Add memory count, storage usage estimate, and a "What's new" section.

**Acceptance criteria:**
- Shows total number of memories
- Estimates localStorage usage in KB/MB
- What's new section links to CHANGELOG

---

## 8. Add export to JSON

**Difficulty:** Medium  
**Files:** `src/lib/storage.ts`, `src/pages/Settings.tsx`

Allow users to export all memories as a JSON file download.

**Acceptance criteria:**
- Button in Settings triggers JSON download
- File contains all memories with metadata
- Filename includes the export date

---

## 9. Add import from JSON

**Difficulty:** Medium  
**Files:** `src/lib/storage.ts`, `src/pages/Settings.tsx`

Allow users to import memories from a previously exported JSON file.

**Acceptance criteria:**
- File picker accepts .json files
- Imported memories are merged with existing ones
- Duplicate detection prevents re-importing the same memories

---

## 10. Add search result highlighting

**Difficulty:** Medium  
**Files:** `src/pages/Search.tsx`, `src/components/MemoryCard.tsx`

Highlight the matching text in search results so users can see why a result matched.

**Acceptance criteria:**
- Matching text is visually highlighted
- Works for title, content, and type matches
- Highlight color works in both light and dark mode

---

## 11. Add task filter options

**Difficulty:** Medium  
**Files:** `src/pages/Tasks.tsx`

Add filter tabs: All, Pending, Completed.

**Acceptance criteria:**
- Three filter tabs above the task list
- Default view is "Pending"
- Counts shown on each tab

---

## 12. Add README screenshot

**Difficulty:** Easy  
**Files:** `README.md`, `docs/screenshots/`

Take a screenshot of the running app and add it to the README.

**Acceptance criteria:**
- Screenshot shows the app in a realistic state
- Added to README in the screenshot placeholder section
- Both dark and light mode screenshots if possible

---

## 13. Add architecture diagram

**Difficulty:** Medium  
**Files:** `docs/ARCHITECTURE.md`

Create a simple ASCII or Mermaid diagram showing the app's architecture (frontend, Tauri, Rust, storage).

**Acceptance criteria:**
- Shows data flow between components
- Includes current architecture
- Shows planned future architecture
- Uses Mermaid or ASCII art

---

## 14. Add onboarding screen

**Difficulty:** Medium  
**Files:** `src/pages/Onboarding.tsx`, `src/App.tsx`

Show a simple welcome screen on first launch with a brief introduction to Debo.

**Acceptance criteria:**
- Only shown when there are no memories saved
- Introduces what Debo is and how to capture
- Has a "Get started" button that navigates to Capture
- Does not show again after the first memory is saved

---

## 15. Add accessibility improvements

**Difficulty:** Medium  
**Files:** Multiple

Audit the app for accessibility issues and fix them:

- Add proper `aria-label` attributes
- Ensure all interactive elements are keyboard-focusable
- Add `role` attributes where needed
- Ensure proper heading hierarchy
- Add `alt` text to any images

**Acceptance criteria:**
- All buttons have accessible labels
- Tab order is logical
- Screen reader can navigate the app
- Form inputs have associated labels
