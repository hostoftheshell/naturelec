/**
 * Homepage singleton schemas for Keystatic CMS
 * Contains all homepage section configurations
 */

import { singleton } from "@keystatic/core";
import { fields } from "@keystatic/core";

import ComponentBlocks from "@/components/keystatic-components/ComponentBlocks";

import {
	createButtonFields,
	createHomepageDataPath,
	createImageField,
	createMappingKeyField,
	createTextField,
	type Locale,
	VALIDATION_PATTERNS,
} from "./shared";

/**
 * Homepage Hero Section
 */
export const createHomepageHero = (locale: Locale) =>
	singleton({
		label: `Page d'Accueil - Hero (${locale.toUpperCase()})`,
		path: createHomepageDataPath("hero", locale),
		format: { data: "yaml" },
		schema: {
			heroTitlePrefix: createTextField("Texte avant le nom du site", {
				description: "Ex : Sécurité, proximité et solutions durables :",
			}),
			heroTitleSuffix: createTextField("Texte après le nom du site", {
				description: "Ex : votre électricien proche de Vermenton",
				validation: { isRequired: false },
			}),
			heroDescription: createTextField("Synthèse de présentation de l'entreprise Naturelec", {
				description: "Un pitch court et percutant",
				multiline: true,
				validation: {
					isRequired: true,
					length: { min: 10, max: 500 },
				},
			}),
			...createButtonFields(),
		},
	});

/**
 * Homepage About Section
 */
export const createHomepageAbout = (locale: Locale) =>
	singleton({
		label: `Page d'Accueil - À propos (${locale.toUpperCase()})`,
		path: createHomepageDataPath("about", locale),
		format: { data: "yaml" },
		schema: {
			title: createTextField("Titre de la section", {
				description: "Le titre principal de la section 'À propos'",
			}),
			description: createTextField("Description", {
				description: "Brève description de l'entreprise/personne",
				multiline: true,
				validation: VALIDATION_PATTERNS.description,
			}),
			image: createImageField("Image de la section", {
				description: "Image principale affichée à côté des 'À propos'",
				directory: "src/assets/images/homepage/about",
				publicPath: "@images/about/",
				validation: { isRequired: false },
			}),
			imageAlt: createTextField("Texte alternatif de l'image", {
				description: "Texte alternatif pour l'image de la section 'À propos'",
				validation: {
					isRequired: false,
					length: { max: 125 },
				},
			}),
			mappingKey: createMappingKeyField(),
		},
	});

/**
 * Homepage About Me Section
 */
export const createHomepageAboutMe = (locale: Locale) =>
	singleton({
		label: `Page d'Accueil - À propos de Benoît Gillet (${locale.toUpperCase()})`,
		path: createHomepageDataPath("aboutMe", locale),
		format: { data: "yaml" },
		schema: {
			sectionTitle: createTextField("Titre de la section", {
				description: "Titre principal de la section 'À propos de Benoît Gillet'",
			}),
			sectionDescription: createTextField("Description de la section", {
				description: "Description détaillée de la section 'À propos de Benoît Gillet'",
			}),
			image: createImageField("Image de la section", {
				description: "Image principale affichée à côté de 'À propos de Benoît Gillet'",
				directory: "src/assets/images/homepage/aboutme",
				publicPath: "@images/homepage/aboutMe/",
			}),
			imageAlt: createTextField("Texte alternatif de l'image", {
				description: "Texte alternatif pour l'image de la section 'À propos de Benoît Gillet'",
				validation: VALIDATION_PATTERNS.altText,
			}),
			facts: fields.array(
				fields.object({
					icon: fields.text({
						label: "Icône d'illustration",
						description: "Nom de l'icône d'illustration",
					}),
					title: fields.text({ label: "Titre" }),
					description: fields.text({ label: "Description" }),
				}),
				{
					label: "Faits à savoir",
					itemLabel: (props) =>
						`${props.fields.icon.value}\n` +
						`• ${props.fields.title.value}\n` +
						`• ${props.fields.description.value}`,
				},
			),
		},
	});

/**
 * Homepage Location Section
 */
