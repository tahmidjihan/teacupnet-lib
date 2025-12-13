const data = {
  button: [],
  form: [],
  page: [],
};
const setData = (type, result) => {
  if (type == 'page') {
    data.page.map((page) => {
      if (page.page == result.page) {
        page.percentage = result.percentage;
      }
    });
  }
  data[type].push(result);
  return data;
};

export default { setData, data };
