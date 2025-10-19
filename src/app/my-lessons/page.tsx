import ProtectedRoute from "@/components/guard/ProtectPages";
import { Ilesson } from "@/constants/interfaces";
import React from "react";
import { getMyLessons } from "../../Apis/lessons/getMylessons";
import Image from "next/image";
import img from "../../../public/course.svg";
import noData from "../../../public/No data-pana.svg";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "My Courses",
};
export default async function MyLessonPage() {
  //get my lessons
  const myLessons: Ilesson[] = await getMyLessons();
  console.log(myLessons);
 
  return (
    <ProtectedRoute>
      <section className="contain py-8">
        {/* My Lesson hrader */}
        <h1 className="text-4xl md:text-5xl font-semibold text-center">
          My Courses
        </h1>
        <p className="text-center my-2">
          {" "}
          Access structured lessons, track your progress, and grow your
          knowledge step by step.
        </p>
        {/* lessons */}
        {myLessons?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-8">
            {myLessons?.map((lesson) => {
              return (
                <div
                  key={lesson._id}
                  className="bg-card border rounded-lg p-4 relative cursor-pointer h-full space-y-1.5"
                >
                  {/* img */}
                  <Image className="w-full" src={img} alt="lesson" />

                  {/* detsils */}
                  <div className="space-y-1.5">
                    {/* title */}
                    <h3 className="text-lg line-clamp-1  font-bold capitalize">
                      {lesson.title}
                    </h3>

                    {/* discription */}
                    <p className="line-clamp-2">{lesson.description}</p>

                    {/* view course */}
                    <Link href={`/my-lessons/${lesson._id}`}>
                      <button className="w-full btn h-9">View Course</button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className=" text-center my-8">
            <Image className="w-96 mx-auto" src={noData} alt="no data" />
            <h3 className="font-semibold text-lg text-accent">
              You have no courses yet
            </h3>
          </div>
        )}
      </section>
    </ProtectedRoute>
  );
}
