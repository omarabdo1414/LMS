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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 max-w-md mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600 dark:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Exam Selected</h2>
            <p className="text-red-600 dark:text-red-400 mb-4">Please go back to exam list to select an exam.</p>
            <button 
              onClick={() => router.push('/Exams/getExams')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Back to Exams
            </button>
          </div>
        </div>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Update Exam</h1>
          <p className="text-gray-600 dark:text-gray-300">Modify exam details and settings</p>
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
              <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">Title</label>
              <Field 
                name="title" 
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                placeholder="Enter exam title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">Description</label>
              <Field
                as="textarea"
                name="description"
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                placeholder="Enter exam description"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">Duration (minutes)</label>
              <Field
                type="number"
                name="duration"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                placeholder="Enter duration in minutes"
              />
              <ErrorMessage
                name="duration"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">Class Level</label>
              <Field
                as="select"
                name="classLevel"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              >
                {allowedLevels.map((lvl) => (
                  <option key={lvl}>{lvl}</option>
                ))}
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">Start Date</label>
                <Field 
                  name="startDate" 
                  type="date" 
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">End Date</label>
                <Field 
                  name="endDate" 
                  type="date" 
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-slate-700 text-gray-900 dark:text-white" 
                />
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <input
                id="isPublished"
                type="checkbox"
                checked={values.isPublished}
                onChange={(e) => setFieldValue("isPublished", e.target.checked)}
                className="w-5 h-5 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:bg-slate-600"
              />
              <label htmlFor="isPublished" className="font-semibold text-gray-700 dark:text-gray-200">
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
