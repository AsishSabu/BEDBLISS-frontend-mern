import React, { useEffect } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { USER_API } from "../../constants"
import axios from "axios"
import PaymentMessage from "../../components/user/PaymentMessage"
import { useSocket } from "../../redux/contexts/SocketContext"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/reducer/reducer"
import { useFetchData } from "../../utils/fetcher"
import { BookingResponse } from "../../types/hotelInterface"

const PaymentCompleted = () => {
  const [searchParams] = useSearchParams()
  const user = useSelector((state: RootState) => state.userSlice)
  const { id } = useParams()
  const socket = useSocket()
  const status = searchParams.get("success")
  const isSuccess = status === "true"

  useEffect(() => {
    if (status) {
      const paymentStatus = isSuccess ? "Paid" : "Failed"
      axios
        .patch(
          USER_API + `/payment/status/${id}`,
          { paymentStatus },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        )
        .then(({ data }) => {
          console.log(data, "?////////////////////////////////////////")
        })
        .catch(err => console.log(err))
    }
  }, [status, id, isSuccess])

  const { data, isError } = useFetchData<BookingResponse>(
    `${USER_API}/bookingDetailsByBookingId/${id}`
  )

  useEffect(() => {
    console.log(data, "/////////////////////////")
    if (socket) {
      socket.emit("noti", {
        bookingId: data?.bookings.hotelId.ownerId._id,
        userId: user.id,
        status:data?.bookings.bookingStatus
      })
    }

    return () => {
      if (socket) {
        socket.off("noti")
      }
    }
  }, [data, socket, id, user.id])

  return (
    <div>
      <PaymentMessage isSuccess={isSuccess} />
    </div>
  )
}

export default PaymentCompleted
