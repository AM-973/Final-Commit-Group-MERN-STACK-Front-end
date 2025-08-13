
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

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.err || 'Failed to create movie')
    }

    const data = await res.json()
    return data

  } catch (err) {
    console.error('Create movie error:', err)
    throw err
  }
}

const createReview = async (reviewFormData, movieId) => {
  try {
    const token = localStorage.getItem('token')
    console.log('Creating review with data:', reviewFormData)
    console.log('Movie ID:', movieId)
    console.log('Token:', token ? 'Present' : 'Missing')
    
    const res = await fetch(`${BASE_URL}/${movieId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(reviewFormData)
    })
    
    console.log('Response status:', res.status)
    
    if (!res.ok) {
      const errorData = await res.json()
      console.error('Review creation failed:', errorData)
      throw new Error(errorData.err || errorData.message || 'Failed to create review')
    }
    
    const data = await res.json()
    console.log('Review created successfully:', data)
    return data
  } catch (err) {
    console.error('Create review error:', err)
    throw err
  }
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
        if (!res.ok) {
            throw new Error(data.err || 'Failed to delete movie')
        }
        return data
    } catch(err) {
        console.log(err)
        throw err
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
    const res = await fetch(`${BASE_URL}/${movieId}/seats`, {
      headers: getHeaders()
    })
    
    // If the endpoint doesn't exist or returns 404, that's okay
    if (res.status === 404) {
      console.log('Seats endpoint not found, will use default layout')
      return null
    }
    
    if (!res.ok) {
      console.warn(`Seats API returned ${res.status}, using default layout`)
      return null
    }
    
    const data = await res.json()
    console.log('Seats API response:', data)
    return data
  } catch (err) {
    console.warn('Error fetching seats (will use default):', err.message)
    // Return null instead of throwing - let component handle gracefully
    return null
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
    
    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || errorData.err || `Booking failed: ${res.status}`)
    }
    
    const data = await res.json()
    return data
  } catch (err) {
    console.error('Seat booking error:', err)
    throw err
  }
}

const bookTickets = async (bookingData, movieId) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${BASE_URL}/${movieId}/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(bookingData)
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
  bookSeats,
  bookTickets
}
