// Utility functions for movie poster handling

/**
 * Validates if a URL is likely to be a valid image URL
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if the URL appears to be a valid image URL
 */
export const isValidImageUrl = (url) => {
  if (!url || typeof url !== 'string') return false
  
  // Check if it's a valid URL format
  try {
    new URL(url)
  } catch {
    return false
  }
  
  // Check if it ends with common image extensions OR contains image indicators
  const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp|svg)(\?.*)?$/i
  const imageIndicators = /\/images\?|\/image\/|\.googleapis\.com\/|encrypted-tbn|images\.|img\./i
  
  return imageExtensions.test(url) || imageIndicators.test(url)
}

/**
 * Sanitizes and properly encodes a URL for use as an image source
 * @param {string} url - The URL to sanitize
 * @returns {string} - The sanitized URL
 */
export const sanitizeImageUrl = (url) => {
  if (!url) return ''
  
  try {
    // Create URL object to validate and properly encode
    const urlObj = new URL(url)
    return urlObj.toString()
  } catch {
    // If URL is invalid, return original string
    return url
  }
}

/**
 * Sample poster URLs for testing purposes
 */
export const samplePosters = [
  {
    title: "Action Movie",
    url: "https://images.unsplash.com/photo-1489599735734-79b4e43ea6da?w=400&h=600&fit=crop"
  },
  {
    title: "Comedy Movie", 
    url: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop"
  },
  {
    title: "Horror Movie",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop"
  },
  {
    title: "Romance Movie",
    url: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop"
  },
  {
    title: "Google Images Example",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN__J0uCsfv6c2nm9iI_bV6sDhaUWbsHEbd51mvjflKOtHRe2x"
  }
]

/**
 * Generates a placeholder poster URL with custom text
 * @param {string} title - The movie title to display on the placeholder
 * @param {number} width - Width of the placeholder (default: 400)
 * @param {number} height - Height of the placeholder (default: 600)
 * @returns {string} - URL for a placeholder image
 */
export const generatePlaceholderPoster = (title = "Movie Poster", width = 400, height = 600) => {
  const encodedTitle = encodeURIComponent(title)
  return `https://via.placeholder.com/${width}x${height}/cccccc/666666?text=${encodedTitle}`
}

/**
 * Extracts poster URL from various movie API responses
 * @param {object} movieData - Movie data from API
 * @returns {string|null} - Poster URL or null if not found
 */
export const extractPosterUrl = (movieData) => {
  if (!movieData) return null
  
  // Check common poster fields
  const posterFields = ['poster', 'poster_path', 'image', 'thumbnail', 'cover']
  
  for (const field of posterFields) {
    if (movieData[field]) {
      let url = movieData[field]
      
      // Handle relative URLs from TMDB
      if (url.startsWith('/')) {
        url = `https://image.tmdb.org/t/p/w500${url}`
      }
      
      return url
    }
  }
  
  return null
}
