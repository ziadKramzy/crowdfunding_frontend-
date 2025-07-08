import React from 'react'
import Navbar from '../components/NavBar/Navbar'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
<>
<Navbar/>
    <div>
        <Outlet/>

    </div>
</>

  )
}
