const data = {
  button: [],
  form: [],
  page: [],
};
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
        parseFloat(data.form[existingFormIndex].percent) || 0;
      const newPercent = parseFloat(result.percent) || 0;

      if (newPercent > currentPercent) {
        data.form[existingFormIndex].percent = result.percent;
      }
    } else {
      // Add new entry if it doesn't exist
      data.form.push(result);
    }
  } else {
    // For other types (like 'button'), just push without deduplication
    data[type].push(result);
  }

  return data;
};

export default { setData, data };
