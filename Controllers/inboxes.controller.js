// import supabase from '../supabaseClient';

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
module.exports = { postInbox };
