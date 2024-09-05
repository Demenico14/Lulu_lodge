"use client";

import { getRoom } from "@/libs/apis";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import LodgePhotoGallery from "../../../../components/LodgePhotoGallery/LodgePhotoGallery";
import { MdOutlineCleaningServices } from 'react-icons/md';
import { LiaFireExtinguisherSolid } from 'react-icons/lia';
import { AiOutlineMedicineBox } from 'react-icons/ai';
import { GiSmokeBomb } from 'react-icons/gi';

const RoomDetails = (props: { params: { slug: string } }) => {
  const {
    params: { slug },
  } = props;

  const fetchRoom = async () => getRoom(slug);

  const { data: room, error, isLoading } = useSWR("/api/room", fetchRoom);

  if (error) throw new Error("Cannot fetch data");
  if (!isLoading && !room) throw new Error("Cannot fetch data");

  if (!room) return <LoadingSpinner />;

  return (
    <>
      <LodgePhotoGallery photos={room.images} />

      <div className="container mx-auto mt-20">
        <div className="md:grid md:grid-cols-12 gap-10 px-3">
          <div className="md:col-span-8 md:w-full">
            {/* Room Details */}
            <h2 className="font-bold text-left text-lg md:text-2xl dark:text-white">
              {room.name}
            </h2>
            <div className="flex my-11">
              {room.offeredAmenities.map((amenity) => (
                <div
                  key={amenity._key}
                  className="md:w-44 w-fit text-center px-2 md:px-0 h-20 md:h-40 mr-3 bg-[#eff0f2] dark:bg-gray-800 rounded-lg grid place-content-center"
                >
                  <i className={`fa-solid ${amenity.icon} md:text-2xl`}></i>
                  <p className="text-xs md:text-base pt-3">
                    {amenity.amenity}
                  </p>
                </div>
              ))}
            </div>
            <div className="mb-11">
              <h2 className="font-bold text-3xl mb-2 dark:text-white">
                Description
              </h2>
              <p>{room.description}</p>
            </div>
            <div className="mb-11">
              <h2 className="font-bold text-3xl mb-2 dark:text-white">
                Offered Amenities
              </h2>
              <div className="grid grid-cols-3">
                {room.offeredAmenities.map((amenity) => (
                  <div key={amenity._key} className="flex items-center md:my-0 my-1">
                    <i className={`fa-solid ${amenity.icon}`}></i>
                    <p className="text-xs md:text-base ml-2">
                      {amenity.amenity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-11">
              <h2 className="font-bold text-3xl mb-2 dark:text-white">
                Safety And Hygiene
              </h2>
              <div className="grid grid-cols-2">
                <div className="flex items-center my-1 md:my-0">
                  <MdOutlineCleaningServices />
                  <p className="ml-2 md:text-base text-xs">Daily Cleaning</p>
                </div>
                <div className="flex items-center my-1 md:my-0">
                  <LiaFireExtinguisherSolid />
                  <p className="ml-2 md:text-base text-xs">
                    Fire Extinguishers
                  </p>
                </div>
                <div className="flex items-center my-1 md:my-0">
                  <AiOutlineMedicineBox />
                  <p className="ml-2 md:text-base text-xs">
                    Disinfections and Sterilizations
                  </p>
                </div>
                <div className="flex items-center my-1 md:my-0">
                  <GiSmokeBomb />
                  <p className="ml-2 md:text-base text-xs">Smoke Detectors</p>
                </div>
              </div>
            </div>

            <div className="shadow dark:shadow-white rounded-lg p-6">
              <div className="items- center mb-4">
                <p className="md:text-lg font-semibold"> Customer Reviews</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 
              </div>
            </div>
          </div>

          <div className="md:col-span-4 rounded-xl shadow-lg dark:shadow dark:shadow-amber-50 sticky top-10 h-fit overflow-auto">
            {/* Booking Details */}
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetails;
