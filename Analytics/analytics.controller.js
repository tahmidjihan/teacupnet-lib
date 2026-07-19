import clicks from './services/click.service.js';
import page from './services/page.service.js';
import forms from './services/forms.service.js';
import save from './save.js';

function track() {
  // Track button clicks
  clicks.track();
  
  // Track page views and scrolling
  page.track();

  // forms
  forms.track();

  // save
  save();
}
export default { track };
