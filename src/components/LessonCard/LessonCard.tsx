"use client";
import { Ilesson } from "@/constants/interfaces";
import Image from "next/image";
import React, { useState } from "react";
import img from "../../../public/lesson.svg";
import { payLesson } from "@/Apis/lessons/paylesson";
import toast from "react-hot-toast";
import Prompt from "../Prompt/Prompt";
type TLessonProps = {
  lesson: Ilesson;
};
export default function LessonCard({ lesson }: TLessonProps) {
  // loading
  let [isLoading, setLoading] = useState<boolean>(false);
  // prompt
  let [promptShow, setPrompt] = useState<boolean>(false);
  let handlePayment = async (id: string) => {
    setLoading(true);
    let data = await payLesson(id);
    if (data.success === true) {
      setLoading(false);
      window.open(data.paymentUrl, "_blank");
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
        className="bg-card border rounded-lg p-4 relative cursor-pointer h-full"
      >
        {/* img */}
        <Image className="w-full" src={img} alt="lesson" />

        {/* detsils */}
        <div className="space-y-1.5">
          {/* date */}
          <p>
            {lesson.scheduledDate.split("T")[0].split("-").reverse().join("-")}
          </p>
          {/* title */}
          <h3 className="text-lg   font-bold capitalize">
            {lesson.title}
          </h3>
          {/* discription */}
          <p className="line-clamp-2">{lesson.description}</p>

          {/* enroll btn */}
          {lesson.isPaid ? (
            <button
              onClick={() => {
                setPrompt(true);
              }}
              className="w-full btn "
            >
              Enroll: {lesson.price}EGP
            </button>
          ) : (
            ""
          )}
        </div>

        {/* paid or free */}
        <div
          className={
            lesson.isPaid
              ? "absolute top-1.5 right-1.5 w-16 rounded-full bg-amber-500 flex justify-center items-center space-x-1"
              : "absolute top-1.5 right-1.5 w-16 rounded-full bg-primary flex justify-center items-center space-x-1"
          }
        >
          <div className="bg-white w-2 h-2 rounded-full"></div>
          <span className="text-white">{lesson.isPaid ? "Paid" : "Free"}</span>
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
