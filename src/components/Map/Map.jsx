import React from 'react';
import styles from "./Map.module.css"; // Import the CSS module

const Map = () => {
  return (
    <div className="w-full h-full">
      <div className="mb-8 flex flex-col space-y-4 "> 
        <h1 className="text-4xl text-black font-black dark:text-white text-center">Our Location</h1>
        <p className="text-black dark:text-[#ffffffea] mb-12 text-center">
          We are located at 1714 BB7, Low Density, Victoria Falls, Zimbabwe
        </p>
        <div className={styles["map-container"]}>
          <div className={styles["map"]}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3795.9864401494897!2d25.811855815258735!3d-17.93278638472417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x194fe5168fe96d7f%3A0x25fbff6b98ddf532!2sLulu%20Guest%20Lodge!5e0!3m2!1sen!2szw!4v1725384897593!5m2!1sen!2szw"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
