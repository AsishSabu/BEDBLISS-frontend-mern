import React from "react"
import SearchBoxUser from "../SearchBoxUser"
import useUserHotels from "../../../hooks/user/useUserHotels"

const Banner: React.FC = () => {
  const {
    handleSearch,
  } = useUserHotels()

  return (
    <>
      <div className=" h-[200px] bg-Marine_blue z-50">
        <div className="flex flex-col gap-4 justify-center xl:ml-10 lg:ml-2.5 md:ml-3.5 sm:ml-60 w-full h-full px-3 md:px-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-varWhite">
            Find your next stay
          </h1>
          <p className="text-gray-500">
            Search low prices on hotels, homes, and much more...
          </p>
        </div>
      </div>
      <div className="">
        <SearchBoxUser
          handleSearch={handleSearch}
        />
      </div>
    </>
  )
}

export default Banner
