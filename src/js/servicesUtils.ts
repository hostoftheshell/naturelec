import { readFile } from "node:fs/promises";
import { join } from "node:path";

import type { CollectionEntry } from "astro:content";

/**
 * Parse .mdoc content to a minimal block-level AST compatible with DocumentRenderer
 * Supports paragraphs, blockquotes, unordered/ordered lists. Inline markdown is handled later.
 */
function parseMdocContent(content: string): any[] {
	if (!content || content.trim() === "") return [];

	// Normalize line continuations and split into lines
	const cleaned = content.replace(/\\\s*\n/g, " ").replace(/\r\n?|\n/g, "\n");
	const lines = cleaned.split("\n");

	const blocks: any[] = [];

	let currentParagraph: string[] = [];
	let currentList: { ordered: boolean; items: string[] } | null = null;
	let currentQuote: string[] = [];

	const flushParagraph = () => {
		if (currentParagraph.length > 0) {
			const text = currentParagraph.join(" ").trim();
			if (text) {
				blocks.push({ type: "paragraph", children: [{ text }] });
			}
			currentParagraph = [];
		}
	};

	const flushList = () => {
		if (currentList && currentList.items.length > 0) {
			const children = currentList.items.map((itemText) => ({
				// Represent each list item as inline children directly to avoid <p> inside <li>
				children: [{ text: itemText.trim() }],
			}));
			blocks.push({
				type: "list",
				listType: currentList.ordered ? "ordered" : "unordered",
				children,
			});
		}
		currentList = null;
	};

	const flushQuote = () => {
		if (currentQuote.length > 0) {
			blocks.push({
				type: "blockquote",
				children: [{ type: "paragraph", children: [{ text: currentQuote.join(" ").trim() }] }],
			});
			currentQuote = [];
		}
	};

	for (const rawLine of lines) {
		const line = rawLine.trimEnd();

		// Blank line: separate blocks
		if (line.trim() === "") {
			flushParagraph();
			flushList();
			flushQuote();
			continue;
		}

		// Blockquote: > text
		const quoteMatch = /^>\s?(.*)$/.exec(line);
		if (quoteMatch) {
			// Enter quote mode
			flushParagraph();
			flushList();
			currentQuote.push(quoteMatch[1]);
			continue;
		} else if (currentQuote.length > 0) {
			// End of quote if next non-quote line appears
			flushQuote();
		}

		// Ordered list: 1. item
		const orderedMatch = /^\d+\.\s+(.*)$/.exec(line);
		if (orderedMatch) {
			flushParagraph();
			if (!currentList || !currentList.ordered) {
				flushList();
				currentList = { ordered: true, items: [] };
			}
			currentList.items.push(orderedMatch[1]);
			continue;
		}

		// Unordered list: - item or * item
		const unorderedMatch = /^[-*]\s+(.*)$/.exec(line);
		if (unorderedMatch) {
			flushParagraph();
			if (!currentList || currentList.ordered) {
				flushList();
				currentList = { ordered: false, items: [] };
			}
			currentList.items.push(unorderedMatch[1]);
			continue;
		}

		// If we were in a list and encountered a normal line, close the list
		if (currentList) {
			flushList();
		}

		// Otherwise, accumulate paragraph text
		currentParagraph.push(line.trim());
	}

	// Flush any remaining buffers
	flushQuote();
	flushList();
	flushParagraph();

	return blocks;
}

/**
 * Load description content from .mdoc files for service items
 * Reads the external .mdoc files created by Keystatic and converts them to structured format
 */
export async function loadServiceDescriptions(
	category: CollectionEntry<"services">,
): Promise<CollectionEntry<"services">> {
	if (!category.data.services || category.data.services.length === 0) {
		return category;
	}

	// The category.id might be "fr/electricite-generale" or just "electricite-generale"
	// depending on how Astro loads the collection
	const idParts = category.id.split("/");
	let locale: string;
	let categorySlug: string;

	if (idParts.length > 1) {
		// Format: "fr/electricite-generale"
		locale = idParts[0];
		categorySlug = idParts.slice(1).join("/");
	} else {
		// Format: "electricite-generale" - need to detect locale from file path
		// Default to 'fr' if not specified
		locale = "fr";
		categorySlug = category.id;
	}

	const basePath = `src/data/services/${locale}/${categorySlug}`;

	const servicesWithDescriptions = await Promise.all(
		category.data.services.map(async (service, index) => {
			if (service.discriminant === "text") {
				try {
					// Try to read the description.mdoc file
					const descPath = join(
						process.cwd(),
						basePath,
						"services",
						String(index),
						"value",
						"description.mdoc",
					);

					const content = await readFile(descPath, "utf-8");
					const parsedContent = parseMdocContent(content);

					return {
						...service,
						value: {
							...service.value,
							description: parsedContent,
						},
					};
				} catch (error) {
					// If file doesn't exist or can't be read, return service as-is
					// Silently continue - descriptions are optional
					return service;
				}
			}
			return service;
		}),
	);

	return {
		...category,
		data: {
			...category.data,
			services: servicesWithDescriptions,
		},
	} as CollectionEntry<"services">;
}

/**
 * Load description content from .mdoc files for additional services
 * Similar to loadServiceDescriptions but for the additionals collection structure
 */
export async function loadAdditionalServiceDescriptions(
	additionalServicesData: any,
	locale: string = "fr",
): Promise<any> {
	if (
		!additionalServicesData?.additionalServices ||
		additionalServicesData.additionalServices.length === 0
	) {
		return additionalServicesData;
	}

	const basePath = `src/data/servicespage/additionals/${locale}/index`;

	const servicesWithDescriptions = await Promise.all(
		additionalServicesData.additionalServices.map(async (service: any, index: number) => {
			try {
				// Try to read the description.mdoc file
				const descPath = join(
					process.cwd(),
					basePath,
					"additionalServices",
					String(index),
					"description.mdoc",
				);

				const content = await readFile(descPath, "utf-8");
				const parsedContent = parseMdocContent(content);

				return {
					...service,
					description: parsedContent,
				};
			} catch (error) {
				// If file doesn't exist or can't be read, return service as-is
				// Silently continue - descriptions are optional
				return service;
			}
		}),
	);

	return {
		...additionalServicesData,
		additionalServices: servicesWithDescriptions,
	};
}
