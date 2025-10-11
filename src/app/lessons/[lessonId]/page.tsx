import { getLessonByID } from "@/app/apis/lessons/getLessonDetails";
import LessonsDropDown from "@/components/lessonsDropDown/lessonsDropDown";
import { Ilesson } from "@/constants/interfaces";
import { MoveRight } from "lucide-react";
import React from "react";
type TLessonProps = {
  params: {
    lessonId: string;
  };
};
export default async function LessonDetailsPage({ params }: TLessonProps) {
  let lessonData = await getLessonByID(params.lessonId);
  let lesson :Ilesson = lessonData.data

  return (
    <section className="h-screen bg-slate-100 dark:bg-[oklch(0.129_0.042_264.695)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-full contain py-24">
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
        <div className="space-y-2">
          {/* nextlesson */}
          <button
            disabled
            className="w-full h-12 bg-accent rounded-lg text-white flex items-center justify-center space-x-1.5 text-lg hover:bg-accent/90 cursor-pointer disabled:bg-accent/45 disabled:cursor-not-allowed"
          >
            <span>Next Lesson</span> <MoveRight className="w-6 h-6" />
          </button>
          <LessonsDropDown lesson={lesson} />
        </div>
      </div>
    </section>
  );
}
