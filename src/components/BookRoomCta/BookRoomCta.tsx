"use client";

import { Dispatch, FC, SetStateAction, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import emailjs from "@emailjs/browser";

interface FormState {
  name: string;
  email: string;
  message: string;
  checkin: Date | null;  // Update: Ensure checkin and checkout can be null
  checkout: Date | null;  // Update: Ensure checkin and checkout can be null
  adults: number;
  children: number;
}

type Props = {
  checkinDate: Date | null;
  setcheckinDate: Dispatch<SetStateAction<Date | null>>;
  checkoutDate: Date | null;
  setcheckoutDate: Dispatch<SetStateAction<Date | null>>;
  setAdults: Dispatch<SetStateAction<number>>;
  setChildren: Dispatch<SetStateAction<number>>;
  calcMinCheckoutDate: () => Date | undefined;
  price: number;
  discount: number;
  Children: number;
  Adults: number;
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
    setcheckinDate,
    checkoutDate,
    setcheckoutDate,
    calcMinCheckoutDate,
    setAdults,
    setChildren,
    Children,
    Adults,
    isBooked,
    handleBookNowClick,
  } = props;

  const discountPrice = price - (price / 100) * discount;
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "", checkin: null, checkout: null, adults: 0, children: 0 });
    const formRef = useRef<HTMLFormElement | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calcNoOfDays = () => {
    if (!checkinDate || !checkoutDate) return 0;
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
    return Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
  };

  const sendConfirmationEmail = () => {
    const templateParams = {
      from_name: form.name,  // Fix: Use form data
      to_name: "LuLu Guest Lodge",
      from_email: "mushayidominic@gmail.com", // Sender's email
       to_email: form.email,    // Recipient's email (user's email),
      message: form.message || specialNote,  // Fix: Use form data
      checkin: checkinDate?.toLocaleDateString(),
      checkout: checkoutDate?.toLocaleDateString(),
      adults: Adults,
      children: Children,
      totalPrice: calcNoOfDays() * discountPrice,
    };

    emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    )
    .then((response) => {
      console.log("Email successfully sent!", response.status, response.text);
    })
    .catch((error) => {
      console.error("Error sending email:", error);
    });
  };

  const handleBookClick = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    sendConfirmationEmail(); // Send email after booking
    handleBookNowClick(); // Call your existing booking logic
  };

  return (
    <div className="container px-7 py-6 ">
      <h3>
        <span className={`${discount ? "text-gray-400" : ""} font-bold text-xl dark:text-white`}>
          $ {price}
        </span>
        {discount ? (
          <span className="font-bold text-xl">
            {" "} | discount {discount}%. Now{" "}
            <span className="text-tertiary-dark">$ {discountPrice}</span>
          </span>
        ) : null}
      </h3>

      <div className="w-full border-b-2 border-b-tertiary-dark my-2" />
      <p className="my-8">{specialNote}</p>
      
      <form onSubmit={handleBookClick} ref={formRef}>
        <div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-gray-400">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 text-black"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 text-black"
            />
          </div>

          <div className="flex">
            <div className="w-1/2 pr-2">
              <label htmlFor="check-in-date" className="block text-sm font-medium text-gray-900 dark:text-gray-400">Check-in Date</label>
              <DatePicker
                selected={checkinDate}
                onChange={(date) => setcheckinDate(date)}
                dateFormat={"dd/MM/yyyy"}
                minDate={new Date()}
                id="check-in-date"
                className="w-full border border-gray-300 rounded-lg p-2.5 bg-white focus:ring-tertiary-dark focus:border-tertiary-dark overflow-hidden text-black"
                popperPlacement="bottom-start"
              />
            </div>

            <div className="w-1/2 pl-2">
              <label htmlFor="check-out-date" className="block text-sm font-medium text-gray-900 dark:text-gray-400">Check-out Date</label>
              <DatePicker
                selected={checkoutDate}
                onChange={(date) => setcheckoutDate(date)}
                disabled={!checkinDate}
                dateFormat={"dd/MM/yyyy"}
                minDate={calcMinCheckoutDate()}
                id="check-out-date"
                className="w-full border border-gray-300 rounded-lg p-2.5 bg-white focus:ring-tertiary-dark focus:border-tertiary-dark text-black"
                popperPlacement="bottom-start"
              />
            </div>
          </div>

          <div className="flex mt-4">
            <div className="w-1/2 pr-2">
              <label htmlFor="adults" className="block text-sm font-medium text-gray-900 dark:text-gray-400">Adults</label>
              <input
                type="number"
                name="adults"
                id="adults"
                value={Adults}
                onChange={(e) => setAdults(+e.target.value)}
                min={1}
                max={5}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-black"
              />
            </div>
            <div className="w-1/2 pl-2">
              <label htmlFor="children" className="block text-sm font-medium text-gray-900 dark:text-gray-400">Children</label>
              <input
                type="number"
                name="children"
                id="children"
                value={Children}
                onChange={(e) => setChildren(+e.target.value)}
                min={0}
                max={5}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-black"
              />
            </div>
          </div>

          {calcNoOfDays() > 0 ? (
            <p className="mt-3">
              Total Price: $ {calcNoOfDays() * discountPrice}
            </p>
          ) : null}

          <div>
            <button
              type="submit"
              disabled={isBooked}
              className="btn-primary w-full mt-6 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {isBooked ? "Booked" : "Book Now"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookRoomCta;
