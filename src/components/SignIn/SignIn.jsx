import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styles from './SignIn.module.css'

const SignIn = (props) => {
  const navigate = useNavigate()
  
  const initialState = {
    username: '',
    password: '',
  }

  const [formData, setFormData] = useState(initialState)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (props.user) {
      navigate('/')
    }
  }, [props.user, navigate])

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const result = await props.handleSignIn(formData)
    if (result.success) {
      navigate('/')
    } else {
      setError(result.message)
    }
  }

  return (
    <main className={styles.container}>
      <div className={`container ${styles.authContainer}`}>
        <div className={styles.formWrapper}>
          <header className={styles.header}>
            <h1 className={styles.title}>Welcome Back</h1>
            <p className={styles.subtitle}>
              Don't have an account? <Link to="/sign-up" className={styles.link}>Sign up</Link>
            </p>
          </header>
          
          {error && (
            <div className={styles.errorMessage} role="alert" aria-live="polite">
              <span className={styles.errorIcon}>⚠️</span>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className="field">
              <label htmlFor="username" className="label">
                Username
              </label>
              <input 
                id="username"
                type="text" 
                name="username" 
                value={formData.username}
                onChange={handleChange} 
                autoComplete="username"
                className="input"
                placeholder="Enter your username"
                required
                aria-describedby={error ? "error-message" : undefined}
              />
            </div>
            
            <div className="field">
              <label htmlFor="password" className="label">
                Password
              </label>
              <input 
                id="password"
                type="password" 
                name="password" 
                value={formData.password}
                onChange={handleChange} 
                autoComplete="current-password"
                className="input"
                placeholder="Enter your password"
                required
                aria-describedby={error ? "error-message" : undefined}
              />
            </div>
            
            <button type="submit" className="btn btn--primary btn--full btn--lg">
              Sign In
            </button>
          </form>
          
          <footer className={styles.footer}>
            
          </footer>
        </div>
      </div>
    </main>
  )
}

export default SignIn