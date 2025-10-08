import LoginForm from '@/components/LoginForm/LoginForm'
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
  title: "Login",
  description: "lms edu education signin login ",
};
export default function Login() {
  return (
    <div className='h-screen flex justify-center items-center bg-background'>
      {/* Login form */}
      <LoginForm/>
    </div>
  )
}
