---
name: hat-widget-creator
description: |
  Guides developers through creating new widgets in a HAT (Headless Application Template) project
  that uses hat-ring-components as a dependency. Handles the full widget scaffolding workflow:
  Astro component, WebsiteManager config, exports, CSS module, and optional data fetching.
  Trigger phrases: "create widget", "new widget", "add widget", "nowy widget", "dodaj widget",
  "widget", "komponent", "nowy komponent", "stwórz widget", "add component"
---

# HAT Widget Creator

This skill helps create widgets in a HAT project. HAT projects use `hat-ring-components` as a dependency for core widgets, but projects also create their own widgets that follow the same patterns and conventions.

When creating a widget, follow **all** steps below in order. Replace `WidgetName` with the actual PascalCase name throughout.

---

## 1. Project Widget Directory Structure

```
src/components/widgets/{WidgetName}/
├── WidgetName.astro              # The widget component
├── WidgetNameWebsitesConfig.ts   # CMS configuration
└── (optional files)
    ├── WidgetNameGetData.ts      # If widget fetches data
    └── types.ts                  # If widget has custom types
```

---

## 2. Step 1 — Create the `.astro` Component

Create `src/components/widgets/{WidgetName}/{WidgetName}.astro`:

```astro
---
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

// Data fetching (only if widget needs server-side data)
const query = gql`query ($id: UUID) { story(id: $id) { title } }`;
const response = !toRender
    ? await WebsiteApiProvider.call(query, { id: context.id }, widgetConfig?.cacheTTL)
    : null;

if (!toRender && !response?.data?.story) {
    toRender = WidgetHelper_renderEmptyWidget("WidgetName");
}
---
{toRender
    ? <Fragment set:html={toRender} />
    : <div class={WidgetHelper_getWidgetCssClasses("WidgetName", widgetConfig, context)}>
        <!-- Widget content here -->
    </div>
}
```

### Widget `.astro` pattern — always follow this order:

1. Destructure `{ context, widgetConfig }` from `Astro.props` with full typing
2. `let toRender: boolean | string | JSX.Element = false`
3. `WidgetHelper_shouldHideWidget` → `WidgetHelper_renderEmptyWidget` → assign to `toRender`
4. Fetch data (GQL / CacheHelper) — only when `!toRender`
5. Validate response → `WidgetHelper_renderEmptyWidget` if no data
6. Template: `{toRender ? <Fragment set:html={toRender}/> : <div class={WidgetHelper_getWidgetCssClasses(...)}> … </div>}`

---

## 3. Step 2 — WebsiteManager Config

Create `src/components/widgets/{WidgetName}/{WidgetName}WebsitesConfig.ts`:

```ts
import {
    AbstractWebsitesWidgetConfigDefaultParams,
    AbstractWebsitesWidgetConfigParamsDescription,
} from "hat-ring-components/src/types/abstracts";

export let WidgetNameWebsitesConfig = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "widgetName_wdg": {
            "name": "Widget Display Name",
            "description": "Short description for WebsiteManager UI",
            "defaultParams": {
                ...AbstractWebsitesWidgetConfigDefaultParams,
                "widgetType": "WidgetName",
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

### Key rules:

- **Always** spread `AbstractWebsitesWidgetConfigDefaultParams` into `defaultParams`
- **Always** spread `AbstractWebsitesWidgetConfigParamsDescription` into `paramsDescription`
- Use `let` (not `const`) — project convention
- Module key pattern: `camelCaseWidgetName_wdg`
- `widgetType` must match the widget name in the `widgets.ts` registry
- Field types: `"textfield"`, `"numberfield"`, `"checkbox"`, `"select"`
- Only add `cacheTTL` when the widget makes server-side API calls

---

## 4. Step 3 — Export and Register

### Export component from `src/components/index.ts`:

```ts
export { default as WidgetName } from "./widgets/WidgetName/WidgetName.astro";
```

### Export config from `src/components/websitesApiConfigs.ts`:

```ts
export * from "./widgets/WidgetName/WidgetNameWebsitesConfig";
```

### Register in `src/widgets.ts`:

```ts
import * as localWidgets from "./components";
// WidgetName is automatically available via localWidgets
```

---

## 5. Step 4 — CSS Module

Create `src/styles/WidgetName/WidgetName.module.scss`:

```scss
@import "../breakpoints";

.WidgetName.WidgetName {
    &:global {
        /* styles for internal classes */
    }
}
```

### Register in `src/cssModules.ts`:

```ts
import widgetName from './styles/WidgetName/WidgetName.module.scss';

export const cssModules = {
    // ... existing modules
    WidgetName: widgetName.WidgetName,
};
```

---

## 6. Extending BasicWidget / GenericList via itemParts

If the new widget wraps an existing extensible widget (BasicWidget, GenericList, StoryContent, Slider), use the `extendableAttributes` pattern instead of building from scratch:

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

### Creating an itemPart:

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
    query: gql`fragment MyPartQuery on SectionItem { url }`,
});
---
<span class="MyItemPart">...</span>
```

### Export from `itemParts/index.ts`:

```ts
export { default as MyItemPart } from "./MyItemPart.astro";
export { getFragment as MyItemPart_getFragment } from "./MyItemPart.astro";
```

---

## 7. Portability Rules

When writing widgets that may later be promoted to `hat-ring-components`, follow these rules:

- **No project-specific CSS tokens** in the widget module. Use three-layer fallback:
  ```scss
  color: var(--widgetLinkColor, var(--colorPrimary, currentColor));
  font: var(--widgetTitleFont, var(--h18-27, bold 1.8rem/1.5 sans-serif));
  ```
- **Minimal CSS** — only structural rules. Visual styling belongs in the project-level override.
- **No local project imports** inside widget `.astro` — only `hat-ring-components` or npm packages.
- **Self-contained JS** — `<script is:inline>` must work without project globals or env vars.

---

## 8. Data fetching, forms, and helpers

**Primary data:** `WebsiteApiProvider.call(query, vars, cacheTTL)` with `gql` from `@ringpublishing/graphql-api-client-got`.

**Caching:** `CacheHelper_getDecoratedCachedObject(key)` → `CacheHelper_isExpired(cached, ttl)` → `CacheHelper_set(key, value, ttl)`.

**Forms:** POST in `.astro` via `Astro.request.method === "POST"` + `Astro.request.formData()`. reCAPTCHA: `FormHelper_validateRecaptchaToken`. Email: `FormHelper_sendEmailBySES`.

**Key helpers from hat-ring-components:**

| Helper | Purpose |
|--------|---------|
| `WidgetHelper_getWidgetCssClasses(name, config, context)` | CSS class string |
| `WidgetHelper_renderEmptyWidget(config)` | Empty widget HTML comment |
| `WidgetHelper_shouldHideWidget(config, context)` | Visibility check |
| `WidgetHelper_findWidgetConfig(context, widgetType)` | Find config by type |
| `WidgetHelper_getAppropriateTeaserImage(images, isMobile)` | Responsive image |
| `UtilsHelper_getCurrentPageType`, `_isMobile`, `_getQueryParam` | Page/device/URL utilities |
| `ConfigHelper_getGeneralConfig(context)` | General CMS config |
| `DateHelper_fromNow(date, template)` | Relative date formatting |
| `TranslationProvider.translate(context, key)` | CMS translations |
