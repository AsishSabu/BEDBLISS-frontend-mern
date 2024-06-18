import React, { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/reducer/reducer"
import { Range } from "react-range"
import HotelData from "./HotelData"
import { useNavigate } from "react-router-dom"

const STEP = 100
const MIN = 500
const MAX = 20000

const HotelCards: React.FC = () => {
  const navigate = useNavigate()
  const handleClick = (id: string) => {
    navigate(`/user/hotelDetails/${id}`)
  }


  const searchResults = useSelector(
    (state: RootState) => state.destinationSlice.search
  )
  const [values, setValues] = useState([MIN, MAX])

  return (
    <div className="grid grid-cols-12 mt-2 min-h-screen">
      <div className="w-full bg-white col-span-12 lg:col-span-3 flex flex-col gap-5 px-2">
        <div className="flex-1 bg-gray-100 p-3 rounded-md sticky top-20 h-fit">
          <h1 className="text-lg text-gray-700 mb-2 font-bold">Filter by:</h1>
          <div className="mb-4 border  p-4 rounded-lg">
            <h2 className="text-sm font-medium text-gray-700">Categories</h2>
            <ul className="mt-2 space-y-2">
              <li>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 text-gray-700">Resorts</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 text-gray-700">Villas</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 text-gray-700">Apartments</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 text-gray-700">Hotels</span>
                </label>
              </li>
            </ul>
          </div>
          <div className="mb-4 border  p-4 rounded-lg">
            <h2 className="text-sm font-medium text-gray-700">
              Your budget (per night)
            </h2>
            <div className="py-4">
              <Range
                step={STEP}
                min={MIN}
                max={MAX}
                values={values}
                onChange={values => setValues(values)}
                renderTrack={({ props, children }) => (
                  <div {...props} className="w-full h-1 bg-gray-300 rounded-lg">
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    className="w-5 h-5 bg-blue-600 rounded-full"
                  />
                )}
              />
            </div>

            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>₹ {values[0]}</span>
              <span>₹ {values[1]}+</span>
            </div>
          </div>
          <div className="mb-4 border  p-4 rounded-lg">
            <h2 className="text-sm font-medium text-gray-700">Rating</h2>
            <ul className="mt-2 space-y-2">
              <li>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 text-gray-700">Superb: 9+</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 text-gray-700">Less than 1 km</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 text-gray-700">Villas</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 text-gray-700">Resorts</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 text-gray-700">4 stars</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 text-gray-700">Balcony</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 text-gray-700">Private pool</span>
                </label>
              </li>
            </ul>
          </div>
          <button
            onClick={() => {
              /* handle search logic */
            }}
            className="py-2 bg-blue-700 rounded-lg text-white w-full font-medium cursor-pointer"
          >
            Apply filters
          </button>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-9 bg-gray-100 p-5">
        {searchResults.length > 0 ? (
          searchResults.map(hotel => (
            <div
              key={hotel._id}
              className="flex flex-col p-4 min-w-full rounded-lg bg-white shadow-md md:max-w-xl md:flex-row"
              onClick={() => handleClick(hotel._id)}
            >
              <img
                className="aspect-square rounded-xl w-full object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                src={hotel?.imageUrls[0]}
                alt=""
              />
              <div className="flex flex-col justify-start p-6">
                <h5 className="mb-2 text-2xl font-bold text-gray-800">
                  {hotel?.name}
                </h5>
                <p className="text-xs text-gray-500">{hotel?.destination}</p>
                <p className="mb-4 text-base text-gray-600">
                  {hotel?.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No hotels available</p>
        )}
      </div>
    </div>
  )
}

export default HotelCards
