import fetchAPI from '../Functions/FetchAPI';
import { initial } from '../index.js';
const getBlogs = async () => {
  const id = initial.clientID;
  // console.log(id);
  const result = await fetchAPI(`dashboard/blogs/${id}`);
  // console.log(result);
  return result;
};

const getBlog = async (id) => {
  const clientID = initial.clientID;
  return await fetchAPI(`dashboard/blogs/${clientID}/${id}`);
};
const postData = async (id, data) => {
  return await fetchAPI('api/inboxData', 'POST', {
    inbox_id: id,
    data: data,
  });
};
// module.exports = { getBlogs, getBlog };
export default { getBlogs, getBlog, postData };
