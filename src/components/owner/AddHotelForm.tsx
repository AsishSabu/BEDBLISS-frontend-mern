import { FC, useState, useCallback } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { hotelAddValidation } from "../../utils/validation"
import { useDropzone } from "react-dropzone"
import { FaTrashAlt } from "react-icons/fa"
import axios from "axios"
import { HotelInterface } from "../../types/hotelInterface"
import showToast from "../../utils/toast"
import { useNavigate } from "react-router-dom"
import PhotoUploadModal from "./photoUploadModal"
import { OWNER_API } from "../../constants"

const AddHotelForm: FC = () => {
  const amenitiesList = [
    "Swimming Pool",
    "Gym",
    "Spa",
    "Restaurant",
    "Parking",
    "Free parking on premises",
    "Kitchen",
    "Washing Machine",
    "Air Conditioning",
    "BBQ grill",
    "Hot tub",
    "Beach Access",
  ]
  const reservationTypes = ["instant", "approveDecline"]
  const StayTypes = ["House", "Flat/Appartment", "Hotel", "HouseBoat", "Villa"]
  const [images, setImages] = useState<(string | ArrayBuffer | null)[]>([])
  const [hotelDocument, setHotelDocument] = useState<
    (string | ArrayBuffer | null)[]
  >([])
  const [ownerId, setOwnerId] = useState<(string | ArrayBuffer | null)[]>([])
  const [propertyRules, setPropertyRules] = useState<string[]>([])
  const [newRule, setNewRule] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isHotelModalOpen, setIsHotelModalOpen] = useState(false)
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false)
  const navigate = useNavigate()

  const addPropertyRule = () => {
    if (newRule.trim() !== "") {
      setPropertyRules([...propertyRules, newRule])
      setNewRule("")
    }
  }

  const removePropertyRule = (index: number) => {
    setPropertyRules(propertyRules.filter((_, i) => i !== index))
  }

  const handleUpload = imageUrls => {
    console.log("hiiiii")
    console.log(imageUrls)

    setImages(imageUrls)
    setIsModalOpen(false)
  }

  const handleHotelDocumentUpload = imageUrls => {
    console.log("hlooooo")
    console.log(imageUrls)

    setHotelDocument(imageUrls)
    setIsHotelModalOpen(false)
  }
  const handleOwnerIdUpload = imageUrls => {
    console.log("/////////")
    console.log(imageUrls)

    setOwnerId(imageUrls)
    setIsOwnerModalOpen(false)
  }
  const handleRemoveImage = (image: string) => {
    setImages(prevImages => prevImages.filter(img => img !== image))
  }
  const handleRemoveHotelDocument = () => {
    setHotelDocument([])
  }
  const handleRemoveOwner = () => {
    setOwnerId([])
  }
  const handleSubmit = async (values: HotelInterface) => {
    console.log("hlooooo")

    const response = await axios
      .post(
        `${OWNER_API}/addhotel`,
        {
          name: values.name,
          destination: values.destination,
          address: {
            streetAddress: values.address.streetAddress,
            landMark: values.address.landMark,
            district: values.address.district,
            city: values.address.city,
            pincode: values.address.pincode,
            country: values.address.country,
          },
          stayType: values.stayType,
          description: values.description,
          room: values.room,
          bed: values.bed,
          bathroom: values.bathroom,
          guests: values.guests,
          price: values.price,
          amenities: values.amenities,
          reservationType: values.reservationType,
          propertyRules,
          imageUrls: images,
          hotelDocument: hotelDocument[0],
          ownerPhoto: ownerId[0],
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then(({ data }) => {
        showToast(data.message)
        navigate("/owner/hotels")
      })
      .catch(({ response }) => {
        showToast(response?.data?.message, "error")
      })
  }
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          stayType: "",
          destination: "",
          address: {
            streetAddress: "",
            landMark: "",
            district: "",
            city: "",
            pincode: "",
            country: "",
          },
          room: 0,
          bed: 0,
          bathroom: 0,
          guests: 0,
          price: "",
          description: "",
          amenities: [],
          reservationType: "",
        }}
        validationSchema={hotelAddValidation}
        validate={values => {
          console.log(values)
          console.log(propertyRules)
          console.log(images, "images")
          console.log(hotelDocument, "hotel")
          console.log(ownerId, "owner")

          const errors: any = {}

          // Validate propertyrules
          if (propertyRules.length < 2) {
            console.log("hiaiii")

            errors.propertyRules = "At least two rules are required"
          }

          // Validate images
          if (images.length < 3) {
            errors.images = "At least 3 images are required"
          } else if (images.length > 5) {
            errors.images = "No more than 5 images are allowed"
          }

          if (hotelDocument.length < 1) {
            errors.hotelDocument = "hotel documetation is required"
          }
          if (ownerId.length < 1) {
            errors.ownerId = "ownerId is required"
          }
          console.log(errors)

          return errors
        }}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <div className="px-4 py-7 md:px-14 flex justify-center">
            <div className="px-4 py-7 md:px-14 rounded-3xl shadow-lg border border-spacing-y-9  w-8/12   items-center ">
              <h1 className="p-6 text-2xl md:text-3xl font-bold mb-4 text-center">
                Add Hotel
              </h1>
              <Form>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  <div>
                    <label className="text-gray-700 text-lg font-bold mb-2">
                      Name:
                    </label>
                    <Field
                      type="text"
                      name="name"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      placeholder="Name"
                    />
                    <span className="text-Strawberry_red text-sm">
                      <ErrorMessage name="name" />
                    </span>
                  </div>

                  <div>
                    <label className="text-gray-700 text-lg font-bold mb-2">
                      destination:
                    </label>
                    <Field
                      type="text"
                      name="destination"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      placeholder="Enter the location"
                    />
                    <span className="text-Strawberry_red text-sm">
                      <ErrorMessage name="destination" />
                    </span>
                  </div>

                  <div>
                    <label className="text-gray-700 text-lg font-bold mb-2">
                      Type:
                    </label>
                    <Field
                      as="select"
                      name="stayType"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    >
                      <option value="" label="Select stay type" />
                      {StayTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </Field>
                    <span className="text-Strawberry_red text-sm">
                      <ErrorMessage name="stayType" />
                    </span>
                  </div>

                  <div className="col-span-2 bg-blue-gray-50 py-5 rounded-lg">
                    <p className="px-5  text-xl">Address</p>
                    <div className=" grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 px-10">
                      <div>
                        <label className="text-gray-700 text-lg font-bold mb-2">
                          Street Address:
                        </label>
                        <Field
                          type="text"
                          name="address.streetAddress"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          placeholder="Enter the street address"
                        />
                        <span className="text-Strawberry_red text-sm">
                          <ErrorMessage name="address.streetAddress" />
                        </span>
                      </div>
                      <div>
                        <label className="text-gray-700 text-lg font-bold mb-2">
                          Land Mark:
                        </label>
                        <Field
                          type="text"
                          name="address.landMark"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          placeholder="Enter the location"
                        />
                        <span className="text-Strawberry_red text-sm">
                          <ErrorMessage name="address.landMark" />
                        </span>
                      </div>
                      <div>
                        <label className="text-gray-700 text-lg font-bold mb-2">
                          District:
                        </label>
                        <Field
                          type="text"
                          name="address.district"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          placeholder="Enter the location"
                        />
                        <span className="text-Strawberry_red text-sm">
                          <ErrorMessage name="address.district" />
                        </span>
                      </div>
                      <div>
                        <label className="text-gray-700 text-lg font-bold mb-2">
                          City:
                        </label>
                        <Field
                          type="text"
                          name="address.city"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          placeholder="Enter the location"
                        />
                        <span className="text-Strawberry_red text-sm">
                          <ErrorMessage name="address.city" />
                        </span>
                      </div>
                      <div>
                        <label className="text-gray-700 text-lg font-bold mb-2">
                          Pincode:
                        </label>
                        <Field
                          type="text"
                          name="address.pincode"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          placeholder="Enter the location"
                        />
                        <span className="text-Strawberry_red text-sm">
                          <ErrorMessage name="address.pincode" />
                        </span>
                      </div>
                      <div>
                        <label className="text-gray-700 text-lg font-bold mb-2">
                          Country:
                        </label>
                        <Field
                          type="text"
                          name="address.country"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          placeholder="Enter the location"
                        />
                        <span className="text-Strawberry_red text-sm">
                          <ErrorMessage name="address.country" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 px-5">
                    <div>
                      <label className="text-gray-700 text-lg font-bold mb-2">
                        Room:
                      </label>
                      <div className="relative flex items-center max-w-[8rem]">
                        <button
                          title="button"
                          type="button"
                          data-input-counter-decrement="quantity-input"
                          onClick={() =>
                            setFieldValue("room", Math.max(0, values.room - 1))
                          }
                          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                        >
                          <svg
                            className="w-3 h-3 text-gray-900 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <span
                          data-input-counter
                          aria-describedby="helper-text-explanation"
                          className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          {values.room}
                        </span>
                        <button
                          title="button"
                          type="button"
                          onClick={() => setFieldValue("room", values.room + 1)}
                          data-input-counter-increment="quantity-input"
                          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                        >
                          <svg
                            className="w-3 h-3 text-gray-900 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                      <span className="text-Strawberry_red text-sm">
                        <ErrorMessage name="room" />
                      </span>
                    </div>
                    <div>
                      <label className="text-gray-700 text-lg font-bold mb-2">
                        Bed:
                      </label>
                      <div className="relative flex items-center max-w-[8rem]">
                        <button
                          type="button"
                          data-input-counter-decrement="quantity-input"
                          onClick={() =>
                            setFieldValue("bed", Math.max(0, values.bed - 1))
                          }
                          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                        >
                          <svg
                            className="w-3 h-3 text-gray-900 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <span
                          data-input-counter
                          aria-describedby="helper-text-explanation"
                          className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          {values.bed}
                        </span>
                        <button
                          title="button"
                          type="button"
                          onClick={() => setFieldValue("bed", values.bed + 1)}
                          data-input-counter-increment="quantity-input"
                          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                        >
                          <svg
                            className="w-3 h-3 text-gray-900 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                      <span className="text-Strawberry_red text-sm">
                        <ErrorMessage name="bed" />
                      </span>
                    </div>
                    <div>
                      <label className="text-gray-700 text-lg font-bold mb-2">
                        Bathroom:
                      </label>
                      <div className="relative flex items-center max-w-[8rem]">
                        <button
                          type="button"
                          data-input-counter-decrement="quantity-input"
                          onClick={() =>
                            setFieldValue(
                              "bathroom",
                              Math.max(0, values.bathroom - 1)
                            )
                          }
                          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                        >
                          <svg
                            className="w-3 h-3 text-gray-900 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <span
                          data-input-counter
                          aria-describedby="helper-text-explanation"
                          className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          {values.bathroom}
                        </span>
                        <button
                          title="button"
                          type="button"
                          onClick={() =>
                            setFieldValue("bathroom", values.bathroom + 1)
                          }
                          data-input-counter-increment="quantity-input"
                          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                        >
                          <svg
                            className="w-3 h-3 text-gray-900 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                      <span className="text-Strawberry_red text-sm">
                        <ErrorMessage name="bathroom" />
                      </span>
                    </div>
                    <div>
                      <label className="text-gray-700 text-lg font-bold mb-2">
                        Guests:
                      </label>
                      <div className="relative flex items-center max-w-[8rem]">
                        <button
                          type="button"
                          data-input-counter-decrement="quantity-input"
                          onClick={() =>
                            setFieldValue(
                              "guests",
                              Math.max(0, values.guests - 1)
                            )
                          }
                          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                        >
                          <svg
                            className="w-3 h-3 text-gray-900 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <span
                          data-input-counter
                          aria-describedby="helper-text-explanation"
                          className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          {values.guests}
                        </span>
                        <button
                          title="button"
                          type="button"
                          onClick={() =>
                            setFieldValue("guests", values.guests + 1)
                          }
                          data-input-counter-increment="quantity-input"
                          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                        >
                          <svg
                            className="w-3 h-3 text-gray-900 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                      <span className="text-Strawberry_red text-sm">
                        <ErrorMessage name="guests" />
                      </span>
                    </div>
                    <div className="col-span-2 ">
                      <div>
                        <label
                          htmlFor="amenities"
                          className="text-gray-700 text-lg font-bold mb-2 "
                        >
                          Amenities :
                        </label>
                        {amenitiesList.map((amenity, index) => (
                          <label
                            key={index}
                            className="inline-flex items-center"
                          >
                            <Field
                              type="checkbox"
                              className="form-checkbox h-5 w-5 text-blue-600"
                              name="amenities"
                              value={amenity}
                              onChange={e => {
                                if (e.target.checked) {
                                  setFieldValue("amenities", [
                                    ...values.amenities,
                                    amenity,
                                  ])
                                } else {
                                  setFieldValue(
                                    "amenities",
                                    values.amenities.filter(
                                      item => item !== amenity
                                    )
                                  )
                                }
                              }}
                            />
                            <span className="mr-5 ml-2 text-gray-700">
                              {amenity}
                            </span>
                          </label>
                        ))}
                      </div>
                      <span className="text-Strawberry_red text-sm">
                        <ErrorMessage name="amenities" />
                      </span>
                    </div>
                    <div>
                      <label className="text-gray-700 text-lg font-bold mb-2">
                        Price:
                      </label>
                      <Field
                        type="text"
                        name="price"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        placeholder="Enter the price"
                      />
                      <span className="text-Strawberry_red text-sm">
                        <ErrorMessage name="price" />
                      </span>
                    </div>
                    <div>
                      <label className="text-gray-700 text-lg font-bold mb-2">
                        Description:
                      </label>
                      <Field
                        type="text"
                        name="description"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        placeholder="Enter the price"
                      />
                      <span className="text-Strawberry_red text-sm">
                        <ErrorMessage name="description" />
                      </span>
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="propertyrules"
                        className="text-gray-700 text-lg font-bold mb-2"
                      >
                        Property Rules
                      </label>
                      <div className="flex items-center">
                        <Field
                          type="text"
                          className=""
                          value={newRule}
                          onChange={e => setNewRule(e.target.value)}
                        />
                        <button
                          type="button"
                          className="bg-gray-200 px-2 ml-2"
                          onClick={addPropertyRule}
                        >
                          Add Rule
                        </button>
                      </div>
                      <ul>
                        {propertyRules.map((rule, index) => (
                          <li key={index} className="flex items-center">
                            <span className="block w-3/4 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                              {rule}
                            </span>
                            <button
                              type="button"
                              className="bg-gray-200 px-2 ml-2"
                              onClick={() => removePropertyRule(index)}
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                      {/* Use ErrorMessage component with the correct name prop */}
                      <ErrorMessage
                        name="propertyRules"
                        component="span"
                        className="text-Strawberry_red text-sm"
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="reservationType "
                        className="text-gray-700 text-lg font-bold mb-2"
                      >
                        Reservation Type
                      </label>
                      <div className="py-3">
                        {reservationTypes.map((type, index) => (
                          <label
                            key={index}
                            className="flex gap-2 items-center p-2"
                          >
                            <Field
                              type="radio"
                              className="form-radio h-5 w-5 text-purple-600"
                              name="reservationType"
                              value={type}
                            />
                            <span className="ml-2 text-gray-700">{type}</span>
                          </label>
                        ))}
                      </div>
                      <span className="text-Strawberry_red text-sm">
                        <ErrorMessage name="reservationType" />
                      </span>
                    </div>
                    <div className="flex flex-col mt-4 col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Hotel Images
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer">
                        <button
                          type="button"
                          className="bg-blue-500 text-white px-4 py-2 rounded-md"
                          onClick={() => setIsModalOpen(true)}
                        >
                          Add Photos
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image}
                              alt="Hotel"
                              className="h-40 w-full object-cover rounded-md"
                            />
                            <button
                              className="absolute top-2 right-2 bg-white p-1 rounded-full text-red-500"
                              onClick={() => handleRemoveImage(image)}
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        ))}
                      </div>
                      <PhotoUploadModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onUpload={handleUpload}
                        file={"5"}
                      />
                    </div>
                    <span className="text-Strawberry_red text-sm">
                      <ErrorMessage name="images" />
                    </span>
                    <div className="flex flex-col mt-4 col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Add Hotel Document
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer">
                        <button
                          type="button"
                          className="bg-blue-500 text-white px-4 py-2 rounded-md"
                          onClick={() => setIsHotelModalOpen(true)}
                        >
                          Add Photos
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {hotelDocument.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image}
                              alt="Hotel"
                              className="h-40 w-full object-cover rounded-md"
                            />
                            <button
                              title="btn"
                              className="absolute top-2 right-2 bg-white p-1 rounded-full text-red-500"
                              onClick={() => handleRemoveHotelDocument()}
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        ))}
                      </div>
                      <PhotoUploadModal
                        isOpen={isHotelModalOpen}
                        onClose={() => setIsHotelModalOpen(false)}
                        onUpload={handleHotelDocumentUpload}
                        file={"1"}
                      />
                    </div>
                    <span className="text-Strawberry_red text-sm">
                      <ErrorMessage name="hotelDocument" />
                    </span>
                    <div className="flex flex-col mt-4 col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Add owner Id
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer">
                        <button
                          type="button"
                          className="bg-blue-500 text-white px-4 py-2 rounded-md"
                          onClick={() => setIsOwnerModalOpen(true)}
                        >
                          Add Photos
                        </button>
                      </div>
                      <ErrorMessage
                        name="images"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {ownerId.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image}
                              alt="Hotel"
                              className="h-40 w-full object-cover rounded-md"
                            />
                            <button
                              className="absolute top-2 right-2 bg-white p-1 rounded-full text-red-500"
                              onClick={() => handleRemoveOwner()}
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        ))}
                      </div>
                      <PhotoUploadModal
                        isOpen={isOwnerModalOpen}
                        onClose={() => setIsOwnerModalOpen(false)}
                        onUpload={handleOwnerIdUpload}
                        file={"1"}
                      />
                    </div>
                    <span className="text-red-500 text-sm mt-1">
                      <ErrorMessage name="ownerId" />
                    </span>
                  </div>
                  <div className="flex justify-center col-span-2 p-4">
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </>
  )
}

export default AddHotelForm
