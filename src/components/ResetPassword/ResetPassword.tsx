"use client";
import React, { useState } from "react";
import SubmitBtn from "../SubmitBtn/SubmitBtn";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import { useFormik } from "formik";
import { IResetPass } from "@/constants/interfaces";
import { resetPasswodSchema } from "@/validations/validations";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/app/apis/auth/resetPassword";
import toast from "react-hot-toast";
import { EyeIcon, EyeOff } from "lucide-react";

export default function ResetPass() {
  // visible password
  let [visiblePass, setVisblePass] = useState<boolean>(false);
  // visible confirm password
  let [visibleCPass, setVisbleCPass] = useState<boolean>(false);
  let router = useRouter();
  let [isLoading, setLoading] = useState<boolean>(false);
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
  // submit form
  let handleForm = async (values: IResetPass) => {
    setLoading(true);
    let data = await resetPassword(values);
    if (data.success === true) {
      setLoading(false);
      // success
      toast.success(data.message);
      router.push("/login");
    } else {
      setLoading(false);
      // fail
      toast.error(data.message);
    }
  };
  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
      cpassword: "",
      otp: "",
    },
    onSubmit: handleForm,
    validationSchema: resetPasswodSchema,
  });
  return (
    <form onSubmit={formik.handleSubmit} className="form">
      <h1 className="text-2xl md:text-3xl font-bold text-center my-3">
        Reset Password
      </h1>

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
            formik.errors.newPassword && formik.touched.newPassword
              ? "text-error font-semibold"
              : "font-semibold"
          }
          htmlFor="newPassword"
        >
          New Password
        </label>
        <div className="relative">
          <input
            className={
              formik.errors.newPassword && formik.touched.newPassword
                ? " form-input-error"
                : " form-input "
            }
            type={visiblePass ? "text" : "password"}
            placeholder="Example@123456"
            name="newPassword"
            id="newPassword"
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
        {formik.errors.newPassword && formik.touched.newPassword ? (
          <ErrorMsg msg={formik.errors.newPassword} />
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

      {/* otp */}
      <div className="my-3">
        <label
          className={
            formik.errors.otp && formik.touched.otp
              ? "text-error font-semibold"
              : "font-semibold"
          }
          htmlFor="otp"
        >
          Otp
        </label>
        <input
          className={
            formik.errors.otp && formik.touched.otp
              ? " form-input-error"
              : " form-input "
          }
          placeholder="enter otp"
          name="otp"
          id="otp"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.errors.otp && formik.touched.otp ? (
          <ErrorMsg msg={formik.errors.otp} />
        ) : (
          ""
        )}
      </div>

      {/* reset pass */}
      <div className="my-3 text-center">
        <SubmitBtn
          isLoading={isLoading}
          btnName="Reset Password"
          className="w-full"
        />
      </div>
    </form>
  );
}
