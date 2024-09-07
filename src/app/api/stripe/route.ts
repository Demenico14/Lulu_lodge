import { getRoom } from "@/libs/apis";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "@/libs/sanity";

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: any) {
  return builder.image(source);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

// Define the missing RequestData type
type RequestData = {
  checkinDate: string;
  checkoutDate: string;
  adults: number;
  children: number;
  numberOfDays: number;
  hotelRoomSlug: string;
};

export async function POST(req: Request) {
  let requestData: RequestData;
  try {
    requestData = await req.json();
  } catch {
    return new NextResponse("Invalid request data", { status: 400 });
  }

  const {
    checkinDate,
    adults,
    checkoutDate,
    children,
    hotelRoomSlug,
    numberOfDays,
  } = requestData;

  if (
    !checkinDate ||
    !checkoutDate ||
    !adults ||
    !hotelRoomSlug ||
    !numberOfDays
  ) {
    return new NextResponse("All fields are required", { status: 400 });
  }

  const origin = req.headers.get("origin");
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("Authentication required", { status: 400 });
  }

  const userId = session.user.id;
  const formattedCheckoutDate = checkoutDate.split("T")[0];
  const formattedCheckinDate = checkinDate.split("T")[0];

  if (!process.env.STRIPE_SECRET_KEY) {
    return new NextResponse("Stripe secret key is missing", { status: 500 });
  }

  try {
    const room = await getRoom(hotelRoomSlug);
    if (!room || !room.price) {
      return new NextResponse("Room data is missing or incomplete", {
        status: 400,
      });
    }

    const discountPrice = room.price - (room.price / 100) * room.discount;
    const totalPrice = discountPrice * numberOfDays;

    const images = room.images
      ? room.images.map((image) => urlFor(image)?.url())
      : [];

    // Create a stripe Payment
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: {
              name: room.name,
              images,
            },
            unit_amount: parseInt((totalPrice * 100).toString()),
          },
        },
      ],
      payment_method_types: ["card"], // Check if PayPal is supported in your environment
      success_url: `${origin}/users/${userId}`,
      metadata: {
        adults,
        checkinDate: formattedCheckinDate,
        checkoutDate: formattedCheckoutDate,
        children,
        hotelRoom: room._id,
        numberOfDays,
        user: userId,
        discount: room.discount,
        totalPrice,
      },
    });

    return new NextResponse(JSON.stringify(stripeSession), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.log("Payment failed", error);
    return new NextResponse(
      JSON.stringify({ message: error.message || "An error occurred" }),
      { status: 500 }
    );
  }
}
