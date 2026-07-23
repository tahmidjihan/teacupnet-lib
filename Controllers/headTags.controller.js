import fetchAPI from '../Functions/FetchAPI.js';

const SELF_CLOSING = new Set(['META', 'LINK']);

function buildElement(tag) {
  const el = document.createElement(tag.kind.toLowerCase());
  el.setAttribute('data-teacup-tag-id', tag.id);

  const attributes = tag.attributes || {};
  for (const [key, value] of Object.entries(attributes)) {
    el.setAttribute(key, value);
  }

  if (!SELF_CLOSING.has(tag.kind) && tag.content) {
    if (tag.kind === 'NOSCRIPT') {
      // <noscript> only renders when JS is off; since we're injecting via
      // JS its content never executes, so plain markup is safe here.
      el.innerHTML = tag.content;
    } else {
      // SCRIPT / STYLE — textContent, not innerHTML, so it's parsed as
      // code/CSS rather than interpreted as nested HTML.
      el.textContent = tag.content;
    }
  }

  return el;
}

/**
 * Fetch this company's enabled head tags and inject them into
 * `document.head`, in sortOrder. Safe to call more than once per page —
 * tags already present (matched by id) are skipped, not duplicated.
 * @returns {Promise<void>}
 */
const inject = async () => {
  if (typeof document === 'undefined') return;

  const result = await fetchAPI('api/client/head-tags');
  if (!result || result.error || !Array.isArray(result.headTags)) return;

  for (const tag of result.headTags) {
    if (document.head.querySelector(`[data-teacup-tag-id="${tag.id}"]`)) continue;
    try {
      document.head.appendChild(buildElement(tag));
    } catch (error) {
      console.error('[Teacup] Failed to inject head tag', tag.id, error);
    }
  }
};

export default { inject };
