import React from "react"
import { Table } from "flowbite-react"
import { BookingInterface } from "../../types/hotelInterface"

const BookingData: React.FC<BookingInterface> = ({
  bookingId,
  userId,
  hotelId,
  bookingStatus,
  price,
  checkInDate,
  checkOutDate,
  paymentMethod,
}) => {
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {bookingId}
      </Table.Cell>
      <Table.Cell>{userId?.name}</Table.Cell>
      <Table.Cell>{hotelId?.name}</Table.Cell>
      <Table.Cell>
        {new Date(checkInDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </Table.Cell>
      <Table.Cell>
        {new Date(checkOutDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </Table.Cell>
      <Table.Cell>{bookingStatus}</Table.Cell>
      <Table.Cell>{paymentMethod}</Table.Cell>
      <Table.Cell>{price}</Table.Cell>
    </Table.Row>
  )
}

export default BookingData
