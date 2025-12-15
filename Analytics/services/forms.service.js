import data from '../data.controller';
function track() {
  document.addEventListener('input', (e) => {
    const form = e.target.closest('form');
    if (!form) return;

    function findHeadingBeforeForm(form) {
      let el = form.previousElementSibling;
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
      percent: percent.toFixed(1),
    });
  });
}

export default { track };
