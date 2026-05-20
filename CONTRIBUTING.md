# Contributing to Debo

Welcome to Debo. We appreciate your interest in contributing to a local-first memory OS that puts privacy first.

Whether you are fixing a typo, improving documentation, squashing a bug, or building a new feature, every contribution matters.

## What contributions are useful

- Bug fixes and issue reports
- UI/UX improvements
- Documentation improvements
- Performance optimizations
- Accessibility improvements
- Test coverage
- Translation and localization (future)
- Design feedback and suggestions

## Local setup

### Prerequisites

- [Bun](https://bun.sh) (latest)
- [Rust](https://rustup.rs/) (stable)
- [Node.js](https://nodejs.org/) (v18+)
- Tauri CLI dependencies for your OS — see [Tauri prerequisites](https://tauri.app/start/prerequisites/)

### Getting started

```bash
# Clone the repository
git clone https://github.com/debo-life/debo-app.git
cd debo-app

# Install dependencies
bun install

# Run the web dev server
bun run dev

# Run the desktop app
bun run tauri dev

# Run TypeScript checks
bun run typecheck

# Format code
bun run format
```

## Branch naming

Use descriptive branch names:

- `feat/your-feature` — new features
- `fix/your-fix` — bug fixes
- `docs/your-docs` — documentation changes
- `refactor/your-refactor` — code refactoring

## Commit convention

Use conventional commits:

- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation
- `chore:` — maintenance
- `refactor:` — code restructuring
- `test:` — adding or updating tests

Example: `feat: add keyboard shortcuts to capture page`

## Pull request process

1. Fork the repository
2. Create your branch from `main`
3. Make your changes
4. Run `bun run typecheck` to ensure no type errors
5. Run `bun run dev` and test your changes manually
6. Commit with a clear message
7. Push to your fork
8. Open a pull request against `main`
9. Fill in the PR template
10. Wait for review

## Code style

- TypeScript with strict mode
- Prettier for formatting (config in `.prettierrc`)
- Components in `src/components/`
- Pages in `src/pages/`
- Utilities in `src/lib/`
- Types in `src/types/`
- Use functional components with hooks
- Keep components focused and reusable

## UI contribution guidelines

Debo follows a minimal, premium design language:

- Soft dark/light neutral themes
- Clean typography with good spacing
- Rounded cards with subtle borders
- No childish gradients or generic illustrations
- Keyboard-friendly interactions
- Responsive layout for smaller windows

See [docs/DESIGN_PRINCIPLES.md](docs/DESIGN_PRINCIPLES.md) for the full design philosophy.

## Rust / Tauri contribution guidelines

- Keep Tauri commands focused and minimal
- Use proper error handling with `Result<T, String>`
- Document any new Tauri commands
- Test Rust changes with `cargo check` in `src-tauri/`

## Good first contributions

Looking for where to start? Check out [docs/GOOD_FIRST_ISSUES.md](docs/GOOD_FIRST_ISSUES.md) for beginner-friendly tasks.

Some easy wins:
- Improve empty state designs
- Add keyboard shortcut documentation
- Polish dark mode styling
- Add accessibility attributes
- Improve error messages

## Proposing big features

For significant features or architectural changes:

1. Open an issue first using the Feature Request template
2. Describe the problem and proposed solution
3. Wait for maintainer feedback before starting work
4. For very large changes, consider writing an RFC (see [docs/RFC_TEMPLATE.md](docs/RFC_TEMPLATE.md))

## Maintainer review expectations

- Small fixes: reviewed within a few days
- Larger features: may take longer, expect discussion
- We may ask for changes before merging
- Be patient and respectful

## License and contribution terms

By contributing to Debo, you agree that your contributions are submitted under the [Debo Personal Use License v1.0](LICENSE) and may be used, modified, sublicensed, or relicensed by the project maintainers as part of the Debo project.

---

Thank you for contributing to Debo.
