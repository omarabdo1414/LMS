import { getLessonByID } from "@/Apis/lessons/getLessonDetails";
import ProtectedRoute from "@/components/guard/ProtectPages";
import NotFound from "@/components/ui/NotFound/NotFound";
import { Ilesson } from "@/constants/interfaces";
import { Metadata } from "next";
import React from "react";
type TLessonProps = {
  params: {
    lessonId: string;
  };
};
export async function generateMetadata({
  params,
}: TLessonProps): Promise<Metadata> {
  const lessonData = await getLessonByID(params?.lessonId);
  const lesson: Ilesson = lessonData.data;
  return {
    title: lesson?.title || "Course Details",
  };
}
export default async function LessonDetailsPage({ params }: TLessonProps) {
  let lessonData = await getLessonByID(params?.lessonId);
  let lesson: Ilesson = lessonData.data;

  return (
    <>
      <ProtectedRoute>
        {lesson ? (
          <section className="h-screen bg-slate-100 dark:bg-[oklch(0.129_0.042_264.695)]">
            <div className="h-full w-[90%] md:w-[80%] mx-auto py-16">
              {/* video */}
              <div className="space-y-2">
                <iframe
                  className="w-full h-[400px] sm:h-[500px]  rounded-lg"
                  src={
                    lesson?.video
                      ? lesson.video
                          .replace("watch?v=", "embed/")
                          .replace("youtu.be/", "www.youtube.com/embed/")
                          .split("?")[0]
                      : ""
                  }
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
                <div className="flex gap-1 items-center">
                  <h1 className="text-2xl font-bold capitalize">
                    {lesson?.title}({lesson?.classLevel})
                  </h1>
                  <div className="bg-primary w-16 h-6 rounded-full text-white flex justify-center items-center mt-1">
                    <span>Free</span>
                  </div>
                </div>
                <p>{lesson?.description}</p>
              </div>
            </div>
          </section>
        ) : (
          <NotFound
            hrefLink="/lessons"
            btnName="Return Courses"
            title="Could not find this course"
          />
        )}
      </ProtectedRoute>
    </>
  );
}
