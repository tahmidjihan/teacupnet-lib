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
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    const percent = Math.ceil(
      (scrollTop / (scrollHeight - clientHeight)) * 100
    );

    // console.log(percent + '% viewed');
  });
}

export default {
  trackRoute,
  trackPageView,
};
