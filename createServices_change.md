````
/**
 * Services Collection Schema for Keystatic CMS
 * Handles service categories with nested services (text or picture variant)
 */

import ComponentBlocks from "@/components/keystatic-components/ComponentBlocks";

import { collection } from "@keystatic/core";
import { fields } from "@keystatic/core";

import ComponentBlocks from "@/components/keystatic-components/ComponentBlocks";

import {
	createCheckboxField,
	createCollectionPath,
	createImageField,
	createMappingKeyField,
	createSlugField,
	createTextField,
	type Locale,
	VALIDATION_PATTERNS,
} from "./shared";

/**
 * Services Collection
 */
export const createServices = (locale: Locale) =>
	collection({
		label: `Services (${locale.toUpperCase()})`,
		slugField: "title",
		path: createCollectionPath("services", locale),
		columns: ["title", "badge", "displayLocation"],
		entryLayout: "form",
		format: { data: "json" },
		schema: {
			// Category-level fields
			badge: createTextField("Badge de catégorie", {
				description: "Badge optionnel affiché au-dessus du titre (ex: 'Populaire', 'Nouveau')",
				validation: { isRequired: false },
			}),
			title: createSlugField({
				nameLabel: "Titre de la catégorie",
				slugLabel: "Slug optimisé pour le référencement",
				slugDescription: "Ne changez jamais le slug une fois qu'un fichier est publié !",
			}),
			description: createTextField("Description courte", {
				description: "Description résumée de la catégorie de services",
				multiline: true,
				validation: VALIDATION_PATTERNS.description,
			}),
			image: createImageField("Image de catégorie", {
				description: "Image principale représentant cette catégorie",
				directory: "src/assets/images/services/categories",
				publicPath: "@images/services/categories/",
			}),
			imageAlt: createTextField("Texte alternatif de l'image", {
				description: "Description de l'image pour l'accessibilité et le SEO",
				validation: VALIDATION_PATTERNS.shortText,
			}),
			displayLocation: fields.multiselect({
				label: "Afficher sur",
				description: "Sélectionnez les pages où cette catégorie doit apparaître",
				options: [
					{ label: "Page d'accueil", value: "homepage" },
					{ label: "Page services", value: "servicespage" },
				],
				defaultValue: ["servicespage"],
			}),
			mappingKey: createMappingKeyField(),

			// Services array (nested level)
			services: fields.array(
				fields.conditional(
					fields.select({
						label: "Type de service",
						description: "Choisissez si ce service affiche du texte ou une image",
						options: [
							{ label: "Service avec texte et icône", value: "text" },
							{ label: "Service avec image", value: "picture" },
						],
						defaultValue: "text",
					}),
					{
						text: fields.object({
							icon: createTextField("Icône", {
								description: "Nom de l'icône ou emoji (ex: '⚡', 'lightning')",
								validation: { isRequired: false },
							}),
							title: createTextField("Titre du service", {
								validation: { isRequired: false },
							}),
							description: fields.document({
								label: "Description",
								description: "Description détaillée avec formatage",
								formatting: {
									inlineMarks: {
										bold: true,
										italic: true,
										code: true,
										strikethrough: true,
									},
									listTypes: {
										ordered: true,
										unordered: true,
									},
									headingLevels: [3, 4, 5],
									blockTypes: {
										blockquote: true,
									},
									softBreaks: true,
								},
								links: true,
							}),
						}),
						picture: fields.object({
							image: createImageField("Image du service", {
								description: "Image représentant ce service",
								directory: "src/assets/images/services/items",
								publicPath: "@images/services/items/",
								validation: { isRequired: false },
							}),
							imageAlt: createTextField("Texte alternatif", {
								description: "Description de l'image pour l'accessibilité",
								validation: { isRequired: false },
							}),
							caption: createTextField("Légende", {
								description: "Légende ou description courte de l'image",
								multiline: true,
								validation: { isRequired: false },
							}),
						}),
					},
				),
				{
					label: "Services",
					itemLabel: (props) => {
						if (props.discriminant === "text") {
							return props.value.title || "Service texte (sans titre)";
						}
						return props.value.caption || "Service image (sans légende)";
					},
					validation: { length: { min: 0 } },
				},
			),
		},
	});
	```
````

/\*\*

- TypeScript types for Services Collection
  \*/

// Display location options
export type ServiceDisplayLocation = "homepage" | "servicespage";

// Service variant types
export interface ServiceTextVariant {
icon?: string;
title?: string;
description: any; // Keystatic document type
}

export interface ServicePictureVariant {
image?: string;
imageAlt?: string;
caption?: string;
}

// Discriminated union for service types
export type ServiceItem =
| {
discriminant: "text";
value: ServiceTextVariant;
}
| {
discriminant: "picture";
value: ServicePictureVariant;
};

// Main service category schema
export interface ServiceCategory {
badge?: string;
title: string;
slug: string;
description: string;
image: string;
imageAlt: string;
displayLocation: ServiceDisplayLocation[];
mappingKey: string;
services: ServiceItem[];
}

// Collection entry type (with id)
export interface ServiceCategoryEntry extends ServiceCategory {
id: string;
}

```

```
