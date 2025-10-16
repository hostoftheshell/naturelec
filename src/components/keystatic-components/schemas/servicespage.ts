/**
 * Servicespage singleton schema for Keystatic CMS
 * Contains all services page section configurations
 */

import { singleton } from "@keystatic/core";
import { fields } from "@keystatic/core";

import {
	createButtonFields,
	createImageField,
	createMappingKeyField,
	createServicespageDataPath,
	createSlugField,
	createTextField,
	type Locale,
	VALIDATION_PATTERNS,
} from "./shared";

export const createServicespageIntro = (locale: Locale) =>
	singleton({
		label: `Page Services - Intro (${locale.toUpperCase()})`,
		path: createServicespageDataPath("intro", locale),
		format: { data: "yaml" },
		schema: {
			servicesPageIntroTitle: createTextField("Titre de la page Services", {
				description: "Titre principal de la page dédiée aux services proposés par Naturelec",
				validation: { ...VALIDATION_PATTERNS.shortText, ...VALIDATION_PATTERNS.required },
			}),
			servicesPageIntroDescription: createTextField(
				"Paragraphe d'introduction de la page Services",
				{
					description:
						"Paragraphe d'introduction de la page dédiée aux services proposés par Naturelec",
					validation: { ...VALIDATION_PATTERNS.description, ...VALIDATION_PATTERNS.required },
				},
			),
			servicesPageIntroImage: createImageField("Image de la page Services", {
				description:
					"Image d'illustration de la section d'introduction de la page dédiée aux services proposés par Naturelec",
				directory: "src/assets/images/servicespage/intro",
				publicPath: "@images/servicespage/intro/",
				validation: { isRequired: false },
			}),
			servicesPageIntroImageAlt: createTextField("Texte alternatif de l'image", {
				description: "Texte alternatif pour l'image de la section 'Intro' de la page Services",
				validation: VALIDATION_PATTERNS.altText,
			}),
			expertise: fields.object(
				{
					sectionTitle: fields.text({
						label: "Titre de la section",
						defaultValue: "Nos domaines d'expertise",
						validation: { ...VALIDATION_PATTERNS.shortText, ...VALIDATION_PATTERNS.required },
					}),
					expertiseAreas: fields.array(
						fields.object({
							title: fields.text({
								label: "Titre du domaine",
								validation: { ...VALIDATION_PATTERNS.shortText, ...VALIDATION_PATTERNS.required },
							}),
							anchorLink: fields.text({
								label: "Lien d'ancrage (slug)",
								validation: VALIDATION_PATTERNS.anchorSlug,
							}),
							description: fields.text({
								label: "Description courte",
								validation: { ...VALIDATION_PATTERNS.shortText, ...VALIDATION_PATTERNS.required },
							}),
						}),
						{
							label: "Liste des domaines",
							itemLabel: (props) =>
								`${props.fields.title.value} - ${props.fields.description.value}`,
							validation: { length: { min: 1 } },
						},
					),
				},
				{
					label: "Nos domaines d'expertise",
				},
			),
		},
	});

/**
 * Additional Services
 * Handles the additinal service categorie with nested services
 */
export const createAdditionals = (locale: Locale) =>
	singleton({
		label: `Page Services - Services supplémentaires (${locale.toUpperCase()})`,
		path: createServicespageDataPath("additionals", locale),
		entryLayout: "form",
		format: { data: "json" },
		schema: {
			additionalServicesBadge: createTextField("Badge de la section services additionnels", {
				description: "Badge de la section dédiée aux services additionnels proposés par Naturelec",
				validation: {
					...VALIDATION_PATTERNS.shortText,
					...VALIDATION_PATTERNS.optional,
				},
			}),
			additionalServicesTitle: createSlugField({
				nameLabel: "Titre de la catégorie",
				slugLabel: "Slug optimisé pour le référencement",
				slugDescription: "Ne changez jamais le slug une fois qu'un fichier est publié !",
			}),
			additionalServicesDescription: createTextField("Introduction de la section", {
				description:
					"Paragraphe d'introduction de la section dédiée aux services additionnels proposés par Naturelec",
				validation: {
					...VALIDATION_PATTERNS.shortText,
					...VALIDATION_PATTERNS.required,
				},
			}),

			additionalServices: fields.array(
				fields.object({
					title: createTextField("Titre du service", {
						validation: { isRequired: false },
					}),
					description: fields.document({
						label: "Description",
						description: "Description détaillée avec formatage",
						formatting: {
							inlineMarks: true,
							listTypes: true,
							alignment: true,
							headingLevels: [3, 4, 5],
							blockTypes: true,
							softBreaks: true,
						},
						links: true,
					}),
					image: createImageField("Image du service", {
						description: "Image représentant le service additionnel",
						directory: "src/assets/images/servicespage/additional",
						publicPath: "@images/servicespage/additional/",
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
				{
					label: "Services Additionnels",
					itemLabel: (props) => props.fields.title.value || "Nouveau service",
					validation: { length: { min: 0 } },
				},
			),
		},
	});
