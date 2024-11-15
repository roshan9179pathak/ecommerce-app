import React from 'react'
import LoginForm from '../componentsP/LoginPage'

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-6 space-y-8 bg-white shadow-md rounded-md border border-dark-blue">
        <h2 className="text-center text-2xl font-bold text-dark-blue">
          Welcome Back
        </h2>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
