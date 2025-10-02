import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

import {
	createContentSchema,
	createDateTransform,
	createOptionalDateTransform,
	DATA_PATHS,
	emailSchema,
	PATTERNS,
	urlSchema,
} from "./shared.js";

/**
 * Blog collection - handles blog posts with authors, categories, and tags
 */
export const blogCollection = defineCollection({
	loader: glob({
		pattern: PATTERNS.markdown,
		base: DATA_PATHS.blog,
	}),
	schema: ({ image }) =>
		z.object({
			...createContentSchema(),
			authors: z.array(reference("authors")),
			pubDate: createDateTransform(),
			updatedDate: createOptionalDateTransform(),
			heroImage: image().optional(),
			categories: z.array(z.string()),
			tags: z.array(z.string()),
		}),
});

/**
 * Authors collection - blog post authors information
 */
export const authorsCollection = defineCollection({
	loader: glob({
		pattern: PATTERNS.markdown,
		base: DATA_PATHS.authors,
	}),
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			avatar: image(),
			about: z.string(),
			email: emailSchema,
			authorLink: urlSchema,
		}),
});
