import { classLevel } from "@/constants/enums";
import * as Yup from "yup";
// signup schema
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
// login schema
export let loginSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Enter valid email"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "password minLength is 8 and must contain one or more Capital character and one or more Special character"
    ),
});
// forgetpassword schema
export let forgetPasswodSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Enter valid email"),
});
// resetpassword schema
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
    .oneOf(
      [Yup.ref("newPassword")],
      "confirm password not match with password"
    ),
  otp: Yup.string()
    .required("Otp is required")
    .matches(/^[0-9]{5,}$/, "enter valid otp"),
});
// addlesson schema
export let addLessonSchema = Yup.object({
  title: Yup.string()
    .required("title is required")
    .min(3, "minLength is 3 characters"),
  description: Yup.string()
    .required("description is required")
    .min(20, "minLength is 15 characters"),
  price: Yup.number().required("price is required"),
  video: Yup.string()
    .required("video is required")
    .matches(
      /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/,
      "enter valid url"
    ),
  classLevel: Yup.string()
    .required("classLevel is required")
    .oneOf(Object.values(classLevel), "pleace select grade"),
});
// updatelesson schema
export let updateLessonSchema = Yup.object({
  title: Yup.string()
    .required("title is required")
    .min(3, "minLength is 3 characters"),
  description: Yup.string()
    .min(20, "minLength is 15 characters"),
  price: Yup.number(),
  video: Yup.string()
    .matches(
      /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/,
      "enter valid url"
    ),
  classLevel: Yup.string()
    .oneOf(Object.values(classLevel), "pleace select grade"),
});
