import React, { useState } from "react";
interface CancelBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}


const CancelBookingModal:React.FC<CancelBookingModalProps>= ({ isOpen, onClose, onConfirm }) => {
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const handleConfirm = () => {
    const finalReason = reason === "None of the above" ? customReason : reason;
    onConfirm(finalReason);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 flex justify-center">Cancel your booking</h2>

        <h3 className="text-lg font-semibold mb-2">Tell us your reason for cancelling</h3>
        <p className="mb-4">This is needed to complete your cancellation</p>
        <div className="mb-4 space-y-2">
          {["Change of dates or destination", "Personal reasons/trip was called off", "I found an alternative accommodation option", "Property asked to cancel", "Change in the number or needs of travellers", "Unable to travel due to restrictions related to Coronavirus (COVID-19)", "Made bookings for the same dates, want to cancel the ones I don't need", "None of the above"].map((option, index) => (
            <div key={index} className="flex items-center">
              <input
                type="radio"
                id={`reason-${index}`}
                name="cancellationReason"
                value={option}
                onChange={(e) => setReason(e.target.value)}
                className="mr-2"
              />
              <label htmlFor={`reason-${index}`} className="text-sm">{option}</label>
            </div>
          ))}
        </div>
        {reason === "None of the above" && (
          <div className="mb-4">
            <label htmlFor="customReason" className="text-sm block mb-2">Please specify your reason:</label>
            <input
              type="text"
              id="customReason"
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        )}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            No, I don't want to cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingModal;
