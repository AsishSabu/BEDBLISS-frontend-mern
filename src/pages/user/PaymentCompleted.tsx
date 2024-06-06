import React from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { USER_API } from "../../constants"
import axios from "axios"
import PaymentMessage from "../../components/user/PaymentMessage"

const PaymentCompleted = () => {
  const [searchParams] = useSearchParams()
  const { id } = useParams()
  const status = searchParams.get("success")
  const isSuccess = status === "true" ? true : false
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
      .then(({ data }) => console.log(data))
      .catch(err => console.log(err))
  }

  return (
    <div>
      <PaymentMessage isSuccess={isSuccess} />
    </div>
  )
}

export default PaymentCompleted
