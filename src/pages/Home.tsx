import React from 'react'
import Navbar from '../components/user/Navbar/Navbar'
import Footer from '../components/user/Footer/Footer'
import Banner from "../components/user/Banner/Banner"


const Home= () => {
  return (
    <div className="overflow-hidden">
    <Navbar />
    <Banner />
    <Footer />
    </div>
  )
}

export default Home
