import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './SignIn.css'
import LoginIcon from '../../assets/images/login.svg' 
import styles from './SignIn.module.css'

const SignIn = (props) => {

  useEffect(() => {
    if (props.user) {
      navigate('/')
    }
  }, [])

  const navigate = useNavigate()
  const initialState = {
    username: '',
    password: '',
  }

  const [formData, setFormData] = useState(initialState)

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    props.handleSignIn(formData)
    navigate('/')
  }

  return (
    <div className="signin-container">
      <div className="signin-form">
        <h1 className="signin-title">Log in to Your Account</h1>
        <p className="signin-subtitle">
          Don't have an account? <Link to="/sign-up" className="register-link">Register</Link>
        </p>
        
        <form onSubmit={handleSubmit} className="signin-form-content">
          <div className="input-group">
            <input 
              type="text" 
              name='username' 
              placeholder="Username"
              value={formData.username}
              onChange={handleChange} 
              className="signin-input"
              required
            />
          </div>
          
          <div className="input-group">
            <input 
              type="password" 
              name='password' 
              placeholder="Password"
              value={formData.password}
              onChange={handleChange} 
              className="signin-input"
              required
            />
          </div>
          
          <button type="submit" className="signin-button">Log in</button>
        </form>
      </div>
    </div>
  )
}

export default SignIn