"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { getUserProfile } from "@/redux/UserSlice";
import CreateAdminForm from "./components/CreateAdminForm/CreateAdminForm";
import AdminTable from "@/components/AdminTable";
import UserTable from "@/components/UserTable";

export default function AdminPage() {
  const dispatch = useAppDispatch();
  const { userData, role, loading } = useAppSelector((state) => state.user);
  const [initialized, setInitialized] = useState(false);

  // ✅ Fetch profile on mount (to get role + token)
  useEffect(() => {
    const fetchProfile = async () => {
      await dispatch(getUserProfile());
      setInitialized(true);
    };
    fetchProfile();
  }, [dispatch]);

  // ✅ Wait until profile is fetched
  if (loading || !initialized)
    return <p className="text-center mt-10">Checking permissions...</p>;

  // ✅ Handle not logged in
  if (!userData)
    return (
      <p className="text-center mt-10 text-red-500">
        Please log in first.
      </p>
    );

  // ✅ Handle no role or unauthorized role
  if (!role || (role !== "SuperAdmin" && role !== "Admin"))
    return (
      <p className="text-center text-red-500 mt-5">
        You don’t have permission to access this page.
      </p>
    );

  // ✅ Render correct dashboard
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>
      <p className="text-center text-gray-600">
        Welcome, {userData?.fullName || userData?.email} ({role})
      </p>

      {role === "SuperAdmin" ? (
        <>
          <CreateAdminForm />
          <AdminTable />
          <UserTable />
        </>
      ) : (
        <UserTable />
      )}
    </div>
  );
}
