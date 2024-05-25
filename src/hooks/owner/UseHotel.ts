import { Response } from "express"
import { ChangeEvent, useState } from "react"
import uploadImagesToCloudinary from "../../api/imageUpload"
import { OWNER_API, emailRegex } from "../../constants"
import axios from "axios"
import showToast from "../../utils/toast"
import { ErrorMessage } from "formik"
import { useNavigate } from "react-router-dom"

const predefinedAmenities = [
  "Swimming Pool",
  "Gym",
  "Spa",
  "Restaurant",
  "Parking",
]

const useHotel = () => {
  const navigate=useNavigate()
  const [error, setError] = useState({
    nameError: "",
    emailError: "",
    placeError: "",
    descriptionError: "",
    propertyRulesError: "",
    aboutPropertyError: "",
    ammenityError: "",
    roomError: "",
    roomPriceError: "",
    roomCountError: "",
    imageError: "",
    formError: "",
  })

  const [formData, setFormData] = useState<{
    name: string
    email: string
    place: string
    description: string
    propertyRules: string[]
    aboutProperty: string
    rooms: { type: string; price: string; number: string }[]
    amenities: string[]
    imageFile: File[]
  }>({
    name: "",
    email: "",
    place: "",
    description: "",
    propertyRules: [""],
    aboutProperty: "",
    rooms: [],
    amenities: [],
    imageFile: [],
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [roomTypes, setRoomTypes] = useState([
    { name: "single", enabled: false },
    { name: "double", enabled: false },
    { name: "duplex", enabled: false },
  ])

  const [selectedDescription, setSelectedDescription] = useState("")

  const handleDescriptionChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDescription(e.target.value)
    setFormData({ ...formData, description: e.target.value }) // Update form data
  }
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    index: number | null = null,
    fieldName: string
  ) => {
    let errorMessage = ""

    const { name, value } = e.target
    const data = value
    if (fieldName === "image") {
      const fileInput = e.target as HTMLInputElement
      const file = fileInput.files && fileInput.files[0]

      if (file) {
        const validImageTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ]
        if (!validImageTypes.includes(file.type)) {
          errorMessage =
            "Please select a valid image file (jpeg, png, gif, webp)"
          setError({ ...error, imageError: errorMessage })
          return
        } else {
          setError({ ...error, imageError: "" })
        }
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreview(reader.result as string)
        }
        reader.readAsDataURL(file)
        setFormData(prev => ({
          ...prev,
          imageFile: [file],
        }))
      }
    } else if (fieldName === "name") {
      if (!data.length) {
        errorMessage = "Name is required"
        setError({ ...error, nameError: errorMessage })
      } else if (data.length < 3) {
        errorMessage = "Please enter at least 3 characters"
        setError({ ...error, nameError: errorMessage })
      } else {
        setError({ ...error, nameError: "" })
      }
      setFormData({ ...formData, [name]: data })
    } else if (fieldName === "email") {
      if (!data.length) {
        errorMessage = "Email is required"
        setError({ ...error, emailError: errorMessage })
      } else if (!emailRegex.test(data)) {
        errorMessage = "Please enter a valid email address"
        setError({ ...error, emailError: errorMessage })
      } else {
        setError({ ...error, emailError: "" })
      }
      setFormData({ ...formData, [name]: data })
    } else if (fieldName === "place") {
      if (!data.length) {
        errorMessage = "Place is required"
        setError({ ...error, placeError: errorMessage })
      } else if (data.length < 5) {
        errorMessage = "Please enter at least 5 characters"
        setError({ ...error, placeError: errorMessage })
      } else {
        setError({ ...error, placeError: "" })
      }
      setFormData({ ...formData, [name]: data })
    } else if (fieldName === "description") {
      if (!data.length) {
        errorMessage = "Description is required"
        setError({ ...error, descriptionError: errorMessage })
      } else {
        setError({ ...error, descriptionError: "" })
      }
      setFormData({ ...formData, [name]: data })
    } else if (fieldName === "aboutProperty") {
      if (!data.length) {
        errorMessage = "About property is required"
        setError({ ...error, aboutPropertyError: errorMessage })
      } else if (data.length < 15) {
        errorMessage = "Please enter at least 15 characters"
        setError({ ...error, aboutPropertyError: errorMessage })
      } else {
        setError({ ...error, aboutPropertyError: "" })
      }
      setFormData({ ...formData, [name]: data })
    } else if (fieldName === "propertyRules") {
      if (!data.length) {
        errorMessage = "Property rules are required"
        setError({ ...error, propertyRulesError: errorMessage })
      } else if (data.length < 5) {
        errorMessage = "Please enter at least 5 characters"
        setError({ ...error, propertyRulesError: errorMessage })
      } else {
        setError({ ...error, propertyRulesError: "" })
      }

      const updatedRules = [...formData.propertyRules]
      if (index !== null) {
        updatedRules[index] = data
      }
      setFormData({ ...formData, propertyRules: updatedRules })
    } else if (fieldName.includes("rooms")) {
      const [field, property] = fieldName.split("_")
      setFormData(prevFormData => {
        const updatedRooms = [...prevFormData.rooms]
        if (!updatedRooms[Number(index)]) {
          updatedRooms[Number(index)] = {
            type: roomTypes[Number(index)].name,
            price: "",
            number: "",
          }
        }
        if (property === "price" || property === "number") {
          if (data === "" || (!isNaN(Number(data)) && Number(data) >= 0)) {
            updatedRooms[Number(index)] = {
              ...updatedRooms[Number(index)],
              [property]: data,
            }
            setError({ ...error, roomPriceError: "", roomCountError: "" })
          } else {
            errorMessage = `Invalid ${property}`
            setError({
              ...error,
              [property === "price" ? "roomPriceError" : "roomCountError"]:
                errorMessage,
            })
          }
        } else {
          updatedRooms[Number(index)] = {
            ...updatedRooms[Number(index)],
            [property]: data,
          }
        }

        return { ...prevFormData, rooms: updatedRooms }
      })
    }
  }

  const handleRoomEnabledChange = (roomType: string) => {
    setRoomTypes(prevRoomTypes =>
      prevRoomTypes.map(rt =>
        rt.name === roomType ? { ...rt, enabled: !rt.enabled } : rt
      )
    )
    setFormData(prevFormData => {
      const updatedRooms = prevFormData.rooms.filter(
        room => room.type !== roomType
      )
      if (!roomTypes.find(rt => rt.name === roomType).enabled) {
        updatedRooms.push({ type: roomType, price: "", number: "" })
      }
      return { ...prevFormData, rooms: updatedRooms }
    })
  }

  const handleAddAmenity = (selectedAmenity: string) => {
    if (formData.amenities.includes(selectedAmenity)) {
      const updatedAmenities = formData.amenities.filter(
        amenity => amenity !== selectedAmenity
      )
      setFormData({ ...formData, amenities: updatedAmenities })
    } else {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, selectedAmenity],
      })
    }
  }

  const handleAddMore = (fieldName: string) => {
    let errorMessage = ""
    if (fieldName === "propertyRules") {
      if (formData.propertyRules[formData.propertyRules.length - 1]) {
        setError({ ...error, propertyRulesError: "" })
        setFormData({
          ...formData,
          propertyRules: [...formData.propertyRules, ""],
        })
      } else {
        errorMessage = "Please fill the added rule"
        setError({ ...error, propertyRulesError: errorMessage })
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let errorMessage = ""

    // Perform validation before proceeding with submission
    if (formData.name === "") {
      setError(prev => ({ ...prev, nameError: "Name is required" }))
      errorMessage = "Form contains errors"
    }
    if (formData.email === "") {
      setError(prev => ({ ...prev, emailError: "Email is required" }))
      errorMessage = "Form contains errors"
    } else if (!emailRegex.test(formData.email)) {
      setError(prev => ({
        ...prev,
        emailError: "Please enter a valid email address",
      }))
      errorMessage = "Form contains errors"
    }
    if (formData.place === "") {
      setError(prev => ({ ...prev, placeError: "Place is required" }))
      errorMessage = "Form contains errors"
    }
    if (formData.description === "") {
      setError(prev => ({
        ...prev,
        descriptionError: "Description is required",
      }))
      errorMessage = "Form contains errors"
    }
    if (formData.aboutProperty === "") {
      setError(prev => ({
        ...prev,
        aboutPropertyError: "About property is required",
      }))
      errorMessage = "Form contains errors"
    }
    if (formData.propertyRules.some(rule => rule === "")) {
      setError(prev => ({
        ...prev,
        propertyRulesError: "All property rules must be filled",
      }))
      errorMessage = "Form contains errors"
    }
    if (formData.amenities.length < 2) {
      setError(prev => ({
        ...prev,
        ammenityError: "atleast 2 amenities must be added",
      }))
      errorMessage = "Form contains errors"
    }

    if (!formData.rooms.length) {

      setError(prev => ({
        ...prev,
        roomError: "atleast on room must be added",
      }))
      errorMessage = "Form contains errors"
    }

    if (formData.rooms.some(room => room.price === "" || room.number === "")) {
      setError(prev => ({
        ...prev,
        roomPriceError: "All room prices must be filled",
        roomCountError: "All room counts must be filled",
      }))
      errorMessage = "Form contains errors"
    }
    if (formData.imageFile.length === 0) {
      setError(prev => ({
        ...prev,
        imageError: "At least one image is required",
      }))
      errorMessage = "Form contains errors"
    }
    if (errorMessage) {
      setError(prev => ({ ...prev, formError: errorMessage }))
      return
    }

    // Clear any previous form errors
    setError({
      nameError: "",
      emailError: "",
      placeError: "",
      descriptionError: "",
      propertyRulesError: "",
      aboutPropertyError: "",
      ammenityError: "",
      roomError: "",
      roomPriceError: "",
      roomCountError: "",
      imageError: "",
      formError: "",
    })

    try {
      const imageUrls = await uploadImagesToCloudinary(formData.imageFile)

      const response = await axios.post(`${OWNER_API}/addhotel`, {
        name: formData.name,
        email: formData.email,
        place: formData.place,
        description: formData.description,
        propertyRules: formData.propertyRules,
        aboutProperty: formData.aboutProperty,
        rooms: formData.rooms,
        amenities: formData.amenities,
        imageUrls,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        }
      })  .then(({ data }) => {
        console.log(data,"data");
        showToast(data.message);
        navigate("/owner/hotels")
        setFormData({
          name: "",
          email: "",
          place: "",
          description: "",
          propertyRules: [""],
          aboutProperty: "",
          rooms: [],
          amenities: [],
          imageFile: [],
        })
        setImagePreview(null)
        setRoomTypes([
          { name: "single", enabled: false },
          { name: "double", enabled: false },
          { name: "duplex", enabled: false },
        ])
      })
      .catch(({ response }) => {
        console.log(response,"error");
        
        showToast(response?.data?.message, "error");
      });

   
    } catch (error) {
      console.error("Error creating hotel:", error)
      showToast("Error in hotel creating", "error")
    }
  }

  return {
    formData,
    handleChange,
    handleAddMore,
    handleSubmit,
    handleRoomEnabledChange,
    handleDescriptionChange,
    error,
    handleAddAmenity,
    predefinedAmenities,
    imagePreview,
    roomTypes,
    selectedDescription,
  }
}

export default useHotel
