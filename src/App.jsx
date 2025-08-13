import './App.css'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import MovieList from './components/MovieList/MovieList'
import MovieDetails from './components/MovieDetails/MovieDetails'
import MovieForm from './components/MovieForm/MovieForm'
import ReviewForm from './components/ReviewForm/ReviewForm';
import ImageTester from './components/ImageTester/ImageTester'
import { Route, Routes, useNavigate } from 'react-router-dom'
import * as authService from './services/authService.js'
import * as movieService from './services/movieService'
import { useState, useEffect } from 'react'
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';


const App = () => {

  // src/App.jsx

const Navigate = useNavigate();

  const initialState = authService.getUser()

  const [user, setUser] = useState(initialState)
  const [movies, setMovies] = useState([])

  useEffect(() => {
  //   const fetchAllMovies = async () => {
  //     const moviesData = await movieService.index()
  //     console.log('Fetched movies:', moviesData)
  //     setMovies(moviesData)
  //   }
  // fetchAllMovies()
  // }, [])
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
      // return success
      return { success: true }
    } catch(err){
      // return failure flag (then signup form can display message)
      // add message?
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
    } catch(err) {
      return { success: false, message: err.message }
    }
  }

const handleAddMovie = async (formData) => {
  try {
    const newMovie = await movieService.create(formData)
    setMovies([newMovie, ...movies])  // add to state
    Navigate('/movies')
    return { success: true }
  } catch (err) {
    console.error('Failed to create movie:', err)
    throw err // Re-throw so the form can handle it
  }
}

// Update Movie
const handleUpdateMovie = async (formData, movieId) => {
  try {
    const updatedMovie = await movieService.update(formData, movieId)
    setMovies(movies.map(m => (m._id === movieId ? updatedMovie : m))) // update state
    Navigate(`/movies/${movieId}`)
    return { success: true }
  } catch (err) {
    console.error('Failed to update movie:', err)
    throw err // Re-throw so the form can handle it
  }
}

// Delete Movie
const handleDeleteMovie = async (movieId) => {
  try {
    await movieService.deleteMovie(movieId)
    setMovies(movies.filter(m => m._id !== movieId)) // remove from state
    Navigate('/movies')
  } catch (err) {
    console.error('Failed to delete movie:', err)
  }
}


  return (
    <div className="app-container">
      <NavBar user={user} handleSignOut={handleSignOut} />
      <div className="main-content">
<Routes>
  <Route path='/' element={<Landing />} />
  
  {user ? (
    <>
      {/* Protected Routes */}
      <Route path='/dashboard' element={<Dashboard user={user} />} />
      <Route path='/test-images' element={<ImageTester />} />
      <Route
        path='/movies/new'
        element={<MovieForm handleAddMovie={handleAddMovie} />}
      />
      <Route
        path='/movies/:movieId/edit'
        element={<MovieForm handleUpdateMovie={handleUpdateMovie} />}
      />
      <Route
        path='/movies/:movieId/reviews/:reviewId/edit'
        element={<ReviewForm />}
      />
    </>
  ) : (
    <>
      {/* Public Routes */}
      <Route
        path='/sign-up'
        element={<SignUp handleSignUp={handleSignUp} />}
      />
      <Route
        path='/sign-in'
        element={<SignIn handleSignIn={handleSignIn} />}
      />
    </>
  )}

  <Route
    path='/movies'
    element={<MovieList movies={movies} />}
  />
  <Route
    path='/movies/:movieId'
    element={
      <MovieDetails
        user={user}
        handleDeleteMovie={handleDeleteMovie}
      />
    }
  />

  <Route path='*' element={<h1>404 - Page Not Found</h1>} />
</Routes>

      </div>
      <Footer />
    </div>

  )
}

export default App

