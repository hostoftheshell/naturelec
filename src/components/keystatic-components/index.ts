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

// Servicespage singletons
export { createServicespageIntro } from "./schemas/servicespage";

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
