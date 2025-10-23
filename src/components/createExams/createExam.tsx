"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import SubmitBtn from "@/components/ui/SubmitBtn/SubmitBtn";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AddExam } from "@/Apis/exam/addExam";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import NotAuth from "../ui/NotAuth/NotAuth";

interface ExamForm {
  title: string;
  description: string;
  duration: string;
  classLevel: string;
  startDate: string;
  endDate: string;
  isPublished: boolean;
  questions: any[]; // ✅ Added this field to match backend type
}

const allowedLevels = [
  "select class level",
  "Grade 1 Secondary",
  "Grade 2 Secondary",
  "Grade 3 Secondary",
];

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  duration: Yup.number()
    .typeError("Duration must be a number")
    .positive("Duration must be greater than 0")
    .required("Duration is required"),
  classLevel: Yup.string()
    .oneOf(allowedLevels, "Invalid class level")
    .required("Class level is required"),
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string().required("End date is required"),
  isPublished: Yup.boolean(),
});

const CreateExam = () => {
  const { userData } = useSelector((state: RootState) => state.user);
  const isAdmin = userData?.role === "admin";
  const route = useRouter();
  const [loading, setLoading] = useState(false);

  const initialValues: ExamForm = {
    title: "",
    description: "",
    duration: "",
    classLevel: allowedLevels[0],
    startDate: "",
    endDate: "",
    isPublished: false,
    questions: [], // ✅ Added to initial form values
  };

  const handleSubmit = async (values: ExamForm) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        duration: Number(values.duration),
        questions: values.questions || [], // ✅ Ensure questions always included
      };

      const response = await AddExam(payload);

      if (response?.success) {
        toast.success("✅ Exam added successfully!");
        console.log("Success:", response.data);
        route.push("/create-quiz/");
      } else {
        toast.error(
          `❌ Failed to add exam: ${response?.message || "Unknown error"}`
        );
        console.error("Error response:", response);
      }
    } catch (error: any) {
      console.error("Full error:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      console.error("Error message:", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-600 dark:text-blue-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Add New Exam
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Create a new exam for your students
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={true}
            validateOnBlur={true}
            validateOnMount={true}
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Title
                  </label>
                  <Field
                    id="title"
                    name="title"
                    placeholder="Enter exam title"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  />
                  <div className="text-red-500 text-sm mt-1">
                    <ErrorMessage name="title" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Description
                  </label>
                  <Field
                    id="description"
                    as="textarea"
                    name="description"
                    rows="3"
                    placeholder="Enter exam description"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  />
                  <div className="text-red-500 text-sm mt-1">
                    <ErrorMessage name="description" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="duration"
                    className="block mb-2 font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Duration (minutes)
                  </label>
                  <Field
                    id="duration"
                    name="duration"
                    type="number"
                    placeholder="Enter duration in minutes"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  />
                  <div className="text-red-500 text-sm mt-1">
                    <ErrorMessage name="duration" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="classLevel"
                    className="block mb-2 font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Class Level
                  </label>
                  <Field
                    id="classLevel"
                    as="select"
                    name="classLevel"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  >
                    {allowedLevels.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </Field>
                  <div className="text-red-500 text-sm mt-1">
                    <ErrorMessage name="classLevel" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="startDate"
                      className="block mb-2 font-semibold text-gray-700 dark:text-gray-200"
                    >
                      Start Date
                    </label>
                    <Field
                      id="startDate"
                      name="startDate"
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                    />
                    <div className="text-red-500 text-sm mt-1">
                      <ErrorMessage name="startDate" />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="endDate"
                      className="block mb-2 font-semibold text-gray-700 dark:text-gray-200"
                    >
                      End Date
                    </label>
                    <Field
                      id="endDate"
                      name="endDate"
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                    />
                    <div className="text-red-500 text-sm mt-1">
                      <ErrorMessage name="endDate" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                  <input
                    id="isPublished"
                    type="checkbox"
                    checked={values.isPublished}
                    onChange={(e) =>
                      setFieldValue("isPublished", e.target.checked)
                    }
                    className="w-5 h-5 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:bg-slate-600"
                  />
                  <label
                    htmlFor="isPublished"
                    className="font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Publish Exam
                  </label>
                </div>

                <SubmitBtn
                  isLoading={loading || isSubmitting}
                  btnName={"Add Exam"}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <NotAuth />
      </div>
    );
  }
};

export default CreateExam;
