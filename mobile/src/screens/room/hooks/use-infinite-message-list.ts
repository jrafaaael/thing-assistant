import { useInfiniteQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { Message } from "../types/message";

interface GetMessageListParams {
  roomId: string;
  cursor?: number;
}

export interface InfiniteMessageListResponse {
  messages: Message[];
  metadata: {
    nextCursor: number | null;
  };
}

async function getMessageList({
  roomId,
  cursor = -1,
}: GetMessageListParams): Promise<InfiniteMessageListResponse> {
  const res = await axios.get(`/rooms/${roomId}/messages?cursor=${cursor}`);

  return res.data;
}

export function useInfiniteMessageList(roomId: string) {
  return useInfiniteQuery({
    queryKey: ["rooms", roomId, "messages"],
    queryFn: ({ pageParam }) => getMessageList({ roomId, cursor: pageParam }),
    getNextPageParam: (last) => last.metadata.nextCursor ?? undefined,
  });
}
