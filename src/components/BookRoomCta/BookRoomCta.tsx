"use client"

import type React from "react"
import { type Dispatch, type FC, type SetStateAction, useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import emailjs from "@emailjs/browser"
import axios from "axios"
import type { User } from "@/models/user"
import toast from "react-hot-toast"

type Props = {
  checkinDate: Date | null
  setCheckinDate: Dispatch<SetStateAction<Date | null>>
  checkoutDate: Date | null
  setCheckoutDate: Dispatch<SetStateAction<Date | null>>
  setAdults: Dispatch<SetStateAction<number>>
  setNoOfChildren: Dispatch<SetStateAction<number>>
  calcMinCheckoutDate: () => Date | null
  price: number
  discount: number
  adults: number
  noOfChildren: number
  specialNote: string
  isBooked: boolean
  handleBookNowClick: (phoneNumber?: string) => Promise<void>
}

const BookRoomCta: FC<Props> = (props) => {
  const {
    price,
    discount,
    specialNote,
    checkinDate,
    setCheckinDate,
    checkoutDate,
    setCheckoutDate,
    calcMinCheckoutDate,
    setAdults,
    setNoOfChildren,
    adults,
    noOfChildren,
    isBooked,
    handleBookNowClick,
  } = props

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("")
  const [userName, setUserName] = useState<string>("")
  const [phoneNumber, setPhoneNumber] = useState<string>("")

  const discountPrice = price - (price / 100) * discount

  const calcNoOfDays = () => {
    if (!checkinDate || !checkoutDate) return 0
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime()
    const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000))
    return noOfDays
  }

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const { data } = await axios.get<User>("/api/users")
      setUserName(data.name)
      setEmail(data.email)
    } catch (error) {
      console.error("Failed to fetch user data:", error)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const sendConfirmationEmail = async () => {
    // Prepare email data according to the template
    const emailData = {
      from_name: "Lulu Guest Lodge",
      to_name: userName || "Valued Guest",
      to_email: email, // This ensures the email goes to the client's email address
      phone: phoneNumber, // Add phone number to the email data
      checkin: checkinDate?.toLocaleDateString() || "Not provided",
      checkout: checkoutDate?.toLocaleDateString() || "Not provided",
      adults,
      children: noOfChildren,
      totalPrice: (calcNoOfDays() * discountPrice).toFixed(2),
      message: specialNote,
      reply_to: "mushayidominic@gmail.com", // Set reply-to as the lodge's email
    }

    try {
      // Send email confirmation
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        emailData,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      )

      console.log("Email sent successfully:", response)
      return true
    } catch (error) {
      console.error("Failed to send email:", error)
      return false
    }
  }

  const handleBookNowClickWithEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!email) {
      return toast.error("Please provide an email address")
    }

    if (!phoneNumber) {
      return toast.error("Please provide a phone number")
    }

    if (!checkinDate || !checkoutDate) {
      return toast.error("Please select check-in and check-out dates")
    }

    setIsLoading(true)

    try {
      // First create the booking
      await handleBookNowClick(phoneNumber) // Pass the phone number to handleBookNowClick

      // If booking is successful, try to send confirmation email
      const emailSent = await sendConfirmationEmail()

      if (emailSent) {
        toast.success("Booking confirmed! Check your email for details.")
      } else {
        // Booking succeeded but email failed
        toast.success("Booking confirmed!")
        toast.error("Could not send confirmation email. Please check your booking in your profile.")
      }
    } catch (error: any) {
      console.error("Booking error:", error)

      // Check if it's an authentication error
      if (error.response?.status === 401) {
        toast.error("Please sign in to book a room")
      } else {
        toast.error("Failed to complete booking. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="px-7 py-6">
      <h3>
        <span className={`${discount ? "text-gray-400" : ""} font-bold text-xl`}>$ {price}</span>
        {discount ? (
          <span className="font-bold text-xl">
            {" "}
            | discount {discount}%. Now <span className="text-tertiary-dark">$ {discountPrice}</span>
          </span>
        ) : (
          ""
        )}
      </h3>

      <div className="w-full border-b-2 border-b-secondary my-2" />

      <h4 className="my-8">{specialNote}</h4>

      {/* Email Input Field */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-gray-400">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border text-black border-gray-300 rounded-lg p-2.5"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-900 dark:text-gray-400">
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          className="w-full border text-black border-gray-300 rounded-lg p-2.5"
          placeholder="e.g. +1 234 567 8900"
        />
      </div>

      <div className="flex">
        <div className="w-1/2 pr-2">
          <label htmlFor="check-in-date" className="block text-sm font-medium text-gray-900 dark:text-gray-400">
            Check In date
          </label>
          <DatePicker
            selected={checkinDate}
            onChange={(date) => setCheckinDate(date)}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            id="check-in-date"
            className="w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="w-1/2 pl-2">
          <label htmlFor="check-out-date" className="block text-sm font-medium text-gray-900 dark:text-gray-400">
            Check Out date
          </label>
          <DatePicker
            selected={checkoutDate}
            onChange={(date) => setCheckoutDate(date)}
            dateFormat="dd/MM/yyyy"
            disabled={!checkinDate}
            minDate={calcMinCheckoutDate()}
            id="check-out-date"
            className="w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      <div className="flex mt-4">
        <div className="w-1/2 pr-2">
          <label htmlFor="adults" className="block text-sm font-medium text-gray-900 dark:text-gray-400">
            Adults
          </label>
          <input
            type="number"
            id="adults"
            value={adults}
            onChange={(e) => setAdults(+e.target.value)}
            min={1}
            max={5}
            className="w-full border text-black border-gray-300 rounded-lg p-2.5"
          />
        </div>
        <div className="w-1/2 pl-2">
          <label htmlFor="children" className="block text-sm font-medium text-gray-900 dark:text-gray-400">
            Children
          </label>
          <input
            type="number"
            id="children"
            value={noOfChildren}
            onChange={(e) => setNoOfChildren(+e.target.value)}
            min={0}
            max={3}
            className="w-full border text-black border-gray-300 rounded-lg p-2.5"
          />
        </div>
      </div>

      {calcNoOfDays() > 0 ? <p className="mt-3">Total Price: $ {calcNoOfDays() * discountPrice}</p> : <></>}

      <button
        disabled={isBooked || isLoading}
        onClick={handleBookNowClickWithEmail}
        className="btn-primary w-full mt-6 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        {isLoading ? "Processing..." : isBooked ? "Booked" : "Book Now"}
      </button>
    </div>
  )
}

export default BookRoomCta

