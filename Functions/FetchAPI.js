import initial from '../index.js';
export default async function fetchAPI(path, method = 'GET', body = null) {
  const data = await fetch(`https://teacupnet-backend.vercel.app/${path}`, {
    method: method,
    body: body,
    headers: {
      'Content-Type': 'application/json',
      initial: JSON.stringify(initial),
    },
  });
  return await data.json();
}
