import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import SignupIcon from '../../assets/images/signup.svg'
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
  }, [])

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
      <section>
        <img src={SignupIcon} alt="An owl sitting on a sign" />
      </section>
      <section>
      <form onSubmit={handleSubmit}>
      <h1>Sign up Form</h1>
      
        <label>Username:</label>
        <input type="text" name='username' onChange={handleChange} autoComplete='username' />
        <br />
        <label>Password:</label>
        <input type="password" name='password' onChange={handleChange} autoComplete='new-password' />
        <br />
        <label>Confirm Password:</label>
        <input type="password" name="passwordConf" onChange={handleChange} autoComplete='new-password' />
        <br />
        {error && <h3 style={{color: 'red'}}>{error}!</h3>}
        <button type="submit">Sign up</button>
      </form>
      </section>
    </main>

    
  )
}

export default SignUp