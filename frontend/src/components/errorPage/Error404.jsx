import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './error404.module.css'
function Error404() {
  return (
    <div className={styles.errorWrapper}>
        <h1 className='text-danger'>Error 404</h1>
        <h6 className='text-danger'>Page Not Found!</h6>
        <div className="home mt-2">
            <NavLink to="/" className="btn btn-primary">Go To Home</NavLink>
        </div>
    </div>
  )
}

export default Error404
