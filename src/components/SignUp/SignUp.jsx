import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './SignUp.css'

const SignUp = (props) => {
  const navigate = useNavigate()

  const initialState = {
    username: '',
    password: '',
    passwordConf: '',
  }

  const [formData, setFormData] = useState(initialState)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (props.user) {
      navigate('/')
    }
  }, [props.user])

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()  
    const result = await props.handleSignUp(formData)
    if (result.success){
      navigate('/')
    } else {
      setError(result.message)
    }
  }

  let formIsInvalid = true

  if (formData.username && formData.password && formData.password === formData.passwordConf) {
    formIsInvalid = false
  }

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1 className="signup-title">Create Your Account</h1>
        <p className="signup-subtitle">
          Already have an account? <Link to="/sign-in" className="login-link">Log in</Link>
        </p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="signup-form-content">
          <div className="input-group">
            <input 
              type="text" 
              name='username' 
              placeholder="Username"
              value={formData.username}
              onChange={handleChange} 
              className="signup-input"
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
              className="signup-input"
              required
            />
          </div>
          
          <div className="input-group">
            <input 
              type="password" 
              name="passwordConf" 
              placeholder="Confirm Password"
              value={formData.passwordConf}
              onChange={handleChange} 
              className="signup-input"
              required
            />
          </div>
          
          <button type="submit" disabled={formIsInvalid} className="signup-button">Sign up</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp