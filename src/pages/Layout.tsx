import React from "react"
import Footer from "../components/user/Footer/Footer"
import Header from "../components/user/Navbar/Navbar"
import { Outlet } from "react-router-dom"

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
