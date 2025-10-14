"use client";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import { EyeIcon, EyeOff, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { ISignup, ISignupForm } from "@/constants/interfaces";
import { createAccount } from "@/Apis/auth/register";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import SubmitBtn from "../SubmitBtn/SubmitBtn";
import { signupSchema } from "@/validations/validations";
export default function SignupForm() {
  let router = useRouter();
  // visible password
  let [visiblePass, setVisblePass] = useState<boolean>(false);
  // visible confirm password
  let [visibleCPass, setVisbleCPass] = useState<boolean>(false);
  // loadingBtn
  let [isLoading, setLoading] = useState<boolean>(false);
  //signup
  let handleForm = async (values: ISignupForm) => {
    // body in api
    let body: ISignup = {
      fullName: values.fName + " " + values.lName,
      email: values.email,
      password: values.password,
      cpassword: values.cpassword,
      phoneNumber: values.phoneNumber,
      classLevel: values.classLevel,
    };
    setLoading(true);
    let data = await createAccount(body);
    setLoading(false);
    if (data.success === true) {
      // success
      toast.success(data.message);
      router.push("/login");
    } else {
      // fail
      toast.error(data.message);
    }
  };
  // visible password function
  let handleVisiblePassword = (
    setState: React.Dispatch<React.SetStateAction<boolean>>,
    visible: boolean
  ) => {
    if (visible) {
      setState(false);
    } else {
      setState(true);
    }
  };
  let formik = useFormik({
    initialValues: {
      fName: "",
      lName: "",
      email: "",
      password: "",
      cpassword: "",
      phoneNumber: "",
      classLevel: "",
    },
    onSubmit: handleForm,
    validationSchema: signupSchema,
  });
  return (
    <form onSubmit={formik.handleSubmit} className="form">
      {/* header */}
      <h1 className="text-2xl md:text-3xl  font-bold text-center my-3">
        Create your account
      </h1>

      {/* name */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* first Name */}
        <div>
          <label
            className={
              formik.errors.fName && formik.touched.fName
                ? "text-error font-semibold"
                : "font-semibold"
            }
            htmlFor="fName"
          >
            First Name
          </label>
          <input
            className={
              formik.errors.fName && formik.touched.fName
                ? "form-input-error"
                : "form-input "
            }
            type="text"
            placeholder="Ahmed"
            name="fName"
            id="fName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.fName && formik.touched.fName ? (
            <ErrorMsg msg={formik.errors.fName} />
          ) : (
            ""
          )}
        </div>

        {/* Last Name */}
        <div>
          <label
            className={
              formik.errors.lName && formik.touched.lName
                ? "text-error font-semibold"
                : "font-semibold"
            }
            htmlFor="lName"
          >
            Last Name
          </label>
          <input
            className={
              formik.errors.lName && formik.touched.lName
                ? "form-input-error"
                : "form-input "
            }
            type="text"
            placeholder="Ali"
            name="lName"
            id="lName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.lName && formik.touched.lName ? (
            <ErrorMsg msg={formik.errors.lName} />
          ) : (
            ""
          )}
        </div>
      </div>

      {/* email */}
      <div className="my-3">
        <label
          className={
            formik.errors.email && formik.touched.email
              ? "text-error font-semibold"
              : "font-semibold"
          }
          htmlFor="email"
        >
          Email
        </label>
        <input
          className={
            formik.errors.email && formik.touched.email
              ? "form-input-error"
              : "form-input "
          }
          type="email"
          placeholder="example@gmail.com"
          name="email"
          id="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email && formik.touched.email ? (
          <ErrorMsg msg={formik.errors.email} />
        ) : (
          ""
        )}
      </div>

      {/* password */}
      <div className="my-3">
        <label
          className={
            formik.errors.password && formik.touched.password
              ? "text-error font-semibold"
              : "font-semibold"
          }
          htmlFor="password"
        >
          Password
        </label>
        <div className="relative">
          <input
            className={
              formik.errors.password && formik.touched.password
                ? " form-input-error"
                : " form-input "
            }
            type={visiblePass ? "text" : "password"}
            placeholder="Example@123456"
            name="password"
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div
            onClick={() => {
              handleVisiblePassword(setVisblePass, visiblePass);
            }}
            className="absolute top-1/2 -translate-y-1/2 right-2 
            hover:bg-slate-300 dark:hover:bg-slate-700 rounded-sm cursor-pointer"
          >
            {visiblePass ? (
              <EyeIcon className="w-5 h-5" />
            ) : (
              <EyeOff className="w-5 h-5" />
            )}
          </div>
        </div>
        {formik.errors.password && formik.touched.password ? (
          <ErrorMsg msg={formik.errors.password} />
        ) : (
          ""
        )}
      </div>

      {/* cPassword */}
      <div className="my-3">
        <label
          className={
            formik.errors.cpassword && formik.touched.cpassword
              ? "text-error font-semibold"
              : "font-semibold"
          }
          htmlFor="cpassword"
        >
          Confirm password
        </label>
        <div className="relative">
          <input
            className={
              formik.errors.cpassword && formik.touched.cpassword
                ? "pass form-input-error"
                : "pass form-input "
            }
            type={visibleCPass ? "text" : "password"}
            placeholder="Example@123456"
            name="cpassword"
            id="cpassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div
            onClick={() => {
              handleVisiblePassword(setVisbleCPass, visibleCPass);
            }}
            className="absolute top-1/2 -translate-y-1/2 right-2 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-sm cursor-pointer"
          >
            {visibleCPass ? (
              <EyeIcon className="w-5 h-5" />
            ) : (
              <EyeOff className="w-5 h-5" />
            )}
          </div>
        </div>
        {formik.errors.cpassword && formik.touched.cpassword ? (
          <ErrorMsg msg={formik.errors.cpassword} />
        ) : (
          ""
        )}
      </div>

      {/* phone */}
      <div className="my-3">
        <label
          className={
            formik.errors.phoneNumber && formik.touched.phoneNumber
              ? "text-error font-semibold"
              : "font-semibold"
          }
          htmlFor="phoneNumber"
        >
          Phone Number
        </label>
        <input
          className={
            formik.errors.phoneNumber && formik.touched.phoneNumber
              ? "form-input-error"
              : "form-input"
          }
          type="tel"
          placeholder="01234567890"
          name="phoneNumber"
          id="phoneNumber"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.phoneNumber && formik.touched.phoneNumber ? (
          <ErrorMsg msg={formik.errors.phoneNumber} />
        ) : (
          ""
        )}
      </div>

      {/* class level */}
      <div className="my-3">
        <select
          className="w-full h-10 border rounded-sm bg-input dark:bg-slate-800 focus:outline-none  px-1 text-slate-800 dark:text-slate-300 border-gray-300 dark:border-gray-600 "
          name="classLevel"
          id="classLevel"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          defaultValue="Grade 1 Secondary"
        >
<<<<<<< HEAD
          <option  disabled value="Select Class Level">
=======
          <option disabled value="Select Class Level">
>>>>>>> deb8af8d14857d6b1df45a843dbef12be9662140
            Select Class Level
          </option>
          <option value="Grade 1 Secondary">Grade 1 Secondary</option>
          <option value="Grade 2 Secondary">Grade 2 Secondary</option>
          <option value="Grade 3 Secondary">Grade 3 Secondary</option>
        </select>
        {formik.errors.classLevel && formik.touched.classLevel ? (
          <ErrorMsg msg={formik.errors.classLevel} />
        ) : (
          ""
        )}
      </div>

      {/* signup */}
      <div className="my-3 text-center">
        <SubmitBtn isLoading={isLoading} btnName="Signup" className="w-full" />
      </div>

      {/* login */}
      <div className="my-3 text-center font-semibold">
        <p>
          Already have an account?{" "}
          <Link className="underline hover:text-accent hover:font-bold" href="/login">
            login
          </Link>{" "}
        </p>
      </div>
    </form>
  );
}
