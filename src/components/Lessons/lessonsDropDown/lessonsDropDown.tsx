"use client";
import { ILesson } from "@/constants/interfaces";
import {
  ChevronDown,
  ChevronUp,
  CircleCheckBig,
  Eye,
  MoveRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
type TLessonProps = {
  lesson: ILesson;
  myLessons: ILesson[];
};
export default function LessonsDropDown({ lesson, myLessons }: TLessonProps) {
  let router = useRouter();
  let [dropdown, setDropdown] = useState<boolean>(true);
  let lessonIndex = myLessons.findIndex((item) => item._id === lesson._id);

  return (
    <>
      <div className="space-y-2.5 mb-5">
        {/* nextlesson */}
        <button
          onClick={() => {
            let lessonNext = myLessons[lessonIndex + 1];
            router.push(`/my-lessons/${lessonNext._id}`);
          }}
          disabled={lessonIndex === myLessons.length - 1}
          className="w-full h-12 bg-accent rounded-lg text-white flex items-center justify-center space-x-1.5 text-lg hover:bg-accent/90 cursor-pointer disabled:bg-accent/45 disabled:cursor-not-allowed"
        >
          <span>Next Lesson</span> <MoveRight className="w-6 h-6" />
        </button>
        <div
          onClick={() => {
            dropdown ? setDropdown(false) : setDropdown(true);
          }}
          className="w-full h-12 rounded-lg bg-slate-50 dark:bg-slate-800 font-semibold flex justify-between items-center space-x-3 cursor-pointer p-3 text-lg shadow-sm"
        >
          <h5>Course Lessons</h5>
          {dropdown ? (
            <ChevronUp className="w-6 h-6 text-gray-400" />
          ) : (
            <ChevronDown className="w-6 h-6 text-gray-400" />
          )}
        </div>

        {dropdown ? (
          <div className=" rounded-lg p-3  bg-slate-50 dark:bg-slate-800 shadow-sm">
            {myLessons.map((item, i) => {
              return (
                <div key={item._id}>
                  <div className="flex  gap-1 justify-between">
                    {/* lesson */}
                    <div>
                      {/* lesson title */}
                      <h3 className="font-semibold text-base sm:text-lg capitalize">
                        Lesson {i + 1}: {item.title}
                      </h3>
                      {/* case */}
                      {lesson._id === item._id ? (
                        <div className="flex items-center justify-center w-28 h-7 rounded-full bg-primary/20 text-pribg-primary font-medium gap-1 hover:bg-primary/25 transition-colors my-2 text-primary">
                          <CircleCheckBig className="w-4 h-4" />
                          <span className="text-sm">Watching</span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    {lesson._id === item._id ? (
                      ""
                    ) : (
                      <button
                        onClick={() => {
                          router.push(`/my-lessons/${item._id}`);
                        }}
                        className="btn w-20 h-9 text-sm md:text-base"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Watch</span>
                      </button>
                    )}
                  </div>

                  {myLessons.length - 1 === i ? "" : <hr className="my-2" />}
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
