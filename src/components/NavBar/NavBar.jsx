import { Link } from 'react-router-dom'
import styles from './NavBar.module.css';
import CinemaCompany from '../../assets/images/cinemacompany.jpg';

const NavBar = (props) => {

  return (
    <nav className={styles.container}>
        <Link to='/'><img src={CinemaCompany} alt="Movie booking logo" /></Link>
        
    <ul>
      <li><Link to="/"> Home </Link></li>
      <li><Link to="/movies"> Movies </Link></li>
      
    {props.user ? (
      <>
        {props.user.isAdmin && <li><Link to='/movies/new'>Add Movie</Link></li>}
        <li><Link to='/dashboard'>My Profile</Link></li>
        <li><Link to='/' onClick={props.handleSignOut}>Sign Out</Link></li>
      </>
      ) : (
        <>
          <li><Link to="/sign-up">Sign Up</Link></li>
          <li><Link to="/sign-in">Sign In</Link></li>
        </>
        ) }
      </ul>
  </nav>
  )
}

export default NavBar 