import ProtectedRoute from '@/components/guard/ProtectPages'
import ChangePasswordPage from '@/components/Profile/changePassword/changePass'
import React from 'react'

export default function page() {
  return (
    <div>
      <ProtectedRoute>
        <ChangePasswordPage />
      </ProtectedRoute>
    </div>
  )
}
