import React from "react"
import useUserHotels from "../../hooks/user/useUserHotels"
import HotelData from "./HotelData"
import HomepageCards from "../skeletons/HomepageCards"

const HomePage: React.FC = () => {
  const { hotels, loading } = useUserHotels();

  console.log('Loading:', loading);
  console.log('Hotels:', hotels);

  return (
    <div className="py-10 px-20  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5  rounded-2xl ">
      {loading
        ? Array(8)
            .fill(0)
            .map((_, index) => (
             <HomepageCards key={index} />
            ))
        : hotels.length > 0
        ? hotels.map((hotel:any) => <HotelData key={hotel._id} {...hotel} />)
        : <p>No hotels available</p>}
    </div>
  )
}

export default HomePage
