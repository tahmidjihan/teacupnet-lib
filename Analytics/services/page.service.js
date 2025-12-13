import data from '../data.controller';
function trackRoute() {
  let path;
  ['pushState', 'replaceState'].forEach((method) => {
    const original = history[method];
    history[method] = function () {
      path = window.location.pathname;
      return original.apply(this, arguments);
    };
  });
  return path;
}

function trackPageView() {
  let topPercent = 0;
  document.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    const percent = Math.ceil(
      (scrollTop / (scrollHeight - clientHeight)) * 100
    );
    // return percent;
    if (percent > topPercent) {
      topPercent = percent;
    }
    // console.log(percent + '% viewed');
  });
  return topPercent;
}
function track() {
  const route = trackRoute();
  const percentage = trackPageView();

  data.setData('page', {
    page: route,
    percentage: percentage,
  });
}

export default {
  track,
};
