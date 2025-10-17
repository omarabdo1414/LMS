import ProtectedRoute from '@/components/guard/ProtectPages'
import ProfilePage from '@/components/Profile/profile/profile'
import React from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "My profile ",
};

export default function page() {

  return (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
  )
}
