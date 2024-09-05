"use client";

import { Dispatch, FC, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  } = props;

  const discountPrice = price - (price / 100) * discount;


  const calcNoOfDays = () => {
    if (!checkinDate || !checkoutDate) return 0;
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
    const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    return noOfDays;
  };

  return (
    <div className=" container px-7 py-6 ">
      <h3>
        <span
          className={`${discount ? "text-gray-400" : ""} font-bold text-xl dark:text-white`}
        >
          $ {price}
        </span>
        {discount ? (
          <span className="font-bold text-xl">
            {" "}
            | discount {discount}%. Now{" "}
            <span className="text-tertiary-dark">$ {discountPrice}</span>
          </span>
        ) : null}
      </h3>

      <div className="w-full border-b-2 border-b-tertiary-dark my-2" />
      <p className="my-8">{specialNote}</p>

      <div className="flex">
        <div className="w-1/2 pr-2">
          <label
            htmlFor="check-in-date"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Check in Date
          </label>
          <DatePicker
            selected={checkinDate}
            onChange={(date) => setcheckinDate(date)}
            dateFormat={"dd/MM/yyyy"}
            minDate={new Date()}
            id="check-in-date"
            className="w-full border border-gray-300 rounded-lg p-2.5 bg-white text-white focus:ring-tertiary-dark focus:border-tertiary-dark overflow-hidden"
            popperPlacement="bottom"
          />
        </div>

        <div className="w-1/2 pl-2">
          <label
            htmlFor="check-out-date"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Check out Date
          </label>
          <DatePicker
            selected={checkoutDate}
            onChange={(date) => setcheckoutDate(date)}
            disabled={!checkinDate}
            dateFormat={"dd/MM/yyyy"}
            minDate={calcMinCheckoutDate()}
            id="check-out-date"
            className="w-full border border-gray-300 rounded-lg p-2.5 bg-white text-white focus:ring-tertiary-dark focus:border-tertiary-dark"
            popperPlacement="bottom"
          />
        </div>
      </div>

      <div className="flex mt-4">
        <div className="w-1/2 pr-2">
          <label
            htmlFor="adults"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Adults
          </label>
          <input 
            type="number" 
            name="adults" 
            id="adults" 
            value={Adults} 
             onChange={(e) => setAdults(+e.target.value) }
             min={1}
             max={5}
             className="w-full border border-gray-300 rounded-lg p-2.5"
             />
        </div>
        <div className="w-1/2 pl-2">
          <label
            htmlFor="Children"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Adults
          </label>
          <input 
            type="number" 
            name="Children" 
            id="Children" 
            value={Children} 
             onChange={(e) => setAdults(+e.target.value) }
             min={1}
             max={5}
             className="w-full border border-gray-300 rounded-lg p-2.5"
             />
        </div>
      </div>

      {calcNoOfDays() > 0 ? (
        <p className='mt-3'>Total Price: $ {calcNoOfDays() * discountPrice}</p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default BookRoomCta;
