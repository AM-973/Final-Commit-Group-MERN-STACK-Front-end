const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/movies`;

// src/services/hootService.js

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const createReview = async (movieId, reviewFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${movieId}/reviews`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export {
  index,
  createReview,
};