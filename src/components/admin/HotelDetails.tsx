import React, { useState } from "react"
import useHotelDetails from "../../hooks/admin/useHotelDetails"
import { useParams } from "react-router-dom"
import { GoVerified } from "react-icons/go"
import RejectHotalModal from "./RejectionModal"
import axios from "axios"
import { rejectedImg } from "../../assets/images"

const ImageModal = ({ isOpen, onClose, imageSrc, altText }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
      <div className="bg-transparent rounded-lg overflow-hidden shadow-xl max-w-2xl w-full max-h-fit p-10">
        <div className="flex justify-end p-2">
          <button
            onClick={onClose}
            className="text-red-500 text-2xl font-bold hover:text-gray-700"
          >
            X
          </button>
        </div>
        <div className="items-center max-h-fit overflow-auto p-4">
          <img
            src={imageSrc}
            alt={altText}
            className="object-contain max-h-fit aspect-square"
          />
        </div>
      </div>
    </div>
  )
}

const HotelDetails = () => {
  const { id } = useParams<{ id: string }>()
  const { hotel, verifyHotel,RejectHotel } = useHotelDetails(id)
  console.log(hotel)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [modalImageSrc, setModalImageSrc] = useState("")
  const [modalAltText, setModalAltText] = useState("")

  const handleShowPreviewClick = (imageSrc, altText) => {
    setModalImageSrc(imageSrc)
    setModalAltText(altText)
    setIsModalOpen(true)
  }

  const handleReject=async(reason:string)=>{
    RejectHotel(reason)
  }

  return (
    <div className="max-w-6xl mx-auto my-5 bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-2 p-5 gap-4">
      <h1 className="col-span-2 flex justify-center font-bold text-4xl text-varBlue mb-6">
        Hotel Details
      </h1>
      <div>
        <div className="mb-4 grid grid-flow-col  align-middle">
          <h2 className="text-xl font-semibold text-gray-800">Hotel Name :</h2>
          <p className="text-base text-gray-600">{hotel?.name}</p>
        </div>
        <div className="mb-4 grid grid-flow-col  align-middle">
          <h2 className="text-xl font-semibold text-gray-800">Destination :</h2>
          <p className="text-base text-gray-600">{hotel?.destination}</p>
        </div>
        {/* <div className="mb-4 grid grid-flow-col  align-middle">
            <h2 className="text-xl font-semibold text-gray-800">
             Stay Type :
            </h2>
            <p className="text-base text-gray-600">{hotel?.stayType}</p>
          </div> */}
        <div className="mb-4 grid grid-flow-col  align-middle">
          <h2 className="text-xl font-semibold text-gray-800">Description :</h2>
          <p className="text-base text-gray-600">{hotel?.description}</p>
        </div>
        <div className="mb-4 grid grid-flow-col  align-middle">
          <h2 className="text-xl font-semibold text-gray-800">Address :</h2>
          <div>
            <p className="text-base text-gray-600">
              {hotel?.address.streetAddress}
            </p>
            <p className="text-base text-gray-600">{hotel?.address.landMark}</p>
            <p className="text-base text-gray-600">
              {hotel?.address.city}, {hotel?.address.district}
            </p>
            <p className="text-base text-gray-600">
              {hotel?.address.country} - {hotel?.address.pincode}
            </p>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Amenities</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {hotel?.amenities.map((amenity, index) => (
              <li key={index} className="text-base text-gray-600">
                {amenity}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Property Rules
          </h3>
          <ul className="list-disc pl-5">
            {hotel?.propertyRules.map((rule, index) => (
              <li key={index} className="text-base text-gray-600">
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="col-span-1 grid grid-cols-2 gap-4">
        {hotel?.imageUrls.map((image, index) => (
          <div key={index} className="relative w-fit h-40">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={image} // replace with the actual image URL
              alt={`Hotel ${index + 1}`}
            />
            <button
              onClick={() =>
                handleShowPreviewClick(image, `Hotel ${index + 1}`)
              }
              className="absolute bottom-2 right-2 text-sm bg-blue-gray-200 text-black px-2 py-1 rounded-lg"
            >
              Show Preview
            </button>
          </div>
        ))}
      </div>
      <div className="mb-4 col-span-2 grid grid-cols-2">
        <div className="mb-4 grid grid-flow-col  align-middle">
          <h2 className="text-xl font-semibold text-gray-800">Owner Name :</h2>
          <p className="text-base text-gray-600">{hotel?.ownerId?.name}</p>
        </div>
        <div className="mb-4 grid grid-flow-col  align-middle">
          <h2 className="text-xl font-semibold text-gray-800">email:</h2>
          <p className="text-base text-gray-600">{hotel?.ownerId?.email}</p>
        </div>
      </div>
      <div className="mb-4 col-span-2">
        <h3 className="text-xl font-semibold text-gray-800 py-2">
          Room Details
        </h3>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left py-3 px-4">Room</th>
              <th className="text-left py-3 px-4">Description</th>
              <th className="text-left py-3 px-4">max Adults</th>
              <th className="text-left py-3 px-4">max Children</th>
              <th className="text-left py-3 px-4">Price</th>
            </tr>
          </thead>
          <tbody>
            {hotel?.rooms.map(room => (
              <tr className="border-b">
                <td className="py-3 px-4">{room.title}</td>
                <td className="py-3 px-4">{room.desc}</td>
                <td className="py-3 px-4">{room.maxAdults}</td>
                <td className="py-3 px-4">{room.maxChildren}</td>
                <td className="py-3 px-4">{room.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h1 className="text-2xl col-span-2 p-3 font-bold">Hotel Documents</h1>
      <div className="col-span-2 grid grid-flow-col gap-4">
        <div className="relative w-fit h-40">
          <img
            className="w-full h-full object-cover rounded-lg"
            src={hotel?.hotelDocument} // replace with the actual image URL
            alt="Hotel Document"
          />
          <button
            onClick={() =>
              handleShowPreviewClick(hotel?.hotelDocument, "Hotel Document")
            }
            className="absolute bottom-2 right-2 text-sm bg-blue-gray-200 text-black px-2 py-1 rounded-lg"
          >
            Show Preview
          </button>
        </div>
      </div>
      <h1 className="text-2xl col-span-2 p-3 font-bold">Owner ID</h1>
      <div className="col-span-2 grid grid-flow-col gap-4">
        <div className="relative w-fit h-40">
          <img
            className="w-full h-full object-cover rounded-lg"
            src={hotel?.ownerPhoto} // replace with the actual image URL
            alt="Owner ID"
          />
          <button
            onClick={() =>
              handleShowPreviewClick(hotel?.ownerPhoto, "Owner ID")
            }
            className="absolute bottom-2 right-2 text-sm bg-blue-gray-200 text-black px-2 py-1 rounded-lg"
          >
            Show Preview
          </button>
        </div>
      </div>

      {hotel&&hotel.isVerified!=="pending"? (
       <>
       {hotel.isVerified === "verified" && (
         <div className="flex justify-center col-span-2">
           <GoVerified size={60} color="#15F5BA" />
           <span className="text-green-400 pt-3 px-2 text-3xl">Verified</span>
         </div>
       )}
       {hotel.isVerified === "rejected" && (
         <div className="flex justify-center col-span-2">
          <img src={rejectedImg} className="h-20" alt="" />
         </div>
       )}
     </>

      ) : (
        <div className="col-span-2 flex justify-between px-40 py-5">
          <button
            onClick={verifyHotel}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Verify
            </span>
          </button>
          <button onClick={() => setIsRejectModalOpen(true)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Reject
            </span>
          </button>
        </div>
      )}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc={modalImageSrc}
        altText={modalAltText}
      />
      <RejectHotalModal
      isOpen={isRejectModalOpen}
      onClose={()=>setIsRejectModalOpen(false)}
      onConfirm={handleReject}
      />
    </div>
  )
}

export default HotelDetails
