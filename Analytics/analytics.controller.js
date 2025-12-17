import clicks from './services/click.service';
import page from './services/page.service';
import forms from './services/forms.service';
import save from './save';

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
