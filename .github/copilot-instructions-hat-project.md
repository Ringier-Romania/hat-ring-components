# GitHub Copilot – Building HAT Projects

> This file lives in `hat-ring-components` and is the **single source of truth** for how to build
> any HAT-based news/publishing website. Project repositories reference this file from their own
> `.github/copilot-instructions.md` instead of duplicating the content.

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

## 6. Creating a new project widget

### Step 1 – `.astro` file

```astro
---
// src/components/widgets/MyWidget/MyWidget.astro
import {
    AppContext,
    AbstractWidgetConfig,
    WidgetHelper_getWidgetCssClasses,
    WidgetHelper_renderEmptyWidget,
    WidgetHelper_shouldHideWidget,
    WebsiteApiProvider,
} from "hat-ring-components";
import { gql } from "@ringpublishing/graphql-api-client-got";

const { context, widgetConfig } = Astro.props as {
    context: AppContext;
    widgetConfig: AbstractWidgetConfig & { myParam: string; cacheTTL: number };
};

let toRender: boolean | string | JSX.Element = false;

if (WidgetHelper_shouldHideWidget(widgetConfig, context)) {
    toRender = WidgetHelper_renderEmptyWidget(widgetConfig);
}

const query = gql`query ($id: UUID) { story(id: $id) { title } }`;
const response = !toRender
    ? await WebsiteApiProvider.call(query, { id: context.id }, widgetConfig?.cacheTTL)
    : null;

if (!toRender && !response?.data?.story) {
    toRender = WidgetHelper_renderEmptyWidget("MyWidget");
}
---
{toRender
    ? <Fragment set:html={toRender} />
    : <div class={WidgetHelper_getWidgetCssClasses("MyWidget", widgetConfig, context)}>
        <!-- widget content -->
    </div>
}
```

### Step 2 – export from `src/components/index.ts`

```ts
export { default as MyWidget } from "./widgets/MyWidget/MyWidget.astro";
```

### Step 3 – WebsiteManager config

```ts
// src/components/widgets/MyWidget/MyWidgetWebsitesConfig.ts
import {
    AbstractWebsitesWidgetConfigDefaultParams,
    AbstractWebsitesWidgetConfigParamsDescription,
} from "hat-ring-components/src/types/abstracts";

export let MyWidgetWebsitesConfig = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "myWidget_wdg": {
            "name": "My Widget",
            "description": "Short description for WebsiteManager UI",
            "defaultParams": {
                ...AbstractWebsitesWidgetConfigDefaultParams,
                "widgetType": "MyWidget",
                "myParam": "",
            },
            "paramsDescription": {
                ...AbstractWebsitesWidgetConfigParamsDescription,
                "myParam": {
                    "name": "My param label",
                    "description": "Description shown in WebsiteManager",
                    "type": "textfield",
                },
                "cacheTTL": {
                    "name": "Cache TTL",
                    "description": "Cache TTL in seconds",
                    "type": "numberfield",
                },
            },
        },
    },
};
```

**Key rules for WebsiteManager configs:**
- Always spread `AbstractWebsitesWidgetConfigDefaultParams` into `defaultParams`
- Always spread `AbstractWebsitesWidgetConfigParamsDescription` into `paramsDescription`
- Use `let` (not `const`) – matches the project convention
- Top-level structure always has `sections`, `defaultParams`, `paramsDescription`, `modules`
- Module key pattern: `camelCaseWidgetName_wdg`
- `widgetType` must match the widget name used in `widgets.ts` registry
- Field types: `"textfield"`, `"numberfield"`, `"checkbox"`, `"select"`
- **Only add `cacheTTL` when the widget makes server-side API calls** (GQL via `WebsiteApiProvider`
  or external fetch). Widgets that are purely client-side / DOM-only must **not** include `cacheTTL`.

Re-export from `src/components/websitesApiConfigs.ts`:

```ts
export * from "./widgets/MyWidget/MyWidgetWebsitesConfig";
```

