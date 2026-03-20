> **When to read:** You're creating or configuring slots — dynamic components embedded within story content.

## 1. What Are Slots?

Slots are dynamic components that can be inserted **within story content** by editors in the CMS. Unlike widgets (which live in Grid boxes), slots appear inline within article text — between paragraphs, after headings, etc.

## 2. How Slots Work

When the CMS editor inserts a slot into story content, it creates a `SlotBlock` in the story's content blocks. During rendering:

1. `StoryHelper_generateContentHtml` processes content blocks
2. When it encounters a `SlotBlock`, it looks up the slot by name
3. The slot component is rendered inline within the content

## 3. SlotBlock in GraphQL

```graphql
...on SlotBlock {
    slotName      # Name/identifier of the slot
    # Additional slot-specific data
}
```

## 4. Registering Slots

Slots are registered in `src/components/slots/index.ts`:

```typescript
export { default as MySlot } from "./MySlot/MySlot.astro";
```

Then exported in `src/widgets.ts`:

```typescript
import * as localSlots from "./components/slots";
export const slots = Object.assign({}, localSlots);
```

## 5. Creating a Custom Slot

```astro
---
// src/components/slots/MySlot/MySlot.astro
const { context, slotConfig } = Astro.props;
// slotConfig contains data from the CMS slot block
---
<div class="my-slot">
    <!-- Slot content (e.g., embed, poll, interactive element) -->
    <script src={slotConfig.scriptUrl}></script>
</div>
```

## 6. Common Slot Examples

- **Poll embed** — Renders an external poll widget (e.g., Pinpoll)
- **Social embed** — Embedded social media posts
- **Newsletter signup** — Inline newsletter form within article
- **Ad slot** — In-content advertisement
- **Related content** — Curated story recommendations within article

## 7. Slot vs Widget

| | Widget | Slot |
|---|---|---|
| **Placement** | Grid boxes (header, sidebar, footer) | Inline within story content |
| **Configured by** | CMS grid layout | CMS content editor (per-story) |
| **Registered in** | widgets.ts `widgets` export | widgets.ts `slots` export |
| **Rendered by** | Grid → Box → Widget pipeline | StoryContent → SlotBlock handler |
