/**
 * * This is the Keystatic configuration file. It is used to define the collections and fields that will be used in the Keystatic CMS.
 *
 * ! This works in conjunction with Astro content collections. If you update one, you must update the other.
 *
 * Access keystatic interface at /admin or /keystatic
 * This works in local mode in dev, then cloud mode in prod
 * Cloud deployment is free to sign up (up to 3 users per team)
 * Docs: https://keystatic.com/docs/cloud
 * Create a Keystatic Cloud account here: https://keystatic.cloud/
 */

import { config } from "@keystatic/core";

// Import schema factory functions from new modular structure
import {
	createAuthors,
	createBlog,
	createProjects,
} from "@/components/keystatic-components/schemas/content";
import {
	createHomepageAbout,
	createHomepageAboutMe,
	createHomepageGallery,
	createHomepageHero,
	createHomepageLocation,
	createHomepageWarranties,
} from "@/components/keystatic-components/schemas/homepage";
import {
	createCareers,
	createFooter,
	createOtherPages,
	createResume,
	createServices,
} from "@/components/keystatic-components/schemas/pages";
import {
	createAdditionals,
	createServicespageIntro,
} from "@/components/keystatic-components/schemas/servicespage";

export default config({
	// Works in local mode in dev, then cloud mode in prod
	storage: import.meta.env.DEV === true ? { kind: "local" } : { kind: "cloud" },

	// Cloud deployment is free to sign up (up to 3 users per team)
	// Docs: https://keystatic.com/docs/cloud
	// Create a Keystatic Cloud account here: https://keystatic.cloud/
	cloud: { project: "equipe-naturelec/naturelec89" },

	ui: {
		brand: { name: "Naturelec" },
	},

	collections: {
		// Content collections
		blogFR: createBlog("fr"),

		// Authors collection - keeping original name for compatibility
		// For now there is a limitation with keystatic where relationship fields don't work well with i18n features
		// If you need multiple languages here (you might not) just create multiple variants of the same author
		// this might look like "author-1-en" and "author-1-fr"
		authors: createAuthors(""),

		projectsFR: createProjects("fr"),

		// Page collections
		servicesFR: createServices("fr"),
		careersFR: createCareers("fr"),
		otherPagesFR: createOtherPages("fr"),
	},

	singletons: {
		// Homepage sections
		homepageHeroFR: createHomepageHero("fr"),
		homepageAboutFR: createHomepageAbout("fr"),
		homepageAboutMeFR: createHomepageAboutMe("fr"),
		homepageWarrantiesFR: createHomepageWarranties("fr"),
		homepageGalleryFR: createHomepageGallery("fr"),
		homepageLocationFR: createHomepageLocation("fr"),
		// Servicespage sections
		servicespageIntroFR: createServicespageIntro("fr"),
		servicespageAdditionalFR: createAdditionals("fr"),
		// Non-homepage singletons
		footerFR: createFooter("fr"),
		resumeFR: createResume("fr"),
	},
});
