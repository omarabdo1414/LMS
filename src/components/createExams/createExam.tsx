"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import SubmitBtn from "@/components/ui/SubmitBtn/SubmitBtn";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AddExam } from "@/Apis/exam/addExam";
import { ExamForm } from "@/constants/interfaces";

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
  const [loading, setLoading] = useState(false);

  const initialValues: ExamForm = {
    title: "",
    description: "",
    duration: "",
    classLevel: allowedLevels[0],
    startDate: "",
    endDate: "",
    isPublished: false,
  };

  const handleSubmit = async (values: ExamForm) => {
    setLoading(true);
    try {
      // ensure duration is a number when sending
      const payload = {
        ...values,
        duration: Number(values.duration),
      };
      const response = await AddExam(payload);
      if (response?.success) {
        toast.success("✅ Exam added successfully!");
        console.log("Success:", response.data);
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

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
      <h1 className="text-2xl text-center font-bold mb-6">Add New Exam</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
        validateOnMount={true}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="title" className="block mb-1 font-medium">
                Title
              </label>
              <Field
                id="title"
                name="title"
                placeholder="Exam Title"
                className="border p-2 rounded w-full"
              />
              <div className="text-red-500 text-sm">
                <ErrorMessage name="title" />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block mb-1 font-medium">
                Description
              </label>
              <Field
                id="description"
                as="textarea"
                name="description"
                placeholder="Exam Description"
                className="border p-2 rounded w-full"
              />
              <div className="text-red-500 text-sm">
                <ErrorMessage name="description" />
              </div>
            </div>

            <div>
              <label htmlFor="duration" className="block mb-1 font-medium">
                Duration (minutes)
              </label>
              <Field
                id="duration"
                name="duration"
                type="number"
                placeholder="Duration (minutes)"
                className="border p-2 rounded w-full"
              />
              <div className="text-red-500 text-sm">
                <ErrorMessage name="duration" />
              </div>
            </div>

            <div>
              <label htmlFor="classLevel" className="block mb-1 font-medium">
                Class Level
              </label>
              <Field
                id="classLevel"
                as="select"
                name="classLevel"
                className="w-full h-10 border rounded-sm bg-input dark:bg-slate-800 focus:outline-none px-1 text-slate-800 dark:text-slate-300 border-gray-300 dark:border-gray-600"
              >
                {allowedLevels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </Field>
              <div className="text-red-500 text-sm">
                <ErrorMessage name="classLevel" />
              </div>
            </div>

            <div>
              <label htmlFor="startDate" className="block mb-1 font-medium">
                Start Date
              </label>
              <Field
                id="startDate"
                name="startDate"
                type="date"
                className="border p-2 rounded w-full"
              />
              <div className="text-red-500 text-sm">
                <ErrorMessage name="startDate" />
              </div>
            </div>

            <div>
              <label htmlFor="endDate" className="block mb-1 font-medium">
                End Date
              </label>
              <Field
                id="endDate"
                name="endDate"
                type="date"
                className="border p-2 rounded w-full"
              />
              <div className="text-red-500 text-sm">
                <ErrorMessage name="endDate" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="isPublished"
                type="checkbox"
                checked={values.isPublished}
                onChange={(e) => setFieldValue("isPublished", e.target.checked)}
              />
              <label htmlFor="isPublished">Publish Exam</label>
            </div>

            <SubmitBtn
              isLoading={loading || isSubmitting}
              btnName={"Add Exam"}
              className="w-full h-10"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateExam;
