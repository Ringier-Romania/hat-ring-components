# Copilot Instructions — hat-ring-components

## Overview

This is the **shared component library** for the HAT (Headless Application Template) ecosystem by RING Publishing. Consumed as a dependency by HAT Boilerplate projects — **not a standalone application**. Provides Astro/React widgets, GraphQL data-fetching providers, multi-layer caching, SEO utilities, helpers, Playwright test suites, and Website Manager config schemas.

The HAT ecosystem: **hat-ring-components** (this repo), **hat-server** (custom Astro server), **hat-boilerplate** (project skeleton), **hat-cli** (setup & profile management). Requires **Node.js v22+**. No lint or test runner in this repo.

## Architecture

### Grid System

Pages use a **12-column CSS grid** configured through the Websites Manager. Each page type (Home, Story, List, Topic, Author, Search) has a grid with **Containers**, each containing five widget areas (**boxes**): `box_top`, `box_left`, `box_middle`, `box_right`, `box_bottom`. Empty/hidden boxes don't render. On mobile (<768px), columns stack at 100% width. Grid configs: `src/components/Grid/`.

### Component Model

Components live in `src/components/` — primarily **Astro** (`.astro`), some React (`.tsx`). Every component receives `context` (`AppContext`) and `widgetConfig` props. **Renderless components** in `src/renderlessComponents/` return data instead of HTML (mainly SEO generators).

Widgets follow a consistent structure under `src/components/widgets/{category}/{WidgetName}/`:
`WidgetName.astro`, `WidgetNameGetData.ts`, `WidgetNameWebsitesConfig.ts`, `types.ts`

**Adding/modifying widgets** → use `widget-developer` skill for full workflow and templates. Extensible widgets (BasicWidget, GenericList, StoryContent, Slider) support custom item parts via `getFragment` functions.

### Data Flow

1. **HAT Server** — entry point. Queries Websites API for routing, detects device type, passes `HatControllerParams` to Astro. Uses `CacheProvider` with key `{domain}{pathname}{variant}`.
2. **WebsiteApiProvider** (`src/providers/WebsiteApiProvider.ts`) — wraps GraphQL calls with **stale-while-revalidate** caching, deduplicates in-flight requests. Widgets call `WebsiteApiProvider.call(query, variables, cacheTtl)`.
3. **CacheProvider / CacheHelper** — multi-layer caching via `CacheAdapterInterface`: Node-cache (default), Redis (`USE_REDIS=1`), and in-memory config cache.
4. **ConfigHelper** — fetches CMS config (general, SEO, translations, dev settings) via GraphQL with typed accessors.
5. **MonitoringProvider** — optional metrics facade injected via `global['monitoringProvider']`.

### WebsitesConfig System

Each widget exports a `*WebsitesConfig` object (aggregated in `src/websitesApiConfigs.ts`) declaring `modules` (with `defaultParams` and `paramsDescription`) and `sections` (grid placement). Field types: `textfield`, `checkbox`, `select`, `array`, `number`. Configs extend abstract types from `src/types/abstracts.ts` and are exported separately from components to avoid pulling in component code during config merging.

### Reusable Test Suites

`src/tests/suites/` exports Playwright test functions (SEO, performance, social media) that consuming projects call with their own `page` and `playwrightTest` instances. Shared test utilities in `src/helpers/TestsHelper.ts`.

### Deployment

Consuming projects deploy via `cicd/postbuild.ts`: extracts version from changelog, optionally creates Website Manager config versions, and uploads built files to OCDN.

## Development Workflow

### Build Commands

This is a **library**, not an application — there is no `npm run dev` or local server.

- `npm run build` — TypeScript type-check (`tsc --jsx react-jsx`, `noEmit`), no output files
- `npm run run` — watch mode for continuous type-checking
- `npm run build:tests` / `npm run run:tests` — type-check test suites (`tsconfig.tests.json`)

### Verifying Changes

1. Run `npm run build` to type-check — primary validation step
2. Test in a consuming project by pointing its dependency to local path (e.g., `"hat-ring-components": "file:../hat-ring-components"`)
3. No test runner here — tests are Playwright suites exported for consuming projects

### TypeScript Patterns

