// Remove 'url' from CoverImage and Image since we are no longer using URLs
export type CoverImage = {
  image: Image;  // Only the Image type is needed now
};

export type Image = {
  _key: string;
  // No 'url' field since images are uploaded directly
  asset: {
    _ref: string;  // This will refer to the image asset in Sanity
    _type: string;
  };
};

type Amenity = {
  _key: string;
  amenity: string;
  icon: string;
};

type Slug = {
  _type: string;
  current: string;
};

export type Room = {
  _id: string;
  coverImage: CoverImage;
  description: string;
  dimension: string;
  discount: number;
  images: Image[];  // Array of uploaded images
  isBooked: boolean;
  isFeatured: boolean;
  name: string;
  numberOfBeds: number;
  offeredAmenities: Amenity[];
  price: number;
  slug: Slug;
  specialNote: string;
  type: string;
};

export type CreateBookingDto = {
  user: string;
  hotelRoom: string;
  checkinDate: string;
  checkoutDate: string;
  numberOfDays: number;
  adults: number;
  children: number;
  totalPrice: number;
  discount: number;
};
