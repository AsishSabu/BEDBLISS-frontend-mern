import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

const RejectHotalModal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    onConfirm(reason);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Cancel Booking</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Reason for cancellation</label>
          <select
          title="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="" disabled>Select a reason</option>
            <option value="hotel document is not valid">hotel document is not valid</option>
            <option value="owner id is not valid">owner id is not valid</option>
            <option value="both documents are not valid">both documents are not valid</option>
           
          </select>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
          >
            Close
          </button>
          <button
            onClick={handleConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Confirm Cancellation
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectHotalModal;
