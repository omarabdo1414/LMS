"use client";
import { AppDispatch } from "@/redux/store";
import { getUserProfile } from "@/redux/userSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
type TGetUserProps = {
  children: React.ReactNode;
};
export default function GetUser({ children }: TGetUserProps) {
  let disp = useDispatch<AppDispatch>();
  useEffect(() => {
    disp(getUserProfile());
  }, [disp]);
  return <>{children}</>;
}
