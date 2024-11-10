import { useState } from "react"
import { Link } from "react-router-dom"
import Head from "./Head"
import "./header.css"
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const [click, setClick] = useState(false)
  
  const {loginWithRedirect,logout,isAuthenticated, isLoading,user } = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <Head />
      <header>
        <nav className='flexSB'>
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/courses'>All Courses</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/team'>Team</Link>
            </li>
           
            <li>
              <Link to='/journal'>Journal</Link>
            </li>
            <li>
              <Link to='/contact'>Contact</Link>
            </li>
            { isAuthenticated?(
             <li>
             <Link style={{"backgroundColor":" #1EB2A6",'padding':'10px 30px','borderRadius':'5px'}} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</Link>
             </li>
            ):(
              
 <li>
 <Link style={{"backgroundColor":" #1EB2A6",'padding':'10px 30px','borderRadius':'5px'}} onClick={() => loginWithRedirect()}>Log In</Link>
 </li>

            )}
            
            
          </ul>
          <div className='start'>
          {
              isAuthenticated &&
            <div className='button'><p>Welcome {user.name} !!</p> </div>
}</div>
          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>
    </>
  )
}

export default Header
