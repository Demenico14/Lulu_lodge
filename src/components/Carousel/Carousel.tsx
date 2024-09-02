'use client'

import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import { images } from '../../lib/images'

import 'swiper/css'
import 'swiper/css/pagination'


const Carousel = () => {

  return (
    <section className='py-1 '>
      <div className='w-screen '> {/* Full width of the screen */}
        <Swiper
          loop={true} // Enable infinite loop
          autoplay={{ delay: 4000, disableOnInteraction: false }} // Autoplay with a 3-second delay
          navigation
          pagination={{ clickable: true, type: 'bullets' }} // Use bullet pagination and make it clickable
          modules={[Navigation, Pagination, Autoplay]} // Add Autoplay to modules
          onSwiper={swiper => console.log(swiper)}
          className='h-[500px] md:h-[600px] w-[99%]  ' // Increased height
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className='flex h-full w-full items-center justify-center'>
                <Image
                  src={image.src}
                  alt={image.alt} 
                  quality={100} 
                  priority={index === 1} 
                  fill
                  objectFit="cover" // Ensures no distortion
                  objectPosition="center center" // Center the image to avoid off-cuts
                  className='block h-full w-full object-cover'
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Carousel
