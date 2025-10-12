"use client";
import { LoaderCircle } from "lucide-react";
import React from "react";
/**
 isloading => if loading when post api 
 btnName => name of btn
 className => add class (ex:w-full)
 
 */
type TSubmitBtn = {
  isLoading: boolean;
  btnName: string;
  className: string;
};
export default function SubmitBtn({
  isLoading,
  btnName,
  className,
}: TSubmitBtn) {
  return (
    <button
      type="submit"
      disabled={isLoading ? true : false}
      className={`${className} btn h-10`}
    >
      {isLoading ? (
        <>
          <LoaderCircle className="w-5 h-5 animate-spin" />
          <span>{btnName}</span>
        </>
      ) : (
        <span>{btnName}</span>
      )}
    </button>
  );
}
