import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useAppDispatch } from "../../redux/store/store";
import { LoginValidation } from "../../utils/validation";
import { setUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import showToast from "../../utils/toast";
import { setItemToLocalStorage } from "../../utils/localStorage";
import { ADMIN_API } from "../../constants";

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { values, touched, handleBlur, handleChange, errors, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginValidation,
      onSubmit: ({ email, password }) => {
        axios
          .post(ADMIN_API + "/login", { email, password })
          .then(({ data }) => {
            const access_token = data.accessToken;
            const { name, role} = data.admin;
            console.log(access_token);
            console.log(name,role);
            
        setItemToLocalStorage("access_token", access_token);
            showToast(data.message, "success");
            dispatch(setUser({ isAuthenticated: true, name, role }));
            navigate("/admin");
          })
          .catch(({ response }) => {
            console.log(response);
            showToast(response?.data?.message, "error");
          });
      },
    });

  return (
    <body className="flex font-poppins items-center justify-center">
      <div className="h-screen w-screen flex justify-center items-center bg-zinc-200">
        <div className="grid gap-8">
          <div className="border-[10px] border-transparent rounded-[20px] bg-gray-100 shadow-lg xl:p-5 2xl:p-5 lg:p-5 md:p-5 sm:p-2 ">
            <h1 className="pt-8 pb-6 font-bold text-blue-800 text-4xl text-center cursor-default">
              ADMIN LOGIN
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2  text-gray-400 text-lg">Email</label>
                <input
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border p-2  text-gray-300 border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  type="email"
                  placeholder="Enter the email"
                />
              </div>
              {errors.email && touched.email && (
                <p className="text-red-600">{errors.email}</p>
              )}
              <div>
                <label className="mb-2 text-gray-400 text-lg">Password</label>
                <input
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border p-2  text-gray-300 border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  type="password"
                  placeholder="enter the password"
                />
              </div>
              {errors.password && touched.password && (
                <p className="text-red-600">{errors.password}</p>
              )}
              
              <button
                className="bg-blue-600 text-gray-300  shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                type="submit"
              >
                SIGN IN
              </button>
            </form>
          </div>
        </div>
      </div>
    </body>
  );
};

export default LoginForm;
