import React from "react"
import useUserHotels from "../../hooks/user/useUserHotels"
import HotelData from "./HotelData"

const HomePage: React.FC = () => {
  const { hotels } = useUserHotels()

  return (
    <div className="py-10 px-20  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5  rounded-2xl ">
      {hotels.length > 0 ? (
        hotels.map(hotel => <HotelData key={hotel._id} {...hotel} />)
      ) : (
        <p>No hotels available</p>
      )}
    </div>
  )
}

export default HomePage
