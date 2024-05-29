import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';

const HotelAddForm: React.FC = () => {
  const amenitiesList = [
    "Swimming Pool",
    "Gym",
    "Spa",
    "Restaurant",
    "Parking",
  ];

  const reservationTypes = [
    "instant",
    "approveDecline",
  ];

  const [propertyRules, setPropertyRules] = useState<string[]>([]);
  const [newRule, setNewRule] = useState("");

  const addPropertyRule = () => {
    if (newRule.trim() !== "") {
      setPropertyRules([...propertyRules, newRule]);
      setNewRule("");
    }
  };

  const removePropertyRule = (index: number) => {
    setPropertyRules(propertyRules.filter((_, i) => i !== index));
  };

  return (
    <Formik
      initialValues={{
        name: "",
        type: "",
        address: {
          flatName: "",
          streetAddress: "",
          landMark: "",
          district: "",
          city: "",
          pincode: "",
          country: "",
        },
        bedroom: 0,
        bed: 0,
        bathroom: 0,
        guests: 0,
        price: "",
        description: "",
        amenities: [],
        images: [],
        reservationType: "",
      }}
      onSubmit={values => {
        const formData = {
          ...values,
          propertyrules: propertyRules,
        };
        console.log(formData);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          
          <div>
            <label htmlFor="name">Name</label>
            <Field className="bg-red-500" id="name" name="name" />
          </div>

          <div>
            <label htmlFor="type">Type</label>
            <Field className="bg-red-500" id="type" name="type" />
          </div>

          <div>
            <label htmlFor="flatName">Flat Name</label>
            <Field className="bg-red-500" id="flatName" name="address.flatName" />
          </div>

          <div>
            <label htmlFor="streetAddress">Street Address</label>
            <Field className="bg-red-500" id="streetAddress" name="address.streetAddress" />
          </div>

          <div>
            <label htmlFor="landMark">Land Mark</label>
            <Field className="bg-red-500" id="landMark" name="address.landMark" />
          </div>

          <div>
            <label htmlFor="district">District</label>
            <Field className="bg-red-500" id="district" name="address.district" />
          </div>

          <div>
            <label htmlFor="city">City</label>
            <Field className="bg-red-500" id="city" name="address.city" />
          </div>

          <div>
            <label htmlFor="pincode">Pincode</label>
            <Field className="bg-red-500" id="pincode" name="address.pincode" />
          </div>

          <div>
            <label htmlFor="country">Country</label>
            <Field className="bg-red-500" id="country" name="address.country" />
          </div>

          <div>
            <label htmlFor="bedroom">Bedroom</label>
            <div className="flex items-center">
              <button
                type="button"
                className="bg-gray-200 px-2"
                onClick={() => setFieldValue('bedroom', Math.max(0, values.bedroom - 1))}
              >
                -
              </button>
              <span className="mx-2">{values.bedroom}</span>
              <button
                type="button"
                className="bg-gray-200 px-2"
                onClick={() => setFieldValue('bedroom', values.bedroom + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="bed">Bed</label>
            <div className="flex items-center">
              <button
                type="button"
                className="bg-gray-200 px-2"
                onClick={() => setFieldValue('bed', Math.max(0, values.bed - 1))}
              >
                -
              </button>
              <span className="mx-2">{values.bed}</span>
              <button
                type="button"
                className="bg-gray-200 px-2"
                onClick={() => setFieldValue('bed', values.bed + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="bathroom">Bathroom</label>
            <div className="flex items-center">
              <button
                type="button"
                className="bg-gray-200 px-2"
                onClick={() => setFieldValue('bathroom', Math.max(0, values.bathroom - 1))}
              >
                -
              </button>
              <span className="mx-2">{values.bathroom}</span>
              <button
                type="button"
                className="bg-gray-200 px-2"
                onClick={() => setFieldValue('bathroom', values.bathroom + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="guests">Guests</label>
            <div className="flex items-center">
              <button
                type="button"
                className="bg-gray-200 px-2"
                onClick={() => setFieldValue('guests', Math.max(0, values.guests - 1))}
              >
                -
              </button>
              <span className="mx-2">{values.guests}</span>
              <button
                type="button"
                className="bg-gray-200 px-2"
                onClick={() => setFieldValue('guests', values.guests + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="price">Price</label>
            <Field className="bg-red-500" id="price" name="price" />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <Field className="bg-red-500" id="description" name="description" />
          </div>

          <div>
            <label htmlFor="amenities">Amenities</label>
            {amenitiesList.map((amenity, index) => (
              <label key={index} className="inline-flex items-center">
                <Field
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-purple-600"
                  name="amenities"
                  value={amenity}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFieldValue("amenities", [...values.amenities, amenity]);
                    } else {
                      setFieldValue("amenities", values.amenities.filter((item) => item !== amenity));
                    }
                  }}
                />
                <span className="ml-2 text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>

          <div>
            <label htmlFor="images">Images</label>
            <Field className="bg-red-500" id="images" name="images" />
          </div>

          <div>
            <label htmlFor="propertyrules">Property Rules</label>
            <div className="flex items-center">
              <Field
                type="text"
                className="bg-red-500"
                value={newRule}
                onChange={(e) => setNewRule(e.target.value)}
              />
              <button
                type="button"
                className="bg-gray-200 px-2 ml-2"
                onClick={addPropertyRule}
              >
                Add Rule
              </button>
            </div>
            <ul>
              {propertyRules.map((rule, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">{rule}</span>
                  <button
                    type="button"
                    className="bg-gray-200 px-2 ml-2"
                    onClick={() => removePropertyRule(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <label htmlFor="reservationType">Reservation Type</label>
            {reservationTypes.map((type, index) => (
              <label key={index} className="inline-flex items-center">
                <Field
                  type="radio"
                  className="form-radio h-5 w-5 text-purple-600"
                  name="reservationType"
                  value={type}
                />
                <span className="ml-2 text-gray-700">{type}</span>
              </label>
            ))}

          </div>

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default HotelAddForm;
