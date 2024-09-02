"use client";

import Carousel from '@/components/Carousel/Carousel'
import Counter from '@/components/HeroSection/Counter';
import HeroSection from '@/components/HeroSection/HeroSection';
import PageSearch from '@/components/PageSearch/PageSearch';
import FeaturedRoom from '@/components/FeaturedRoom/FeaturedRoom';
import OfferCard from '@/components/OfferCard/OfferCard';




const Home = () => {
  return (
    <>
      <Carousel/>
      <HeroSection/>
      <Counter/>
      <PageSearch />
      <FeaturedRoom />
      <OfferCard/>
    </>
  )
}

export default Home