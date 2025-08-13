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
          
          {props.user ? (
            <>
              <span className="navbar-welcome">
                Welcome, {props.user.username}!
              </span>
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
          <Link to='/movies'>Movies</Link>
        </div>
      </div>
    </nav>
// import styles from './NavBar.module.css';
// import Logo from '../../assets/images/logo.svg'

// const NavBar = (props) => {

//   return (
//     <nav className={styles.container}>
//         <Link to='/'><img src={Logo} alt="Movie booking logo" /></Link>
        
//     <ul>
//       <li><Link to="/"> Home </Link></li>
//       <li><Link to="/movies"> Movies </Link></li>
      
//     {props.user ? (
//       <>
//         {props.user.isAdmin && <li><Link to='/movies/new'>Add Movie</Link></li>}
//         <li><Link to='/dashboard'>My Profile</Link></li>
//         <li><Link to='/' onClick={props.handleSignOut}>Sign Out</Link></li>
//       </>
//       ) : (
//         <>
//           <li><Link to="/sign-up">Sign Up</Link></li>
//           <li><Link to="/sign-in">Sign In</Link></li>
//         </>
//         ) }
//       </ul>
//   </nav>
  )
}

export default NavBar 