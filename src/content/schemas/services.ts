import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

import { createBaseSchema, DATA_PATHS, PATTERNS } from "./shared.js";

/**
 * Service display location type
 */
export type ServiceDisplayLocation = "homepage" | "servicespage";

/**
 * Service item types - text or picture variant
 */
export const serviceTextVariantSchema = z.object({
	icon: z.string().optional(),
	title: z.string().optional(),
	description: z.any(), // Keystatic document type
});

export const servicePictureVariantSchema = z.object({
	image: z.string().optional(),
	imageAlt: z.string().optional(),
	caption: z.string().optional(),
});

export const serviceItemSchema = z.discriminatedUnion("discriminant", [
	z.object({
		discriminant: z.literal("text"),
		value: serviceTextVariantSchema,
	}),
	z.object({
		discriminant: z.literal("picture"),
		value: servicePictureVariantSchema,
	}),
]);

/**
 * Services collection - handles service categories with nested services
 * Format: JSON (no MDX content)
 */
export const servicesCollection = defineCollection({
	loader: glob({
		pattern: PATTERNS.json,
		base: DATA_PATHS.services,
	}),
	schema: () =>
		z.object({
			badge: z.string().optional(),
			title: z.string(),
			description: z.string(),
			order: z.number().optional().default(0),
			image: z.string(),
			imageAlt: z.string(),
			displayLocation: z.array(z.enum(["homepage", "servicespage"])).default(["servicespage"]),
			services: z.array(serviceItemSchema).default([]),
			...createBaseSchema(),
		}),
});

// Export inferred types for use in components
export type ServiceTextVariant = z.infer<typeof serviceTextVariantSchema>;
export type ServicePictureVariant = z.infer<typeof servicePictureVariantSchema>;
export type ServiceItem = z.infer<typeof serviceItemSchema>;
