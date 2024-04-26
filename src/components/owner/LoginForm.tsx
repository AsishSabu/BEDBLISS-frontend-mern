import React from "react";
import { useFormik } from "formik";
import { auth, googleProvider, facebookProvider } from "../../firebase/config";
import { signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAppDispatch } from "../../redux/store/store";
import { LoginValidation } from "../../utils/validation";
import { OWNER_API } from "../../constants";
import { setUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import showToast from "../../utils/toast";
import { setItemToLocalStorage } from "../../utils/localStorage";

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
          .post(OWNER_API + "/auth/login", { email, password })
          .then(({ data }) => {
            const access_token = data.accessToken;
            const { name, role, _id } = data.owner;
            console.log(data);
            localStorage.setItem("access_token", access_token);
            showToast(data.message, "success");
            dispatch(setUser({ isAuthenticated: true, name, role, id: _id }));
            navigate("/owner");
          })
          .catch(({ response }) => {
            console.log(response);
            showToast(response?.data?.message, "error");
          });
      },
    });

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider).then((data) => {
      const userData = {
        name: data.user.displayName,
        email: data.user.email,
        picture: data.user.photoURL,
        email_verified: data.user.emailVerified,
      };
      axios
        .post(OWNER_API + "/auth/googleSignIn", userData)
        .then(({ data }) => {
          const { message, accessToken } = data;
          const { name, role, _id } = data.owner;
          setItemToLocalStorage("access_token", accessToken);
          showToast(message, "success");
          dispatch(setUser({ isAuthenticated: true, name, role, id: _id }));
        })
        .catch((response)=>{
          console.log(response);
          showToast(response?.data?.message, "error");
        })
    });
  };
  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider).then((data) => {
      const userData = {
        name: data.user.displayName,
        email: data.user.email,
        picture: data.user.photoURL,
        email_verified: data.user.emailVerified,
      };
      axios
        .post(OWNER_API + "/auth/facebookSignIn", userData)
        .then(({ data }) => {
          const { message, accessToken } = data;
          const { name, role, _id } = data.user;
          setItemToLocalStorage("access_token", accessToken);
          showToast(message, "success");
          dispatch(setUser({ isAuthenticated: true, name, role, id: _id }));
        })
        .catch((response)=>{
          console.log(response);
          showToast(response?.data?.message, "error");
        })
    });
  };

  return (
    <body className="flex font-poppins items-center justify-center">
      <div className="h-screen w-screen flex justify-center items-center bg-zinc-200">
        <div className="grid gap-8">
          <div className="border-[10px] border-transparent rounded-[20px] bg-gray-100 shadow-lg xl:p-5 2xl:p-5 lg:p-5 md:p-5 sm:p-2 ">
            <h1 className="pt-8 pb-6 font-bold text-blue-800 text-4xl text-center cursor-default">
              Sign In
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
                  placeholder="Email"
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
                  placeholder="Password"
                />
              </div>
              {errors.password && touched.password && (
                <p className="text-red-600">{errors.password}</p>
              )}
              <a className="group text-blue-700 transition-all duration-100 ease-in-out">
                <span className="bg-left-bottom bg-gradient-to-r text-sm from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                  Forget your password?
                </span>
              </a>
              <button
                className="bg-blue-600 text-gray-300  shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                type="submit"
              >
                SIGN IN
              </button>
            </form>
            <div className="flex flex-col mt-4 items-center justify-center text-sm">
              <h3 className="text-gray-300">
                Don't have an account?
                <Link
                  to="/owner/register"
                  className="group text-blue-400 transition-all duration-100 ease-in-out"
                >
                  <span className="bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    Sign Up
                  </span>
                </Link>
              </h3>
            </div>

            <div
              id="third-party-auth"
              className="flex items-center justify-center mt-5 flex-wrap"
            >
              <button
                onClick={handleGoogleSignIn}
                className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
              >
                <img
                  className="max-w-[25px]"
                  src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
                  alt="Google"
                />
              </button>

              <button
                onClick={handleFacebookSignIn}
                className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
              >
                <img
                  className="max-w-[25px]"
                  src="https://ucarecdn.com/6f56c0f1-c9c0-4d72-b44d-51a79ff38ea9/"
                  alt="Facebook"
                />
              </button>
            </div>

            <div className="text-gray-500 flex text-center flex-col mt-4 items-center text-sm">
              <p className="cursor-default">
                By signing in, you agree to our
                <a className="group text-blue-400 transition-all duration-100 ease-in-out">
                  <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    Terms
                  </span>
                </a>
                and
                <a className="group text-blue-400 transition-all duration-100 ease-in-out">
                  <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    Privacy Policy
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default LoginForm;
