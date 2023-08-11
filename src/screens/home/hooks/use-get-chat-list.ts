import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";

interface Chat {
  id: string;
  name: string;
  created_at: string;
}

export async function getChatList(): Promise<Chat[]> {
  const res = await axios.get("/chat");

  return res.data;
}

export function useGetChatList() {
  return useQuery({
    queryKey: ["chat"],
    queryFn: getChatList,
  });
}
