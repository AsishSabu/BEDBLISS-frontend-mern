import React from "react";
import useHotelDetails from "../../hooks/user/useHotelDetails";
import { useParams } from "react-router-dom";

const HotelDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { hotel, loading, error } = useHotelDetails(id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading hotel details.</p>;
  if (!hotel) return <p>No hotel details available.</p>;

  const {
    name,
    destination,
    description,
    stayType,
    address,
    room,
    bed,
    bathroom,
    guests,
    price,
    amenities,
    propertyRules,
    imageUrls,
  } = hotel;

  return (
    <div className="max-w-6xl mx-auto my-5 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3 p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
            <p className="text-lg text-gray-600">{destination}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Description</h3>
            <p className="text-base text-gray-600">{description}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Stay Type</h3>
            <p className="text-base text-gray-600">{stayType}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Address</h3>
            <p className="text-base text-gray-600">{address.streetAddress}</p>
            <p className="text-base text-gray-600">{address.landMark}</p>
            <p className="text-base text-gray-600">{address.city}, {address.district}</p>
            <p className="text-base text-gray-600">{address.country} - {address.pincode}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Amenities</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {amenities.map((amenity, index) => (
                <li key={index} className="text-base text-gray-600">
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Property Rules</h3>
            <ul className="list-disc pl-5">
              {propertyRules.map((rule, index) => (
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
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">{room}</td>
                  <td className="py-3 px-4">{bed}</td>
                  <td className="py-3 px-4">{bathroom}</td>
                  <td className="py-3 px-4">{guests}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-right">
            <button className="inline-block px-6 py-2.5 bg-gradient-to-br from-pink-500 to-orange-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gradient-to-bl hover:shadow-lg focus:bg-gradient-to-bl focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gradient-to-bl active:shadow-lg transition duration-150 ease-in-out">
              Edit Hotel
            </button>
          </div>
          
        </div>
        <div className="md:w-1/3 p-6 grid grid-cols-2 gap-4">
          {imageUrls.map((image, index) => (
            <img
              key={index}
              className="w-full h-40 object-cover rounded-lg"
              src={image} // replace with the actual image URL
              alt={`Hotel ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
