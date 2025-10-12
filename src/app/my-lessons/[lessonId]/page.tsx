import { getLessonByID } from "@/app/apis/lessons/getLessonDetails";
import { getMyLessons } from "@/app/apis/lessons/getMylessons";
import LessonsDropDown from "@/components/lessonsDropDown/lessonsDropDown";
import NotFound from "@/components/NotFound/NotFound";
import { Ilesson } from "@/constants/interfaces";
import React from "react";
type TLessonProps = {
  params: {
    lessonId: string;
  };
};
export default async function LessonDetailsPage({ params }: TLessonProps) {
  let lessonData = await getLessonByID(params.lessonId);
  let myLessons = await getMyLessons();
  let lesson: Ilesson = lessonData.data;

  return (
    <>
      {lesson ? (
        <section className="h-screen bg-slate-100 dark:bg-[oklch(0.129_0.042_264.695)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-full contain py-24">
            {/* video */}
            <div className="space-y-2">
              <iframe
                className="w-full h-[400px]  rounded-lg"
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

              <h1 className="text-3xl font-bold capitalize">
                {lesson?.title}({lesson?.classLevel})
              </h1>
              <p>{lesson?.description}</p>
            </div>
            {/* details */}

            <LessonsDropDown lesson={lesson} myLessons={myLessons} />
          </div>
        </section>
      ) : (
        <NotFound hrefLink="/my-lessons" btnName="Return Courses" title="Could not find this course" />
      )}
    </>
  );
}
