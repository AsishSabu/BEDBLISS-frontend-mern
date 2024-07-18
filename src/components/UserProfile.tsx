import React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import useProfile from "../hooks/user/UserProfile"
import { noProfile } from "../assets/images"
import { nameRegex, phoneRegex } from "../constants"
import { Input } from "@material-tailwind/react"
const tenYearsAgo = new Date()
tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10)
const UserProfile = () => {
  const { profile, formData, imagePreview, handleInputChange, handleSubmit } =
    useProfile()

  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().matches(nameRegex, "Invalid name").required(),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string()
        .matches(phoneRegex, "Phone number must have 10 numbers")
        .optional(),
        dob: Yup.date()
        .max(new Date(new Date().setFullYear(new Date().getFullYear() - 10)), "minimum required age is 10")
        .optional()
        .nullable(),
      state: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Enter a valid State")
        .optional(),
      country: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "enter a valid Country")
        .optional(),
    }),
    onSubmit: values => {
      handleSubmit(values)
    },
  })

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden ml-64">
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-varWhite p-6 rounded-lg shadow-lg w-full overflow-auto">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={
                imagePreview
                  ? imagePreview
                  : profile?.profilePic
                  ? profile?.profilePic
                  : noProfile
              }
              alt=""
              className="w-32 h-32 bg-gray-800 text-white flex items-center justify-center rounded-full text-4xl"
            />
            <label
              htmlFor="profile-image"
              className="flex items-center justify-center text-white bg-Marine_blue font-semibold cursor-pointer mt-3 p-2 rounded-full"
            >
              {profile?.profilePic ? "Change" : "Add"}
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
          <h2 className="text-2xl font-bold mb-4">Your profile</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProfileItem
                title="Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.errors.name}
              />
              <ProfileItem
                title="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
                disabled={true}
              />
              <ProfileItem
                title="Phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.errors.phone}
              />
              <ProfileItem
                title="DOB"
                name="dob"
                type="date"
                value={formik.values.dob}
                onChange={formik.handleChange}
                error={formik.errors.dob}
              />
              <ProfileItem
                title="State"
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                error={formik.errors.state}
              />
              <ProfileItem
                title="Country"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                error={formik.errors.country}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-900 text-white py-2 px-4 mt-3 rounded-md hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-500"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

const ProfileItem = ({
  title,
  name,
  value,
  onChange,
  error,
  disabled = false,
  type = "",
}) => {
  return (
    <div className="flex flex-col p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <label htmlFor={name} className="text-gray-700 text-lg">
        {title}
      </label>
      <Input
        variant="static"
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="px-3 py-2 w-full"
        disabled={disabled}
      />
      {error ? <div className="text-red-500 text-sm mt-1">{error}</div> : null}
    </div>
  )
}

export default UserProfile
