import React from 'react'
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <>
        <div className='errorsection'>
            <Link to="/">
            <p>Go Back</p>
            </Link>
            <h1>404</h1>
            <p>Page not found</p>
        </div>
    </>
    
  )
}

export default NotFound
