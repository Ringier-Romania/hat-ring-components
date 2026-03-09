# Copilot Instructions — hat-ring-components

## Overview

This is the **shared component library** for the HAT (Headless Application Template) ecosystem by RING Publishing. It is consumed as a dependency by website projects built on the HAT Boilerplate — it is **not a standalone application**. It provides Astro/React UI components (widgets), GraphQL data-fetching providers, multi-layer caching, SEO utilities, helper functions, reusable Playwright test suites, and Website Manager configuration schemas.

The broader HAT ecosystem consists of:
- **hat-ring-components** (this repo) — shared components, helpers, providers, configs
- **hat-server** — custom Astro server handling headers, Websites API requests, redirects, device detection, Ring Data Layer, health checks, and middleware
- **hat-boilerplate** — project skeleton for new websites
- **hat-cli** — CLI for project setup and profile/env management

Requires **Node.js v22+**.

There is no lint or test runner in this repo. Tests are Playwright suites exported as functions for consuming projects to call.

## Architecture

### Grid System

Pages use a **12-column CSS grid** configured through the Websites Manager. Each page type (Home, Story, List, Topic, Author, Search) has a grid definition with **Containers**. Each Container has five widget areas (**boxes**): `box_top`, `box_left`, `box_middle`, `box_right`, `box_bottom`. Widgets are placed inside boxes. Empty/hidden boxes don't render. On mobile (<768px), columns stack vertically at 100% width.

Grid configs are in `src/components/Grid/` (e.g., `GridHomeWebsitesConfig.ts`, `GridStoryWebsitesConfig.ts`).

### Component Model

Components live in `src/components/` and are primarily **Astro components** (`.astro`). A few use React (`.tsx`). Every component receives two standard props: `context` (`AppContext`) and `widgetConfig` (widget-specific config type).

**Widget** = a component with configuration for the Websites Manager.
**Renderless component** = does not output HTML; returns data (objects, strings, JSON). Located in `src/renderlessComponents/`, primarily SEO metadata generators.

Widgets follow a consistent structure under `src/components/widgets/{category}/{WidgetName}/`:
- `WidgetName.astro` — the component itself
- `WidgetNameGetData.ts` — data fetching logic (GraphQL queries)
- `WidgetNameWebsitesConfig.ts` — CMS configuration schema (defines params for the Website Manager UI)
- `types.ts` — widget-specific TypeScript interfaces

### Adding a New Widget

1. Create directory `src/components/widgets/{WidgetName}/`
2. Create `WidgetName.astro` — use `Astro.props` to destructure `{context, widgetConfig}`, use `WidgetHelper_*` functions for visibility/CSS/empty rendering
3. Create `WidgetNameWebsitesConfig.ts` — extend `AbstractWebsitesWidgetConfigDefaultParams` and `AbstractWebsitesWidgetConfigParamsDescription`, use module key format `widgetName_wdg`
4. Export component in `src/index.ts`
5. Export config in `src/websitesApiConfigs.ts`
6. Create styles in `styles/` as `WidgetName.module.scss`

Extensible widgets (BasicWidget, GenericList, StoryContent, Slider) support custom item parts via `getFragment` functions for additional GraphQL data fetching at the part level.

### Data Flow

1. **HAT Server** (`hat-server` package) — the entry point. On each request it queries Websites API for URL routing info, detects device type, generates Ring Data Layer, and passes `HatControllerParams` to the Astro app. It uses `CacheProvider` from this repo for caching API responses with key `{domain}{pathname}{variant}`.

2. **WebsiteApiProvider** (`src/providers/WebsiteApiProvider.ts`) — wraps all GraphQL calls to the RING Websites API with **stale-while-revalidate** caching. It deduplicates in-flight requests via `global.HATCacheInCallInProgress`. All data fetching in widgets goes through `WebsiteApiProvider.call(query, variables, cacheTtl)`.

3. **CacheProvider / CacheHelper** — multi-layer caching with a `CacheAdapterInterface`:
   - **Node-cache** (default) — in-memory per-instance, good for development and single-instance deployments
   - **Redis** (when `USE_REDIS=1`) — centralized, required for multi-instance production (EKS)
   - **In-memory config cache** — additional per-instance layer controlled by `MEM_CACHE_FOR_CONFIG_MODE` (`request` = per-request memoization, `time` = TTL-based via `MEM_CACHE_FOR_CONFIG_TTL_MS`)

4. **ConfigHelper** — fetches CMS configuration (general settings, SEO, translations, developer settings) via GraphQL and provides typed accessors. Config keys: `general`, `seoSettings`, `seoLanguages`, `seoTitlesAndDescription`, `seoOpenGraph`, `rssDefault`, `metaData`, `devGeneral`, `devDetail`, `dateFormat`.

5. **MonitoringProvider** — optional metrics facade. The consuming project injects a monitoring service into `global['monitoringProvider']` with `counter()`, `gauge()`, `timer()`, and `flush()` methods.

### WebsitesConfig System

Each widget exports a `*WebsitesConfig` object (aggregated in `src/websitesApiConfigs.ts`) that declares:
- `modules` — widget module definitions with `defaultParams` and `paramsDescription` (field types: `textfield`, `checkbox`, `select`, `array`, `number`)
- `sections` — where the widget can be placed in the CMS grid

