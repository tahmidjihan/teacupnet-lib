import data from './../data.controller';

function track() {
  addEventListener('click', (e) => {
    if (e.target.tagName == 'BUTTON') {
      data.setData('button', {
        button: e.target.innerText,
        page: window.location.pathname,
      });
    }
  });
}
export default { track };
