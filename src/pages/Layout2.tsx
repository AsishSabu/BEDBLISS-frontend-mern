import React from "react"
// import Footer from "../components/user/Footer/Footer"
import { Outlet } from "react-router-dom"

const Layout2: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <Outlet />
      {/* <Footer /> */}
    </div>
  )
}

export default Layout2
