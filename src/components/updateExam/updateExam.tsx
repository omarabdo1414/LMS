"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import SubmitBtn from "@/components/ui/SubmitBtn/SubmitBtn";
import { getExam } from "@/Apis/exam/get-exam";
import { updateExam } from "@/Apis/exam/updateExam";

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

const UpdateExam = () => {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    duration: "",
    classLevel: allowedLevels[0],
    startDate: "",
    endDate: "",
    isPublished: false,
  });

  useEffect(() => {
    const loadExam = async () => {
      const data = await getExam(id as string);
      if (data?.success && data.exam) {
        const exam = data.exam;
        setInitialValues({
          title: exam.title || "",
          description: exam.description || "",
          duration: exam.duration || "",
          classLevel: exam.classLevel || allowedLevels[0],
          startDate: exam.startDate?.slice(0, 10) || "",
          endDate: exam.endDate?.slice(0, 10) || "",
          isPublished: exam.isPublished || false,
        });
      } else {
        toast.error("Failed to load exam data");
      }
      setLoading(false);
    };
    loadExam();
  }, [id]);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const res = await updateExam(id as string, {
        ...values,
        duration: Number(values.duration),
      });
      if (res?.success) {
        toast.success("✅ Exam updated successfully!");
        router.push("/Exams/getExams/");
      } else {
        toast.error("❌ Failed to update exam");
      }
    } catch (error) {
      toast.error("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading exam...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-card rounded-2xl shadow">
      <h1 className="text-2xl text-center font-bold mb-6">Update Exam</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="space-y-4">
            {["title", "description", "duration"].map((field) => (
              <div key={field}>
                <label className="block mb-1 font-medium capitalize">
                  {field}
                </label>
                <Field
                  name={field}
                  as={field === "description" ? "textarea" : "input"}
                  type={field === "duration" ? "number" : "text"}
                  className="border p-2 rounded w-full"
                />
                <div className="text-red-500 text-sm">
                  <ErrorMessage name={field} />
                </div>
              </div>
            ))}

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
              isLoading={loading || isSubmitting}
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
