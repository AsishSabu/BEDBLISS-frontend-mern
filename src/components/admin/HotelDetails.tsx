import React from "react"
import useHotelDetails from "../../hooks/admin/useHotelDetails"
import { useParams } from "react-router-dom"
import { GoVerified } from "react-icons/go"

const HotelDetails = () => {
  const { id } = useParams<{ id: string }>()
  const { hotel, verifyHotel } = useHotelDetails(id)
  console.log(hotel)

  return (
    <div className="max-w-6xl mx-auto my-5 bg-varWhite shadow-lg rounded-lg overflow-hidden grid grid-cols-2 p-5">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{hotel?.name}</h2>
        <p className="text-lg text-gray-600">{hotel?.destination}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Description</h3>
        <p className="text-base text-gray-600">{hotel?.description}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Stay Type</h3>
        <p className="text-base text-gray-600">{hotel?.stayType}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Address</h3>
        <p className="text-base text-gray-600">
          {hotel?.address.streetAddress}
        </p>
        <p className="text-base text-gray-600">{hotel?.address.landMark}</p>
        <p className="text-base text-gray-600">
          {hotel?.address.city}, {hotel?.address.district}
        </p>
        <p className="text-base text-gray-600">
          {hotel?.address.country} - {hotel?.address.pincode}
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Amenities</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {hotel?.amenities.map((amenity, index) => (
            <li key={index} className="text-base text-gray-600">
              {amenity}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Property Rules</h3>
        <ul className="list-disc pl-5">
          {hotel?.propertyRules.map((rule, index) => (
            <li key={index} className="text-base text-gray-600">
              {rule}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Room Details</h3>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left py-3 px-4">Rooms</th>
              <th className="text-left py-3 px-4">Beds</th>
              <th className="text-left py-3 px-4">Bathrooms</th>
              <th className="text-left py-3 px-4">Guests</th>
              <th className="text-left py-3 px-4">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3 px-4">{hotel?.room}</td>
              <td className="py-3 px-4">{hotel?.bed}</td>
              <td className="py-3 px-4">{hotel?.bathroom}</td>
              <td className="py-3 px-4">{hotel?.guests}</td>
              <td className="py-3 px-4">{hotel?.price}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h1 className="text-2xl col-span-2 p-3 font-bold">Images</h1>
      <div className="col-span-2 grid grid-flow-col gap-4">
        {hotel?.imageUrls.map((image, index) => (
          <img
            key={index}
            className="  w-fit h-40 object-cover rounded-lg"
            src={image} // replace with the actual image URL
            alt={`Hotel ${index + 1}`}
          />
        ))}
      </div>
      <h1 className="text-2xl col-span-2 p-3 font-bold">Hotel Documents</h1>
      <div className="col-span-2 grid grid-flow-col gap-4">
        {
          <img
            className="  w-fit h-40 object-cover rounded-lg"
            src={hotel?.hotelDocument} // replace with the actual image URL
            alt="hotel"
          />
        }
      </div>
      <h1 className="text-2xl col-span-2 p-3 font-bold">Owner Id</h1>
      <div className="col-span-2 grid grid-flow-col gap-4">
        {
          <img
            className="  w-fit h-40 object-cover rounded-lg"
            src={hotel?.ownerPhoto} // replace with the actual image URL
            alt="hotel"
          />
        }
      </div>
  
        {hotel?.isVerified ? (
          <div className="flex justify-center col-span-2">
            <GoVerified size={60} color="#15F5BA" /> <span className="text-green-400 pt-3  px-2 text-3xl">verified</span>
          </div>
        ) : (
          <>
            {" "}
            <div className="col-span-2 flex justify-between px-40 py-5">
            <button
              onClick={verifyHotel}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Verify
              </span>
            </button>
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Reject
              </span>
            </button>
            </div>
          </>
        )}
      
    </div>
  )
}

export default HotelDetails
