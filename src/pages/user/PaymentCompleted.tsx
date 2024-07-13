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
    let isMounted = true
    if (status && isMounted) {
      const paymentStatus = isSuccess ? "Paid" : "Failed"
      axios
        .patch(
          `${USER_API}/payment/status/${id}`,
          { paymentStatus },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        )
        .then(({ data }) => {
          console.log(data, "..................")

          if (isMounted) {
            const notification = {
              type: "1",
              message: `${data.result.hotelId.name} booked by ${user.name}`,
              data: {
                senderId: user.id,
                name: user.name,
                image: user.image,
                onClickPath: `/owner/bookingDetails/${data.result._id}`,
              },
            }

            const socketNotification = {
              type: "1",
              message: `${data.result.hotelId.name} booked by ${user.name}`,
              data: {
                senderId: user.id,
                name: user.name,
                image: user.image,
                onClickPath: `/owner/bookingDetails/${data.result._id}`,
              },
              createdAt: new Date(Date.now()),
            }

            socket?.emit(
              "noti",
              socketNotification,
              data.result.hotelId.ownerId._id
            )
            axios.patch(
              `${USER_API}/addNotification/${data.result.hotelId.ownerId._id}`,
              notification,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "access_token"
                  )}`,
                },
              }
            )
          }
        })
        .catch(err => console.log(err))
    }
    return () => {
      isMounted = false
    }
  }, [status, id, isSuccess, user.id])

  const { data, isError } = useFetchData<BookingResponse>(
    `${USER_API}/bookingDetailsByBookingId/${id}`
  )

  // useEffect(() => {
  //   if (socket && data) {
  //     socket.emit("noti", {
  //       bookingId: data?.bookings.hotelId.ownerId._id,
  //       userId: user.id,
  //       status: data?.bookings.bookingStatus,
  //     });

  //     return () => {
  //       if (socket) {
  //         socket.off("noti");
  //       }
  //     };
  //   }
  // }, [data, socket, user.id]);

  return (
    <div>
      <PaymentMessage isSuccess={isSuccess} />
    </div>
  )
}

export default PaymentCompleted
