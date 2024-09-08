"use client";

import { getUserBookings } from "@/libs/apis";
import React from "react";
import useSWR from "swr";

const UserDetails = (props: { params: { id: string } }) => {
  const {
    params: { id: userId },
  } = props;

  const fetchUserBooking = async () => getUserBookings(userId);
  {
  }

  const {
    data: userBookings,
    error,
    isLoading,
  } = useSWR('/api/userbooking', fetchUserBooking);

  if (error) throw new Error("Cannot fetch data");
  if (!isLoading && !userBookings) throw new Error("Cannot fetch data");

  console.log(userBookings)

  return <div>UserDetails</div>;
};

export default UserDetails;
