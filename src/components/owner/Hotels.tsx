import React from "react"
import useHotelList from "../../hooks/owner/UseHotelList"
import { Button } from "flowbite-react"
import { useNavigate } from "react-router-dom"

const Hotels: React.FC = () => {
  const { hotels } = useHotelList()
  console.log(hotels,'hotels.........');
  
  const navigate = useNavigate()
  const handleClick = (id: string) => {
    navigate(`/owner/hotelDetails/${id}`)
  }

  const handleAddHotel = () => {
    navigate("/owner/addHotel")
  }

  return (
    <>
      {hotels.length ? (
        <>
          <div className="p-5 h-screen ">
            <header className="flex justify-between mb-5">
              <h1 className="text-2xl">Your listing</h1>
              <div className="flex space-x-3">
                <button className="text-xl" onClick={handleAddHotel}>
                  ➕
                </button>
              </div>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
              {hotels.map(hotel => (
                <div
                  key={hotel._id}
                  className="relative rounded-3xl shadow-sm p-2"
                  onClick={() => handleClick(hotel._id)}
                >
                  <div className="relative">
                    {!hotel.isVerified ? (
                      <div className="absolute top-2 left-2 bg-slate-200 text-black text-sm px-2 py-1 rounded-lg flex items-center space-x-1 bg-varWhite">
                        <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                        <span>Verification required</span>
                      </div>
                    ) : (
                      <></>
                    )}

                    <img
                      className="w-64 h-64  rounded-xl border-none"
                      src={hotel.imageUrls[0]} // Replace with your image URL
                      alt="Listing"
                    />
                  </div>
                  <div className="mt-3 ">
                    <h2 className="text-xl font-semibold">{hotel.name}</h2>
    
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="p-10 ">
            <header className=" flex justify-between">
              <h1 className="text-4xl text-red-600 font-body">
                No Hotels listed yet
              </h1>
              <button className="text-xl" onClick={handleAddHotel}>
                  ➕
                </button>
              
            </header>
            
          </div>
        </>
      )}
    </>
  )
}

export default Hotels
