import ProtectedRoute from '@/components/guard/ProtectPages'
import ChangePasswordPage from '@/components/Profile/changePassword/changePass'
import React from 'react'

export default function page() {
  return (
      <ProtectedRoute>
        <ChangePasswordPage />
      </ProtectedRoute>
  )
}
