import useSWR from "swr"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { USER_API } from "../../constants"
import { useFetchData } from "../../utils/fetcher"
import { BookingInterface, BookingResponse } from "../../types/hotelInterface"
import axios from "axios"
import showToast from "../../utils/toast"
import CancelBookingModal from "../../components/user/cancelBooking" // Ensure this path is correct
import UserChat from "./UserChat"
import { chatImg, reportImg, starImg } from "../../assets/images"
import AddReview from "../../components/AddReview"
import ReportModal from "../../components/user/ReportingModal"
import { useSocket } from "../../redux/contexts/SocketContext"


const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

const BookingDetails: React.FC = () => {
  const [booking, setBooking] = useState<BookingInterface | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showChatModal, setShowChatModal] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const socket = useSocket()
  const { id } = useParams<{ id: string }>()

  const navigate = useNavigate()

  const { data, isError } = useFetchData<BookingResponse>(
    `${USER_API}/bookingDetails/${id}`
  )

  useEffect(() => {
    console.log(data, "data.......")

    if (data) {
      setBooking(data.bookings)
    }
  }, [data])
  console.log(data, "booking data")

  if (isError) {
    console.error("Error fetching booking:", isError)
    return <div>Error fetching booking details.</div>
  }

  if (!data) {
    return <div>Loading...</div>
  }

  const handleCancellation = async (reason: string) => {
    if (!booking) return

    try {
      const response = await axios.patch(
        `${USER_API}/booking/update/${booking.bookingId}`,
        { reason, status: "cancel requested" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      // const notification = {
      //   type: "1",
      //   message: `${data.result.hotelId.name} booked by ${user.name}`,
      //   data: {
      //     senderId: user.id,
      //     name: user.name,
      //     image: user.image,
      //     onClickPath: `/owner/bookingDetails/${data.result._id}`,
      //   },
      // };

      // const socketNotification = {
      //   type: "1",
      //   message: `${data.result.hotelId.name} booked by ${user.name}`,
      //   data: {
      //     senderId: user.id,
      //     name: user.name,
      //     image: user.image,
      //     onClickPath: `/owner/bookingDetails/${data.result._id}`,
      //   },
      //   createdAt: new Date(Date.now()),
      // };

      // socket?.emit(
      //   "noti",
      //   socketNotification,
      //   data.result.hotelId.ownerId._id
      // );
      // axios.patch(
      //   `${USER_API}/addNotification/${data.result.hotelId.ownerId._id}`,
      //   notification,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem(
      //         "access_token"
      //       )}`,
      //     },
      //   }
      // );

      setBooking(prevBooking => ({
        ...prevBooking!,
        bookingStatus:
          response.data.booking.bookingStatus ?? prevBooking?.bookingStatus,
      }))
      showToast("Booking cancelled successfully", "success")
    } catch (error) {
      console.error("Error cancelling booking:", error)
      showToast("Oops! Something went wrong", "error")
    }
  }

  const showChat = () => {
    setShowChatModal(true)
  }
  const showReview = () => {
    setShowReviewModal(true)
  }
  const showReport = () => {
    setShowReportModal(true)
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
                  <h2 className="text-lg font-medium mb-2">
                    BOOKING ID : {booking.bookingId}
                  </h2>
                  <p className="text-base text-green-500 mb-2">
                    Booking Status: {booking.bookingStatus}
                  </p>
                  <p className="text-base text-red-500 mb-2">
                    Payment Method: {booking.paymentMethod}
                  </p>
                  <p className=" text-lg  mb-2">
                  Amount: {booking.price}
                  </p>

                  <div className="flex justify-between">
                    <div>
                      <p className="text-xl font-bold text-gray-600 mb-1">
                        Check-in-Date
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatDate(booking.checkInDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-600 mb-1">
                        Check-out-Date
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatDate(booking.checkOutDate)}
                      </p>
                    </div>
                  </div>
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
              <UserChat
                isOpen={showChatModal}
                onClose={() => setShowChatModal(false)}
                ownerId={booking.hotelId.ownerId}
              />

              <AddReview
                isOpen={showReviewModal}
                onClose={() => setShowReviewModal(false)}
                id={booking.hotelId._id}
              />

              <ReportModal
                isOpen={showReportModal}
                onClose={() => setShowReportModal(false)}
                hotelId={booking.hotelId._id}
                bookingId={id}
                userId={booking.userId._id}
              />
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
            {booking &&
              (booking.bookingStatus === "pending" ||
                booking.bookingStatus === "booked") && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-400 to-pink-600 group-hover:from-red-400 group-hover:to-pink-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Cancel Booking
                  </span>
                </button>
              )}
          </div>
          <div  className="flex justify-center mt-5">
            {" "}
            <div
              onClick={showChat}
              className="show-chat  mx-10 mb-6 mt-4 text-Marine_blue hover:text-green-600 flex flex-col justify-end items-center cursor-pointer"
            >
              <img src={chatImg} className="h-10" alt="user" />
              <span>Chat With Owner</span>
            </div>
            {booking &&
            new Date(booking.checkOutDate).getTime() < Date.now() ? (
              <div
                onClick={showReview}
                className="show-chat mx-10 mb-6 mt-4 text-Marine_blue hover:text-green-600 flex flex-col justify-end items-center cursor-pointer"
              >
                <img src={starImg} className="h-10" alt="user" />
                <span>Rate & Review</span>
              </div>
            ) : (
              ""
            )}
            {booking &&
            new Date(booking.checkOutDate).getTime() < Date.now() ? (
              <div
                onClick={showReport}
                className="show-chat  mx-10 mb-6 mt-4 text-Marine_blue hover:text-green-600 flex flex-col justify-end items-center cursor-pointer"
              >
                <img src={reportImg} className="h-10" alt="user" />
                <span>Report Hotel</span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <CancelBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCancellation}
      />
    </div>
  )
}

export default BookingDetails
