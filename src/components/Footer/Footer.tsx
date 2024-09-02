import Link from 'next/link';
import { BsFillSendFill, BsTelephoneOutbound } from 'react-icons/bs';
import { BiMessageDetail, BiHome } from 'react-icons/bi';

const Footer = () => {
  return (
    <footer className='mt-16'>
      <div className='container mx-auto px-4'>
        <Link href='/' className='font-black text-tertiary-dark'>
          Lulu Lodge
        </Link>

        <h4 className='font-semibold text-[40px] py-6 text-black dark:text-[#ffffffea]'>Contact</h4>

        <div className='flex flex-wrap gap-16 items-center justify-between'>
          <div className='flex-1'>
            
            <div className='flex items-center'>
              <BiHome />
            <p className='ml-2'>1714 BB7, Low Density, Victoria Falls, Zimbabwe</p>
            </div>
            <div className='flex items-center py-4'>
              <BsFillSendFill />
              <p className='ml-2'>luluguestlodge@gmail.com</p>
            </div>
            <div className='flex items-center'>
              <BsTelephoneOutbound />
              <p className='ml-2'>+263-772-451-277</p>
            </div>
            <div className='flex items-center'>
              <BsTelephoneOutbound />
              <p className='ml-2'> +61-452-156-150</p>
            </div>
            <div className='flex items-center pt-4'>
              <BiMessageDetail />
              <p className='ml-2'>Lulu Guest</p>
            </div>
          </div>

          <div className='flex-1 md:text-right'>
            <p className='pb-4'>Our Story</p>
            <p className='pb-4'>Get in Touch</p>
            <p className='pb-4'>Terms of service</p>
            <p>Customer Assistance</p>
          </div>

          <div className='flex-1 md:text-right'>
            <p className='pb-4'>Dining Experience</p>
            <p className='pb-4'>Car Pickups</p>
            <p>Events</p>
          </div>
        </div>
      </div>

      <div className='bg-tertiary-light h-10 md:h-[70px] mt-16 w-full bottom-0 left-0' />
    </footer>
  );
};

export default Footer;