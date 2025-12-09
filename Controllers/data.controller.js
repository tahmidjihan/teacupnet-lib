import fetchAPI from '../Functions/FetchAPI';
import initial from '../index.js';
const getBlogs = async () => {
  const email = initial.clientEmail;
  // const data = await fetch(
  //   `https://teacupnet-backend.vercel.app/dashboard/blogs/${email}`,
  //   {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }
  // );
  // // console.log(data);
  // return data.json();
  return await fetchAPI(`dashboard/blogs/${email}`);
};

const getBlog = async (id) => {
  const email = initial.clientEmail;
  // const data = await fetch(
  //   `https://teacupnet-backend.vercel.app/dashboard/blogs/${email}/${id}`,
  //   {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }
  // );
  // return data.json();
  return await fetchAPI(`dashboard/blogs/${email}/${id}`);
};
const postData = async (id, data) => {
  // const insertedData = await fetch(
  //   'https://teacupnet-backend.vercel.app/api/inboxData',
  //   {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ inbox_id: id, data: data }),
  //   }
  // );
  // return insertedData;
  return await fetchAPI('api/inboxData', 'POST', {
    inbox_id: id,
    data: data,
  });
};
// module.exports = { getBlogs, getBlog };
export default { getBlogs, getBlog, postData };
