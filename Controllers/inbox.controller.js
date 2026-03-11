import fetchAPI from '../Functions/FetchAPI.js';
import { initial } from '../index.js';

/**
 * Submit data to an inbox
 * @param {string} inboxId - Inbox ID
 * @param {Object} data - Data to submit
 * @returns {Promise<{message: string, inboxData: Object}>}
 */
const submitData = async (inboxId, data) => {
  return await fetchAPI('api/inbox', 'POST', {
    inbox_id: inboxId,
    data: data,
  });
};

/**
 * Get inbox by ID
 * @param {string} id - Inbox ID
 * @returns {Promise<{message: string, inbox: Object}>}
 */
const getInbox = async (id) => {
  return await fetchAPI(`api/inbox/${id}`);
};

/**
 * Get all data for an inbox
 * @param {string} id - Inbox ID
 * @returns {Promise<{message: string, inboxData: Array, count: number}>}
 */
const getInboxData = async (id) => {
  return await fetchAPI(`api/inbox/${id}/data`);
};

export default { submitData, getInbox, getInboxData };
