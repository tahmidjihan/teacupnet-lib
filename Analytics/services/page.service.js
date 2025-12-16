import data from '../data.controller';

let currentPath = window.location.pathname;
let topPercent = 0;

function trackRoute() {
  ['pushState', 'replaceState'].forEach((method) => {
    const original = history[method];
    history[method] = function () {
      const result = original.apply(this, arguments);
      
      // New page navigation detected
      const newPath = window.location.pathname;
      if (newPath !== currentPath) {
        // Initialize new page with 0%
        currentPath = newPath;
        topPercent = 0;
        data.setData('page', {
          page: currentPath,
          percentage: 0,
        });
      }
      
      return result;
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
    
    // Update only if percentage increased
    if (percent > topPercent) {
      topPercent = percent;
      
      // Update the data with new percentage
      data.setData('page', {
        page: currentPath,
        percentage: topPercent,
      });
    }
  });
}

function track() {
  // Initialize current page
  data.setData('page', {
    page: currentPath,
    percentage: 0,
  });
  
  // Set up route tracking for navigation
  trackRoute();
  
  // Set up scroll tracking
  trackPageView();
}

export default {
  track,
};
