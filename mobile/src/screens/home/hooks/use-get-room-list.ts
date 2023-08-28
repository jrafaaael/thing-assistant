import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";

interface Room {
  id: string;
  name: string;
  created_at: string;
}

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
