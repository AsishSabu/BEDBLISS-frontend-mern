import { Response } from "express"
import { ChangeEvent, useState } from "react"
import uploadImagesToCloudinary from "../../api/imageUpload"
import { OWNER_API, emailRegex } from "../../constants"
import axios from "axios"
import showToast from "../../utils/toast"

const predefinedAmenities = [
  "Swimming Pool",
  "Gym",
  "Spa",
  "Restaurant",
  "Parking",
]

const useHotel = () => {
  // const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null)
  const [placeError, setPlaceError] = useState<string | null>(null)
  const [descriptionError, setDescriptionError] = useState<string | null>(null)
  // const [propertyRulesError, setPropertyRulesError] = useState<string | null>(
  //   null
  // );
  const [aboutPropertyError, setAboutPropertyError] = useState<string | null>(
    null
  )
  // const [roomError, setRoomError] = useState<string | null>(null);
  // const [amenitiesError, setAmenitiesError] = useState<string | null>(null);
  // const [imageError, setImageError] = useState<string | null>(null);
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
    { name: "Single", enabled: false },
    { name: "Double", enabled: false },
    { name: "Duplex", enabled: false },
  ])
  // const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [selectedDescription, setSelectedDescription] = useState("");

  const handleDescriptionChange = (e) => {
    setSelectedDescription(e.target.value);
    setFormData({ ...formData, description: e.target.value }); // Update form data
  };


  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    index: number | null = null,
    fieldName: string
  ) => {
    let errorMessage = ""

    const { name, value } = e.target
    if (fieldName === "image") {
      const fileInput = e.target as HTMLInputElement
      const file = fileInput.files && fileInput.files[0]

      if (file) {
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
    } else if (fieldName === "email") {
      if (!emailRegex.test(value)) {
        errorMessage = "please enter a valid email address"
      }
      setEmailError(errorMessage)
      setFormData({ ...formData, [name]: value })
    } else if (fieldName === "place") {
      if (value.length < 5) {
        errorMessage = "please enter at least 5 characters"
      }
      setPlaceError(errorMessage)
      setFormData({ ...formData, [name]: value })
    } else if (fieldName === "description") {
      console.log(value);
      setFormData({ ...formData, [name]: value })
    } else if (fieldName === "aboutProperty") {
      if (value.length < 15) {
        errorMessage = "please enter at least 15 characters"
      }
      setAboutPropertyError(errorMessage)
      setFormData({ ...formData, [name]: value })
    } else if (fieldName === "propertyRules") {
      const updatedRules = [...formData.propertyRules]
      if (index !== null) {
        updatedRules[index] = value
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
        updatedRooms[Number(index)] = {
          ...updatedRooms[Number(index)],
          [property]: value,
        }
        return { ...prevFormData, rooms: updatedRooms }
      })
    } else {
      setFormData({ ...formData, [name]: value })
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
    if (fieldName === "propertyRules") {
      setFormData({
        ...formData,
        propertyRules: [...formData.propertyRules, ""],
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const url=(await uploadImagesToCloudinary(formData.imageFile)).toString()
    console.log(formData)
    axios
      .post(
        OWNER_API + "/addHotel",
        {
          name: formData.name,
          email: formData.email,
          place: formData.place,
          description: formData.description,
          propertyRules: formData.propertyRules,
          aboutProperty: formData.aboutProperty,
          rooms: formData.rooms,
          amenities: formData.amenities,
          image:url
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          }
        }
      )



      .then(({ data }) => {
        showToast(data.message);
      })
      .catch(({ response }) => {
        showToast(response?.data?.message, "error");
      });
  }

  return {
    formData,
    handleChange,
    handleAddMore,
    handleSubmit,
    handleRoomEnabledChange,
    handleDescriptionChange,
    // nameError,
    emailError,
    placeError,
    descriptionError,
    // propertyRulesError,
    aboutPropertyError,
    handleAddAmenity,
    predefinedAmenities,
    imagePreview,
    roomTypes,
    selectedDescription
  }
}

export default useHotel