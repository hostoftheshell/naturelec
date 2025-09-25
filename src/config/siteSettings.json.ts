/**
 * Global site settings
 */

import { type SiteSettingsProps } from "./types/configDataTypes";

// The below locales need to match what you've put in your `astro.config.mjs` file
export const locales = ["fr"] as const;
export const defaultLocale = "fr" as const;

// localeMap is used to map languages to their respective locales - used for formatDate function
export const localeMap = {
	
	fr: "fr-FR",
} as const;

// text to show in the language switcher for each locale
export const languageSwitcherMap = {
	
	fr: "FR",
	// 
	// fr: "Français",
} as const;

// site settings that don't change between languages
export const siteSettings: SiteSettingsProps = {
	useViewTransitions: true,
	useAnimations: true,
};

export default siteSettings;