"use client";

import Image from "next/image"; // Import the Image component
import { Room } from "@/models/room";
import Link from "next/link";


const FeaturedRoom = () => {

  return (
    <section className="flex md:flex-row flex-col px-4 py-10 items-center gap-12 container mx-auto">
      <div className="md:grid gap-8 grid-cols-1">
        <div className="rounded-2xl overflow-hidden h-48 mb-4 md:mb-0">
          <Image
            src="/assets/images/picture8.webp"
            alt="room"
            width={800}
            height={400}
            className="img scale-animation"
          />
        </div>
        <div className="grid grid-cols-2 gap-8 h-48">
          <div className="rounded-2xl overflow-hidden">
            <Image
              src="/assets/images/Standard.webp"
              alt="room"
              width={300}
              height={300}
              className="img scale-animation"
            />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <Image
              src="/assets/images/picture7.webp"
              alt="room"
              width={300}
              height={300}
              className="img scale-animation"
            />
          </div>
        </div>
      </div>
      <div className="md:py-10 md:w-1/2 text-left">
        <h3 className="font-heading mb-12 dark:text-[#ffffffea]">
          Featured Rooms
        </h3>
        <p className="font-normal max-w-md">
          At Lulu Guest Lodge, we offer a variety of rooms and suites designed
          to cater to every traveler’s needs. Our Standard Rooms provide cozy
          comfort with elegant décor and stunning views of the surrounding
          landscapes. For more space and luxury, our Deluxe Suites feature
          private  overlooking the lush gardens, perfect for enjoying
          the sounds of nearby wildlife.
        </p>

        <div className="flex flex-col md:flex-row md:items-end justify-between mt-5">
          <div className="flex mb-3 md:mb-0">
            <div className="flex gap-3 flex-col items-center justify-center mr-4">
              <p className="text-xs lg:text-xl text-center">Start From</p>
              <p className="md:font-bold flex font-medium text-lg xl:text-5xl">
                $ 100
              </p>
            </div>
            <div className="flex gap-3 flex-col items-center justify-center mr-4">
              <p className="text-xs lg:text-xl text-center">Ending At</p>
              <p className="md:font-bold flex font-medium text-lg xl:text-5xl">
                $ 500
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between mt-5">
          <Link
            href="/stay"
            className="border h-fit text-center border-tertiary-dark text-tertiary-dark px-3 py-2 lg:py-5 lg:px-7 rounded-2xl font-bold lg:text-xl "
          >
            Expore Rooms
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRoom;