### Step 4 – CSS Module

```scss
// src/styles/MyWidget/MyWidget.module.scss
@import "../breakpoints";

.MyWidget {
    &:global {
        /* styles for internal classes generated by hat-ring-components */
    }
}
```

Register in `src/cssModules.ts`:

```ts
import myWidget from './styles/MyWidget/MyWidget.module.scss';
export const cssModules = {
    MyWidget: myWidget.MyWidget,
};
```

---

## 7. Extending BasicWidget / GenericList via itemParts

```astro
---
import { BasicWidget as BasicWidgetCore } from "hat-ring-components";
import * as coreItemParts from "hat-ring-components/src/components/widgets/common/BasicWidget/itemParts";
import * as projectItemParts from "./itemParts";
const itemParts = Object.assign({}, coreItemParts, projectItemParts);
---
<BasicWidgetCore widgetConfig={widgetConfig} context={context}
    extendableAttributes={{ itemParts }} />
```

### Creating an itemPart

```astro
---
import { AppContext, AbstractWidgetConfig } from "hat-ring-components";
import { BasicWidgetResponseNode } from "hat-ring-components/src/components/widgets/common/BasicWidget/types";

const { context, widgetConfig, data } = Astro.props as {
    context: AppContext;
    widgetConfig: AbstractWidgetConfig;
    data: BasicWidgetResponseNode & { id: string };
};

export const getFragment = () => ({
    variables: {},
    query: gql`fragment MyItemPartQuery on SectionItem { url }`,
});
---
<span class="MyItemPart">...</span>
```

Export from `itemParts/index.ts`:

```ts
export { default as MyItemPart } from "./MyItemPart.astro";
export { getFragment as MyItemPart_getFragment } from "./MyItemPart.astro";
```

Register new option in the widget's WebsitesConfig `showOptions.items` array.

---

## 8. Styling – CSS system

### CSS Variables (defined in `globals.scss` on `:root`)

```scss
/* Fonts */
--font-primary: 'YourSerifFont', serif;
--font-primary-sans: 'YourSansFont', sans-serif;
--font-icons: project-icons;

/* Typographic scale */
--h48-72: 700 4.8rem/1.5 var(--font-primary-sans);
--h38-57: 700 3.8rem/1.5 var(--font-primary-sans);
--h28-42: 700 2.8rem/1.5 var(--font-primary-sans);
--h20-30: 700 2rem/1.5   var(--font-primary-sans);
--h18-27: 700 1.8rem/1.5 var(--font-primary-sans);
--p20-30: 400 2rem/1.5   var(--font-primary);
--p17-25: 700 1.7rem/1.5 var(--font-primary-sans);
--p17-25s:400 1.7rem/1.5 var(--font-primary-sans);
--p15-22: 400 1.5rem/1.5 var(--font-primary);
--p13-19: 400 1.3rem/1.5 var(--font-primary);
--p13-19s:700 1.3rem/1.5 var(--font-primary-sans);
--p10-12: 400 1rem/1.25  var(--font-primary);

/* Brand colours – define all project tokens here */
--colorPrimary: #XXXXXX;
--colorText:    #XXXXXX;
--white:        #FFFFFF;
--bodyBg:       #ffffff;

/* Spacing */
--ringGap:            1.6rem;
--ringGapLg:          3.4rem;
--containerPadding:   1.6rem;
--containerPaddingLg: 2.5rem;
```

`html { font-size: 62.5% }` → `1rem = 10px`.

### Breakpoints (`breakpoints.scss`)

```scss
$breakpoint-sm: 510px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1440px;

$breakpoint-xs-max: $breakpoint-sm - 1px;
$breakpoint-sm-max: $breakpoint-md - 1px;
$breakpoint-md-max: $breakpoint-lg - 1px;
$breakpoint-lg-max: $breakpoint-xl - 1px;
```

### Icons (`icons.scss`)

```scss
@import "../icons";
.MyElement {
    @include icon(after, arrow-right);
    @include icon(before, search);
}
```

