import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

async function getMessageList(roomId: string): Promise<any[]> {
  const res = await axios.get(`/room/${roomId}/messages`);

  return res.data;
}

export function useGetMessageList(roomId: string) {
  return useQuery({
    queryKey: ["messages", roomId],
    queryFn: () => getMessageList(roomId),
  });
}
