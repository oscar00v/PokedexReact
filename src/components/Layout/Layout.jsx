import React from 'react'
import { Outlet } from 'react-router-dom'
import Banner from '../banner/Banner.jsx'
import Input from '../Input/Input'

function Layout() {
    console.log("Hola Layout")
  return (

    <div>
        
      <Input></Input>
      <Outlet></Outlet>
      <Banner></Banner>
    </div>
  )
}

export default Layout
