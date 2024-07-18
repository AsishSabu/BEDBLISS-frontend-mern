import React from "react"
import { useNavigate } from "react-router-dom"
import useHotelList from "../../../hooks/owner/UseHotelList"
import BookingChart from "../BookingChart"
import RevenueChart from "../RevenueChart"

const Body = () => {
  const { hotels } = useHotelList()
  console.log(hotels, "hotels.........")

  const navigate = useNavigate()
  const handleClick = (id: string) => {
    navigate(`/owner/hotelDetails/${id}`)
  }

  const handleAddHotel = () => {
    navigate("/owner/addHotel")
  }

  return (
    <div className="bg-varWhite">
      <header className="bg-shadow rounded-3xl p-4">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, Asish!</h1>
          <p className="mt-1 text-gray-600">
            Add your hotels and earn more
          </p>
          <div className="grid grid-cols-2 gap-2 p-4 mt-5 bg-varBlueGray rounded-lg">
            <div className="col-span-1 ">
              <BookingChart />
            </div>
            <div className="col-span-1">
              <RevenueChart />
            </div>
          </div>
          <div className="border p-10 h-fit border-spacing-5 rounded-lg shadow-md mt-10">
            {hotels.length ? (
              <div className="p-5">
                <header className="flex justify-between mb-5">
                  <h1 className="text-2xl font-bold">Your Listings</h1>
                  <div className="flex space-x-3">
                    {/* Uncomment and style the button if needed */}
                    {/* <button className="text-xl" onClick={handleAddHotel}>
                      ➕
                    </button> */}
                  </div>
                </header>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {hotels.map((hotel: any) => (
                    <div
                      key={hotel._id}
                      className="relative rounded-3xl shadow-sm p-2 cursor-pointer"
                      onClick={() => handleClick(hotel._id)}
                    >
                      <div className="relative">
                        {!hotel.isVerified ? (
                          <div className="absolute top-2 left-2 bg-slate-200 text-black text-sm px-2 py-1 rounded-lg flex items-center space-x-1 bg-varWhite">
                            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                            <span>Verification required</span>
                          </div>
                        ) : null}
                        <img
                          className="w-full h-64 object-cover rounded-xl border-none"
                          src={hotel.imageUrls[0]}
                          alt="Listing"
                        />
                      </div>
                      <div className="mt-3">
                        <h2 className="text-xl font-semibold">{hotel.name}</h2>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-10">
                <header className="flex justify-between">
                  <h1 className="text-4xl text-red-600 font-body">
                    No Hotels listed yet
                  </h1>
                  {/* Uncomment and style the button if needed */}
                  {/* <button className="text-xl" onClick={handleAddHotel}>
                    ➕
                  </button> */}
                </header>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <section className="mb-8 shadow-xl rounded-3xl w-full p-8 bg-varCream">
          <h2 className="text-2xl font-semibold text-gray-900">
            Your next steps
          </h2>
          <p className="mt-2 text-gray-600">
            It's time to review a couple of current settings.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">
                Turn Instant Book on or off
              </h3>
              <p className="mt-1 text-gray-600">Choose how guests will book</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">
                Offer special promotions
              </h3>
              <p className="mt-1 text-gray-600">
                Add discounts to attract guests
              </p>
            </div>
            <div className="p-4 bg-green-100 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">
                Calendar reviewed
              </h3>
            </div>
            <div className="p-4 bg-green-100 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">
                Cancellation policies reviewed
              </h3>
            </div>
            <div className="p-4 bg-green-100 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">
                House rules reviewed
              </h3>
            </div>
            <div className="p-4 bg-green-100 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">
                Checkout instructions reviewed
              </h3>
            </div>
          </div>
        </section>
        <section className="shadow-xl rounded-3xl p-8 bg-varCream">
          <h2 className="text-2xl font-semibold text-gray-900">
            We’re here to help
          </h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">
                Guidance from a Superhost
              </h3>
              <p className="mt-1 text-gray-600">
                We'll match you with an experienced Host who can help you get
                started.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">
                Contact specialised support
              </h3>
              <p className="mt-1 text-gray-600">
                As a new Host, you get one-tap access to a specially trained
                support team.
              </p>
            </div>
          </div>
        </section>
      </main> */}
    </div>
  )
}

export default Body
