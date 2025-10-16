"use client";
import { Ilesson } from "@/constants/interfaces";
import Image from "next/image";
import React, { useState } from "react";
import img from "../../../../public/course.svg";
import { payLesson } from "@/Apis/lessons/paylesson";
import toast from "react-hot-toast";
import Prompt from "../../ui/Prompt/Prompt";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import LoadingPage from "../../ui/loading/loading";
import { roles } from "@/constants/enums";
import { removeLesson } from "@/Apis/lessons/deleteLesson";
import { SquarePen, TextAlignCenter, Trash2 } from "lucide-react";
import { setLesson } from "@/redux/lessonSlice";
type TLessonProps = {
  lesson: Ilesson;
  myLessons: Ilesson[];
};
export default function LessonCard({ lesson, myLessons }: TLessonProps) {
  // user role
  let { userData, isLoading } = useSelector((state: RootState) => state.user);
  let router = useRouter();
  let disp = useDispatch<AppDispatch>();
  // loading
  let [loading, setLoading] = useState<boolean>(false);
  // prompt
  let [promptShow, setPrompt] = useState<boolean>(false);
  // prompt type
  let [promptType, setPromptType] = useState<string>("");
  // update and delete
  let [settings, setSettings] = useState<boolean>(false);
  // pay course
  let handlePayment = async (id: string) => {
    setLoading(true);
    let data = await payLesson(id);
    if (data.success === true) {
      setLoading(false);
      window.open(data.paymentUrl, "_self");
      setPrompt(false);
    } else {
      setLoading(false);
      toast.error("Faild to pay pleace try again");
    }
    console.log(data);
  };
  // delete course
  let handleDelete = async (id: string) => {
    setLoading(true);
    let data = await removeLesson(id);
    if (data.success === true) {
      setLoading(false);
      toast.success("Delete lesson successfully");
      setPrompt(false);
      window.location.reload();
    } else {
      setLoading(false);
      toast.error("Faild to delete please try again");
    }
  };

  return (
    <>
      {isLoading ? (
        <div>
          <LoadingPage />
        </div>
      ) : (
        <div className="bg-card border rounded-lg p-4 relative h-full space-y-1.5">
          {/* img and details  */}
          <div>
            {/* img */}
            <Image className="w-full" src={img} alt="lesson" />

            {/* detsils */}
            <div className="space-y-1.5">
              {/* title */}
              <h3 className="text-lg font-bold capitalize line-clamp-1">{lesson.title}</h3>

              {/* discription */}
              <p className="line-clamp-2">{lesson.description}</p>
            </div>
          </div>

          {/* enroll or view course btn */}
          {myLessons.find((item) => item._id === lesson._id) ||
          lesson.isPaid === false ? (
            <>
              {/* view course */}
              <button
                onClick={() => {
                  router.push(
                    myLessons.find((item) => item._id === lesson._id)
                      ? `/my-lessons/${lesson._id}`
                      : `/lessons/${lesson._id}`
                  );
                }}
                className="w-full btn h-9"
              >
                View Course
              </button>
            </>
          ) : (
            <>
              {/* payment */}
              <button
                onClick={() => {
                  setPrompt(true);
                  setPromptType("payment");
                }}
                className="w-full btn h-9"
              >
                Enroll: {lesson.price}EGP
              </button>
            </>
          )}
          {/* paid or free */}
          <div
            className={
              lesson.isPaid &&
              !myLessons.find((item) => item._id === lesson._id)
                ? "absolute top-1.5 right-1.5 w-16 rounded-full bg-amber-500 flex justify-center items-center space-x-1"
                : myLessons.find((item) => item._id === lesson._id)
                ? "absolute top-1.5 right-1.5 w-20 rounded-full bg-accent flex justify-center items-center space-x-1"
                : lesson.isPaid === false
                ? "absolute top-1.5 right-1.5 w-16 rounded-full bg-primary flex justify-center items-center space-x-1"
                : ""
            }
          >
            <div className="bg-white w-2 h-2 rounded-full"></div>
            <span className="text-white">
              {lesson.isPaid &&
              !myLessons.find((item) => item._id === lesson._id)
                ? "Paid"
                : myLessons.find((item) => item._id === lesson._id)
                ? "Owned"
                : lesson.isPaid === false
                ? "Free"
                : ""}
            </span>
          </div>

          {/* update and delete */}
          {userData?.role === roles.ADMIN ||
          userData?.role === roles.SUPER_ADMIN ? (
            <div className="absolute top-1.5 left-1">
              <div
                onClick={() => {
                  settings ? setSettings(false) : setSettings(true);
                }}
                className="bg-slate-200 dark:bg-slate-700 w-7 h-7 rounded-full flex justify-center items-center cursor-pointer relative"
              >
                <TextAlignCenter className="w-3 h-3 " />

                {/* settings */}
                {settings ? (
                  <div className="w-30 h-[70px] bg-slate-100/95 dark:bg-slate-700/95 absolute top-7 left-4 rounded-lg p-1.5 text-gray-500 dark:text-gray-300 font-medium shadow">
                    {/* update */}
                    <div
                      onClick={() => {
                        disp(setLesson(lesson));
                        router.push(`/admin/update-lesson/${lesson._id}`);
                      }}
                      className="flex gap-0.5 items-center rounded-sm hover:bg-slate-200 hover:dark:bg-slate-600"
                    >
                      <SquarePen className="w-4 h-4 " />
                      <span>Update</span>
                    </div>
                    <hr className="my-1" />

                    {/* delete */}
                    <div
                      onClick={() => {
                        setPrompt(true);
                        setPromptType("delete");
                      }}
                      className="flex gap-0.5 items-center rounded-sm hover:bg-slate-200 hover:dark:bg-slate-600"
                    >
                      <Trash2 className="w-4 h-4 " />
                      <span>Delete</span>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}

      {promptShow ? (
        <Prompt
          setPrompt={setPrompt}
          service={promptType === "delete" ? "Delete" : "Payment"}
          handleFunc={promptType === "delete" ? handleDelete : handlePayment}
          data={lesson}
          isLoading={loading}
          submit={promptType === "delete" ? "delete" : "pay"}
        />
      ) : (
        ""
      )}
    </>
  );
}
