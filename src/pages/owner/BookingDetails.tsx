import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { USER_API } from "../../constants"
import { BookingInterface, BookingResponse } from "../../types/hotelInterface"
import axios from "axios"
import showToast from "../../utils/toast"
import CancelBookingModal from "../../components/owner/cancelBookingModal"
import { useFetchData } from "../../utils/fetcher"
import { useAppSelector } from "../../redux/store/store"
import { RootState } from "../../redux/reducer/reducer"
import { useNotification } from "../../hooks/NotificationHook"

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

// Import the modal component

const BookingDetails:React.FC = () => {
  const [booking, setBooking] = useState<BookingInterface | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const user = useAppSelector((state: RootState) => state.userSlice)
  const { sendNotification } = useNotification()
  const { id } = useParams<{ id: string }>()

  const navigate = useNavigate()

  const { data, isError: error } = useFetchData<BookingResponse>(
    `${USER_API}/bookingDetails/${id}`
  )

  useEffect(() => {
    console.log(data, "data.......")

    if (data) {
      setBooking(data.bookings)
    }
  }, [data])

  if (error) {
    console.error("Error fetching booking:", error)
    return <div>Error fetching booking details.</div>
  }

  if (!data) {
    return <div>Loading...</div>
  }

  const handleRejection = async (reason: string) => {
    if (!booking) return

    try {
      const response = await axios.patch(
        `${USER_API}/booking/cancel/${booking.bookingId}`,
        { reason, status: "rejected" }, // Pass the reason for cancellation
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )

      const message = `${response.data.booking.hotelId.name} booking rejected by ${user.name}`
      const path = `/user/profile/bookingDetails/${response.data.booking._id}`
      const receiverId = response.data.booking.userId
      sendNotification(message, path, user, receiverId, 3)
      
      setBooking(prevBooking => ({
        ...prevBooking!,
        bookingStatus:
          response.data.booking.bookingStatus ?? prevBooking?.bookingStatus,
      }))
      showToast("Booking Rejected successfully", "success")
    } catch (error) {
      console.error("Error rejecting booking:", error)
      showToast("Oops! Something went wrong", "error")
    }
  }

  const handleCancellation = async () => {
    if (!booking) return

    try {
      const response = await axios.patch(
        `${USER_API}/booking/cancel/${booking.bookingId}`,
        { status: "cancelled" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )

      const message = `${response.data.booking.hotelId.name} hotel cancellation accepted by ${user.name}`
      const path = `/user/profile/bookingDetails/${response.data.booking._id}`
      const receiverId = response.data.booking.userId
      sendNotification(message, path, user, receiverId, 5)
      setBooking(prevBooking => ({
        ...prevBooking!,
        bookingStatus:
          response.data.booking.bookingStatus ?? prevBooking?.bookingStatus,
      }))
      showToast("Booking cancellation accepted successfully", "success")
    } catch (error) {
      console.error("Error in accept cancellation of booking:", error)
      showToast("Oops! Something went wrong", "error")
    }
  }

  const handleAccept = async () => {
    if (!booking) return

    try {
      const response = await axios.patch(
        `${USER_API}/booking/update/${booking.bookingId}`,
        { status: "booked" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )

      const message = `${response.data.booking.hotelId.name} booking accepted by ${user.name}`
      const path =`/user/profile/bookingDetails/${response.data.booking._id}`
      const receiverId = response.data.booking.userId
      sendNotification(message, path, user, receiverId, 4)

      setBooking(prevBooking => ({
        ...prevBooking!,
        bookingStatus:
          response.data.booking.bookingStatus ?? prevBooking?.bookingStatus,
      }))

      showToast("Booking successfully Approved", "success")
    } catch (error) {
      console.error("Error approving booking:", error)
      showToast("Oops! Something went wrong", "error")
    }
  }

  return (
    <div className="w-screen h-fit overflow-hidden flex justify-center">
      <div className="bg-varWhite min-h-screen p-4">
        <div className="mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl text-center font-semibold mb-4">
            Booking Details
          </h1>
          {booking && (
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="items-center rounded-lg mb-4">
              <div className="border rounded-lg p-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm  text-gray-600 mb-1">
                        Check-in-Date
                      </p>
                      <p className="text-xl font-bold text-gray-600">
                        {formatDate(booking.checkInDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm  text-gray-600 mb-1">
                        Check-out-Date
                      </p>
                      <p className="text-xl font-bold text-gray-600">
                        {formatDate(booking.checkOutDate)}
                      </p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <p className="font-bold  text-varBlue mb-1 mt-2">
                      Booking Details
                    </p>
                    <h2 className=" text-sm font-semibold  mb-2 ">
                      BOOKING ID :<span className="font-normal mx-2">{booking.bookingId}</span> 
                    </h2>
                    <p className="text-sm font-semibold mb-2">
                      Booking Status:<span className="font-normal mx-2">{booking.bookingStatus}</span> 
                    </p>
                    <p className=" text-sm font-semibold">
                      Details: {booking.maxAdults && booking.maxAdults + " Adult"},{booking.maxChildren && booking.maxChildren + " Children"}--{booking.totalDays+" nights"},{booking.totalRooms+" rooms"}
                    </p>
                  </div>

                  <p className="text-sm font-semibold mb-2">
                    Payment Method: <span className="font-normal mx-2">{booking.paymentMethod}</span>
                  </p>
                  <p className=" text-lg  mb-2">Amount: {booking.price}</p>
                </div>
                <div className="border rounded-lg p-4 my-3">
                  <h2 className="text-lg font-medium mb-2">User Details</h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p>
                      Name: {booking.firstName} {booking.lastName}
                    </p>
                    <p>Email: {booking.email}</p>
                    <p>Phone: {booking.phoneNumber}</p>
                  </div>
                </div>
                <div className="border rounded-lg p-4 my-3">
                  <h2 className="text-lg font-medium mb-2">Stay Address</h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p>Street: {booking.hotelId.address.streetAddress}</p>
                    <p>City: {booking.hotelId.address.city}</p>
                    <p>LandMark: {booking.hotelId.address.landMark}</p>
                    <p>District: {booking.hotelId.address.district}</p>
                    <p>Pincode: {booking.hotelId.address.pincode}</p>
                    <p>Country: {booking.hotelId.address.country}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="p-5 text-black rounded-lg">
                  <img
                    alt="image"
                    src={booking?.hotelId?.imageUrls[0]}
                    className="p-3 h-64 w-full"
                  />
                  <h2 className="px-3 text-xl text-right font-medium mb-2">
                    {booking.hotelId.name}
                  </h2>
                  <h2 className="px-3 text-base text-right font-medium mb-2">
                    {booking.hotelId.destination}
                  </h2>
                </div>

                <div className="border rounded-lg p-4 my-3">
                  <h2 className="text-lg font-medium mb-2">Property Rules</h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    {booking.hotelId.propertyRules.map((rule, index) => (
                      <p key={index}>{rule}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-between mx-40">
            <button
              onClick={() => navigate(-1)}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Go Back
              </span>
            </button>

            {booking && booking.bookingStatus === "pending" && (
              <>
                {" "}
                <button
                  onClick={() => handleAccept()}
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-400 to-pink-600 group-hover:from-red-400 group-hover:to-pink-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Accept Booking
                  </span>
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-400 to-pink-600 group-hover:from-red-400 group-hover:to-pink-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Reject Booking
                  </span>
                </button>
              </>
            )}

            {booking && booking.bookingStatus === "cancel requested" && (
              <>
                {" "}
                <button
                  onClick={() => handleCancellation()}
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-400 to-pink-600 group-hover:from-red-400 group-hover:to-pink-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Approve cancel
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <CancelBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleRejection}
      />
    </div>
  )
}

export default BookingDetails
