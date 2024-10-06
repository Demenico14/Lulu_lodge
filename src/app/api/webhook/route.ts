import { NextResponse } from 'next/server';
import { createBooking, updateHotelRoom } from '@/libs/apis';

export async function POST(req: Request , res: Response) {
  const bookingData = await req.json();

  try {
    const {
      adults,
      checkinDate,
      checkoutDate,
      children,
      hotelRoom,
      numberOfDays,
      user,
      discount,
      totalPrice,
    } = bookingData;

    // Create booking in the database
    await createBooking({
      adults: Number(adults),
      checkinDate,
      checkoutDate,
      children: Number(children),
      hotelRoom,
      numberOfDays: Number(numberOfDays),
      discount: Number(discount),
      totalPrice: Number(totalPrice),
      user,
    });

    // Update hotel room availability
    await updateHotelRoom(hotelRoom);

    return NextResponse.json('Booking successful', {
      status: 201,
      statusText: 'Booking Successful',
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json('Error creating booking', { status: 500 });
  }
}
