import { Link } from 'react-router-dom'

const NavBar = (props) => {
  return (
    <div className="w3-bar w3-black w3-top">
      <Link to="/" className="w3-bar-item w3-button">Home</Link>
      {props.user ? (
        <>
          <span className="w3-bar-item">Welcome {props.user.username}</span>
          <Link to="/" onClick={props.handleSignOut} className="w3-bar-item w3-button">Sign Out</Link>
        </>
      ) : (
        <>
          <Link to="/sign-in" className="w3-bar-item w3-button">Sign In</Link>
          <Link to="/sign-up" className="w3-bar-item w3-button">Sign Up</Link>
        </>
      )}
    </div>
  )
}

export default NavBar 