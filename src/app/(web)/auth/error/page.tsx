"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import toast from "react-hot-toast"

const AuthError = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  useEffect(() => {
    if (error) {
      let errorMessage = "An authentication error occurred"

      switch (error) {
        case "OAuthSignin":
        case "OAuthCallback":
        case "OAuthCreateAccount":
          errorMessage = "There was a problem with your social login"
          break
        case "EmailCreateAccount":
          errorMessage = "There was a problem creating your account"
          break
        case "Callback":
          errorMessage = "Invalid login credentials"
          break
        case "OAuthAccountNotLinked":
          errorMessage = "This email is already associated with another account"
          break
        case "EmailSignin":
          errorMessage = "Check your email for a sign in link"
          break
        case "CredentialsSignin":
          errorMessage = "Invalid email or password"
          break
        case "SessionRequired":
          errorMessage = "Please sign in to access this page"
          break
        default:
          errorMessage = "An unknown error occurred"
      }

      toast.error(errorMessage)
    }
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Authentication Error
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
            {error ? `Error: ${error}` : "An error occurred during authentication"}
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <Link
            href="/auth"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-tertiary-light hover:bg-tertiary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tertiary-light"
          >
            Return to login
          </Link>
          <Link
            href="/"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tertiary-light dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:border-gray-600"
          >
            Return to home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AuthError

