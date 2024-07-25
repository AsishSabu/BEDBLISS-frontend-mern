import React, { useEffect, useState } from "react"
import { useFetchData } from "./../../utils/fetcher"
import { USER_API } from "../../constants"
import axios from "axios"
import showToast from "../../utils/toast"
import { useNavigate } from "react-router-dom"

const SavedHotels:React.FC= () => {
  const [hotels, setHotels] = useState([])
  const navigate = useNavigate()
  const { data, isError, isLoading } = useFetchData<any>(`${USER_API}/saved`)

  useEffect(() => {
    if (data && data.savedHotels) {
      setHotels(data.savedHotels)
    } else {
      setHotels([])
    }
  }, [data])

  const handleClick = (id: any) => {
    navigate(`/user/hotelDetails/${id}`)
  }

  const handleRemoveHotel = async (hotelId: any) => {
    try {
      const result = await axios.patch(
        `${USER_API}/removeSaved/${hotelId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      showToast(result.data.message, "success")
      const updatedHotels = hotels.filter((hotel: any) => hotel._id !== hotelId)
      setHotels(updatedHotels)
    } catch (error) {
      showToast("Failed to remove hotel", "error")
    }
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error loading saved hotels.</p>
  }

  return (
    <div className="py-10 md:px-20 sm:px-10 px-5">
      <h2 className="text-2xl font-bold mb-5">My next trip</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 rounded-2xl">
        {hotels.length > 0 ? (
          hotels.map((hotel: any) => (
            <div
              key={hotel._id}
              className="bg-varGray col-span-1 relative border rounded-3xl shadow-sm p-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="relative rounded-lg">
                <button
                  onClick={() => handleRemoveHotel(hotel._id)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  X
                </button>
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={hotel.imageUrls[0]}
                  alt={hotel.name}
                />
              </div>
              <div
                className="pt-2 h-fit rounded-lg "
                onClick={() => handleClick(hotel._id)}
              >
                <h5 className="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                  {hotel.name}
                </h5>
                <div className="flex justify-between">
                  <p className="mb-1 text-sm font-thin text-gray-700 dark:text-gray-400">
                    {hotel.destination}
                  </p>
                  <p className="mb-1 text-sm font-thin text-gray-700 dark:text-gray-400">
                    ₹{hotel.price}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hotels available</p>
        )}
      </div>
    </div>
  )
}

export default SavedHotels
