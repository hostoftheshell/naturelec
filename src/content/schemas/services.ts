import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

import { createBaseSchema, createContentSchema, DATA_PATHS, PATTERNS } from "./shared.js";

/**
 * Services collection - handles both categories and individual services
 */
export const servicesCollection = defineCollection({
	loader: glob({
		pattern: PATTERNS.markdown,
		base: DATA_PATHS.services,
	}),
	schema: ({ image }) =>
		z.discriminatedUnion("type", [
			// Category schema
			z.object({
				type: z.literal("category"),
				...createContentSchema(),
				order: z.number().optional(),
			}),
			// Service schema
			z.object({
				type: z.literal("service"),
				title: z.string(),
				titleLong: z.string(),
				description: z.string(),
				category: z.string().optional(),
				icon: z.string(),
				image: image(),
				order: z.number().optional(),
				...createBaseSchema(),
			}),
		]),
});
