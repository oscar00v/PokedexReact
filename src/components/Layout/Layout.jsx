import React from 'react'
import { Outlet } from 'react-router-dom'
import Banner from '../banner/banner'
import Input from '../Input/Input'

function Layout() {
  return (
    <div>
      <Input></Input>
      <Outlet></Outlet>
      <Banner></Banner>
    </div>
  )
}

export default Layout
