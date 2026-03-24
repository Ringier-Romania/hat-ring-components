> **When to read:** You're working with page layout, containers, boxes, widget placement, or the 12-column grid.

## 1. Grid Hierarchy

```
Grid.astro (page-level)
  └── Container.astro (section: "header", "content", "sidebar", "footer")
        └── Box.astro (position: "box_top", "box_left", "box_middle", "box_right", "box_bottom")
              └── Widget.astro (individual widget renderer)
                    └── Actual widget component (BasicWidget, StoryTitle, etc.)
```

## 2. Grid.astro

Props: `{ context: AppContext, config: { containers: string[], boxes?: string[] } }`

- `containers`: Array of section names to render (e.g., `["header", "content", "footer"]`)
- `boxes`: Default box names (default: `["box_top", "box_left", "box_middle", "box_right", "box_bottom"]`)
- Fetches widget configurations from CMS via GraphQL (config for current variant/node)
- Renders one Container per section

## 3. Container.astro

Renders boxes for a section. Maps widgets to their configured boxes. Each box gets a `Box.astro`.

## 4. Box.astro

Contains widgets for a box position. Manages WrapperStart/WrapperEnd grouping. Each widget gets a `Widget.astro`.

## 5. Widget.astro

Individual widget renderer. Loads widget component by name from `context.customData.widgets`. Applies visibility logic (platform, gridLocation). Passes `(context, widgetConfig)` to the actual component.

## 6. Grid Configuration from CMS

Widget placement is defined in the CMS admin. Each page type has its own grid config:

- **GridHomeWebsitesConfig** — Homepage layout
- **GridStoryWebsitesConfig** — Story detail page
- **GridListWebsitesConfig** — Category/list pages
- **GridSearchWebsitesConfig** — Search results
- **GridTopicWebsitesConfig** — Topic pages
- **GridAuthorWebsitesConfig** — Author pages
- **HeaderFooterWebsitesConfig** — Shared header/footer

## 7. Grid CSS (12-Column System)

```scss
.gridContainer {
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: repeat(12, [col-start] 1fr);
        gap: var(--gridGap, var(--ringGap, 20px));
    }
}
// Generated classes:
.gridCol1 through .gridCol12 { grid-column: auto / span N; }
.gridWidth1 through .gridWidth12 { width: calc(N / 12 * 100%); }
.gridPositionLeft { float: left; }
.gridPositionRight { float: right; }
.gridPositionCenter { margin: 0 auto; }
```

## 8. WrapperStart / WrapperEnd

Special pseudo-widgets that wrap groups of widgets in HTML containers. Useful for creating sidebar-like layouts or grouping widgets within a box. They don't render content — they provide opening/closing HTML tags.

## 9. Using Grid in Pages

```astro
---
import { Grid } from "hat-ring-components";
const context = /* ... build AppContext ... */;
---
<Layout context={context}>
    <Grid context={context} config={{
        containers: ['header', 'main_content', 'sidebar', 'footer'],
        boxes: ['box_top', 'box_left', 'box_middle', 'box_right', 'box_bottom']
    }} />
</Layout>
```

## 10. Widget Sizing

Widgets can specify their column span via `customWidth` (1–12) in widgetConfig. This generates `gridWidget gridWidthN` CSS classes, allowing fine-grained control over widget width within a box.
