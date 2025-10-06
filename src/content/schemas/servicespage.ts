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
