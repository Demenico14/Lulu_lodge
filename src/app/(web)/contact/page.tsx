"use client";

import React from "react";
import Map from "@/components/Map/Map";

const Contact: React.FC = () => {
  const labelStyles =
    "block mb-2 text-sm font-medium text-gray-900 dark:text-white";
  const inputStyles =
    "border border-gray-300 sm:text-sm text-black rounded-lg block w-full p-2.5 focus:outline-none";

  return (
    <section className="flex flex-col md:flex-row items-center justify-center remove-scrollbar mt-28 container mx-auto">
      <div className="flex flex-col md:flex-row w-full max-w-[1200px]">
        {/* Form Container */}
        <div className="flex-1 max-w-[496px] mb-8 md:mb-0 md:mr-4">
          <section className="mb-8 flex flex-col space-y-4">
            <h1 className="header text-black dark:text-white">Get In Touch!👋🏾</h1>
            <p className="text-black dark:text-[#ffffffea] xl:text-left">
              We'd love to hear from you. Fill out the form below and we'll get
              back to you as soon as possible.
            </p>
          </section>
          <form className="space-y-4 md:space-y-6">
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
                rows={4}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-tertiary-light text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Send
            </button>
            <div className="text-14-regular mt-20 flex justify-between">
              <p className="text-dark-600 xl:text-left">© 2024 Lulu Lodge</p>
            </div>
          </form>
        </div>

        {/* Map Container */}
        <div className="flex-1 md:w-1/2">
          <Map />
        </div>
      </div>
    </section>
  );
};

export default Contact;
