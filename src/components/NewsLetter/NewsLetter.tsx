import React from "react";
import "@fontsource/montserrat/700.css"; // Import the Montserrat font weight 700 (bold)
import Link from "next/link";





const HeroSection = () => {



  return (
    <section className="flex justify-center items-center mt-24">
      <div className="py-8 h-full text-center">
        {/* Intro Text */}

        <h1 className="text-4xl font-montserrat font-bold text-black dark:text-[#ffffffea] mb-3 gap-10 md:whitespace-nowrap">
          STAY IN THE KNOW
        </h1>
 

        {/* Paragraph */}
        <p className="text-black dark:text-[#ffffffea] mb-12 text-center">
        Sign up and book your Stay at our magestic Lodge. 
          <br />
        </p>

        {/* Button */}
        <Link
            href="/auth"
            className="border h-fit text-center border-black text-dark-400  dark:border-white dark:text-[#ffffffea]  px-3 py-2 lg:py-5 lg:px-7 rounded-2xl font-bold lg:text-xl "
          >
            Sign Up
          </Link>
      </div>
    </section>
  );
};

export default HeroSection;
