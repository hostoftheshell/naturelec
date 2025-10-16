/**
 * * This file is used to define the navigation links for the site.
 * Notes:
 * 1 level of dropdown is supported
 * Mega menus look best with 3-5 columns, but supports anything > 2 columns
 * If using icons, the icon should be saved in the src/icons folder. If filename is "tabler/icon.svg" then input "tabler/icon"
 * Recommend getting icons from https://tabler.io/icons
 */

// types
import { getCollection } from "astro:content";

import type { navItem } from "../types/configDataTypes";

/**
 * Static navigation items (non-services)
 */
const staticNavItems: navItem[] = [
	{
		text: "Contact",
		link: "/contact",
	},
	{
		text: "Mentions légales",
		link: "/mentions-legales",
	},
	{
		text: "Politique de cookies",
		link: "/politique-de-confidentialite",
	},
];

/**
 * Builds navigation configuration dynamically by fetching services from the collection
 * Services with "servicespage" in their displayLocation will be added to the Services dropdown
 */
export async function getNavConfig(): Promise<navItem[]> {
	// Fetch all services from the collection
	const allServices = await getCollection("services", ({ data }) => {
		// Filter out draft entries
		return data.draft !== true;
	});

	// Filter services that should appear in the services page navigation
	const servicesPageItems = allServices
		.filter((service) => service.data.displayLocation.includes("servicespage"))
		.sort((a, b) => (a.data.order || 0) - (b.data.order || 0)) // Sort by order field
		.map((service) => ({
			text: service.data.title,
			link: `/services#${service.data.mappingKey || service.id}`,
		}));

	// Build the complete navigation with Services dropdown
	const navConfig: navItem[] = [];

	// Add Services dropdown if there are any services to show
	if (servicesPageItems.length > 0) {
		navConfig.push({
			text: "Services",
			dropdown: servicesPageItems,
		});
	}

	// Add static navigation items
	navConfig.push(...staticNavItems);

	return navConfig;
}

/**
 * Default static export for backwards compatibility
 * This will be populated with services at build time where used
 */
const navConfig: navItem[] = [
	// Services dropdown - will be dynamically populated
	{
		text: "Services",
		dropdown: [
			{
				text: "Électricité générale",
				link: "/services#electricite-generale",
			},
			{
				text: "Domotique & maison intelligente",
				link: "/services#domotique-et-maison-intelligente",
			},
			{
				text: "Énergies renouvelables",
				link: "/services#energies-renouvelables",
			},
			{
				text: "Maintenance & dépannage",
				link: "/services#maintenance-et-depannage",
			},
		],
	},
	...staticNavItems,
];

export default navConfig;
