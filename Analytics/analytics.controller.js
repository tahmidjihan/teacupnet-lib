import trackClicks from './services/click.service';
import page from './services/page.service';
import forms from './services/forms.service';
function track(id) {
  // console.log('tracking begins right here');
  const body = document.getElementById(id);

  //clicks
  trackClicks();
  //pages
  page.trackRoute();
  page.trackPageView();

  // forms
  forms.trackForms();
}
export default { track };
