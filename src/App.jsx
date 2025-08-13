import './App.css'
import NavBar from './components/NavBar/NavBar'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import { Route, Routes, Navigate } from 'react-router-dom'
import * as authService from './services/authService.js'
import { useState } from 'react'
import AddMovie from './pages/AddMovie'
import Footer from './components/Footer/Footer' // make sure Footer exists

const App = () => {
  const initialState = authService.getUser()
  const [user, setUser] = useState(initialState)

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
    const res = await authService.signIn(formData)
    setUser(res)
  }

  return (
    <>
      <NavBar user={user} handleSignOut={handleSignOut} />
      <div className="main-content">
        <Routes>
          <Route path='/' element={<h1>Welcome to Tickets Website!</h1>} />
          <Route 
            path='/sign-up' 
            element={user ? <Navigate to="/" /> : <SignUp handleSignUp={handleSignUp} user={user} />} 
          />
          <Route 
            path='/sign-in' 
            element={user ? <Navigate to="/" /> : <SignIn handleSignIn={handleSignIn} user={user} />} 
          />
          <Route path='/add-movie' element={<AddMovie />} />
          <Route path='*' element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
