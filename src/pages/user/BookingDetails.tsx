import useSWR from "swr";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { USER_API } from "../../constants";
import { fetcher } from "../../utils/fetcher";
import { BookingInterface, BookingResponse } from "../../types/hotelInterface";
import axios from "axios";
import showToast from "../../utils/toast";

const BookingDetails = () => {
  const [booking, setBooking] = useState<BookingInterface | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, error } = useSWR<BookingResponse>(
    `${USER_API}/bookingDetails/${id}`,
    fetcher
  );

  useEffect(() => {
    console.log(data,'data.......');
    
    if (data) {
      setBooking(data.bookings);
    }
  }, [data]);

  if (error) {
    console.error("Error fetching booking:", error);
    return <div>Error fetching booking details.</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleCancellation = async () => {
    if (!booking) return;

    try {
      const response = await axios.patch(
        `${USER_API}/booking/cancel/${booking.bookingId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      setBooking((prevBooking) => ({
        ...prevBooking!,
        bookingStatus: response.data.booking.bookingStatus ?? prevBooking?.bookingStatus,
      }));
      showToast("Booking cancelled successfully", "success");
    } catch (error) {
      console.error("Error cancelling booking:", error);
      showToast("Oops! Something went wrong", "error");
    }
  };

  return (
    <div className="w-screen h-fit overflow-hidden ml-64">
      <div className="bg-varWhite min-h-screen p-4">
        <div className="mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl text-center font-semibold mb-4">Booking Details</h1>
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

                  <div className="flex justify-between">
                    <div>
                      <p className="text-xl font-bold text-gray-600 mb-1">
                        Check-in-Date
                      </p>
                      <p className="text-sm text-gray-600">{booking.checkInDate}</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-600 mb-1">
                        Check-out-Date
                      </p>
                      <p className="text-sm text-gray-600">{booking.checkOutDate}</p>
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
            <button
              onClick={handleCancellation}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Cancel
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
