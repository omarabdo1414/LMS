import { TriangleAlert } from "lucide-react";
import React from "react";

export default function NotAuth() {
  return (
    <section className="bg-red-100 border-2  border-red-200 rounded-lg p-5 shadow-lg w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[34%] text-center h-28 flex justify-center items-center">
      <div className="font-semibold text-base sm:text-xl flex justify-center items-center gap-1 text-red-900 ">
        <TriangleAlert className="w-5 hidden sm:block" />
        <span>You are not authorized to access this page!</span>
      </div>
    </section>
  );
}
