import { FC, useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { hotelAddValidation } from "../../utils/validation"
import { Button } from "@material-tailwind/react"
import { FaTrashAlt } from "react-icons/fa"
import axios from "axios"
import { HotelInterface } from "../../types/hotelInterface"
import showToast from "../../utils/toast"
import { useNavigate } from "react-router-dom"
import PhotoUploadModal from "../../components/owner/photoUploadModal"
import { ADMIN_API, OWNER_API } from "../../constants"
import UploadButton from "../../components/UploadButton"
import AddLocation from "../../components/addLocation/AddLocation"
import { useAppSelector } from "../../redux/store/store"
import useSWR from "swr"
const fetcher = (url: string) => axios.get(url).then(res => res.data)

const AddHotelForm: FC = () => {
  const { data, error } = useSWR(`${ADMIN_API}/stayTypes`, fetcher)
  const { location } = useAppSelector(state => state.locationSlice)
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
  const [stayTypes,setStayTypes]=useState([])
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
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(()=>{
      if(data){
        setStayTypes(data.data)
      }
  },[data])

  console.log(stayTypes,"types");
  

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
    // setLoading(true)
    const hotelData = {
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
      amenities: values.amenities,
      coordinates: { latitude: location.lat, longitude: location.lng },
      propertyRules,
      imageUrls: images,
      hotelDocument: hotelDocument[0],
      ownerPhoto: ownerId[0],
    }
    console.log(hotelData, "valuesssss")

    const response = await axios
      .post(`${OWNER_API}/addhotel`, hotelData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then(({ data }) => {
        setLoading(false)
        showToast(data.message)
        navigate("/owner/hotels")
      })
      .catch(({ response }) => {
        setLoading(false)
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
            errors.propertyRules = "At least two rules are required"
          }
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
          if (!location.lng || !location.lat) {
            errors.location = "location is required"
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
                      {stayTypes.map((type, index) => (
                        <option key={index} value={type?._id}>
                          {type.name}
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

                  <div className="col-span-2">
                    <label className="text-gray-700 text-lg font-bold mb-2">
                      Amenities:
                    </label>
                    <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {amenitiesList.map((amenity, index) => (
                        <label
                          key={index}
                          className="flex items-center text-gray-700"
                        >
                          <Field
                            type="checkbox"
                            name="amenities"
                            value={amenity}
                            checked={values.amenities.includes(amenity)}
                            className="form-checkbox h-5 w-5 text-black"
                          />
                          <span className="ml-2">{amenity}</span>
                        </label>
                      ))}
                    </div>
                    <span className="text-red-500 text-sm">
                      <ErrorMessage name="amenities" />
                    </span>
                  </div>

                  <div className="col-span-2 grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 px-5">
                    <div className="col-span-2">
                      <label className="text-gray-700 text-lg font-bold mb-2">
                        Description:
                      </label>
                      <Field
                        as="textarea"
                        name="description"
                        rows={5}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        placeholder="Description"
                      />
                      <span className="text-red-500 text-sm">
                        <ErrorMessage name="description" />
                      </span>
                    </div>

                    <div className="col-span-2 ">
                      <label className="text-gray-700 text-lg font-bold">
                        Property Rules:
                      </label>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 py-3">
                        {propertyRules.map((rule, index) => (
                          <div key={index} className="flex items-center">
                            <p className="text-gray-700">{rule}</p>
                            <button
                              type="button"
                              onClick={() => removePropertyRule(index)}
                              className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center mt-2">
                        <input
                          type="text"
                          value={newRule}
                          onChange={e => setNewRule(e.target.value)}
                          placeholder="Add new rule"
                          className="block w-full px-4   text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />

                        <Button
                          onClick={addPropertyRule}
                          variant="outlined"
                          className="mx-2"
                        >
                          Add
                        </Button>
                      </div>
                      <span className="text-red-500 text-sm">
                        <ErrorMessage name="propertyRules" />
                      </span>
                    </div>

                    <div className="col-span-2">
                      {/* <label
                        htmlFor="reservationType "
                        className="text-gray-700 text-lg font-bold mb-2"
                      >
                        Reservation Type
                      </label> */}
                      <AddLocation />
                      {/* <div className="py-3">
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
                      </span> */}
                    </div>
                    <div className="flex flex-col mt-4 col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Hotel Images
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer">
                        <UploadButton
                          text={"Upload Photos"}
                          onclick={() => setIsModalOpen(true)}
                        />
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
                        <UploadButton
                          text={"Upload Hotel Document"}
                          onclick={() => setIsHotelModalOpen(true)}
                        />
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
                        <UploadButton
                          text={"Upload Owner Document"}
                          onclick={() => setIsOwnerModalOpen(true)}
                        />
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
                    <Button type="submit" variant="outlined" loading={loading}>
                      Submit
                    </Button>
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
