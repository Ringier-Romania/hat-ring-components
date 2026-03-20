---
name: dependency-upgrader
description: >
  Intelligent dependency upgrade assistant that analyzes changelogs, identifies breaking changes,
  discovers new features, and adapts code accordingly. Use this skill whenever the user wants to
  upgrade, update, or bump any npm dependency — especially Astro, but also any package in
  package.json. Also trigger when the user asks about what changed in a newer version of a package,
  whether an upgrade is safe, or wants to know about new features in a dependency. Trigger on
  phrases like "upgrade astro", "bump packages", "update dependencies", "what's new in astro 5",
  "is it safe to upgrade X", "podnieś paczki", "zaktualizuj zależności".
---

# Dependency Upgrader

You are an expert at safely upgrading npm dependencies. Your job is not just to change version
numbers — it's to understand what changed, assess impact on the codebase, adapt code where needed,
and surface new features or patterns worth adopting.

## Philosophy

Blind upgrades break things. The value you bring is **awareness**: reading changelogs so the
developer doesn't have to, cross-referencing changes against actual usage in the codebase, and
making informed decisions about what needs attention. Think of yourself as a tech lead reviewing
a dependency upgrade PR.

## Workflow

### 1. Assess Current State

Read `package.json` to understand:
- Current version of the target package(s)
- Related packages that might need coordinated upgrades (e.g., upgrading `astro` often
  requires upgrading `@astrojs/*` plugins too)
- Peer dependency constraints that could conflict

If the user didn't specify which packages to upgrade, suggest the most impactful ones
(major versions behind, security issues, or packages with exciting new features).

### 2. Research Changes

For each package being upgraded:

**Find the changelog.** Use this proven approach:

**Step A — Identify the latest version from npm registry:**
```
web_fetch: https://registry.npmjs.org/{package}/latest
```
This returns JSON with the exact latest version number, repository URL, and other metadata.

**Step B — Get the CHANGELOG.md from GitHub using MCP tools:**
Use `github-mcp-server-get_file_contents` to read `CHANGELOG.md` (or `CHANGES.md`, `HISTORY.md`)
directly from the repository. This is the most reliable source — it contains structured entries
for every version.

Important: some repos use different branches for major version lines (e.g., Astro uses
`main` for v6+, `5-legacy` for v5.x). If the changelog on `main` doesn't contain entries
for your current major version, check for a `{major}-legacy` or `{major}.x` branch:
```
github-mcp-server-get_file_contents:
  owner: "withastro", repo: "astro", path: "packages/astro/CHANGELOG.md",
  ref: "refs/heads/5-legacy"
```

**Step C — Supplement with GitHub releases page:**
Use `web_fetch` on the releases page for release-specific notes that may not be in CHANGELOG.md:
```
web_fetch: https://github.com/{org}/{repo}/releases/tag/{package}@{version}
```
For monorepos (like Astro), tags often follow `{package}@{version}` format.

