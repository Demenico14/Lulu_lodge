"use client";
import React from "react";


// Define types for the props
interface CardDemoProps {
  backgroundImage: string; // URL for the background image
  // Time to read
  heading: string; // Heading text
  description: string; // Description text
}

export function CardDemo({
  backgroundImage,
  heading,
  description,
}: CardDemoProps) {
  return (
    <div className="max-w-xs w-full group/card h-[80%]">
      <div
        className="cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl max-w-sm mx-auto flex flex-col justify-between p-4"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute w-full h-full top-0 left-0 bg-dark-600 opacity-30 transition duration-300"></div>
        <div className="flex flex-row items-center space-x-4 z-10">
          <div className="flex flex-col"></div>
        </div>
        <div className="text content">
          <h1 className="font-bold text-xl md:text-2xl text-green-700 relative z-10">
            {heading}
          </h1>
          <p className="font-normal text-sm text-white relative z-10 my-4">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

// Container component to display multiple cards
export function CardContainer() {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <CardDemo
        backgroundImage="/assets/images/food.jpg"
        heading="Breakfast "
        description="Offeering a variety of breakfast options to suit your needs."
      />
      <CardDemo
        backgroundImage="/assets/images/falls.webp"
        heading="Tours"
        description="Explore the majestic Victoria Falls and surrounding attractions with guided tours."
      />
      <CardDemo
        backgroundImage="/assets/images/pickup.jpg"
        heading="Car Pickups "
        description="Reliable car pick-ups, drop offs and safe journey to your destination."
      />
    </div>
  );
}
