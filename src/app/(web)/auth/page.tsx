"use client";

import { signUp } from "next-auth-sanity/client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from 'next-auth/react';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const defaultFormData = {
  name: "",
  email: "",
  password: "",
};

const Auth = () => {
  const [formData, setformData] = useState(defaultFormData);

  const inputStyles =
    "border border-gray-300 sm:text-sm text-black  rounded-lg block w-full p-2.5 focus:outline-none";

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) router.push('/rooms');
  }, [router, session]);

  console.log(session);

  const loginHandler = async() => {
    try {
      await signIn();
      router.push("/")
    } catch (error) {
      console.log(error)
      toast.error("Something went Wrong")
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await signUp(formData)
      if(user){
        toast.success("Success . Please Sign In")
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    } finally {
      setformData(defaultFormData);
    }
  };

  const labelStyles = "block mb-2 text-sm font-medium text-gray-900 dark:text-white";

  return (
    <section className=" flex items-center justify-center remove-scrollbar mt-28 container mx-auto">
      <div className="max-w-[496px] ">
        <section className="flex mb-8 flex-col space-y-4 ">
          <h1 className="text-4xl font-bold dark:text-white text-center text-tertiary-dark items-center ">
            Create an Account
          </h1>
          <p className="text-dark-700">
            Welcome! Please fill in the details to get started.
          </p>
          <span className="inline-flex items-center justify-center">
            
            <FcGoogle
            onClick={loginHandler}
            className="ml-3 text-4xl cursor-pointer" />
          </span>
        </section>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
              value={formData.name}
              onChange={handleInputChange}
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
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="password" className={labelStyles}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              minLength={6}
              className={inputStyles}
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-tertiary-light text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Create
          </button>
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left ">
              © 2023 Lulu Lodge
            </p>
            <button
             onClick={loginHandler}
             className="text-blue-700 underline">Login</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Auth;
