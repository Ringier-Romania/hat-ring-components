---
name: "widget-developer"
description: |
  Expert assistant for creating and modifying widgets in the hat-ring-components repository.
  Use this skill when the developer asks about widget creation, modification, configuration,
  data fetching, or WebsitesConfig setup.

  Trigger phrases (English): "create widget", "new widget", "add component", "modify widget",
  "widget config", "WebsitesConfig", "data fetching", "GetData", "add parameter",
  "widget parameter"

  Trigger phrases (Polish): "dodaj widget", "nowy komponent", "zmodyfikuj widget",
  "konfiguracja widgetu", "nowy parametr"
---

# Widget Developer Guide — hat-ring-components

## 1. Widget File Structure

Widgets live in `src/components/widgets/{category}/{WidgetName}/`:

| File | Purpose |
|---|---|
| `WidgetName.astro` | The Astro component |
| `WidgetNameGetData.ts` | Data fetching logic (GraphQL queries via `WebsiteApiProvider`) |
| `WidgetNameWebsitesConfig.ts` | CMS configuration schema for Website Manager |
| `types.ts` | Widget-specific TypeScript interfaces |

Categories: `common/`, `analytics/`, `Author/`, `Lists/`, `Story/`

---

## 2. Step-by-step: Creating a New Widget

### Step 1 — Create the directory

```
src/components/widgets/{category}/{WidgetName}/
```

### Step 2 — Create `WidgetName.astro`

```astro
---
import type { AppContext } from '../../types/types';
import type { WidgetNameConfig } from './types';
import { WidgetHelper_shouldHideWidget, WidgetHelper_renderEmptyWidget, WidgetHelper_getWidgetCssClasses } from '../../helpers/WidgetHelper';
import { WidgetName_getData } from './WidgetNameGetData';

const { context, widgetConfig } = Astro.props as {
    context: AppContext;
    widgetConfig: WidgetNameConfig;
};

let toRender: boolean | string = false;

if (WidgetHelper_shouldHideWidget(widgetConfig, context)) {
    toRender = WidgetHelper_renderEmptyWidget(widgetConfig);
}

const data = !toRender ? await WidgetName_getData(context, widgetConfig) : null;

if (!toRender && !data) {
    toRender = WidgetHelper_renderEmptyWidget(widgetConfig);
}
---
{toRender
    ? <Fragment set:html={toRender} />
    : <div class={WidgetHelper_getWidgetCssClasses("WidgetName", widgetConfig, context)}>
        <!-- widget content here -->
    </div>
}
```

**Key patterns:**

- Always destructure `{ context, widgetConfig }` from `Astro.props` with full typing.
- `let toRender` pattern: first check visibility, then fetch data, then validate.
- Use `WidgetHelper_shouldHideWidget` → `WidgetHelper_renderEmptyWidget` → data fetch → validate → render.
- Only fetch data when `!toRender` (widget is visible).
- Use `WidgetHelper_getWidgetCssClasses` for the root element's class.

### Step 3 — Create `WidgetNameGetData.ts`

```ts
import { WebsiteApiProvider } from '../../../providers/WebsiteApiProvider';
import { gql } from '@ringpublishing/graphql-api-client-got';
import type { AppContext } from '../../../types/types';
import type { WidgetNameConfig } from './types';

const QUERY = gql`
    query WidgetNameQuery($id: UUID!) {
        story(id: $id) {
            title
            // add fields as needed
        }
    }
`;

export async function WidgetName_getData(context: AppContext, widgetConfig: WidgetNameConfig) {
    const response = await WebsiteApiProvider.call(QUERY, { id: context.id }, widgetConfig?.cacheTTL);
    return response?.data?.story || null;
}
```

**Key patterns:**

- Function name: `WidgetName_getData` (follows `ModuleName_functionName` convention).
- Use `gql` tag from `@ringpublishing/graphql-api-client-got`.
- Always pass `widgetConfig?.cacheTTL` to `WebsiteApiProvider.call`.
- Return `null` if no data (handled by the `.astro` file).

