"use client"

import type React from "react"
import { useState, useRef } from "react"
import emailjs from "@emailjs/browser"
import toast from "react-hot-toast"
import Map from "@/components/Map/Map"
import { BsFillSendFill, BsTelephoneOutbound } from "react-icons/bs"
import { BiHome } from "react-icons/bi"

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const labelStyles = "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  const inputStyles =
    "border border-gray-300 sm:text-sm text-black rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-tertiary-light"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Prepare email data for the template
      const emailData = {
        from_name: form.name,
        from_email: form.email,
        to_name: "Lulu Guest Lodge Team",
        subject: form.subject,
        message: form.message,
        reply_to: form.email,
        date: new Date().toLocaleString(),
      }

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE!, // Use a different template ID for contact form
        emailData,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      )

      setIsLoading(false)
      toast.success("Thank you for your message! We'll get back to you soon.")

      // Reset form fields
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      setIsLoading(false)
      console.error(error)
      toast.error("Failed to send your message. Please try again later.")
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-4">Get In Touch</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          We'd love to hear from you. Whether you have a question about our rooms, pricing, or anything else, our team
          is ready to answer all your questions.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Contact Form */}
        <div className="lg:w-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-black dark:text-white">Send Us a Message</h2>

          <form className="space-y-6" onSubmit={handleSubmit} ref={formRef}>
            <div>
              <label htmlFor="name" className={labelStyles}>
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className={inputStyles}
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className={labelStyles}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className={inputStyles}
                value={form.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className={labelStyles}>
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className={inputStyles}
                value={form.subject}
                onChange={handleChange}
                placeholder="What is this regarding?"
              />
            </div>

            <div>
              <label htmlFor="message" className={labelStyles}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                className={inputStyles}
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="How can we help you?"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-tertiary-light text-white py-3 px-6 rounded-lg font-medium hover:bg-tertiary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tertiary-light"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  Sending...
                </div>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="lg:w-1/2">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-black dark:text-white">Contact Information</h2>

            <div className="space-y-4">
              <div className="flex items-center">
                <BiHome className="text-tertiary-light text-xl mr-3" />
                <div>
                  <h3 className="font-medium text-black dark:text-white">Address</h3>
                  <p className="text-gray-600 dark:text-gray-300">1714 BB7, Low Density, Victoria Falls, Zimbabwe</p>
                </div>
              </div>

              <div className="flex items-center">
                <BsFillSendFill className="text-tertiary-light text-xl mr-3" />
                <div>
                  <h3 className="font-medium text-black dark:text-white">Email</h3>
                  <p className="text-gray-600 dark:text-gray-300">luluguestlodge@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center">
                <BsTelephoneOutbound className="text-tertiary-light text-xl mr-3" />
                <div>
                  <h3 className="font-medium text-black dark:text-white">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-300">+263-772-451-277</p>
                  <p className="text-gray-600 dark:text-gray-300">+61-452-156-150</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-[400px] rounded-lg overflow-hidden shadow-md">
            <Map />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

