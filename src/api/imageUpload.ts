import axios from "axios"
import { CLOUDINARY_UPLOAD_API, cloudinaryUploadPreset } from "../constants"
import showToast from "../utils/toast"

const uploadImagesToCloudinary = async (
  imagesFile: File[]
): Promise<string[]> => {
  try {
    console.log(imagesFile, "/////////////////////////////")
    const promises = imagesFile.map(async file => {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", cloudinaryUploadPreset)

      const response = await axios.post(CLOUDINARY_UPLOAD_API, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        // Ensure withCredentials is not set
        withCredentials: false,
      })

      if (!response.data.secure_url) {
        throw new Error("Failed to upload image to Cloudinary")
      }

      return response.data.secure_url
    })

    const uploadImageUrls = await Promise.all(promises)
    return uploadImageUrls
  } catch (error) {
    showToast("Error uploading images to Cloudinary", "error")
    throw error // Rethrow the error to be caught by the caller
  }
}

export default uploadImagesToCloudinary
