import React from "react"
// import { useParams } from 'react-router-dom';
// import { HotelInterface } from '../../types/hotelInterface';
// import useHotelDetails from '../../hooks/useHotelDetails';

const HotelDetail: React.FC = () => {
  // const { id } = useParams<{ id: string }>();
  // const { hotel, loading, error } = useHotelDetails(id);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error loading hotel details.</p>;

  // if (!hotel) return <p>No hotel details available.</p>;

  // const {
  //   name,
  //   image,
  //   place,
  //   description,
  //   amenities,
  //   rooms,
  //   propertyRules,
  //   aboutProperty,
  // }: HotelInterface = hotel;

  return (
    <div className="container mx-auto p-4 ">
      <div className=" p-10 mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-2">
          <div className="flex flex-col">
            <h2 className="text-6xl font-bold text-gray-900 p-4">
              Hotel mountain top
            </h2>
            <p className="text-3xl pl-5 text-gray-600">place</p>
            <p className="mt-4 pl-5 text-gray-700">description</p>
            <h3 className="mt-6 pl-5 text-xl font-semibold text-gray-900">
              About the Property
            </h3>
            <p className="p-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
          <div className=" flex justify-center p-10 ">
            <img
              className=" w-2/4  object-cover rounded-xl "
              src="https://picsum.photos/200"
              alt=""
            />
          </div>
        </div>

        <div className="p-6">
          <h3 className="mt-6 text-xl font-semibold text-gray-900">
            Property Rules
          </h3>
          <ul className="mt-2 list-disc list-inside text-gray-700">
            <li>couples not allowed</li>
            {/* {propertyRules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))} */}
          </ul>
          <p className="mt-2 text-gray-700">

          </p>
          <h3 className="mt-6 text-xl font-semibold text-gray-900">
            Amenities
          </h3>
          <ul className="mt-2 list-disc list-inside text-gray-700">
            {/* {amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))} */}
            <li>fksjdlf</li>
            <li>nfsdklfsdl</li>
            <li>ogsdfjgodf</li>
          </ul>

          <h3 className="mt-6 text-xl font-semibold text-gray-900">Rooms</h3>
          <div className="mt-2 space-y-4">
            {/* {rooms.map((room, index) => (
                <div key={index} className="border p-4 rounded-lg">
                  <h4 className="text-lg font-bold text-gray-900">{room.roomType}</h4>
                  <p className="text-gray-700">Price: ${room.price}</p>

                  <h5 className="mt-2 font-semibold text-gray-900">Amenities:</h5>
                  <ul className="list-disc list-inside text-gray-700">
                    {room.amenities.map((amenity, idx) => (
                      <li key={idx}>{amenity}</li>
                    ))}
                  </ul>
                </div>
              ))} */}
          </div>

          
        </div>
      </div>
    </div>
  )
}

export default HotelDetail
