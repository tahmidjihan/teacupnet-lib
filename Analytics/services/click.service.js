import data from './../data.controller.js';

/**
 * Track button clicks
 * Listens for click events on BUTTON elements and records them
 */
function track() {
  document.addEventListener('click', (e) => {
    const button = e.target.closest('button');
    if (button) {
      data.setData('button', {
        button: button.innerText || button.textContent || 'unknown-button',
        page: window.location.pathname,
      });
    }
  });
}

export default { track };
