import ProtectedRoute from '@/components/guard/ProtectPages'
import ProfilePage from '@/components/Profile/profile/profile'
import React from 'react'

export default function page() {
  return (
    <div>
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    </div>
  )
}
