/**
 * Shared utilities and common field configurations for Keystatic schemas
 */

import { fields } from "@keystatic/core";

import { locales } from "@/config/siteSettings.json";

// Type for locale parameter
export type Locale = (typeof locales)[number];

// Common field creators
export const createTextField = (
	label: string,
	options: {
		multiline?: boolean;
		description?: string;
		validation?: {
			isRequired?: boolean;
			length?: { min?: number; max?: number };
		};
	} = {},
) =>
	fields.text({
		label,
		multiline: options.multiline || false,
		description: options.description,
		validation: {
			isRequired: options.validation?.isRequired ?? true,
			...(options.validation?.length && { length: options.validation.length }),
		},
	});

export const createSlugField = (
	options: {
		nameLabel?: string;
		slugLabel?: string;
		slugDescription?: string;
	} = {},
) =>
	fields.slug({
		name: {
			label: options.nameLabel || "Title",
			validation: { isRequired: true },
		},
		slug: {
			label: options.slugLabel || "SEO-friendly slug",
			description: options.slugDescription || "Never change the slug once a file is published!",
		},
	});

export const createImageField = (
	label: string,
	options: {
		directory?: string;
		publicPath?: string;
		validation?: { isRequired?: boolean };
		description?: string;
	} = {},
) =>
	fields.image({
		label,
		description: options.description,
		directory: options.directory || "src/assets/images",
		publicPath: options.publicPath || "../",
		validation: {
			isRequired: options.validation?.isRequired ?? true,
		},
	});

export const createDateField = (
	label: string = "Date",
	options: {
		description?: string;
		validation?: { isRequired?: boolean };
	} = {},
) =>
	fields.date({
		label,
		description: options.description,
		validation: {
			isRequired: options.validation?.isRequired ?? true,
		},
	});

export const createCheckboxField = (label: string, description?: string) =>
	fields.checkbox({
		label,
		description,
	});

export const createSelectField = <T extends string>(
	label: string,
	options: Array<{ label: string; value: T }>,
	defaultValue: T,
	description?: string,
) =>
	fields.select({
		label,
		description,
		options,
		defaultValue,
	});

export const createUrlField = (
	label: string,
	options: {
		description?: string;
		validation?: { isRequired?: boolean };
	} = {},
) =>
	fields.url({
		label,
		description: options.description,
		validation: {
			isRequired: options.validation?.isRequired ?? true,
		},
	});

export const createNumberField = (
	label: string,
	options: {
		description?: string;
		validation?: {
			isRequired?: boolean;
			min?: number;
			max?: number;
		};
	} = {},
) =>
	fields.number({
		label,
		description: options.description,
		validation: options.validation,
	});

// Common field combinations
export const createMappingKeyField = () =>
	fields.text({
		label: "Mapping Key",
		description: "This is used to map entries between languages.",
		validation: { isRequired: false },
	});

export const createDraftField = (entityType: string = "item") =>
	fields.checkbox({
		label: "Draft",
		description: `Set this ${entityType} as draft to prevent it from being published.`,
	});

export const createButtonFields = () => ({
	buttonText: createTextField("Libellé du bouton", {
		description: "Texte du bouton d'appel à l'action",
	}),
	buttonHref: createTextField("Lien du bouton", {
		description: "URL ou chemin du bouton (par exemple, /contact)",
	}),
});

// MDX content field with common options
export const createMDXContentField = (
	locale: Locale,
	contentPath: string,
	label: string = "Content",
) =>
	fields.mdx({
		label,
		options: {
			bold: true,
			italic: true,
			strikethrough: true,
			code: true,
			heading: [2, 3, 4, 5, 6],
			blockquote: true,
			orderedList: true,
			unorderedList: true,
			table: true,
			link: true,
			image: {
				directory: `src/data/${contentPath}/${locale}/`,
				publicPath: "../",
			},
			divider: true,
			codeBlock: true,
		},
		components: {
			// Note: ComponentBlocks import will need to be handled in individual files
		},
	});

// Common validation patterns
export const VALIDATION_PATTERNS = {
	shortText: { length: { min: 1, max: 160 } },
	description: { length: { min: 10, max: 500 } },
	altText: { length: { max: 150 } },
	required: { isRequired: true },
	optional: { isRequired: false },

	// Nouveau pattern pour les slugs/anchors
	anchorSlug: {
		length: { min: 2, max: 50 },
		isRequired: true,
		pattern: {
			regex: /^[a-z0-9-]+$/,
			message: "Uniquement minuscules, chiffres et tirets (ex: electricite-generale)",
		},
	},
} as const;

// Common path patterns - return specific literal types for collections
export const createCollectionPath = (type: string, locale: Locale) =>
	`src/data/${type}/${locale}/*/` as const;

export const createSingletonPath = (type: string, locale: Locale) =>
	`src/data/${type}/${locale}/index` as const;

export const createHomepageDataPath = (section: string, locale: Locale) =>
	`src/data/homepage/${section}/${locale}/index` as const;

export const createServicespageDataPath = (section: string, locale: Locale) =>
	`src/data/servicespage/${section}/${locale}/index` as const;

// Legacy function for backward compatibility
export const createDataPath = (type: string, locale: Locale, isCollection: boolean = true) =>
	isCollection ? createCollectionPath(type, locale) : createSingletonPath(type, locale);
