<<<<<<< HEAD
"use client";
import { AppDispatch } from "@/redux/store";
import { getUserProfile } from "@/redux/userSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
=======
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import GetUser from "../GetUser/GetUser";
>>>>>>> deb09ec1c7d333d729e220bf1b3028114d0149be
/*
protect all routes in application except auth and welcome page
 */
export default async function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
<<<<<<< HEAD
  const router = useRouter();
  const disp = useDispatch<AppDispatch>();
  useEffect(() => {
    const token = Cookies.get("token");
    // if token not exist navigate to login
    if (!token) {
      router.replace("/login");
    }
    // else token exist get profile to check role
    else {
      disp(getUserProfile());
    }
  }, [router]);
=======
  const token = (await cookies()).get("token")?.value;
  if (!token) redirect("/login");
>>>>>>> deb09ec1c7d333d729e220bf1b3028114d0149be

  return <GetUser>{children}</GetUser>;
}
