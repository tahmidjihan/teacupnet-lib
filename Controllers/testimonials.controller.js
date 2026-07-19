import fetchAPI from '../Functions/FetchAPI.js';

const loadedAt = Date.now();

/**
 * Get approved testimonials for rendering on the customer site.
 * Only APPROVED testimonials are ever returned by the API.
 * @returns {Promise<{message: string, testimonials: Array}>}
 */
const getApproved = async () => {
  return await fetchAPI('api/testimonials');
};

/**
 * Submit a testimonial. It stays hidden until approved in the dashboard.
 * @param {Object} testimonial
 * @param {string} testimonial.authorName - Author's name (required)
 * @param {string} testimonial.body - Testimonial text (required)
 * @param {string} [testimonial.company]
 * @param {string} [testimonial.role]
 * @param {number} [testimonial.rating] - 1 to 5
 * @param {string} [testimonial.website] - Honeypot — hidden input users never fill
 * @returns {Promise<{message: string, id?: string}>}
 */
const submit = async (testimonial) => {
  return await fetchAPI('api/testimonials', 'POST', {
    ...testimonial,
    startedAt: loadedAt,
  });
};

export default { getApproved, submit };
