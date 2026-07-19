import fetchAPI from '../Functions/FetchAPI.js';

const loadedAt = Date.now();
const CANCEL_TOKEN_KEY = 'teacup_appt_cancel_tokens';

// Cancel tokens are kept in localStorage so the visitor can cancel their own
// booking later from the same browser. They are single-use and scoped to one
// appointment — losing them only means cancelling requires contacting the
// business.
function rememberCancelToken(id, token) {
  if (typeof localStorage === 'undefined') return;
  try {
    const stored = JSON.parse(localStorage.getItem(CANCEL_TOKEN_KEY) || '{}');
    stored[id] = token;
    localStorage.setItem(CANCEL_TOKEN_KEY, JSON.stringify(stored));
  } catch {
    /* storage full/blocked — token is still returned to the caller */
  }
}

function recallCancelToken(id) {
  if (typeof localStorage === 'undefined') return null;
  try {
    const stored = JSON.parse(localStorage.getItem(CANCEL_TOKEN_KEY) || '{}');
    return stored[id] || null;
  } catch {
    return null;
  }
}

/**
 * Get open booking slots for a date.
 * @param {string} date - Calendar date in the business timezone, "YYYY-MM-DD"
 * @returns {Promise<{configured: boolean, slots: Array<{startsAt: string, endsAt: string}>}>}
 */
const getAvailability = async (date) => {
  return await fetchAPI(`api/appointments/availability?date=${encodeURIComponent(date)}`);
};

/**
 * Book an appointment in one of the slots returned by getAvailability().
 * @param {Object} booking
 * @param {string} booking.date - "YYYY-MM-DD" (business timezone)
 * @param {string} booking.startsAt - Slot start ISO string from getAvailability()
 * @param {string} booking.customerName
 * @param {string} booking.customerEmail
 * @param {string} [booking.customerPhone]
 * @param {string} [booking.service]
 * @param {string} [booking.notes]
 * @returns {Promise<{message: string, id?: string, cancelToken?: string}>}
 *   Keep `cancelToken` if you want to offer cancellation — it is shown once.
 */
const book = async (booking) => {
  const result = await fetchAPI('api/appointments', 'POST', {
    ...booking,
    startedAt: loadedAt,
  });
  if (result && result.id && result.cancelToken) {
    rememberCancelToken(result.id, result.cancelToken);
  }
  return result;
};

/**
 * Cancel a booking. If no token is passed, the one saved in this browser at
 * booking time is used.
 * @param {string} id - Appointment ID returned by book()
 * @param {string} [token] - Cancel token returned by book()
 * @param {string} [reason]
 * @returns {Promise<{message: string}>}
 */
const cancel = async (id, token = null, reason = undefined) => {
  const cancelToken = token || recallCancelToken(id);
  if (!cancelToken) {
    return {
      error: 'Missing token',
      message: 'No cancel token available for this appointment',
    };
  }
  return await fetchAPI('api/appointments/cancel', 'POST', {
    id,
    token: cancelToken,
    reason,
  });
};

export default { getAvailability, book, cancel };
