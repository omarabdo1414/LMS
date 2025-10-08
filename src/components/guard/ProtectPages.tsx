"use client";
import { AppDispatch } from "@/redux/store";
import { getUserProfile } from "@/redux/userSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
/*
protect all routes in application except auth and welcome page
 */
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const disp = useDispatch<AppDispatch>();
  useEffect(() => {
    const token = localStorage.getItem("token");
    // if token not exist navigate to login
    if (!token) {
      router.replace("/login");
    }
    // else token exist get profile to check role
    else {
      disp(getUserProfile());
    }
  }, [router]);

  return <>{children}</>;
}
