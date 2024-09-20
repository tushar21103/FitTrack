import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='nav_container'>
      <Link to="/" className='nav_head'>Workout Buddy</Link>
    </div>
  )
}

export default Navbar
