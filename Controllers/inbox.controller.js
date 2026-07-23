import fetchAPI from '../Functions/FetchAPI.js';
import { initial } from '../index.js';

/**
 * Submit data to an inbox
 * @param {string} inboxId - Inbox ID
 * @param {Object} data - Data to submit
 * @returns {Promise<{message: string, inboxData: Object}>}
 */
const submitData = async (inboxId, data) => {
  return await fetchAPI('api/client/inbox', 'POST', {
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
  return await fetchAPI(`api/client/inbox/${id}`);
};

// NOTE: getInboxData() was removed. Reading inbox submissions (which may contain
// PII from contact forms) is not available through this public library because
// the client key is embedded in browser JavaScript. Submissions are viewable
// only in the authenticated Teacup dashboard.

export default { submitData, getInbox };
