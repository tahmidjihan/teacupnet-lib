import trackClicks from './services/click.service';
import page from './services/page.service';

function track(id) {
  // console.log('tracking begins right here');
  const body = document.getElementById(id);

  //clicks
  trackClicks();
  //pages
  page.trackRoute();
  page.trackPageView();
  // trackRoute();
}
export default { track };
