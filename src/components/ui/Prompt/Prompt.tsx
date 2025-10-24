"use client";
import React, { useEffect, useRef, useState } from "react";
import { LoaderCircle, Trash2, X } from "lucide-react";
/**
 * service => service name(ex:payment,delete)
 * data => data of item that action it
 * setPrompt => prompt view if close it set false else set true
 * handleFunc => post api function
 * btn
 * submit => button name
 * isLoading => when post api , loading
 */
type TpromptProps = {
  service: string;
  data: any;
  isLoading: boolean;
  submit: string;
  handleFunc: Function;
  setPrompt: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function Prompt({
  service,
  submit,
  isLoading,
  data,
  handleFunc,
  setPrompt,
}: TpromptProps) {
  let promptLayer = useRef<HTMLDivElement>(null);
  let promptDisplay = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key == "Escape") {
        setPrompt(false);
      }
    });
  }, []);
  useEffect(() => {
    promptLayer.current?.addEventListener("click", (e) => {
      if (!promptDisplay.current?.contains(e.target as Node)) setPrompt(false);
    });
  }, []);
  return (
    <>
      <div
        ref={promptLayer}
        className="bg-black/60 fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      >
        <div
          ref={promptDisplay}
          className="w-[90%] sm:w-[68%] md:w-[55%] lg:w-[45%] xl:w-[35%] h-50 bg-card rounded-lg"
        >
          <div className="contain my-5">
            {/* service and close icon */}
            <div className="flex justify-between">
              {/* service  */}
              <h3 className="font-semibold text-xl">{service}</h3>

              {/* close icon */}
              <div
                onClick={() => {
                  setPrompt(false);
                }}
              >
                <X className="w-5 h-5 cursor-pointer hover:text-accent" />
              </div>
            </div>
            <hr className="my-2" />

            {/* sure */}
            <p className="my-6">
              Sure to {service} to{" "}
              <span className={submit === "delete"? "text-red-600 font-semibold capitalize":"text-accent font-semibold capitalize"}>
                {data.title}
              </span>
              ?
            </p>
            <hr className="my-2" />
            {/* closebtn and func */}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setPrompt(false);
                }}
                className="w-24 h-10 rounded-lg bg-slate-600 hover:bg-slate-500 text-white cursor-pointer"
              >
                Close
              </button>
              <div
                onClick={() => {
                  handleFunc(data._id);
                }}
                className="w-24"
              >
                <button
                  disabled={isLoading ? true : false}
                  className={
                    submit === "delete"
                      ? "bg-red-600 w-full h-10 font-semibold disabled:bg-red-600/60  text-white rounded-lg cursor-pointer hover:bg-red-600/90 flex justify-center items-center space-x-1"
                      : "w-full h-10 bg-accent font-semibold disabled:bg-accent/60  text-white rounded-lg cursor-pointer hover:bg-accent/90 flex justify-center items-center space-x-1"
                  }
                >
                  {isLoading ? (
                    <>
                      <LoaderCircle className="w-5 h-5 animate-spin" />
                      <span>{submit}</span>
                    </>
                  ) : (
                    <>
                      {submit === "delete" ? <Trash2 className="w-5 h-5" /> : ""}
                      <span>{submit}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
