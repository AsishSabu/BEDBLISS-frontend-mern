import useProfile from "../../hooks/user/UserProfile";

const OwnerProfile = () => {
  const {
    profile,
    formData,
    nameError,
    phoneError,
    imagePreview,
    handleInputChange,
    handleSubmit,
  } = useProfile();
  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden ml-64">
      <div className="flex flex-col justify-center items-center">
        <img src={
                  imagePreview
                    ? imagePreview
                    : profile?.profilePic ?? "https://picsum.photos/200"
                } 
          alt="Profile"
          className=" rounded-full w-1/5"
        />
        <label
          htmlFor="profile-image"
          className=" flex items-center justify-center bg-gray-200 text-black font-semibold  cursor-pointer border-4 border-white w-1/5 h-10"
        >
          Change Pic
          <input
            type="file"
            id="profile-image"
            name="imageFile"
            className="hidden"
            accept="image/*"
            onChange={handleInputChange} 
          />
        </label>
        
      </div>

      <div className="bg-white w-4/4 p-6 mb-3 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="border text-gray-700 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
            value={formData.name}
            name="name"
            onChange={handleInputChange}
          />
        </div>
        {nameError && <p className="text-red-500">{nameError}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="border text-gray-700 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
            value={formData?.email ?? ""}
            name="email"
          
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-gray-700 font-semibold"
          >
            Phone Number:
          </label>
          <input
            type="text"
            id="phoneNumber"
            className="border text-gray-700 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
            value={formData?.phone ?? ""}
            name="phone"
            onChange={handleInputChange}
          />
        </div>
        {phoneError && <p className="text-red-500">{phoneError}</p>}

        {/* Update Profile Button */}
        <button  onClick={handleSubmit}  className="bg-blue-900 text-white py-2 px-4 mt-3 rounded-md hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-500">
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default OwnerProfile;
