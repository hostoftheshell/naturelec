/**
 * * This file is used to define the navigation links for the site.
 * Notes:
 * 1 level of dropdown is supported
 * Mega menus look best with 3-5 columns, but supports anything > 2 columns
 * If using icons, the icon should be saved in the src/icons folder. If filename is "tabler/icon.svg" then input "tabler/icon"
 * Recommend getting icons from https://tabler.io/icons
 */

// types
import { type navItem } from "../types/configDataTypes";

// note: 1 level of dropdown is supported
const navConfig: navItem[] = [
	// dropdown
	{
		text: "Services",
		dropdown: [
			{
				text: "Électricité générale",
				link: "/services#electricite-generale",
			},
			{
				text: "Domotique & maison intelligente",
				link: "/services#domotique-maison-intelligente",
			},
			{
				text: "Énergies renouvelables",
				link: "/services#energies-renouvelables",
			},
			{
				text: "Maintenance & dépannage",
				link: "/services#maintenance-depannage",
			},
		],
	},
	{
		text: "Contact",
		link: "/contact",
	},
];

export default navConfig;
