"use client";
import React, { useState } from "react";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import SubmitBtn from "../SubmitBtn/SubmitBtn";
import { forgetPasswodSchema } from "@/validations/validations";
import { IForgetPass } from "@/constants/interfaces";
import { useFormik } from "formik";
import { forgetPassword } from "@/Apis/auth/forgetPassword";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ForgetPass() {
  let router = useRouter();
  // loadingBtn
  let [isLoading, setLoading] = useState<boolean>(false);
  // submit form
  let handleForm = async (values: IForgetPass) => {
    setLoading(true);
    let data = await forgetPassword(values);
    setLoading(false);
    console.log(data);
    if (data.success === true) {
      //1-success message
      toast.success(data.message);
      //2-navigate to home
      router.push("/reset-password");
    } else {
      toast.error(data.message);
    }
  };
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: handleForm,
    validationSchema: forgetPasswodSchema,
  });
  return (
    <form onSubmit={formik.handleSubmit} className="form">
      {/* header */}
      <h1 className="text-2xl md:text-3xl font-bold text-center my-3">
        Forget Password
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

      {/* submit */}
      <div className="my-3 text-center">
        <SubmitBtn
          isLoading={isLoading}
          btnName="Send Otp"
          className="w-full"
        />
      </div>
    </form>
  );
}
