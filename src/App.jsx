import './App.css'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import { Route, Routes, useNavigate } from 'react-router-dom'
import * as authService from './services/authService.js'
import * as movieService from './services/movieService.js'
import { useState } from 'react'

const App = () => {
  const navigate = useNavigate()

  const initialState = authService.getUser()
  const [user, setUser] = useState(initialState)
  const [movies, setMovies] = useState([])

  const handleSignUp = async (formData) => {
    try {
      const res = await authService.signUp(formData)
      setUser(res)
      return { success: true }
    } catch (err) {
      return { success: false, message: err.message }
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const handleSignIn = async (formData) => {
    try {
      const res = await authService.signIn(formData)
      setUser(res)
      return { success: true }
    } catch (err) {
      return { success: false, message: err.message }
    }
  }

  const handleAddMovie = async (formData) => {
    try {
      const newMovie = await movieService.create(formData)
      setMovies([newMovie, ...movies])
      navigate('/movies')
    } catch (err) {
      console.error('Failed to create movie:', err)
    }
  }

  const handleDeleteMovie = async (movieId) => {
    try {
      await movieService.deleteMovie(movieId)
      setMovies(movies.filter((movie) => movie._id !== movieId))
      navigate('/movies')
    } catch (err) {
      console.error('Failed to delete movie:', err)
    }
  }

  const handleUpdateMovie = async (formData, movieId) => {
    const updatedMovie = await movieService.update(formData, movieId)
    navigate(`/movies/${movieId}`)
  }

  return (
    <>
      <NavBar user={user} handleSignOut={handleSignOut} />
      <Routes>
        <Route path="/" element={<h1>Hello World!</h1>} />
        {!user && (
          <>
            <Route
              path="/sign-up"
              element={<SignUp handleSignUp={handleSignUp} user={user} />}
            />
            <Route
              path="/sign-in"
              element={<SignIn handleSignIn={handleSignIn} user={user} />}
            />
          </>
        )}
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
