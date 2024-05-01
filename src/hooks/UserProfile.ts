import { UserInterface } from "./../../../backend/src/types/userInterfaces";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { USER_API, emailRegex, nameRegex, phoneRegex } from "../constants";
import showToast from "../utils/toast";
import axiosJWT from "../utils/axiosService";
axios.defaults.withCredentials = true;

const useProfile = () => {
  const [profile, setProfile] = useState<UserInterface | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
  }>({
    name: "",
    email: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(USER_API + "/profile", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then(({ data }) => {
        const { user } = data;
        setProfile(user);
        setFormData((prev) => ({
          ...prev,
          name: user?.name || "",
          email: user?.email || "",
          phone: user?.phoneNumber || "",
        }));
      })
      .catch(() => showToast("Oops!something went wrong","error"));
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let errorMessage = "";
    if (name === "name") {
      if (!value.trim()) {
        errorMessage = "Name is required";
      } else if (!nameRegex.test(value)) {
        errorMessage =
          "First letter must be capital and no leading or trailing space";
      }
    } else if (name === "email") {
      if (!value.trim()) {
        errorMessage = "Email is required";
      } else if (!emailRegex.test(value)) {
        errorMessage = "Enter a valid email";
      }
    } else if (name === "phoneNumber") {
      if (!value.trim()) {
        errorMessage = "Phone number is required";
      } else if (!phoneRegex.test(value)) {
        errorMessage = "Phone number must have 10 numbers";
      }
    }
    setError(errorMessage);
  };

  const handleSubmit = async () => {
    if (!error) {
      setIsSubmitting(true);

      axiosJWT
        .patch(
          USER_API + "/profile/edit",
          {
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.phone,
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
          showToast(
            "Oops! Something went wrong while updating profile",
            "error"
          );
        });
    }
  };
  return {
    profile,
    formData,
    error,
    isSubmitting,
    handleInputChange,
    handleSubmit,
  };
};

export default useProfile;
