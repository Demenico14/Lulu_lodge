import { authOptions } from "@/libs/auth"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { getRoom, createBooking, updateHotelRoom } from "@/libs/apis"

type RequestData = {
  checkinDate: string | Date
  checkoutDate: string | Date
  adults: number
  children: number
  numberOfDays: number
  hotelRoomSlug: string
}

export async function POST(req: Request) {
  const { checkinDate, adults, checkoutDate, children, hotelRoomSlug, numberOfDays }: RequestData = await req.json()

  // Ensure all required fields are provided
  if (!checkinDate || !checkoutDate || !adults || !hotelRoomSlug || !numberOfDays) {
    return new NextResponse("Please provide all required fields", { status: 400 })
  }

  // Get the user's session for authentication
  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse("Authentication required", { status: 401 })
  }

  const userId = session.user.id

  // Format dates if they're Date objects
  const formattedCheckoutDate =
    typeof checkoutDate === "string" ? checkoutDate.split("T")[0] : new Date(checkoutDate).toISOString().split("T")[0]

  const formattedCheckinDate =
    typeof checkinDate === "string" ? checkinDate.split("T")[0] : new Date(checkinDate).toISOString().split("T")[0]

  try {
    const room = await getRoom(hotelRoomSlug)

    // Check if room is already booked
    if (room.isBooked) {
      return new NextResponse("This room is already booked", { status: 400 })
    }

    // Calculate total price with discount
    const discountPrice = room.price - (room.price / 100) * room.discount
    const totalPrice = discountPrice * numberOfDays

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
      totalPrice,
    })

    // Update the room status to booked
    await updateHotelRoom(room._id)

    return NextResponse.json({ message: "Booking created successfully", booking }, { status: 201 })
  } catch (error: any) {
    console.error("Booking creation failed", error)
    return new NextResponse(`Booking creation failed: ${error.message}`, { status: 500 })
  }
}

