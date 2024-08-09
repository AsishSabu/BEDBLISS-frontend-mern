import React, { useState } from "react"
import useHotelList from "../../hooks/owner/UseHotelList"
import { useNavigate } from "react-router-dom"
import { addButton } from "../../assets/images"
import Pagination from "../../components/Pagination"

const HotelList: React.FC = () => {
  const { hotels } = useHotelList()
  console.log(hotels, "hotels.........")

  const navigate = useNavigate()
  const handleClick = (id: string) => {
    navigate(`/owner/hotelDetails/${id}`)
  }

  const handleAddHotel = () => {
    navigate("/owner/addHotel")
  }
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dataPerPage = 8;
  const lastPostIndex = currentPage * dataPerPage;
  const firstPostIndex = lastPostIndex - dataPerPage;
  const currentData = hotels.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      {hotels.length ? (
        <>
          <div className="p-5 h-screen ">
            <header className="flex justify-between mb-5">
              <h1 className="text-2xl">Your listing</h1>
              <div className="flex space-x-3">
              <button
                className="text-sm bg-varGreen p-2 flex gap-1 rounded-md hover:bg-varRed hover:scale-105 transition-transform duration-300 ease-in-out"
                onClick={handleAddHotel}
              >
                <img src={addButton} alt="" className="h-4" />
                <span className="font-semibold">Add Hotel</span>
              </button>
              </div>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 min-h-96 max-h-fit">
              {currentData.map((hotel: any) => (
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
            <div className="mt-4 flex justify-center ">
            <Pagination
              currentPage={currentPage}
              totalData={hotels.length}
              dataPerPage={dataPerPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
            
          </div>
  

        </>
      ) : (
        <>
          <div className="p-10 h-screen ">
            <header className=" flex justify-end">
            <button
                className="text-sm bg-varGreen p-2 flex gap-1 rounded-md hover:bg-varRed hover:scale-105 transition-transform duration-300 ease-in-out"
                onClick={handleAddHotel}
              >
                <img src={addButton} alt="" className="h-4" />
                <span className="font-semibold">Add Hotel</span>
              </button>
            </header>
            <div className=" h-1/2 ">
              <h1 className="text-2xl font-bold text-red-600 font-body flex justify-center">
                No Hotels listed yet
              </h1>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default HotelList
