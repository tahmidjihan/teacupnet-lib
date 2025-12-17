import fetchAPI from '../Functions/FetchAPI';
import { initial } from '../index.js';

const getBlogs = async () => {
  const id = initial.clientID;
  const result = await fetchAPI(`dashboard/blogs/${id}`);
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

export default { getBlogs, getBlog, postData };
