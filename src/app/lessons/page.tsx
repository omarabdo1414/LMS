import { getLessons } from "@/Apis/lessons/getLessons";
import ProtectedRoute from "@/components/guard/ProtectPages";
import LessonCard from "@/components/Lessons/LessonCard/LessonCard";
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
import { getMyLessons } from "../../Apis/lessons/getMylessons";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  // currentPage
  let currentPage = Number(searchParams?.page || 1);
  // get lessons from api
  const lessons = await getLessons(currentPage);
  //get my lessons
  const myLessons = await getMyLessons();

  let lessonsList: Ilesson[] = lessons.data;
  let totalPages = lessons.pagination?.totalPages;

  // // pagesLsit
  let pages = [];
  // store pages (total pages)
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return (
    <ProtectedRoute>
      <section className="contain py-8">
        {/* header */}
        <h1 className="text-4xl md:text-5xl  font-semibold text-center">
          Available Courses
        </h1>
        <p className="text-center my-2">
          {" "}
          Access structured lessons, track your progress, and grow your
          knowledge step by step.
        </p>

        {/* lessons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-8">
          {lessonsList?.map((lesson) => {
            return (
              <div key={lesson._id}>
                <LessonCard lesson={lesson} myLessons={myLessons} />
              </div>
            );
          })}
        </div>

       {/* Pagination */}
        <Pagination className="my-16">
          <PaginationContent>
            {/* Previous */}
            <PaginationItem>
              <Link
                href={`?page=${Math.max(currentPage - 1, 1)}`}
                
                className={`flex items-center px-3 py-2 rounded-md border text-sm font-medium transition ${
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "hover:bg-accent/40"
                }`} 
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Link>
            </PaginationItem>

            {/* Pages */}
            {pages.map((i) => (
              <PaginationItem key={i}>
                <Link
                  href={`?page=${i}`}
                  scroll={false}
                  className={`px-3 py-2 rounded-md border text-sm font-medium transition ${
                    i === currentPage
                      ? "bg-accent  text-white"
                      : "hover:bg-accent/40"
                  }`}
                >
                  {i}
                </Link>
              </PaginationItem>
            ))}

            {/* ... */}
            {totalPages > pages.length && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* Next */}
            <PaginationItem>
              <Link
                href={`?page=${Math.min(currentPage + 1, totalPages)}`}
                
                className={`flex items-center px-3 py-2 rounded-md border text-sm font-medium transition ${
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "hover:bg-accent/40"
                }`}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </PaginationItem>
          </PaginationContent>
        </Pagination>

      </section>
    </ProtectedRoute>
  );
}
