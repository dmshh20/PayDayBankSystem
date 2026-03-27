import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
        <div>
            <Sidebar></Sidebar>
            <Outlet></Outlet>
        </div>
    </>
)
}

export default Layout