## About `fields.document`

The `fields.document` field has been **superseded** by newer field types. According to the official documentation, `fields.markdoc` has replaced the document field, and `fields.mdx` is also available if you prefer MDX.[^1]

The document field supports the features you mentioned:

- Paragraphs, headings, lists, links
- Inline formatting (bold, italic, code, strikethrough)
- Additional features like images, tables, dividers, and custom component blocks

## Rendering Document Field Content

To render content from the `fields.document` field, you need to use the `DocumentRenderer` component provided by Keystatic. The document field returns a complex JSON object with structured data, and the DocumentRenderer handles converting this into renderable HTML.[^2]

However, there's limited current documentation about the DocumentRenderer because Keystatic has moved toward the newer `markdoc` and `mdx` fields.[^3]

## Simpler Alternatives for Astro Projects

### 1. Use `fields.markdoc` (Recommended)

The modern replacement for the document field is `fields.markdoc`, which integrates seamlessly with Astro:

```typescript
content: fields.markdoc({
  label: "Content",
  options: {
    image: {
      directory: "src/content/posts",
      publicPath: "/src/content/posts/",
    },
  },
});
```

**Benefits for Astro:**

- Works directly with Astro's built-in Markdoc integration
- No need for custom rendering components
- Better TypeScript support
- More capable editor than the old document field[^4]

### 2. Rendering Markdoc in Astro

With `fields.markdoc`, rendering is much simpler in Astro. You can use Astro's native Markdoc support:

```astro
---
import { Markdoc } from "@astrojs/markdoc/components";
import { reader } from "../utils/keystatic";

const post = await reader.collections.posts.read(slug);
const content = await post.content();
---

<Markdoc content={content} />
```

### 3. Using Astro Content Collections

The simplest approach is to leverage Astro's Content Collections with Keystatic, which handles rendering automatically:

```typescript
// In your Astro page
---
import { getCollection } from 'astro:content';

const posts = await getCollection('posts');
const { Content } = await post.render();
---

<Content />
```

## Setup for Astro + Keystatic

To use the modern approach:

1. Install dependencies:

```bash
npx astro add react markdoc
npm install @keystatic/core @keystatic/astro
```

2. Configure `astro.config.mjs`:

```javascript
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";

export default defineConfig({
  integrations: [react(), markdoc(), keystatic()],
});
```

3. Use `fields.markdoc` instead of `fields.document` in your Keystatic config.[^5][^6]

## Conclusion

**Yes, there is a simpler way** for Astro projects: use `fields.markdoc` instead of `fields.document`. This approach eliminates the need to manually handle DocumentRenderer and provides better integration with Astro's native Markdoc support. The markdoc field offers the same rich text editing capabilities you need while being much easier to render in Astro applications.[^5][^4]
<span style="display:none">[^10][^11][^12][^13][^14][^15][^16][^17][^18][^19][^20][^21][^22][^23][^24][^25][^26][^27][^28][^29][^30][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://keystatic.com/docs/fields/document

[^2]: https://keystatic.com/docs/reader-api

[^3]: https://github.com/Thinkmill/keystatic/discussions/902

[^4]: https://keystatic.com/docs/fields/markdoc

[^5]: https://jankraus.net/2025/02/25/a-simple-guide-to-using-astro-with-keystatic/

[^6]: https://keystatic.com/docs/installation-astro

[^7]: https://armno.in.th/blog/exploring-keystatic/

[^8]: https://docs.astro.build/en/guides/cms/keystatic/

[^9]: https://github.com/Thinkmill/keystatic/discussions/931

[^10]: https://github.com/Thinkmill/keystatic/discussions/361

[^11]: https://www.youtube.com/watch?v=14-JzBb4lWw

[^12]: https://cosmicthemes.com/docs/keystatic/

[^13]: https://keystatic.com/docs/format-options

[^14]: https://docs.astro.build/en/reference/integrations-reference/

[^15]: https://www.youtube.com/watch?v=BYZyOaUvfGs

[^16]: https://github.com/Thinkmill/keystatic/issues/531

[^17]: https://www.youtube.com/playlist?list=PLHrxuCR-0CcSYiE76aEeYq7jEuwYP6NwJ

[^18]: https://garden.mirahi.io/how-to-create-a-blog-using-astro-and-keystatic/

[^19]: https://www.wisp.blog/compare/keystatic/payload

[^20]: https://keystatic.com/docs/recipes/astro-images

[^21]: https://github.com/Thinkmill/keystatic/discussions/1074

[^22]: https://maciekpalmowski.dev/blog/keystatic-x-astro/

[^23]: https://www.youtube.com/watch?v=LPLZ3eoh8fQ

[^24]: https://www.youtube.com/watch?v=tzPL0yhLBTw

[^25]: https://stackoverflow.com/questions/36683770/how-to-get-the-value-of-an-input-field-using-reactjs

[^26]: https://keystonejs.com/docs/guides/document-fields

[^27]: https://github.com/Thinkmill/keystatic/issues/1030

[^28]: https://nibras.co/keystatic-the-last-framework-hop/

[^29]: https://keystatic.com/docs/installation-next-js

[^30]: https://docs.astro.build/en/guides/content-collections/
