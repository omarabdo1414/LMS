"use client";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import ErrorMsg from "../../ui/ErrorMsg/ErrorMsg";
import SubmitBtn from "../../ui/SubmitBtn/SubmitBtn";
import { addLessonSchema } from "@/validations/validations";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { addLesson } from "@/Apis/lessons/addLesson";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getUserProfile } from "@/redux/userSlice";
import { classLevel, roles } from "@/constants/enums";
import LoadingPage from "../../ui/loading/loading";
import { Plus, TriangleAlert } from "lucide-react";
import NotAuth from "../../ui/NotAuth/NotAuth";
import { ILessonForm } from "@/constants/interfaces";
type Tlesson = {
  title: string;
  description: string;
  video: string;
  classLevel: string;
  price: number;
};
export default function AddLesson() {
  let { userData , loading } = useSelector((state: RootState) => state.user);
  let disp = useDispatch<AppDispatch>();
  let date = new Date();
  date.setDate(date.getDate() + 1);
  let newDate = date.toISOString();
  let router = useRouter();
  // loadingBtn
  let [isLoading, setLoading] = useState<boolean>(false);
  //addlesson
  let handleForm = async (values: Tlesson) => {
    // body in api
    let body: ILessonForm = {
      title: values.title,
      description: values.description,
      video: values.video,
      classLevel: values.classLevel,
      price: values.price,
      scheduledDate: newDate,
    };
    setLoading(true);
    let data = await addLesson(body);
    if (data.success === true) {
      setLoading(false);
      // success
      toast.success(data.message);
      router.replace("/lessons");
    } else {
      setLoading(false);
      // fail
      toast.error(data.message);
    }
  };
  let formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      video: "",
      classLevel: classLevel.G1,

      price: 0,
    },
    onSubmit: handleForm,
    validationSchema: addLessonSchema,
  });
  useEffect(() => {
    disp(getUserProfile());
  }, []);
  return (
    <>
      {!loading ? (
        userData?.role === roles.ADMIN ||
        userData?.role === roles.SUPER_ADMIN ? (
          // if user's role admin or super admin
          <form onSubmit={formik.handleSubmit} className="form">
            <div className="w-16 h-16 bg-accent/15 rounded-full mx-auto flex justify-center items-center text-accent">
            <Plus className="w-7 h-7"/>
            </div>
            {/* header */}
            <h1 className="text-2xl md:text-3xl  font-bold text-center mt-3">
              Add New Course
            </h1>
            <p className="text-center my-1.5">Create a new course for your students</p>
            {/* title */}
            <div className="mt-5">
              <label
                className={
                  formik.errors.title && formik.touched.title
                    ? "text-error font-semibold"
                    : "font-semibold"
                }
                htmlFor="title"
              >
                Title
              </label>
              <input
                className={
                  formik.errors.title && formik.touched.title
                    ? "form-input-error"
                    : "form-input "
                }
                type="text"
                placeholder="Entet title"
                name="title"
                id="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.title && formik.touched.title ? (
                <ErrorMsg msg={formik.errors.title} />
              ) : (
                ""
              )}
            </div>
            {/* Description */}
            <div className="my-3">
              <label
                className={
                  formik.errors.description && formik.touched.description
                    ? "text-error font-semibold"
                    : "font-semibold"
                }
                htmlFor="description"
              >
                Description
              </label>
              <input
                className={
                  formik.errors.description && formik.touched.description
                    ? "form-input-error"
                    : "form-input "
                }
                type="text"
                placeholder="Entet Description"
                name="description"
                id="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.description && formik.touched.description ? (
                <ErrorMsg msg={formik.errors.description} />
              ) : (
                ""
              )}
            </div>
            {/* video */}
            <div className="my-3">
              <label
                className={
                  formik.errors.video && formik.touched.video
                    ? "text-error font-semibold"
                    : "font-semibold"
                }
                htmlFor="video"
              >
                Video
              </label>
              <input
                className={
                  formik.errors.video && formik.touched.video
                    ? "form-input-error"
                    : "form-input "
                }
                type="url"
                placeholder="Entet video url"
                name="video"
                id="video"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.video && formik.touched.video ? (
                <ErrorMsg msg={formik.errors.video} />
              ) : (
                ""
              )}
            </div>
            {/* price */}
            <div className="my-3">
              <label
                className={
                  formik.errors.price && formik.touched.price
                    ? "text-error font-semibold"
                    : "font-semibold"
                }
                htmlFor="price"
              >
                price
              </label>
              <input
                className={
                  formik.errors.price && formik.touched.price
                    ? "form-input-error"
                    : "form-input "
                }
                type="number"
                placeholder="Entet price"
                name="price"
                id="price"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.price && formik.touched.price ? (
                <ErrorMsg msg={formik.errors.price} />
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
                value={formik.values.classLevel}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option disabled value="Select Class Level">
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

            {/* Add Lesson */}
            <div className="my-3 text-center">
              <SubmitBtn
                isLoading={isLoading}
                btnName="Add Lesson"
                className="w-full"
              />
            </div>
          </form>
        ) : (
          // if user's role user
          <NotAuth />
        )
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
