export interface Logo {
	name: string;
	icon: string;
	url?: string;
	active: boolean;
}

export const logos = [
	{
		name: "Rexel",
		icon: "logos/rexel",
		url: "https://www.rexel.fr/frx/",
		active: true,
	},
	{
		name: "Sonepar",
		icon: "logos/sonepar",
		url: "https://www.sonepar.fr/fr-fr",
		active: true,
	},
	{
		name: "YESSS Electrical",
		icon: "logos/yesss_electrical",
		url: "https://www.yesss-fr.com/",
		active: true,
	},
	{
		name: "Capt Air Solaire",
		icon: "logos/captairsolaire",
		url: "https://captairsolaire.com/",
		active: true,
	},
];
