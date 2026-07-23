import fetchAPI from '../Functions/FetchAPI.js';

// Captured when the library loads — sent as `startedAt` so the API can flag
// impossibly fast (bot) submissions. Real visitors always take longer than
// a few seconds between page load and form submit.
const loadedAt = Date.now();

/**
 * Submit a lead (contact/quote/consultation form) to the Teacup dashboard.
 * @param {Object} lead
 * @param {string} lead.name - Visitor's name (required)
 * @param {string} lead.email - Visitor's email (required)
 * @param {string} lead.message - Message body (required)
 * @param {'CONTACT'|'QUOTE'|'CONSULTATION'|'OTHER'} [lead.type] - Lead type
 * @param {string} [lead.phone] - Phone number
 * @param {Object} [lead.fields] - Extra form fields (budget, service, ...)
 * @param {string} [lead.source] - Which form/page it came from
 * @param {string} [lead.website] - Honeypot field — leave this out of real
 *   forms, or include a hidden input named "website" that users never fill
 * @returns {Promise<{message: string, id?: string}>}
 */
const submit = async (lead) => {
  const utm = {};
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
      const value = params.get(key);
      if (value) utm[key] = value;
    }
  }
  return await fetchAPI('api/client/leads', 'POST', {
    ...lead,
    source: lead.source || (typeof window !== 'undefined' ? window.location.pathname : undefined),
    utm: Object.keys(utm).length ? utm : undefined,
    startedAt: loadedAt,
  });
};

/**
 * Bind a form element so its submissions become leads automatically.
 * Inputs are matched by name: name, email, message, phone; everything else
 * lands in `fields`. Add a hidden input named "website" as a honeypot.
 * @param {string|HTMLFormElement} formOrSelector
 * @param {Object} [options]
 * @param {'CONTACT'|'QUOTE'|'CONSULTATION'|'OTHER'} [options.type]
 * @param {string} [options.source]
 * @param {(result: Object) => void} [options.onSuccess]
 * @param {(error: Object) => void} [options.onError]
 * @returns {() => void} unbind function
 */
const bindForm = (formOrSelector, options = {}) => {
  if (typeof document === 'undefined') return () => {};
  const form =
    typeof formOrSelector === 'string'
      ? document.querySelector(formOrSelector)
      : formOrSelector;
  if (!form || form.tagName !== 'FORM') {
    console.error('[Teacup] leads.bindForm: form not found');
    return () => {};
  }
  const handler = async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const known = { name: '', email: '', message: '', phone: '', website: '' };
    const fields = {};
    for (const [key, value] of data.entries()) {
      if (typeof value !== 'string') continue;
      if (key in known) known[key] = value;
      else fields[key] = value;
    }
    const result = await submit({
      name: known.name,
      email: known.email,
      message: known.message,
      phone: known.phone || undefined,
      website: known.website || undefined,
      type: options.type,
      source: options.source,
      fields: Object.keys(fields).length ? fields : undefined,
    });
    if (result && !result.error) {
      form.reset();
      if (options.onSuccess) options.onSuccess(result);
    } else if (options.onError) {
      options.onError(result);
    }
  };
  form.addEventListener('submit', handler);
  return () => form.removeEventListener('submit', handler);
};

export default { submit, bindForm };
