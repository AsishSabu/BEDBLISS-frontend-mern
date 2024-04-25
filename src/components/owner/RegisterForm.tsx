import React from "react";
import { useFormik } from "formik";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { RegisterValidation } from "../../utils/validation";
import { OWNER_API } from "../../constants";
import showToast from "../../utils/toast";
import { setItemToLocalStorage } from "../../utils/localStorage";

const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    values,
    isSubmitting,
    touched,
    handleBlur,
    errors,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      cpassword: "",
    },
    validationSchema: RegisterValidation,
    onSubmit: ({ name, email, password, phone }) => {
      
      axios
        .post(OWNER_API + "/auth/register", { name, email, password, phone })
        .then(({ data }) => {
          const { message, newUser } = data;
          console.log(data);
          showToast(data.message, "success");
          setTimeout(() => {
            setItemToLocalStorage("userId", newUser._id);
            navigate("/owner/verifyOtp")
          }, 1000);
        })
        .catch(({ response }) => {
          const { message } = response.data;
          showToast(message, "error");
        });
    },
  });

  console.log(errors);

  return (
    <body className="flex font-poppins items-center justify-center">
      <div className="h-screen w-screen flex justify-center items-center bg-zinc-200">
        <div className="grid gap-8">
          <div className="border-[10px] border-transparent rounded-[20px] bg-gray-100 shadow-lg xl:p-5 2xl:p-5 lg:p-5 md:p-5 sm:p-2 ">
            <h1 className="pt-8 pb-6 font-bold text-blue-800 text-4xl text-center cursor-default">
              Sign Up
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2  text-gray-400 text-lg">Name</label>
                <input
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border p-2 text-gray-300 border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  type="text"
                  placeholder="enter your name"
                />
              </div>
              {errors.name && touched.name && (
                <p className="text-red-600">{errors.name}</p>
              )}
              <div>
                <label className="mb-2  text-gray-400 text-lg">Email</label>
                <input
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border p-2 text-gray-300 border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  type="email"
                  placeholder="enter your email"
                />
              </div>
              {errors.email && touched.email && (
                <p className="text-red-600">{errors.email}</p>
              )}
              <div>
                <label className="mb-2  text-gray-400 text-lg">
                  Phone Number
                </label>
                <input
                  id="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border p-2 text-gray-300 border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  type="text"
                  placeholder="enter your phone number"
                />
              </div>
              {errors.phone && touched.phone && (
                <p className="text-red-600">{errors.phone}</p>
              )}
              <div>
                <label className="mb-2  text-gray-400 text-lg">Password</label>
                <input
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border p-2 text-gray-300 border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  type="password"
                  placeholder="enter the password"
                />
              </div>
              {errors.password && touched.password && (
                <p className="text-red-600">{errors.password}</p>
              )}

              <div>
                <label className="mb-2  text-gray-400 text-lg">
                  Confirm Password
                </label>
                <input
                  id="cpassword"
                  value={values.cpassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border p-2 text-gray-300 border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  type="password"
                  placeholder="re-enter the password"
                />
              </div>
              {errors.cpassword && touched.cpassword && (
                <p className="text-red-600">{errors.cpassword}</p>
              )}
              <button
                disabled={isSubmitting}
                className="bg-blue-600 text-gray-300  shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                type="submit"
              >
                SIGN UP
              </button>
            </form>
            <div className="flex flex-col mt-4 items-center justify-center text-sm">
              <h3 className="text-gray-300">
                already have an account?
                <Link
                  to="/owner/register"
                  className="group text-blue-400 transition-all duration-100 ease-in-out"
                >
                  <span className="bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    Sign In
                  </span>
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default RegisterForm;
