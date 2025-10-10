"use client";
import { getLessons } from "@/Apis/lessons/getLessons";
import { Ilesson } from "@/constants/interfaces";
import React, { useEffect, useRef, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingPage from "../loading/loading";
import LessonCard from "../LessonCard/LessonCard";
import Link from "next/link";

export default function Lessons() {
  let router = useRouter();
  // search params
  let searchParams = useSearchParams();
  // lessonsList
  let [lessonsList, setLessons] = useState<Ilesson[]>([]);
  // total pages
  let [totalPages, setTotalPages] = useState<number>(1);
  // loading
  let [isLoading, setLoading] = useState<boolean>(true);
  // page from searchparams
  let currentPage = Number(searchParams.get("page")) || 1;
  // pagesLsit
  let pages = [];
  // store pages (total pages)
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  // get lessons
  async function getData(page: number) {
    // start loading
    setLoading(true);
    // getLessons by page
    let data = await getLessons(page);
    // set lessonsList
    setLessons(data?.data);
    // set total pages
    setTotalPages(data?.pagination?.totalPages);
    setLoading(false);
  }
  // change page without reload
  const goToPage = (page: number) => {
    router.push(`?page=${page}`, { scroll: false });
  };
  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);
  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <section>
          {/* lessons */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 my-8">
            {lessonsList.map((lesson) => {
              return (
                <div key={lesson._id}>
                  <LessonCard lesson={lesson} />
                </div>
              );
            })}
          </div>

          {/*Pagination */}
          <Pagination className="my-16">
            <PaginationContent>
              {/* prev */}
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) goToPage(currentPage - 1);
                  }}
                />
              </PaginationItem>

              {/* pages */}
              {pages.map((i) => {
                return (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={i === currentPage}
                      onClick={(e) => {
                        e.preventDefault();
                        goToPage(i);
                      }}
                    >
                      {i}
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
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < pages.length) goToPage(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </section>
      )}
    </>
  );
}
