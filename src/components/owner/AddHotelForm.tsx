// import React from "react";
import { ChangeEvent, FormEvent } from "react";
import { useState } from "react"
import useHotel from "../../hooks/owner/UseHotel"


const AddHotelForm = () => {
  const {
    formData,
    handleChange,
    handleAddMore,
    handleSubmit,
    handleRoomEnabledChange,
    // nameError,
    emailError,
    placeError,
    descriptionError,
    selectedDescription,
    handleDescriptionChange,
    aboutPropertyError,
    predefinedAmenities,
    handleAddAmenity,
    imagePreview,
    roomTypes,
  } = useHotel()

  const descriptionOptions = [
  {value:"2-star Hotel"},
  {value:"3-star Hotel"},
  {value:"4-star Hotel"},
  {value:"5-star Hotel"},

  ]



  return (
    <>
    <div className="px-14 py-7">
      <div className="px-14 py-7 rounded-3xl shadow-lg border border-spacing-y-9">
        <h1 className="p-6 text-3xl font-bold mb-4 text-center">Add Hotel</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-row ">
            <div className="flex-1 flex flex-col gap-4 ">
              <div className="mb-4 flex gap-3">
                <label className=" text-gray-700 text-lg font-bold mb-2 flex items-center ">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  placeholder="Name"
                  value={formData.name}
                  onChange={e => handleChange(e, null, "name")}
                  accept="image/*"
                  required
                />
                {/* {nameError && <p className="text-red-500">{nameError}</p>} */}
              </div>
              <div className="mb-4 flex gap-3 ">
                <label className="text-gray-700 text-lg font-bold mb-2 flex items-center">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  placeholder="Email"
                  value={formData.email}
                  onChange={e => handleChange(e, null, "email")}
                  required
                />
                {emailError && <p className="text-red-500">{emailError}</p>}
              </div>
              <div className="mb-4 flex gap-3">
                <label className="text-gray-700 text-lg font-bold mb-2 flex items-center">
                  Place:
                </label>
                <input
                  type="text"
                  name="place"
                  className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  placeholder="Place"
                  value={formData.place}
                  onChange={e => handleChange(e, null, "place")}
                  required
                />
              </div>
              {placeError && (
                <p className="text-red-500 text-center">{placeError}</p>
              )}

              <div className="mb-4 flex gap-3">
                <label className="text-gray-700 text-lg font-bold mb-2 flex items-center">
                  Description:
                </label>
                <select
                  className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  value={selectedDescription}
                  onChange={handleDescriptionChange}
                >
                  <option value="">Select Description</option>
                  {descriptionOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4 flex gap-3">
                <label className="text-gray-700 text-lg font-bold mb-2 flex items-center">
                  About Property:
                </label>
                <textarea
                  className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  placeholder="About Property"
                  name="aboutProperty"
                  value={formData.aboutProperty}
                  onChange={e => handleChange(e, null, "aboutProperty")}
                  required
                />
              </div>
              {aboutPropertyError && (
                <p className="text-red-500 text-center">{aboutPropertyError}</p>
              )}
            </div>

            <div className="flex flex-1 flex-col justify-center items-center gap-3 ">
              <img
                src={imagePreview ? imagePreview : "https://picsum.photos/200"}
                alt="Profile"
                className="rounded-2xl  w-3/5 border-blue-200"
              />
              <input
                type="file"
                id="profile-image"
                name="imageFile"
                className="hidden"
                onChange={e => handleChange(e, null, "image")}
              />
              <div className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <label
                  htmlFor="profile-image"
                  className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                >
                  Upload Image
                </label>
              </div>
            </div>
          </div>

          <div className="mb-4 ">
            <label className="text-gray-700 text-lg font-bold mb-2 flex items-center">
              Property Rules:
            </label>
            <div className="">
              {formData.propertyRules.map((rule, index) => (
                <div key={index} className="mb-2">
                  <input
                    type="text"
                    className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-1/2 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    placeholder={`property rule ${index + 1}`}
                    value={rule}
                    onChange={e => handleChange(e, index, "propertyRules")}
                    required
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddMore("propertyRules")}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
              >
                Add More
              </button>
            </div>
          </div>
          <div className="mb-4 ">
            <div className="mb-4 flex gap-3">
              <label className="text-gray-700 text-lg font-bold mb-2 flex items-center">
                Amenities:
              </label>
              <div className="flex flex-wrap gap-2">
                {predefinedAmenities.map((amenity, index) => (
                  <label key={index} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-purple-600"
                      value={amenity}
                      onChange={() => handleAddAmenity(amenity)}
                    />
                    <span className="ml-2 text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-4 py-4">Room Types</h2>
            {roomTypes.map((roomType, index) => (
              <div key={roomType.name} className="mb-4 flex gap-4">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center gap-2 mx-5">
                      <input
                        title="checkbox"
                        type="checkbox"
                        checked={roomType.enabled}
                        onChange={() => handleRoomEnabledChange(roomType.name)}
                      />
                      <p className="text-gray-700 text-lg font-bold mb-2">
                        {roomType.name}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-row gap-2">
                      <label className="text-gray-700 text-sm ml-4 font-medium">
                        Price per Night:
                      </label>
                      <input
                        type="number"
                        name={`rooms_${index}_price`}
                        className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        placeholder="Price"
                        value={formData.rooms[index]?.price || ""}
                        onChange={e => handleChange(e, index,"rooms_price")}
                        disabled={!roomType.enabled}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-row gap-2">
                      <label className="text-gray-700 text-sm ml-4 font-medium">
                        Count:
                      </label>
                      <input
                        type="number"
                        name={`rooms_${index}_number`}
                        className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        placeholder="Count"
                        value={formData.rooms[index]?.number || ""}
                        onChange={e => handleChange(e, index, "rooms_number")}
                        disabled={!roomType.enabled}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center p-4">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default AddHotelForm