/**
 * Image utilities for resolving dynamic image paths to ImageMetadata
 */

// Use Vite's import.meta.glob to eagerly load all images
const images = import.meta.glob<{ default: ImageMetadata }>(
	"/src/assets/images/**/*.{jpg,jpeg,png,webp,avif,gif,svg}",
	{
		eager: true,
	},
);

/**
 * Resolve an image path (with @images alias) to ImageMetadata
 *
 * @param imagePath - Path to the image (e.g., "@images/services/categories/electricite-generale/image.jpg")
 * @returns ImageMetadata object or null if not found
 *
 * @example
 * const image = resolveImage("@images/services/categories/electricite-generale/image.jpg");
 * // Returns ImageMetadata object that can be used with Astro's Image component
 */
export function resolveImage(imagePath: string | null | undefined): ImageMetadata | null {
	if (!imagePath) return null;

	// Convert @images alias to /src/assets/images path
	const normalizedPath = imagePath.replace(/^@images\//, "/src/assets/images/");

	// Look up the image in our glob map
	const imageModule = images[normalizedPath];

	if (!imageModule) {
		console.warn(`Image not found: ${imagePath} (resolved to: ${normalizedPath})`);
		return null;
	}

	return imageModule.default;
}

/**
 * Resolve multiple image paths at once
 *
 * @param imagePaths - Array of image paths
 * @returns Array of ImageMetadata objects (null for not found images)
 */
export function resolveImages(imagePaths: (string | null | undefined)[]): (ImageMetadata | null)[] {
	return imagePaths.map(resolveImage);
}

/**
 * Check if an image path exists
 *
 * @param imagePath - Path to check
 * @returns true if the image exists
 */
export function imageExists(imagePath: string | null | undefined): boolean {
	return resolveImage(imagePath) !== null;
}
