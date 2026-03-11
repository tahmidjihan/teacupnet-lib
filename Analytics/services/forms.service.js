import data from '../data.controller.js';

/**
 * Track form completion progress
 * Listens for input events and tracks form fill percentage
 */
function track() {
  document.addEventListener('input', (e) => {
    const form = e.target.closest('form');
    if (!form) return;

    /**
     * Find heading element before form (h1, h2, or h3)
     * @param {HTMLFormElement} formElement
     * @returns {Element|null}
     */
    function findHeadingBeforeForm(formElement) {
      let el = formElement.previousElementSibling;
      while (el) {
        if (/H[1-3]/.test(el.tagName)) return el;
        el = el.previousElementSibling;
      }
      return null;
    }

    const heading = findHeadingBeforeForm(form);

    const fields = form.querySelectorAll('input, textarea, select');
    const filled = [...fields].filter((f) => f.value.trim() !== '').length;

    const percent = (filled / fields.length) * 100;

    data.setData('form', {
      form: form.dataset.formName || heading?.innerText || 'unknown-form',
      percentage: Math.ceil(percent),
    });
  });
}

export default { track };
