/**
 * Botpoison Server Utilities
 * Server-side bot protection verification
 *
 * ⚠️ WARNING: This file should ONLY be used in server-side contexts
 * (API routes, server endpoints, SSR pages with Astro.locals)
 * NEVER import this in client-side code!
 *
 * @see https://botpoison.com/documentation
 */

import PoisonNode from "@botpoison/node";

// Initialize Botpoison Node instance with secret key from environment
// This will throw an error if the secret key is not configured
let botnode: PoisonNode | null = null;

const initBotpoison = () => {
	if (!botnode) {
		const secretKey = import.meta.env.BOTPOISON_SECRET_KEY;

		if (!secretKey) {
			throw new Error("BOTPOISON_SECRET_KEY is not configured in environment variables");
		}

		botnode = new PoisonNode({ secretKey });
	}

	return botnode;
};

/**
 * Verify a Botpoison solution from the client
 *
 * @param {string} solution - The solution token from the client
 * @returns {Promise<boolean>} True if the solution is valid, false otherwise
 *
 * @example
 * ```ts
 * // In an Astro API route
 * export async function POST({ request }: APIContext) {
 *   const data = await request.json();
 *   const isValid = await verifyBotpoison(data._botpoison);
 *
 *   if (!isValid) {
 *     return new Response(JSON.stringify({ error: "Bot detection failed" }), {
 *       status: 403
 *     });
 *   }
 *
 *   // Process the request...
 * }
 * ```
 */
export const verifyBotpoison = async (solution: string): Promise<boolean> => {
	try {
		if (!solution) {
			console.warn("Botpoison solution is missing");
			return false;
		}

		const bot = initBotpoison();
		const { ok } = await bot.verify(solution);

		if (!ok) {
			console.warn("Botpoison verification failed: Invalid solution");
		}

		return ok;
	} catch (error) {
		console.error("Botpoison verification error:", error);
		return false;
	}
};

/**
 * Verify Botpoison solution and throw an error if invalid
 * Useful when you want to fail fast
 *
 * @param {string} solution - The solution token from the client
 * @throws {Error} If the solution is invalid or missing
 *
 * @example
 * ```ts
 * export async function POST({ request }: APIContext) {
 *   const data = await request.json();
 *
 *   try {
 *     await verifyBotpoisonOrThrow(data._botpoison);
 *     // Process the request...
 *   } catch (error) {
 *     return new Response(JSON.stringify({ error: error.message }), {
 *       status: 403
 *     });
 *   }
 * }
 * ```
 */
export const verifyBotpoisonOrThrow = async (solution: string): Promise<void> => {
	const isValid = await verifyBotpoison(solution);

	if (!isValid) {
		throw new Error("Invalid bot protection solution");
	}
};

/**
 * Check if Botpoison is properly configured on the server
 *
 * @returns {boolean} True if secret key is configured
 */
export const isBotpoisonServerConfigured = (): boolean => {
	return !!import.meta.env.BOTPOISON_SECRET_KEY;
};
