"use client";

import { getRooms } from "@/libs/apis";
import { Room } from "@/models/room";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Search from "@/components/Search/Search";
import RoomCard from "@/components/RoomCard/RoomCard";

const Stay = () => {
  const [roomTypeFilter, setRoomTypeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("searchQuery");
    const roomType = searchParams.get("roomType");

    if (roomType) setRoomTypeFilter(roomType);
    if (query) setSearchQuery(query);
  }, [searchParams]);

  async function fetchData() {
    return getRooms(); // Ensure this returns an array of rooms, or structure the response accordingly
  }

  const { data, error, isLoading } = useSWR("get/hotelRooms", fetchData);

  if (error) throw new Error("Cannot fetch data");
  if (!isLoading && !data) throw new Error("Cannot fetch data");

  // Add a debug log to see what `data` contains
  console.log("Fetched data:", data);

  // Ensure rooms is an array, if not, return an empty array.
  const filterRooms = (rooms: any) => {
    if (!Array.isArray(rooms)) {
      console.error("rooms is not an array:", rooms); // Add this log to debug the issue
      return [];
    }

    return rooms.filter((room: Room) => {
      if (
        roomTypeFilter &&
        roomTypeFilter.toLowerCase() !== "all" &&
        room.type.toLowerCase() !== roomTypeFilter.toLowerCase()
      ) {
        return false;
      }

      if (
        searchQuery &&
        !room.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  };

  // Ensure data is an array, default to an empty array if it's not valid
  const filteredRooms = filterRooms(data || []);

  console.log("Filtered Rooms:", filteredRooms);

  return (
    <div className="container mx-auto pt-10 ">
      <Search
        roomTypeFilter={roomTypeFilter}
        searchQuery={searchQuery}
        setRoomTypeFilter={setRoomTypeFilter}
        setSearchQuery={setSearchQuery}
      />

      <div className="flex mt-20 justify-between flex-wrap ">
        {filteredRooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Stay;
