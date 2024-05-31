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
    imageUrls,
    destination,
    description,
    amenities,
    room,
    propertyRules,
    bed,
    bathroom,
    guests,
    price,
    stayType,
    address,
  } = hotel;

  return (
    <div className="max-w-5xl  mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Images at the top */}
      <div className="mb-6 h-2/5">
        <div className="grid grid-cols-2 gap-2">
          <img src={imageUrls[0]} alt="Houseboat" className="h-full  object-cover rounded-lg mb-2 col-span-1" />
         
            <div className="grid grid-cols-2 gap-2">
              {imageUrls.slice(1, 5).map((url, index) => (
                <img key={index} src={url} alt={`Houseboat ${index + 1}`} className="h-full object-cover rounded-lg col-span-1 " />
              ))}
            </div>         
        </div>
      </div>

      {/* Details below */}
      <div className="flex flex-col md:flex-row">
        <div className="w-full">
          <h1 className="text-3xl font-bold mb-2">{name}</h1>
          <p className="text-gray-700 mb-2">{room} room.{bed} bed.{bathroom} bathroom</p>
          <p className="text-gray-600 mb-2">{destination}</p>
          <div className="flex items-center mb-2">
            <span className="inline-block bg-yellow-500 text-white px-2 py-1 rounded-full text-sm font-semibold mr-2">4.97</span>
            <span className="text-gray-600">(79 reviews)</span>
          </div>
          <div className="mb-4">
            <p className="text-gray-800 mb-1">Hosted by Kirby</p>
            <p className="text-gray-600 mb-1">Dedicated workspace</p>
            <p className="text-gray-600 mb-1">Kirby is a Superhost</p>
            <p className="text-gray-600 mb-1">Free cancellation before Jun 3</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{description}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">What this place offers</h2>
            <ul className="list-disc list-inside text-gray-600">
              {amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full md:w-1/3 md:ml-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-gray-800 font-semibold text-lg">₹{price} / night</p>
                <p className="text-gray-600 text-sm">Includes taxes and fees</p>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Check-in</label>
              <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Check-out</label>
              <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Guests</label>
              <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50" />
            </div>
            <button className="w-full bg-pink-500 text-white px-4 py-2 rounded-lg font-semibold">Reserve</button>
            <div className="text-gray-600 text-sm mt-4">
              <p className="mb-2">₹12,345 x 5 nights</p>
              <p className="mb-2">Cleaning fee ₹2,000</p>
              <p className="mb-2">Service fee ₹1,000</p>
              <p className="font-semibold">Total before taxes ₹82,650</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
