import { ChangeEvent, useState } from 'react';
import { OWNER_API, emailRegex } from '../constants';
import axios from 'axios';
import showToast from '../utils/toast';

const useHotel = () => {
    const [nameError, setNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [placeError, setPlaceError] = useState<string | null>(null);
    const [descriptionError, setDescriptionError] = useState<string | null>(null);
    const [propertyRulesError, setPropertyRulesError] = useState<string | null>(null);
    const [aboutPropertyError, setAboutPropertyError] = useState<string | null>(null);
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
        amenities: [""],
        imageFile: [],
      });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    index: number | null,
    fieldName: string
  ) => {
    let errorMessage=""
    const { name, value } = e.target;
    if (fieldName === 'email') {
        if (!emailRegex.test(value)) {
            errorMessage = "please enter a valid email address";
        }
        setEmailError(errorMessage)
        setFormData({ ...formData, [name]: value })

    }else   if (fieldName === 'place') {
        if (value.length<5) {
            errorMessage = "please enter atleast 5 characters";
        }
        setPlaceError(errorMessage)
        setFormData({ ...formData, [name]: value })

    }
    else   if (fieldName === 'description') {
      if (value.length<20) {
          errorMessage = "please enter atleast 20 characters";
      }
      setDescriptionError(errorMessage)
      setFormData({ ...formData, [name]: value })

  }else   if (fieldName === ' aboutProperty') {
    if (value.length<15) {
        errorMessage = "please enter atleast 15 characters";
    }
    setAboutPropertyError(errorMessage)
    setFormData({ ...formData, [name]: value })

}
    else if (fieldName === 'propertyRules') {
      const updatedRules = [...formData.propertyRules];
      updatedRules[index as number] = value;
      setFormData({ ...formData, propertyRules: updatedRules });
    } else if (fieldName === 'amenities') {
      const updatedAmenities = [...formData.amenities];
      updatedAmenities[index as number] = value;
      setFormData({ ...formData, amenities: updatedAmenities });
    } else if (fieldName.includes("rooms")) {
        const roomIndex = parseInt(fieldName.split("-")[1]);
        const propertyName = fieldName.split("-")[2] as keyof typeof formData.rooms[0];
        const updatedRooms = [...formData.rooms];
        updatedRooms[roomIndex][propertyName] = value;
        setFormData({ ...formData, rooms: updatedRooms });
      }
       else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddMore = (fieldName: string) => {
    if (fieldName === 'propertyRules') {
      setFormData({ ...formData, propertyRules: [...formData.propertyRules, ''] });
    } else if (fieldName === 'amenities') {
      setFormData({ ...formData, amenities: [...formData.amenities, ''] });
    } else if (fieldName === 'rooms') {
      setFormData({
        ...formData,
        rooms: [...formData.rooms, { type: '', price: '', guests: '', number: '' }],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    )
    .then(({ data }) => {
      showToast(data.message);
      
    })
    .catch(() => {
   
      showToast(
        "Oops! Something went wrong while updating profile",
        "error"
      );
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
  };
};

export default useHotel;
