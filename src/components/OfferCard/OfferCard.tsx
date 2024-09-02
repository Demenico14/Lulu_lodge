import React from 'react';
import { CardContainer } from './CardContainer';
; // Adjust the import path as necessary

const OfferCard = () => {
  return (
    <section className="flex flex-col items-center">
      <div className="py-8 text-center">
        <p className=" text-xl text-dark-600 mb-3 gap-10 md:whitespace-nowrap">
          WHAT WE OFFER
        </p>
      </div>
      {/* Add the CardContainer component here */}
      <CardContainer />
    </section>
  );
}

export default OfferCard;
