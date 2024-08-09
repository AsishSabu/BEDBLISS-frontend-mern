import React, { useState } from "react"
import { Table } from "flowbite-react"
import axios from "axios"
import useSWR from "swr"
import { ADMIN_API } from "../../constants"
import BookingData from "../../components/admin/BookingData"
import { BookingInterface } from "../../types/hotelInterface"
import Pagination from "../../components/Pagination"

const fetcher = (url: string) => axios.get(url).then(res => res.data)

const Bookings: React.FC = () => {
  const { data, error } = useSWR(`${ADMIN_API}/bookings`, fetcher)
  
  const [currentPage, setCurrentPage] = useState<number>(1)
  const dataPerPage = 5
  
  // Ensure that data is defined and data.result is an array
  const bookings = data?.result || []

  // Pagination calculations
  const lastPostIndex = currentPage * dataPerPage
  const firstPostIndex = lastPostIndex - dataPerPage
  const currentData = bookings.slice(firstPostIndex, lastPostIndex)

  if (error) return <div>Error loading bookings.</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className="overflow-x-auto h-screen">
      <div className="h-96">
      <Table>
        <Table.Head>
          <Table.HeadCell>Booking Id</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Hotel</Table.HeadCell>
          <Table.HeadCell>Check-In</Table.HeadCell>
          <Table.HeadCell>Check-Out</Table.HeadCell>
          <Table.HeadCell>Booking status</Table.HeadCell>
          <Table.HeadCell>Payment status</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {currentData.map((booking: BookingInterface) => (
            <BookingData key={booking.bookingId} {...booking} />
          ))}
        </Table.Body>
      </Table>
      </div>
     
      <div className="mt-4 flex justify-center">
        {bookings.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalData={bookings.length}
            dataPerPage={dataPerPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  )
}

export default Bookings
