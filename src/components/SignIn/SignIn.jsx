import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
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
    <main className={styles.container}>
      <section>
      <img src={LoginIcon} alt="An owl sitting on a sign" />
      </section>
      
      <form onSubmit={handleSubmit}>
      <h1>Sign In </h1>
        <label>Username:</label>
        <input type="text" name='username' onChange={handleChange} autoComplete='username' />
        <br />
        <label>Password:</label>
        <input type="password" name='password' onChange={handleChange} autoComplete='current-password' />
        <br />
        <button type="submit">Sign In</button>
      </form>
    </main>
  )
}

export default SignIn