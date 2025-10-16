import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

import {
	createBaseSchema,
	createContentSchema,
	DATA_PATHS,
	linkSchema,
	PATTERNS,
} from "./shared.js";

/**
 * Services page intro section
 */
export const servicespageIntroCollection = defineCollection({
	loader: glob({
		pattern: PATTERNS.yamlIndex,
		base: DATA_PATHS.servicespage.intro,
	}),
	schema: ({ image }) =>
		z.object({
			servicesPageIntroTitle: z.string(),
			servicesPageIntroDescription: z.string(),
			servicesPageIntroImage: image().optional(),
			servicesPageIntroImageAlt: z.string(),
			expertise: z.object({
				sectionTitle: z.string(),
				expertiseAreas: z.array(
					z.object({
						title: z.string(),
						anchorLink: z.string(),
						description: z.string(),
					}),
				),
			}),
		}),
});

/**
 * Services page - Additional services section
 */
export const servicespageAdditionalCollection = defineCollection({
	loader: glob({
		pattern: PATTERNS.json,
		base: DATA_PATHS.servicespage.additionals,
	}),
	schema: ({ image }) =>
		z.object({
			additionalServicesBadge: z.string().optional(),

			additionalServicesTitle: z.object({
				name: z.string(),
				slug: z.string(),
			}),

			additionalServicesDescription: z.string(),

			additionalServices: z.array(
				z.object({
					title: z.string().optional(),
					description: z
						.any() // Keystatic rich text (document)
						.optional(),
					image: image().optional(),
					imageAlt: z.string().optional(),
					caption: z.string().optional(),
				}),
			),
		}),
});
