/**
 * Contact Form API Endpoint
 *
 * This endpoint handles contact form submissions with:
 * - Botpoison verification for spam protection
 * - Form validation
 * - Integration with Formspark for email delivery
 *
 * @route POST /api/contact
 */
export const prerender = false;
import type { APIContext } from "astro";

import { verifyBotpoison } from "@/js/botpoisonServer";

interface ContactFormData {
	fullName: string;
	email: string;
	phone?: string;
	reason: string;
	message: string;
	consent: boolean;
	_botpoison: string;
	_gotcha?: string; // Honeypot field
}

export async function POST({ request }: APIContext) {
	try {
		// Parse request body
		const data = (await request.json()) as ContactFormData;

		// Check honeypot field (additional spam protection)
		if (data._gotcha) {
			console.warn("Honeypot triggered - likely spam");
			return new Response(
				JSON.stringify({
					success: false,
					error: "Invalid submission",
				}),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				},
			);
		}

		// Verify Botpoison solution
		const isValidBot = await verifyBotpoison(data._botpoison);

		if (!isValidBot) {
			console.warn("Botpoison verification failed");
			return new Response(
				JSON.stringify({
					success: false,
					error: "Échec de la vérification anti-bot. Veuillez réessayer.",
				}),
				{
					status: 403,
					headers: { "Content-Type": "application/json" },
				},
			);
		}

		// Validate required fields
		const validationErrors = validateFormData(data);
		if (validationErrors.length > 0) {
			return new Response(
				JSON.stringify({
					success: false,
					error: "Données du formulaire invalides",
					validationErrors,
				}),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				},
			);
		}

		// Get Formspark endpoint from environment
		const formsparkId = import.meta.env.PUBLIC_FORMSPARK_FORM_ID;

		if (!formsparkId || formsparkId === "https://submit-form.com/echo") {
			console.warn("Formspark not configured, using echo endpoint");
		}

		// Prepare data for Formspark (remove bot protection fields)
		const formsparkData = {
			fullName: data.fullName,
			email: data.email,
			phone: data.phone || "Non fourni",
			reason: data.reason,
			message: data.message,
			consent: data.consent,
			submittedAt: new Date().toISOString(),
			userAgent: request.headers.get("user-agent") || "Unknown",
		};

		// Forward to Formspark
		const formsparkResponse = await fetch(formsparkId, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(formsparkData),
		});

		if (!formsparkResponse.ok) {
			const errorData = await formsparkResponse.json().catch(() => ({}));
			console.error("Formspark submission failed:", errorData);

			return new Response(
				JSON.stringify({
					success: false,
					error: "Échec de l'envoi du message. Veuillez réessayer.",
				}),
				{
					status: 500,
					headers: { "Content-Type": "application/json" },
				},
			);
		}

		// Success!
		console.log("Contact form submitted successfully:", {
			email: data.email,
			reason: data.reason,
			timestamp: new Date().toISOString(),
		});

		return new Response(
			JSON.stringify({
				success: true,
				message: "Message envoyé avec succès!",
			}),
			{
				status: 200,
				headers: { "Content-Type": "application/json" },
			},
		);
	} catch (error) {
		console.error("Contact form error:", error);

		return new Response(
			JSON.stringify({
				success: false,
				error: "Une erreur interne est survenue. Veuillez réessayer plus tard.",
			}),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			},
		);
	}
}

/**
 * Validate contact form data
 */
function validateFormData(data: ContactFormData): string[] {
	const errors: string[] = [];

	// Validate full name
	if (!data.fullName || data.fullName.trim().length < 2) {
		errors.push("Le nom et prénom sont requis (minimum 2 caractères)");
	}

	// Validate email
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!data.email || !emailRegex.test(data.email)) {
		errors.push("Adresse e-mail invalide");
	}

	// Validate phone (if provided)
	if (data.phone && data.phone.trim().length > 0) {
		const phoneDigits = data.phone.replace(/\s/g, "");
		if (!/^[0-9]{10}$/.test(phoneDigits)) {
			errors.push("Le numéro de téléphone doit contenir 10 chiffres");
		}
	}

	// Validate reason
	const validReasons = [
		"demande-de-devis",
		"installation-electrique",
		"mise-en-conformite",
		"conseils-et-aide",
		"autre",
	];
	if (!data.reason || !validReasons.includes(data.reason)) {
		errors.push("Motif de contact invalide");
	}

	// Validate message
	if (!data.message || data.message.trim().length < 10) {
		errors.push("Le message doit contenir au moins 10 caractères");
	}

	// Validate consent
	if (!data.consent) {
		errors.push("Vous devez accepter le traitement de vos données");
	}

	// Validate Botpoison solution
	if (!data._botpoison || typeof data._botpoison !== "string") {
		errors.push("Solution de vérification anti-bot manquante");
	}

	return errors;
}

/**
 * Handle OPTIONS requests for CORS
 */
export async function OPTIONS() {
	return new Response(null, {
		status: 204,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
		},
	});
}
