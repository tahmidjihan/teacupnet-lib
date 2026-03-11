/**
 * Analytics data store for tracking user interactions
 * Stores button clicks, form completions, and page views
 */
const data = {
  button: [],
  form: [],
  page: [],
};

/**
 * Previous data store for deduplication
 */
const prevData = {
  button: [],
  form: [],
  page: [],
};

/**
 * Clear current data and move to previous data
 */
const clearData = () => {
  prevData.button = [...data.button];
  prevData.form = [...data.form];
  prevData.page = [...data.page];
  data.button = [];
  data.form = [];
  data.page = [];
};

/**
 * Get new data that hasn't been sent yet
 * Filters out duplicates based on previous data
 * @returns {{button: Array, form: Array, page: Array}}
 */
const getNewData = () => {
  const newData = {
    button: [],
    form: [],
    page: [],
  };

  // Compare buttons - only include unique button+page combinations
  data.button.forEach((btn) => {
    const isDuplicate = prevData.button.some(
      (prevBtn) => prevBtn.button === btn.button && prevBtn.page === btn.page
    );
    if (!isDuplicate) {
      newData.button.push(btn);
    }
  });

  // Compare pages - only include unique page+percentage combinations
  data.page.forEach((pg) => {
    const isDuplicate = prevData.page.some(
      (prevPg) =>
        prevPg.page === pg.page && prevPg.percentage === pg.percentage
    );
    if (!isDuplicate) {
      newData.page.push(pg);
    }
  });

  // Compare forms - only include unique form+percentage combinations
  data.form.forEach((frm) => {
    const isDuplicate = prevData.form.some(
      (prevFrm) =>
        prevFrm.form === frm.form && prevFrm.percentage === frm.percentage
    );
    if (!isDuplicate) {
      newData.form.push(frm);
    }
  });

  return newData;
};

/**
 * Set analytics data
 * @param {'button'|'form'|'page'} type - Type of analytics event
 * @param {Object} result - Event data
 */
const setData = (type, result) => {
  if (type === 'page') {
    // Find existing page entry
    const existingPageIndex = data.page.findIndex(
      (page) => page.page === result.page
    );

    if (existingPageIndex !== -1) {
      // Update only if new percentage is higher
      const currentPercentage =
        parseFloat(data.page[existingPageIndex].percentage) || 0;
      const newPercentage = parseFloat(result.percentage) || 0;

      if (newPercentage > currentPercentage) {
        data.page[existingPageIndex].percentage = result.percentage;
      }
    } else {
      // Add new entry if it doesn't exist
      data.page.push(result);
    }
  } else if (type === 'form') {
    // Find existing form entry
    const existingFormIndex = data.form.findIndex(
      (form) => form.form === result.form
    );

    if (existingFormIndex !== -1) {
      // Update only if new percentage is higher
      const currentPercent =
        parseFloat(data.form[existingFormIndex].percentage) || 0;
      const newPercent = parseFloat(result.percentage) || 0;

      if (newPercent > currentPercent) {
        data.form[existingFormIndex].percentage = result.percentage;
      }
    } else {
      // Add new entry if it doesn't exist
      data.form.push(result);
    }
  } else if (type === 'button') {
    // For buttons, just push without deduplication
    data.button.push(result);
  }

  return data;
};

export default { setData, data, clearData, getNewData };
