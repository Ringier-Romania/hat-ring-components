# GitHub Copilot – HAT Component System Reference

> **HAT architecture, conventions, and component patterns.** This file is read-only reference
> from `hat-ring-components` — project-specific conventions belong in the project's own
> `.github/copilot-instructions.md`. For task-specific deep-dives, use Copilot skills:
> **`hat-widget-creator`**, **`hat-styler`**, **`dependency-upgrader`**.

---

## 1. What is a HAT project?

A HAT project is a CMS-driven news/publishing website built on three layers:

| Layer | Package / repo | Role |
|---|---|---|
| SSR Framework | `astro` (v5, output: `server`, adapter: `@astrojs/node`) | Server-side page rendering |
| CMS components & logic | `hat-ring-components` (this repo) | Widgets, helpers, providers, types, Grid/SEO logic |
| Server + middleware | `hat-server` (git: `ringpublishing/hat-server`) | Server boot, request handling, cache, monitoring |

The project exposes Express.js (via `@ras-tech/express-handler`) as the production server
(`run-server.mjs`). Builds to the `dist/` directory.

---

## 2. Architecture and request flow

```
HTTP Request
    └─► Express (run-server.mjs)
            └─► Astro SSR middleware (src/middleware.ts)
                    └─► MiddlewareHelper_processRequest (hat-server)
                            └─► [...path].astro (catch-all route)
                                    └─► PageHelper_mapSearchParamsToAppContext → AppContext
                                            └─► RoutingComponent (Story / SiteNode / Author / Topic / NotHandled)
                                                    └─► <Grid context={context} config={...}/>
                                                            └─► Widgets (hat-ring-components core + project-specific)
```

**`AppContext`** is the central object flowing through the entire application. It contains page
data, widget configs, CMS parameters, and environment info.

---

## 3. Project directory structure

```
src/
├── middleware.ts              # Astro middleware – server boot, GQL cache, early returns
├── widgets.ts                 # Widget registry (ring + local + aliases)
├── cssModules.ts              # CSS Modules map passed to widget context
├── consts.ts                  # Global constants (e.g. date templates, site title)
├── version.tsx                # React component – injects meta ver/variant into <head>
├── projectMetaData.astro      # Inline script: window.websitesSpaceNamespace etc.
│
├── layouts/
│   └── Layout.astro           # Main HTML layout: <head> SEO + Grid headWidgets + <slot/>
│
├── pages/
│   ├── [...path].astro        # Catch-all: selects RoutingComponent based on siteContentType
│   ├── [...path].feed.ts      # RSS feed
│   ├── routes/                # Templates per page type
│   │   ├── Story.astro        # Article – header/footer/DetailExtendedWidgets1-4
│   │   ├── SiteNode.astro     # Listing – header/footer/ListExtendedWidgets1-2
│   │   ├── Author.astro       # Author profile – header/footer/AuthorWidgets1-2
│   │   ├── Topic.astro        # Tag/topic – header/footer/tag_ExtendedWidgets1-2
│   │   └── NotHandled.astro   # Fallback
│   └── api/                   # API endpoints (checkout, webhooks etc.)
│
├── components/
│   ├── index.ts               # Exports all local widgets
│   ├── websitesApiConfigs.ts  # Exports WebsiteManager configs for all local widgets
│   ├── common/                # Project helper components (Ads, CmpStub, ServiceWorker, ReCaptcha)
│   ├── config/
│   │   └── ProjectWebsitesConfig.ts  # Global project config for WebsiteManager
│   ├── slots/                 # CMS slots (e.g. polls, native ads)
│   │   └── index.ts
│   └── widgets/               # Project-specific widgets
│       ├── BasicWidget/       # BasicWidget wrapper with custom itemParts
│       ├── Lists/GenericList/ # GenericList wrapper with custom itemParts
│       ├── Story/             # Article-specific widgets
│       └── [OtherWidgets]/
│
├── helpers/
│   ├── ProjectHelper.ts       # Static project helper class (URL mapping, cache, SEO preload…)
│   └── types.ts               # Project-specific TypeScript types
│
├── styles/
│   ├── globals.scss           # CSS Variables, reset, typography, .gridContainer, dark mode
│   ├── breakpoints.scss       # $breakpoint-sm/md/lg/xl
│   ├── icons.scss             # @mixin icon($position, $icon) + icon font map
│   ├── buttonsMixins.scss     # Button mixins
│   └── [WidgetName]/          # One directory = one widget
│       └── WidgetName.module.scss
│
└── scripts/                   # Client-side scripts (login, checkout, session etc.)
```

