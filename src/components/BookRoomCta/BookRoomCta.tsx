"use client";

import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import emailjs from '@emailjs/browser';
import axios from 'axios'; // Import axios
import { User } from '@/models/user';


type Props = {
  checkinDate: Date | null;
  setCheckinDate: Dispatch<SetStateAction<Date | null>>;
  checkoutDate: Date | null;
  setCheckoutDate: Dispatch<SetStateAction<Date | null>>;
  setAdults: Dispatch<SetStateAction<number>>;
  setNoOfChildren: Dispatch<SetStateAction<number>>;
  calcMinCheckoutDate: () => Date | null;
  price: number;
  discount: number;
  adults: number;
  noOfChildren: number;
  specialNote: string;
  isBooked: boolean;
  handleBookNowClick: () => void;
};

const BookRoomCta: FC<Props> = (props) => {
  const {
    price,
    discount,
    specialNote,
    checkinDate,
    setCheckinDate,
    checkoutDate,
    setCheckoutDate,
    calcMinCheckoutDate,
    setAdults,
    setNoOfChildren,
    adults,
    noOfChildren,
    isBooked,
    handleBookNowClick,
  } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [email, setEmail] = useState<string>(''); // State for email input
  const [userName, setUserName] = useState<string>(''); // State for user name

  const discountPrice = price - (price / 100) * discount;

  const calcNoOfDays = () => {
    if (!checkinDate || !checkoutDate) return 0;
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
    const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    return noOfDays;
  };

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const { data } = await axios.get<User>('/api/users');
      setUserName(data.name); // Set the user name in state
      setEmail(data.email); // Optionally set the email from the fetched user data
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data when the component mounts
  }, []);

  const handleBookNowClickWithEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default button behavior
    setIsLoading(true);

    // Prepare email data according to the template
    const emailData = {
      from_name: userName, // Use the fetched user name
      to_name: "Lulu Management Team", // Replace with your name or the hotel name
      checkin: checkinDate?.toLocaleDateString() || 'Not provided', // Format the check-in date
      checkout: checkoutDate?.toLocaleDateString() || 'Not provided', // Format the check-out date
      adults,
      children: noOfChildren,
      totalPrice: (calcNoOfDays() * discountPrice).toFixed(2), // Total price formatted to two decimal places
      message: specialNote, // Optional message from user
    };

    try {
      // Call the existing booking function first
      // Call original booking function

      // Send email using EmailJS
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        emailData,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      handleBookNowClick();

      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <div className='px-7 py-6'>
      <h3>
        <span className={`${discount ? 'text-gray-400' : ''} font-bold text-xl`}>
          $ {price}
        </span>
        {discount ? (
          <span className='font-bold text-xl'>
            {' '}
            | discount {discount}%. Now{' '}
            <span className='text-tertiary-dark'>$ {discountPrice}</span>
          </span>
        ) : (
          ''
        )}
      </h3>

      <div className='w-full border-b-2 border-b-secondary my-2' />

      <h4 className='my-8'>{specialNote}</h4>

      {/* Email Input Field */}
      <div className='mb-4'>
        <label
          htmlFor='email'
          className='block text-sm font-medium text-gray-900 dark:text-gray-400'
        >
          Email Address
        </label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='w-full border text-black border-gray-300 rounded-lg p-2.5'
        />
      </div>

      <div className='flex'>
        <div className='w-1/2 pr-2'>
          <label htmlFor='check-in-date' className='block text-sm font-medium text-gray-900 dark:text-gray-400'>
            Check In date
          </label>
          <DatePicker
            selected={checkinDate}
            onChange={(date) => setCheckinDate(date)}
            dateFormat='dd/MM/yyyy'
            minDate={new Date()}
            id='check-in-date'
            className='w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary'
          />
        </div>
        <div className='w-1/2 pl-2'>
          <label htmlFor='check-out-date' className='block text-sm font-medium text-gray-900 dark:text-gray-400'>
            Check Out date
          </label>
          <DatePicker
            selected={checkoutDate}
            onChange={(date) => setCheckoutDate(date)}
            dateFormat='dd/MM/yyyy'
            disabled={!checkinDate}
            minDate={calcMinCheckoutDate()}
            id='check-out-date'
            className='w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary'
          />
        </div>
      </div>

      <div className='flex mt-4'>
        <div className='w-1/2 pr-2'>
          <label htmlFor='adults' className='block text-sm font-medium text-gray-900 dark:text-gray-400'>
            Adults
          </label>
          <input
            type='number'
            id='adults'
            value={adults}
            onChange={(e) => setAdults(+e.target.value)}
            min={1}
            max={5}
            className='w-full border text-black border-gray-300 rounded-lg p-2.5'
          />
        </div>
        <div className='w-1/2 pl-2'>
          <label htmlFor='children' className='block text-sm font-medium text-gray-900 dark:text-gray-400'>
            Children
          </label>
          <input
            type='number'
            id='children'
            value={noOfChildren}
            onChange={(e) => setNoOfChildren(+e.target.value)}
            min={0}
            max={3}
            className='w-full border text-black border-gray-300 rounded-lg p-2.5'
          />
        </div>
      </div>

      {calcNoOfDays() > 0 ? (
        <p className='mt-3'>Total Price: $ {calcNoOfDays() * discountPrice}</p>
      ) : (
        <></>
      )}

      <button
        disabled={isBooked || isLoading}
        onClick={handleBookNowClickWithEmail} // Use the new click handler
        className='btn-primary w-full  mt-6 disabled:bg-gray-500 disabled:cursor-not-allowed'
      >
        {isLoading ? 'Sending...' : isBooked ? 'Booked' : 'Book Now'}
      </button>
    </div>
  );
};

export default BookRoomCta;
