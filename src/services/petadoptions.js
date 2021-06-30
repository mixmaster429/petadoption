const find_adoptions = async (params) => {
  const API_URL = 'http://localhost:4000/getpetadoptions';
  const res = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await res.json();
  return result;
};

const getdetails = async (id) => {
  const API_URL = 'http://localhost:4000/getpetadoptiondetail';
  const res = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await res.json();
  return result;
};

const getreviews = async (id) => {
  const API_URL = 'http://localhost:4000/getreviews';
  const res = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await res.json();
  return result;
};

export const petadoptionServices = {
  getdetails,
  find_adoptions,
  getreviews
};
