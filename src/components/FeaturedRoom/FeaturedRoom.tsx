import React from "react";
import Image from "next/image"; // Import the Image component
import Link from "next/link";

const FeaturedRoom = () => {
  return (
    <section className="flex md:flex-row flex-col px-4 py-10 items-center gap-12 container mx-auto">
      <div className="md:grid gap-8 grid-cols-1">
        <div className="rounded-2xl overflow-hidden h-48 mb-4 md:mb-0">
          <Image
            src="/assets/images/sunset.jpg" 
            alt="Featured Room"
            width={800}
            height={400}
            className="img scale-animation" 
          />
        </div>
        <div className="grid grid-cols-2 gap-8 h-48">
          <div className="rounded-2xl overflow-hidden">
            <Image
              src="/assets/images/Victoria.jpg" 
              alt="Featured Room"
              width={300} 
              height={300} 
              className="img scale-animation" 
            />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <Image
              src="/assets/images/Falls.jpg" 
              alt="Featured Room"
              width={300} 
              height={300} 
              className="img scale-animation" 
            />
          </div>
        </div>
      </div>
      <div className="md:py-10 md:w-1/2 text-left">
        <h3 className="font-heading mb-12 dark:text-[#ffffffea]">
          Leave your worries in the Falls
        </h3>
        <p className="font-normal max-w-md">
          Whether exploring the falls or spotting elephants and zebras, return
          to the comfort of your room or relax by the pool, immersed in the
          beauty of nature. Experience peaceful luxury at Lulu Guest Lodge,
          where adventure and tranquility meet.
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between mt-5">
          <Link
            href={`/stay}`}
            className="border h-fit text-center border-tertiary-dark text-tertiary-dark px-3 py-2 lg:py-5 lg:px-7 rounded-2xl font-bold lg:text-xl "
          >
            More Details
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRoom;
