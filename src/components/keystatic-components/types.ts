/**
 * TypeScript type definitions for Keystatic schemas
 */

import { locales } from "@/config/siteSettings.json";

// Base types
export type Locale = (typeof locales)[number];

// Common field types
export interface BaseEntry {
	mappingKey?: string;
	draft?: boolean;
}

export interface SlugField {
	title: {
		name: string;
		slug: string;
	};
}

export interface ButtonFields {
	buttonText: string;
	buttonHref: string;
}

// Homepage schema types
export interface HomepageHeroSchema {
	heroTitlePrefix: string;
	heroTitleSuffix?: string;
	heroDescription: string;
	buttonText: string;
	buttonHref: string;
}

export interface HomepageAboutSchema extends BaseEntry {
	title: string;
	description: string;
	image?: string;
	imageAlt?: string;
}

export interface HomepageAboutMeSchema {
	sectionTitle: string;
	sectionDescription: string;
	image: string;
	imageAlt?: string;
	facts: Array<{
		icon: string;
		title: string;
		description: string;
	}>;
}

export interface HomepageLocationSchema extends ButtonFields {
	sectionBadge?: string;
	sectionTitle: string;
	sectionDescription: string;
	locations: string[];
}

export interface HomepageWarrantiesSchema extends BaseEntry, ButtonFields {
	sectionTitle: string;
	sectionImage: string;
	sectionImageAlt: string;
	sectionList: Array<{
		title: string;
		description: string;
	}>;
}

export interface HomepageGallerySchema {
	sectionBadge?: string;
	sectionTitle?: string;
	sectionDescription?: string;
	sectionGallery: Array<{
		image: string;
		alt?: string;
		caption?: string;
		role: "top" | "middle" | "bottom";
	}>;
}

// Content schema types
export interface BlogSchema extends BaseEntry, SlugField {
	description: string;
	authors: string[];
	pubDate: Date;
	updatedDate?: Date;
	heroImage: string;
	categories: string[];
	tags: string[];
	content: string; // MDX content
}

export interface AuthorSchema extends SlugField {
	name: {
		name: string;
		slug: string;
	};
	avatar: string;
	about: string;
	email: string;
	authorLink: string;
	bio: string; // MDX content
}

export interface ProjectSchema extends BaseEntry, SlugField {
	description: string;
	image: string;
	technologies: string[];
	demoUrl?: string;
	githubUrl?: string;
	completionDate: Date;
	keyFeatures: string[];
	order?: number;
	content: string; // MDX content
}

// Page schema types
export interface ServiceSchema extends BaseEntry, SlugField {
	type: "category" | "service";
	description: string;
	order?: number;
	titleLong?: string;
	category?: string;
	icon?: string;
	image?: string;
	content: string; // MDX content
}

export interface CareerSchema extends BaseEntry, SlugField {
	category: string;
	location: string;
	type: "Full-time" | "Part-time" | "Contract" | "Remote";
	description: string;
	requirements: string[];
	applicationUrl: string;
	publishDate: Date;
	content: string; // MDX content
}

export interface OtherPageSchema extends BaseEntry, SlugField {
	description: string;
	content: string; // MDX content
}

// Singleton schema types
export interface FooterSchema {
	footerLine: string;
}

export interface ResumeSchema extends BaseEntry {
	diplomas: Array<{
		title: string;
		school: string;
		year: number;
	}>;
	certifications: Array<{
		title: string;
		year: number;
	}>;
	experience: Array<{
		title: string;
		company: string;
		companyImage: string;
		dates: string;
		location: string;
		responsibilities: string[];
	}>;
	hardSkills: Array<{
		skill: string;
		percentage: number;
	}>;
	softSkills: Array<{
		skill: string;
		icon: string;
	}>;
	languages: Array<{
		language: string;
		level: number;
	}>;
	tools: Array<{
		name: string;
		category: string;
		image: string;
		link: string;
	}>;
}

// Schema factory function types
export type SchemaFactory<T> = (locale: Locale) => T;
export type AuthorSchemaFactory = (locale: Locale | "") => any;

// Collection configuration types
export interface CollectionConfig {
	label: string;
	slugField?: string;
	path: string;
	columns?: string[];
	entryLayout?: "content" | "form";
	format?: {
		contentField?: string;
		data?: "yaml" | "json";
	};
}

export interface SingletonConfig {
	label: string;
	path: string;
	format?: {
		data?: "yaml" | "json";
		contentField?: string;
	};
}

// Keystatic configuration types
export interface KeystaticCollections {
	blogFR: ReturnType<SchemaFactory<any>>;
	authors: ReturnType<AuthorSchemaFactory>;
	projectsFR: ReturnType<SchemaFactory<any>>;
	servicesFR: ReturnType<SchemaFactory<any>>;
	careersFR: ReturnType<SchemaFactory<any>>;
	otherPagesFR: ReturnType<SchemaFactory<any>>;
}

export interface KeystaticSingletons {
	homepageHeroFR: ReturnType<SchemaFactory<any>>;
	homepageAboutFR: ReturnType<SchemaFactory<any>>;
	homepageAboutMeFR: ReturnType<SchemaFactory<any>>;
	homepageWarrantiesFR: ReturnType<SchemaFactory<any>>;
	homepageGalleryFR: ReturnType<SchemaFactory<any>>;
	homepageLocationFR: ReturnType<SchemaFactory<any>>;
	footerFR: ReturnType<SchemaFactory<any>>;
	resumeFR: ReturnType<SchemaFactory<any>>;
}
