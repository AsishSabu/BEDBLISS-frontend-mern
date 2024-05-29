import { Response } from "express"
import { ChangeEvent, useState } from "react"
import uploadImagesToCloudinary from "../../api/imageUpload"
import { OWNER_API, emailRegex } from "../../constants"
import axios from "axios"
import showToast from "../../utils/toast"
import { ErrorMessage } from "formik"
import { useNavigate } from "react-router-dom"


//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     let errorMessage = ""

//     // Perform validation before proceeding with submission
//     if (formData.name === "") {
//       setError(prev => ({ ...prev, nameError: "Name is required" }))
//       errorMessage = "Form contains errors"
//     }
//     if (formData.email === "") {
//       setError(prev => ({ ...prev, emailError: "Email is required" }))
//       errorMessage = "Form contains errors"
//     } else if (!emailRegex.test(formData.email)) {
//       setError(prev => ({
//         ...prev,
//         emailError: "Please enter a valid email address",
//       }))
//       errorMessage = "Form contains errors"
//     }
//     if (formData.place === "") {
//       setError(prev => ({ ...prev, placeError: "Place is required" }))
//       errorMessage = "Form contains errors"
//     }
//     if (formData.description === "") {
//       setError(prev => ({
//         ...prev,
//         descriptionError: "Description is required",
//       }))
//       errorMessage = "Form contains errors"
//     }
//     if (formData.aboutProperty === "") {
//       setError(prev => ({
//         ...prev,
//         aboutPropertyError: "About property is required",
//       }))
//       errorMessage = "Form contains errors"
//     }
//     if (formData.propertyRules.some(rule => rule === "")) {
//       setError(prev => ({
//         ...prev,
//         propertyRulesError: "All property rules must be filled",
//       }))
//       errorMessage = "Form contains errors"
//     }
//     if (formData.amenities.length < 2) {
//       setError(prev => ({
//         ...prev,
//         ammenityError: "atleast 2 amenities must be added",
//       }))
//       errorMessage = "Form contains errors"
//     }

//     if (!formData.rooms.length) {

//       setError(prev => ({
//         ...prev,
//         roomError: "atleast on room must be added",
//       }))
//       errorMessage = "Form contains errors"
//     }

//     if (formData.rooms.some(room => room.price === "" || room.number === "")) {
//       setError(prev => ({
//         ...prev,
//         roomPriceError: "All room prices must be filled",
//         roomCountError: "All room counts must be filled",
//       }))
//       errorMessage = "Form contains errors"
//     }
//     if (formData.imageFile.length === 0) {
//       setError(prev => ({
//         ...prev,
//         imageError: "At least one image is required",
//       }))
//       errorMessage = "Form contains errors"
//     }
//     if (errorMessage) {
//       setError(prev => ({ ...prev, formError: errorMessage }))
//       return
//     }

//     // Clear any previous form errors
//     setError({
//       nameError: "",
//       emailError: "",
//       placeError: "",
//       descriptionError: "",
//       propertyRulesError: "",
//       aboutPropertyError: "",
//       ammenityError: "",
//       roomError: "",
//       roomPriceError: "",
//       roomCountError: "",
//       imageError: "",
//       formError: "",
//     })

//     try {
//       const imageUrls = await uploadImagesToCloudinary(formData.imageFile)

//       const response = await axios.post(`${OWNER_API}/addhotel`, {
//         name: formData.name,
//         email: formData.email,
//         place: formData.place,
//         description: formData.description,
//         propertyRules: formData.propertyRules,
//         aboutProperty: formData.aboutProperty,
//         rooms: formData.rooms,
//         amenities: formData.amenities,
//         imageUrls,
//       },
//       {
//         headers: {
//           authorization: `Bearer ${localStorage.getItem("access_token")}`,
//         }
//       })  .then(({ data }) => {
//         console.log(data,"data");
//         showToast(data.message);
//         navigate("/owner/hotels")
//         setFormData({
//           name: "",
//           email: "",
//           place: "",
//           description: "",
//           propertyRules: [""],
//           aboutProperty: "",
//           rooms: [],
//           amenities: [],
//           imageFile: [],
//         })
//         setImagePreview(null)
//         setRoomTypes([
//           { name: "single", enabled: false },
//           { name: "double", enabled: false },
//           { name: "duplex", enabled: false },
//         ])
//       })
//       .catch(({ response }) => {
//         console.log(response,"error");
        
//         showToast(response?.data?.message, "error");
//       });

   
//     } catch (error) {
//       console.error("Error creating hotel:", error)
//       showToast("Error in hotel creating", "error")
//     }
//   }

//   return {
//     formData,
//     handleChange,
//     handleAddMore,
//     handleSubmit,
//     handleRoomEnabledChange,
//     handleDescriptionChange,
//     error,
//     handleAddAmenity,
//     predefinedAmenities,
//     imagePreview,
//     roomTypes,
//     selectedDescription,
//   }
// }

// export default useHotel