### Step 4 — Create `WidgetNameWebsitesConfig.ts`

```ts
import {
    AbstractWebsitesWidgetConfigDefaultParams,
    AbstractWebsitesWidgetConfigParamsDescription,
} from '../../../types/abstracts';

export let WidgetNameWebsitesConfig = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "widgetName_wdg": {
            "name": "Widget Display Name",
            "description": "Description for Website Manager UI",
            "defaultParams": {
                ...AbstractWebsitesWidgetConfigDefaultParams,
                "widgetType": "WidgetName",
                // custom params with defaults:
                "myParam": "",
            },
            "paramsDescription": {
                ...AbstractWebsitesWidgetConfigParamsDescription,
                "myParam": {
                    "name": "My Param Label",
                    "description": "Description shown in Website Manager",
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

**Key rules:**

- Use `let` (not `const`) — this is a project convention.
- Always spread `AbstractWebsitesWidgetConfigDefaultParams` into `defaultParams`.
- Always spread `AbstractWebsitesWidgetConfigParamsDescription` into `paramsDescription`.
- Module key format: `camelCaseWidgetName_wdg`.
- `widgetType` must match the exported component name.
- Only add `cacheTTL` when the widget makes server-side API calls.
- Available field types: `"textfield"`, `"numberfield"`, `"checkbox"`, `"select"`, `"array"`.
- Top-level structure always has: `sections`, `defaultParams`, `paramsDescription`, `modules`.

### Step 5 — Create `types.ts`

```ts
import type { AbstractWidgetConfig } from '../../../types/abstracts';

export interface WidgetNameConfig extends AbstractWidgetConfig {
    myParam: string;
    cacheTTL?: number;
}
```

### Step 6 — Export the component in `src/index.ts`

```ts
export { default as WidgetName } from './components/widgets/{category}/WidgetName/WidgetName.astro';
```

### Step 7 — Export the config in `src/websitesApiConfigs.ts`

```ts
export { WidgetNameWebsitesConfig } from './components/widgets/{category}/WidgetName/WidgetNameWebsitesConfig';
```

### Step 8 — Create styles in `styles/widgets/WidgetName/WidgetName.module.scss`

```scss
.WidgetName {
    &:global {
        // child class styles
    }
}
```

---

## 3. Modifying an Existing Widget

### Adding a new parameter

1. Add the property to the `types.ts` interface.
2. Add a default value in `WebsitesConfig.ts` → `defaultParams`.
3. Add a field description in `WebsitesConfig.ts` → `paramsDescription`.
4. Use the parameter in `.astro` or `GetData.ts`.

### Adding data fetching

1. Extend the GraphQL query in `GetData.ts`.
2. Update types if the response shape changes.
3. Add `cacheTTL` to WebsitesConfig if not already present.

---

## 4. Extensible Widgets (BasicWidget, GenericList, StoryContent, Slider)

These widgets support custom item parts via `getFragment` functions:

```ts
// In an itemPart file:
export const getFragment = () => ({
    variables: {},
    query: gql`fragment MyPartQuery on SectionItem { url customField }`,
});
```

The parent widget merges all `getFragment` results into its main query, then passes the enriched data to each item part component.

---

## 5. Checklist & naming

**Common pitfalls:** export from BOTH `src/index.ts` AND `src/websitesApiConfigs.ts` · use `let` not `const` for WebsitesConfig · spread Abstract defaults · include `widgetType` matching component name · `cacheTTL` only for API widgets · never fetch data when `toRender` is set · CSS class = PascalCase matching component.

**Naming:** Component = PascalCase · GetData = `WidgetName_getData` · Config = `WidgetNameWebsitesConfig` · module key = `camelCase_wdg` · CSS class = `.WidgetName` · types = `WidgetNameConfig`
