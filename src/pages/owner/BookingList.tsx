import useSWR from 'swr';
import React, { useEffect, useState } from "react";
import { OWNER_API, USER_API } from "../../constants";
import { useNavigate } from "react-router-dom";
import { fetcher } from '../../utils/fetcher';
import { BookingInterface } from "../../types/hotelInterface";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const { data, error } = useSWR(OWNER_API + "/bookings", fetcher);

  useEffect(() => {
    if (data) {
      console.log(data, "bookings");
      setBookings(data.bookings);
    }
  }, [data]);

  if (error) {
    console.error("Error fetching booking:", error);
    return <div>Error fetching booking details.</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" flex justify-center">
      <div className="bg-white shadow-md rounded-lg min-h-screen p-6 px-4 py-7 w-2/3 md:px-10 ">
        <h1 className="text-2xl font-semibold mb-6">Bookings</h1>
        <div className="overflow-x-auto">
          {bookings.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hotel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((data: BookingInterface, index) => (
                  <tr key={index}>
                    <td className="py-4 whitespace-nowrap flex items-center">
                      <img
                        src={data.hotelId.imageUrls[0]} // assuming the first image is to be displayed
                        alt={data.hotelId.name}
                        className="w-16 h-16 rounded-md mr-4"
                      />
                      <div>
                        <div className="font-medium text-gray-900">
                          {data.hotelId.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {data.hotelId.destination}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          data.bookingStatus === "booked"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {data.bookingStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{data.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap"></td>
                    <td className="py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => navigate(`/owner/bookingDetails/${data._id}`)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-4">No bookings yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingList;
