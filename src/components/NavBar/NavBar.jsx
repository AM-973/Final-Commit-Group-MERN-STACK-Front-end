import { Link, useLocation } from 'react-router-dom'
import styles from './NavBar.module.css'
import CinemaCompany from '../../assets/images/cinemacompany.jpg'

const NavBar = (props) => {
  const location = useLocation()
  
  const isActiveLink = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <header className={styles.navbar} role="banner">
      <div className={`container ${styles.container}`}>
        <Link to='/' className={styles.brand} aria-label="CinemaBooking - Home">
          <img 
            src={CinemaCompany} 
            alt="CinemaBooking" 
            className={styles.logo}
          />
          <span className={styles.brandText}>CinemaBooking</span>
        </Link>
        
        <nav className={styles.nav} role="navigation" aria-label="Main navigation">
          <ul className={styles.navList}>
            <li>
              <Link 
                to="/" 
                className={`${styles.navLink} ${isActiveLink('/') ? styles.navLinkActive : ''}`}
                aria-current={isActiveLink('/') ? 'page' : undefined}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/movies" 
                className={`${styles.navLink} ${isActiveLink('/movies') ? styles.navLinkActive : ''}`}
                aria-current={isActiveLink('/movies') ? 'page' : undefined}
              >
                Movies
              </Link>
            </li>
            {props.user?.isAdmin && (
              <li>
                <Link 
                  to='/add-movie' 
                  className={`${styles.navLink} ${isActiveLink('/add-movie') ? styles.navLinkActive : ''}`}
                  aria-current={isActiveLink('/add-movie') ? 'page' : undefined}
                >
                  Add Movie
                </Link>
              </li>
            )}
          </ul>
        </nav>
        
        <div className={styles.actions}>
          {props.user ? (
            <>
              {props.user.username && (
                <span className={styles.welcome} aria-label={`Welcome, ${props.user.username}`}>
                  Welcome, {props.user.username}
                </span>
              )}
              <Link to='/dashboard' className={`btn btn--ghost ${styles.profileBtn}`}>
                My Profile
              </Link>
              <button 
                onClick={props.handleSignOut} 
                className="btn btn--ghost"
                type="button"
                aria-label="Sign out of your account"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/sign-in" className="btn btn--ghost">
                Sign In
              </Link>
              <Link to="/sign-up" className="btn btn--primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default NavBar