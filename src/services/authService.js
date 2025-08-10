const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`

const signUp = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json()

    // Checking if the response code was "ok"
    if (!res.ok) throw new Error(data.err || 'Something went wrong')

    if (data.token) {
      localStorage.setItem('token', data.token)
      const decodedToken = JSON.parse(atob(data.token.split('.')[1]))
      return decodedToken
    }

  } catch (err) {
    // throwing an error instead of console.logging
    throw err
  }
}

const signIn = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    if (data.token) {
      // save the token in local storage
      localStorage.setItem('token', data.token)
      // returning the user info to use in our app
      const decodedToken = JSON.parse(atob(data.token.split('.')[1]))
      return decodedToken
    }

  } catch (err) {
    console.log(err)
  }
}

const getUser = () => {
  const token = localStorage.getItem('token')
  if (token) {
    // return decoded token with user object
      const decodedToken = JSON.parse(atob(token.split('.')[1]))
      return decodedToken
  } else {
    return null
  }
}

export {
  signUp,
  signIn,
  getUser,
}