import { FC } from 'react';
import Image from 'next/image';
import { Room } from '@/models/room';
import Link from 'next/link';
import imageUrlBuilder from '@sanity/image-url';
import  sanityClient from '@/libs/sanity';

// Create the Sanity image URL builder
const builder = imageUrlBuilder(sanityClient);

function urlFor(source: any) {
  return builder.image(source);
}

type Props = {
  room: Room;
};

const RoomCard: FC<Props> = (props) => {
  const {
    room: { coverImage, name, price, type, description, slug, isBooked },
  } = props;

  return (
    <div className='rounded-xl w-72 mb-10 mx-auto md:mx-0 overflow-hidden text-black'>
      <div className='h-60 overflow-hidden'>
        <Image
          src={urlFor(coverImage).url()}  // Use coverImage directly
          alt={name}
          width={550}
          height={550}
          className='img scale-animation'
        />
      </div>

      <div className='p-4 bg-white dark:bg-black'>
        <div className='flex justify-between text-xl font-semibold'>
          <p className=' text-black dark:text-white'>{name}</p>
          <p className=' text-black dark:text-white'>$ {price}</p>
        </div>

        <p className='pt-2 text-xs  text-black dark:text-white'>{type} Room</p>

        <p className='pt-3 pb-6  text-black dark:text-white'>{description.slice(0, 100)}...</p>

        <Link
          href={`/rooms/${slug.current}`}
          className='bg-primary inline-block text-center w-full py-4 rounded-xl text-white text-xl font-bold hover:-translate-y-2 hover:shadow-lg transition-all duration-500'
        >
          {isBooked ? 'BOOKED' : 'VIEW'}
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
