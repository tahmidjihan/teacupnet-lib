import fetchAPI from '../Functions/FetchAPI.js';
import { initial } from '../index.js';

/**
 * Submit an analytics event
 * @param {string} fingerprint - User fingerprint
 * @param {Object} data - Event data with type (button|page|form)
 * @returns {Promise<{message: string, analytics: Object}>}
 */
const submitEvent = async (fingerprint, data) => {
  return await fetchAPI('api/analytics', 'POST', {
    fingerprint,
    data,
    initial: {
      clientID: initial.clientID,
      clientKey: initial.clientKey,
    },
  });
};

/**
 * Get analytics data for an owner
 * @param {string} owner - Owner ID
 * @param {'button'|'page'|'form'} event - Event type
 * @returns {Promise<{message: string, uniqueSets: Array, data: Array, count: number}>}
 */
const getAnalytics = async (owner, event) => {
  return await fetchAPI(`api/analytics/${owner}?event=${event}`);
};

export default { submitEvent, getAnalytics };
