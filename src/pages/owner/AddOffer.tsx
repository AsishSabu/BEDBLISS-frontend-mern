import React from "react"
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import useHotelList from "../../hooks/owner/UseHotelList"
import { OWNER_API } from "../../constants"
import axios from "axios"
import showToast from "../../utils/toast"
import { useNavigate } from "react-router-dom"

const AddOffer: React.FC = () => {
  const { hotels } = useHotelList()
  const navigate = useNavigate()

  const handleSubmit = async (values: any) => {
    let offer;
    if(values.offerType==="percentage"){
        offer = {
            startDate: values.startDate,
            endDate: values.endDate,
            desc: values.description,
            type: values.offerType,
            minAmount: 0,
            maxAmount: 0,
            amount: values.amount,
          }
    }else{
        offer = {
            startDate: values.startDate,
            endDate: values.endDate,
            desc: values.description,
            type: values.offerType,
            minAmount: values.minAmount,
            maxAmount: values.maxAmount,
            amount: values.amount,
          }
    }
    const response = await axios.patch(
        `${OWNER_API}/addOffer/${values.hotelId}`,offer,{
            headers: {
              authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
        .then((response)=>{
            showToast(response.data.message)
            navigate("/owner/hotels")
          
        })
    
    
  }

  const hotelAddValidation = Yup.object().shape({
    description: Yup.string().required("Description is required"),
    hotelId: Yup.string().required("Hotel is required"),
    startDate: Yup.date().required("Start Date is required").nullable(),
    endDate: Yup.date()
      .required("End Date is required")
      .nullable()
      .min(
        Yup.ref("startDate"),
        "End Date must be at least one day after Start Date"
      ),
    offerType: Yup.string().required("Offer Type is required"),
    amount: Yup.number().when("offerType", {
      is: "percentage",
      then: schema =>
        schema
          .required("Offer Amount is required")
          .min(1, "Percentage must be between 1 and 100")
          .max(100, "Percentage must be between 1 and 100"),
      otherwise: schema =>
        schema
          .required("Offer Amount is required")
          .positive("Offer Amount must be positive"),
    }),
    minAmount: Yup.number().when("offerType", {
      is: "flat",
      then: schema =>
        schema
          .required("Minimum Amount is required")
          .positive("Minimum Amount must be positive"),
    }),
    maxAmount: Yup.number().when("offerType", {
      is: "flat",
      then: schema =>
        schema
          .required("Maximum Amount is required")
          .positive("Maximum Amount must be positive"),
    }),
  })

  return (
    <div>
      <Formik
        initialValues={{
          hotelId: "",
          description: "",
          startDate: null,
          endDate: null,
          offerType: "",
          amount: "",
          minAmount: "",
          maxAmount: "",
        }}
        validationSchema={hotelAddValidation}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isValid }) => (
          <div className="px-4 py-7 md:px-14 flex justify-center">
            <div className="px-4 py-7 md:px-14 rounded-3xl shadow-lg border border-spacing-y-9 w-8/12 items-center">
              <h1 className="p-6 text-2xl md:text-3xl font-bold mb-4 text-center">
                Add Offers
              </h1>
              <Form>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  <div>
                    <label className="text-gray-700 text-lg font-bold mb-2">
                      Offer Type:
                    </label>
                    <Field
                      as="select"
                      name="offerType"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    >
                      <option value="" label="Select an offer type" />
                      <option value="flat">Flat</option>
                      <option value="percentage">Percentage</option>
                    </Field>
                    <span className="text-Strawberry_red text-sm">
                      <ErrorMessage name="offerType" />
                    </span>
                  </div>

                  {values.offerType === "percentage" && (
                    <div>
                      <label className="text-gray-700 text-lg font-bold mb-2">
                        Percentage Amount:
                      </label>
                      <Field
                        type="number"
                        name="amount"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring appearance-none"
                        placeholder="Enter the percentage"
                      />
                      <span className="text-Strawberry_red text-sm">
                        <ErrorMessage name="amount" />
                      </span>
                    </div>
                  )}

                  {values.offerType === "flat" && (
                    <>
                      <div>
                        <label className="text-gray-700 text-lg font-bold mb-2">
                          Offer Amount:
                        </label>
                        <Field
                          type="number"
                          name="amount"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring appearance-none"
                          placeholder="Enter the offer amount"
                        />
                        <span className="text-Strawberry_red text-sm">
                          <ErrorMessage name="amount" />
                        </span>
                      </div>
                      <div>
                        <label className="text-gray-700 text-lg font-bold mb-2">
                          Minimum Amount:
                        </label>
                        <Field
                          type="number"
                          name="minAmount"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring appearance-none"
                          placeholder="Enter the minimum amount"
                        />
                        <span className="text-Strawberry_red text-sm">
                          <ErrorMessage name="minAmount" />
                        </span>
                      </div>

                      <div>
                        <label className="text-gray-700 text-lg font-bold mb-2">
                          Maximum Amount:
                        </label>
                        <Field
                          type="number"
                          name="maxAmount"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring appearance-none"
                          placeholder="Enter the maximum amount"
                        />
                        <span className="text-Strawberry_red text-sm">
                          <ErrorMessage name="maxAmount" />
                        </span>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="text-gray-700 text-lg font-bold mb-2">
                      Description:
                    </label>
                    <Field
                      as="textarea"
                      name="description"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      placeholder="Enter the description"
                    />
                    <span className="text-Strawberry_red text-sm">
                      <ErrorMessage name="description" />
                    </span>
                  </div>

                  <div>
                    <label className="text-gray-700 text-lg font-bold mb-2">
                      Hotel:
                    </label>
                    <Field
                      as="select"
                      name="hotelId"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    >
                      <option value="" label="Select a hotel for the offer" />
                      {hotels.map((hotel, index) => (
                        <option key={index} value={hotel._id}>
                          {hotel.name}
                        </option>
                      ))}
                    </Field>
                    <span className="text-Strawberry_red text-sm">
                      <ErrorMessage name="hotelId" />
                    </span>
                  </div>

                  <div>
                    <label className="text-gray-700 text-lg font-bold mb-2">
                      Start Date:
                    </label>
                    <DatePicker
                      selected={values.startDate}
                      onChange={date => setFieldValue("startDate", date)}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      dateFormat="dd/MM/yyyy"
                      minDate={new Date()}
                    />
                    <span className="text-Strawberry_red text-sm">
                      <ErrorMessage name="startDate" />
                    </span>
                  </div>

                  <div>
                    <label className="text-gray-700 text-lg font-bold mb-2">
                      End Date:
                    </label>
                    <DatePicker
                      selected={values.endDate}
                      onChange={date => setFieldValue("endDate", date)}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      dateFormat="dd/MM/yyyy"
                      minDate={
                        values.startDate
                          ? new Date(values.startDate).setDate(
                              new Date(values.startDate).getDate() + 1
                            )
                          : new Date()
                      }
                    />
                    <span className="text-Strawberry_red text-sm">
                      <ErrorMessage name="endDate" />
                    </span>
                  </div>

                  <div className="col-span-2">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                      disabled={!isValid}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  )
}

export default AddOffer
