import React from "react"
import useHotelDetails from "../../hooks/user/useHotelDetails"
import { useParams } from "react-router-dom"

const HotelDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { hotel, loading, error } = useHotelDetails(id)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error loading hotel details.</p>
  if (!hotel) return <p>No hotel details available.</p>

  const {
    name,
    image,
    place,
    description,
    amenities,
    rooms,
    propertyRules,
    aboutProperty,
  } = hotel

  return (
    <div className="max-w-6xl mx-auto my-5 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3 p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-3xl font-bold">{name}</h2>
          </div>
          <div className="mt-4 flex-col  flex-wrap">
            <p className="mt-4 text-gray-700">{description}</p>
            <h3 className=" mt-4 text-lg font-semibold">{place}</h3>
            <h3 className=" mt-4 text-lg font-semibold">About property</h3>
            <p className="text-sm text-gray-700">{aboutProperty}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Amenities</h3>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center text-sm text-gray-700"
                >
                  {amenity}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Property rules</h3>

            {propertyRules.map((rule, index) => (
              <ul className="list-disc pl-4 mt-2 text-sm text-gray-700">
                <li key={index}>{rule}</li>
              </ul>
            ))}
          </div>
          <h3 className=" mt-4 text-lg font-semibold">Rooms</h3>

          <div className="overflow-x-hidden sm:mx-0.5 lg:mx-0.5 w-fit">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-white border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        RoomType
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Total Rooms
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Booked Rooms
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map((room, index) => (
                      <tr key={index} className="bg-gray-100 border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center text-gray-900">
                          {room.type} room
                        </td>
                        <td className="text-sm text-gray-900 font-light text-center px-6 py-4 whitespace-nowrap">
                          {room.price}
                        </td>
                        <td className="text-sm text-gray-900 font-light text-center px-6 py-4 whitespace-nowrap">
                          {room.number}
                        </td>
                        <td className="text-sm text-gray-900 font-light text-center px-6 py-4 whitespace-nowrap">
                          {room.sold}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="p-5  text-end">
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Edit Hotel
              </span>
            </button>
          </div>
        </div>
        <div className="md:w-1/3 pr-6">
          <img
            className="w-full h-auto object-cover rounded-xl"
            src={image} // replace with the actual image URL
            alt="Hotel"
          />
        </div>
      </div>
    </div>
  )
}

export default HotelDetail
