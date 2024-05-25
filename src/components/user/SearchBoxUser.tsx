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
    <section className="shadow-lg border rounded-full grid grid-cols-1 md:grid-cols-6 gap-4  container mx-auto  relative bg-white max-w-3xl -mt-8">
      <input
        className=" border-hidden rounded-full p-4 text-gray-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-varGray col-span-1 md:col-span-2"
        type="text"
        placeholder="Where are you going?"
        value={destination}
        onChange={e => setDestination(e.target.value)}
      />
      <input
        title="checkin"
        className="rounded-full border-hidden p-4 text-gray-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-varGray col-span-1 md:col-span-1"
        type="date"
        value={checkInDate}
        onChange={e => setCheckInDate(e.target.value)}
      />
      <input
        title="checkout"
        className="rounded-full border-hidden p-4 text-gray-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-varGray col-span-1 md:col-span-1"
        type="date"
        value={checkOutDate}
        onChange={e => setCheckOutDate(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-full border text-gray-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-varGray col-span-1 md:col-span-2">
        <input
          title="checkout"
          placeholder="No of guests?"
          className="border-hidden rounded-l-full text-gray-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-varGray col-span-3"
          type="text"
          value={checkOutDate}
          onChange={e => setCheckOutDate(e.target.value)}
        />
        <button
        title="search"
          type="button"
          className="border-hidden text-gray-700  col-span-1 rounded-full"
          onClick={handleSearch}
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white rounded-full"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </button>
      </div>
    </section>
  )
}

export default SearchBoxUser
