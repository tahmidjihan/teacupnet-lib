export const getBlogs = async (email) => {
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
export const getBlog = async (email, id) => {
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
