import LessonDetailsPage from "@/app/lessons/[lessonId]/page";
import React from "react";
type TLessonProps = {
  params: {
    lessonId: string;
  };
};
export default function LessonDetails({ params }: TLessonProps) {
  return (
    <div>
      <LessonDetailsPage params={params} />
    </div>
  );
}
