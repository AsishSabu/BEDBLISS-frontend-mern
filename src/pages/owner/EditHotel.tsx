import { FC, useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { hotelAddValidation } from "../../utils/validation"
import { FaTrashAlt } from "react-icons/fa"
import axios from "axios"
import { hotelInterface} from "../../types/hotelInterface"
import showToast from "../../utils/toast"
import { useNavigate, useParams } from "react-router-dom"
import PhotoUploadModal from "../../components/owner/photoUploadModal"
import { OWNER_API } from "../../constants"
import { useFetchData } from "../../utils/fetcher"
import UploadButton from "../../components/UploadButton"
import OutlinedButton from "../../components/OutlinedButton"

const EditHotelForm: FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data } = useFetchData<any>(`${OWNER_API}/hotelDetails/${id}`)

  const navigate = useNavigate()
  const [hotelData, setHotelData] = useState<hotelInterface | null>(null)

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
  const StayTypes = ["Flat/Appartment", "Hotel", "Villa"]
  const [images, setImages] = useState<(string | null)[]>([])
  const [hotelDocument, setHotelDocument] = useState<(string | null)[]>([])
  const [ownerId, setOwnerId] = useState<(string | null)[]>([])
  const [propertyRules, setPropertyRules] = useState<string[]>([])
  const [newRule, setNewRule] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isHotelModalOpen, setIsHotelModalOpen] = useState(false)
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false)

  useEffect(() => {
    if (data) {
      const hotel = data.Hotel
      setHotelData(hotel)
      setImages(hotel.imageUrls || [])
      setHotelDocument([hotel.hotelDocument])
      setOwnerId([hotel.ownerPhoto])
      setPropertyRules(hotel.propertyRules || [])
    }
  }, [data])

  const addPropertyRule = () => {
    if (newRule.trim() !== "") {
      setPropertyRules([...propertyRules, newRule])
      setNewRule("")
    }
  }

  const removePropertyRule = (index: number) => {
    setPropertyRules(propertyRules.filter((_, i) => i !== index))
  }

  const handleUpload = (imageUrls: (string | null)[]) => {
    setImages(imageUrls)
    setIsModalOpen(false)
  }

  const handleHotelDocumentUpload = (imageUrls: (string | null)[]) => {
    setHotelDocument(imageUrls)
    setIsHotelModalOpen(false)
  }

  const handleOwnerIdUpload = (imageUrls: (string | null)[]) => {
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

  const handleSubmit = async (values:any) => {
    try {
      const response = await axios.patch(
        `${OWNER_API}/editHotel/${id}`,
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
          amenities: values.amenities,
          reservationType: values.reservationType,
          propertyRules,
          imageUrls: images,
          hotelDocument: hotelDocument[0],
          ownerPhoto: ownerId[0],
          isVerified: "pending",
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      showToast(response.data.message)
      navigate("/owner/hotels")
    } catch (error) {
      console.error("Error updating hotel:", error)
      showToast("Failed to update hotel details", "error")
    }
  }

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          name: hotelData?.name || "",
          stayType: hotelData?.stayType || "",
          destination: hotelData?.destination || "",
          address: {
            streetAddress: hotelData?.address.streetAddress || "",
            landMark: hotelData?.address.landMark || "",
            district: hotelData?.address.district || "",
            city: hotelData?.address.city || "",
            pincode: hotelData?.address.pincode || "",
            country: hotelData?.address.country || "",
          },
          description: hotelData?.description || "",
          amenities: hotelData?.amenities || [],
          reservationType: hotelData?.reservationType || "",
          _id: hotelData?._id || "",
          ownerId: hotelData?.ownerId || "",
          propertyRules: hotelData?.propertyRules || [],
          isBlocked: hotelData?.isBlocked || false,
          isVerified: hotelData?.isVerified || "pending",
        }}
        validationSchema={hotelAddValidation}
        validate={() => {
          const errors: any = {}
          if (propertyRules.length < 2) {
            errors.propertyRules = "At least two rules are required"
          }

          // Validate images
          if (images.length < 3) {
            errors.images = "At least 3 images are required"
          } else if (images.length > 5) {
            errors.images = "No more than 5 images are allowed"
          }

          if (hotelDocument.length < 1) {
            errors.hotelDocument = "Hotel documentation is required"
          }
          if (ownerId.length < 1) {
            errors.ownerId = "Owner ID is required"
          }

          return errors
        }}
        onSubmit={handleSubmit}
      >
        {({ values, dirty }) => (
          <div className="px-4 py-7 md:px-14 flex justify-center">
            <div className="px-4 py-7 md:px-14 rounded-3xl shadow-lg border border-spacing-y-9  w-8/12   items-center ">
              <h1 className="p-6 text-2xl md:text-3xl font-bold mb-4 text-center">
                Edit Hotel
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
                    <span className="text-red-500 text-sm">
                      <ErrorMessage name="name" />
                    </span>
                  </div>

                  <div>
                    <label className="text-gray-700 text-lg font-bold mb-2">
                      Destination:
                    </label>
                    <Field
                      type="text"
                      name="destination"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      placeholder="Enter the location"
                    />
                    <span className="text-red-500 text-sm">
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
                    <span className="text-red-500 text-sm">
                      <ErrorMessage name="stayType" />
                    </span>
                  </div>

                  <div className="col-span-2 bg-blue-gray-50 py-5 rounded-lg">
                    <p className="px-5 text-xl">Address</p>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 px-10">
                      <div>
                        <label className="text-gray-700 text-lg font-bold mb-2">
                          Street Address:
                        </label>
                        <Field
                          type="text"
                          name="address.streetAddress"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          placeholder="Street Address"
                        />
                        <span className="text-red-500 text-sm">
                          <ErrorMessage name="address.streetAddress" />
                        </span>
                      </div>

                      <div>
                        <label className="text-gray-700 text-lg font-bold mb-2">
                          Landmark:
                        </label>
                        <Field
                          type="text"
                          name="address.landMark"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          placeholder="Landmark"
                        />
                        <span className="text-red-500 text-sm">
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
                          placeholder="District"
                        />
                        <span className="text-red-500 text-sm">
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
                          placeholder="City"
                        />
                        <span className="text-red-500 text-sm">
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
                          placeholder="Pincode"
                        />
                        <span className="text-red-500 text-sm">
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
                          placeholder="Country"
                        />
                        <span className="text-red-500 text-sm">
                          <ErrorMessage name="address.country" />
                        </span>
                      </div>
                    </div>
                  </div>

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
                            className="form-checkbox h-5 w-5 text-blue-600"
                          />
                          <span className="ml-2">{amenity}</span>
                        </label>
                      ))}
                    </div>
                    <span className="text-red-500 text-sm">
                      <ErrorMessage name="amenities" />
                    </span>
                  </div>

                  <div className="col-span-2">
                    <label className="text-gray-700 text-lg font-bold mb-2">
                      Property Rules:
                    </label>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {propertyRules.map((rule, index) => (
                        <div key={index} className="flex items-center">
                          <p className="text-gray-700">{rule}</p>
                          <button
                            title="button"
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
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      />

                      <div className="px-2 pt-2">
                        {" "}
                        <OutlinedButton
                          onClick={addPropertyRule}
                          color={"black"}
                          text={"Add"}
                        />
                      </div>
                    </div>
                    <span className="text-red-500 text-sm">
                      <ErrorMessage name="propertyRules" />
                    </span>
                  </div>

                  <div className="col-span-2">
                    <div className="flex items-center">
                      {/* <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                      >
                        Upload Photos
                      </button> */}
                      <UploadButton
                        text={"Upload Photos"}
                        onclick={() => setIsModalOpen(true)}
                      />
                      <p className="ml-4 text-gray-700">
                        {images.length}{" "}
                        {images.length === 1 ? "image" : "images"} uploaded
                      </p>
                    </div>
                    <div className="flex items-center mt-2">
                      {images.map((image, index) => (
                        <div key={index} className="relative mr-2">
                          <img
                            src={image || "/hotel.jpg"}
                            alt="hotel"
                            className="w-32 h-20 object-cover rounded-md"
                          />
                          <button
                            title="button"
                            type="button"
                            onClick={() => handleRemoveImage(image || "")}
                            className="absolute top-1 right-1 bg-white rounded-full p-1 hover:bg-gray-200"
                          >
                            <FaTrashAlt className="text-red-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <span className="text-red-500 text-sm">
                      <ErrorMessage name="images" />
                    </span>
                  </div>

                  <div className="col-span-2">
                    <div className="flex items-center">
                      <UploadButton
                        text={"Upload hotel document"}
                        onclick={() => setIsHotelModalOpen(true)}
                      />
                      {hotelDocument.length > 0 && (
                        <button
                          type="button"
                          onClick={handleRemoveHotelDocument}
                          className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="flex items-center mt-2">
                      {hotelDocument.map((doc, index) => (
                        <div key={index} className="relative mr-2">
                          <img
                            src={doc || "/hotel.jpg"}
                            alt="hotel document"
                            className="w-32 h-20 object-cover rounded-md"
                          />
                        </div>
                      ))}
                    </div>
                    <span className="text-red-500 text-sm">
                      <ErrorMessage name="hotelDocument" />
                    </span>
                  </div>

                  <div className="col-span-2">
                    <div className="flex items-center">
                      <UploadButton
                        text={"Upload owner ID"}
                        onclick={() => setIsOwnerModalOpen(true)}
                      />
                      {ownerId.length > 0 && (
                        <button
                          type="button"
                          onClick={handleRemoveOwner}
                          className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="flex items-center mt-2">
                      {ownerId.map((owner, index) => (
                        <div key={index} className="relative mr-2">
                          <img
                            src={owner || "/hotel.jpg"}
                            alt="owner ID"
                            className="w-32 h-20 object-cover rounded-md"
                          />
                        </div>
                      ))}
                    </div>
                    <span className="text-red-500 text-sm">
                      <ErrorMessage name="ownerId" />
                    </span>
                  </div>

                  <div className="col-span-2 mt-6">
                    <button
                      type="submit"
                      className={`w-full px-6 py-3 rounded-md text-white font-semibold focus:outline-none ${
                        dirty
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                      disabled={!dirty}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>

      {isModalOpen && (
        <PhotoUploadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpload={handleUpload}
          file="5"
        />
      )}

      {isHotelModalOpen && (
        <PhotoUploadModal
          isOpen={isHotelModalOpen}
          onClose={() => setIsHotelModalOpen(false)}
          onUpload={handleHotelDocumentUpload}
          file="1"
        />
      )}

      {isOwnerModalOpen && (
        <PhotoUploadModal
          isOpen={isOwnerModalOpen}
          onClose={() => setIsOwnerModalOpen(false)}
          onUpload={handleOwnerIdUpload}
          file="1"
        />
      )}
    </>
  )
}

export default EditHotelForm
