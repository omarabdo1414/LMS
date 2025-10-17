import ProtectedRoute from '@/components/guard/ProtectPages'
import ChangePasswordPage from '@/components/Profile/changePassword/changePass'
import React from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change password",
  description: "you can change your password easily ",
};


export default function page() {
  return (
      <ProtectedRoute>
        <ChangePasswordPage />
      </ProtectedRoute>
  )
}
