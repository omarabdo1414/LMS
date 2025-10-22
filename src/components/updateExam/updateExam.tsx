"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import SubmitBtn from "@/components/ui/SubmitBtn/SubmitBtn";
import { updateExam } from "@/Apis/exam/updateExam";
import { useRouter } from "next/navigation";

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
});

const UpdateExam = () => {
  const router = useRouter();
  const exam = useSelector((state: RootState) => state.examData.currentExam);

  if (!exam) {
    return (
      <div className="text-center mt-10 text-red-500">
        ⚠️ No exam selected. Please go back to exam list.
      </div>
    );
  }

  const handleSubmit = async (values: any) => {
    const res = await updateExam(exam._id, {
      ...values,
      duration: Number(values.duration),
    });
    if (res?.success) {
      toast.success("✅ Exam updated successfully!");
      router.push("/Exams/getExams");
    } else {
      toast.error("❌ Failed to update exam");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Update Exam</h1>
          <p className="text-gray-600">Modify exam details and settings</p>
        </div>

      <Formik
        initialValues={{
          title: exam.title,
          description: exam.description,
          duration: exam.duration,
          classLevel: exam.classLevel,
          startDate: exam.startDate.slice(0, 10),
          endDate: exam.endDate.slice(0, 10),
          isPublished: exam.isPublished,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Title</label>
              <Field 
                name="title" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                placeholder="Enter exam title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Description</label>
              <Field
                as="textarea"
                name="description"
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                placeholder="Enter exam description"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Duration (minutes)</label>
              <Field
                type="number"
                name="duration"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter duration in minutes"
              />
              <ErrorMessage
                name="duration"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Class Level</label>
              <Field
                as="select"
                name="classLevel"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                {allowedLevels.map((lvl) => (
                  <option key={lvl}>{lvl}</option>
                ))}
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Start Date</label>
                <Field 
                  name="startDate" 
                  type="date" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">End Date</label>
                <Field 
                  name="endDate" 
                  type="date" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                />
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <input
                id="isPublished"
                type="checkbox"
                checked={values.isPublished}
                onChange={(e) => setFieldValue("isPublished", e.target.checked)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isPublished" className="font-semibold text-gray-700">
                Publish Exam
              </label>
            </div>

            <SubmitBtn
              isLoading={isSubmitting}
              btnName={"Update Exam"}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            />
          </Form>
        )}
      </Formik>
      </div>
    </div>
  );
};

export default UpdateExam;
