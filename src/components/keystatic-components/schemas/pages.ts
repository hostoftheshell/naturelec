/**
 * Page collection schemas for Keystatic CMS
 * Contains services, careers, other pages, and non-homepage singletons
 */

import { collection, singleton } from "@keystatic/core";
import { fields } from "@keystatic/core";

import ComponentBlocks from "@/components/keystatic-components/ComponentBlocks";

import {
	createCheckboxField,
	createCollectionPath,
	createDateField,
	createDraftField,
	createImageField,
	createMappingKeyField,
	createMDXContentField,
	createNumberField,
	createSelectField,
	createSingletonPath,
	createSlugField,
	createTextField,
	createUrlField,
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
		columns: ["title", "type", "order"],
		entryLayout: "content",
		format: { contentField: "content" },
		schema: {
			title: createSlugField({
				nameLabel: "Title",
				slugLabel: "Slug optimisé pour le référencement",
				slugDescription: "Ne changez jamais le slug une fois qu'un fichier est publié !",
			}),
			type: createSelectField(
				"Type de contenu",
				[
					{ label: "Catégorie de services", value: "category" },
					{ label: "Service individuel", value: "service" },
				],
				"service",
				"S'agit-il d'une catégorie de service ou d'un service individuel ?",
			),
			description: createTextField("Description", {
				multiline: true,
			}),
			order: createNumberField("Ordre d'affichage", {
				description: "Les nombres inférieurs apparaissent en premier",
				validation: { isRequired: false },
			}),
			draft: createDraftField("service"),
			mappingKey: createMappingKeyField(),
			// Fields for individual services
			titleLong: createTextField("Titre étendu", {
				description: "Titre plus long (utilisé uniquement pour les services individuels)",
				validation: { isRequired: false },
			}),
			category: createTextField("Category Slug", {
				description:
					"Le slug de la catégorie à laquelle appartient ce service (uniquement pour les services)",
				validation: { isRequired: false },
			}),
			icon: createTextField("Icône", {
				description: "Nom de l'icône (utilisé uniquement pour les services individuels)",
				validation: { isRequired: false },
			}),
			image: createImageField("Image du service", {
				description: "Image principale (utilisée uniquement pour les services individuels)",
				publicPath: "../",
				validation: { isRequired: false },
			}),
			content: fields.mdx({
				label: "Contenu",
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
						directory: `src/data/services/${locale}/`,
						publicPath: "../",
					},
					divider: true,
					codeBlock: true,
				},
				components: {
					Admonition: ComponentBlocks.Admonition,
				},
			}),
		},
	});

/**
 * Careers Collection
 */
export const createCareers = (locale: Locale) =>
	collection({
		label: `Careers (${locale.toUpperCase()})`,
		slugField: "title",
		path: createCollectionPath("careers", locale),
		columns: ["title", "category", "location", "type", "publishDate"],
		entryLayout: "content",
		format: { contentField: "content" },
		schema: {
			title: createSlugField({
				nameLabel: "Title",
				slugLabel: "SEO-friendly slug",
				slugDescription: "Never change the slug once a file is published!",
			}),
			category: createTextField("Category"),
			location: createTextField("Location"),
			type: createSelectField(
				"Job Type",
				[
					{ label: "Full-time", value: "Full-time" },
					{ label: "Part-time", value: "Part-time" },
					{ label: "Contract", value: "Contract" },
					{ label: "Remote", value: "Remote" },
				],
				"Full-time",
			),
			description: createTextField("Short Description", {
				multiline: true,
			}),
			requirements: fields.array(fields.text({ label: "Requirement" }), {
				label: "Requirements",
				itemLabel: (props) => props.value,
				validation: { length: { min: 1 } },
			}),
			applicationUrl: createUrlField("Application URL"),
			publishDate: createDateField("Publish Date"),
			draft: createDraftField("job posting"),
			mappingKey: createMappingKeyField(),
			content: fields.mdx({
				label: "Content",
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
						directory: `src/data/careers/${locale}/`,
						publicPath: "../",
					},
					divider: true,
					codeBlock: true,
				},
				components: {
					Admonition: ComponentBlocks.Admonition,
				},
			}),
		},
	});

/**
 * Other Pages Collection
 */
