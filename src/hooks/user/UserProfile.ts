
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import useSWR from "swr";
import { USER_API, nameRegex, phoneRegex } from "../../constants";
import showToast from "../../utils/toast";
import axiosJWT from "../../utils/axiosService";
import uploadImagesToCloudinary from "../../api/imageUpload";
import { useFetchData } from "../../utils/fetcher";
axios.defaults.withCredentials = true;


const useProfile = () => {
  const { data, isError:error } = useFetchData<any>(USER_API + "/profile");
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    email: string;
    imageFile: File[];
  }>({
    name: "",
    phone: "",
    email: "",
    imageFile: [],
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const profile = data ? data.user : null;

  if (error) {
    showToast("Oops! Something went wrong", "error");
  }

  // Set initial form data when profile is fetched
  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        name: profile?.name || "",
        email: profile?.email || "",
        phone: profile?.phoneNumber || "",
      }));
    }
  }, [profile]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "imageFile") {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files && fileInput.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        setFormData(prev => ({
          ...prev,
          imageFile: [file],
        }));
      }
    } else {
      let errorMessage = "";

      if (name === "name") {
        if (!value.trim()) {
          errorMessage = "Name is required";
        } else if (!nameRegex.test(value)) {
          errorMessage =
            "First letter must be capital and no leading or trailing space";
        }
        setNameError(errorMessage);
      } else if (name === "phone") {
        if (value.trim() && !phoneRegex.test(value)) {
          errorMessage = "Phone number must have 10 numbers";
        }
        setPhoneError(errorMessage);
      }

      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    if (!nameError && !phoneError) {
      setIsSubmitting(true);
      const url = (await uploadImagesToCloudinary(formData.imageFile)).toString();
      console.log(url, "url");

      axiosJWT
        .patch(
          USER_API + "/profile/edit",
          {
            name: formData.name,
            phoneNumber: formData.phone,
            profilePic: url || profile?.profilePic,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        )
        .then(({ data }) => {
          showToast(data.message);
          setIsSubmitting(false);
        })
        .catch(() => {
          setIsSubmitting(false);
          showToast("Oops! Something went wrong while updating profile", "error");
        });
    }
  };

  return {
    profile,
    formData,
    nameError,
    phoneError,
    imagePreview,
    isSubmitting,
    handleInputChange,
    handleSubmit,
  };
};

export default useProfile;
