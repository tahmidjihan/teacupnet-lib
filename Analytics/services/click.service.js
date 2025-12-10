export default function trackClicks() {
  addEventListener('click', (e) => {
    if (e.target.tagName == 'BUTTON') {
      console.log('button clicked: ' + e.target.innerText);
      console.log('at: ' + window.location.pathname);
    }
  });
}
