"use client";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import ErrorMsg from "../../ui/ErrorMsg/ErrorMsg";
import { EyeIcon, EyeOff } from "lucide-react";
import Link from "next/link";
import { ILoginForm } from "@/constants/interfaces";
import SubmitBtn from "../../ui/SubmitBtn/SubmitBtn";
import { loginSchema } from "@/validations/validations";
import { signin } from "@/Apis/auth/signin";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
export default function LoginForm() {
  let router = useRouter();
  // loadingBtn
  let [isLoading, setLoading] = useState<boolean>(false);
  // visible password
  let [visiblePass, setVisblePass] = useState<boolean>(false);
  //   signIn
  let handleForm = async (values: ILoginForm) => {
    setLoading(true);
    let data = await signin(values);
    if (data.success === true) {
      setLoading(false);
      //1-store token in cookie
      Cookies.set("token", data.token, {
        path: "/",
        expires: 1,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      //2-success message
      toast.success(data.message);
      //3-navigate to home
      router.push("/home");
    } else {
      setLoading(false);
      toast.error(data.message);
    }
  };

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
      email: "",
      password: "",
    },
    onSubmit: handleForm,
    validationSchema: loginSchema,
  });
  return (
    <form onSubmit={formik.handleSubmit} className="form">
      {/* header */}
      <h1 className="text-2xl md:text-3xl font-bold text-center my-3">
        Sign in to your account
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

      {/* forget password */}
      <div className="my-3 font-semibold">
        <Link
          className="hover:text-accent hover:underline hover:font-bold"
          href="/forget-password"
        >
          Forgot your password?
        </Link>
      </div>

      {/* login */}
      <div className="my-3 text-center">
        <SubmitBtn isLoading={isLoading} btnName="Login" className="w-full" />
      </div>

      {/* signup */}
      <div className="my-3 text-center font-semibold">
        <p>
          Don't have an account?{" "}
          <Link
            className="underline hover:text-accent hover:font-bold"
            href="/signup"
          >
            Create new account
          </Link>{" "}
        </p>
      </div>
    </form>
  );
}
