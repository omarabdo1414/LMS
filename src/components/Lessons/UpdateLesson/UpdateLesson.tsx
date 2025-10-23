"use client";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import ErrorMsg from "../../ui/ErrorMsg/ErrorMsg";
import SubmitBtn from "../../ui/SubmitBtn/SubmitBtn";
import { updateLessonSchema } from "@/validations/validations";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { classLevel, roles } from "@/constants/enums";
import LoadingPage from "../../ui/loading/loading";
import { updateLesson } from "@/Apis/lessons/updateLesson";
import NotAuth from "../../ui/NotAuth/NotAuth";
type TUpdateLessonProps = {
  lessonId: string;
};
export default function UpdateLesson({ lessonId }: TUpdateLessonProps) {
  let { userData , loading } = useSelector((state: RootState) => state.user);
  let { lessonData } = useSelector((state: RootState) => state.lesson);
  let router = useRouter();
  // loadingBtn
  let [isLoading, setLoading] = useState<boolean>(false);

  //update lesson
  let handleForm = async (values: any) => {
    setLoading(true);
    let data = await updateLesson(lessonId, values);
    console.log(data);
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
      title: lessonData?.title || "",
      description: lessonData?.description || "",
      video: lessonData?.video || "",
      classLevel: (lessonData?.classLevel as classLevel) || classLevel.G1,
      price: lessonData?.price || 0,
    },
    onSubmit: handleForm,
    validationSchema: updateLessonSchema,
  });

  return (
    <>
      {!loading ? (
        userData?.role === roles.ADMIN ||
        userData?.role === roles.SUPER_ADMIN ? (
          // if user's role admin or super admin
          <form onSubmit={formik.handleSubmit} className="form">
            {/* header */}
            <h1 className="text-2xl md:text-3xl  font-bold text-center my-3">
              Update Course
            </h1>
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
                value={formik.values.title}
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
                value={formik.values.description}
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
                value={formik.values.video}
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
                value={formik.values.price}
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

            {/* Update Lesson */}
            <div className="my-3 text-center">
              <SubmitBtn
                isLoading={isLoading}
                btnName="Update Lesson"
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
