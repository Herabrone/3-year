// Use import.meta.glob to get all images from the images folder at build time
const imageModules = import.meta.glob('/public/images/*.{jpg,jpeg,png,gif,webp}', { eager: true });

// Extract just the public-facing paths (strip "/public" prefix)
export const allImages = Object.keys(imageModules).map((path) =>
  path.replace('/public', '')
);

/**
 * Returns a shuffled copy of all available images
 */
export function getShuffledImages() {
  const shuffled = [...allImages];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}