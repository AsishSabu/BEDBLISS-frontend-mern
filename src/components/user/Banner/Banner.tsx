import React from "react";
import SearchBoxUser from "../SearchBoxUser";
import useUserHotels from "../../../hooks/user/useUserHotels";

const Banner: React.FC = () => {
  const { destination,
    checkInDate,
    checkOutDate,
    setDestination,
    setCheckInDate,
    setCheckOutDate,
    handleSearch,} = useUserHotels()


  return (
    <>
      <div className="relative h-[300px] bg-varWhite">
        <div className="flex flex-col gap-4 justify-center xl:ml-10 lg:ml-2.5 md:ml-3.5 sm:ml-60 w-full h-full px-3 md:px-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-red-600">
            Find your next stay
          </h1>
          <p className="text-gray-300">Search low prices on hotels, homes, and much more...</p>
        </div>
      </div>
      <SearchBoxUser
        destination={destination}
        setDestination={setDestination}
        checkInDate={checkInDate}
        setCheckInDate={setCheckInDate}
        checkOutDate={checkOutDate}
        setCheckOutDate={setCheckOutDate}
        handleSearch={handleSearch}
      />
    </>
  );
};

export default Banner;
