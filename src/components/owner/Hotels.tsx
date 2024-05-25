import React from "react"
import useHotelList from "../../hooks/owner/UseHotelList"
import { Button } from "flowbite-react"
import { useNavigate } from "react-router-dom"

// const HotelData: React.FC = ({ _id,image, name, place }) => {

//   return (
//     <>
//       <div className="flex items-center p-4 bg-white rounded shadow-md my-2 max-w-4xl mx-auto">
//         <img
//           className="w-24 h-24 object-cover rounded mr-4"
//           src={image}
//           alt={name}
//         />
//         <div className="flex-grow">
//           <h5 className="text-xl font-bold text-center text-gray-900">
//             {name}
//           </h5>
//           <p className="text-gray-700 text-center">{place}</p>
//         </div>
//         <div className="ml-auto">

//           <Button onClick={handleClick} outline gradientDuoTone="purpleToBlue">
//           View Details
//       </Button>
//         </div>
//       </div>
//     </>
//   );
// };

const Hotels: React.FC = () => {
  const { hotels } = useHotelList()
  const navigate = useNavigate()
  const handleClick = (id: string) => {
    navigate(`/owner/hotelDetails/${id}`)
  }

  const handleAddHotel = () => {
    navigate("/owner/addHotel")
  }

  return (
    <div className="p-5">
      <header className="flex justify-between mb-5">
        <h1 className="text-2xl">Your listing</h1>
        <div className="flex space-x-3">
          <button className="text-xl">🔍</button>
          <button className="text-xl">📄</button>
          <button className="text-xl" onClick={()=>handleAddHotel}>➕</button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
        {hotels &&
          hotels.map(hotel => (
            <div
              key={hotel._id}
              className="relative rounded-3xl shadow-sm p-2"
              onClick={() => handleClick(hotel._id)}
            >
              <div className="relative">
                <div className="absolute top-2 left-2 bg-slate-200 text-black text-sm px-2 py-1 rounded-lg flex items-center space-x-1">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <span>Verification required</span>
                </div>
                <img
                  className="w-full h-64 object-cover rounded-xl"
                  src={hotel.image} // Replace with your image URL
                  alt="Listing"
                />
              </div>
              <div className="mt-3 ">
                <h2 className="text-xl font-semibold">{hotel.name}</h2>
                <p className="text-gray-600">{hotel.place}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Hotels
