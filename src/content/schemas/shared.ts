import { z } from "astro:content";

// Constants for common patterns
export const DATA_PATHS = {
	blog: "./src/data/blog",
	authors: "./src/data/authors",
	footer: "./src/data/footer",
	services: "./src/data/services",
	careers: "./src/data/careers",
	projects: "./src/data/projects",
	resume: "./src/data/resume",
	otherPages: "./src/data/otherPages",
	codeToggles: "./src/data/codeToggles",
	homepage: {
		about: "./src/data/homepage/about",
		aboutMe: "./src/data/homepage/aboutMe",
		warranty: "./src/data/homepage/warranty",
		gallery: "./src/data/homepage/gallery",
		location: "./src/data/homepage/location",
		hero: "./src/data/homepage/hero",
	},
} as const;

export const PATTERNS = {
	markdown: "**/[^_]*{md,mdx}",
	yaml: "**/[^_]*{yaml,yml}",
	yamlIndex: "**/index.{yaml,yml}",
	json: "**/[^_]*.{json,jsonc}",
} as const;

// Common schema builders
export const createBaseSchema = () => ({
	mappingKey: z.string().optional(),
	draft: z.boolean().optional(),
});

export const createContentSchema = () => ({
	title: z.string(),
	description: z.string(),
	...createBaseSchema(),
});

export const createDateTransform = () =>
	z
		.string()
		.or(z.date())
		.transform((val) => new Date(val));

export const createOptionalDateTransform = () =>
	z
		.string()
		.or(z.date())
		.optional()
		.transform((str) => (str ? new Date(str) : undefined));

// Validation helpers
export const emailSchema = z.string().email();
export const urlSchema = z.string().url();
export const linkSchema = z.string(); // Allow relative paths like /contact
