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
  console.log(rooms);
  

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

          {/* <div className="mt-4 flex flex-wrap">
          <span className="text-gray-700 text-sm bg-gray-200 px-2 py-1 rounded-lg mr-2 mb-2">Exceptional Service</span>
          <span className="text-gray-700 text-sm bg-gray-200 px-2 py-1 rounded-lg mr-2 mb-2">Friendly Staff</span>
          <span className="text-gray-700 text-sm bg-gray-200 px-2 py-1 rounded-lg mr-2 mb-2">Free Breakfast</span>
        </div> */}
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

        </div>
        <div className="md:w-1/3 pr-6">
          <img
            className="w-full h-auto object-cover rounded-xl"
            src={image} // replace with the actual image URL
            alt="Hotel"
          />
          {rooms.map((room,index)=>(
        <div key={index} className="flex justify-between border rounded-xl shadow-lg p-2 my-3">
        <div>
        <span className="text-lg font-semibold text-orange-500">₹{room.price}</span>
      <p className="text-gray-600 text-sm">Room Type :{room.type} room</p>
      {/* <p className="text-gray-400 text-xs line-through">₹2,900</p> */}
      {/* <p className="text-green-500 text-sm">
        5% off No cost EMI from ₹1,083
      </p> */}
        </div>
     
      <div className="mt-4">
        <button className="bg-orange-500 text-white px-4 py-1 rounded-lg">
          Select room
        </button>
      </div>
      </div>
          ))}
  
          
        </div>
      </div>
    </div>
  
  )
}

export default HotelDetail
