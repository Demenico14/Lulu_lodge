"use client"

import type React from "react"

import { signUp } from "next-auth-sanity/client"
import { useState, useEffect } from "react"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
import { signIn, useSession } from "next-auth/react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

type FormData = {
  name: string
  email: string
  password: string
}

type FormErrors = {
  name?: string
  email?: string
  password?: string
}

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) router.push("/rooms")
  }, [router, session])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (isSignUp && !formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (isSignUp && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined })
    }
  }

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true)
    try {
      await signIn(provider, { callbackUrl: "/rooms" })
    } catch (error) {
      console.error(error)
      toast.error("Failed to sign in with " + provider)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      if (isSignUp) {
        // Sign up
        const user = await signUp(formData)
        if (user) {
          toast.success("Account created successfully! Please sign in.")
          setIsSignUp(false)
        }
      } else {
        // Sign in
        const result = await signIn("sanity-login", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        })

        if (result?.error) {
          toast.error("Invalid email or password")
        } else {
          toast.success("Signed in successfully!")
          router.push("/rooms")
        }
      }
    } catch (error: any) {
      console.error(error)
      toast.error(error?.message || "Authentication failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <Image
            src="/assets/icons/LuluLodge_LogoBlack.png"
            alt="Lulu Lodge Logo"
            width={100}
            height={100}
            className="mx-auto h-20 w-auto"
          />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {isSignUp ? "Create your account" : "Sign in to your account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-medium text-tertiary-light hover:text-tertiary-dark"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            disabled={isLoading}
            className="group relative flex w-full justify-center items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-tertiary-light focus:ring-offset-2 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            <FcGoogle className="mr-2 h-5 w-5" />
            Continue with Google
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
              Or continue with email
            </span>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {isSignUp && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`block w-full appearance-none rounded-md border ${
                    errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-tertiary-light focus:outline-none focus:ring-tertiary-light sm:text-sm dark:bg-gray-700 dark:text-white`}
                />
                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`block w-full appearance-none rounded-md border ${
                  errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-tertiary-light focus:outline-none focus:ring-tertiary-light sm:text-sm dark:bg-gray-700 dark:text-white`}
              />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isSignUp ? "new-password" : "current-password"}
                value={formData.password}
                onChange={handleInputChange}
                className={`block w-full appearance-none rounded-md border ${
                  errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-tertiary-light focus:outline-none focus:ring-tertiary-light sm:text-sm dark:bg-gray-700 dark:text-white`}
              />
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
            </div>
          </div>



          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-tertiary-light py-2 px-4 text-sm font-medium text-white hover:bg-tertiary-dark focus:outline-none focus:ring-2 focus:ring-tertiary-light focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : null}
              {isSignUp ? "Sign up" : "Sign in"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-gray-600 dark:text-gray-400">
          By signing in, you agree to our{" "}
          <Link href="" className="font-medium text-tertiary-light hover:text-tertiary-dark">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="" className="font-medium text-tertiary-light hover:text-tertiary-dark">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Auth

