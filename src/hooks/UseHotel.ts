import { Response } from 'express';
import { ChangeEvent, useState } from "react";
import { OWNER_API, emailRegex } from "../constants";
import axios from "axios";
import showToast from "../utils/toast";
import uploadImagesToCloudinary from "../api/imageUpload";
import { useNavigate } from 'react-router-dom';

const predefinedAmenities = [
  "Swimming Pool",
  "Gym",
  "Spa",
  "Restaurant",
  "Parking",
];

const useHotel = () => {
  const navigate=useNavigate()
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [placeError, setPlaceError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [propertyRulesError, setPropertyRulesError] = useState<string | null>(
    null
  );
  const [aboutPropertyError, setAboutPropertyError] = useState<string | null>(
    null
  );
  const [roomError, setRoomError] = useState<string | null>(null);
  const [amenitiesError, setAmenitiesError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    place: string;
    description: string;
    propertyRules: string[];
    aboutProperty: string;
    rooms: { type: string; price: string; number: string; guests: string }[];
    amenities: string[];
    imageFile: File[];
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
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    index: number | null,
    fieldName: string
  ) => {
    let errorMessage = "";

    if (fieldName === "image") {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files && fileInput.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        setFormData((prev) => ({
          ...prev,
          imageFile: [file],
        }));
      }
    } else {
      const { name, value } = e.target;
      if (fieldName === "email") {
        if (!emailRegex.test(value)) {
          errorMessage = "please enter a valid email address";
        }
        setEmailError(errorMessage);
        setFormData({ ...formData, [name]: value });
      } else if (fieldName === "place") {
        if (value.length < 5) {
          errorMessage = "please enter atleast 5 characters";
        }
        setPlaceError(errorMessage);
        setFormData({ ...formData, [name]: value });
      } else if (fieldName === "description") {
        if (value.length < 12) {
          errorMessage = "please enter atleast 12 characters";
        }
        setDescriptionError(errorMessage);
        setFormData({ ...formData, [name]: value });
      } else if (fieldName === " aboutProperty") {
        if (value.length < 15) {
          errorMessage = "please enter atleast 15 characters";
        }
        setAboutPropertyError(errorMessage);
        setFormData({ ...formData, [name]: value });
      } else if (fieldName === "propertyRules") {
        const updatedRules = [...formData.propertyRules];
        updatedRules[index as number] = value;
        setFormData({ ...formData, propertyRules: updatedRules });
      } else if (fieldName.includes("rooms")) {
        const roomIndex = parseInt(fieldName.split("-")[1]);
        const propertyName = fieldName.split(
          "-"
        )[2] as keyof (typeof formData.rooms)[0];
        const updatedRooms = [...formData.rooms];
        updatedRooms[roomIndex][propertyName] = value;
        setFormData({ ...formData, rooms: updatedRooms });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  const handleAddAmenity = (selectedAmenity: string) => {
    if (formData.amenities.includes(selectedAmenity)) {
      const updatedAmenities = formData.amenities.filter(
        (amenity) => amenity !== selectedAmenity
      );
      setFormData({ ...formData, amenities: updatedAmenities });
    } else {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, selectedAmenity],
      });
    }
  };

 

  const handleAddMore = (fieldName: string) => {
    if (fieldName === "propertyRules") {
      setFormData({
        ...formData,
        propertyRules: [...formData.propertyRules, ""],
      });
    } else if (fieldName === "amenities") {
      setFormData({ ...formData, amenities: [...formData.amenities, ""] });
    } else if (fieldName === "rooms") {
      setFormData({
        ...formData,
        rooms: [
          ...formData.rooms,
          { type: "", price: "", guests: "", number: "" },
        ],
      });
    }
  };

  const handleSubmit=async  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url=(await uploadImagesToCloudinary(formData.imageFile)).toString()
    console.log(formData);
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
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then(({ data }) => {
        showToast(data.message);
        navigate("/owner/hotels")
      })
      .catch(({ response }) => {
        showToast(response?.data?.message, "error");
      });
  };

  return {
    formData,
    handleChange,
    handleAddMore,
    handleSubmit,
    nameError,
    emailError,
    placeError,
    descriptionError,
    propertyRulesError,
    aboutPropertyError,
    handleAddAmenity,
    predefinedAmenities,
    imagePreview
  };
};

export default useHotel;
