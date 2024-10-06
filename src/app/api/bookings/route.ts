import { authOptions } from '@/libs/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { getRoom } from '@/libs/apis';
// You should replace this with your actual database function for saving a booking
import { createBooking } from '@/libs/apis'; 

type RequestData = {
  checkinDate: string;
  checkoutDate: string;
  adults: number;
  children: number;
  numberOfDays: number;
  hotelRoomSlug: string;
};

export async function POST(req: Request, res: Response) {
  const {
    checkinDate,
    adults,
    checkoutDate,
    children,
    hotelRoomSlug,
    numberOfDays,
  }: RequestData = await req.json();

  // Ensure all required fields are provided
  if (
    !checkinDate ||
    !checkoutDate ||
    !adults ||
    !hotelRoomSlug ||
    !numberOfDays
  ) {
    return new NextResponse('Please provide all required fields', { status: 400 });
  }

  // Get the user's session for authentication
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Authentication required', { status: 401 });
  }

  const userId = session.user.id;
  const formattedCheckoutDate = checkoutDate.split('T')[0];
  const formattedCheckinDate = checkinDate.split('T')[0];

  try {
    const room = await getRoom(hotelRoomSlug);
    
    // Calculate total price with discount
    const discountPrice = room.price - (room.price / 100) * room.discount;
    const totalPrice = discountPrice * numberOfDays;

    // Create a booking in the database
    const booking = await createBooking({
      user: userId,
      hotelRoom: room._id,
      checkinDate: formattedCheckinDate,
      checkoutDate: formattedCheckoutDate,
      adults,
      children,
      numberOfDays,
      discount: room.discount,
      totalPrice
    });

    return NextResponse.json({ message: 'Booking created successfully', booking }, {
      status: 201
    });

  } catch (error: any) {
    console.error('Booking creation failed', error);
    return new NextResponse('Booking creation failed', { status: 500 });
  }
}
