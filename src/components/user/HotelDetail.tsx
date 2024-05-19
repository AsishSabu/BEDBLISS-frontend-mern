import React from "react";
import useHotelDetails from '../../hooks/user/useHotelDetails';
import { useParams } from "react-router-dom";

const HotelDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { hotel, loading, error } = useHotelDetails(id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading hotel details.</p>;
  if (!hotel) return <p>No hotel details available.</p>;

  const {
    name,
    image,
    place,
    description,
    amenities,
    rooms,
    propertyRules,
    aboutProperty,
  } = hotel;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6 flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-gray-900">{name}</h2>
            <p className="text-xl text-gray-600">{place}</p>
            <p className="mt-4 text-gray-700">{description}</p>
            <h3 className="mt-6 text-xl font-semibold text-gray-900">About the Property</h3>
            <p className="mt-2 text-gray-700">{aboutProperty}</p>
          </div>
          <div className="flex justify-center p-6">
            <img className="w-full h-auto object-cover rounded-lg" src={image} alt={name} />
          </div>
        </div>
        <div className="p-6">
          <h3 className="mt-6 text-xl font-semibold text-gray-900">Property Rules</h3>
          <ul className="mt-2 list-disc list-inside text-gray-700">
            {propertyRules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
          <h3 className="mt-6 text-xl font-semibold text-gray-900">Amenities</h3>
          <ul className="mt-2 list-disc list-inside text-gray-700">
            {amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
          <h3 className="mt-6 text-xl font-semibold text-gray-900">Rooms</h3>
          <div className="mt-2 space-y-4">
            {rooms.map((room, index) => (
              <div key={index} className="border p-4 rounded-lg">
                <h4 className="text-lg font-bold text-gray-900">{room.roomType}</h4>
                <p className="text-gray-700">Price: ₹{room.price}</p>
                <h5 className="mt-2 font-semibold text-gray-900">Room Amenities:</h5>
                <ul className="list-disc list-inside text-gray-700">
                  {/* {room.amenities.map((amenity, idx) => (
                    <li key={idx}>{amenity}</li>
                  ))} */}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