export const createHomepageLocation = (locale: Locale) =>
	singleton({
		label: `Page d'Accueil - Zone d'intervention (${locale.toUpperCase()})`,
		path: createHomepageDataPath("location", locale),
		format: { data: "yaml" },
		schema: {
			sectionBadge: createTextField("Badge", {
				description: "Accroche ou mot-clé mis en avant au-dessus du titre.",
				validation: { isRequired: false },
			}),
			sectionTitle: createTextField("Titre de la section", {
				description: "Le titre principal de la section 'Zone d'intervention'",
			}),
			sectionDescription: createTextField("Description", {
				description: "Brève description de la zone d'intervention",
				multiline: true,
				validation: VALIDATION_PATTERNS.description,
			}),
			...createButtonFields(),
			locations: fields.array(
				fields.text({ label: "Ajouter une entrée à la liste des communes déservies" }),
				{
					label: "Liste des communes déservies",
					itemLabel: (props) => props.value,
					validation: { length: { min: 1 } },
				},
			),
		},
	});

/**
 * Homepage Warranties Section
 */
export const createHomepageWarranties = (locale: Locale) =>
	singleton({
		label: `Page d'Accueil - Garanties & engagements (${locale.toUpperCase()})`,
		path: createHomepageDataPath("warranty", locale),
		format: { data: "yaml" },
		schema: {
			sectionTitle: createTextField("Titre de la section", {
				description: "Titre principal de la section 'Garanties & engagements'",
			}),
			...createButtonFields(),
			sectionImage: createImageField("Image de la section", {
				description: "Image principale affichée à côté des 'Garanties & engagements'",
				directory: "src/assets/images/homepage/warranty",
				publicPath: "@images/homepage/warranty/",
			}),
			sectionImageAlt: createTextField("Texte alternatif de l'image", {
				description: "Texte alternatif pour l'image de la section 'Garanties & engagements'",
				validation: {
					...VALIDATION_PATTERNS.required,
					length: { max: 125 },
				},
			}),
			mappingKey: createMappingKeyField(),
			sectionList: fields.array(
				fields.object({
					title: fields.text({ label: "Titre" }),
					description: fields.text({ label: "Description" }),
				}),
				{
					label: "Liste des Garanties & Engagements",
					itemLabel: (props) => `${props.fields.title.value} - ${props.fields.description.value}`,
				},
			),
		},
	});

/**
 * Homepage Gallery/Lightbox Marquee Section
 */
export const createHomepageGallery = (locale: Locale) =>
	singleton({
		label: `Media Gallery (${locale.toUpperCase()})`,
		path: createHomepageDataPath("gallery", locale),
		format: { data: "yaml" },
		schema: {
			sectionBadge: createTextField("Badge", {
				description: "Accroche ou mot-clé mis en avant au-dessus du titre.",
				validation: { isRequired: false },
			}),
			sectionTitle: createTextField("Titre", {
				description: "Titre principal de la section.",
				validation: { isRequired: false },
			}),
			sectionDescription: createTextField("Description", {
				description:
					"Texte explicatif et/ou introductif qui détaille la section galerie et apporte du contexte.",
				validation: { isRequired: false },
			}),
			sectionGallery: fields.array(
				fields.object({
					image: createImageField("Image", {
						directory: "src/assets/images/homepage/gallery",
						publicPath: "@images/homepage/gallery",
					}),
					alt: createTextField("Texte alternatif de l'image", {
						description:
							"Déscription du contenu de l'image. Utilisé par les lecteurs d'écrans et les moteurs de recherche.",
						validation: { isRequired: false },
					}),
					caption: createTextField("Légende de l'image", {
						description:
							"Texte affiché avec l'image en mode plein écran pour fournir un contexte ou un complément d'information.",
						validation: { isRequired: false },
					}),
					role: fields.select({
						label: "Role",
						options: [
							{ label: "Haut", value: "top" },
							{ label: "Milieu", value: "middle" },
							{ label: "Bas", value: "bottom" },
						],
						defaultValue: "top",
					}),
				}),
				{
					label: "Gallery Items",
					itemLabel: (props) => `${props.fields.role.value} : ${props.fields.caption.value}`,
				},
			),
		},
	});
