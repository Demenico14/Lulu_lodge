import { createBooking, updateHotelRoom } from "@/libs/apis";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

const CHECKOUT_SESSION_COMPLETED = "checkout.session.completed";

export async function POST(req: Request) {
  const reqBody = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  // Check for missing signature or webhook secret
  if (!sig || !webhookSecret) {
    return new NextResponse(
      JSON.stringify({ message: "Webhook signature or secret missing." }),
      { status: 400 }
    );
  }

  try {
    // Construct the event
    event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ message: error.message || "Webhook Error" }),
      { status: 500 }
    );
  }

  // Handle event types
  switch (event.type) {
    case CHECKOUT_SESSION_COMPLETED:
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("Session => ", session);

      // Check if metadata exists before destructuring
      if (session.metadata) {
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
        } = session.metadata;

        try {
          // Create a Booking
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

          // Update the hotel room
          await updateHotelRoom(hotelRoom);

          return NextResponse.json(
            { message: "Booking created and room updated successfully." },
            { status: 200 }
          );
        } catch (error: any) {
          return new NextResponse(
            JSON.stringify({ message: error.message || "Error creating booking." }),
            { status: 500 }
          );
        }
      } else {
        return new NextResponse(
          JSON.stringify({ message: "Metadata is null or missing." }),
          { status: 400 }
        );
      }

    default:
      console.log(`Unhandled event type: ${event.type}`);
      return new NextResponse(
        JSON.stringify({ message: `Unhandled event type: ${event.type}` }),
        { status: 400 }
      );
  }
}
