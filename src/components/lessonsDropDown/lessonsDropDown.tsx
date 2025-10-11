"use client";
import { Ilesson } from "@/constants/interfaces";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
type TLessonProps = {
  lesson: Ilesson;
};
export default function LessonsDropDown({ lesson }: TLessonProps) {
  let [dropdown, setDropdown] = useState<boolean>(false);
  return (
    <>
      <div
        onClick={() => {
          dropdown ? setDropdown(false) : setDropdown(true);
        }}
        className="w-full h-12 rounded-lg bg-card  font-semibold flex justify-between items-center space-x-3 cursor-pointer p-3 text-lg "
      >
        <h5>Course Lessons</h5>
        {dropdown ? (
          <ChevronUp className="w-6 h-6 text-gray-400" />
        ) : (
          <ChevronDown className="w-6 h-6 text-gray-400" />
        )}
      </div>

      {dropdown ? (
        <div className="bg-card rounded-lg p-3  ">
          <h3 className="font-semibold text-xl capitalize">
            1- {lesson?.title}
          </h3>
          <hr className="my-2" />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
