"use client";
import { Ilesson } from "@/constants/interfaces";
import Image from "next/image";
import React, { useState } from "react";
import img from "../../../public/course.svg";
import { payLesson } from "@/app/apis/lessons/paylesson";
import toast from "react-hot-toast";
import Prompt from "../Prompt/Prompt";
import { useRouter } from "next/navigation";
type TLessonProps = {
  lesson: Ilesson;
  myLessons: Ilesson[];
};
export default function LessonCard({ lesson, myLessons }: TLessonProps) {
  let router = useRouter();
  // loading
  let [isLoading, setLoading] = useState<boolean>(false);
  // prompt
  let [promptShow, setPrompt] = useState<boolean>(false);
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

  return (
    <>
      <div
        key={lesson._id}
        className="bg-card border rounded-lg p-4 relative cursor-pointer h-full space-y-1.5"
      >
        {/* img and details  */}
        <div
          onClick={() => {
            router.push(`/lessons/${lesson._id}`);
          }}
        >
          {/* img */}
          <Image className="w-full" src={img} alt="lesson" />
          {/* detsils */}
          <div className="space-y-1.5">
            {/* date */}
            {/* <p>
              {lesson.scheduledDate
                .split("T")[0]
                .split("-")
                .reverse()
                .join("-")}
            </p> */}
            {/* title */}
            <h3 className="text-lg   font-bold capitalize">{lesson.title}</h3>
            {/* discription */}
            <p className="line-clamp-2">{lesson.description}</p>
          </div>
        </div>
        {/* enroll btn */}
        {myLessons.find((item) => item._id === lesson._id) ||
        lesson.isPaid === false ? (
          ""
        ) : (
          <button
            onClick={() => {
              setPrompt(true);
            }}
            className="w-full btn "
          >
            Enroll: {lesson.price}EGP
          </button>
        )}
        {/* paid or free */}
        <div
          className={
            lesson.isPaid && !myLessons.find((item) => item._id === lesson._id)
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
            {lesson.isPaid && !myLessons.find((item) => item._id === lesson._id)
              ? "paid"
              : myLessons.find((item) => item._id === lesson._id)
              ? "Owned"
              : lesson.isPaid === false
              ? "Free"
              : ""}
          </span>
        </div>
      </div>

      {promptShow ? (
        <Prompt
          setPrompt={setPrompt}
          service="Payment"
          handleFunc={handlePayment}
          data={lesson}
          isLoading={isLoading}
          submit="pay"
        />
      ) : (
        ""
      )}
    </>
  );
}
