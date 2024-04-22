import * as yup from "yup";

export const RegisterValidation = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  phone: yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Minimum 10 numbers required")
    .max(10, "Maximum 10 numbers required")
    .required("Phone number is required"),
  password: yup.string().min(4, "Minimum 4 characters required").required("Password is required"),
  cpassword: yup.string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match")
});
