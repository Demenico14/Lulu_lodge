import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createBooking, updateHotelRoom } from '@/libs/apis';
import emailjs from "@emailjs/browser";

const checkout_session_completed = 'checkout.session.completed';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-08-16',
});

export async function POST(req: Request, res: Response) {
  const reqBody = await req.text();
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 500 });
  }

  // Handle the event
  switch (event.type) {
    case checkout_session_completed:
      const session = event.data.object;

      const {
        // @ts-ignore
        metadata: {
          adults,
          checkinDate,
          checkoutDate,
          children,
          hotelRoom,
          numberOfDays,
          user,
          discount,
          totalPrice,
        },
      } = session;

      // Create booking
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

      // Update hotel room
      await updateHotelRoom(hotelRoom);

      // Send confirmation email using EmailJS
      const templateParams = {
        hotelRoom: hotelRoom,
        user_name: user,
        checkin_date: checkinDate,
        checkout_date: checkoutDate,
        hotel_room: hotelRoom,
        total_price: totalPrice,
        number_of_adults: adults,
        number_of_children: children,
      };

      emailjs.send(
        process.env.EMAILJS_SERVICE_ID as string, // Your EmailJS service ID
        process.env.EMAILJS_TEMPLATE_ID as string, // Your EmailJS template ID
        templateParams,
        process.env.EMAILJS_USER_ID as string // Your EmailJS user ID (public key)
      ).then((response) => {
        console.log('Email sent successfully:', response.status, response.text);
      }).catch((err) => {
        console.error('Error sending email:', err);
      });

      return NextResponse.json('Booking successful', {
        status: 200,
        statusText: 'Booking Successful',
      });

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json('Event Received', {
    status: 200,
    statusText: 'Event Received',
  });
}
