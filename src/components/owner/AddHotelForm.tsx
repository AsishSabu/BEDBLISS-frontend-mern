import { FC, useState, useCallback } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { hotelAddValidation } from "../../utils/validation"
import { useDropzone } from "react-dropzone"
import DragAndDrop from "../../assets/images/dragAndDrop.svg"
import uploadImagesToCloudinary from "../../api/imageUpload"
import { OWNER_API } from "../../constants"
import axios from "axios"
import { HotelInterface } from "../../types/hotelInterface"
import showToast from "../../utils/toast"
import { useNavigate } from "react-router-dom"

const AddHotelForm: FC = () => {
  const amenitiesList = ["Swimming Pool", "Gym", "Spa", "Restaurant", "Parking"]
  const reservationTypes = ["instant", "approveDecline"]
  const StayTypes = ["House", "Flat/Appartment", "Hotel", "HouseBoat", "Villa"]
  const [images, setImages] = useState<(string | ArrayBuffer | null)[]>([])
  const [propertyRules, setPropertyRules] = useState<string[]>([])
  const [newRule, setNewRule] = useState("")
  const navigate=useNavigate();

  const addPropertyRule = () => {
    if (newRule.trim() !== "") {
      setPropertyRules([...propertyRules, newRule])
      setNewRule("")
    }
  }

  const removePropertyRule = (index: number) => {
    setPropertyRules(propertyRules.filter((_, i) => i !== index))
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages: (string | ArrayBuffer | null)[] = []
    acceptedFiles.slice(0, 5).forEach((file: File) => {
      const reader = new FileReader()

      reader.onabort = () => console.log("file reading was aborted")
      reader.onerror = () => console.log("file reading has failed")
      reader.onload = () => {
        const binaryStr = reader.result
        if (binaryStr) {
          newImages.push(binaryStr)
          setImages(prevImages => [...prevImages, ...newImages].slice(0, 5))
        }
      }

      reader.readAsDataURL(file)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  })
  const handleSubmit = async (values: HotelInterface) => {
    const imageUrls = await uploadImagesToCloudinary(images)
    console.log(imageUrls)
    console.log(values)

    const response = await axios
      .post(
        `${OWNER_API}/addhotel`,
        {
          name: values.name,
          destination: values.place,
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
          imageUrls,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then(({ data }) => {
        console.log(data, "data")
        showToast(data.message)
        navigate("/owner/hotels")
      })
      .catch(({ response }) => {
        console.log(response, "error")

        showToast(response?.data?.message, "error")
      })
  }

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          stayType: "",
          place: "",
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
          propertyrules: [],
          description: "",
          amenities: [],
          images: [],
          reservationType: "",
        }}
        validationSchema={hotelAddValidation}
        validate={values => {
          const errors: any = {}

          // Validate propertyrules
          if (propertyRules.length < 2) {
            errors.propertyrules = "At least two rules are required"
          }

          // Validate images
          if (images.length < 3) {
            errors.images = "At least 3 images are required"
          } else if (images.length > 5) {
            errors.images = "No more than 5 images are allowed"
          }

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
                      Place:
                    </label>
                    <Field
                      type="text"
                      name="place"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      placeholder="Enter the location"
                    />
                    <span className="text-Strawberry_red text-sm">
                      <ErrorMessage name="place" />
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
                      <div>
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
                      </div>
                      <span className="text-Strawberry_red text-sm">
                        <ErrorMessage name="propertyrules" />
                      </span>
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
                    <div className="col-span-2">
                      <label className="text-gray-700 text-lg font-bold mb-2">
                        Images
                      </label>
                      {images.length > 0 ? (
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <div className="flex text-sm text-gray-600">
                              <img
                                src={images[0] as string}
                                alt="Main Uploaded"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div
                            className="space-y-1 text-center"
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            {isDragActive ? (
                              <div className="flex text-sm text-gray-600">
                                <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                  <span>Drag 'n' drop some files here</span>
                                </label>
                              </div>
                            ) : (
                              <div className="flex text-sm text-gray-600">
                                <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                  <span>Click to select files</span>
                                </label>
                              </div>
                            )}
                            <p className="text-xs text-indigo-600">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="mt-4 grid grid-cols-2 gap-4">
                        {images.slice(1).map((image, index) => (
                          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div key={index} className="space-y-1 text-center">
                              <div className="flex text-sm text-gray-600">
                                <img
                                  src={image as string}
                                  alt={`Additional Image ${index + 1}`}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <span className="text-Strawberry_red text-sm">
                      <ErrorMessage name="images" />
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
