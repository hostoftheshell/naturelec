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
 * Homepage hero section
 */
export const homepageHeroCollection = defineCollection({
	loader: glob({
		pattern: PATTERNS.yamlIndex,
		base: DATA_PATHS.homepage.hero,
	}),
	schema: () =>
		z.object({
			heroTitlePrefix: z.string(),
			heroTitleSuffix: z.string(),
			heroDescription: z.string().min(10).max(500),
			buttonText: z.string(),
			buttonHref: linkSchema,
		}),
});

/**
 * Homepage about section
 */
export const homepageAboutCollection = defineCollection({
	loader: glob({
		pattern: PATTERNS.yaml,
		base: DATA_PATHS.homepage.about,
	}),
	schema: ({ image }) =>
		z.object({
			...createContentSchema(),
			image: image().optional(),
			imageAlt: z.string().optional(),
		}),
});

/**
 * Homepage about me section with facts
 */
export const homepageAboutMeCollection = defineCollection({
	loader: glob({
		pattern: PATTERNS.yaml,
		base: DATA_PATHS.homepage.aboutMe,
	}),
	schema: ({ image }) =>
		z.object({
			sectionTitle: z.string(),
			sectionDescription: z.string(),
			image: image().optional(),
			imageAlt: z.string().optional(),
			facts: z.array(
				z.object({
					icon: z.string(),
					title: z.string(),
					description: z.string(),
				}),
			),
		}),
});

/**
 * Homepage warranties section
 */
export const homepageWarrantiesCollection = defineCollection({
	loader: glob({
		pattern: PATTERNS.yamlIndex,
		base: DATA_PATHS.homepage.warranty,
	}),
	schema: ({ image }) =>
		z.object({
			sectionTitle: z.string(),
			buttonText: z.string(),
			buttonHref: linkSchema,
			sectionImage: image(),
			sectionImageAlt: z.string().max(125, "Alt text limited to 125 characters"),
			...createBaseSchema(),
			sectionList: z.array(
				z.object({
					title: z.string(),
					description: z.string(),
				}),
			),
		}),
});

/**
 * Homepage gallery/lightbox marquee section
 */
export const homepageGalleryCollection = defineCollection({
	loader: glob({
		pattern: PATTERNS.yamlIndex,
		base: DATA_PATHS.homepage.gallery,
	}),
	schema: ({ image }) =>
		z.object({
			sectionBadge: z.string(),
			sectionTitle: z.string(),
			sectionDescription: z.string(),
			sectionGallery: z.array(
				z.object({
					image: image(),
					alt: z.string(),
					caption: z.string(),
					role: z.enum(["top", "middle", "bottom"]),
				}),
			),
		}),
});

/**
 * Homepage location section
 */
export const homepageLocationCollection = defineCollection({
	loader: glob({
		pattern: PATTERNS.yamlIndex,
		base: DATA_PATHS.homepage.location,
	}),
	schema: () =>
		z.object({
			sectionBadge: z.string(),
			sectionTitle: z.string(),
			sectionDescription: z.string().min(10).max(500),
			buttonText: z.string(),
			buttonHref: linkSchema,
			locations: z.array(z.string()).min(1),
			...createBaseSchema(),
		}),
});
