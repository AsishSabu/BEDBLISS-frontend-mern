import { CLOUDINARY_UPLOAD_API, cloudinaryUploadPreset } from "../constants";
import showToast from "../utils/toast";

const uploadImagesToCloudinary = async (imagesFile: File[]) => {
    try {
      console.log("Images to upload:", imagesFile.length);
      
      const promises = imagesFile.map(async (file: File): Promise<any[]> => {
        console.log("Uploading image:", file.name);
        
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", cloudinaryUploadPreset);
  
        const response = await fetch(CLOUDINARY_UPLOAD_API, {
          method: "post",
          body: formData,
        });
        console.log(response,"response");
        
        if (!response.ok) {
          throw new Error("failed to upload the image to cloudinary");
        }
        const data = await response.json();
        return data.secure_url;
      });
      const uploadImageUrls = await Promise.all(promises);
      console.log("Upload complete:", uploadImageUrls);
      
      return uploadImageUrls;
    } catch (error) {
      showToast("Error uploading images to cloudinary", "error");
      throw error; // Rethrow the error to be caught by the caller
    }
};

  
export default uploadImagesToCloudinary;
