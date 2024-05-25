import * as yup from "yup";

export const RegisterValidation = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(4, "Minimum 4 characters required")
    .required("Password is required"),
  cpassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const LoginValidation = yup.object().shape({
  email: yup
    .string()
    .required("email is required")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter a valid email address")
    .email("please enter a valid email"),
  password: yup
    .string()
    .min(4, "Minimum 4 characters required")
    .required("password is required"),
});

export const emailValidation = yup.object().shape({
  email: yup
    .string()
    .required("email is required")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter a valid email address")
    .email("please enter a valid email"),
});
export const passwordValidation = yup.object().shape({
  password: yup
    .string()
    .min(4, "Minimum 4 characters required")
    .required("Password is required"),
  cpassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
