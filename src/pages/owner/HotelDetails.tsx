import React from "react"
import useHotelDetails from "../../hooks/user/useHotelDetails"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { OWNER_API } from "./../../constants/index"

const HotelDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { hotel, loading, error, reloadHotelDetails } = useHotelDetails(id)
  console.log(hotel)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error loading hotel details.</p>
  if (!hotel) return <p>No hotel details available.</p>

  const {
    name,
    destination,
    description,
    stayType,
    address,
    amenities,
    propertyRules,
    imageUrls,
    rooms,
    isListed,
  } = hotel
  const handleListUnlist = async (value: string) => {
    try {
      await axios.patch(
        `${OWNER_API}/listUnlist/${id}`,
        { value },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      await reloadHotelDetails()
    } catch (error) {
      console.error("Failed to update hotel listing status", error)
    }
  }

  return (
    <div className="max-w-6xl mx-auto my-5 bg-white shadow-lg rounded-lg overflow-hidden">
      <h1 className="flex justify-center font-bold text-4xl text-varBlue mb-4">
        Hotel Details
      </h1>
      <div className="grid grid-cols-2 md:grid-rows-1">
        <div className="p-6 bg-blue-gray-50 w-full">
          <div className="mb-4 grid grid-flow-col  align-middle">
            <h2 className="text-xl font-semibold text-gray-800">
              Hotel Name :
            </h2>
            <p className="text-base text-gray-600">{name}</p>
          </div>
          <div className="mb-4 grid grid-flow-col  align-middle">
            <h2 className="text-xl font-semibold text-gray-800">
              Destination :
            </h2>
            <p className="text-base text-gray-600">{destination}</p>
          </div>
          <div className="mb-4 grid grid-flow-col  align-middle">
            <h3 className="text-xl font-semibold text-gray-800">Stay Type :</h3>
            <p className="text-base text-gray-600">{stayType}</p>
          </div>
          <div className="mb-4 grid grid-flow-col  align-middle">
            <h3 className="text-xl font-semibold text-gray-800">Address :</h3>
            <div>
              <p className="text-base text-gray-600">{address.streetAddress}</p>
              <p className="text-base text-gray-600">{address.landMark}</p>
              <p className="text-base text-gray-600">
                {address.city}, {address.district}
              </p>
              <p className="text-base text-gray-600">
                {address.country} - {address.pincode}
              </p>
            </div>
          </div>
          <div className="mb-4 grid grid-flow-col  align-middle">
            <h3 className="text-xl font-semibold text-gray-800 ">
              Description :
            </h3>
            <p className="text-base text-gray-600 px-2">{description}</p>
          </div>

          <div className="mb-4 grid grid-flow-col  align-middle">
            <h3 className="text-xl font-semibold text-gray-800">Amenities :</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {amenities.map((amenity: string, index: any) => (
                <li key={index} className="text-base text-gray-600">
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4 grid grid-flow-col  align-middle">
            <h3 className="text-xl font-semibold text-gray-800">
              Property Rules :
            </h3>
            <ul className="list-disc pl-5">
              {propertyRules.map((rule: string, index: any) => (
                <li key={index} className="text-base text-gray-600">
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-6 bg-blue-gray-50 w-full">
          <div className="p-6 grid grid-cols-2 gap-4">
            {imageUrls.map((image: string, index: any) => (
              <img
                key={index}
                className="w-full h-40 object-cover rounded-lg"
                src={image} // replace with the actual image URL
                alt={`Hotel ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mb-4 col-span-2">
          <h3 className="text-xl font-semibold text-gray-800 p-3">
            Room Details
          </h3>

          {rooms.length > 0 ? (
            <table className="min-w-full bg-white">
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-left py-3 px-2">Room Type</th>
                  <th className="text-left py-3 px-2">Description</th>
                  <th className="text-left py-3 px-2">MaxPeoples</th>
                  <th className="text-left py-3 px-2">Price</th>
                </tr>
              </thead>

              <tbody>
                {rooms.map((room: any, index: any) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-2">{room.title}</td>
                    <td className="py-3 px-2">{room.desc}</td>
                    <td className="py-3 px-2">
                      adults-{room.maxAdults} children-{room.maxChildren}
                    </td>
                    <td className="py-3 px-2">{room.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <span className="flex justify-center text-2xl text-varRed">
              {" "}
              No rooms added
            </span>
          )}
        </div>
        <div className="text-right col-span-2 mx-16 mb-10 flex justify-center pt-10">
          <button
            onClick={()=>navigate(`/owner/editHotel/${id}`)}
            className="inline-block px-6 py-2.5 bg-gradient-to-br from-pink-500 to-orange-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gradient-to-bl hover:shadow-lg focus:bg-gradient-to-bl focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gradient-to-bl active:shadow-lg transition duration-150 ease-in-out"
          >
            Edit Hotel
          </button>
          {isListed ? (
            <button
              onClick={() => handleListUnlist("false")}
              className="inline-block px-6 py-2.5 bg-gradient-to-br from-pink-500 to-orange-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gradient-to-bl hover:shadow-lg focus:bg-gradient-to-bl focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gradient-to-bl active:shadow-lg transition duration-150 ease-in-out"
            >
              UnList
            </button>
          ) : (
            <button
              onClick={() => handleListUnlist("true")}
              className="inline-block px-6 py-2.5 bg-gradient-to-br from-pink-500 to-orange-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gradient-to-bl hover:shadow-lg focus:bg-gradient-to-bl focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gradient-to-bl active:shadow-lg transition duration-150 ease-in-out"
            >
              List
            </button>
          )}

          {/* <button className="inline-block px-6 py-2.5 bg-gradient-to-br from-pink-500 to-orange-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gradient-to-bl hover:shadow-lg focus:bg-gradient-to-bl focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gradient-to-bl active:shadow-lg transition duration-150 ease-in-out">
            Delete Hotel
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default HotelDetails
