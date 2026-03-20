> **When to read:** You're writing SCSS, fixing CSS issues, creating component styles, working with breakpoints, icons, or theming.

# HAT Framework — Styling System

---

## 1. CSS Modules Pattern

All component styles use **CSS Modules** with the `.module.scss` naming convention. This ensures class names are locally scoped and don't leak across components.

### Double-class selector for specificity

Every component's root styles use a **double-class selector** (`.MyComponent.MyComponent`) to guarantee sufficient specificity to override any framework defaults without resorting to `!important`:

```scss
.MyComponent.MyComponent {
    padding: 2rem;
    background: var(--bodyBg);
}
```

### `:global` blocks

Use `:global` blocks to style elements that are **not under CSS Modules control** — for example, CMS-generated HTML, child components rendered by the framework, or third-party markup:

```scss
.StoryContent.StoryContent {
    :global {
        .ParagraphBlock > p {
            font: var(--p15-22);
        }

        .ImageBlock {
            margin-bottom: 2rem;
        }

        a {
            color: var(--primaryColor);
            text-decoration: underline;
        }
    }
}
```

**Rules of thumb:**

- Keep `:global` blocks **inside** the double-class selector so they're still scoped to the component.
- Prefer targeting framework class names (`.ParagraphBlock`, `.ImageBlock`) over bare HTML tags when possible.
- Only use `:global` when you truly cannot apply a CSS Module class to the target element.

---

## 2. Breakpoint System

The framework follows a **mobile-first** approach: base styles target mobile, and wider screens are handled via ascending `min-width` media queries.

### Breakpoint variables

Defined in the project's `breakpoints.scss`:

```scss
$breakpoint-sm: 510px;       // Small mobile → tablet
$breakpoint-md: 768px;       // Tablet → desktop
$breakpoint-lg: 1024px;      // Desktop
$breakpoint-xl: 1440px;      // Large desktop

// Max variants (for max-width queries when needed):
$breakpoint-xs-max: 509px;
$breakpoint-sm-max: 767px;
$breakpoint-md-max: 1023px;
$breakpoint-lg-max: 1439px;
```

### Usage pattern

```scss
@import "../breakpoints";

.myElement {
    font-size: 1.5rem;  // mobile (base)

    @media (min-width: $breakpoint-md) {
        font-size: 2rem;  // tablet+
    }

    @media (min-width: $breakpoint-xl) {
        font-size: 2.5rem;  // large desktop
    }
}
```

**Guidelines:**

- Always write **mobile styles first** outside any media query.
- Use `min-width` media queries to layer on larger-screen styles.
- Avoid `max-width` queries unless you specifically need to target only a smaller range (use the `$breakpoint-*-max` variables for that).
- Always `@import "../breakpoints"` at the top of any `.module.scss` file that uses responsive styles.

---

## 3. CSS Custom Properties

Projects define their own CSS custom properties in `globals.scss` under the `:root` selector.

### Typography presets

Typography presets use the CSS `font` shorthand format: `weight size/line-height family`.

```scss
:root {
    // Headings
    --h48-72: 700 4.8rem/1.5 var(--font-primary-sans);  // bold, 48px, 1.5 line-height
    --h38-57: 700 3.8rem/1.5 var(--font-primary-sans);
    --h24-36: 700 2.4rem/1.5 var(--font-primary-sans);

    // Paragraphs
    --p20-30: 400 2.0rem/1.5 var(--font-primary);        // normal, 20px
    --p17-25: 400 1.7rem/1.47 var(--font-primary);
    --p15-22: 400 1.5rem/1.47 var(--font-primary);
    --p13-19: 400 1.3rem/1.46 var(--font-primary-sans);
}
```

Usage:

```scss
h1 { font: var(--h38-57); }
p  { font: var(--p17-25); }
```

**Naming convention:** `--{h|p}{size}-{line-height-approx}` — e.g., `--h48-72` means a heading preset at `4.8rem` with an approximate computed line-height of `7.2rem`.

### Spacing

```scss
:root {
    --ringGap: 1.6rem;            // Default gap between elements
    --ringGapLg: 3.4rem;          // Large gap (desktop)
    --containerPadding: 1.6rem;   // Horizontal padding (mobile)
    --containerPaddingLg: 2.5rem; // Horizontal padding (desktop)
}
```

### Colors

Projects define their brand palette as CSS custom properties:

```scss
:root {
    --primaryColor: #...;
    --bodyBg: #ffffff;
    --textColor: #...;
    // ... additional brand colors
}
```

### REM base

The `html` font-size is set to `62.5%` (making `1rem = 10px`) for easy rem calculations. It scales responsively:

