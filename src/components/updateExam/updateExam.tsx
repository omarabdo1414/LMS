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
    <div className="max-w-lg mx-auto mt-10 p-6 bg-card rounded-2xl shadow">
      <h1 className="text-2xl text-center font-bold mb-6">Update Exam</h1>

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
          <Form className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Title</label>
              <Field name="title" className="border p-2 rounded w-full" />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Description</label>
              <Field
                as="textarea"
                name="description"
                className="border p-2 rounded w-full"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Duration (minutes)</label>
              <Field
                type="number"
                name="duration"
                className="border p-2 rounded w-full"
              />
              <ErrorMessage
                name="duration"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Class Level</label>
              <Field
                as="select"
                name="classLevel"
                className="w-full h-10 border rounded px-2"
              >
                {allowedLevels.map((lvl) => (
                  <option key={lvl}>{lvl}</option>
                ))}
              </Field>
            </div>

            <div>
              <label className="block mb-1 font-medium">Start Date</label>
              <Field name="startDate" type="date" className="border p-2 rounded w-full" />
            </div>

            <div>
              <label className="block mb-1 font-medium">End Date</label>
              <Field name="endDate" type="date" className="border p-2 rounded w-full" />
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
              isLoading={isSubmitting}
              btnName={"Update Exam"}
              className="w-full h-10"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateExam;
