import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppSelector } from "../../redux/store/store"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { loadStripe } from "@stripe/stripe-js"
import * as Yup from "yup"
import axios from "axios"
import { USER_API } from "../../constants"

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Please fill in your first name"),
  lastName: Yup.string().required("Please fill in your last name"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Please fill in your email address"),
  country: Yup.string().required("Please select your country/region"),
  phone: Yup.string().required("Please fill in your phone number"),
})

const CheckoutPage = () => {
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState("Online")
  const { id } = useParams<{ id: string }>()
  const {
    checkIn,
    checkOut,
    price,
    guests,
    name,
    destination,
    city,
    district,
    pincode,
    country,
    days,
    hotelId,
  } = useAppSelector(state => state.bookingslice)
  const formattedCheckInDate = formatDate(checkIn)
  const formattedCheckOutDate = formatDate(checkOut)

  const handleInputChange = (method: "Wallet" | "Online"|"pay_on_checkout") => {
    if (method === "Wallet") {
      //   const total = calculateTotalAmount(
      //     tableData?.capacity,
      //     tableData?.restaurantId.tableRatePerPerson
      //   );
      //   if (total > (wallet?.balance ?? 0))
      //     return setError("Insufficient balance");
      //   else setError(null);
      console.log("wallet")
    }
    if (method === "Online") {
      setPaymentMethod("Online")
    }
    if (method === "pay_on_checkout") {
        setPaymentMethod("pay_on_checkout")
      }
  }

  const handleSubmit = async values => {
    try {
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
      )
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        hotelId,
        phoneNumber: values.phone,
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
        price,
        maxPeople: guests,
        totalDays: days,
        paymentMethod,
      }
      console.log(data)

      const response = await axios.post(`${USER_API}/bookNow`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      console.log(response);      
      const sessionId = response.data.id
      console.log(sessionId);
      if (stripe) {
        const result = await stripe.redirectToCheckout({ sessionId })
        if (result.error) console.error(result.error)
      }
    } catch (error) {
      console.log("Error in creating order", error)
    }
  }

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        country: "India",
        phone: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="container mx-auto p-4">
          <div className="border p-4 rounded shadow-lg  grid grid-cols-2 gap-4">
            <div className="text-sm text-gray-500 mb-4">
              <div className="border p-4 rounded mb-4">
                <h1 className="text-2xl font-bold mb-4">{name}</h1>
                <p>
                  {city}, {district}, {pincode}, {country}
                </p>
                <p className="text-green-600">Great location — 8.8</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-blue-500 font-bold">9.4</span>
                  <span>Superb - 579 reviews</span>
                </div>
              </div>

              {/* Booking Details */}
              <div className="border p-4 rounded mb-4">
                <h2 className="text-xl font-bold mb-4">Your booking details</h2>
                <p>
                  Check-in: <strong>{formattedCheckInDate}</strong>
                </p>
                <p>
                  Check-out: <strong>{formattedCheckOutDate}</strong>
                </p>
                <p>
                  Total length of stay: <strong>{days} night</strong>
                </p>
                <p>
                  No of Guests: <strong>{guests} guests</strong>
                </p>
                <div
                  onClick={() => navigate(-1)}
                  className="text-blue-500 underline cursor-pointer"
                >
                  Change your selection
                </div>
              </div>

              {/* Price Summary */}
              <div className="border p-4 rounded mb-4">
                <h2 className="text-xl font-bold mb-4">Your price summary</h2>
                <p>
                  Total Amount: <strong>₹ {price}</strong>
                </p>
              </div>

              <div className="border p-4 rounded mb-4">
                <h2 className="text-xl font-bold mb-4">Payment</h2>

                <div className="p-2">
                  <label
                    htmlFor="inlineRadio1"
                    className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    Payment Method
                  </label>
                  <div className="">
                    <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                      <input
                        className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                        type="radio"
                        name="paymentMethod"
                        id="inlineRadio2"
                        value="Online"
                        defaultChecked
                        onChange={() => handleInputChange("Online")}
                      />
                      <label
                        className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                        htmlFor="inlineRadio2"
                      >
                        Online
                      </label>
                    </div>
                    <div className="mb-[0.125rem] mr-4 min-h-[1.5rem] pl-[1.5rem] flex items-center">
                      <input
                        className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                        type="radio"
                        name="paymentMethod"
                        id="inlineRadio1"
                        value="Wallet"
                        onChange={() => handleInputChange("Wallet")}
                      />
                      <label
                        className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                        htmlFor="inlineRadio1"
                      >
                        Wallet
                      </label>
                    </div>
                    <div className="mb-[0.125rem] mr-4 min-h-[1.5rem] pl-[1.5rem] flex items-center">
                      <input
                        className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                        type="radio"
                        name="paymentMethod"
                        id="inlineRadio1"
                        value="Wallet"
                        onChange={() => handleInputChange("pay_on_checkout")}
                      />
                      <label
                        className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                        htmlFor="inlineRadio1"
                      >
                        Pay At CheckOut
                      </label>
                    </div>
                    <div className="text-right">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Submit Button */}
            </div>
            <div className="grid gap-4">
              <div className="border p-4 rounded mb-4">
                <h2 className="text-xl font-bold mb-2">Enter your details</h2>
                <div className="grid gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="firstName" className="mb-1">
                      Please fill in your first name
                    </label>
                    <Field
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="border p-2 rounded focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="lastName" className="mb-1">
                      Please fill in your last name
                    </label>
                    <Field
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="border p-2 rounded focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="email" className="mb-1">
                      Please fill in your email address
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="border p-2 rounded focus:outline-none focus:border-blue-500"
                      placeholder="Watch out for typos"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                    <span className="text-gray-500 text-xs">
                      Confirmation email goes to this address
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="country" className="mb-1">
                      Country/region
                    </label>
                    <Field
                      as="select"
                      id="country"
                      name="country"
                      className="border p-2 rounded focus:outline-none focus:border-blue-500"
                    >
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Canada">Canada</option>
                    </Field>
                    <ErrorMessage
                      name="country"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="phone" className="mb-1">
                      Please fill in your phone number
                    </label>
                    <div className="flex">
                      <span className="border p-2 rounded-l bg-gray-100">
                        +91
                      </span>
                      <Field
                        type="tel"
                        id="phone"
                        name="phone"
                        className="border p-2 rounded-r flex-grow focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                    <span className="p-5 text-center text-gray-500 text-xs">
                      thanks for your booking
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default CheckoutPage
