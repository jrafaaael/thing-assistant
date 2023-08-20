import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { Message } from "../types/message";

async function getMessageList(roomId: string): Promise<Message[]> {
  const res = await axios.get(`/rooms/${roomId}/messages`);

  return res.data;
}

export function useGetMessageList(roomId: string) {
  return useQuery({
    queryKey: ["rooms", roomId, "messages"],
    queryFn: () => getMessageList(roomId),
    select: (data) => ({
      messages: data.messages.reverse(),
      metadata: data.metadata,
    }),
  });
}
