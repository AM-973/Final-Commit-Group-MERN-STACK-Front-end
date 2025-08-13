import './App.css'
import NavBar from './components/NavBar/NavBar'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import MovieList from './components/MovieList/MovieList'
import MovieDetails from './components/MovieDetails/MovieDetails'
import MovieForm from './components/MovieForm/MovieForm'
import ReviewForm from './components/ReviewForm/ReviewForm';
import { Route, Routes, useNavigate } from 'react-router-dom'
import * as authService from './services/authService.js'
import * as movieService from './services/movieService'
import { useState, useEffect } from 'react'
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';


const App = () => {

  // src/App.jsx

const navigate = useNavigate();

  const initialState = authService.getUser()

  const [user, setUser] = useState(initialState)
  const [movies, setMovies] = useState([])

  useEffect(() => {
    // going to run a service to fetch all movies
    const fetchAllMovies = async () => {
      try {
        const moviesData = await movieService.index()
        setMovies(moviesData || [])
      } catch (err) {
        console.error('Failed to fetch movies:', err)
        setMovies([])
      }
    }
    fetchAllMovies()
  }, [])


  const handleSignUp = async (formData) => {
    try {
      const res = await authService.signUp(formData)
      setUser(res)
      return { success: true }
    } catch(err){
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

  const handleAddMovie = async(formData) => {
    try {
      const newMovie = await movieService.create(formData)
      setMovies([newMovie, ...movies])
      navigate('/movies');
    } catch (err) {
      console.error('Failed to create movie:', err)
    }
  }

  const handleDeleteMovie = async(movieId) => {
    try {
      await movieService.deleteMovie(movieId)
      setMovies(movies.filter((movie) => movie._id !== movieId))
      navigate('/movies')
    } catch (err) {
      console.error('Failed to delete movie:', err)
    }
  }

  const handleUpdateMovie = async(formData, movieId) => {
    const updatedMovie = await movieService.update(formData, movieId)
    navigate(`/movies/${movieId}`)
  }

  return (
    <>
      <NavBar user={user} handleSignOut={handleSignOut} />
      <Routes>
          {user ? (
            // Protected Routes
            <>
              <Route path='/dashboard' element={<Dashboard user={user} />} />
              <Route path='/movies/new' element={<MovieForm handleAddMovie={handleAddMovie} />} />
              <Route path='/movies/:movieId/edit' element={<MovieForm handleUpdateMovie={handleUpdateMovie} />} />
              <Route path="/movies/:movieId/reviews/:reviewId/edit" element={<ReviewForm />}
/>
            </>
          ) : (
            // Public Routes
            <> 
              <Route path='/sign-up' element={<SignUp handleSignUp={handleSignUp} user={user} />} />
              <Route path='/sign-in' element={<SignIn handleSignIn={handleSignIn} user={user} />} />
            </>
          )}
          <Route path='/' element={<Landing />} />
          <Route path='/movies' element={<MovieList movies={movies} />} />
          <Route path='/movies/:movieId' element={<MovieDetails user={user} handleDeleteMovie={handleDeleteMovie} />} />
          <Route path='*' element={<h1>404 PAGE NOT FOUND</h1>} />
      </Routes>
    </>

  )
}

export default App

