import { type ContactDataProps } from "../types/configDataTypes";

export const contactData: ContactDataProps = {
	phone: "06 74 98 50 72",
	phone_link: "+33674985072",
	email: "contact@naturelec89.fr",

	// Physical address
	address: {
		street: "5 place de l'Église",
		city: "LUCY-SUR-CURE",
		postalCode: "89270",
		country: "France",
	},

	// Business hours
	businessHours: {
		weekdays: "8h00 - 18h00",
		saturday: "8h00 - 18h00",
		sunday: "Fermé",
	},

	// Social media / other contact methods
	website: "https://www.naturelec89.fr",
	facebook: "https://www.facebook.com/profile.php?id=61559893083400",
};

export default contactData;