```scss
html {
    font-size: 62.5%;                                         // 10px base

    @media (min-width: $breakpoint-md) { font-size: 50%; }   // 8px
    @media (min-width: $breakpoint-lg) { font-size: 56%; }   // ~9px
    @media (min-width: $breakpoint-xl) { font-size: 62.5%; } // 10px
}
```

This means:

- `1.6rem` = `16px` at default zoom on mobile and large desktop.
- On tablet (`$breakpoint-md`), `1.6rem` = `12.8px` — everything scales down slightly.
- Always use `rem` for sizing; avoid `px` except for borders and box-shadows.

---

## 4. Icon Font System

Projects can define a custom icon font. The system consists of an icon map and a mixin.

### Icon map and mixin

```scss
// icons.scss
$icons: (
    arrow-down: "\e905",
    arrow-up: "\e907",
    search: "\e904",
    play: "\e90a",
    facebook: "\e900",
    // ... more icons
);

@mixin icon($position: before, $icon: false) {
    &:#{$position} {
        @if $icon {
            content: "#{map-get($icons, $icon)}";
        }
        font-family: var(--font-icons);
        speak: never;
        font-style: normal;
        font-weight: normal;
        text-transform: none;
        line-height: 1;
        -webkit-font-smoothing: antialiased;
        @content;
    }
}
```

### Usage

```scss
@import "../icons";

.searchButton {
    @include icon(before, search) {
        color: var(--primaryColor);
        margin-right: 0.5rem;
    }
}

.externalLink {
    @include icon(after, arrow-right) {
        font-size: 0.8em;
        margin-left: 0.3rem;
    }
}
```

**Parameters:**

| Parameter    | Default    | Description                                 |
|-------------|-----------|---------------------------------------------|
| `$position` | `before`  | Pseudo-element: `before` or `after`         |
| `$icon`     | `false`   | Icon name from the `$icons` map             |

The `@content` block lets you pass additional styles to the pseudo-element (color, size, margin, etc.).

---

## 5. Button Mixins

Projects define reusable button styles in `buttonsMixins.scss`:

```scss
// buttonsMixins.scss

@mixin btnPrimaryBig() {
    padding: 1rem;
    background-color: var(--primaryColor);
    color: var(--white);
    font-family: var(--font-primary-sans);
    font-weight: 700;
    border-radius: 0.8rem;
    transition: box-shadow 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);

    &:hover {
        box-shadow: 0px 4px 4px 0px rgba(black, 0.4);
    }
}

@mixin btnPrimarySmall() {
    padding: 1rem;
    background-color: var(--primaryColor);
    color: var(--white);
    font: var(--p13-19);
    border-radius: 0.8rem;
    transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);

    &:hover {
        box-shadow: 0px 4px 4px 0px rgba(black, 0.4);
    }
}
```

### Usage

```scss
@import "../buttonsMixins";

.submitButton {
    @include btnPrimaryBig();
    width: 100%;

    @media (min-width: $breakpoint-md) {
        width: auto;
    }
}
```

Button mixins use CSS custom properties for colors, so they automatically adapt to theming (e.g., dark mode).

---

## 6. Grid Styling

The framework's Grid uses a **12-column CSS Grid** system that activates at the tablet breakpoint.

### Grid container

```scss
.gridContainer {
    @media (min-width: $breakpoint-md) {
        display: grid;
        grid-template-columns: repeat(12, [col-start] 1fr);
        gap: var(--gridGap, var(--ringGap, 20px));
    }
}
```

### Dynamic column and width classes

The grid generates classes for spanning columns:

```scss
// Dynamic column classes: .gridCol1 through .gridCol12
// Controls which column a widget starts at
.gridCol1  { grid-column-start: 1; }
.gridCol2  { grid-column-start: 2; }
// ... through .gridCol12

// Dynamic width classes: .gridWidth1 through .gridWidth12
// Controls how many columns a widget spans
.gridWidth1  { grid-column-end: span 1; }
.gridWidth2  { grid-column-end: span 2; }
// ... through .gridWidth12
```

### Position classes

```scss
.gridPositionLeft   { float: left; }
.gridPositionRight  { float: right; }
.gridPositionCenter { margin-left: auto; margin-right: auto; }
```

### BasicWidget internal grid

`BasicWidget` also uses an internal 12-column grid for its child items:

