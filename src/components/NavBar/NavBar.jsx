import { Link } from 'react-router-dom'
import styles from './NavBar.module.css';
import CinemaCompany from '../../assets/images/cinemacompany.jpg';

const NavBar = (props) => {

  return (
    <nav className={styles.navbar}>
      <div className={styles['navbar-container']}>
        <Link to='/' className={styles['navbar-brand']}>
          <img src={CinemaCompany} alt="Movie booking logo" style={{height: '40px'}} />
        </Link>

        
        
        <div className={styles['navbar-menu']}>
          <Link to="/" className={styles['navbar-item']}>Home</Link>
          <Link to="/movies" className={styles['navbar-item']}>Movies</Link>
          
          {props.user ? (
            <>
              {props.user.isAdmin && (
                <Link to='/add-movie' className={styles['navbar-item']}>
                  Add Movie
                </Link>
              )}

              {props.user.username && (
                <span className={styles['navbar-welcome']}>Welcome, {props.user.username}</span>
              )}
              
              <Link to='/dashboard' className={styles['navbar-item']}>My Profile</Link>
              <button 
                onClick={props.handleSignOut} 
                className={`${styles['navbar-item']} ${styles['navbar-button']}`}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/sign-up" className={`${styles['navbar-item']}`}>Sign Up</Link>
              <Link to="/sign-in" className={styles['navbar-item']}>Sign In</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar 