import axios from "axios"
import { signInWithPopup } from "firebase/auth"
import { useFormik } from "formik"
import React, {useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { USER_API } from "../../constants"
import { auth, facebookProvider, googleProvider } from "../../firebase/config"
import { setUser } from "../../redux/slices/userSlice"
import { useAppDispatch } from "../../redux/store/store"
import { setItemToLocalStorage } from "../../utils/localStorage"
import showToast from "../../utils/toast"
import { LoginValidation } from "../../utils/validation"
import Modal from "./Modal"

type Provider = "google" | "facebook"
type Role = "user" | "owner"
const Login: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [provider, setProvider] = useState<Provider | null>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { values, touched, handleBlur, handleChange, errors, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginValidation,
      onSubmit: ({ email, password }) => {
        axios
          .post(USER_API + "/auth/login", { email, password })
          .then(({ data }) => {
            const access_token = data.accessToken
            const { name, role, _id,notifications} = data.user
            const unreadCount = notifications.filter((notification:any) => !notification.read).length;
            if (role === "user") {
              localStorage.setItem("access_token", access_token)
              showToast(data.message, "success")
              dispatch(setUser({ isAuthenticated: true, name, role, id: _id,notification:unreadCount }))
              navigate("/user");
            } else {
              localStorage.setItem("access_token", access_token)
              showToast(data.message, "success")
              dispatch(setUser({ isAuthenticated: true, name, role, id: _id,notification:unreadCount}))
              navigate("/owner");
            }
          })
          .catch(({ response }) => {
            console.log(response)
            showToast(response?.data?.message, "error")
          })
      },
    })

  const handleSignIn = (roles: Role) => {
    const selectedProvider = provider
    console.log(selectedProvider, "selectedProvider")
    console.log(roles, "role")

    signInWithPopup(
      auth,
      selectedProvider === "google" ? googleProvider : facebookProvider
    )
      .then(data => {
        const userData = {
          name: data.user.displayName,
          email: data.user.email,
          picture: data.user.photoURL,
          email_verified: data.user.emailVerified,
          role: roles,
        }

        axios
          .post(USER_API + "/auth/googleAndFacebookSignIn", userData)
          .then(({ data }) => {
            const { message, accessToken } = data
            const { name, role, _id } = data.user
            setItemToLocalStorage("access_token", accessToken)
            showToast(message, "success")
            dispatch(setUser({ isAuthenticated: true, name, role, id: _id }))
            navigate(role === "user" ? "/user" : "/owner")
          })
          .catch(({ response }) => {
            console.log(response)
            showToast(response?.data?.message, "error")
          })
      })
      .catch(({ response }) => {
        console.log(response)
        showToast(response?.data?.message, "error")
      })
  }

  const handleProvider = (selectedProvider: Provider) => {
    setProvider(selectedProvider)
    setOpen(true)
  }
  const handleRole = (selectedRole: Role) => {
    console.log(selectedRole, "esfsdfsdsdsdfds")
    setOpen(false)
    handleSignIn(selectedRole)
  }
  const handleClose = () => setOpen(false)

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
                  className="border p-2  text-gray-300 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
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
                  className="border p-2  text-gray-300  shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  type="password"
                  placeholder="Password"
                />
              </div>
              {errors.password && touched.password && (
                <p className="text-red-600">{errors.password}</p>
              )}
              {open && (
                <Modal onSelectRole={handleRole} onClose={handleClose} />
              )}

              <Link
                to="/auth/forgotPassword"
                className="group text-blue-700 transition-all duration-100 ease-in-out"
              >
                <span className="bg-left-bottom bg-gradient-to-r text-sm from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                  Forget your password?
                </span>
              </Link>
              <button
                className="bg-blue-600  shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                type="submit"
              >
                SIGN IN
              </button>
            </form>
            <div className="flex flex-col mt-4 items-center justify-center text-sm">
              <h3 className="text-gray-300">
                Don't have an account?
                <Link
                  to="/auth/register"
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
                onClick={() => handleProvider("google")}
                className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
              >
                <img
                  className="max-w-[25px]"
                  src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
                  alt="Google"
                />
              </button>

              <button
                onClick={() => handleProvider("facebook")}
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
  )
}

export default Login