---

## 4. Building pages – routing and Grid

### Page types (siteContentType)

| Value | Route component | Grid containers |
|---|---|---|
| `Story` | `Story.astro` | `headerWidgets`, `DetailExtendedWidgets1-4`, `footerWidgets` |
| `SiteNode` | `SiteNode.astro` | `headerWidgets`, `ListExtendedWidgets1-2`, `footerWidgets` |
| `Author` | `Author.astro` | `headerWidgets`, `AuthorWidgets1-2`, `footerWidgets` |
| `Topic` | `Topic.astro` | `headerWidgets`, `tag_ExtendedWidgets1-2`, `footerWidgets` |

### Grid component

```astro
import Grid from "hat-ring-components/src/components/Grid/Grid.astro";

<Grid
    context={context}
    config={{
        containers: ["ContainerName"],
        boxes: ["widgets_above_content", "widgets_middle_content"],
    }}
/>
```

`containers` – container names configured in WebsiteManager. `boxes` – optional box filtering.

### Route component pattern

Every route component follows the same structure:

```astro
---
const { context } = Astro.props;
import Grid from "hat-ring-components/src/components/Grid/Grid.astro";
---
<>
    <header>
        <Grid context={context} config={{ containers: ["headerWidgets"], boxes: [...] }} />
    </header>
    <Grid context={context} config={{ containers: ["ContentWidgets1", "ContentWidgets2"] }} />
    <footer>
        <Grid context={context} config={{ containers: ["footerWidgets"], boxes: [...] }} />
    </footer>
</>
```

### Main layout – `Layout.astro`

- Import project fonts via `@fontsource/*`
- Import global styles: `../styles/globals.scss`
- Build SEO metadata using the `SeoMeta*` helper pipeline from `hat-ring-components`
- Render `<SEO {...seoMetaData}/>` from `astro-seo`
- In `<head>`: Grid with `devGeneral` / `headWidgets` wrapped in `<SafeHead>`
- `<slot/>` in `<body>` – route component content renders here

---

## 5. Widget registry

### `src/widgets.ts`

```ts
import * as ringWidgets from "hat-ring-components";
import * as localWidgets from "./components";
import * as localSlots from "./components/slots";

export const widgets = Object.assign(
    {},
    ringWidgets,
    localWidgets,
    { AliasWidget: ringWidgets.OriginalWidget }, // optional aliases
);

export const slots = Object.assign({}, localSlots);
```

### `src/cssModules.ts`

Maps widget names to their CSS Module class strings – passed into `AppContext`:

```ts
import myWidget from './styles/MyWidget/MyWidget.module.scss';

export const cssModules = {
    MyWidget: myWidget.MyWidget,
};
```

### `websiteManagerConfigs.ts` (root)

```ts
import * as ringWidgets from "hat-ring-components/src/websitesApiConfigs";
import * as localWidgets from "./src/components/websitesApiConfigs";

export const websiteManagerConfigs = Object.assign({}, { ...ringWidgets, ...localWidgets });
```

---

## 6. Creating and extending widgets

> Full step-by-step workflow with code templates → **`hat-widget-creator`** skill.

**Checklist:** `.astro` (follow §13 pattern) → `WebsitesConfig.ts` → export in `index.ts` + `websitesApiConfigs.ts` → CSS module → `cssModules.ts`

**Config rules:** spread `AbstractWebsitesWidgetConfig{DefaultParams,ParamsDescription}`, use `let`, key `camelCase_wdg`, `widgetType` = widget name, `cacheTTL` only for API-calling widgets.

---

## 7. Extending core widgets via itemParts

