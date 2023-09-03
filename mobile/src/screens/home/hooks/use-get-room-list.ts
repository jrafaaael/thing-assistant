import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { Room } from "../types/room";

export async function getRoomList(): Promise<Room[]> {
  const res = await axios.get("/rooms");

  return res.data;
}

export function useGetRoomList() {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: getRoomList,
  });
}
