import React from "react";
import useHotelList from "../../hooks/owner/UseHotelList";
import {Button} from "flowbite-react"



const HotelData: React.FC = ({ image, name, place }) => {
  return (
    <>
      <div className="flex items-center p-4 bg-white rounded shadow-md my-2 max-w-4xl mx-auto">
        <img
          className="w-24 h-24 object-cover rounded mr-4"
          src={image}
          alt={name}
        />
        <div className="flex-grow">
          <h5 className="text-xl font-bold text-center text-gray-900">
            {name}
          </h5>
          <p className="text-gray-700 text-center">{place}</p>
        </div>
        <div className="ml-auto">
        
          <Button outline gradientDuoTone="purpleToBlue">
          View Details
      </Button>
        </div>
      </div>
    </>
  );
};

const Hotels: React.FC = () => {
  const { hotels } = useHotelList();
  console.log(hotels);

  return (
    <div className="min-h-screen px-14 py-7 ">
      {hotels.length > 0 ? (
        hotels.map((hotel) => <HotelData key={hotel._id} {...hotel} />)
      ) : (
        <p>No hotels available</p>
      )}
    </div>
  );
};

export default Hotels;
