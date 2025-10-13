import { classLevel } from "@/constants/enums";
import * as Yup from "yup";
export let signupSchema = Yup.object({
  fName: Yup.string()
    .required("First Name is required")
    .min(3, "minlength is 3"),
  lName: Yup.string()
    .required("Last Name is required")
    .min(3, "minlength is 3"),
  email: Yup.string().required("Email is required").email("Enter valid email"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "password minLength is 8 and must contain one or more Capital , small character and one or more Special character"
    ),
  cpassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "confirm password not match with password"),
  phoneNumber: Yup.string()
    .required("Phone is required")
    .matches(/^01[0125][0-9]{8}$/, "enter valid phone"),
  classLevel: Yup.string()
    .required("classLevel is required")
    .oneOf(Object.values(classLevel), "pleace select grade"),
});
export let loginSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Enter valid email"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "password minLength is 8 and must contain one or more Capital character and one or more Special character"
    ),
});
export let forgetPasswodSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Enter valid email"),
});
export let resetPasswodSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Enter valid email"),
  newPassword: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "password minLength is 8 and must contain one or more Capital , small character and one or more Special character"
    ),
  cpassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("newPassword")], "confirm password not match with password"),
  otp: Yup.string()
    .required("Otp is required")
    .matches(/^[0-9]{5,}$/, "enter valid otp"),
});

// change password
export let changePasswordSchema = Yup.object({
  oldPassword: Yup.string()
    .required("Old password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password minLength is 8 and must contain at least one uppercase, one lowercase, one number, and one special character"
    ),
  confirmPassword: Yup.string()
    .required("Please confirm your new password")
    .oneOf([Yup.ref("newPassword")], "Confirm password must match new password"),
});