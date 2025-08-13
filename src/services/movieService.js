
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

const create = async (formData) => {
  try {
    const token = localStorage.getItem('token')

    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })

    const data = await res.json()
    return data

  } catch (err) {
    console.log(err)
  }
}

const createReview = async (reviewFormData, movieId) => {
    const token = localStorage.getItem('token')
   const res = await fetch(`${BASE_URL}/${movieId}/reviews`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(reviewFormData)
   })
   const data = await res.json()
   return data
} 

const deleteMovie = async (movieId) => {
    try {
        const token = localStorage.getItem('token')
        const res = await fetch(`${BASE_URL}/${movieId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const data = await res.json()
        return data
    } catch(err) {
        console.log(err)
        }
}

const update = async (formData, movieId) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${BASE_URL}/${movieId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })
    
    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.err || 'Failed to update movie')
    }
    
    const data = await res.json()
    return data
  } catch (err) {
    console.error('Update error:', err)
    throw err
  }
}

const deleteReview = async (movieId, reviewId) => {
    try {
        const token = localStorage.getItem('token')
        const res = await fetch(`${BASE_URL}/${movieId}/reviews/${reviewId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const data = await res.json()
        return data
    } catch(err) {
        console.log(err)
    }
}

const updateReview = async (movieId, reviewId, reviewFormData) => {
    try {
      const res = await fetch(`${BASE_URL}/${movieId}/reviews/${reviewId}`, {
        method: 'PUT',
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

const getSeats = async (movieId) => {
  try {
    const res = await fetch(`${BASE_URL}/${movieId}/seats`)
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

const bookSeats = async (movieId, seatNumbers) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${BASE_URL}/${movieId}/seats/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ seatNumbers })
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
    throw err
  }
}

export {
  index,
  show,
  create,
  createReview,
  deleteMovie,
  update,
  deleteReview,
  updateReview,
  getSeats,
  bookSeats
}