- TSConfig uses `"jsx": "react"` but build overrides with `--jsx react-jsx`
- **Strict mode is NOT enabled** — `noImplicitAny`, `noImplicitReturns`, `noImplicitThis` are `false`
- Astro components use `Astro.props as { context: AppContext; widgetConfig: Type }` type assertions

## Key Conventions

### Naming

- **Exported functions**: `ModuleName_functionName` (e.g., `CacheHelper_set`, `ConfigHelper_getGeneralConfig`). Always follow this.
- **Classes**: PascalCase with `Provider` or `Adapter` suffix.
- **Component CSS class**: must match component name in PascalCase. Convert API formats (e.g., `embedded_application` → `EmbeddedApplication`).
- **Property names**: camelCase. **WebsitesConfig module keys**: `widgetName_wdg`.

### Styling

- **CSS Modules** (SCSS) in `styles/`, imported as `import styles from ".../*.module.scss"`
- Style only **functional layout** (e.g., column count) — no padding, colors, or fonts unless required
- Wrap child styles in `:global { }` inside modules. Components accept `cssModuleClass` for external styling.

### AppContext

`AppContext` (`src/types/types.ts`) is threaded through **all** components. Every component must accept and pass it to children. The `customData` property is globally visible but **components at the same DOM level render asynchronously** — be aware of non-deterministic mutation order.

### Central Types

- `AppContext` — primary context: `siteContentType`, `id`, `url`, `customData`, `hatControllerParams`, `cssModules`, `domain`
- `SiteContentType` — `Homepage`, `Story`, `SiteNode`, `Author`, `Topic`, `Search`, `CustomAction`, `Source`, `Error404`
- `HatControllerParams` — `gqlResponse`, `customData`, `urlWithParsedQuery`, `isMobile`, `domain`, `ringDataLayer`
- `AbstractWidgetConfig`, `CacheAdapterInterface` (`src/adapters/cache/types.ts`)

### Environment Variables

Key categories (check code for full details and defaults):

- **Websites API:** `WEBSITE_API_PUBLIC`, `WEBSITE_API_SECRET`, `WEBSITE_API_NAMESPACE_ID`, `NEXT_PUBLIC_WEBSITE_DOMAIN`, `NEXT_PUBLIC_WEBSITE_API_VARIANT`
- **Cache:** `CACHE_TTL`, `CACHE_TTL_CONFIG`, `MEM_CACHE_FOR_CONFIG_MODE` (`request` | `time` | `none`)
- **Redis:** `USE_REDIS` (set to `1` to enable), `REDIS_RW`
- **Runtime:** `NODE_ENV`, `PORT`

### Global State

Several values stored on `global` (declared in `declaration.d.ts`): `HATcache`, `HATCacheInCallInProgress`, `websitesApiGotClient`, `monitoringProvider`. Review these before modifying caching or API client code.

### Astro Version Compatibility

Astro versions must match between the consuming project and this repo. Mismatches cause incompatibilities.

## Working with Copilot in This Repo

### Recommended Skills

- **`dependency-upgrader`** — for upgrading npm dependencies (Astro, AWS SDK, etc.). Analyzes changelogs, identifies breaking changes, and adapts code.
- **`widget-developer`** — for creating or modifying widgets, WebsitesConfig schemas, and data fetching logic.

### Tips for Effective Prompts

- Always **specify the widget name** (e.g., "modify BasicWidget" not "modify the widget")
- **Reference similar widgets** for context (e.g., "create a widget similar to BasicWidget")
- Specify **config-only** (WebsitesConfig) vs **component + config** changes
- For data fetching, mention the **GraphQL query/type** involved

### Common Tasks

- **Create a new widget** → use `widget-developer` skill
- **Add a config param** → update `*WebsitesConfig.ts` (defaultParams + paramsDescription) and `types.ts`
- **Upgrade a dependency** → use `dependency-upgrader` skill
- **Modify caching** → check `CacheProvider`, `CacheHelper`, `CacheAdapterInterface` in `src/adapters/cache/`
- **Add a helper function** → follow `ModuleName_functionName` convention, export from `src/index.ts`
- **Add a renderless component** → create in `src/renderlessComponents/`, return data not HTML
