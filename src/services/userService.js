const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`

const getProfile = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${BASE_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

const updateProfile = async (formData) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${BASE_URL}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

const getTickets = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${BASE_URL}/tickets`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export {
  getProfile,
  updateProfile,
  getTickets
}