export const createOtherPages = (locale: Locale) =>
	collection({
		label: `Other Pages (${locale.toUpperCase()})`,
		slugField: "title",
		path: createCollectionPath("otherPages", locale),
		columns: ["title"],
		entryLayout: "content",
		format: { contentField: "content" },
		schema: {
			title: createSlugField({
				nameLabel: "Title",
				slugLabel: "SEO-friendly slug",
				slugDescription: "Never change the slug once a file is published!",
			}),
			description: createTextField("Description", {
				validation: VALIDATION_PATTERNS.shortText,
			}),
			draft: createDraftField("page"),
			mappingKey: createMappingKeyField(),
			content: fields.mdx({
				label: "Page Contents",
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
						directory: `src/data/otherPages/${locale}/`,
						publicPath: "../",
					},
					divider: true,
					codeBlock: true,
				},
				components: {
					Admonition: ComponentBlocks.Admonition,
				},
			}),
		},
	});

/**
 * Footer Singleton (Non-homepage)
 */
export const createFooter = (locale: Locale) =>
	singleton({
		label: `Footer ${locale.toUpperCase()}`,
		path: `src/data/footer/${locale}/index`,
		format: { data: "yaml" },
		schema: {
			footerLine: createTextField("Synthèse de présentation de l'entreprise Naturelec", {
				description: "Un slogan court et percutant",
				multiline: true,
				validation: VALIDATION_PATTERNS.description,
			}),
		},
	});

/**
 * Resume Singleton (Non-homepage)
 */
export const createResume = (locale: Locale) =>
	singleton({
		label: `Resume (${locale.toUpperCase()})`,
		path: `src/data/resume/${locale}/resume/index`,
		format: { data: "json" },
		schema: {
			diplomas: fields.array(
				fields.object({
					title: fields.text({ label: "Title" }),
					school: fields.text({ label: "School" }),
					year: fields.number({ label: "Year" }),
				}),
				{
					label: "Diplomas",
					itemLabel: (props) =>
						`${props.fields.title.value} - ${props.fields.school.value} (${props.fields.year.value})`,
				},
			),
			certifications: fields.array(
				fields.object({
					title: fields.text({ label: "Title" }),
					year: fields.number({ label: "Year" }),
				}),
				{
					label: "Certifications",
					itemLabel: (props) => `${props.fields.title.value} (${props.fields.year.value})`,
				},
			),
			experience: fields.array(
				fields.object({
					title: fields.text({ label: "Title" }),
					company: fields.text({ label: "Company" }),
					companyImage: createImageField("Company Logo", {
						publicPath: "./index/",
					}),
					dates: fields.text({ label: "Dates" }),
					location: fields.text({ label: "Location" }),
					responsibilities: fields.array(fields.text({ label: "Responsibility" }), {
						label: "Responsibilities",
						itemLabel: (props) => props.value,
					}),
				}),
				{
					label: "Experience",
					itemLabel: (props) => `${props.fields.title.value} at ${props.fields.company.value}`,
				},
			),
			hardSkills: fields.array(
				fields.object({
					skill: fields.text({ label: "Skill" }),
					percentage: createNumberField("Level (%)", {
						description: "Enter a percentage between 0 and 100",
						validation: {
							min: 0,
							max: 100,
							isRequired: true,
						},
					}),
				}),
				{
					label: "Hard Skills",
					itemLabel: (props) => `${props.fields.skill.value} - ${props.fields.percentage.value}%`,
				},
			),
			softSkills: fields.array(
				fields.object({
					skill: createTextField("Skill"),
					icon: createTextField("Icon Image", {
						description: "Copy in your favorite emoji like 👑",
					}),
				}),
				{
					label: "Soft Skills",
					itemLabel: (props) => props.fields.skill.value,
				},
			),
			languages: fields.array(
				fields.object({
					language: createTextField("Language"),
					level: createNumberField("Proficiency Level", {
						description: "Enter a value between 1 (basic) and 10 (native)",
						validation: {
							min: 1,
							max: 10,
							isRequired: true,
						},
					}),
				}),
				{
					label: "Languages",
					itemLabel: (props) =>
						`${props.fields.language.value} - Level ${props.fields.level.value}/10`,
				},
			),
			tools: fields.array(
				fields.object({
					name: createTextField("Tool Name"),
					category: createTextField("Category", {
						description: "Tool category (e.g., 'Development', 'Design', 'DevOps')",
					}),
					image: createImageField("Tool Logo", {
						description: "Logo or icon for the tool",
						publicPath: "./index/",
					}),
					link: createUrlField("Tool Website", {
						description: "Link to the tool's official website",
					}),
				}),
				{
					label: "Tools & Technologies",
					itemLabel: (props) => `${props.fields.name.value} (${props.fields.category.value})`,
				},
			),
			mappingKey: createMappingKeyField(),
		},
	});
