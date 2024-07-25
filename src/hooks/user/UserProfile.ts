import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { USER_API } from "../../constants";
import showToast from "../../utils/toast";
import axiosJWT from "../../utils/axiosService";
import uploadImagesToCloudinary from "../../api/imageUpload";
import { useFetchData } from "../../utils/fetcher";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { setUser } from "../../redux/slices/userSlice";

axios.defaults.withCredentials = true;

const useProfile = () => {
  const { data, isError } = useFetchData<any>(`${USER_API}/profile`);
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.userSlice);
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    state: '',
    country: '',
    imageFile: []
  });

  const profile = data ? data.user : null;

  if (isError) {
    showToast("Oops! Something went wrong", "error");
  }

  // Set initial form data when profile is fetched
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phoneNumber || '',
        dob: profile.dob || '',
        state: profile.state || '',
        country: profile.country || '',
        imageFile: []
      });
      setImagePreview(profile.profilePic || null);
    }
  }, [profile]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
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
        setFormData((prev :any)=> ({
          ...prev,
          imageFile: [file],
        }));
      }
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      const url = (await uploadImagesToCloudinary(values.imageFile)).toString();

      const { data } = await axiosJWT.patch(
        `${USER_API}/profile/edit`,
        {
          name: values.name,
          phoneNumber: values.phone,
          profilePic: url || profile?.profilePic,
          dob: values.dob,
          state: values.state,
          country: values.country,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      showToast(data.message);
      dispatch(setUser({ ...user, name: data.user.name, image: data.user.profilePic }));
    } catch {
      showToast("Oops! Something went wrong while updating profile", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    profile,
    formData,
    imagePreview,
    isSubmitting,
    handleInputChange,
    handleSubmit,
  };
};

export default useProfile;
