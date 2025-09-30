import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

// Type-check frontmatter using a schema
const blogCollection = defineCollection({
	loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/data/blog" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// reference the authors collection https://docs.astro.build/en/guides/content-collections/#defining-collection-references
			authors: z.array(reference("authors")),
			// Transform string to Date object
			pubDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			updatedDate: z
				.string()
				.or(z.date())
				.optional()
				.transform((str) => (str ? new Date(str) : undefined)),
			heroImage: image().optional(),
			categories: z.array(z.string()),
			tags: z.array(z.string()),
			// mappingKey allows you to match entries across languages for SEO purposes
			mappingKey: z.string().optional(),
			// blog posts will be excluded from build if draft is "true"
			draft: z.boolean().optional(),
		}),
});

// authors
const authorsCollection = defineCollection({
	loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/data/authors" }),
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			avatar: image(),
			about: z.string(),
			email: z.string(),
			authorLink: z.string(), // author page link. Could be a personal website, github, twitter, whatever you want
		}),
});

// about
const aboutCollection = defineCollection({
	loader: glob({ pattern: "**/[^_]*{yaml,yml}", base: "./src/data/homepage/about" }), // Changed to YAML pattern
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			image: image().optional(),
			imageAlt: z.string().optional(),
			mappingKey: z.string().optional(),
		}),
});
const homePageAboutMeCollection = defineCollection({
	loader: glob({ pattern: "**/[^_]*{yaml,yml}", base: "./src/data/homepage/aboutMe" }), // Changed to YAML pattern
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
const homePageWarrantiesCollection = defineCollection({
	loader: glob({
		pattern: "**/index.{yaml,yml}",
		base: "./src/data/homepage/warranty",
	}),
	schema: ({ image }) =>
		z.object({
			sectionTitle: z.string(),
			buttonText: z.string(),
			buttonHref: z.string(),
			sectionImage: image(),
			sectionImageAlt: z.string().max(125, "Texte alternatif limité à 125 caractères"),
			mappingKey: z.string().optional(),
			sectionList: z.array(
				z.object({
					title: z.string(),
					description: z.string(),
				}),
			),
		}),
});

// Home Page Lightbox Marquee
export const homePageLightboxMarquee = defineCollection({
	loader: glob({
		pattern: "**/index.{yaml,yml}",
		base: "./src/data/homepage/gallery",
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

// Home Page Location
const homePageLocationCollection = defineCollection({
	loader: glob({
		pattern: "**/index.{yaml,yml}",
		base: "./src/data/homepage/location",
	}),
	schema: () =>
		z.object({
			sectionBadge: z.string(),
			sectionTitle: z.string(),
			sectionDescription: z.string().min(10).max(500),
			buttonText: z.string(),
			buttonHref: z.string(),
			locations: z.array(z.string()).min(1),
			mappingKey: z.string().optional(),
		}),
});

// Home Page hero
const homePageHeroCollection = defineCollection({
	loader: glob({
		pattern: "**/index.{yaml,yml}",
		base: "./src/data/homepage/hero",
	}),
	schema: () =>
		z.object({
			heroTitlePrefix: z.string(),
			heroTitleSuffix: z.string(),
			heroDescription: z.string().min(10).max(500),
			buttonText: z.string(),
			buttonHref: z.string(),
		}),
});

// services collection - handles both categories and individual services
const servicesCollection = defineCollection({
	loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/data/services" }),
	schema: ({ image }) =>
		z.discriminatedUnion("type", [
			// Category schema
			z.object({
				type: z.literal("category"),
				title: z.string(),
				description: z.string(),
				order: z.number().optional(),
				mappingKey: z.string().optional(),
				draft: z.boolean().optional(),
			}),
			// Service schema
			z.object({
				type: z.literal("service"),
				title: z.string(),
				titleLong: z.string(),
				description: z.string(),
				category: z.string().optional(), // Add category field
				icon: z.string(),
				image: image(),
				mappingKey: z.string().optional(),
				order: z.number().optional(),
				draft: z.boolean().optional(),
			}),
		]),
});

//

// careers/job postings
const careersCollection = defineCollection({
	loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/data/careers" }),
	schema: () =>
		z.object({
			title: z.string(),
			category: z.string(),
			location: z.string(),
			type: z.enum(["Full-time", "Part-time", "Contract", "Remote"]),
			description: z.string(),
			requirements: z.array(z.string()),
			applicationUrl: z.string().url(),
			publishDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			// mappingKey allows you to match entries across languages for SEO purposes
			mappingKey: z.string().optional(),
			draft: z.boolean().optional().default(false),
		}),
});

// projects
const projectsCollection = defineCollection({
	loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/data/projects" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			image: image(),
			technologies: z.array(z.string()),
			demoUrl: z.string().url().optional(),
			githubUrl: z.string().url().optional(),
			completionDate: z.date(),
			keyFeatures: z.array(z.string()),
			order: z.number().optional(),
			mappingKey: z.string().optional(),
			draft: z.boolean().optional(),
		}),
});

// resume
const resumeCollection = defineCollection({
	loader: glob({ pattern: "**/[^_]*.{json,jsonc}", base: "./src/data/resume" }),
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
					link: z.string().url(),
				}),
			),
			mappingKey: z.string().optional(),
		}),
});

// other pages
const otherPagesCollection = defineCollection({
	loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/data/otherPages" }),
	schema: () =>
		z.object({
			title: z.string(),
			description: z.string(),
			// mappingKey allows you to match entries across languages for SEO purposes
			mappingKey: z.string().optional(),
			draft: z.boolean().optional(),
		}),
});

// each code toggle section is it's own content file
const codeToggleCollection = defineCollection({
	loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/data/codeToggles" }),
	schema: () =>
		z.object({
			language: z.string(),
			order: z.number(),
			icon: z.string().optional(),
			draft: z.boolean().optional(),
		}),
});

export const collections = {
	about: aboutCollection,
	services: servicesCollection,
	otherPages: otherPagesCollection,
	warranty: homePageWarrantiesCollection,
	aboutMe: homePageAboutMeCollection,
	homepageGallery: homePageLightboxMarquee,
	blog: blogCollection,
	authors: authorsCollection,
	projects: projectsCollection,
	careers: careersCollection,
	resume: resumeCollection,
	codeToggles: codeToggleCollection,
	location: homePageLocationCollection,
	hero: homePageHeroCollection,
};
