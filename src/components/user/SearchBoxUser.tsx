import React from "react"

interface SearchBoxUserProps {
  destination: string
  setDestination: (destination: string) => void
  checkInDate: string
  setCheckInDate: (checkInDate: string) => void
  checkOutDate: string
  setCheckOutDate: (checkOutDate: string) => void
  handleSearch: () => void
}

const SearchBoxUser: React.FC<SearchBoxUserProps> = ({
  destination,
  setDestination,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  handleSearch,
}) => {
  return (
    <section className="shadow-lg bg-varWhite border-varRed border-2 focus:ring-4 md:rounded-full grid sm:grid-cols-2 md:grid-cols-9 md:gap-1 container mx-auto  relative  max-w-3xl -mt-8">
      <input
        className=" border-hidden rounded-l-full p-4 text-gray-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-varGray col-span-1 md:col-span-2"
        type="text"
        placeholder="Where are you going?"
        value={destination}
        onChange={e => setDestination(e.target.value)}
      />
      <input
        title="checkin"
        className=" border-hidden p-4 text-gray-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-varGray col-span-1 md:col-span-2"
        type="date"
        value={checkInDate}
        onChange={e => setCheckInDate(e.target.value)}
      />
      <input
        title="checkout"
        className=" border-hidden p-4 text-gray-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-varGray col-span-1 md:col-span-2"
        type="date"
        value={checkOutDate}
        onChange={e => setCheckOutDate(e.target.value)}
      />
      <input
        title="checkout"
        placeholder="No of guests?"
        className=" border-hidden p-4 text-gray-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-varGray col-span-1 md:col-span-2"
        type="text"
        value={checkOutDate}
        onChange={e => setCheckOutDate(e.target.value)}
      />

      <button
        title="search"
        type="button"
        className="border-hidden  bg-Marine_blue md:rounded-r-full flex justify-center items-center sm:col-span-2 md:col-span-1 "
        onClick={handleSearch}
      >
        <p className="font-bold text-xl text-varWhite pr-2">search</p>
      </button>
    </section>
  )
}

export default SearchBoxUser
