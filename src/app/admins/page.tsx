"use client";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { getUserProfile } from "@/redux/userSlice";
import CreateAdminForm from "@/components/CreateAdminForm/CreateAdminForm";
import AdminTable from "@/components/AdminTable/AdminTable";
import UserTable from "@/components/UserTable/UserTable";

export default function AdminPage() {
  const dispatch = useAppDispatch();
  const { userData, role, loading } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  if (loading)
    return (
      <p className="text-center mt-10 text-base-color animate-pulse">
        Loading profile...
      </p>
    );

  if (!userData)
    return (
      <p className="text-center mt-10 text-error">
        Please log in first.
      </p>
    );

  const renderContent = () => {
    if (role === "SuperAdmin") {
      return (
        <>
          <div className="form mx-auto mt-10">
            <CreateAdminForm />
          </div>
          <div className="contain mt-10">
            <AdminTable />
          </div>
          <div className="contain mt-10">
            <UserTable />
          </div>
        </>
      );
    } else if (role === "Admin") {
      return (
        <div className="contain mt-10">
          <UserTable />
        </div>
      );
    } else {
      return (
        <p className="text-center text-error mt-5">
          You don’t have permission to access this page.
        </p>
      );
    }
  };

  return (
    <div className="p-8 space-y-8 min-h-screen bg-background text-foreground">
      <h1 className="text-3xl font-bold text-center text-base-color">
        Admin Dashboard
      </h1>
      <p className="text-center text-muted-foreground">
        Welcome, {userData?.fullName || userData?.email} ({role})
      </p>
      {renderContent()}
    </div>
  );
}
