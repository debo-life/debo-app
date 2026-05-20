# Release Process

This document describes how Debo releases are created and published.

## Versioning

Debo follows [Semantic Versioning](https://semver.org/):

- **Major** (X.0.0) — Breaking changes, major feature milestones
- **Minor** (0.X.0) — New features, non-breaking changes
- **Patch** (0.0.X) — Bug fixes, minor improvements

Current phase: **v0.x.x** — Pre-release, rapid iteration

## Release Steps

### 1. Update CHANGELOG.md

Add a new section at the top of `CHANGELOG.md` with the version number and date. List all notable changes grouped by category:

- Added
- Changed
- Fixed
- Removed

### 2. Update version numbers

Update the version in:

- `package.json`
- `src-tauri/tauri.conf.json`
- `src-tauri/Cargo.toml`

### 3. Create a git tag

```bash
git tag -a v0.1.0 -m "Release v0.1.0"
git push origin v0.1.0
```

### 4. Create a GitHub Release

- Go to the Releases page on GitHub
- Create a new release from the tag
- Copy the changelog entry as the release description
- Attach built binaries (future: automated via CI)

### 5. Build and distribute (future)

When Tauri auto-update is configured:

- Build for macOS, Windows, Linux
- Sign the binaries
- Upload to GitHub Releases
- Update the auto-update manifest

## CI/CD (Future)

Automated release pipeline:

1. Push a version tag
2. CI builds for all platforms
3. Binaries are signed and notarized
4. GitHub Release is created automatically
5. Auto-update manifest is published

## Pre-releases

For testing releases before they go stable:

- Use pre-release tags: `v0.2.0-beta.1`
- Mark the GitHub Release as a pre-release
- Do not publish auto-update manifests for pre-releases

## Hotfixes

For critical bug fixes in production:

1. Create a branch from the release tag
2. Apply the fix
3. Bump the patch version
4. Follow the normal release process
5. Merge the fix back to `main`
