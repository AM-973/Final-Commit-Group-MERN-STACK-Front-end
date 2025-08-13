import { Link } from 'react-router-dom'
import './NavBar.css'

const NavBar = (props) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Tickets
        </Link>
        
        <div className="navbar-menu">
          <Link to="/" className="navbar-item">Home</Link>
          <Link to="/movies" className="navbar-item">Movies</Link>

          {props.user ? (
            <>
              <span className="navbar-welcome">
                Welcome, {props.user.username}!
              </span>

              {/* Show Add Movie for all logged-in users (temporary for testing) */}
              <Link to="/movies/new" className="navbar-item navbar-add">
                Add Movie
              </Link>

              <button 
                onClick={props.handleSignOut} 
                className="navbar-item navbar-button"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/sign-in" className="navbar-item">Sign In</Link>
              <Link to="/sign-up" className="navbar-item navbar-signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
