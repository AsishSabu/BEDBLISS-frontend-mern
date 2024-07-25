import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useHotelList from "../../hooks/owner/UseHotelList";
import { OWNER_API } from "../../constants";
import axios from "axios";
import showToast from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { HotelInterface } from "../../types/hotelInterface";

const AddOffer: React.FC = () => {
  const { hotels } = useHotelList();
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    let offer;
    if (values.offerType === "percentage") {
      offer = {
        startDate: values.startDate,
        endDate: values.endDate,
        desc: values.description,
        type: values.offerType,
        minAmount: 0,
        maxAmount: 0,
        amount: values.amount,
      };
    } else {
      offer = {
        startDate: values.startDate,
        endDate: values.endDate,
        desc: values.description,
        type: values.offerType,
        minAmount: values.minAmount,
        maxAmount: values.maxAmount,
        amount: values.amount,
      };
    }
    const responsePromises = values.hotelIds.map((hotelId: string) =>
      axios.patch(`${OWNER_API}/addOffer/${hotelId}`, offer, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
    );

    try {
      const responses = await Promise.all(responsePromises);
      responses.forEach((response) => showToast(response.data.message));
      navigate("/owner/hotels");
    } catch (error) {
      showToast("Failed to add offers", "error");
    }
  };

  const hotelAddValidation = Yup.object().shape({
    description: Yup.string().required("Description is required"),
    hotelIds: Yup.array().min(1, "At least one hotel must be selected").required("Hotel is required"),
    startDate: Yup.date().required("Start Date is required").nullable(),
    endDate: Yup.date()
      .required("End Date is required")
      .nullable()
      .min(Yup.ref("startDate"), "End Date must be at least one day after Start Date"),
    offerType: Yup.string().required("Offer Type is required"),
    amount: Yup.number().when("offerType", {
      is: "percentage",
      then: schema => schema.required("Offer Amount is required").min(1, "Percentage must be between 1 and 100").max(100, "Percentage must be between 1 and 100"),
      otherwise: schema => schema.required("Offer Amount is required").positive("Offer Amount must be positive"),
    }),
    minAmount: Yup.number().when("offerType", {
      is: "flat",
      then: schema => schema.required("Minimum Amount is required").positive("Minimum Amount must be positive"),
    }),
    maxAmount: Yup.number().when("offerType", {
      is: "flat",
      then: schema => schema.required("Maximum Amount is required").positive("Maximum Amount must be positive"),
    }),
  });

  return (
    <div className="container mx-auto px-4 py-6 md:px-8 lg:px-12">
      <Formik
        initialValues={{
          hotelIds: [],
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
          <div className="bg-white shadow-md rounded-lg p-6 md:p-8 lg:p-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">Add Offers</h1>
            <Form>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="text-gray-700 text-lg font-bold mb-2">Offer Type:</label>
                  <Field as="select" name="offerType" className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring">
                    <option value="" label="Select an offer type" />
                    <option value="flat">Flat</option>
                    <option value="percentage">Percentage</option>
                  </Field>
                  <span className="text-red-500 text-sm"><ErrorMessage name="offerType" /></span>
                </div>

                {values.offerType === "percentage" && (
                  <div>
                    <label className="text-gray-700 text-lg font-bold mb-2">Percentage Amount:</label>
                    <Field type="number" name="amount" className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" placeholder="Enter the percentage" />
                    <span className="text-red-500 text-sm"><ErrorMessage name="amount" /></span>
                  </div>
                )}

                {values.offerType === "flat" && (
                  <>
                    <div>
                      <label className="text-gray-700 text-lg font-bold mb-2">Offer Amount:</label>
                      <Field type="number" name="amount" className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" placeholder="Enter the offer amount" />
                      <span className="text-red-500 text-sm"><ErrorMessage name="amount" /></span>
                    </div>
                    <div>
                      <label className="text-gray-700 text-lg font-bold mb-2">Minimum Amount:</label>
                      <Field type="number" name="minAmount" className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" placeholder="Enter the minimum amount" />
                      <span className="text-red-500 text-sm"><ErrorMessage name="minAmount" /></span>
                    </div>
                    <div>
                      <label className="text-gray-700 text-lg font-bold mb-2">Maximum Amount:</label>
                      <Field type="number" name="maxAmount" className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" placeholder="Enter the maximum amount" />
                      <span className="text-red-500 text-sm"><ErrorMessage name="maxAmount" /></span>
                    </div>
                  </>
                )}

                <div className="col-span-2">
                  <label className="text-gray-700 text-lg font-bold mb-2">Description:</label>
                  <Field as="textarea" name="description" className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" placeholder="Enter the description" />
                  <span className="text-red-500 text-sm"><ErrorMessage name="description" /></span>
                </div>

                <div className="col-span-2">
                  <label className="text-gray-700 text-lg font-bold mb-2">Hotels:</label>
                  <div className="flex flex-wrap gap-4">
                    {hotels.map((hotel:HotelInterface, index:number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Field type="checkbox" name="hotelIds" value={hotel._id} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                        <label className="text-gray-700">{hotel.name}</label>
                      </div>
                    ))}
                  </div>
                  <span className="text-red-500 text-sm"><ErrorMessage name="hotelIds" /></span>
                </div>

                <div>
                  <label className="text-gray-700 text-lg font-bold mb-2">Start Date:</label>
                  <DatePicker
                    selected={values.startDate}
                    onChange={date => setFieldValue("startDate", date)}
                    className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                  />
                  <span className="text-red-500 text-sm"><ErrorMessage name="startDate" /></span>
                </div>

                <div>
                  <label className="text-gray-700 text-lg font-bold mb-2">End Date:</label>
                  <DatePicker
                    selected={values.endDate}
                    onChange={date => setFieldValue("endDate", date)}
                    className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                    dateFormat="dd/MM/yyyy"
                    minDate={values.startDate ? new Date(values.startDate).setDate(new Date(values.startDate).getDate() + 1)  as unknown as Date: new Date()}
                  />
                  <span className="text-red-500 text-sm"><ErrorMessage name="endDate" /></span>
                </div>

                <div className="col-span-2">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full md:w-auto"
                    disabled={!isValid}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default AddOffer;
