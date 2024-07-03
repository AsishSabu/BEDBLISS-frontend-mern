import React, { useState } from "react"
import showToast from "../../utils/toast"
import { USER_API } from "../../constants"
import axios from "axios"
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  hotelId: any
  bookingId: any
  userId: any
}

const ReportModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  hotelId,
  bookingId,
  userId,
}) => {
  const [selectedReason, setSelectedReason] = useState<string>("")

  const reasons = [
    "Incorrect booking details",
    "Poor hotel service",
    "Unclean room",
    "Safety concerns",
    "Overbooking",
    "Fraudulent activity",
    "Incorrect billing",
    "Other",
  ]

  const handleSubmit = () => {
    if (selectedReason) {
      const result = axios.post(
        USER_API + "/addReporting/" + userId,
        {
          hotelId,
          bookingId,
          reason: selectedReason,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then(({ data }) => {
        showToast(data.message)
      })
      .catch(({ response }) => {
        showToast(response?.data?.message, "error")
      })

      onClose()
    } else {
      showToast("Please select a reason.", "error")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-4">
        <h2 className="text-xl font-semibold mb-4">Report an Issue</h2>
        <ul>
          {reasons.map((reason, index) => (
            <li key={index} className="mb-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="reportReason"
                  value={reason}
                  onChange={e => setSelectedReason(e.target.value)}
                  className="mr-2"
                />
                {reason}
              </label>
            </li>
          ))}
        </ul>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReportModal
