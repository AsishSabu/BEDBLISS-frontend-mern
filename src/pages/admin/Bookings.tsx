import React, { useEffect, useState } from "react"
import { Table } from "flowbite-react"
import axios from "axios"
import useSWR from "swr"
import { ADMIN_API } from "../../constants"
import BookingData from "../../components/admin/BookingData"
import { BookingInterface } from "../../types/hotelInterface"

const fetcher = (url:string )=> axios.get(url).then(res => res.data)

const Bookings: React.FC = () => {
  const { data} = useSWR(`${ADMIN_API}/bookings`, fetcher)
  const [bookings, setBookings] = useState<any>(null)

  useEffect(() => {
    if (data) {
      setBookings(data.result)
    }
  }, [data])

  console.log(bookings, "..................")

  return (
    <div className="overflow-x-auto">
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
          {bookings&&bookings?.map((booking: BookingInterface) => (
            <BookingData key={booking.bookingId} {...booking} />
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default Bookings