These configs extend `AbstractWebsitesWidgetConfigDefaultParams` and `AbstractWebsitesWidgetConfigParamsDescription` from `src/types/abstracts.ts`. Configuration is exported separately from components to allow the config merger to import without pulling in component code.

### Reusable Test Suites

`src/tests/suites/` exports Playwright test functions (SEO, performance, social media) that consuming projects call, passing their own `page` and `playwrightTest` instances. `src/helpers/TestsHelper.ts` provides shared test utilities (meta content extraction, structured data parsing, element assertions, DOM attachment on failures).

### Deployment

Consuming projects deploy via `cicd/postbuild.ts` which: extracts version from changelog, optionally creates Website Manager config versions (controlled by `hatCreateConfigurationForWebsiteManager` in package.json), and uploads built Astro files to OCDN at `https://ocdn.eu/{NEXT_PUBLIC_OCDN_BUCKET_NAME}/astro/assets/{CONFIGURATION_TEMPLATE_NAME}/`.

## Key Conventions

### Naming

- **Exported functions** use the pattern `ModuleName_functionName` (e.g., `CacheHelper_set`, `ConfigHelper_getGeneralConfig`, `WidgetHelper_shouldHideWidget`). Always follow this convention.
- **Classes** use PascalCase with a `Provider` or `Adapter` suffix (e.g., `CacheProvider`, `RedisCacheAdapter`).
- **Component CSS class** must match the component name in **PascalCase**. If the name comes from the API in another format (e.g., `embedded_application`), convert to PascalCase (`EmbeddedApplication`). Do not format custom CSS class names from configuration.
- **Property names** use camelCase (except the main component class which is PascalCase).
- **WebsitesConfig module keys** use the format `widgetName_wdg`.

### Styling

- Use **CSS Modules** (SCSS) in `styles/`. Import as `import styles from ".../*.module.scss"`.
- Components should style only **functional layout** (e.g., column count). Do not set external properties like padding, colors, or fonts unless explicitly required.
- Wrap child class styles in `:global { }` inside the module to ensure they apply correctly.
- Components accept a `cssModuleClass` prop for external styling by consuming projects.

### AppContext

`AppContext` (`src/types/types.ts`) is the primary context object threaded through **all** components. Every component must accept it and pass it to all children.

The `customData` property stores globally visible data, but **components at the same DOM level render asynchronously** — a component lower in the DOM may modify `customData` before one higher up due to independent rendering execution. Be aware of this non-deterministic behavior.

### Central Types

- `AppContext` — `siteContentType`, `id`, `siteNodeId`, `url`, `customData`, `hatControllerParams`, `cssModules`, `websiteManagerVariant`, `domain`
- `SiteContentType` enum — `Homepage`, `Story`, `SiteNode`, `Author`, `Topic`, `Search`, `CustomAction`, `Source`, `Error404`
- `AbstractWidgetConfig` — base interface for all widget configurations
- `CacheAdapterInterface` (`src/adapters/cache/types.ts`) — contract for cache backends
- `HatControllerParams` — `gqlResponse`, `customData`, `urlWithParsedQuery`, `isMobile`, `websiteManagerVariant`, `domain`, `ringDataLayer`

### Environment Variables

**Websites API (required):**
- `WEBSITE_API_PUBLIC`, `WEBSITE_API_SECRET`, `WEBSITE_API_NAMESPACE_ID` — API credentials
- `NEXT_PUBLIC_WEBSITE_DOMAIN` — website domain
- `NEXT_PUBLIC_WEBSITE_API_VARIANT` — default Website Manager variant

**Cache:**
- `CACHE_TTL` — general cache TTL in seconds (default: 60, `0` disables cache)
- `CACHE_TTL_CONFIG` — config cache TTL in seconds (default: 60)
- `CACHE_CLEAN_INTERVAL` — cache cleanup interval in seconds (default: 60)
- `MEM_CACHE_FOR_CONFIG_MODE` — `request` | `time` | `none` (default: `request`)
- `MEM_CACHE_FOR_CONFIG_TTL_MS` — in-memory config TTL in ms, used with `time` mode (default: 1000)
- `HAT_SERVER_WEBSITE_API_TTL` — HAT Server's Websites API response cache TTL (default: 60)

**Redis:**
- `USE_REDIS` — set to `1` to enable Redis
- `REDIS_RW`, `REDIS_REPLICATION_GROUP_ID` — Redis connection config

**Other:**
- `NODE_ENV` — `production` vs development
- `GQL_CACHE_RESET_INTERVAL_SECONDS` — GraphQL client cache reset interval (default: 300)
- `PORT` — server port (default: 4321)

### Global State

Several values are stored on `global` (declared in `declaration.d.ts`): `HATcache`, `HATCacheInCallInProgress`, `websitesApiGotClient`, `monitoringProvider`. Understand these before modifying caching or API client code.

### Astro Version Compatibility

Astro.js versions must match between the consuming project's package.json and this component repository. Version mismatches cause incompatibilities.
