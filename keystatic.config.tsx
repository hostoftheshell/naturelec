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

import Collections from "@/components/keystatic-components/Collections";

export default config({
	// works in local mode in dev, then cloud mode in prod
	storage: import.meta.env.DEV === true ? { kind: "local" } : { kind: "cloud" },
	// cloud deployment is free to sign up (up to 3 users per team)
	// docs: https://keystatic.com/docs/cloud
	// create a Keystatic Cloud account here: https://keystatic.cloud/
	cloud: { project: "cosmic-themes/starter" },
	ui: {
		brand: { name: "Cosmic Themes" },
	},
	collections: {
		blogFR: Collections.Blog("fr"),

		// for now there is a limitation with keystatic where relationship fields don't work well with i18n features
		// If you need multiple languages here (you might not) just create multiple variants of the same author
		// this might look like "author-1-en" and "author-1-fr"
		authors: Collections.Authors(""),

		servicesFR: Collections.Services("fr"),

		careersFR: Collections.Careers("fr"),

		otherPagesFR: Collections.OtherPages("fr"),

		projectsFR: Collections.Projects("fr"),
	},

	singletons: {
		resumeFR: Collections.Resume("fr"),
		aboutFR: Collections.homePageAbout("fr"),
		aboutMeFR: Collections.homePageAboutMe("fr"),
		WarrantyFR: Collections.homePageWarranties("fr"),
		homePageLightboxMarqueeFR: Collections.homePageLightboxMarquee("fr"),
	},
});
