import React, { useEffect, useRef } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { USER_API } from "../../constants"
import axios from "axios"
import PaymentMessage from "../../components/user/PaymentMessage"
import { useSocket } from "../../redux/contexts/SocketContext"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/reducer/reducer"
import { useNotification } from "../../hooks/NotificationHook"

const PaymentCompleted:React.FC = () => {
  const [searchParams] = useSearchParams()
  const {sendNotification}=useNotification()
  const user = useSelector((state: RootState) => state.userSlice)
  const { id } = useParams()
  const socket = useSocket()
  const status = searchParams.get("success")
  const isSuccess = status === "true"

  const hasUpdatedPaymentStatus = useRef(false)

  useEffect(() => {
    const paymentStatusUpdated = localStorage.getItem(
      `paymentStatusUpdated_${id}`
    )

    if (status && !paymentStatusUpdated && !hasUpdatedPaymentStatus.current) {
      hasUpdatedPaymentStatus.current = true
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
          const message=`${data.result.hotelId.name} booked by ${user.name}`
          const path=`/owner/bookingDetails/${data.result._id}`
          const receiverId=data.result.hotelId.ownerId._id
         sendNotification(message,path,user,receiverId,1)
          localStorage.setItem(`paymentStatusUpdated_${id}`, "true")
        })
    }
  }, [status, id, isSuccess, user.id, user.name, user.image, socket])


  return (
    <div>
      <PaymentMessage isSuccess={isSuccess} />
    </div>
  )
}

export default PaymentCompleted
