import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { USER_API } from "../../constants";
import { setItemToLocalStorage } from "../../utils/localStorage";
import showToast from "../../utils/toast";
import { RegisterValidation } from "../../utils/validation";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const {
    values,
    touched,
    handleBlur,
    errors,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: RegisterValidation,
    onSubmit: ({ name, email, password }) => {
console.log("hloooo");


      axios
        .post(USER_API + "/auth/register", {
          name,
          email,
          password,
        })
        .then(({ data }) => {
          const { message, newUser } = data;
          console.log(data);
          showToast(message, "success");
          setTimeout(() => {
            setItemToLocalStorage("userId", newUser._id);
            navigate("/auth/verifyOtp");
          }, 1000);
        })
        .catch(({ response }) => {
          showToast(response?.data?.message, "error");
        });
    },
  });

  return (
    <body className="flex font-poppins items-center justify-center">
      <div className="h-screen w-screen flex justify-center items-center bg-zinc-200">
        <div className="grid gap-4">
          <div className="border-[10px] border-transparent rounded-[20px] bg-gray-100 shadow-lg xl:p-4 2xl:p-4 lg:p-4 md:p-4 sm:p-2 ">
            <h1 className="pt-4 pb-4 font-bold text-blue-800 text-4xl text-center cursor-default">
              Sign Up
            </h1>
            <form onSubmit={handleSubmit} className="">
              <div>
                <label className="mb-2  text-gray-400 text-lg">Name</label>
                <input
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border p-2 text-gray-300  shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  type="text"
                  placeholder="enter your name"
                />
              </div>
              {errors.name && touched.name && (
                <p className="text-red-600 ">{errors.name}</p>
              )}
              <div>
                <label className="mb-2  text-gray-400 text-lg">Email</label>
                <input
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border p-2 text-gray-300  shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  type="email"
                  placeholder="enter your email"
                />
              </div>
              {errors.email && touched.email && (
                <p className="text-red-600">{errors.email}</p>
              )}
              <div>
                <label className="mb-2  text-gray-400 text-lg">Password</label>
                <input
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border p-2 text-gray-300 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
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
                  className="border p-2 text-gray-300  shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  type="password"
                  placeholder="re-enter the password"
                />
              </div>
              {errors.cpassword && touched.cpassword && (
                <p className="text-red-600">{errors.cpassword}</p>
              )}
             
              <button
                className="bg-blue-600 text-gray-300  shadow-lg mt-6 p-2  rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                type="submit"
              >
                SIGN UP
              </button>
            </form>
            <div className="flex flex-col mt-4 items-center justify-center text-sm">
              <h3 className="text-gray-300">
                already have an account?
                <Link
                  to="/auth/login"
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

export default Register;
