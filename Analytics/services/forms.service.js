function trackForms() {
  // console.log(object);
  document.addEventListener('input', (e) => {
    const form = e.target.closest('form');
    if (!form) return;

    const fields = form.querySelectorAll('input, textarea, select');
    const filled = [...fields].filter((f) => f.value.trim() !== '').length;

    const percent = (filled / fields.length) * 100;
    console.log(`Form completion: ${percent.toFixed(1)}%`);
  });
}
export default { trackForms };
