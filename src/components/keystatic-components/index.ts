/**
 * Main exports for Keystatic schema components
 * Provides clean imports for all schema factory functions
 */

// Content collections
export { createAuthors, createBlog, createProjects } from "./schemas/content";

// Page collections and non-homepage singletons
export {
	createCareers,
	createFooter,
	createOtherPages,
	createResume,
	createServices,
} from "./schemas/pages";

// Homepage singletons
export {
	createHomepageAbout,
	createHomepageAboutMe,
	createHomepageGallery,
	createHomepageHero,
	createHomepageLocation,
	createHomepageWarranties,
} from "./schemas/homepage";

// Shared utilities
export {
	createButtonFields,
	createCheckboxField,
	createCollectionPath,
	createDataPath,
	createDateField,
	createDraftField,
	createHomepageDataPath,
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
} from "./schemas/shared";

// TypeScript types
export type * from "./types";

// Legacy compatibility (if needed during migration)
import { createAuthors, createBlog, createProjects } from "./schemas/content";
import {
	createHomepageAbout,
	createHomepageAboutMe,
	createHomepageGallery,
	createHomepageHero,
	createHomepageLocation,
	createHomepageWarranties,
} from "./schemas/homepage";
import {
	createCareers,
	createFooter,
	createOtherPages,
	createResume,
	createServices,
} from "./schemas/pages";

/**
 * Legacy default export for backward compatibility
 * @deprecated Use named exports instead
 */
export default {
	// Content
	Blog: createBlog,
	Authors: createAuthors,
	Projects: createProjects,

	// Pages
	Services: createServices,
	Careers: createCareers,
	OtherPages: createOtherPages,

	// Homepage sections (using new naming)
	heroSection: createHomepageHero,
	homePageAbout: createHomepageAbout,
	homePageAboutMe: createHomepageAboutMe,
	homePageLocation: createHomepageLocation,
	homePageWarranties: createHomepageWarranties,
	homePageLightboxMarquee: createHomepageGallery,

	// Non-homepage singletons
	Footer: createFooter,
	Resume: createResume,
};
