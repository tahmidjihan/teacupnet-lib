import fetchAPI from '../Functions/FetchAPI.js';
import { initial } from '../index.js';

/**
 * Get all blogs for the authenticated client
 * @param {string} [ownerId] - Optional owner ID (used in development mode)
 * @returns {Promise<{message: string, blogs: Array, count: number}>}
 */
const getAllBlogs = async (ownerId = null) => {
  const id = ownerId || initial.clientID;
  const result = await fetchAPI(`api/client/blogs${ownerId ? `?ownerId=${ownerId}` : ''}`);
  return result;
};

/**
 * Get a specific blog by ID
 * @param {string} id - Blog ID
 * @returns {Promise<{message: string, blog: Object}>}
 */
const getBlogById = async (id) => {
  return await fetchAPI(`api/client/blogs/${id}`);
};

export default { getAllBlogs, getBlogById };
