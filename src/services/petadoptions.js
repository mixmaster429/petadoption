// Find adoption service
const find_adoptions = async (params) => {
  const API_URL = '/getpetadoptions';
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

// Get adoption detail service
const getdetails = async (id) => {
  const API_URL = '/getpetadoptiondetail';
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

// Get adoption reviews service
const getreviews = async (id) => {
  const API_URL = '/getreviews';
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
