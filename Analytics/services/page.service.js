function trackRoute() {
  ['pushState', 'replaceState'].forEach((method) => {
    const original = history[method];
    history[method] = function () {
      //   fireRouteChange(window.location.pathname);
      console.log('Route changed to : ' + window.location.pathname);
      return original.apply(this, arguments);
    };
  });
}

function trackPageView() {
  document.addEventListener('scroll', () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || document.body.clientHeight;

    const percent = (scrollTop / (scrollHeight - clientHeight)) * 100;

    console.log(percent.toFixed(2) + '% viewed');
  });
}

export default {
  trackRoute,
  trackPageView,
};