Extensible widgets (BasicWidget, GenericList, StoryContent, Slider) support custom item parts. Wrap core widget, merge `itemParts` via `Object.assign({}, coreItemParts, projectItemParts)`, pass as `extendableAttributes={{ itemParts }}`. Each itemPart can export `getFragment` for additional GraphQL fields. Full code templates → **`hat-widget-creator`** skill.

---

## 8. Styling

> Full CSS reference (variables, breakpoints, mixins, dark mode) → **`hat-styler`** skill.

**Essentials:** CSS Modules (SCSS) at `src/styles/WidgetName/WidgetName.module.scss`. `1rem = 10px`. Mobile-first. Double class `.W.W {}` for specificity. Child classes in `&:global {}`. Three-layer fallback: `var(--widgetToken, var(--globalToken, fallback))`. Breakpoints: sm=510, md=768, lg=1024, xl=1440.

---

## 9. Key helpers from hat-ring-components

All from `hat-ring-components` unless noted:

- **Widget:** `WidgetHelper_getWidgetCssClasses`, `_renderEmptyWidget`, `_shouldHideWidget`, `_findWidgetConfig`, `_getAppropriateTeaserImage`
- **Data:** `WebsiteApiProvider.call(query, vars, cacheTTL)` — use `gql` from `@ringpublishing/graphql-api-client-got`
- **Cache:** `CacheHelper_getDecoratedCachedObject(key)` → `_isExpired(cached, ttl)` → `_set(key, value, ttl)`
- **Utils:** `UtilsHelper_getCurrentPageType`, `_isMobile`, `_getQueryParam`, `_convertToInt`, `_getDomain`
- **Config/i18n:** `ConfigHelper_getGeneralConfig`, `DateHelper_fromNow`, `TranslationProvider.translate(context, key)` (from `src/providers/TranslationProvider`)
- **Images:** `ImageHelper_getImageDimensionsFromObject` (from `src/helpers/ImageHelper`), `RingImageObject` (from `src/renderlessComponents/common/RingImageObject`)

---

## 10. CMS Slots

```astro
---
// src/components/slots/MySlot.astro
const { blockData, context } = Astro.props;
---
<div class="MySlot">...</div>
```

```ts
// src/components/slots/index.ts
export { default as MySlot } from './MySlot.astro';
```

```ts
// src/widgets.ts
export const slots = Object.assign({}, localSlots);
```

---

## 11. Vite aliases

| Alias | Target |
|---|---|
| `@common` | `node_modules/hat-ring-components/src/components/common` |

```ts
import RingLink from "@common/RingLink.astro";
```

---

## 12. Environment variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_ACC_IMAGES_ENDPOINT` | CDN host for images and assets |
| `NEXT_PUBLIC_WEBSITE_DOMAIN` | Production domain |
| `CONFIGURATION_TEMPLATE_NAME` | Project name used in asset path |
| `RESPONSE_HEADER_CACHE_CONTROL_MAX_AGE` | Default 60s |
| `GQL_CACHE_RESET_INTERVAL_SECONDS` | Default 300s |
| `SMTP_USER` | Email address for AWS SES |
| `IS_ON_BAMBOO` | `true` in CI/CD |

---

## 13. Conventions and patterns

### Language
All code, comments, variable names, config labels, descriptions, and default string values must
be in **English**. Translations for end-users are handled at the CMS/content level.

### Widget `.astro` pattern (always follow this order)
1. Destructure `{ context, widgetConfig }` from `Astro.props` with full typing
2. `let toRender: boolean | string | JSX.Element = false`
3. `WidgetHelper_shouldHideWidget` → `WidgetHelper_renderEmptyWidget` → assign to `toRender`
4. Fetch data (GQL / CacheHelper) – only when `!toRender`
5. Validate response → `WidgetHelper_renderEmptyWidget` if no data
6. `{toRender ? <Fragment set:html={toRender}/> : <div class={WidgetHelper_getWidgetCssClasses(...)}> … </div>}`

### Widget portability
No project-specific CSS tokens (use three-layer fallback §8), minimal CSS (structural only), no local imports in `.astro`, self-contained `<script is:inline>`.

