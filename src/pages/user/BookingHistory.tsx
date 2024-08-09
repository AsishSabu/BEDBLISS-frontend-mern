import React, { useEffect, useState } from "react"
import { USER_API } from "../../constants"
import { useNavigate } from "react-router-dom"
import { BookingInterface } from "../../types/hotelInterface"
import { useFetchData } from "../../utils/fetcher"
import Pagination from "../../components/Pagination"

const BookingHistoryList: React.FC = () => {
  const [bookings, setBookings] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const lastPostIndex = currentPage * 5
  const firstPostIndex = lastPostIndex - 5
  const currentData = bookings.slice(firstPostIndex, lastPostIndex)

  const navigate = useNavigate()
  const { data, isError: error } = useFetchData<any>(USER_API + "/bookings")

  useEffect(() => {
    if (data) {
      console.log(data, "bookings")
      setBookings(data.bookings)
    }
  }, [data])

  if (error) {
    console.error("Error fetching booking:", error)
    return <div>Error fetching booking details.</div>
  }

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-screen h-fit overflow-hidden ">
      <div className="min-h-screen bg-varWhite text-black p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6 h-4/5 ">
            <h1 className="text-2xl font-semibold mb-6">Booking history</h1>
            <div className="overflow-x-auto  ">
              {currentData.length > 0 ? (
                <>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Hotel
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentData.map((data: BookingInterface, index) => (
                        <tr key={index}>
                          <td className="py-4 whitespace-nowrap flex items-center">
                            <img
                              src={data.hotelId.imageUrls[0]} // assuming the first image is to be displayed
                              alt={data.hotelId.name}
                              className="w-16 h-16 rounded-md mr-4"
                            />
                            <div>
                              <div className="font-medium text-gray-900">
                                {data.hotelId.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {data.hotelId.destination}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                data.bookingStatus === "booked"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {data.bookingStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {data.price}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap"></td>
                          <td className="py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() =>
                                navigate(
                                  `/user/profile/bookingDetails/${data._id}`
                                )
                              }
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              ) : (
                <div className="text-center py-4">No bookings yet</div>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <Pagination
              totalData={bookings.length}
              dataPerPage={5}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingHistoryList
