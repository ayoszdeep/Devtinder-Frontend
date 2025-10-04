import React from 'react'
import Navebar from './Navebar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Body = () => {
  return (
    <div>
        <Navebar/>
        
        <Outlet/>
        <Footer />
    </div>
  )
}

export default Body