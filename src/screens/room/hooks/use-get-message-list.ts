import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { Message } from "../types/message";

async function getMessageList(roomId: string): Promise<Message[]> {
  const res = await axios.get(`/room/${roomId}/messages`);

  return res.data;
}

export function useGetMessageList(roomId: string) {
  return useQuery({
    queryKey: ["messages", roomId],
    queryFn: () => getMessageList(roomId),
  });
}
