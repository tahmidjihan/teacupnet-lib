import data from '../data.controller';
function track() {
  // console.log(object);
  document.addEventListener('input', (e) => {
    const form = e.target.closest('form');
    if (!form) return;
    function findClosestHeading(el) {
      return el.closest('h1, h2, h3');
    }
    const heading = findClosestHeading(form);
    const fields = form.querySelectorAll('input, textarea, select');
    const filled = [...fields].filter((f) => f.value.trim() !== '').length;

    const percent = (filled / fields.length) * 100;
    // console.log(`Form completion: ${percent.toFixed(1)}%`);
    data.setData('form', {
      form: heading.innerText,
      percent: percent.toFixed(1),
    });
  });
}
export default { track };
