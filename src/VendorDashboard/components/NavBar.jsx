import React from 'react'

const NavBar = ({LoginHandler, registerHandler, showlogout, logouthandler}) => {
  const firmName = localStorage.getItem("firmName");
  return (
    <div className='navsection'>
      <div className='company'>
        Vendor Dashboard
      </div>
      <div className='firmname'>{firmName?<h2>{firmName}</h2>:""}  
      </div>
      <div className='userAuth'>
        {
          !showlogout ? 
          <>
            <span onClick={LoginHandler}>Login</span>
            <span> / </span>
            <span onClick={registerHandler}>Register</span>
          </> : 
          <span onClick={logouthandler}>Logout</span>
        }
      </div>
    </div>
  )
}

export default NavBar
