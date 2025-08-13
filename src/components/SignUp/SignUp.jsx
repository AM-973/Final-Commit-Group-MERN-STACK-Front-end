import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styles from './SignUp.module.css'

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
  }, [props.user, navigate])

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }
  
  const handleSubmit = async (evt) => {
    evt.preventDefault()
    if (formData.password !== formData.passwordConf) {
      setError('Passwords do not match')
      return
    }
    setError(null)
    const result = await props.handleSignUp(formData)
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
            <h1 className={styles.title}>Create Your Account</h1>
            <p className={styles.subtitle}>
              Already have an account? <Link to="/sign-in" className={styles.link}>Sign in</Link>
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
                placeholder="Choose a username"
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
                autoComplete="new-password"
                className="input"
                placeholder="Create a password"
                required
                aria-describedby={error ? "error-message" : undefined}
              />
            </div>
            
            <div className="field">
              <label htmlFor="passwordConf" className="label">
                Confirm Password
              </label>
              <input 
                id="passwordConf"
                type="password" 
                name="passwordConf" 
                value={formData.passwordConf}
                onChange={handleChange} 
                autoComplete="new-password"
                className="input"
                placeholder="Confirm your password"
                required
                aria-describedby={error ? "error-message" : undefined}
              />
            </div>
            
            <button type="submit" className="btn btn--primary btn--full btn--lg">
              Create Account
            </button>
          </form>
          
          <footer className={styles.footer}>
            
          </footer>
        </div>
      </div>
    </main>
  )
}

export default SignUp