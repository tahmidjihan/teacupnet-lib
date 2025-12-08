const getBlogs = async (email) => {
  const data = await fetch(
    `https://teacupnet-backend.vercel.app/dashboard/blogs/${email}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  // console.log(data);
  return data.json();
};

const getBlog = async (email, id) => {
  const data = await fetch(
    `https://teacupnet-backend.vercel.app/dashboard/blogs/${email}/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return data.json();
};
const postInbox = async (id, data) => {
  const insertedData = await fetch(
    'https://teacupnet-backend.vercel.app/api/inboxData',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inbox_id: id, data: data }),
    }
  );
  return insertedData;
};
// module.exports = { getBlogs, getBlog };
exports.default = { getBlogs, getBlog, postInbox };
