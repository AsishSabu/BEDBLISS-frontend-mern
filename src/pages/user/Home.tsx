import { useEffect } from "react"
import Banner from "../../components/user/Banner/Banner"
import HomePage from "../../components/user/HomePage"
import { useAppDispatch } from "../../redux/store/store"
import { clearData } from "../../redux/slices/searchingSlice"

const Home = () => {
  const dispatch=useAppDispatch()
  useEffect(() => {
    dispatch(clearData())
  }, [dispatch])
  return (
    <div className="overflow-hidden no-scrollbar">
      <Banner />
      <HomePage />
    </div>
  )
}

export default Home
