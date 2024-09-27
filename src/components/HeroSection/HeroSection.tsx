import React from "react";
import "@fontsource/montserrat/700.css"; // Import the Montserrat font weight 700 (bold)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";





const HeroSection = () => {

const router = useRouter();

  const handleFilterClick = () => {
    router.push(`/rooms`);
  };

  return (
    <section className="flex justify-center items-center">
      <div className="py-8 h-full text-center">
        {/* Intro Text */}

        <p className="text-dark-700 mb-3 gap-10 md:whitespace-nowrap">
          WELCOME TO LULU GUEST LODGE
        </p>
        {/* Heading */}
        <h1 className="header text-6xl font-montserrat font-bold text-black dark:text-[#ffffffea] mb-6 flex flex-col justify-center items-center text-center ">
          Explore Our Exquisite
          <span>Lodge</span>
        </h1>

        {/* Paragraph */}
        <p className="text-black dark:text-[#ffffffea] mb-12 text-center">
          Whether exploring the falls or spotting elephants and zebras<br></br>{" "}
          return to the comfort of your room or relax by the pool, immersed in
          the beauty of nature.
          <br />
        </p>

        {/* Button */}
        <button 
        className="btn-primary mx-auto flex items-center justify-center space-x-2"
        onClick={handleFilterClick}>
          <FontAwesomeIcon icon={faHome} />
          <span>Book Now</span>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