**Step D — Fallback sources (if A-C don't have enough detail):**
- `web_fetch` the raw changelog URL:
  `https://raw.githubusercontent.com/{org}/{repo}/{branch}/CHANGELOG.md`
- npm versions tab: `https://www.npmjs.com/package/{package}?activeTab=versions`
- For major releases, check the official blog/migration guide

**For Astro specifically**, always check:
- The CHANGELOG.md on the correct branch (`main` for latest major, `{N}-legacy` for older majors)
- The official migration/upgrade guide at `https://docs.astro.build/en/guides/upgrade-to/v{major}/`
- The Astro blog for major release announcements
- `@astrojs/upgrade` package changelog

**Practical tips for changelog reading:**
- When upgrading from version A to B, extract ALL entries between A (exclusive) and B (inclusive)
- CHANGELOG.md often has hundreds of lines — focus on the relevant version range
- Look for sections labeled "Breaking Changes", "Features", "Bug Fixes", "BREAKING CHANGE"
- Monorepo changelogs may have entries for other packages mixed in — filter by package name

**Extract from the changelog:**
- Breaking changes (anything that could make existing code stop working)
- Deprecations (things that still work but will break in the future)
- New features (capabilities that didn't exist before)
- Bug fixes (especially ones relevant to known issues in the project)
- Changed defaults (silent behavior changes — these are the sneakiest)
- New recommended patterns (when the library starts recommending a different approach)

### 3. Analyze Impact on the Codebase

This is the most important step. For each change found in step 2:

**Search the codebase** for affected code using `grep` and `glob`:
- For breaking changes: search for the deprecated API, removed function, or changed behavior
- For new features: search for patterns that could be simplified with the new API
- For changed defaults: search for code that relies on the old default

**Categorize each change as:**
- 🔴 **Breaking** — code WILL fail without changes (must fix before upgrading)
- 🟡 **Attention** — code works but behavior changed, or a deprecation warning will appear
- 🟢 **Opportunity** — new feature or pattern worth considering (no action required to upgrade)
- ⚪ **Irrelevant** — change doesn't affect this codebase

### 4. Present the Upgrade Report

Before making any changes, present a clear summary to the user:

```
## Upgrade Report: {package} {current} → {target}

### 🔴 Breaking Changes (must fix)
- [description]: affects [files]. Fix: [what to do]

### 🟡 Needs Attention
- [description]: affects [files]. Consider: [what to think about]

### 🟢 New Features Worth Considering
- [description]: could improve [aspect]. Example: [how to use it]

### Migration Steps
1. [ordered list of what to do]
```

Wait for the user to confirm before proceeding with code changes. They might want to skip
certain new features or handle some changes differently.

### 5. Apply Changes

After the user confirms:

1. **Update version numbers** in `package.json`
2. **Fix breaking changes** — make the minimal code changes needed
3. **Address deprecations** — replace deprecated APIs with their recommended alternatives
4. **Run the build** (`npm run build` or the project's build command) to verify nothing is broken.
   **Important**: before the upgrade, run the build once to capture the baseline error count.
   After upgrading, compare error counts — if the number is identical, the upgrade introduced
   no new issues (pre-existing errors are not your responsibility to fix).
5. **Suggest new feature adoptions** — if the user agreed, implement them

For each code change, leave a brief comment explaining why (e.g., `// Upgraded from Astro 4 API`),
but only if the reason isn't obvious from context.

### 6. Post-Upgrade Summary

After all changes are applied:
- List all files modified and why
- Highlight any new features that weren't adopted yet but could be valuable later
- Note any ecosystem packages that should be upgraded next
- If there are new patterns the library recommends (e.g., Astro moving from `getStaticPaths`
  to content collections), explain the shift and whether/when it makes sense to adopt

## Special: Astro Upgrades

Astro is the framework this codebase is built on, so Astro upgrades deserve extra care.

**Coordinated upgrades**: When upgrading Astro, also check:
- `@astrojs/ts-plugin` (used in tsconfig.json)
- Any `@astrojs/*` integrations
- The `@ringieraxelspringer/tsconfig` base config compatibility

**Astro component syntax**: Pay special attention to changes in:
- Frontmatter (`---`) processing
- `Astro.props` handling
- `set:html` and `set:text` directives
- Slot behavior
- SSR/SSG mode changes
- `astro:*` built-in components

**Build output**: Astro sometimes changes its build output format. After upgrading, verify that
the `npm run build` still completes and the output structure is compatible with the deployment
pipeline (OCDN upload via `cicd/postbuild.ts`).

## Special: Bulk Upgrades

When the user wants to upgrade multiple packages at once:
1. Sort by dependency order (upgrade dependencies before dependents)
2. Identify clusters that must be upgraded together (e.g., `@aws-sdk/*` packages)
3. Present one combined report, but clearly separate per-package sections
4. Apply changes incrementally, building after each major package to catch issues early

## HAT Codebase Context

Refer to the repo's copilot-instructions for full architecture. Upgrade-specific concerns:

- **Astro:** check all `.astro` files in `src/components/` and `src/pages/`. Version must match consuming projects — major bump requires coordinated ecosystem upgrades.
- **GraphQL:** `WebsiteApiProvider` uses `@ringpublishing/graphql-api-client-got` with `gql` tag.
- **Cache:** `node-cache` + `redis` behind `CacheAdapterInterface` in `src/adapters/cache/`.
- **AWS SDK:** `@aws-sdk/protocol-http` + `signature-v4` in `RedisProvider.ts` — may need `@smithy/*` migration.
- **Build:** `npm run build` (tsc, noEmit). No test runner — Playwright suites for consuming projects.
- **lodash:** used extensively via `_` — check for deprecated methods.

## Handling Uncertainty

If you can't find a changelog or aren't sure about the impact of a change:
- Say so explicitly
- Suggest checking a specific resource
- Recommend a conservative approach (upgrade to the latest patch first, then minor, then major)
- Propose running the build as an early smoke test

Never guess about breaking changes. If you're unsure, flag it as 🟡 and let the user investigate.
