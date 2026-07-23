import fetchAPI from '../Functions/FetchAPI.js';
import fingerprint from './identity.js';
import data from './data.controller.js';
import { initial } from '../index.js';

/**
 * Save analytics data to the backend
 * Sends accumulated analytics events every 5 seconds
 */
export default function save() {
  setInterval(async () => {
    const newData = data.getNewData();

    // Check if there's any new data to send
    const hasNewData =
      newData.button.length > 0 ||
      newData.form.length > 0 ||
      newData.page.length > 0;

    if (hasNewData) {
      const fp = fingerprint();

      // Send each event type separately to match API format
      const promises = [];

      // Send button events
      newData.button.forEach((btn) => {
        promises.push(
          fetchAPI('api/client/analytics', 'POST', {
            fingerprint: fp,
            data: { type: 'button', ...btn },
            initial: {
              clientID: initial.clientID,
              clientKey: initial.clientKey,
            },
          })
        );
      });

      // Send page events
      newData.page.forEach((pg) => {
        promises.push(
          fetchAPI('api/client/analytics', 'POST', {
            fingerprint: fp,
            data: { type: 'page', ...pg },
            initial: {
              clientID: initial.clientID,
              clientKey: initial.clientKey,
            },
          })
        );
      });

      // Send form events
      newData.form.forEach((frm) => {
        promises.push(
          fetchAPI('api/client/analytics', 'POST', {
            fingerprint: fp,
            data: { type: 'form', ...frm },
            initial: {
              clientID: initial.clientID,
              clientKey: initial.clientKey,
            },
          })
        );
      });

      // Wait for all requests to complete
      await Promise.all(promises);

      // Clear data after sending
      data.clearData();
    }
  }, 5000);
}
