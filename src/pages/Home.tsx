import Footer from '../components/user/Footer/Footer'
import Banner from "../components/user/Banner/Banner"
import Header from '../components/user/Navbar/Navbar'
import HomePage from '../components/user/HomePage'


const Home= () => {
  return (
    <div className="overflow-hidden ">
    <Header />
    <Banner />
    <HomePage/>
    <Footer />
    </div>
  )
}

export default Home
