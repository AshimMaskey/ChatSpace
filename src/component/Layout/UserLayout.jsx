import React from 'react'
import { Footer } from '../Header_Footer/Footer'
import { Outlet } from 'react-router-dom'
import { Header } from '../Header_Footer/Header'

const UserLayout = () => {
  return (
	<>
	<Header/>
	<Outlet/>
	{/* <Footer/> */}
	</>
  )
}

export default UserLayout