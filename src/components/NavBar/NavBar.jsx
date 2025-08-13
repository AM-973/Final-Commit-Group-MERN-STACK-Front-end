import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = (props) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Tickets
        </Link>

        <div className="navbar-menu">
          <Link to="/" className="navbar-item">Home</Link>

          {props.user ? (
            <>
              <span className="navbar-welcome">
                Welcome, {props.user.username}!
              </span>

              {/* Show Add Movie button if user is admin */}
              {props.user.isAdmin && (
                <Link to="/add-movie" className="navbar-item navbar-admin">
                  Add Movie
                </Link>
              )}

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
  );
}

export default NavBar;
