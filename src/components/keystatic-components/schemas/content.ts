/**
 * Content collection schemas for Keystatic CMS
 * Contains blog posts, authors, and projects collections
 */

import { collection } from "@keystatic/core";
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
	createSlugField,
	createTextField,
	createUrlField,
	type Locale,
	VALIDATION_PATTERNS,
} from "./shared";

/**
 * Blog Posts Collection
 */
export const createBlog = (locale: Locale) =>
	collection({
		label: `Blog (${locale.toUpperCase()})`,
		slugField: "title",
		path: createCollectionPath("blog", locale),
		columns: ["title", "pubDate"],
		entryLayout: "content",
		format: { contentField: "content" },
		schema: {
			title: createSlugField({
				nameLabel: "Title",
				slugLabel: "SEO-friendly slug",
				slugDescription: "Never change the slug once a file is published!",
			}),
			description: createTextField("Description", {
				validation: {
					isRequired: true,
					length: { min: 1, max: 160 },
				},
			}),
			draft: createDraftField("post"),
			authors: fields.array(
				fields.relationship({
					label: "Post author",
					collection: `authors`, // Note: This should match the collection name in keystatic.config
				}),
				{
					label: "Authors",
					validation: { length: { min: 1 } },
					itemLabel: (props) => props.value || "Please select an author",
				},
			),
			pubDate: createDateField("Publish Date"),
			updatedDate: createDateField("Updated Date", {
				description: "If you update this post at a later date, put that date here.",
				validation: { isRequired: false },
			}),
			mappingKey: createMappingKeyField(),
			heroImage: createImageField("Hero Image", {
				publicPath: "../",
			}),
			categories: fields.array(fields.text({ label: "Category" }), {
				label: "Categories",
				description: "This is NOT case sensitive.",
				itemLabel: (props) => props.value,
				validation: { length: { min: 1 } },
			}),
			tags: fields.array(fields.text({ label: "Tag" }), {
				label: "Tags",
				itemLabel: (props) => props.value,
				validation: { length: { min: 1 } },
			}),
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
						directory: `src/data/blog/${locale}/`,
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
 * Authors Collection
 */
export const createAuthors = (locale: Locale | "") =>
	collection({
		label: `Authors ${locale === "" ? "" : `(${locale.toUpperCase()})`}`,
		slugField: "name",
		path:
			locale === ""
				? (`src/data/authors/*/` as const)
				: createCollectionPath("authors", locale as Locale),
		columns: ["name"],
		entryLayout: "content",
		format: { contentField: "bio" },
		schema: {
			name: createSlugField({
				nameLabel: "Name",
				slugLabel: "SEO-friendly slug",
				slugDescription: "Never change the slug once this file is published!",
			}),
			avatar: createImageField("Author avatar", {
				publicPath: "../",
			}),
			about: createTextField("About", {
				description: "A short bio about the author",
			}),
			email: createTextField("The author's email", {
				description: "This must look something like `you@email.com`",
			}),
			authorLink: createUrlField("Author Website or Social Media Link"),
			bio: fields.mdx({
				label: "Full Bio",
				description: "The author's full bio",
				options: {
					bold: true,
					italic: true,
					strikethrough: true,
					code: true,
					heading: [2, 3, 4],
					blockquote: true,
					orderedList: true,
					unorderedList: true,
					table: false,
					link: true,
					image: {
						directory: "src/data/authors/",
						publicPath: "../",
					},
					divider: true,
					codeBlock: false,
				},
			}),
		},
	});

/**
 * Projects Collection
 */
export const createProjects = (locale: Locale) =>
	collection({
		label: `Projects (${locale.toUpperCase()})`,
		slugField: "title",
		path: createCollectionPath("projects", locale),
		columns: ["title", "completionDate"],
		entryLayout: "content",
		format: { contentField: "content" },
		schema: {
			title: createSlugField({
				nameLabel: "Title",
				slugLabel: "SEO-friendly slug",
				slugDescription: "Never change the slug once a file is published!",
			}),
			description: createTextField("Description"),
			image: createImageField("Project Image", {
				publicPath: "../",
			}),
			technologies: fields.array(fields.text({ label: "Technology" }), {
				label: "Technologies Used",
				itemLabel: (props) => props.value,
				validation: { length: { min: 1 } },
			}),
			demoUrl: createUrlField("Demo URL", {
				description: "Link to live demo if available",
				validation: { isRequired: false },
			}),
			githubUrl: createUrlField("GitHub URL", {
				description: "Link to GitHub repository",
				validation: { isRequired: false },
			}),
			completionDate: createDateField("Completion Date"),
			keyFeatures: fields.array(fields.text({ label: "Feature" }), {
				label: "Key Features",
				itemLabel: (props) => props.value,
				validation: { length: { min: 1 } },
			}),
			order: createNumberField("Display Order", {
				description: "Optional: Use to control the order of projects (lower numbers appear first)",
				validation: { isRequired: false },
			}),
			mappingKey: createMappingKeyField(),
			draft: createDraftField("project"),
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
						directory: `src/data/projects/${locale}/`,
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
