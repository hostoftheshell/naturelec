import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

import {
	createBaseSchema,
	createContentSchema,
	createDateTransform,
	DATA_PATHS,
	PATTERNS,
	urlSchema,
} from "./shared.js";

/**
 * Footer configuration
 */
export const footerCollection = defineCollection({
	loader: glob({
		pattern: PATTERNS.yaml,
		base: DATA_PATHS.footer,
	}),
	schema: () =>
		z.object({
			footerLine: z.string(),
		}),
});

/**
 * Projects collection
 */
export const projectsCollection = defineCollection({
	loader: glob({
		pattern: PATTERNS.markdown,
		base: DATA_PATHS.projects,
	}),
	schema: ({ image }) =>
		z.object({
			...createContentSchema(),
			image: image(),
			technologies: z.array(z.string()),
			demoUrl: urlSchema.optional(),
			githubUrl: urlSchema.optional(),
			completionDate: z.date(),
			keyFeatures: z.array(z.string()),
			order: z.number().optional(),
		}),
});

/**
 * Careers/job postings collection
 */
export const careersCollection = defineCollection({
	loader: glob({
		pattern: PATTERNS.markdown,
		base: DATA_PATHS.careers,
	}),
	schema: () =>
		z.object({
			...createContentSchema(),
			category: z.string(),
			location: z.string(),
			type: z.enum(["Full-time", "Part-time", "Contract", "Remote"]),
			requirements: z.array(z.string()),
			applicationUrl: urlSchema,
			publishDate: createDateTransform(),
			draft: z.boolean().optional().default(false),
		}),
});

/**
 * Resume collection with comprehensive professional information
 */
export const resumeCollection = defineCollection({
	loader: glob({
		pattern: PATTERNS.json,
		base: DATA_PATHS.resume,
	}),
	schema: ({ image }) =>
		z.object({
			diplomas: z.array(
				z.object({
					title: z.string(),
					school: z.string(),
					year: z.number(),
				}),
			),
			certifications: z.array(
				z.object({
					title: z.string(),
					year: z.number(),
				}),
			),
			experience: z.array(
				z.object({
					title: z.string(),
					company: z.string(),
					companyImage: image(),
					dates: z.string(),
					location: z.string(),
					responsibilities: z.array(z.string()),
				}),
			),
			hardSkills: z.array(
				z.object({
					skill: z.string(),
					percentage: z.number().min(0).max(100),
				}),
			),
			softSkills: z.array(
				z.object({
					skill: z.string(),
					icon: z.string(),
				}),
			),
			languages: z.array(
				z.object({
					language: z.string(),
					level: z.number().min(1).max(10),
				}),
			),
			tools: z.array(
				z.object({
					name: z.string(),
					category: z.string(),
					image: image(),
					link: urlSchema,
				}),
			),
			...createBaseSchema(),
		}),
});

/**
 * Other pages collection for general content pages
 */
export const otherPagesCollection = defineCollection({
	loader: glob({
		pattern: PATTERNS.markdown,
		base: DATA_PATHS.otherPages,
	}),
	schema: () => z.object(createContentSchema()),
});

/**
 * Code toggle collection for interactive code examples
 */
export const codeToggleCollection = defineCollection({
	loader: glob({
		pattern: PATTERNS.markdown,
		base: DATA_PATHS.codeToggles,
	}),
	schema: () =>
		z.object({
			language: z.string(),
			order: z.number(),
			icon: z.string().optional(),
			draft: z.boolean().optional(),
		}),
});
