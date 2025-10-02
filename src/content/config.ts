import { authorsCollection, blogCollection } from "./schemas/blog.js";
import {
	homepageAboutCollection,
	homepageAboutMeCollection,
	homepageGalleryCollection,
	homepageHeroCollection,
	homepageLocationCollection,
	homepageWarrantiesCollection,
} from "./schemas/homepage.js";
import {
	careersCollection,
	codeToggleCollection,
	footerCollection,
	otherPagesCollection,
	projectsCollection,
	resumeCollection,
} from "./schemas/misc.js";
import { servicesCollection } from "./schemas/services.js";

export const collections = {
	// Content collections
	blog: blogCollection,
	authors: authorsCollection,
	services: servicesCollection,
	projects: projectsCollection,
	careers: careersCollection,
	resume: resumeCollection,
	otherPages: otherPagesCollection,
	codeToggles: codeToggleCollection,

	// Homepage sections
	homepageHero: homepageHeroCollection,
	homepageAbout: homepageAboutCollection,
	homepageAboutMe: homepageAboutMeCollection,
	homepageWarranties: homepageWarrantiesCollection,
	homepageGallery: homepageGalleryCollection,
	homepageLocation: homepageLocationCollection,

	// Site configuration
	footer: footerCollection,
} as const;
