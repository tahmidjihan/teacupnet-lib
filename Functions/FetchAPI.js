export default async function fetchAPI(path, method = 'GET', body = null) {
  const req = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  if (method === 'GET') delete req.body;
  // const data = await fetch(`https://teacupnet-backend.vercel.app/${path}`, {
  try {
    const data = await fetch(`http://localhost:3000/${path}`, req);

    return await data.json();
  } catch (error) {
    console.log(error);
  }
}