### Buttons (`buttonsMixins.scss`)

```scss
@import "../buttonsMixins";
.MyButton {
    @include btnPrimaryBig();
    @include btnPrimarySmall();
}
```

### CSS Module pattern

```scss
.MyWidget.MyWidget {          /* doubled name = specificity boost */
    &:global {
        > .Title { font: var(--h20-30); color: var(--colorText); }
    }
}
.MyWidget { :global & { } }  /* reversed – style when inside another context */
```

One directory per widget: `src/styles/WidgetName/WidgetName.module.scss`. Large widgets may
split into sub-files imported from the main one.

---

## 9. Helpers from hat-ring-components

### WidgetHelper

```ts
import {
    WidgetHelper_getWidgetCssClasses,
    WidgetHelper_renderEmptyWidget,
    WidgetHelper_renderEmptyComponent,
    WidgetHelper_shouldHideWidget,
    WidgetHelper_findWidgetConfig,
    WidgetHelper_getAppropriateTeaserImage,
} from "hat-ring-components";
```

### WebsiteApiProvider

```ts
import { WebsiteApiProvider } from "hat-ring-components";
import { gql } from "@ringpublishing/graphql-api-client-got";

const response = await WebsiteApiProvider.call(query, variables, widgetConfig?.cacheTTL);
```

### CacheHelper

```ts
import { CacheHelper_getDecoratedCachedObject, CacheHelper_isExpired, CacheHelper_set } from "hat-ring-components";

const cached = await CacheHelper_getDecoratedCachedObject("myKey");
if (cached.value && !CacheHelper_isExpired(cached, 300)) return cached.value;
CacheHelper_set("myKey", freshValue, 300);
```

### UtilsHelper

```ts
import {
    UtilsHelper_getCurrentPageType,
    UtilsHelper_isMobile,
    UtilsHelper_getQueryParam,
    UtilsHelper_convertToInt,
    UtilsHelper_getDomain,
} from "hat-ring-components";
```

### ImageHelper

```ts
import { ImageHelper_getImageDimensionsFromObject, ImageHelper_getImageDimensionsWithAspectRatio } from "hat-ring-components/src/helpers/ImageHelper";
import { RingImageObject } from "hat-ring-components/src/renderlessComponents/common/RingImageObject";
```

### DateHelper / TranslationProvider

```ts
import { DateHelper_fromNow } from "hat-ring-components";
import { TranslationProvider } from "hat-ring-components/src/providers/TranslationProvider";

DateHelper_fromNow(dateString, localeDateTemplate);
TranslationProvider.translate(context, 'translation.key');
```

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

### Widget portability – ready to move to hat-ring-components
Every widget should be written as if it will eventually live in `hat-ring-components`:

- **No project-specific CSS tokens** in the widget module. Use a three-layer fallback:
  ```scss
  color: var(--tocLinkColor, var(--colorPrimary, currentColor));
  font:  var(--tocTitleFont,  var(--h18-27, bold 1.8rem/1.5 sans-serif));
  ```
- **Minimal CSS** – only structural rules. Visual styling belongs in the project-level override.
- **Project-level override pattern:**
  ```scss
  // src/styles/MyWidget/MyWidget.module.scss
  @import "../breakpoints";
  // optionally: @import "hat-ring-components/src/styles/MyWidget/MyWidget.module";

  .MyWidget.MyWidget {
      &:global {
          background-color: var(--backgroundGrey);
          --myWidgetLinkColor: var(--colorPrimary);
      }
  }
  ```
- **No local project imports** inside a widget `.astro` – only `hat-ring-components` or npm packages.
- **Self-contained JS** – `<script is:inline>` must work without project globals or env vars.

### CSS Modules – selector rules
- Doubled class name for specificity: `.MyWidget.MyWidget { … }`
- Internal classes go inside `&:global { }` or `:global & { }`
- Mobile-first; `@media (min-width: $breakpoint-*)` for larger screens

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

