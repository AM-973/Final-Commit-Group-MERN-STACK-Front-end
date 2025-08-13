
// src/services/movieService.js

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/movies`

const getHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  }
}

// Get all movies
const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: getHeaders()
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.err || 'Something went wrong')
    return data
  } catch (err) {
    throw err
  }
}

// Get a single movie by ID
const show = async (movieId) => {
  try {
    const res = await fetch(`${BASE_URL}/${movieId}`, {
      headers: getHeaders()
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.err || 'Something went wrong')
    return data
  } catch (err) {
    throw err
  }
}

// Create a new review for a movie
const createReview = async (reviewData, movieId) => {
  try {
    const res = await fetch(`${BASE_URL}/${movieId}/reviews`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(reviewData)
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.err || 'Something went wrong')
    return data
  } catch (err) {
    throw err
  }
}

// Book tickets for a movie
const bookTickets = async (bookingData, movieId) => {
  try {
    const res = await fetch(`${BASE_URL}/${movieId}/book`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(bookingData)
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.err || 'Something went wrong')
    return data
  } catch (err) {
    throw err
  }
}

export {
  index,
  show,
  createReview,
  bookTickets
}
