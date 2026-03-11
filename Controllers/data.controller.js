import fetchAPI from '../Functions/FetchAPI.js';
import { initial } from '../index.js';

/**
 * Get all blogs for the authenticated client
 * @returns {Promise<{message: string, blogs: Array, count: number}>}
 */
const getBlogs = async () => {
  return await fetchAPI('api/blogs');
};

/**
 * Get a specific blog by ID
 * @param {string} id - Blog ID
 * @returns {Promise<{message: string, blog: Object}>}
 */
const getBlog = async (id) => {
  return await fetchAPI(`api/blogs/${id}`);
};

/**
 * Submit data to an inbox
 * @param {string} inboxId - Inbox ID
 * @param {Object} data - Data to submit
 * @returns {Promise<{message: string, inboxData: Object}>}
 */
const postData = async (inboxId, data) => {
  return await fetchAPI('api/inbox', 'POST', {
    inbox_id: inboxId,
    data: data,
  });
};

export default { getBlogs, getBlog, postData };