```scss
.BasicWidget.BasicWidget {
    :global {
        @media (min-width: $breakpoint-md) {
            .SectionElements,
            .ListElements {
                display: grid;
                grid-template-columns: repeat(12, 1fr);
                gap: var(--basicWidgetGap, var(--ringGap, 20px));
            }

            .Item {
                &.col1  { grid-column: auto / span 1; }
                &.col2  { grid-column: auto / span 2; }
                &.col3  { grid-column: auto / span 3; }
                &.col4  { grid-column: auto / span 4; }
                &.col6  { grid-column: auto / span 6; }
                &.col12 { grid-column: auto / span 12; }
                // ... all values from col1 through col12
            }
        }
    }
}
```

---

## 7. Component SCSS File Organization

### Typical project structure

```
src/styles/
├── globals.scss              ← :root variables, fonts, global layout
├── breakpoints.scss          ← $breakpoint-* variables
├── icons.scss                ← Icon map + @mixin icon
├── buttonsMixins.scss        ← Shared button mixins
├── BasicWidget/
│   ├── BasicWidget.module.scss        ← Main (imports sub-modules)
│   ├── BasicWidget.common.module.scss ← Shared BasicWidget styles
│   └── BasicWidget.variant.module.scss ← Variant-specific styles
├── StoryContent.module.scss
├── Menu/
│   └── Menu.module.scss
└── ...
```

### Import patterns

At the top of any component `.module.scss` file, import the utilities you need:

```scss
@import "../breakpoints";    // Always needed for responsive styles
@import "../icons";          // When using the icon mixin
@import "../buttonsMixins";  // When using button styles
```

### Sub-module composition

Larger components split styles into sub-modules and compose them in the main file:

```scss
// BasicWidget.module.scss
@import "../breakpoints";
@import 'BasicWidget.common.module';
@import 'BasicWidget.variant1.module';
@import 'BasicWidget.variant2.module';

.BasicWidget.BasicWidget {
    // Base styles that apply to all variants
}
```

Each sub-module file uses the same double-class pattern and can add variant-specific styles:

```scss
// BasicWidget.variant1.module.scss
.BasicWidget.BasicWidget {
    :global(.variant1) {
        // Styles specific to variant1
    }
}
```

---

## 8. CSS Modules Injection into Components

Projects inject CSS Modules into the framework via a `cssModules.ts` file:

```typescript
// src/cssModules.ts
import styles from "./styles/BasicWidget/BasicWidget.module.scss";
import storyStyles from "./styles/StoryContent.module.scss";
import menuStyles from "./styles/Menu/Menu.module.scss";
// ... more imports

export const cssModules = {
    BasicWidget: styles,
    StoryContent: storyStyles,
    Menu: menuStyles,
    // ... more mappings
};
```

These are added to `context.cssModules` during application setup, making them accessible in all widgets. When a widget renders, it looks up its styles from `context.cssModules[widgetName]` and applies the scoped class names.

**Key points:**

- The keys in `cssModules` must match the widget/component names used by the framework.
- Each value is the default export from a `.module.scss` file (an object mapping local class names to generated unique names).
- If you create a new component with custom styles, you must add it to `cssModules.ts` for the styles to take effect.

---

## 9. Dark Mode

Dark mode is supported via the `[data-theme="dark"]` attribute selector on the root element. Override CSS custom properties inside this selector:

```scss
:root {
    --bodyBg: #ffffff;
    --textColor: #2A2E31;
    --primaryColor: #F25D19;
    --cardBg: #F8F8F8;
}

[data-theme="dark"] {
    --bodyBg: #191919;
    --textColor: #F3F5F7;
    --primaryColor: #FF7A3D;
    --cardBg: #2A2E31;
}
```

**Guidelines:**

- All color values in component styles should reference CSS custom properties (`var(--textColor)`) rather than hard-coded hex values.
- Dark mode works automatically when components use custom properties — no component-level changes needed.
- Test both themes when adding new color references.

---

## 10. Project Customization Pattern

To customize styling in a HAT project, follow this order:

1. **Define brand variables** in `globals.scss` under `:root` — colors, typography presets, spacing, font families.
2. **Define the icon font** in `icons.scss` — the icon map and the `@mixin icon`.
3. **Define breakpoints** in `breakpoints.scss` — usually the same as framework defaults, but can be customized.
4. **Create component-specific `.module.scss` files** — use the double-class pattern and `:global` blocks as needed.
5. **Import into `cssModules.ts`** and inject into context — this connects your styles to the framework components.
6. **Override framework styles** by using higher specificity — the double-class selector (`.MyComponent.MyComponent`) or `:global` targeting.

**Important reminders:**

- Never use `!important` — use specificity strategies instead.
- Always use `rem` units (based on the 62.5% html font-size).
- Keep `:global` blocks scoped inside component selectors.
- Use CSS custom properties for all colors and spacing to support theming.
- Follow the mobile-first pattern for all responsive styles.
