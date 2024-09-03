"use client";

import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";

const Offers = () => {
  const data = [
    {
      title: "Tours",
      content: (
        <div>
          <p className="text-dark-400 dark:text-white mb-3">
            Explore the majestic Victoria Falls and surrounding attractions with
            guided tours. These excursions provide insight into the rich history
            and natural wonders of the area, including a walk along the famous
            falls, visits to local markets, and cultural sites.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              "/assets/images/picture5.webp",
              "/assets/images/picture5.webp",
            ].map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`startup template ${index + 1}`}
                width={500}
                height={500}
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "GameDrive",
      content: (
        <div>
          <p className="text-dark-400 dark:text-white mb-3">
            Enjoy thrilling wildlife game drives in nearby national parks. Spot
            elephants, lions, buffalo, and other wildlife in their natural
            habitat, guided by experienced rangers who provide detailed
            information about the local ecosystem.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              "/assets/images/picture5.webp",
              "/assets/images/picture5.webp",
            ].map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`startup template ${index + 1}`}
                width={500}
                height={500}
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Car Pickup ",
      content: (
        <div>
          <p className="text-dark-400 dark:text-white mb-3">
            Convenient car pickup services from the lodge, offering smooth and
            comfortable transfers from the Victoria Falls Airport or other
            nearby locations, ensuring hassle-free arrival and departure.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              "/assets/images/picture5.webp",
              "/assets/images/picture5.webp",
            ].map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`design template ${index + 1}`}
                width={500}
                height={500}
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Taxi-Rentals",
      content: (
        <div>
          <p className="text-dark-400 dark:text-white mb-3">
            For flexibility and independence, the lodge offers taxi rentals.
            Guests can rent a taxi with or without a driver for easy
            transportation around town or to visit popular attractions at their
            own pace.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              "/assets/images/picture5.webp",
              "/assets/images/picture5.webp",
            ].map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`startup template ${index + 1}`}
                width={500}
                height={500}
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="flex justify-center items-center">
      <div className="py-8 h-full text-center">
        {/* Heading */}
        <h1 className="header text-6xl font-montserrat font-bold text-black dark:text-[#ffffffea] mb-6">
          What We Offer
        </h1>
        <p className="text-dark-700 mb-3">
          We want your stay at our Lodge to be truly unforgettable. <br />
          That is why we give special attention to all of your needs so that we
          can ensure an experience quite unique. <br />
        </p>

        {/* Timeline Section */}
        <div className="w-full">
          <Timeline data={data} />
        </div>
      </div>
    </section>
  );
};

export default Offers;
