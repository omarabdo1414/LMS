import { getLessons } from "@/app/apis/lessons/getLessons";
import ProtectedRoute from "@/components/guard/ProtectPages";
import LessonCard from "@/components/LessonCard/LessonCard";
import { Ilesson } from "@/constants/interfaces";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { getMyLessons } from "../apis/lessons/getMylessons";
export const metadata: Metadata = {
  title: "Courses",
  description: "lms edu education Forget Password ",
};
type TLessonsProps = {
  searchParams?: {
    page: string;
  };
};
export default async function LessonsPage({ searchParams }: TLessonsProps) {
  let currentPage = Number(searchParams?.page || 1);
  // get lessons from api
  const lessons = await getLessons(currentPage);
  //get my lessons
  const myLessons: Ilesson[] = await getMyLessons();
  let lessonsList: Ilesson[] = lessons.data;
  let totalPages = lessons.pagination?.totalPages;
  // // pagesLsit
  let pages = [];
  // store pages (total pages)
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  console.log(myLessons);

  return (
    <ProtectedRoute>
      <section className="contain py-8">
        <h1 className="text-5xl font-semibold text-center">
          Available Courses
        </h1>
        <p className="text-center my-2">
          {" "}
          Access structured lessons, track your progress, and grow your
          knowledge step by step.
        </p>
        {/* <Lessons /> */}
        {/* lessons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-8">
          {lessonsList?.map((lesson) => {
            return (
              <>
                <div key={lesson._id}>
                  <LessonCard lesson={lesson} myLessons={myLessons} />
                </div>
              </>
            );
          })}
        </div>
        {/*Pagination */}
        <Pagination className="my-16">
          <PaginationContent>
            {/* prev */}
            <PaginationItem>
              <PaginationPrevious
                href={`?page=${Math.max(currentPage - 1, 1)}`}
              >
                {/* <Link  /> */}
              </PaginationPrevious>
            </PaginationItem>

            {/* pages */}
            {pages.map((i) => {
              return (
                <PaginationItem key={i}>
                  <PaginationLink
                    href={`?page=${i}`}
                    isActive={i === currentPage}
                  >
                    {i}
                    {/* <Link >{i}</Link> */}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {/* ... */}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            {/* next */}
            <PaginationItem>
              <PaginationNext
                href={`?page=${Math.min(currentPage + 1, totalPages)}`}
              >
                {/* <Link  /> */}
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </ProtectedRoute>
  );
}