### TypeScript
- No `strict: true`; type props via `Astro.props as { context: AppContext; widgetConfig: AbstractWidgetConfig & {…} }`
- Core types: `AppContext`, `AbstractWidgetConfig`, `SiteContentType` from `hat-ring-components`
- API types: `@ringpublishing/graphql-api-client-got/lib/types/websites-api`

### Client-side scripts
- `src/scripts/*.ts` for standalone scripts
- `<script is:inline>` for DOM logic inside components
- Global session script imported once in `Layout.astro`

### Forms
- POST handled in the widget `.astro` itself (`Astro.request.method === "POST"`)
- reCAPTCHA: `FormHelper_validateRecaptchaToken`
- Email: `FormHelper_sendEmailBySES`

### Special pages (outside Grid)
- Login, checkout, profile – own layout, no Grid
- API endpoints: `src/pages/api/*.ts`
- Webhooks: `src/pages/*.ts`

---

## 14. Build and deploy

```bash
npm run dev            # local dev (requires .env)
npm run build          # astro check && astro build
npm run postbuildLocal # tsc + node dist/cicd/postbuild.js
node run-server.mjs    # production – Express + Astro SSR
```

Assets: `dist/client/astro/assets/{CONFIGURATION_TEMPLATE_NAME}/`

---

## 15. Copilot Skills for HAT Projects

Skills provide focused, task-specific guidance while keeping the main instructions lean. They are
loaded **only when triggered** (by matching phrases), saving context tokens for routine work.

### Available skills

| Skill | When to use | Trigger examples |
|---|---|---|
| **`hat-widget-creator`** | Creating new widgets, extending BasicWidget/GenericList, WebsiteManager configs | "create widget", "add component", "nowy widget" |
| **`hat-styler`** | CSS Modules, breakpoints, variables, icons, dark mode, specificity patterns | "style this", "css module", "ostyluj" |
| **`dependency-upgrader`** | Upgrading npm dependencies (Astro, hat-ring-components, etc.) | "upgrade astro", "bump packages" |

### Setup in your project — reference, don't copy

Skills reference core knowledge from `hat-ring-components` via `node_modules`. This way,
upgrading the package automatically updates skill knowledge — no manual sync needed.

**Step 1.** Create a skill directory in your project with a thin SKILL.md that references the
core guide and adds project-specific additions:

```
.github/skills/hat-widget-creator/SKILL.md
.github/skills/hat-styler/SKILL.md
.github/skills/dependency-upgrader/SKILL.md
```

**Step 2.** Each SKILL.md follows this pattern (example for `hat-widget-creator`):

```markdown
---
name: hat-widget-creator
description: |
  Guides developers through creating new widgets in a HAT project.
  Trigger phrases: "create widget", "new widget", "add widget", "nowy widget",
  "dodaj widget", "komponent", "nowy komponent", "stwórz widget", "add component"
---

# HAT Widget Creator

Read the core widget creation guide from hat-ring-components:
`node_modules/hat-ring-components/.github/project-skills/hat-widget-creator/SKILL.md`

Follow all instructions from the core guide. Also read the project's own
`.github/copilot-instructions.md` for project-specific conventions.
```

**Step 3.** In your `.github/copilot-instructions.md`, reference the shared HAT instructions:

```markdown
See [HAT project guide](../node_modules/hat-ring-components/.github/copilot-instructions-hat-project.md)
for HAT architecture, conventions, and component patterns.
```

Project-specific conventions (naming, custom helpers, env vars, deployment) belong in the
project's own `.github/copilot-instructions.md` — not in the shared HAT instructions or skills.

### Why reference instead of copy?
`npm update` = latest skill knowledge. Project adds overlay without duplicating core. No sync drift. One extra file read per trigger (negligible).

### Tips for effective Copilot usage

- **Specify widget names** — "create a MyGallery widget" not "create a gallery"
- **Reference similar widgets** — "like BasicWidget but with a carousel"
- **Mention the scope** — config-only change vs. component + config + styles
- **Use skills for deep tasks** — they load only when triggered, saving context tokens

