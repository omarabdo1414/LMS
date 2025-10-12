"use client";
import { Ilesson } from "@/constants/interfaces";
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
  lesson: Ilesson;
  myLessons: Ilesson[];
};
export default function LessonsDropDown({ lesson, myLessons }: TLessonProps) {
  let router = useRouter();
  let [dropdown, setDropdown] = useState<boolean>(true);
  let lessonIndex = myLessons.findIndex((item) => item._id === lesson._id);

  return (
    <>
      <div className="space-y-2.5">
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
            {myLessons.map((item, i) => {
              return (
                <div key={item._id}>
                  <div className="flex justify-between">
                    {/* lesson */}
                    <div>
                      {/* lesson title */}
                      <h3 className="font-semibold text-lg capitalize">
                        Lesson {i + 1}: {item.title}
                      </h3>
                      {/* case */}
                      {lesson._id === item._id ? (
                        <div className="flex items-center justify-center w-28 h-7 rounded-full bg-primary/20 text-pribg-primary font-medium gap-1 hover:bg-primary/25 transition-colors my-2 text-primary">
                          <CircleCheckBig className="w-4 h-4" />
                          <span className="text-sm">Watched</span>
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
                        className="btn w-20 h-9"
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
